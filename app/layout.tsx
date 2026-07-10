import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavbarClient from "./components/layout/NavbarClient"
import SmoothScroll from "./components/layout/SmoothScroll"
import ScrollReset from "./components/layout/ScrollReset"
import Footer from "./components/layout/footer"
import PostHogProvider from "./components/layout/PostHogProvider"

const inter = Inter({ subsets: ["latin"] })

// Hardcoded to production domain - prevents Vercel preview URLs leaking into OG tags
const siteUrl = 'https://www.shubhamsah.com'

const title       = "Shubham Sah - Senior Product Designer"
const description = "Senior Product Designer with 5+ years of experience designing AI, SaaS, Fintech, and Enterprise products. Building products from 0→1 and scaling experiences used by thousands."
const ogImage     = `${siteUrl}/images/og.png`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title,
  description,

  // ── Canonical URL ────────────────────────────────────────────
  alternates: {
    canonical: siteUrl,
  },

  // ── Open Graph (LinkedIn, Slack, Discord, WhatsApp, Facebook) ─
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Shubham Sah",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Shubham Sah - Senior Product Designer",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
    creator: "@shubhamsah",
    site: "@shubhamsah",
  },

  // ── Search engines ───────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  keywords: [
    "Product Designer",
    "Senior Product Designer",
    "UI UX Designer",
    "AI Product Design",
    "SaaS Design",
    "Fintech Design",
    "Enterprise UX",
    "Design Systems",
    "Shubham Sah",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <PostHogProvider>
          <SmoothScroll />
          <ScrollReset />
          <NavbarClient />
          <main>
            {children}
            <Analytics />
          </main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  )
}
