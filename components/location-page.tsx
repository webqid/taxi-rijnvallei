import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { AirportFareConditions, AirportFareTable, SchipholFareCard } from '@/components/airport-fares'
import ContactSection from '@/components/contact-section'
import FaqSection from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { PageHero } from '@/components/page-hero'
import { ReviewsSection } from '@/components/reviews-section'
import { RoutePrices } from '@/components/route-prices'
import { SectionHeading } from '@/components/section-heading'
import TrustSection from '@/components/trust-section'
import { AIRPORT_WAITING, getFareRegion } from '@/lib/config/airport-fares'
import { getLocation, type LocationPage } from '@/lib/config/locations'
import { getAirportOffers, getServiceSchema } from '@/lib/config/structured-data'
import { pageMetadata } from '@/lib/seo'

export function locationMetadata(location: LocationPage): Metadata {
  return pageMetadata({
    title: location.title,
    description: location.description,
    path: `/${location.slug}`,
  })
}

/** Landing page for one place, such as /taxi-ede. Fully static. */
export function LocationLandingPage({ location }: { location: LocationPage }) {
  const path = `/${location.slug}`
  const schiphol = getFareRegion(location.fareRegionId).fares.schiphol

  return (
    <main id="main">
      <JsonLd
        data={getServiceSchema({
          name: `Taxi ${location.name}`,
          description: location.description,
          path,
          areaServed: [location.name],
          offers: getAirportOffers(location.fareRegionId, location.name),
        })}
      />

      <PageHero
        breadcrumbs={[{ name: `Taxi ${location.name}`, path }]}
        title={location.heading}
        lead={location.lead}
        cta={location.slug}
        highlights={[
          ...(schiphol ? [`Vaste prijs naar Schiphol: €${schiphol.dropOff}`] : []),
          `${AIRPORT_WAITING.freeMinutes} minuten gratis wachttijd bij ophalen`,
          'Dag en nacht bereikbaar',
          'Betalen met pin, contant of op factuur',
        ]}
        aside={<SchipholFareCard regionId={location.fareRegionId} />}
      />

      <TrustSection />

      <section className="py-20">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-balance lg:text-4xl">Uw taxi in {location.name}</h2>
            {location.intro.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-pretty text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold">Veelgevraagde bestemmingen</h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {location.destinations.map((destination) => (
                <li key={destination.name}>
                  <Card className="h-full border-0 py-0 shadow-sm">
                    <CardContent className="p-5">
                      <p className="mb-1 flex items-center gap-2 font-semibold">
                        <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                        {destination.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{destination.description}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <RoutePrices
        routes={location.routes}
        title={`Wat kost een taxi in ${location.name}?`}
        description={`Voorbeeldprijzen voor veelgereden ritten vanuit ${location.name}.`}
        airport={{ from: location.name, regionId: location.fareRegionId }}
      />

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={`Vaste prijzen naar de luchthaven vanuit ${location.name}`}
            description={`Bij ophalen wachten wij ${AIRPORT_WAITING.freeMinutes} minuten gratis, en een vertraagde vlucht kost u niets extra.`}
          />
          <div className="mx-auto max-w-3xl">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <AirportFareTable regionId={location.fareRegionId} />
              </CardContent>
            </Card>
            <AirportFareConditions className="mt-4" />
            <Link
              href="/taxi-schiphol"
              className="mt-6 inline-flex items-center gap-1 font-semibold text-sky-700 hover:underline"
            >
              Zo werkt het ophalen op Schiphol
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <FaqSection
        items={location.faq}
        title={`Veelgestelde vragen over taxi ${location.name}`}
        description={`Antwoorden op vragen over een taxi in ${location.name}.`}
      />

      <nav aria-label="Taxi in de buurt" className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-xl font-semibold">Ook in de buurt van {location.name}</h2>
          <ul className="flex flex-wrap justify-center gap-2">
            {location.nearby.map((slug) => {
              const nearby = getLocation(slug)
              return (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Taxi {nearby.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      <ContactSection />
    </main>
  )
}
