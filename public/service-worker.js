// service-worker.js

// Nombre y versión de la caché
const CACHE_NAME = 'bingo-game-cache-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/*',
    '/css/styles.css',
    '/js/app.js',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png'
];

// Evento de instalación: se activa cuando se instala el Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Archivos en caché');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Evento de activación: limpia cachés antiguas si hay una nueva versión
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (CACHE_NAME !== cacheName) {
                        console.log('Cache antigua eliminada');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Evento de fetch: sirve archivos desde la caché cuando esté offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Si el archivo está en caché, lo devuelve; si no, hace una solicitud de red
                return response || fetch(event.request);
            })
    );
});
