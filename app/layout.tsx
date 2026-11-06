import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import { CookieBar } from '@/components/cookie-bar'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { JsonLd } from '@/components/json-ld'
import { FloatingWhatsApp } from '@/components/floating-whatsapp'
import { MobileCallBar } from '@/components/mobile-call-bar'
import { SITE } from '@/lib/config/site'
import { getOrganizationSchema } from '@/lib/config/structured-data'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Taxi Rijnvallei | Taxi in Ede, Wageningen en omgeving | 24/7',
    template: '%s | Taxi Rijnvallei',
  },
  description: `Taxi Rijnvallei: betrouwbare taxiservice in Ede, Wageningen, Bennekom en Veenendaal. Vaste prijs naar Schiphol, zakelijk vervoer, 24/7 bereikbaar. Bel ${SITE.phone.display}.`,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  // Phone numbers are linked explicitly; this stops iOS from turning other
  // numbers (prices, KvK number) into phone links.
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: SITE.name,
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'transportation',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={inter.variable}>
      <GoogleTagManager gtmId={SITE.gtmId} />
      <head>
        {/* Google Consent Mode v2: deny by default until the visitor consents (see CookieBar). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <JsonLd data={getOrganizationSchema()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow"
        >
          Naar de inhoud
        </a>
        <Header />
        {children}
        <Footer />
        <MobileCallBar />
        <FloatingWhatsApp />
        <CookieBar />
      </body>
    </html>
  )
}
