import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./lib/AuthContext";
import { TrackerAuthProvider } from "./lib/TrackerAuthContext";
import { CookieConsentProvider } from "./lib/CookieConsentContext";
import Navbar from "./components/Navbar";
import CookieConsentBanner from "./components/CookieConsentBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bogie — Cab, Truck & Ambulance App in Delhi NCR",
  description:
    "Bogie is Delhi NCR's ride hailing and logistics app — book cabs, trucks, and zero-commission ambulances in one place, with live tracking and upfront fares.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <AuthProvider>
          <TrackerAuthProvider>
            <CookieConsentProvider>
              <Navbar />
              {children}
              <CookieConsentBanner />
            </CookieConsentProvider>
          </TrackerAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
