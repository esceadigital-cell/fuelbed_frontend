"use client";

import { guide } from "@/types/types";

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

function extractMediaUrls(guide: guide, strapiUrl: string): string[] {
    const urls: string[] = [];
    guide.logs.forEach((log) => {
        [log.rotating3d, log.overviewPlacement, log.closeupPlacement].forEach((mediaArray) => {
            mediaArray?.forEach((media) => {
                urls.push(`${strapiUrl}${media.url}`);
            });
        });
    });
    return urls;
}

export async function downloadGuideForOffline(
    guide: guide,
    modelTitle: string,
    versionTitle: string,
    fuelbedTitle: string,
    strapiUrl: string,
) {
    const cacheName = `guide-${guide.documentId}`;
    const cache = await caches.open(cacheName);

    // capture the exact URL currently open, including ?modelTitle=...&versionTitle=...
    const currentUrl = window.location.pathname + window.location.search;
    await cache.add(currentUrl);

    const mediaUrls = extractMediaUrls(guide, strapiUrl);
    await Promise.all(mediaUrls.map((url) => cache.add(url)));

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
