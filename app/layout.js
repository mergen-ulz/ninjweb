import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Ninj Retreat Center",
    description: "Website for Ninj Center",
    icons: {
        icon: '/images/favicon.svg',
        type: 'image/svg+xml',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
            <head />
            <body className="antialiased">
                {children}
                <Toaster position="top-center" richColors />
            </body>
        </html>
    );
}
