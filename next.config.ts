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
        dangerouslyAllowLocalIP: true,
    },
};

export default nextConfig;
