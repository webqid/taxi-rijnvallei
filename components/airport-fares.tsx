import Link from 'next/link'
import { ArrowRight, ChevronDown, Clock, MapPin, Plane } from 'lucide-react'
import {
  AIRPORT_FARE_CONDITIONS,
  AIRPORT_WAITING,
  AIRPORTS,
  FARE_REGIONS,
  formatPlaceList,
  getFareRegion,
} from '@/lib/config/airport-fares'
import { formatEuro } from '@/lib/services/pricing'
import { cn } from '@/lib/utils'

/** Fixed fares from one region to every airport it has a price for. */
export function AirportFareTable({ regionId, className }: { regionId: string; className?: string }) {
  const region = getFareRegion(regionId)
  const rows = AIRPORTS.flatMap((airport) => {
    const fare = region.fares[airport.id]
    return fare ? [{ airport, fare }] : []
  })

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-sm">
        <caption className="sr-only">Vaste prijzen vanuit {formatPlaceList(region.places)}</caption>
        <thead>
          <tr className="border-b">
            <th scope="col" className="py-2 text-left font-medium">
              Luchthaven
            </th>
            <th scope="col" className="py-2 text-right font-medium">
              Wegbrengen
            </th>
            <th scope="col" className="py-2 text-right font-medium">
              Ophalen
            </th>
            <th scope="col" className="py-2 text-right font-medium">
              Retour
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ airport, fare }) => (
            <tr key={airport.id} className="border-b last:border-0">
              <th scope="row" className="py-2 pr-2 text-left font-normal">
                {airport.name}
              </th>
              <td className="py-2 text-right tabular-nums">{formatEuro(fare.dropOff)}</td>
              <td className="py-2 text-right tabular-nums">{formatEuro(fare.pickUp)}</td>
              <td className="py-2 text-right font-semibold tabular-nums">{formatEuro(fare.roundTrip)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** All fare regions, each in a collapsible <details> that keeps the prices in the HTML. */
export function AirportFareRegions({ openRegionId = FARE_REGIONS[0].id }: { openRegionId?: string }) {
  return (
    <div className="divide-y rounded-xl border bg-card shadow-sm">
      {FARE_REGIONS.map((region) => (
        <details key={region.id} className="group" open={region.id === openRegionId}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-4 font-medium hover:bg-muted/50 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-3 text-left">
              <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {formatPlaceList(region.places)}
            </span>
            <ChevronDown
              className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="px-6 pb-5">
            <AirportFareTable regionId={region.id} />
          </div>
        </details>
      ))}
    </div>
  )
}

export function AirportFareConditions({ className }: { className?: string }) {
  return (
    <ul className={cn('space-y-1 text-sm text-muted-foreground', className)}>
      {AIRPORT_FARE_CONDITIONS.map((condition) => (
        <li key={condition}>{condition}</li>
      ))}
    </ul>
  )
}

/** Compact card with the Schiphol fares for one region, used in the page heroes. */
export function SchipholFareCard({ regionId }: { regionId: string }) {
  const region = getFareRegion(regionId)
  const fare = region.fares.schiphol
  if (!fare) return null

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <p className="flex items-center gap-2 text-lg font-semibold">
        <Plane className="size-5 text-primary" aria-hidden="true" />
        Vaste prijs naar Schiphol
      </p>
      <p className="mb-4 text-sm text-muted-foreground">Vanuit {formatPlaceList(region.places)}</p>
      <dl className="divide-y">
        {[
          ['Wegbrengen', fare.dropOff],
          ['Ophalen', fare.pickUp],
          ['Retour', fare.roundTrip],
        ].map(([label, price]) => (
          <div key={label} className="flex items-baseline justify-between gap-4 py-2">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-2xl font-bold tabular-nums">{formatEuro(Number(price))}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
        <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        Inclusief {AIRPORT_WAITING.freeMinutes} minuten gratis wachttijd bij ophalen. Voor 1–4 personen,
        bij reservering minimaal 24 uur vooraf.
      </p>
      <Link
        href="/taxi-schiphol"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:underline"
      >
        Alle luchthavens en prijzen
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  )
}
