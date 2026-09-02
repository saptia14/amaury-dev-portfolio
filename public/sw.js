// Service worker retirado.
//
// La versión anterior precacheaba rutas del servidor de desarrollo
// (/src/main.jsx, /src/App.jsx, ...) que en producción devuelven 404, y
// guardaba TODA respuesta GET del mismo origen -- incluida '/' -- en una caché
// sin versión y sin limpieza. Como Vite emite assets con hash, tras un deploy
// un fallo de red podía servir un index.html viejo que apunta a chunks que ya
// no existen: pantalla en blanco sin más salida que desregistrar el worker a
// mano.
//
// No se puede borrar este archivo todavía: un navegador que ya registró
// /sw.js conserva el último worker bueno si una petición posterior falla, así
// que borrarlo dejaría a los visitantes recurrentes atrapados en el worker con
// bugs de forma permanente. Esta lápida se instala, borra todas las cachés, se
// desregistra y recarga las pestañas abiertas. Se puede eliminar el archivo
// (y el script de registro en index.html) en un release posterior.

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((client) => client.navigate(client.url));
  })());
});

// Sin handler de fetch: las peticiones van directo a la red.
