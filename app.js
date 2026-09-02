"use strict";

/* ============================================================
   THEME — night mode, applied ASAP to avoid a flash of light UI
   ============================================================ */
const THEME_KEY = "garageTheme";
function getTheme() {
  try { return localStorage.getItem(THEME_KEY) || "auto"; } catch (err) { return "auto"; }
}
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark" || theme === "light") root.setAttribute("data-theme", theme);
  else root.removeAttribute("data-theme");
}
function setTheme(theme) {
  try { localStorage.setItem(THEME_KEY, theme); } catch (err) {}
  applyTheme(theme);
}
applyTheme(getTheme());

/* ============================================================
   ICONS — minimal line-icon set, single stroke style
   ============================================================ */
const ICONS = {
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 14.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1z"/></svg>`,
  pencil: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z"/><circle cx="12" cy="13" r="4"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="8.5" cy="8.5" r="1.4"/><path d="M21 15.5l-5.3-5.3a1.5 1.5 0 0 0-2.1 0L4 20"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  car: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13.5 4.6 8.7A2 2 0 0 1 6.5 7.3h11a2 2 0 0 1 1.9 1.4l1.6 4.8"/><path d="M2.5 13.5h19V17a1 1 0 0 1-1 1h-1.2a1 1 0 0 1-1-1v-.7H5.7V17a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1Z"/><circle cx="7.3" cy="17.8" r="1.6"/><circle cx="16.7" cy="17.8" r="1.6"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 5.5h11v10h-11z"/><path d="M12.5 10h4l3.5 3.2v2.3h-7.5z"/><circle cx="6" cy="18" r="1.7"/><circle cx="17" cy="18" r="1.7"/></svg>`,
  dirtbike: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.2" cy="17" r="3"/><circle cx="18.8" cy="17" r="3"/><path d="M5.2 17 9 10h4l3 4.5h2.6"/><path d="M9.5 10l1.7-3h3.3"/></svg>`,
  overview: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 13l3.4-3.6"/><path d="M8.3 6.8 9 8.2"/><path d="M15.7 6.8 15 8.2"/></svg>`,
  fluids: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5s6.8 8.1 6.8 12.6a6.8 6.8 0 0 1-13.6 0C5.2 10.6 12 2.5 12 2.5Z"/></svg>`,
  filters: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5h16l-6.2 7.6v6.4l-3.6 1.8v-8.2Z"/></svg>`,
  maintenance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.3 5.3L2.8 18.2l3 3 6.6-6.6a4 4 0 0 0 5.3-5.3l-2.8 2.8-2.8-2.8Z"/></svg>`,
  parts: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.3l8 4.5v10.4l-8 4.5-8-4.5V6.8Z"/><circle cx="12" cy="12" r="3.2"/></svg>`,
  notes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v5h5"/><path d="M6.5 3h7.5l5 5v13h-12.5z"/><path d="M9 13.2h6"/><path d="M9 17h6"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12.5"/><path d="M7 11.5l5 5 5-5"/><path d="M5 21h14"/></svg>`,
  upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V8.5"/><path d="M7 13l5-5 5 5"/><path d="M5 3h14"/></svg>`,
};

/* ============================================================
   VEHICLE TYPE METADATA & DEFAULT REFERENCE TEMPLATES
   ============================================================ */
const TYPE_META = {
  car:      { label: "Car",       icon: ICONS.car,      hint: "Sedans, hatchbacks, SUVs" },
  truck:    { label: "Truck",     icon: ICONS.truck,    hint: "Pickups and 4x4s" },
  dirtbike: { label: "Dirt bike", icon: ICONS.dirtbike, hint: "Off-road motorcycles" },
};

const DEFAULTS = {
  car: {
    overview: ["VIN", "License plate", "Engine", "Drivetrain", "Transmission", "Fuel type", "Tire size", "Odometer unit"],
    fluids: ["Engine oil", "Coolant", "Transmission fluid", "Brake fluid", "Power steering fluid", "Windshield washer fluid"],
    filters: ["Oil filter", "Air filter", "Cabin air filter", "Fuel filter"],
    parts: ["Battery", "Spark plugs", "Brake pads (front)", "Brake pads (rear)", "Brake rotors", "Wiper blades", "Serpentine belt", "Tires"],
  },
  truck: {
    overview: ["VIN", "License plate", "Engine", "Drivetrain", "Transmission", "Fuel type", "Tire size", "Towing capacity", "Odometer unit"],
    fluids: ["Engine oil", "Coolant", "Transmission fluid", "Transfer case fluid", "Front differential fluid", "Rear differential fluid", "Brake fluid", "Power steering fluid", "Windshield washer fluid"],
    filters: ["Oil filter", "Air filter", "Cabin air filter", "Fuel filter"],
    parts: ["Battery", "Spark plugs", "Brake pads (front)", "Brake pads (rear)", "Brake rotors", "Wiper blades", "Serpentine belt", "U-joints", "Tires"],
  },
  dirtbike: {
    overview: ["VIN / frame number", "Engine type", "Displacement", "Tire size (front)", "Tire size (rear)", "Chain size", "Odometer unit"],
    fluids: ["Engine oil", "Fork oil", "Coolant", "Brake fluid (front)", "Brake fluid (rear)", "Transmission oil", "Fuel premix ratio"],
    filters: ["Air filter", "Oil filter"],
    parts: ["Spark plug", "Chain", "Front sprocket", "Rear sprocket", "Brake pads (front)", "Brake pads (rear)", "Battery", "Tires", "Grips", "Levers"],
  },
};

const REF_LABELS = { fluids: "Fluids", filters: "Filters", parts: "Parts" };
function refSingular(key) { return REF_LABELS[key].toLowerCase().slice(0, -1); }

/* ============================================================
   UTILITIES
   ============================================================ */
function uid() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);
}

