import Link from 'next/link'
import { ArrowRight, Plane } from 'lucide-react'
import { PhoneLink } from '@/components/contact-links'
import { SectionHeading } from '@/components/section-heading'
import { getFareRegion } from '@/lib/config/airport-fares'
import { formatRoutePrice, getRoute, type RouteId } from '@/lib/config/route-examples'
import { SITE, whatsappHref } from '@/lib/config/site'
import { formatEuro } from '@/lib/services/pricing'

interface RoutePricesProps {
  routes: RouteId[]
  title?: string
  description?: string
  /** Adds a "→ Schiphol" row with the fixed price from this place. */
  airport?: { from: string; regionId: string }
}

/** Example prices for common routes, so visitors can estimate the price of their ride. */
export function RoutePrices({
  routes,
  title = 'Wat kost een taxi? Vaste prijzen',
  description = 'Zo weet u vooraf wat uw rit kost.',
  airport,
}: RoutePricesProps) {
  const schipholFare = airport ? getFareRegion(airport.regionId).fares.schiphol : undefined

  return (
    <section id="prijzen" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title={title} description={description} />

        <div className="mx-auto max-w-3xl">
          <ul className="divide-y rounded-xl border bg-card shadow-sm">
            {routes.map((id) => {
              const route = getRoute(id)
              return (
                <li key={id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="font-medium">
                      {route.from} <span aria-hidden="true">→</span>
                      <span className="sr-only">naar</span> {route.to}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {route.distanceKm.toLocaleString('nl-NL')} km · ca. {route.durationMin} min
                      {` · ${route.note ?? 'vaste prijs'}, enkele rit`}
                    </p>
                  </div>
                  <p className="shrink-0 text-lg font-bold tabular-nums">{formatRoutePrice(route)}</p>
                </li>
              )
            })}
            {airport && schipholFare && (
              <li className="flex items-center justify-between gap-4 bg-sky-50 px-5 py-4 dark:bg-sky-950/30">
                <div>
                  <p className="flex items-center gap-2 font-medium">
                    <Plane className="size-4 shrink-0 text-sky-700" aria-hidden="true" />
                    <span>
                      {airport.from} <span aria-hidden="true">→</span>
                      <span className="sr-only">naar</span> Schiphol
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Vaste prijs · ophalen {formatEuro(schipholFare.pickUp)} · retour{' '}
                    {formatEuro(schipholFare.roundTrip)}
                  </p>
                </div>
                <p className="shrink-0 text-lg font-bold tabular-nums">{formatEuro(schipholFare.dropOff)}</p>
              </li>
            )}
          </ul>

          <p className="mt-4 text-sm text-muted-foreground">
            Vaste prijzen per taxi voor een enkele rit, inclusief 9% btw.
          </p>
          {SITE.features.priceCalculator ? (
            <Link
              href="/bereken"
              className="mt-4 inline-flex items-center gap-1 font-semibold text-sky-700 hover:underline"
            >
              Bereken de prijs van uw eigen rit
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <p className="mt-4 font-medium">
              Andere route? Bel{' '}
              <PhoneLink cta="route-prices" className="font-semibold text-primary hover:underline" /> of{' '}
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp-route-prices"
                className="font-semibold text-primary hover:underline"
              >
                stuur een WhatsApp
              </a>{' '}
              voor de prijs van uw rit.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
