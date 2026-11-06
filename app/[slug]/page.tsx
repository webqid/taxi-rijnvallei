import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import AirportSection from '@/components/airport-section'
import BusinessSection from '@/components/business-section'
import ContactSection from '@/components/contact-section'
import { CallButton, WhatsAppButton } from '@/components/contact-links'
import LocalSection from '@/components/local-section'
import RatesSection from '@/components/rates-section'
import { ReviewsSection } from '@/components/reviews-section'
import { RoutePrices } from '@/components/route-prices'
import ServicesSection from '@/components/services-section'
import TrustSection from '@/components/trust-section'
import { HOME_ROUTES } from '@/lib/config/route-examples'
import { SITE } from '@/lib/config/site'
import { pageMetadata } from '@/lib/seo'

/*
 * Fallback for any other one-segment URL, for example older Google Ads landing
 * pages such as /taxi-rhenen. Real pages (/taxi-ede, /taxi-schiphol, ...) are
 * static routes and take precedence over this one.
 *
 * These pages are `noindex`: they reuse the home page content, and indexing an
 * unlimited number of URLs would be duplicate content.
 *
 * The slug is read before anything is sent, so an invalid URL (/wp-login.php,
 * /privacybeleid) gets a real 404 status. A valid slug is rendered once and then
 * stored in the ISR cache, so later visits are served from the CDN. The slugs in
 * `generateStaticParams` are prerendered at build time. See
 * node_modules/next/dist/docs/01-app/02-guides/incremental-static-regeneration-cache-components.md
 */

type Params = Promise<{ slug: string }>

/** Slugs prerendered at build time: the secondary service areas. */
const PRERENDERED_SLUGS = [
  'taxi-rhenen',
  'taxi-renkum',
  'taxi-oosterbeek',
  'taxi-harskamp',
  'taxi-otterlo',
  'taxi-woudenberg',
  'taxi-scherpenzeel',
]

export function generateStaticParams() {
  return PRERENDERED_SLUGS.map((slug) => ({ slug }))
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
// Pages linked from the site that do not exist yet: show a 404, not a taxi page.
const RESERVED_SLUGS = new Set(['privacybeleid', 'algemene-voorwaarden'])

function isValidSlug(slug: string) {
  return slug.length <= 80 && SLUG_PATTERN.test(slug) && !RESERVED_SLUGS.has(slug)
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  if (!isValidSlug(slug)) notFound()

  const title = slugToTitle(slug)
  return pageMetadata({
    title,
    description: `${title}: betrouwbaar vervoer door ${SITE.name} in Ede, Wageningen en omgeving. 24/7 bereikbaar. Bel ${SITE.phone.display}.`,
    path: `/${slug}`,
    noIndex: true,
  })
}

export default async function SlugPage({ params }: { params: Params }) {
  const { slug } = await params
  if (!isValidSlug(slug)) notFound()

  return (
    <main id="main">
      <section id="hero" className="bg-linear-to-br from-primary/5 to-secondary/5 py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h1 className="text-4xl leading-tight font-bold text-balance lg:text-6xl">
              {slugToTitle(slug)}
            </h1>
            <p className="text-xl leading-relaxed text-pretty text-muted-foreground">
              Betrouwbaar vervoer door Taxi Rijnvallei. Altijd op tijd, vaste tarieven en professionele
              chauffeurs. 24 uur per dag bereikbaar.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <CallButton cta="landing" />
              <WhatsAppButton cta="landing" />
            </div>
            {SITE.features.priceCalculator && (
              <Link
                href="/bereken"
                className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:underline"
              >
                Bereken direct uw ritprijs en reserveer
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <TrustSection />
      <AirportSection />
      <RoutePrices routes={HOME_ROUTES} airport={{ from: 'Ede of Wageningen', regionId: 'rijnvallei' }} />
      <ReviewsSection />
      <ServicesSection />
      <RatesSection />
      <LocalSection />
      <BusinessSection />
      <ContactSection />
    </main>
  )
}
