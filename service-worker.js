const cacheName = "todo-app-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/main.css",
  "/main.js",
  "/manifest.webmanifest",
  "/images/icon-32.png",
  "/images/icon-144.png",
  "/images/icon-192.png",
  "/images/icon-512.png"
];

self.addEventListener("install", event => {
  console.log("install tritt ein");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("opened cache");
      // Resultat von addAll ist ein Promise
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  console.log("activate tritt ein");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(oldCacheName => {
          if (oldCacheName !== cacheName) {
            return caches.delete(oldCacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request));
});
