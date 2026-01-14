self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('camera-share-pwa').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/app.js',
        '/manifest.json',
        '/sw.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});