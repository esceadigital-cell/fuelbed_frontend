import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
                pathname: "/uploads/**",
            },
            {
                protocol: "https",
                hostname: "**.media.strapiapp.com",
                pathname: "/**",
            },
        ],
        dangerouslyAllowLocalIP: process.env.NEXT_PUBLIC_STRAPI_URL?.includes("localhost") ?? false,
    },
};

export default nextConfig;
