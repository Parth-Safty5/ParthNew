self.options = {
    "domain": "5gvci.com",
    "zoneId": 10668069
}
self.lary = ""
importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw')

const cacheName = 'parthnew-v3'; // Is baar v3 kar dete hain, iske baad tension khatam

// Sirf shuruati zaroori files
const coreAssets = [
  './',
  './index.html',
  './manifest.json',
  './logo.webp',
  './load-common.js'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(coreAssets);
    })
  );
  self.skipWaiting();
});

// Activate Event: Purane version ka kachra saaf karne ke liye
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      );
    })
  );
});

// FETCH EVENT: Network-First Strategy (Best for SEO)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Agar internet hai, toh naya content dikhao aur use cache mein save/update karo
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(cacheName).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Agar internet nahi hai, sirf tabhi cache (offline data) check karo
        return caches.match(event.request);
      })
  );

});