function todayISO() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function h(str) {
  return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function formatDateParts(iso) {
  if (!iso) return { month: "—", day: "—", year: "" };
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return { month: months[(m || 1) - 1] || "—", day: String(d || "").padStart(2, "0"), year: String(y || "") };
}

function formatDateLong(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[(m || 1) - 1]} ${d}, ${y}`;
}

function vehicleTitle(v) {
  return `${v.year || ""} ${v.make || ""} ${v.model || ""}`.replace(/\s+/g, " ").trim() || "Unnamed vehicle";
}
function displayName(v) { return v.nickname || vehicleTitle(v); }
function vehicleSubtitle(v) {
  return v.nickname ? vehicleTitle(v) : (v.trim || TYPE_META[v.type].label);
}

function summarizeItem(it) {
  if (it.product) return (it.brand ? it.brand + " " : "") + it.product;
  if (it.spec) return it.spec;
  if (it.brand) return it.brand;
  return "";
}

function compressImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("bad image"));
      img.onload = () => {
        const maxDim = 1024;
        let { width, height } = img;
        if (width > height) {
          if (width > maxDim) { height = Math.round(height * (maxDim / width)); width = maxDim; }
        } else {
          if (height > maxDim) { width = Math.round(width * (maxDim / height)); height = maxDim; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ============================================================
   PERSISTENCE — IndexedDB, one record per vehicle
   ============================================================ */
const DB_NAME = "garageVehicleDB";
const DB_VERSION = 1;
const STORE = "vehicles";

function idbOpen() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
const dbPromise = idbOpen();

async function dbGetAll() {
  const db = await dbPromise;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}
async function dbPut(vehicle) {
  const db = await dbPromise;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(vehicle);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
async function dbDelete(id) {
  const db = await dbPromise;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function persistVehicle(v) {
  v.updatedAt = Date.now();
  dbPut(v).catch(() => toast("Could not save — storage may be full"));
}

/* ============================================================
   FACTORIES
   ============================================================ */
function newRefItem(label) {
  return { id: uid(), label, spec: "", brand: "", product: "", alternatives: "", capacity: "", notes: "", photo: null };
}
// Days until an ISO date (negative = in the past).
function daysUntil(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const target = new Date(y, (m || 1) - 1, d || 1);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target - today) / 86400000);
}

// Highest odometer/hours value logged for a vehicle, for a given odo type.
function latestOdometer(v, odoType) {
  let max = null;
  for (const e of v.maintenance) {
    if ((e.odoType || "miles") !== odoType) continue;
    const n = parseFloat(e.odoValue);
    if (!isNaN(n) && (max === null || n > max)) max = n;
  }
  return max;
}

// Reminder status for one maintenance entry, based on its own next-due
// date/odometer fields — returns null if no reminder is set on the entry.
function reminderInfo(entry, v) {
  if (!entry.reminderDate && !entry.reminderOdo) return null;
  let overdue = false, soon = false;
  const parts = [];

  if (entry.reminderDate) {
    const days = daysUntil(entry.reminderDate);
    if (days < 0) { overdue = true; parts.push(`${Math.abs(days)}d overdue`); }
    else if (days <= 30) { soon = true; parts.push(days === 0 ? "due today" : `due in ${days}d`); }
    else parts.push(`due ${formatDateLong(entry.reminderDate)}`);
  }

  if (entry.reminderOdo) {
    const odoType = entry.odoType || "miles";
    const unit = odoType === "hours" ? "hrs" : "mi";
    const due = parseFloat(entry.reminderOdo);
    const current = latestOdometer(v, odoType);
    if (!isNaN(due)) {
      if (current != null) {
        const remaining = due - current;
        const soonWindow = odoType === "hours" ? 20 : 500;
        if (remaining < 0) { overdue = true; parts.push(`${Math.round(Math.abs(remaining)).toLocaleString()} ${unit} overdue`); }
        else if (remaining <= soonWindow) { soon = true; parts.push(`due in ${Math.round(remaining).toLocaleString()} ${unit}`); }
        else parts.push(`due at ${due.toLocaleString()} ${unit}`);
      } else {
        parts.push(`due at ${due.toLocaleString()} ${unit}`);
      }
    }
  }

  return { level: overdue ? "overdue" : soon ? "soon" : "later", text: parts.join(" · ") };
}

// Worst reminder level across a vehicle's whole service history, for the garage list badge.
function vehicleReminderLevel(v) {
  let level = null;
  for (const e of v.maintenance) {
    const info = reminderInfo(e, v);
    if (!info) continue;
    if (info.level === "overdue") return "overdue";
    if (info.level === "soon") level = "soon";
  }
  return level;
}

function newVehicle({ type, nickname, year, make, model, trim }) {
  const now = Date.now();
  const d = DEFAULTS[type];
  return {
    id: uid(), type, nickname, year, make, model, trim, photo: null,
    createdAt: now, updatedAt: now,
    overview: d.overview.map((label) => ({ id: uid(), label, value: "", notes: "" })),
    fluids: d.fluids.map(newRefItem),
    filters: d.filters.map(newRefItem),
    parts: d.parts.map(newRefItem),
    maintenance: [],
    notes: [],
  };
}

/* ============================================================
   APP STATE
   ============================================================ */
const state = {
  vehicles: [],
  screen: "garage",       // "garage" | "vehicle"
  currentVehicleId: null,
  currentTab: "overview", // overview | fluids | filters | maintenance | parts | notes
};

function findVehicle(id) { return state.vehicles.find((v) => v.id === id); }

// Per-vehicle maintenance search text, kept outside `state` since it's
// transient UI text, not data that needs to persist or export.
const maintSearch = {};

// Most recent maintenance entry linked to a given fluid/filter/part item,
// used to show "last changed" on its reference row.
function lastServicedEntry(v, key, itemId) {
  let best = null;
  for (const e of v.maintenance) {
    if (!Array.isArray(e.linkedItems) || !e.linkedItems.includes(`${key}:${itemId}`)) continue;
    if (!best || (e.date || "") > (best.date || "")) best = e;
  }
  return best;
}

// Total spend grouped by calendar year, most recent first.
function costByYear(v) {
  const map = {};
  for (const e of v.maintenance) {
    const n = parseFloat(e.cost);
    if (isNaN(n)) continue;
    const year = (e.date || "").slice(0, 4) || "Unknown";
    map[year] = (map[year] || 0) + n;
  }
  return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]));
}

// Guards against malformed/hand-edited imported backups so a bad file
// can't crash the app — always leaves a vehicle with valid shape.
function normalizeVehicle(v) {
  if (!TYPE_META[v.type]) v.type = "car";
  v.overview = Array.isArray(v.overview) ? v.overview : [];
  v.fluids = Array.isArray(v.fluids) ? v.fluids : [];
  v.filters = Array.isArray(v.filters) ? v.filters : [];
  v.parts = Array.isArray(v.parts) ? v.parts : [];
  v.maintenance = Array.isArray(v.maintenance) ? v.maintenance : [];
  v.notes = Array.isArray(v.notes) ? v.notes : [];
  v.id = v.id || uid();
  return v;
}

/* ============================================================
   RENDER
   ============================================================ */
function render() { renderHeader(); renderContent(); renderTabbar(); }

function renderHeader() {
  const header = document.getElementById("header");
  if (state.screen === "vehicle") {
    const v = findVehicle(state.currentVehicleId);
    if (!v) { state.screen = "garage"; return renderHeader(); }
    header.innerHTML = `
      <div class="hdr-row">
        <button class="hdr-btn" data-action="go-garage" aria-label="Back to garage">${ICONS.back}</button>
        <div class="hdr-center">
          <div class="hdr-veh-name">${h(displayName(v))}</div>
          <div class="hdr-veh-sub">${h(vehicleSubtitle(v))}</div>
        </div>
        <button class="hdr-btn" data-action="edit-vehicle" aria-label="Edit vehicle">${ICONS.pencil}</button>
      </div>`;
    return;
  }
  header.innerHTML = `
    <div class="hdr-row" style="padding-top:6px;">
      <button class="hdr-btn" data-action="open-settings" aria-label="Settings">${ICONS.gear}</button>
      <div style="flex:1"></div>
      <button class="hdr-btn rust" data-action="add-vehicle" aria-label="Add vehicle">${ICONS.plus}</button>
    </div>
    <div class="hdr-title-row">
      <h1 class="hdr-title display">Garage</h1>
      <div class="hdr-sub">${state.vehicles.length} ${state.vehicles.length === 1 ? "vehicle" : "vehicles"}</div>
    </div>`;
}

function renderContent() {
  const el = document.getElementById("content");
  el.scrollTop = 0;
  el.innerHTML = state.screen === "vehicle" ? renderVehicleHTML() : renderGarageHTML();
}

function renderTabbar() {
  const el = document.getElementById("tabbar");
  if (state.screen !== "vehicle") { el.classList.remove("active"); el.innerHTML = ""; return; }
  const tabs = [
    ["overview", "Overview", ICONS.overview],
    ["fluids", "Fluids", ICONS.fluids],
    ["filters", "Filters", ICONS.filters],
    ["maintenance", "Maint.", ICONS.maintenance],
    ["parts", "Parts", ICONS.parts],
    ["notes", "Notes", ICONS.notes],
  ];
  el.classList.add("active");
  el.innerHTML = tabs.map(([key, label, icon]) => `
    <button class="tab-btn ${state.currentTab === key ? "active" : ""}" data-action="set-tab" data-tab="${key}">
      ${icon}<span>${label}</span>
    </button>`).join("");
}

/* ---------- Garage screen ---------- */
function renderGarageHTML() {
  if (!state.vehicles.length) {
    return `<div class="garage-empty">
      <div class="display">Your garage is empty</div>
      <p>Add your first vehicle to start building out its fluids, filters, parts, and service history.</p>
    </div>`;
  }
  return `<div class="vehicle-list">${state.vehicles.map(vehicleCardHTML).join("")}</div>`;
}

function vehicleCardHTML(v) {
  const name = displayName(v);
  const meta = v.nickname ? vehicleTitle(v) : (v.trim || "");
  const remLevel = vehicleReminderLevel(v);
  return `
  <button class="vcard" data-action="open-vehicle" data-id="${v.id}">
    <div class="vcard-bar type-${v.type}"></div>
    <div class="vcard-photo">${v.photo ? `<img src="${v.photo}" alt="">` : TYPE_META[v.type].icon}</div>
    <div class="vcard-body">
      <div class="vcard-name">${h(name)}</div>
      ${meta ? `<div class="vcard-meta">${h(meta)}</div>` : ""}
      <div class="vcard-type-tag">${TYPE_META[v.type].icon}${TYPE_META[v.type].label}</div>
    </div>
    ${remLevel ? `<span class="vcard-reminder-dot ${remLevel}" aria-label="${remLevel === "overdue" ? "Service overdue" : "Service due soon"}"></span>` : ""}
    <div class="vcard-chev">${ICONS.chevronRight}</div>
  </button>`;
}

/* ---------- Vehicle screen ---------- */
function renderVehicleHTML() {
  const v = findVehicle(state.currentVehicleId);
  if (!v) return "";
  switch (state.currentTab) {
    case "overview": return renderOverviewTab(v);
    case "fluids": return renderRefTab(v, "fluids");
    case "filters": return renderRefTab(v, "filters");
    case "parts": return renderRefTab(v, "parts");
    case "maintenance": return renderMaintenanceTab(v);
    case "notes": return renderNotesTab(v);
    default: return "";
  }
}

function renderOverviewTab(v) {
  return `
  <div class="vehicle-hero">
    <button class="vehicle-hero-photo" data-action="edit-vehicle">
      ${v.photo ? `<img src="${v.photo}" alt="">` : TYPE_META[v.type].icon}
      <span class="photo-edit-tag">${ICONS.camera}${v.photo ? "Change photo" : "Add photo"}</span>
    </button>
  </div>
  <div class="section-label">Specifications</div>
  <div class="list-group">
    ${v.overview.map(overviewRowHTML).join("")}
    <button class="add-row" data-action="add-overview-field">${ICONS.plus}Add field</button>
  </div>`;
}

function overviewRowHTML(f) {
  return `<button class="row" data-action="open-overview-field" data-id="${f.id}">
    <div class="row-main"><div class="row-label">${h(f.label)}</div></div>
    <div class="row-value ${f.value ? "" : "empty"}">${f.value ? h(f.value) : "Not set"}</div>
    <div class="row-chev">${ICONS.chevronRight}</div>
  </button>`;
}

function renderRefTab(v, key) {
  const items = v[key];
  return `
  <div class="section-label">${REF_LABELS[key]}</div>
  <div class="list-group">
    ${items.map((it) => refRowHTML(v, key, it)).join("")}
    <button class="add-row" data-action="add-item" data-key="${key}">${ICONS.plus}Add ${refSingular(key)}</button>
  </div>`;
}

function refRowHTML(v, key, it) {
  const summary = summarizeItem(it);
  const last = lastServicedEntry(v, key, it.id);
  const lastText = last
    ? `Last changed ${formatDateLong(last.date)}${last.odoValue !== "" && last.odoValue != null ? ` · ${Number(last.odoValue).toLocaleString()} ${last.odoType === "hours" ? "hrs" : "mi"}` : ""}`
    : "";
  return `<button class="row" data-action="open-item" data-key="${key}" data-id="${it.id}">
    <div class="row-main">
      <div class="row-label">${h(it.label)}</div>
      <div class="row-sub ${summary ? "" : "empty"}">${summary ? h(summary) : "Tap to add details"}</div>
      ${lastText ? `<div class="row-sub2">${h(lastText)}</div>` : ""}
    </div>
    ${it.photo ? `<div class="row-thumb"><img src="${it.photo}" alt=""></div>` : ""}
    <div class="row-chev">${ICONS.chevronRight}</div>
  </button>`;
}

function renderMaintenanceTab(v) {
  const total = v.maintenance.reduce((sum, e) => {
    const n = parseFloat(e.cost);
    return isNaN(n) ? sum : sum + n;
  }, 0);
  const years = costByYear(v);
  const reminders = v.maintenance
    .map((e) => ({ e, info: reminderInfo(e, v) }))
    .filter((x) => x.info && (x.info.level === "overdue" || x.info.level === "soon"))
    .sort((a, b) => (a.info.level === b.info.level ? 0 : a.info.level === "overdue" ? -1 : 1));
  const query = maintSearch[v.id] || "";

  return `
  <div style="padding:16px 16px 4px;">
    <button class="btn btn-primary" data-action="add-maintenance">${ICONS.plus}Log service</button>
  </div>
  ${total > 0 ? `
  <div class="maint-total">
    <div>Total spent&nbsp; <strong>$${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</strong></div>
    ${years.length > 1 ? `<div class="maint-total-years">${years.map(([y, amt]) => `<span>${h(y)}: $${amt.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>`).join("")}</div>` : ""}
  </div>` : ""}
  ${reminders.length ? `
  <div class="section-label">Reminders</div>
  <div class="list-group">${reminders.map(({ e, info }) => reminderRowHTML(e, info)).join("")}</div>` : ""}
  ${v.maintenance.length ? `
  <div class="field" style="padding-top:14px;">
    <input type="text" id="maintSearchInput" placeholder="Search service history" value="${h(query)}">
  </div>` : ""}
  <div id="maintLogListWrap">${maintenanceListHTML(v, query)}</div>`;
}

function maintenanceListHTML(v, query) {
  const q = (query || "").trim().toLowerCase();
  const list = [...v.maintenance]
    .filter((e) => !q || [e.service, e.products, e.notes].some((x) => (x || "").toLowerCase().includes(q)))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  if (!v.maintenance.length) {
    return `<div class="empty-hint">No service logged yet. Tap “Log service” to record your first oil change, tire rotation, or repair.</div>`;
  }
  if (!list.length) {
    return `<div class="empty-hint">No service entries match “${h(query)}”.</div>`;
  }
  return `<div class="list-group" style="margin-top:8px;">${list.map((e) => maintRowHTML(e, v)).join("")}</div>`;
}

function reminderRowHTML(e, info) {
  return `<button class="row" data-action="open-maintenance" data-id="${e.id}">
    <div class="row-main">
      <div class="row-label">${h(e.service || "Service")}</div>
      <div class="row-sub">${h(info.text)}</div>
    </div>
    <span class="reminder-badge ${info.level}">${info.level === "overdue" ? "Overdue" : "Due soon"}</span>
    <div class="row-chev">${ICONS.chevronRight}</div>
  </button>`;
}

function maintRowHTML(e, v) {
  const dp = formatDateParts(e.date);
  const odo = e.odoValue !== "" && e.odoValue != null
    ? `${Number(e.odoValue).toLocaleString()} ${e.odoType === "hours" ? "hrs" : "mi"}`
    : "No mileage recorded";
  const costNum = parseFloat(e.cost);
  const cost = !isNaN(costNum) ? `$${costNum.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}` : "";
  const info = reminderInfo(e, v);
  return `<button class="log-row" data-action="open-maintenance" data-id="${e.id}">
    <div class="log-date-block">
      <div class="log-date-month">${dp.month}</div>
      <div class="log-date-day">${dp.day}</div>
      <div class="log-date-year">${dp.year}</div>
    </div>
    <div class="log-main">
      <div class="log-service">${h(e.service || "Service logged")}</div>
      <div class="log-meta">${h(odo)}</div>
      ${Array.isArray(e.partsUsed) && e.partsUsed.length ? `<div class="log-products">${h(e.partsUsed.map((p) => p.name).filter(Boolean).join(", "))}</div>` : (e.products ? `<div class="log-products">${h(e.products)}</div>` : "")}
      ${info ? `<div class="log-reminder ${info.level}">${h(info.text)}</div>` : ""}
    </div>
    ${e.photo ? `<div class="row-thumb"><img src="${e.photo}" alt=""></div>` : ""}
    ${cost ? `<div class="log-cost">${cost}</div>` : ""}
  </button>`;
}

function renderNotesTab(v) {
  const list = [...v.notes].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return `
  <div style="padding:16px 16px 4px;">
    <button class="btn btn-primary" data-action="add-note">${ICONS.plus}Add note</button>
  </div>
  ${list.length
    ? `<div class="list-group" style="margin-top:8px;">${list.map(noteRowHTML).join("")}</div>`
    : `<div class="empty-hint">No notes yet. Use notes for anything that doesn't fit elsewhere — insurance info, known quirks, mod history, reminders.</div>`}`;
}

function noteRowHTML(n) {
  return `<button class="note-row" data-action="open-note" data-id="${n.id}">
    <div class="note-title">${h(n.title || "Untitled note")}</div>
    <div class="note-date">${formatDateLong(n.date)}</div>
    ${n.body ? `<div class="note-body-preview">${h(n.body)}</div>` : ""}
  </button>`;
}

/* ============================================================
   SHEET (bottom modal) SYSTEM
   ============================================================ */
function showSheet({ title, bodyHtml, onSave, saveLabel = "Save", afterMount, showSave = true }) {
  const root = document.getElementById("sheet-root");
  root.innerHTML = `
    <div class="sheet-backdrop" id="sheetBackdrop"></div>
    <div class="sheet" id="sheetEl" role="dialog" aria-modal="true">
      <div class="sheet-handle"></div>
      <div class="sheet-header">
        <button class="sheet-close" id="sheetClose" aria-label="Close">${ICONS.close}</button>
        <div class="sheet-title">${h(title)}</div>
        ${showSave ? `<button class="sheet-save" id="sheetSave">${h(saveLabel)}</button>` : `<span style="width:44px;"></span>`}
      </div>
      <div class="sheet-body" id="sheetBody">${bodyHtml}</div>
    </div>`;
  root.style.pointerEvents = "auto";
  const backdrop = document.getElementById("sheetBackdrop");
  const sheetEl = document.getElementById("sheetEl");
  requestAnimationFrame(() => { backdrop.classList.add("show"); sheetEl.classList.add("show"); });

  function close() {
    backdrop.classList.remove("show");
    sheetEl.classList.remove("show");
    root.style.pointerEvents = "none";
    setTimeout(() => { if (root.firstChild) root.innerHTML = ""; }, 260);
  }
  backdrop.addEventListener("click", close);
  document.getElementById("sheetClose").addEventListener("click", close);
  if (showSave) {
    document.getElementById("sheetSave").addEventListener("click", () => {
      const shouldClose = onSave ? onSave() : true;
      if (shouldClose !== false) close();
    });
  }
  if (afterMount) afterMount({ close });
  return { close };
}

function closeSheetNow() {
  const btn = document.getElementById("sheetClose");
  if (btn) btn.click();
}

function toast(msg) {
  const root = document.getElementById("toast-root");
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  root.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 250); }, 1800);
}

/* ---------- form field builders ---------- */
function fieldText(id, label, value = "", opts = {}) {
  const { placeholder = "", type = "text", min } = opts;
  return `<div class="field"><label class="field-label" for="${id}">${h(label)}</label>
    <input type="${type}" id="${id}" value="${h(value)}" placeholder="${h(placeholder)}"${min !== undefined ? ` min="${min}"` : ""}></div>`;
}
function fieldTextarea(id, label, value = "", opts = {}) {
  const { placeholder = "" } = opts;
  return `<div class="field"><label class="field-label" for="${id}">${h(label)}</label>
    <textarea id="${id}" placeholder="${h(placeholder)}">${h(value)}</textarea></div>`;
}
function photoPickerHTML(id, initial) {
  return `<div class="photo-picker">
    <div class="photo-picker-preview" id="${id}Preview">${initial ? `<img src="${initial}" alt="">` : ICONS.image}</div>
    <div class="photo-picker-actions">
      <label class="btn btn-secondary">
        ${ICONS.camera}<span id="${id}Label">${initial ? "Change photo" : "Add photo"}</span>
        <input type="file" accept="image/*" id="${id}Input" style="display:none;">
      </label>
      <button type="button" class="btn btn-ghost" id="${id}Remove" style="${initial ? "" : "display:none;"}">Remove photo</button>
    </div>
  </div>`;
}
function wirePhotoPicker(id, initial) {
  let current = initial || null;
  const input = document.getElementById(id + "Input");
  const preview = document.getElementById(id + "Preview");
  const label = document.getElementById(id + "Label");
  const removeBtn = document.getElementById(id + "Remove");
  input.addEventListener("change", async () => {
    const file = input.files[0];
    if (!file) return;
    try {
      current = await compressImageFile(file);
      preview.innerHTML = `<img src="${current}" alt="">`;
      label.textContent = "Change photo";
      removeBtn.style.display = "";
    } catch (err) {
      toast("Could not load that photo");
    }
  });
  removeBtn.addEventListener("click", () => {
    current = null;
    preview.innerHTML = ICONS.image;
    label.textContent = "Add photo";
    removeBtn.style.display = "none";
  });
  return { get: () => current };
}

/* ---------- Add vehicle ---------- */
function openAddVehicleSheet() {
  let selectedType = "car";
  const typeOptionHTML = (type) => `<button type="button" class="type-option ${type === "car" ? "active" : ""}" data-type="${type}">
    ${TYPE_META[type].icon}
    <div><div class="type-option-name">${TYPE_META[type].label}</div><div class="type-option-desc">${TYPE_META[type].hint}</div></div>
  </button>`;

  const body = `
    <div class="field">
      <label class="field-label">Vehicle type</label>
      <div class="type-picker" id="typePicker">
        ${typeOptionHTML("car")}${typeOptionHTML("truck")}${typeOptionHTML("dirtbike")}
      </div>
    </div>
    ${fieldText("vNickname", "Nickname", "", { placeholder: "e.g. Shop truck (optional)" })}
    <div class="field-row2">
      ${fieldText("vYear", "Year", "", { placeholder: "2002" })}
      ${fieldText("vMake", "Make", "", { placeholder: "Toyota" })}
    </div>
    <div class="field-row2">
      ${fieldText("vModel", "Model", "", { placeholder: "Tacoma" })}
      ${fieldText("vTrim", "Trim", "", { placeholder: "DLX (optional)" })}
    </div>`;

  showSheet({
    title: "Add vehicle",
    saveLabel: "Add",
    bodyHtml: body,
    afterMount: () => {
      document.querySelectorAll("#typePicker .type-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedType = btn.dataset.type;
          document.querySelectorAll("#typePicker .type-option").forEach((b) => b.classList.toggle("active", b === btn));
        });
      });
    },
    onSave: () => {
      const nickname = document.getElementById("vNickname").value.trim();
      const year = document.getElementById("vYear").value.trim();
      const make = document.getElementById("vMake").value.trim();
      const model = document.getElementById("vModel").value.trim();
      const trim = document.getElementById("vTrim").value.trim();
      if (!nickname && !year && !make && !model) { toast("Add a nickname or year/make/model"); return false; }
      const v = newVehicle({ type: selectedType, nickname, year, make, model, trim });
      state.vehicles.push(v);
      persistVehicle(v);
      state.currentVehicleId = v.id;
      state.currentTab = "overview";
      state.screen = "vehicle";
      render();
      toast("Vehicle added");
    },
  });
}

/* ---------- Edit vehicle ---------- */
function openEditVehicleSheet(v) {
  let photoCtl;
  const body = `
    ${photoPickerHTML("vehiclePhoto", v.photo)}
    ${fieldText("eNickname", "Nickname", v.nickname || "", { placeholder: "e.g. Shop truck (optional)" })}
    <div class="field-row2">
      ${fieldText("eYear", "Year", v.year || "")}
      ${fieldText("eMake", "Make", v.make || "")}
    </div>
    <div class="field-row2">
      ${fieldText("eModel", "Model", v.model || "")}
      ${fieldText("eTrim", "Trim", v.trim || "")}
    </div>
    <div class="field">
      <label class="field-label">Vehicle type</label>
      <div class="field-hint">${TYPE_META[v.type].label} — type can't be changed after a vehicle is created.</div>
    </div>
    <div class="btn-row" style="padding-top:22px;">
      <button type="button" class="btn btn-danger" id="deleteVehicleBtn">${ICONS.trash}Delete vehicle</button>
    </div>`;

  showSheet({
    title: "Edit vehicle",
    bodyHtml: body,
    afterMount: () => {
      photoCtl = wirePhotoPicker("vehiclePhoto", v.photo);
      document.getElementById("deleteVehicleBtn").addEventListener("click", () => {
        if (confirm(`Delete ${displayName(v)}? This removes all its fluids, filters, parts, and service history. This can't be undone.`)) {
          state.vehicles = state.vehicles.filter((x) => x.id !== v.id);
          dbDelete(v.id).catch(() => {});
          state.screen = "garage";
          render();
          toast("Vehicle deleted");
          closeSheetNow();
        }
      });
    },
    onSave: () => {
      v.nickname = document.getElementById("eNickname").value.trim();
      v.year = document.getElementById("eYear").value.trim();
      v.make = document.getElementById("eMake").value.trim();
      v.model = document.getElementById("eModel").value.trim();
      v.trim = document.getElementById("eTrim").value.trim();
      v.photo = photoCtl.get();
      persistVehicle(v);
      render();
      toast("Vehicle updated");
    },
  });
}

