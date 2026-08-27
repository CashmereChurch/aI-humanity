/* AI & Humanity Conference 2026 — offline cache
   Bump CACHE on every deploy, or returning phones keep the old page. */
const CACHE = 'ai2026-v5';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './banner.jpg',
  './banner.webp',
  './map-parking.jpg',
  './map-parking.webp',
  './venue-plan.jpg',
  './venue-plan.webp',
  './sponsor-hope.png',
  './sponsor-pressgo.png',
  './speaker-garner.jpg',
  './speaker-galloway.jpg',
  './speaker-maccallum.jpg',
  './speaker-humphrey.jpg',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

// Install: cache each file on its own. cache.addAll() is all-or-nothing —
// one 404 and NOTHING gets cached. This way a missing file costs only that file.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.all(
        ASSETS.map(url =>
          cache.add(url).catch(err => console.warn('SW: skipped', url, err))
        )
      ))
      .then(() => self.skipWaiting())
  );
});

// Activate: bin old caches so a redeploy actually reaches people.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: stale-while-revalidate. Instant offline, and picks up
// changes on the next load whenever there IS a connection.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Leave other origins alone (Humanitix photos, Maps, Metro).
  if (new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      const fresh = fetch(req)
        .then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);

      return cached || fresh;
    })
  );
});
