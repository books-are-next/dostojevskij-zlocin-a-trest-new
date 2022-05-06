/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-501bc8a';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./zlocin_a_trest_002.html","./zlocin_a_trest_005.html","./zlocin_a_trest_006.html","./zlocin_a_trest_007.html","./zlocin_a_trest_008.html","./zlocin_a_trest_009.html","./zlocin_a_trest_010.html","./zlocin_a_trest_011.html","./zlocin_a_trest_012.html","./zlocin_a_trest_013.html","./zlocin_a_trest_014.html","./zlocin_a_trest_015.html","./zlocin_a_trest_016.html","./zlocin_a_trest_017.html","./zlocin_a_trest_018.html","./zlocin_a_trest_019.html","./zlocin_a_trest_020.html","./zlocin_a_trest_021.html","./zlocin_a_trest_022.html","./zlocin_a_trest_023.html","./zlocin_a_trest_024.html","./zlocin_a_trest_025.html","./zlocin_a_trest_026.html","./zlocin_a_trest_027.html","./zlocin_a_trest_028.html","./zlocin_a_trest_029.html","./zlocin_a_trest_030.html","./zlocin_a_trest_031.html","./zlocin_a_trest_032.html","./zlocin_a_trest_033.html","./zlocin_a_trest_034.html","./zlocin_a_trest_035.html","./zlocin_a_trest_036.html","./zlocin_a_trest_037.html","./zlocin_a_trest_038.html","./zlocin_a_trest_039.html","./zlocin_a_trest_040.html","./zlocin_a_trest_041.html","./zlocin_a_trest_042.html","./zlocin_a_trest_043.html","./zlocin_a_trest_044.html","./zlocin_a_trest_045.html","./zlocin_a_trest_046.html","./zlocin_a_trest_047.html","./zlocin_a_trest_048.html","./zlocin_a_trest_049.html","./zlocin_a_trest_050.html","./zlocin_a_trest_051.html","./zlocin_a_trest_052.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.jpeg","./resources/image002_fmt.jpeg","./resources/obalka_zlocin_a_trest_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