/* ---------- Overview field sheet ---------- */
function isVinLikeLabel(label) { return /\bvin\b/i.test(label || ""); }

function openOverviewFieldSheet(v, fieldId) {
  const isNew = !fieldId;
  const field = isNew ? { label: "", value: "", notes: "" } : v.overview.find((f) => f.id === fieldId);
  if (!field) return;

  const body = `
    ${fieldText("ofLabel", "Field name", field.label, { placeholder: "e.g. Tire size" })}
    ${fieldText("ofValue", "Value", field.value, { placeholder: "e.g. 265/70R16" })}
    <div class="field-hint" id="vinHint" style="padding:0 16px 8px;${isVinLikeLabel(field.label) ? "" : "display:none;"}">Standard VINs are 17 characters (letters and numbers, no I, O, or Q). Older vehicles and off-road frame numbers can be shorter — that's fine, this is just a heads-up.</div>
    ${fieldTextarea("ofNotes", "Notes", field.notes, { placeholder: "Optional" })}
    ${!isNew ? `<div class="btn-row"><button type="button" class="btn btn-danger" id="delOverviewBtn">${ICONS.trash}Delete field</button></div>` : ""}`;

  showSheet({
    title: isNew ? "Add field" : "Edit field",
    bodyHtml: body,
    afterMount: () => {
      document.getElementById("ofLabel").addEventListener("input", (e) => {
        document.getElementById("vinHint").style.display = isVinLikeLabel(e.target.value) ? "" : "none";
      });
      if (!isNew) {
        document.getElementById("delOverviewBtn").addEventListener("click", () => {
          if (confirm("Delete this field?")) {
            v.overview = v.overview.filter((f) => f.id !== fieldId);
            persistVehicle(v); renderContent();
            toast("Field deleted");
            closeSheetNow();
          }
        });
      }
    },
    onSave: () => {
      const label = document.getElementById("ofLabel").value.trim();
      if (!label) { toast("Field name is required"); return false; }
      const value = document.getElementById("ofValue").value.trim();
      const notes = document.getElementById("ofNotes").value.trim();
      if (isNew) v.overview.push({ id: uid(), label, value, notes });
      else { field.label = label; field.value = value; field.notes = notes; }
      persistVehicle(v); renderContent();
      toast("Saved");
    },
  });
}

