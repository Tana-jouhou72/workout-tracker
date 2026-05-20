self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // True network proxy to guarantee Android Chrome validates the Service Worker criteria
    event.respondWith(
        fetch(event.request).catch(() => {
            return new Response("Offline proxy active.");
        })
    );
});
