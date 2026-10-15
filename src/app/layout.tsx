import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/components/mainComponents/header/Header";
import ServiceWorkerRegister from "@/components/nestedComponents/serviceWorkerRegister/ServiceWorkerRegister";
import localFont from "next/font/local";

const myFont = localFont({
    src: [{ path: "../fonts/die-grotesk-b-regular.woff2" }],
    variable: "--font-main",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Escea Fuelbed Guides",
    description: "Installation guides for Escea fuelbeds",
    icons: {
        apple: "/icons/apple-touch-icon.png",
    },
    appleWebApp: {
        capable: true,
        title: "Fuelbed Guides",
        statusBarStyle: "default",
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={myFont.variable}>
            <body>
                <ServiceWorkerRegister />
                <Header />
                <main>{children}</main>
            </body>
        </html>
    );
}