/* ---------- Fluid / Filter / Part item sheet ---------- */
function openRefItemSheet(v, key, itemId) {
  const isNew = !itemId;
  const item = isNew
    ? { label: "", spec: "", brand: "", product: "", alternatives: "", capacity: "", notes: "", photo: null }
    : v[key].find((i) => i.id === itemId);
  if (!item) return;
  let photoCtl;

  const body = `
    ${fieldText("riLabel", "Name", item.label, { placeholder: "e.g. Engine oil" })}
    ${fieldText("riSpec", "Specification", item.spec, { placeholder: "e.g. 5W-30 full synthetic, API SN" })}
    <div class="field-row2">
      ${fieldText("riBrand", "Preferred brand", item.brand, { placeholder: "e.g. Mobil 1" })}
      ${fieldText("riProduct", "Preferred product", item.product, { placeholder: "e.g. Advanced 5000" })}
    </div>
    ${fieldTextarea("riAlt", "Alternatives", item.alternatives, { placeholder: "Other brands or products that work" })}
    ${fieldText("riCap", "Capacity / quantity", item.capacity, { placeholder: "e.g. 4.5 qt" })}
    ${fieldTextarea("riNotes", "Notes", item.notes, { placeholder: "Optional" })}
    ${photoPickerHTML("riPhoto", item.photo)}
    ${!isNew ? `<div class="btn-row"><button type="button" class="btn btn-danger" id="delRiBtn">${ICONS.trash}Delete ${refSingular(key)}</button></div>` : ""}`;

  showSheet({
    title: isNew ? `Add ${refSingular(key)}` : (item.label || `Edit ${refSingular(key)}`),
    bodyHtml: body,
    afterMount: () => {
      photoCtl = wirePhotoPicker("riPhoto", item.photo);
      if (!isNew) {
        document.getElementById("delRiBtn").addEventListener("click", () => {
          if (confirm(`Delete "${item.label}"?`)) {
            v[key] = v[key].filter((i) => i.id !== itemId);
            persistVehicle(v); renderContent();
            toast("Deleted");
            closeSheetNow();
          }
        });
      }
    },
    onSave: () => {
      const label = document.getElementById("riLabel").value.trim();
      if (!label) { toast("Name is required"); return false; }
      const data = {
        label,
        spec: document.getElementById("riSpec").value.trim(),
        brand: document.getElementById("riBrand").value.trim(),
        product: document.getElementById("riProduct").value.trim(),
        alternatives: document.getElementById("riAlt").value.trim(),
        capacity: document.getElementById("riCap").value.trim(),
        notes: document.getElementById("riNotes").value.trim(),
        photo: photoCtl.get(),
      };
      if (isNew) v[key].push({ id: uid(), ...data });
      else Object.assign(item, data);
      persistVehicle(v); renderContent();
      toast("Saved");
    },
  });
}

