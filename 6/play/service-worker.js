const CACHE_NAME = "play-cache-v1";

// Cache all requests within the /6/play/ directory
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/6/play/")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          })
        );
      })
    );
  }
});