"use strict";

/* ============================================================
   CLOUD SYNC (Firebase) — optional. Loaded lazily by app.js via
   dynamic import, so if this module is ever unreachable, the core
   app still loads and works fully offline — nothing here is
   required for local-only use. The library itself is vendored
   locally (./vendor/firebase/) rather than fetched from Google's
   CDN each time, so it's cached and loads instantly like the rest
   of the app shell instead of depending on a CDN round trip.

   The apiKey below is a public client identifier, not a secret —
   Firebase access is controlled by sign-in + Firestore security
   rules, not by hiding this value.

   Data model in Firestore: each vehicle's core fields live in
   users/{uid}/vehicles/{vehicleId}, with each fluid/filter/part/
   maintenance/note item as its own document in a subcollection —
   keeps every document safely under Firestore's 1MB limit even
   with several photos, instead of one giant per-vehicle blob.

   app.js doesn't import from here directly (this module can't see
   app.js's private state/render/db functions, and importing this
   at the top of app.js is exactly the failure mode this split
   avoids). Instead app.js calls initCloudSync(hooks) once this
   module has loaded, handing in the few functions this needs to
   read/update local state.
   ============================================================ */
import { initializeApp } from "./vendor/firebase/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult,
  onAuthStateChanged, signOut,
} from "./vendor/firebase/firebase-auth.js";
import {
  getFirestore, doc, deleteDoc, getDoc, getDocs, collection, writeBatch, onSnapshot,
} from "./vendor/firebase/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKm1ionfckS0KS4F0z3oMlq-2Orc3PjlY",
  authDomain: "garage-app-2a44e.firebaseapp.com",
  projectId: "garage-app-2a44e",
  storageBucket: "garage-app-2a44e.firebasestorage.app",
  messagingSenderId: "249859161985",
  appId: "1:249859161985:web:ca857cbfe71255fe9f3280",
};
const fbApp = initializeApp(firebaseConfig);
const fbAuth = getAuth(fbApp);
const fbDb = getFirestore(fbApp);

const CLOUD_SUBCOLLECTIONS = ["overview", "fluids", "filters", "parts", "maintenance", "notes"];
const CLOUD_BATCH_LIMIT = 400; // Firestore caps a batch at 500 writes

let cloudUser = null;
let cloudVehiclesUnsub = null;
let hooks = null; // { getVehicles, setVehicles, render, normalizeVehicle, dbPut, dbDelete, findVehicle, toast, onChange }

export function getCloudUser() { return cloudUser; }

function vehicleMetaFields(v) {
  const meta = {};
  for (const key in v) if (!CLOUD_SUBCOLLECTIONS.includes(key)) meta[key] = v[key];
  return meta;
}

async function commitInChunks(writes) {
  for (let i = 0; i < writes.length; i += CLOUD_BATCH_LIMIT) {
    const batch = writeBatch(fbDb);
    for (const w of writes.slice(i, i + CLOUD_BATCH_LIMIT)) w(batch);
    await batch.commit();
  }
}

export async function pushVehicleToCloud(v) {
  if (!cloudUser) return;
  const uid = cloudUser.uid;
  try {
    const writes = [(batch) => batch.set(doc(fbDb, "users", uid, "vehicles", v.id), vehicleMetaFields(v))];
    for (const key of CLOUD_SUBCOLLECTIONS) {
      for (const item of v[key] || []) {
        writes.push((batch) => batch.set(doc(fbDb, "users", uid, "vehicles", v.id, key, item.id), item));
      }
    }
    await commitInChunks(writes);
  } catch (err) {
    console.error("Cloud sync failed", err);
  }
}

export async function deleteVehicleFromCloud(vehicleId) {
  if (!cloudUser) return;
  const uid = cloudUser.uid;
  try {
    for (const key of CLOUD_SUBCOLLECTIONS) {
      const snap = await getDocs(collection(fbDb, "users", uid, "vehicles", vehicleId, key));
      await commitInChunks(snap.docs.map((d) => (batch) => batch.delete(d.ref)));
    }
    await deleteDoc(doc(fbDb, "users", uid, "vehicles", vehicleId));
  } catch (err) {
    console.error("Cloud delete failed", err);
  }
}

