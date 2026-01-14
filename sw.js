self.addEventListener('install', async event => {
  const cache = await caches.open('camera-share-cache');
  cache.addAll([
    '/',
    '/index.html',
    '/app.js',
    '/style.css',
    '/manifest.json'
  ]);
  console.log('Installation terminée - Fichiers mis en cache');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});