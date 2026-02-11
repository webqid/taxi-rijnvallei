import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { QueryProvider } from "@/components/providers/query-provider"
import { BookingProvider } from "@/lib/context/booking-context"
import { getAllStructuredData } from "@/lib/config/structured-data"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://taxirijnvallei.nl"),
  title: {
    default: "Taxi Rijnvallei | Taxiservice Wageningen, Ede, Veenendaal | 24/7",
    template: "%s | Taxi Rijnvallei",
  },
  description:
    "Taxi Rijnvallei: betrouwbare taxiservice in Wageningen, Ede, Veenendaal en omgeving. Luchthavenvervoer Schiphol, zakelijk vervoer, 24/7 bereikbaar. Bel 0317-844466.",
  keywords: [
    "taxi Wageningen",
    "taxi Ede",
    "taxi Veenendaal",
    "taxi Bennekom",
    "taxi Barneveld",
    "taxiservice Rijnvallei",
    "luchthavenvervoer Schiphol",
    "taxi naar Schiphol",
    "zakelijk vervoer Wageningen",
    "zakelijk vervoer Ede",
    "taxi 24 uur",
    "taxi bestellen Wageningen",
    "taxi bestellen Ede",
    "taxibedrijf Gelderland",
  ],
  authors: [{ name: "Taxi Rijnvallei" }],
  creator: "Taxi Rijnvallei",
  publisher: "Taxi Rijnvallei",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://taxirijnvallei.nl",
    siteName: "Taxi Rijnvallei",
    title: "Taxi Rijnvallei | Taxiservice Wageningen en omgeving | 24/7",
    description:
      "Betrouwbare taxiservice in Wageningen, Ede, Veenendaal en omgeving. Luchthavenvervoer, zakelijk vervoer, 24/7 bereikbaar. Bel 0317-844466.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taxi Rijnvallei | Taxiservice Ede | 24/7",
    description:
      "Betrouwbare taxiservice in Ede en omgeving. Luchthavenvervoer, zakelijk vervoer, 24/7 bereikbaar.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://taxirijnvallei.nl",
  },
  category: "transportation",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get all structured data for AEO (Answer Engine Optimization)
  const structuredData = getAllStructuredData()

  return (
    <html lang="nl">
      <head>
        {/* Structured Data for SEO and AEO */}
        {structuredData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <QueryProvider>
          <BookingProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </BookingProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
