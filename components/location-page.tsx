import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Route } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { AirportFareConditions, AirportFareTable, SchipholFareCard } from '@/components/airport-fares'
import ContactSection from '@/components/contact-section'
import FaqSection from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { DESTINATION_PHOTOS, HERO_PHOTOS } from '@/components/location-photos'
import { PhotoFrame } from '@/components/photo-frame'
import { PageHero } from '@/components/page-hero'
import { PlaceSwitcher } from '@/components/place-switcher'
import { ReviewsSection } from '@/components/reviews-section'
import { RoutePrices } from '@/components/route-prices'
import { SectionHeading } from '@/components/section-heading'
import TrustSection from '@/components/trust-section'
import { AIRPORT_WAITING, getFareRegion } from '@/lib/config/airport-fares'
import type { LocationPage } from '@/lib/config/locations'
import { formatRoutePrice, getRoute, type RouteExample } from '@/lib/config/route-examples'
import { getAirportOffers, getServiceSchema } from '@/lib/config/structured-data'
import { pageMetadata } from '@/lib/seo'

export function locationMetadata(location: LocationPage): Metadata {
  return pageMetadata({
    title: location.title,
    description: location.description,
    path: `/${location.slug}`,
  })
}

/** Price card for a place without airport fares: its first route. */
function RouteHighlightCard({ route }: { route: RouteExample }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <p className="flex items-center gap-2 text-lg font-semibold">
        <Route className="size-5 text-primary" aria-hidden="true" />
        Vaste prijs
      </p>
      <p className="mb-4 text-sm text-muted-foreground">
        {route.from} <span aria-hidden="true">→</span>
        <span className="sr-only">naar</span> {route.to}
      </p>
      <p className="text-4xl font-bold tabular-nums">{formatRoutePrice(route)}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        per taxi, enkele rit · {route.distanceKm.toLocaleString('nl-NL')} km · ca. {route.durationMin} min
      </p>
      <Link
        href="/tarieven"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:underline"
      >
        Alle vaste prijzen
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  )
}

/** Landing page for one place, such as /taxi-ede. Fully static. */
export function LocationLandingPage({ location }: { location: LocationPage }) {
  const path = `/${location.slug}`
  const region = location.fareRegionId ? getFareRegion(location.fareRegionId) : undefined
  const schiphol = region?.fares.schiphol
  const firstRoute = location.routes[0] ? getRoute(location.routes[0]) : undefined

  return (
    <main id="main">
      <JsonLd
        data={getServiceSchema({
          name: `Taxi ${location.name}`,
          description: location.description,
          path,
          areaServed: [location.name],
          offers: region ? getAirportOffers(region.id, location.name) : undefined,
        })}
      />

      <PageHero
        breadcrumbs={[{ name: `Taxi ${location.name}`, path }]}
        title={location.heading}
        lead={location.lead}
        cta={location.slug}
        highlights={[
          ...(schiphol
            ? [`Vaste prijs naar Schiphol: €${schiphol.dropOff}`]
            : firstRoute
              ? [`Vaste prijs van ${firstRoute.from} naar ${firstRoute.to}: ${formatRoutePrice(firstRoute)}`]
              : []),
          ...(region ? [`${AIRPORT_WAITING.freeMinutes} minuten gratis wachttijd bij ophalen`] : []),
          'Dag en nacht bereikbaar',
          'Betalen met pin, contant of op factuur',
        ]}
        aside={
          region ? (
            <SchipholFareCard regionId={region.id} />
          ) : firstRoute ? (
            <RouteHighlightCard route={firstRoute} />
          ) : undefined
        }
      />

      <PlaceSwitcher current={location.slug} />

      {HERO_PHOTOS[location.slug] && (
        <div className="container mx-auto px-4 pt-8 lg:pt-10">
          <PhotoFrame
            photo={HERO_PHOTOS[location.slug]!}
            className="aspect-video rounded-2xl sm:aspect-21/9"
            sizes="(min-width: 1280px) 1216px, 100vw"
          />
        </div>
      )}

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
            {/* A destination with two photos takes the full width; dense packing fills the gap. */}
            <ul className="grid grid-flow-dense gap-4 sm:grid-cols-2">
              {location.destinations.map((destination) => {
                const photos = DESTINATION_PHOTOS[destination.name]
                const wide = (photos?.length ?? 0) > 1
                return (
                  <li key={destination.name} className={wide ? 'sm:col-span-2' : undefined}>
                    <Card className="h-full gap-0 overflow-hidden border-0 py-0 shadow-sm">
                      {photos && (
                        <div className="flex gap-0.5">
                          {photos.map((photo) => (
                            <PhotoFrame
                              key={photo.alt}
                              photo={photo}
                              className="h-36 flex-1"
                              sizes={wide ? '(min-width: 640px) 300px, 50vw' : '(min-width: 640px) 300px, 100vw'}
                            />
                          ))}
                        </div>
                      )}
                      <CardContent className="p-5">
                        <p className="mb-1 flex items-center gap-2 font-semibold">
                          <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                          {destination.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{destination.description}</p>
                      </CardContent>
                    </Card>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      <RoutePrices
        routes={location.routes}
        title={`Wat kost een taxi in ${location.name}?`}
        description={`Vaste prijzen voor veelgereden ritten vanuit ${location.name}.`}
        airport={region ? { from: location.name, regionId: region.id } : undefined}
      />

      {region && (
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <SectionHeading
              title={`Vaste prijzen naar de luchthaven vanuit ${location.name}`}
              description={`Bij ophalen wachten wij ${AIRPORT_WAITING.freeMinutes} minuten gratis, en een vertraagde vlucht kost u niets extra.`}
            />
            <div className="mx-auto max-w-3xl">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <AirportFareTable regionId={region.id} />
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
      )}

      <ReviewsSection />

      <FaqSection
        items={location.faq}
        title={`Veelgestelde vragen over taxi ${location.name}`}
        description={`Antwoorden op vragen over een taxi in ${location.name}.`}
      />

      <ContactSection />
    </main>
  )
}
