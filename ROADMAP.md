# Roadmap — making this a "real" app

Notes for future upgrades, so the next round of work doesn't have to
rediscover this from scratch. Nothing here is urgent — the app works fine
today as a personal, offline, single-device tool. This is what "more
professional and efficient" would mean if/when that's worth doing.

## Architecture

- **Single 1000+ line `app.js`, no build step, no framework.** Fine at
  the current size, but the next real feature (see below) will start to
  hurt without splitting into modules and adding a bundler (Vite is the
  low-ceremony choice — keeps this static-hostable, adds nothing at
  runtime).
- **Per-record persistence.** IndexedDB currently stores one giant
  document per vehicle; editing a single maintenance entry rewrites the
  whole vehicle, embedded photos included. Fine at personal scale, but
  worth splitting into separate object stores (vehicles / maintenance /
  fluids / filters / parts) before this app has years of photo-heavy
  history in it. Needs a real migration path — do not attempt this
  casually, it's the one change that can silently corrupt existing data.
- **No tests.** Every verification so far has been manual (or an ad hoc
  Playwright script thrown away after each change). Worth a real
  Playwright test suite committed to the repo, covering: add/edit/delete
  for each entity type, backup export/import round-trip, and the
  reminder/last-serviced computed logic (easy to silently break, hard to
  notice visually).
- **No CI.** A GitHub Actions workflow that runs the above tests (and
  maybe a lint pass) on every push would catch regressions before they
  reach the live site, instead of relying on a manual click-through.

## Data & sync

- **No accounts, no sync, single device only.** By design today — but
  it's the biggest gap versus a "real app." If this ever needs to work
  across your phone *and* a computer, or survive a lost phone without a
  manual export, it needs a backend: even something minimal (Cloudflare
  Workers + D1, or Supabase) would give real sync without a heavy stack.
  This is a bigger decision than the others — worth deciding deliberately
  rather than backing into it.
- **Backup is manual and easy to forget.** Auto-export on a schedule (or
  a gentle in-app nudge if it's been N weeks since the last export) would
  reduce the "lost my phone, lost my data" risk without needing a backend.

## Reliability

- **Service worker versioning is manual.** `CACHE_NAME` has to be
  bumped by hand on every deploy (see `sw.js`) or updates don't
  propagate — a build step could generate this automatically from a
  content hash instead of relying on remembering to bump a string.

## Feature depth (from the original audit)

Already shipped: receipt/work photos, due-date & mileage reminders,
spend totals and by-year breakdown, structured parts-used line items,
linking service entries to fluid/filter/part records ("last changed"),
search, night mode.

Still on the table, not done:
- Cost reporting beyond by-year (e.g. by service type, by vehicle
  comparison).
- CSV export, not just full JSON backup.
- VIN decoding (auto-fill make/model/year/engine from a VIN via a free
  API) — nice quality-of-life, needs a network call so breaks the
  fully-offline model for that one feature.

## If this ever goes toward "something shops would buy"

Noted from the original conversation as a possible future direction, not
a current goal — the app is intentionally scoped to personal DIY use
right now. If that changes, the shape of the work is different in kind,
not just degree: multi-user auth, a real backend, shop/customer/vehicle
relationships, invoicing, and a subscription/billing model. Don't bolt
this onto the current single-device architecture piecemeal — it'd be a
parallel rebuild, not an upgrade path.
