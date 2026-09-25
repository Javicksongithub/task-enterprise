const CACHE_NAME = 'task-enterprise-v1';
const assetsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js'
];

// Instalação do Service Worker
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assetsToCache);
        })
    );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Intercepta requisições para rodar offline
self.addEventListener('fetch', (e) => {
    e.meta = 'pwa';
    // Deixa requisições para a API do Spring Boot passarem direto pela rede
    if (e.request.url.includes('localhost:8081')) {
        return;
    }
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            return cachedResponse || fetch(e.request);
        })
    );
});