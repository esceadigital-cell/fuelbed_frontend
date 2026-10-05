"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
    useEffect(() => {
        if (!("serviceWorker" in navigator)) return;

        if (process.env.NODE_ENV === "production") {
            navigator.serviceWorker.register("/sw.js");
        } else {
            // development: remove any service worker and caches left from earlier testing
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                registrations.forEach((r) => r.unregister());
            });
            caches.keys().then((keys) => {
                keys.filter((key) => !key.startsWith("guide-")).forEach((key) =>
                    caches.delete(key),
                );
            });
        }
    }, []);

    return null;
}
