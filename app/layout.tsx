import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavbarClient from "./components/layout/NavbarClient"
import SmoothScroll from "./components/layout/SmoothScroll"
import ScrollReset from "./components/layout/ScrollReset"
import Footer from "./components/layout/footer"
import PostHogProvider from "./components/layout/PostHogProvider"
import AmbientSound from "./components/layout/AmbientSound"

const inter = Inter({ subsets: ["latin"] })

// Hardcoded to production domain - prevents Vercel preview URLs leaking into OG tags
const siteUrl = 'https://shubhamsah.com'

const title       = "Shubham Sah - Senior Product Designer"
const description = "Senior Product Designer with 5+ years of experience designing AI, SaaS, Fintech, and Enterprise products. Building products from 0→1 and scaling experiences used by thousands."

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
  },

  // ── Twitter / X Card ─────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@Shubhammcr7_",
    site: "@Shubhammcr7_",
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Shubham Sah",
                "jobTitle": "Senior Product Designer",
                "url": "https://shubhamsah.com",
                "sameAs": [
                  "https://www.linkedin.com/in/shubham-sah-designer",
                  "https://twitter.com/Shubhammcr7_"
                ],
                "description": "Senior Product Designer specializing in AI, SaaS, Fintech, and Enterprise systems.",
                "knowsAbout": [
                  "Product Design",
                  "User Experience Design",
                  "User Interface Design",
                  "Design Systems",
                  "AI Product Design",
                  "Fintech SaaS Design"
                ]
              })
            }}
          />
          <SmoothScroll />
          <ScrollReset />
          <NavbarClient />
          <AmbientSound />
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
