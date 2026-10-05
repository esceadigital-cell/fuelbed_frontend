self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches
            .open("app-shell")
            .then((cache) =>
                cache.addAll([
                    "/offline.html",
                    "/fonts/die-grotesk-b-regular.woff2",
                    "/icons/escea_logo_orange.svg",
                    "/icons/burger_menu.png",
                    "/icons/info_circle_dark.png",
                    "/icons/download_done.png",
                    "/icons/download.png",
                    "/icons/close.png",
                    "/icons/arrow_circle_right_orange.png",
                ]),
            ),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Next.js build files (JS/CSS): cache-first, saved on first load
    if (url.pathname.startsWith("/_next/static/")) {
        event.respondWith(
            caches.match(event.request).then(
                (cached) =>
                    cached ||
                    fetch(event.request).then((res) => {
                        if (res.ok) {
                            const copy = res.clone();
                            caches.open("next-static").then((c) => c.put(event.request, copy));
                        }
                        return res;
                    }),
            ),
        );
        return;
    }

    // Logo and icons from /public: cache-first
    if (url.pathname.startsWith("/icons/")) {
        event.respondWith(
            caches.match(event.request).then((cached) => cached || fetch(event.request)),
        );
        return;
    }

    // Strapi media: cache-first
    if (url.pathname.startsWith("/uploads/")) {
        event.respondWith(
            caches.match(event.request).then((cached) => cached || fetch(event.request)),
        );
        return;
    }

    // Fonts: cache-first
    if (url.pathname.startsWith("/fonts/")) {
        event.respondWith(
            caches.match(event.request).then((cached) => cached || fetch(event.request)),
        );
        return;
    }

    // Any real page navigation (typing a URL, clicking a link, refresh, back/forward)
    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request).catch(async () => {
                const exact = await caches.match(event.request);
                if (exact) return exact;

                const ignoringSearch = await caches.match(event.request, { ignoreSearch: true });
                if (ignoringSearch) return ignoringSearch;

                return caches.match("/offline.html");
            }),
        );
        return;
    }
});
