import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Escea Fuelbed Guides",
        short_name: "Fuelbed Guides",
        start_url: "/",
        display: "standalone",
        background_color: "#fbf9f7",
        theme_color: "#141414",
        icons: [
            { src: "/icons/app-icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icons/app-icon-512.png", sizes: "512x512", type: "image/png" },
            {
                src: "/icons/app-icon-maskable-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}