/* ---------- Maintenance entry sheet ---------- */
function partRowHTML(p) {
  return `<div class="part-row" data-part-id="${p.id}">
    <input type="text" class="part-name" placeholder="Part name" value="${h(p.name || "")}">
    <input type="text" class="part-number" placeholder="Part #" value="${h(p.number || "")}">
    <input type="number" min="0" class="part-cost" placeholder="Cost" value="${h(p.cost || "")}">
    <button type="button" class="part-remove" data-remove-part aria-label="Remove part">${ICONS.close}</button>
  </div>`;
}

function openMaintenanceSheet(v, entryId) {
  const isNew = !entryId;
  const defaultOdo = v.type === "dirtbike" ? "hours" : "miles";
  const entry = isNew
    ? { date: todayISO(), odoType: defaultOdo, odoValue: "", service: "", products: "", cost: "", notes: "", reminderDate: "", reminderOdo: "", photo: null, partsUsed: [], linkedItems: [] }
    : v.maintenance.find((e) => e.id === entryId);
  if (!entry) return;
  let odoType = entry.odoType || defaultOdo;
  let photoCtl;

  const linkKeys = ["fluids", "filters", "parts"];
  const hasRefItems = linkKeys.some((k) => v[k].length > 0);
  const linkedSet = new Set(entry.linkedItems || []);

  const body = `
    ${fieldText("mDate", "Date", entry.date, { type: "date" })}
    <div class="field">
      <label class="field-label">Odometer / hours</label>
      <div class="segmented" id="odoSeg">
        <button type="button" data-val="miles" class="${odoType === "miles" ? "active" : ""}">Miles</button>
        <button type="button" data-val="hours" class="${odoType === "hours" ? "active" : ""}">Hours</button>
      </div>
    </div>
    ${fieldText("mOdoValue", odoType === "hours" ? "Engine hours" : "Mileage", entry.odoValue, { placeholder: "e.g. 84200", type: "number", min: 0 })}
    ${fieldTextarea("mService", "Service performed", entry.service, { placeholder: "e.g. Oil change, rotated tires" })}
    ${fieldTextarea("mProducts", "Notes on products", entry.products, { placeholder: "e.g. used up the last quart from the shelf" })}
    ${fieldText("mCost", "Total cost", entry.cost, { placeholder: "e.g. 65.00", type: "number", min: 0 })}
    ${fieldTextarea("mNotes", "Notes", entry.notes, { placeholder: "Optional" })}
    ${photoPickerHTML("mPhoto", entry.photo)}

    <div class="section-label" style="padding-top:6px;">Parts used</div>
    <div class="field-hint" style="padding:0 16px 6px;">Optional line items — name, part number, cost each.</div>
    <div class="parts-list" id="partsRows">${(entry.partsUsed || []).map(partRowHTML).join("")}</div>
    <button type="button" class="add-row" id="addPartBtn">${ICONS.plus}Add part</button>

    ${hasRefItems ? `
    <div class="section-label" style="padding-top:6px;">Related to</div>
    <div class="field-hint" style="padding:0 16px 6px;">Link this service to fluids/filters/parts to track when they were last changed.</div>
    <div class="link-picker">
      ${linkKeys.map((key) => v[key].length ? `
        <div class="link-group-label">${REF_LABELS[key]}</div>
        ${v[key].map((it) => `<label class="link-row"><input type="checkbox" value="${key}:${it.id}" ${linkedSet.has(`${key}:${it.id}`) ? "checked" : ""}><span>${h(it.label)}</span></label>`).join("")}
      ` : "").join("")}
    </div>` : ""}

    <div class="section-label" style="padding-top:6px;">Remind me</div>
    ${fieldText("mReminderDate", "Next due date", entry.reminderDate || "", { type: "date" })}
    ${fieldText("mReminderOdo", odoType === "hours" ? "Next due hours" : "Next due mileage", entry.reminderOdo || "", { placeholder: "e.g. 87200", type: "number", min: 0 })}
    <div class="field-hint" style="padding:0 16px 6px;">Optional — leave blank if you don't want a reminder for this service.</div>
    ${!isNew ? `<div class="btn-row"><button type="button" class="btn btn-danger" id="delMBtn">${ICONS.trash}Delete entry</button></div>` : ""}`;

  showSheet({
    title: isNew ? "Log service" : "Edit service entry",
    bodyHtml: body,
    afterMount: () => {
      photoCtl = wirePhotoPicker("mPhoto", entry.photo);
      document.querySelectorAll("#odoSeg button").forEach((btn) => {
        btn.addEventListener("click", () => {
          odoType = btn.dataset.val;
          document.querySelectorAll("#odoSeg button").forEach((b) => b.classList.toggle("active", b === btn));
          const lbl = document.querySelector('label[for="mOdoValue"]');
          if (lbl) lbl.textContent = odoType === "hours" ? "Engine hours" : "Mileage";
          const remLbl = document.querySelector('label[for="mReminderOdo"]');
          if (remLbl) remLbl.textContent = odoType === "hours" ? "Next due hours" : "Next due mileage";
        });
      });
      document.getElementById("addPartBtn").addEventListener("click", () => {
        document.getElementById("partsRows").insertAdjacentHTML("beforeend", partRowHTML({ id: uid(), name: "", number: "", cost: "" }));
      });
      document.getElementById("partsRows").addEventListener("click", (e) => {
        const btn = e.target.closest("[data-remove-part]");
        if (btn) btn.closest(".part-row").remove();
      });
      if (!isNew) {
        document.getElementById("delMBtn").addEventListener("click", () => {
          if (confirm("Delete this service entry?")) {
            v.maintenance = v.maintenance.filter((e) => e.id !== entryId);
            persistVehicle(v); renderContent();
            toast("Entry deleted");
            closeSheetNow();
          }
        });
      }
    },
    onSave: () => {
      const date = document.getElementById("mDate").value || todayISO();
      const odoValue = document.getElementById("mOdoValue").value.trim();
      const service = document.getElementById("mService").value.trim();
      if (!service) { toast("Describe the service performed"); return false; }
      const products = document.getElementById("mProducts").value.trim();
      const cost = document.getElementById("mCost").value.trim();
      const notes = document.getElementById("mNotes").value.trim();
      const reminderDate = document.getElementById("mReminderDate").value;
      const reminderOdo = document.getElementById("mReminderOdo").value.trim();

      if (odoValue !== "" && (isNaN(parseFloat(odoValue)) || parseFloat(odoValue) < 0)) { toast("Mileage/hours can't be negative"); return false; }
      if (cost !== "" && (isNaN(parseFloat(cost)) || parseFloat(cost) < 0)) { toast("Cost can't be negative"); return false; }
      if (reminderOdo !== "" && (isNaN(parseFloat(reminderOdo)) || parseFloat(reminderOdo) < 0)) { toast("Next due mileage/hours can't be negative"); return false; }

      const partsUsed = Array.from(document.querySelectorAll("#partsRows .part-row")).map((row) => ({
        id: row.dataset.partId,
        name: row.querySelector(".part-name").value.trim(),
        number: row.querySelector(".part-number").value.trim(),
        cost: row.querySelector(".part-cost").value.trim(),
      })).filter((p) => p.name || p.number || p.cost);
      for (const p of partsUsed) {
        if (p.cost !== "" && (isNaN(parseFloat(p.cost)) || parseFloat(p.cost) < 0)) { toast("Part cost can't be negative"); return false; }
      }

      const linkedItems = Array.from(document.querySelectorAll(".link-row input:checked")).map((cb) => cb.value);

      const data = { date, odoType, odoValue, service, products, cost, notes, reminderDate, reminderOdo, photo: photoCtl.get(), partsUsed, linkedItems };
      if (isNew) v.maintenance.push({ id: uid(), ...data });
      else Object.assign(entry, data);
      persistVehicle(v); renderContent();
      toast("Saved");
    },
  });
}

