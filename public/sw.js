const CACHE_NAME = 'game-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/index-BmDsc73_.css',
  '/assets/index-DaGf40D4.js',
  '/manifest.json',
  '/vite.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
      .catch(err => console.error('Install failed:', err))
  );
});

self.addEventListener('activate', event => {
  const keep = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.map(name => !keep.includes(name) ? caches.delete(name) : null)
      ))
      .then(() => self.clients.claim())
  );
});

async function fetchAndCache(request) {
  const networkResponse = await fetch(request);
  if (
    networkResponse.ok &&
    networkResponse.type === 'basic'
  ) {
    const clone = networkResponse.clone();
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, clone);
  }
  return networkResponse;
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }
  const url = new URL(event.request.url);

  if (url.pathname.startsWith('/api/game/')) {
    event.respondWith(
      fetchAndCache(event.request)
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;

          const headers = { 'Content-Type': 'application/json' };
          if (url.pathname.endsWith('/leaderboard')) {
            return new Response(JSON.stringify({
              players: [{
                rank: 1,
                username: 'offline-demo',
                level: 0,
                xp: 0,
                gold: 0,
              }],
            }), { headers });
          }
          if (url.pathname.endsWith('/market')) {
            return new Response(JSON.stringify({ items: [] }), { headers });
          }
          return new Response('Offline', { status: 503, statusText: 'Offline' });
        })
    );
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html')
        .then(cached => cached || fetchAndCache(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        return cached || fetchAndCache(event.request);
      })
  );
});
