// This is the "Offline copy of pages" service worker

const CACHE_NAME = "cache-v4";

const FILES_TO_CACHE = ["offline.html", "icons/favicon.ico"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(FILES_TO_CACHE);
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (CACHE_NAME !== key) return caches.delete(key);
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  if ("navigate" !== event.request.mode) return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.open(CACHE_NAME).then((cache) => cache.match("offline.html"))
    )
  );
});
