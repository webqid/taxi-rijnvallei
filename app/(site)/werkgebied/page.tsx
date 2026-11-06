import Link from 'next/link'
import { ArrowRight, MapPin, Plane } from 'lucide-react'
import ContactSection from '@/components/contact-section'
import { CallButton, WhatsAppButton } from '@/components/contact-links'
import FaqSection from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { SECONDARY_AREAS } from '@/components/local-section'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { getFareRegion } from '@/lib/config/airport-fares'
import { faqData } from '@/lib/config/faq-data'
import { findLocationByName, LOCATIONS, type LocationPage } from '@/lib/config/locations'
import { formatRoutePrice, getRoute } from '@/lib/config/route-examples'
import { SITE } from '@/lib/config/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Werkgebied: taxi in Ede, Wageningen, Bennekom en omgeving',
  description: `Taxi Rijnvallei rijdt dag en nacht in Ede, Wageningen, Bennekom, Veenendaal, Lunteren, Barneveld en Arnhem. Kies uw plaats voor prijzen en bestemmingen. Bel ${SITE.phone.display}.`,
  path: '/werkgebied',
})

/** The prices to show on a place's card: the Schiphol fare and its first route. */
function cardPrices(location: LocationPage): { icon: 'plane' | 'route'; text: string }[] {
  const prices: { icon: 'plane' | 'route'; text: string }[] = []
  const schiphol = location.fareRegionId ? getFareRegion(location.fareRegionId).fares.schiphol : undefined
  if (schiphol) prices.push({ icon: 'plane', text: `Schiphol €${schiphol.dropOff}` })
  const route = location.routes[0] ? getRoute(location.routes[0]) : undefined
  if (route) prices.push({ icon: 'route', text: `${route.to} ${formatRoutePrice(route)}` })
  return prices
}

const otherAreas = SECONDARY_AREAS.filter((area) => !findLocationByName(area))

export default function AreaPage() {
  return (
    <main id="main">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Plaatsen waar Taxi Rijnvallei rijdt',
          itemListElement: LOCATIONS.map((location, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: `Taxi ${location.name}`,
            url: `${SITE.url}/${location.slug}`,
          })),
        }}
      />

      <PageHero
        breadcrumbs={[{ name: 'Werkgebied', path: '/werkgebied' }]}
        title="Taxi in Ede, Wageningen en de hele Rijnvallei"
        lead="Kies uw plaats voor vaste prijzen, bestemmingen en antwoorden op uw vragen. Taxi Rijnvallei rijdt dag en nacht in de hele regio."
        cta="werkgebied"
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Waar rijden wij?" description="Elke plaats heeft een eigen pagina met prijzen en bestemmingen." />

          <ul className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((location) => (
              <li key={location.slug}>
                <Link
                  href={`/${location.slug}`}
                  className="group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <span className="flex items-center gap-2 text-xl font-bold">
                    <MapPin className="size-5 text-primary" aria-hidden="true" />
                    Taxi {location.name}
                  </span>
                  <span className="mt-2 flex-1 text-sm text-pretty text-muted-foreground">{location.lead}</span>
                  <span className="mt-4 flex flex-wrap gap-2">
                    {cardPrices(location).map((price) => (
                      <span
                        key={price.text}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {price.icon === 'plane' && <Plane className="size-3.5" aria-hidden="true" />}
                        {price.text}
                      </span>
                    ))}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 group-hover:underline">
                    Bekijk prijzen en bestemmingen
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-balance">Woont u in een andere plaats?</h2>
            <p className="mb-6 text-pretty text-muted-foreground">
              Wij rijden ook in {otherAreas.slice(0, -1).join(', ')} en {otherAreas.at(-1)}, en door de hele
              regio en daarbuiten. Bel of stuur een WhatsApp voor de prijs van uw rit.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <CallButton cta="werkgebied-more" />
              <WhatsAppButton cta="werkgebied-more" />
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        items={faqData.filter((faq) => faq.question === 'In welke plaatsen rijdt Taxi Rijnvallei?')}
        title="Waar rijdt Taxi Rijnvallei?"
        description="Ons werkgebied in het kort."
      />

      <ContactSection />
    </main>
  )
}
