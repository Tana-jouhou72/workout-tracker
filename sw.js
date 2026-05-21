const CACHE_NAME = 'apm-v2'; // Changed to v2 to force an instant update
const ASSETS = [
    './', 
    './index.html', 
    './manifest.json'
];

self.addEventListener('install', (event) => {    
    event.waitUntil(        
        caches.open(CACHE_NAME).then(cache => {
            // This prevents the entire installation from crashing if one file is missing
            return Promise.allSettled(
                ASSETS.map(asset => cache.add(asset).catch(err => console.log('Cache failed for:', asset)))
            );
        })
    );    
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {    
    event.waitUntil(        
        caches.keys().then(keys =>            
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))        
        )    
    );    
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {    
    event.respondWith(        
        caches.match(event.request).then(cached => cached || fetch(event.request))    
    );
});