/* ---------- Note sheet ---------- */
function openNoteSheet(v, noteId) {
  const isNew = !noteId;
  const note = isNew ? { title: "", body: "", date: todayISO() } : v.notes.find((n) => n.id === noteId);
  if (!note) return;

  const body = `
    ${fieldText("nTitle", "Title", note.title, { placeholder: "e.g. Insurance info" })}
    ${fieldText("nDate", "Date", note.date, { type: "date" })}
    ${fieldTextarea("nBody", "Note", note.body, { placeholder: "Write anything worth remembering about this vehicle" })}
    ${!isNew ? `<div class="btn-row"><button type="button" class="btn btn-danger" id="delNBtn">${ICONS.trash}Delete note</button></div>` : ""}`;

  showSheet({
    title: isNew ? "Add note" : "Edit note",
    bodyHtml: body,
    afterMount: () => {
      const ta = document.getElementById("nBody");
      if (ta) ta.style.minHeight = "140px";
      if (!isNew) {
        document.getElementById("delNBtn").addEventListener("click", () => {
          if (confirm("Delete this note?")) {
            v.notes = v.notes.filter((n) => n.id !== noteId);
            persistVehicle(v); renderContent();
            toast("Note deleted");
            closeSheetNow();
          }
        });
      }
    },
    onSave: () => {
      const title = document.getElementById("nTitle").value.trim();
      const date = document.getElementById("nDate").value || todayISO();
      const bodyText = document.getElementById("nBody").value.trim();
      if (!title && !bodyText) { toast("Add a title or note"); return false; }
      const data = { title, date, body: bodyText };
      if (isNew) v.notes.push({ id: uid(), ...data });
      else Object.assign(note, data);
      persistVehicle(v); renderContent();
      toast("Saved");
    },
  });
}

