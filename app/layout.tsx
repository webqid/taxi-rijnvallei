import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Taxi Rijnvallei - Betrouwbare Taxiservice in de Rijnvallei",
  description:
    "Professionele taxiservice in de Rijnvallei. 24/7 beschikbaar voor particulieren en zakelijke klanten. Betrouwbaar, veilig en betaalbaar vervoer.",
  keywords: ["taxi", "Rijnvallei", "taxiservice", "vervoer", "Nederland", "betrouwbaar", "24/7"],
  authors: [{ name: "Taxi Rijnvallei" }],
  creator: "Taxi Rijnvallei",
  publisher: "Taxi Rijnvallei",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://taxirijnvallei.nl",
    siteName: "Taxi Rijnvallei",
    title: "Taxi Rijnvallei - Betrouwbare Taxiservice in de Rijnvallei",
    description:
      "Professionele taxiservice in de Rijnvallei. 24/7 beschikbaar voor particulieren en zakelijke klanten. Betrouwbaar, veilig en betaalbaar vervoer.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Taxi Rijnvallei - Professionele Taxiservice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taxi Rijnvallei - Betrouwbare Taxiservice",
    description:
      "Professionele taxiservice in de Rijnvallei. 24/7 beschikbaar voor particulieren en zakelijke klanten.",
    images: ["/og-image.jpg"],
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
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
