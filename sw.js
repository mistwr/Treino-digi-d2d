// SW killer - apaga tudo e força reload
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', async e => {
  // Apaga todos os caches
  const keys = await caches.keys();
  await Promise.all(keys.map(k => caches.delete(k)));
  // Desinstala este SW
  await self.registration.unregister();
  // Força reload em todos os tabs
  const clients = await self.clients.matchAll({type: 'window'});
  clients.forEach(client => client.navigate(client.url));
});

// Nunca usa cache - sempre network
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request, {cache: 'no-store'}));
});