/* ---------- Settings sheet (backup / restore) ---------- */
function openSettingsSheet() {
  const total = state.vehicles.length;
  const theme = getTheme();
  const body = `
    <div class="field">
      <label class="field-label">Appearance</label>
      <div class="segmented" id="themeSeg">
        <button type="button" data-val="auto" class="${theme === "auto" ? "active" : ""}">Auto</button>
        <button type="button" data-val="light" class="${theme === "light" ? "active" : ""}">Light</button>
        <button type="button" data-val="dark" class="${theme === "dark" ? "active" : ""}">Dark</button>
      </div>
      <div class="field-hint">Auto follows your phone's system setting.</div>
    </div>
    <div class="field-hint" style="padding:0 16px 14px;">Everything you enter is stored only on this device, in this browser. It isn't synced or backed up automatically — export a backup now and then, especially before switching phones.</div>
    <div class="settings-group">
      <button class="row" id="exportBtn">
        <div class="row-main"><div class="row-label">Export backup</div><div class="row-sub">Save all vehicle data as a file</div></div>
        ${ICONS.download}
      </button>
      <label class="row" style="cursor:pointer;">
        <div class="row-main"><div class="row-label">Import backup</div><div class="row-sub">Replace app data from a file</div></div>
        ${ICONS.upload}
        <input type="file" accept="application/json" id="importInput" style="display:none;">
      </label>
    </div>
    <div class="settings-group">
      <button class="row" id="eraseBtn">
        <div class="row-main"><div class="row-label text-danger">Erase all vehicles</div><div class="row-sub">${total} vehicle${total === 1 ? "" : "s"} currently stored on this device</div></div>
      </button>
    </div>`;

  showSheet({
    title: "Settings",
    showSave: false,
    bodyHtml: body,
    afterMount: () => {
      document.querySelectorAll("#themeSeg button").forEach((btn) => {
        btn.addEventListener("click", () => {
          setTheme(btn.dataset.val);
          document.querySelectorAll("#themeSeg button").forEach((b) => b.classList.toggle("active", b === btn));
        });
      });
      document.getElementById("exportBtn").addEventListener("click", exportBackup);
      document.getElementById("importInput").addEventListener("change", (e) => importBackup(e.target.files[0]));
      document.getElementById("eraseBtn").addEventListener("click", () => {
        if (confirm("Erase all vehicles and their data? This cannot be undone.")) {
          Promise.all(state.vehicles.map((v) => dbDelete(v.id))).then(() => {
            state.vehicles = [];
            state.screen = "garage";
            render();
            toast("All data erased");
            closeSheetNow();
          });
        }
      });
    },
  });
}