async function pullVehicleFromCloud(uid, vehicleId) {
  const metaSnap = await getDoc(doc(fbDb, "users", uid, "vehicles", vehicleId));
  if (!metaSnap.exists()) return null;
  const v = { id: vehicleId, ...metaSnap.data() };
  for (const key of CLOUD_SUBCOLLECTIONS) {
    const snap = await getDocs(collection(fbDb, "users", uid, "vehicles", vehicleId, key));
    v[key] = snap.docs.map((d) => d.data());
  }
  return hooks.normalizeVehicle(v);
}

async function pullAllVehiclesFromCloud(uid) {
  const snap = await getDocs(collection(fbDb, "users", uid, "vehicles"));
  const vehicles = [];
  for (const d of snap.docs) {
    const v = await pullVehicleFromCloud(uid, d.id);
    if (v) vehicles.push(v);
  }
  return vehicles;
}

// Full reconcile: make the cloud match local exactly. Used after a local
// backup import, which can add/remove vehicles all at once.
export async function reconcileCloudWithLocal() {
  if (!cloudUser) return;
  const uid = cloudUser.uid;
  const snap = await getDocs(collection(fbDb, "users", uid, "vehicles"));
  const cloudIds = snap.docs.map((d) => d.id);
  const localVehicles = hooks.getVehicles();
  const localIds = new Set(localVehicles.map((v) => v.id));
  await Promise.all(cloudIds.filter((id) => !localIds.has(id)).map((id) => deleteVehicleFromCloud(id)));
  await Promise.all(localVehicles.map((v) => pushVehicleToCloud(v)));
}

function watchCloudVehicles(uid) {
  if (cloudVehiclesUnsub) cloudVehiclesUnsub();
  cloudVehiclesUnsub = onSnapshot(collection(fbDb, "users", uid, "vehicles"), async (snap) => {
    let changed = false;
    for (const change of snap.docChanges()) {
      if (change.doc.metadata.hasPendingWrites) continue; // this device's own write, already applied locally
      changed = true;
      const vehicles = hooks.getVehicles();
      if (change.type === "removed") {
        hooks.setVehicles(vehicles.filter((v) => v.id !== change.doc.id));
        await hooks.dbDelete(change.doc.id);
      } else {
        const v = await pullVehicleFromCloud(uid, change.doc.id);
        if (!v) continue;
        const idx = vehicles.findIndex((x) => x.id === v.id);
        if (idx === -1) vehicles.push(v); else vehicles[idx] = v;
        hooks.setVehicles(vehicles);
        await hooks.dbPut(v);
      }
    }
    if (changed) hooks.onChange();
  });
}

export async function signInWithGoogle() {
  await signInWithRedirect(fbAuth, new GoogleAuthProvider());
}

export async function signOutOfCloud() {
  if (cloudVehiclesUnsub) { cloudVehiclesUnsub(); cloudVehiclesUnsub = null; }
  await signOut(fbAuth);
}

async function handleSignedIn(user) {
  cloudUser = user;
  const remoteSnap = await getDocs(collection(fbDb, "users", user.uid, "vehicles"));
  const localVehicles = hooks.getVehicles();
  if (remoteSnap.empty && localVehicles.length) {
    hooks.toast("Backing up your garage to your account…");
    await Promise.all(localVehicles.map((v) => pushVehicleToCloud(v)));
  } else if (!remoteSnap.empty) {
    const remoteVehicles = await pullAllVehiclesFromCloud(user.uid);
    await Promise.all(localVehicles.map((v) => hooks.dbDelete(v.id)));
    await Promise.all(remoteVehicles.map((v) => hooks.dbPut(v)));
    hooks.setVehicles(remoteVehicles.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0)));
    hooks.toast("Synced from your account");
    hooks.onChange();
  }
  watchCloudVehicles(user.uid);
}

export function initCloudSync(h) {
  hooks = h;
  onAuthStateChanged(fbAuth, (user) => {
    if (user) {
      handleSignedIn(user).catch((err) => { console.error(err); hooks.toast("Sync error — check your connection"); });
    } else {
      cloudUser = null;
      if (cloudVehiclesUnsub) { cloudVehiclesUnsub(); cloudVehiclesUnsub = null; }
    }
  });
  getRedirectResult(fbAuth).catch((err) => { console.error("Sign-in failed", err); hooks.toast("Sign-in failed"); });
}
