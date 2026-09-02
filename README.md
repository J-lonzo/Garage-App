# Garage — Vehicle Reference & Maintenance

A personal reference and service-log app for your vehicles. Runs entirely
in your browser — there's no server and no account. Everything you enter
is stored on your iPhone only, inside Safari.

## Why you need to host this somewhere

iOS only allows "Add to Home Screen" to install as a true full-screen app
with offline support when the page is served over **https://**. Opening
`index.html` straight from Files won't give you the installable app
experience. The good news: hosting a few static files is free and takes
about two minutes.

### Easiest option — Netlify Drop (no account needed)

1. On a computer, go to **https://app.netlify.com/drop**
2. Drag the whole `garage-app` folder onto the page.
3. Netlify gives you a URL like `https://random-name-123.netlify.app`.
4. Open that URL on your iPhone in **Safari**.

### Alternative — GitHub Pages

1. Create a new GitHub repo and upload everything in this folder to it.
2. In the repo, go to **Settings → Pages**, set the source to your main
   branch, save.
3. GitHub gives you a URL like `https://yourname.github.io/reponame/`.
   Open it in Safari on your iPhone.

### Installing on your iPhone

1. Open the site's URL in **Safari** (must be Safari, not Chrome).
2. Tap the **Share** button (square with an arrow).
3. Tap **Add to Home Screen**.
4. Open it from your Home Screen from then on — it launches full-screen,
   with no Safari address bar, and keeps working without a signal once
   it's loaded once.

## Backing up your data

Your vehicles, fluids, parts, and service history live in this browser
only — nothing is synced anywhere. If you ever clear Safari's website
data, get a new phone, or delete the app, that data is gone unless you've
backed it up.

Use **Settings (gear icon, top left) → Export backup** every so often.
It saves a `.json` file with everything in the app. **Settings → Import
backup** restores from that file (on this phone or a new one).

## What's inside

- `index.html`, `styles.css`, `app.js` — the app itself
- `manifest.json`, `sw.js` — what makes it installable and work offline
- `icons/`, `fonts/` — the app icon and the display typeface, bundled
  locally so the app works fully offline once installed