function exportBackup() {
  const payload = { app: "garage-vehicle-reference", exportedAt: new Date().toISOString(), vehicles: state.vehicles };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `garage-backup-${todayISO()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast("Backup file ready");
}

function importBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const data = JSON.parse(reader.result);
      const raw = Array.isArray(data.vehicles) ? data.vehicles : (Array.isArray(data) ? data : null);
      if (!raw) throw new Error("bad format");
      const vehicles = raw.map(normalizeVehicle);
      if (!confirm(`Import ${vehicles.length} vehicle${vehicles.length === 1 ? "" : "s"}? This replaces everything currently in the app.`)) return;
      await Promise.all(state.vehicles.map((v) => dbDelete(v.id)));
      await Promise.all(vehicles.map((v) => dbPut(v)));
      state.vehicles = vehicles;
      state.screen = "garage";
      render();
      toast("Backup imported");
      closeSheetNow();
    } catch (err) {
      toast("That file could not be read as a backup");
    }
  };
  reader.readAsText(file);
}

/* ============================================================
   ACTION DISPATCH (event delegation)
   ============================================================ */
const ACTIONS = {
  "add-vehicle": () => openAddVehicleSheet(),
  "open-vehicle": (el) => {
    state.currentVehicleId = el.dataset.id;
    state.currentTab = "overview";
    state.screen = "vehicle";
    render();
  },
  "go-garage": () => { state.screen = "garage"; render(); },
  "edit-vehicle": () => { const v = findVehicle(state.currentVehicleId); if (v) openEditVehicleSheet(v); },
  "set-tab": (el) => { state.currentTab = el.dataset.tab; renderContent(); renderTabbar(); },
  "open-settings": () => openSettingsSheet(),
  "add-overview-field": () => { const v = findVehicle(state.currentVehicleId); if (v) openOverviewFieldSheet(v, null); },
  "open-overview-field": (el) => { const v = findVehicle(state.currentVehicleId); if (v) openOverviewFieldSheet(v, el.dataset.id); },
  "add-item": (el) => { const v = findVehicle(state.currentVehicleId); if (v) openRefItemSheet(v, el.dataset.key, null); },
  "open-item": (el) => { const v = findVehicle(state.currentVehicleId); if (v) openRefItemSheet(v, el.dataset.key, el.dataset.id); },
  "add-maintenance": () => { const v = findVehicle(state.currentVehicleId); if (v) openMaintenanceSheet(v, null); },
  "open-maintenance": (el) => { const v = findVehicle(state.currentVehicleId); if (v) openMaintenanceSheet(v, el.dataset.id); },
  "add-note": () => { const v = findVehicle(state.currentVehicleId); if (v) openNoteSheet(v, null); },
  "open-note": (el) => { const v = findVehicle(state.currentVehicleId); if (v) openNoteSheet(v, el.dataset.id); },
};

document.body.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const fn = ACTIONS[el.dataset.action];
  if (fn) fn(el, e);
});

document.body.addEventListener("input", (e) => {
  if (e.target.id !== "maintSearchInput") return;
  const v = findVehicle(state.currentVehicleId);
  if (!v) return;
  maintSearch[v.id] = e.target.value;
  const wrap = document.getElementById("maintLogListWrap");
  if (wrap) wrap.innerHTML = maintenanceListHTML(v, e.target.value);
});

/* ============================================================
   INIT
   ============================================================ */
async function init() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
  try {
    state.vehicles = (await dbGetAll()).map(normalizeVehicle);
    state.vehicles.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  } catch (err) {
    toast("Could not load saved vehicles");
  }
  render();
}

document.addEventListener("DOMContentLoaded", init);

// Exposed on window for console debugging and automated testing — harmless
// in normal use (the app never reads these back off window itself).
window.state = state;
window.ACTIONS = ACTIONS;
window.normalizeVehicle = normalizeVehicle;
window.exportBackup = exportBackup;
