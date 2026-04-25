import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import SmoothScroll from "@/components/core/SmoothScroll";
import CustomCursor from "@/components/core/CustomCursor";
import FloatingCodeBackground from "@/components/canvas/FloatingCodeBackground";
import SocialBar3D from "@/components/ui/SocialBar3D";
import LoadingAI from "@/components/ui/LoadingAI";
import { GlobalProvider } from "@/components/core/GlobalProvider";
import RocketScroller from "@/components/ui/RocketScroller";

const inter = Inter({
  variable: "--font-satoshi",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-clash",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Professional Developer Portfolio | BGUS.DEV",
  description: "High-performance portfolio built with Next.js, GSAP, and iOS Glassmorphism.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-bg text-text selection:bg-accent selection:text-bg`}
        suppressHydrationWarning
      >
        <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.43/build/spline-viewer.js" strategy="lazyOnload" />
        <GlobalProvider>
          <LoadingAI />
          <RocketScroller />
          <SmoothScroll>
            <FloatingCodeBackground />
            <CustomCursor />
            <SocialBar3D />
            <Sidebar>
              {children}
            </Sidebar>
          </SmoothScroll>
        </GlobalProvider>
      </body>
    </html>
  );
}
