'use strict';
const CACHE='discovery-batch100-v1',ROOT=new URL('./',self.location.href),PATHS=['./','./index.html','./guide.html','./examples.html'].map(p=>new URL(p,ROOT).href);
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PATHS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('discovery-batch')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);u.search='';u.hash='';if(!PATHS.includes(u.href))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(u.href,copy)));}return r;}).catch(()=>caches.match(u.href).then(r=>r||new Response('Offline copy unavailable. Use your downloaded Discovery HTML.',{status:503,headers:{'Content-Type':'text/plain'}}))));});
