self.addEventListener('install', event => {
  console.log('Service Worker: Instalado');
  event.waitUntil(
      caches.open('v1').then(cache => {
          return cache.addAll([
              './',
              './index.html',
              './manifest.json',
              'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css',
              'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js'
          ]);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request).then(response => {
          return response || fetch(event.request);
      })
  );
});
  