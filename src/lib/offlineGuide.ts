"use client";

import { guide } from "@/types/types";
import { getMediaUrl } from "./media";

export interface DownloadedGuide {
    id: string;
    modelTitle: string;
    versionTitle: string;
    fuelbedTitle?: string;
}

// returns only guides that are still in the cache, and removes stale entries from localStorage
export async function getDownloadedGuides(): Promise<DownloadedGuide[]> {
    const stored: DownloadedGuide[] = JSON.parse(localStorage.getItem("downloadedGuides") ?? "[]");

    const stillCached = await Promise.all(stored.map((g) => caches.has(`guide-${g.id}`)));
    const valid = stored.filter((_, i) => stillCached[i]);

    if (valid.length !== stored.length) {
        localStorage.setItem("downloadedGuides", JSON.stringify(valid));
    }

    return valid;
}

function extractMediaUrls(guide: guide): string[] {
    const urls: string[] = [];
    guide.logs.forEach((log) => {
        [log.rotating3d, log.overviewPlacement, log.closeupPlacement].forEach((mediaArray) => {
            mediaArray?.forEach((media) => {
                urls.push(getMediaUrl(media.url));
            });
        });
    });
    return urls;
}

/*export async function downloadGuideForOffline(
    guide: guide,
    modelTitle: string,
    versionTitle: string,
    fuelbedTitle: string,
    //strapiUrl: string,
) {
    const cacheName = `guide-${guide.documentId}`;
    const cache = await caches.open(cacheName);

    // capture the exact URL currently open, including ?modelTitle=...&versionTitle=...
    const currentUrl = window.location.pathname + window.location.search;
    await cache.add(currentUrl);

    const mediaUrls = extractMediaUrls(guide);
    await Promise.all(mediaUrls.map((url) => cache.add(url)));

    const downloaded = JSON.parse(localStorage.getItem("downloadedGuides") ?? "[]");
    const entry = { id: guide.documentId, modelTitle, versionTitle, fuelbedTitle };
    localStorage.setItem(
        "downloadedGuides",
        JSON.stringify([...downloaded.filter((g: { id: string }) => g.id !== entry.id), entry]),
    );
}*/

export async function downloadGuideForOffline(
    guide: guide,
    modelTitle: string,
    versionTitle: string,
    fuelbedTitle: string,
) {
    // ask the browser not to clear our storage when space runs low
    if (navigator.storage?.persist) {
        await navigator.storage.persist();
    }

    const cacheName = `guide-${guide.documentId}`;
    const cache = await caches.open(cacheName);

    try {
        // the page itself, with the exact URL currently open
        const currentUrl = window.location.pathname + window.location.search;
        await cache.add(currentUrl);

        // the JS/CSS this page loaded, so it works offline even if the SW wasn't active yet
        const staticAssets = [
            ...new Set(
                performance
                    .getEntriesByType("resource")
                    .map((entry) => new URL(entry.name))
                    .filter(
                        (u) =>
                            u.origin === location.origin && u.pathname.startsWith("/_next/static/"),
                    )
                    .map((u) => u.pathname + u.search),
            ),
        ];
        await cache.addAll(staticAssets);

        // all videos and images
        const mediaUrls = extractMediaUrls(guide);
        await Promise.all(mediaUrls.map((url) => cache.add(url)));
    } catch (err) {
        // don't leave a half-downloaded guide behind
        await caches.delete(cacheName);
        throw err;
    }

    const downloaded = JSON.parse(localStorage.getItem("downloadedGuides") ?? "[]");
    const entry = { id: guide.documentId, modelTitle, versionTitle, fuelbedTitle };
    localStorage.setItem(
        "downloadedGuides",
        JSON.stringify([...downloaded.filter((g: { id: string }) => g.id !== entry.id), entry]),
    );
}

export async function removeGuideDownload(guideId: string) {
    await caches.delete(`guide-${guideId}`);

    const downloaded = JSON.parse(localStorage.getItem("downloadedGuides") ?? "[]");
    localStorage.setItem(
        "downloadedGuides",
        JSON.stringify(downloaded.filter((g: { id: string }) => g.id !== guideId)),
    );
}

export async function isGuideDownloaded(guideId: string): Promise<boolean> {
    return caches.has(`guide-${guideId}`);
}
