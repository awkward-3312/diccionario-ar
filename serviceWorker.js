const CACHE_NAME = "diccionario-ar-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/Middle-of-April.ttf",
  "/FONDOOO.jpeg",
  "/admin.html",
  "/agregar.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
