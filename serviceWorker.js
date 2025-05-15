// serviceWorker.js

const CACHE_NAME = "diccionario-ar-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/admin.html",
  "/agregar.html",
  "/Middle-of-April.ttf",
  "/FONDOOO.jpeg"
];

// Cachear archivos esenciales al instalar
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Responder desde caché o desde red si no está en caché
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activar: eliminar versiones antiguas del caché si existieran
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});
