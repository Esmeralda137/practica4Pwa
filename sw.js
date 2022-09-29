self.addEventListener('install', (event) => {
    console.log('Instalanding...');

    //Haciendo el cache del app shell
    const respCache = caches.open('cache-app-shell').then((cache) => {
        return cache.addAll([
            '/',
            '/index.html',
            '/js/app.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js',
            'https://reqres.in/api/users'
        ])
    });

    // cache imagenes
    caches.open('cache-images');

    event.waitUntil(respCache);
})

//Only cache
self.addEventListener('fetch', (event) => {
    if (event.request.method == "GET")
    {
        const response = caches.match(event.request);
        event.respondWith(response);
    } else {
        console.log('--> ', event.request);
        respondWith(event);
    }
    
})