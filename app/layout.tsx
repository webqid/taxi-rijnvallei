import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
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
    "taxi 24 uur",
    "taxi bestellen Wageningen",
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
    title: "Taxi Rijnvallei | Taxiservice Wageningen | 24/7",
    description:
      "Betrouwbare taxiservice in Wageningen en omgeving. Luchthavenvervoer, zakelijk vervoer, 24/7 bereikbaar.",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: "Taxi Rijnvallei",
    description:
      "Betrouwbare taxiservice in Wageningen, Ede, Veenendaal en omgeving. Luchthavenvervoer, zakelijk vervoer, 24/7 bereikbaar.",
    url: "https://taxirijnvallei.nl",
    telephone: "+31317844466",
    email: "info@taxirijnvallei.nl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Beekstraat 13",
      addressLocality: "Wageningen",
      postalCode: "6707 DR",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.9692,
      longitude: 5.6654,
    },
    areaServed: [
      { "@type": "City", name: "Wageningen" },
      { "@type": "City", name: "Ede" },
      { "@type": "City", name: "Veenendaal" },
      { "@type": "City", name: "Bennekom" },
      { "@type": "City", name: "Barneveld" },
      { "@type": "City", name: "Rhenen" },
      { "@type": "City", name: "Renkum" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "€€",
    paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Invoice"],
    currenciesAccepted: "EUR",
    sameAs: [],
  }

  return (
    <html lang="nl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
