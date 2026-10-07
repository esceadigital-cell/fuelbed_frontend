import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "http", // or "https" in production
                hostname: "localhost",
                port: "1337",
                pathname: "/uploads/**",
            },
        ],
        dangerouslyAllowLocalIP: process.env.NEXT_PUBLIC_STRAPI_URL?.includes("localhost") ?? false,
    },
};

export default nextConfig;
