import { PRICING_CONFIG } from '@/lib/config/pricing'
import {
  AIRPORTS,
  AIRPORT_WAITING,
  findFareRegion,
  type Airport,
  type AirportFare,
} from '@/lib/config/airport-fares'
import type {
  BreakdownItem,
  Location,
  PricingMode,
  QuoteRequest,
  RouteResult,
} from '@/lib/types/booking'

const TIME_ZONE = 'Europe/Amsterdam'
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const dutchTimeFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  hourCycle: 'h23',
  weekday: 'short',
})

/**
 * Hour (0–23) and weekday (0 = Sunday) in Dutch time. The quote API runs on a
 * server in UTC, so `Date#getHours()` would be off by one or two hours.
 */
function getDutchTime(isoDateTime: string): { hour: number; weekday: number } {
  const parts = dutchTimeFormat.formatToParts(new Date(isoDateTime))
  const hour = Number(parts.find((part) => part.type === 'hour')?.value)
  const weekday = WEEKDAYS.indexOf(parts.find((part) => part.type === 'weekday')?.value ?? '')
  return { hour, weekday }
}

/**
 * Check if a given ISO datetime falls within night hours (Dutch time)
 */
export function isNightTime(isoDateTime: string): boolean {
  const { hour } = getDutchTime(isoDateTime)
  return hour >= PRICING_CONFIG.nightStartHour || hour < PRICING_CONFIG.nightEndHour
}

/**
 * Saturday or Sunday morning between 01:00 and 05:00, when airport fares are higher.
 */
export function isWeekendNight(isoDateTime: string): boolean {
  const { hour, weekday } = getDutchTime(isoDateTime)
  return (weekday === 6 || weekday === 0) && hour >= 1 && hour < 5
}

/**
 * Get the appropriate rate tier based on passenger count
 */
function getRateTier(passengers: number) {
  if (passengers <= PRICING_CONFIG.standardMaxPassengers) {
    return {
      ...PRICING_CONFIG.standaard,
      tierLabel: 'Standaard taxi',
    }
  }
  return {
    ...PRICING_CONFIG.groot,
    tierLabel: 'Grote taxi',
  }
}

/**
 * Calculate price breakdown for a single leg of the journey
 */
export function calculateLegPrice(
  route: RouteResult,
  pickupAt: string,
  luggage: boolean,
  passengers: number,
  legLabel: string = ''
): { breakdown: BreakdownItem[]; subtotalCents: number } {
  const breakdown: BreakdownItem[] = []
  const prefix = legLabel ? `${legLabel}: ` : ''
  const rates = getRateTier(passengers)

  // Base fee (instaptarief)
  breakdown.push({
    label: `${prefix}Instaptarief (${rates.tierLabel})`,
    amountCents: rates.baseFeeCents,
  })

  // Distance cost
  const distanceKm = route.distanceMeters / 1000
  const distanceCost = Math.round(distanceKm * rates.perKmCents)
  breakdown.push({
    label: `${prefix}Afstand (${formatDistance(route.distanceMeters)} × ${formatPrice(rates.perKmCents)})`,
    amountCents: distanceCost,
  })

  // Duration cost
  const durationMin = route.durationSeconds / 60
  const durationCost = Math.round(durationMin * rates.perMinCents)
  breakdown.push({
    label: `${prefix}Rijtijd (${Math.round(durationMin)} min × ${formatPrice(rates.perMinCents)})`,
    amountCents: durationCost,
  })

  // Luggage surcharge
  if (luggage) {
    breakdown.push({
      label: `${prefix}Bagage toeslag`,
      amountCents: PRICING_CONFIG.luggageSurchargeCents,
    })
  }

  // Calculate subtotal before night surcharge
  const subtotalBeforeNight = breakdown.reduce((sum, item) => sum + item.amountCents, 0)

  // Night surcharge
  if (isNightTime(pickupAt)) {
    const nightSurcharge = Math.round(subtotalBeforeNight * (PRICING_CONFIG.nightSurchargePercent / 100))
    breakdown.push({
      label: `${prefix}Nachttoeslag (${PRICING_CONFIG.nightSurchargePercent}%)`,
      amountCents: nightSurcharge,
    })
  }

  const subtotalCents = breakdown.reduce((sum, item) => sum + item.amountCents, 0)

  return { breakdown, subtotalCents }
}

/**
 * Taximeter estimate for a daytime ride with 1–4 passengers and no luggage.
 * Used for the example route prices on the site, so they match the calculator.
 */
export function estimateMeterFareCents(distanceKm: number, durationMin: number): number {
  const { baseFeeCents, perKmCents, perMinCents } = PRICING_CONFIG.standaard
  const total =
    baseFeeCents + Math.round(distanceKm * perKmCents) + Math.round(durationMin * perMinCents)
  return Math.max(total, PRICING_CONFIG.minimumFareCents)
}

// ---------------------------------------------------------------------------
// Fixed airport fares
// ---------------------------------------------------------------------------

/** Great-circle distance in kilometres. */
function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}

/** The airport a location is at, if any. */
export function findAirport(location: Pick<Location, 'lat' | 'lon'>): Airport | undefined {
  return AIRPORTS.find((airport) => distanceKm(airport, location) <= airport.radiusKm)
}

/**
 * Place name of a location: the geocoder's city, or else the last part of the
 * label ("Stationsweg 1, 6711 PM, Ede" → "Ede").
 */
export function getPlaceName(location: Location): string | undefined {
  if (location.city) return location.city
  return location.label
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .at(-1)
}

export interface FixedAirportFare {
  airport: Airport
  fare: AirportFare
  place: string
  direction: 'dropOff' | 'pickUp'
}

/**
 * Returns the fixed fare when one end of the ride is an airport and the other
 * end is in one of the fare regions. Fixed fares apply to 1–4 passengers.
 */
export function findFixedAirportFare(
  from: Location,
  to: Location,
  passengers: number
): FixedAirportFare | null {
  if (passengers > PRICING_CONFIG.standardMaxPassengers) return null

  const fromAirport = findAirport(from)
  const toAirport = findAirport(to)
  const airport = toAirport ?? fromAirport
  if (!airport || (fromAirport && toAirport)) return null

  const direction = toAirport ? 'dropOff' : 'pickUp'
  const place = getPlaceName(toAirport ? from : to)
  const fare = findFareRegion(place)?.fares[airport.id]
  if (!place || !fare) return null

  return { airport, fare, place, direction }
}

export interface QuoteCalculation {
  breakdown: BreakdownItem[]
  totalCents: number
  distanceMeters: number
  durationSeconds: number
  pricing: PricingMode
  notes: string[]
}

function calculateFixedQuote(
  fixed: FixedAirportFare,
  outwardRoute: RouteResult,
  returnRoute: RouteResult | null,
  request: QuoteRequest
): QuoteCalculation {
  const { airport, fare, place, direction } = fixed
  const isRoundTrip = returnRoute !== null && request.returnAt !== null

  const breakdown: BreakdownItem[] = isRoundTrip
    ? [{ label: `Vaste prijs retour ${place} – ${airport.name}`, amountCents: fare.roundTrip * 100 }]
    : [
        {
          label:
            direction === 'dropOff'
              ? `Vaste prijs ${place} → ${airport.name}`
              : `Vaste prijs ${airport.name} → ${place}`,
          amountCents: fare[direction] * 100,
        },
      ]

  const notes = [
    'Vaste prijs voor 1–4 personen, inclusief 9% btw, bij reservering minimaal 24 uur van tevoren.',
  ]
  if (isRoundTrip || direction === 'pickUp') {
    notes.push(
      `Bij ophalen op de luchthaven: ${AIRPORT_WAITING.freeMinutes} minuten gratis wachttijd en geen extra kosten als uw vlucht vertraagd is.`
    )
  }
  const rideTimes = [request.pickupAt, ...(isRoundTrip && request.returnAt ? [request.returnAt] : [])]
  if (rideTimes.some(isWeekendNight)) {
    notes.push(
      'Op zaterdag- en zondagochtend tussen 01:00 en 05:00 uur geldt een hoger tarief. Wij laten u de exacte prijs weten.'
    )
  }

  return {
    breakdown,
    totalCents: breakdown.reduce((sum, item) => sum + item.amountCents, 0),
    distanceMeters: outwardRoute.distanceMeters + (isRoundTrip ? returnRoute.distanceMeters : 0),
    durationSeconds: outwardRoute.durationSeconds + (isRoundTrip ? returnRoute.durationSeconds : 0),
    pricing: 'fixed',
    notes,
  }
}

/**
 * Calculate full quote including optional return trip.
 * Airport rides from a fare region get the published fixed fare; all other
 * rides are estimated with the taximeter rates.
 */
export function calculateQuote(
  outwardRoute: RouteResult,
  returnRoute: RouteResult | null,
  request: QuoteRequest
): QuoteCalculation {
  const hasReturn = returnRoute !== null && request.returnAt !== null

  const fixed =
    request.stopovers.length === 0
      ? findFixedAirportFare(request.origin, request.destination, request.passengers)
      : null
  if (fixed) {
    return calculateFixedQuote(fixed, outwardRoute, hasReturn ? returnRoute : null, request)
  }

  // Calculate outward leg
  const outward = calculateLegPrice(
    outwardRoute,
    request.pickupAt,
    request.luggage,
    request.passengers,
    hasReturn ? 'Heenreis' : ''
  )

  let breakdown = [...outward.breakdown]
  let totalCents = outward.subtotalCents
  let totalDistanceMeters = outwardRoute.distanceMeters
  let totalDurationSeconds = outwardRoute.durationSeconds

  // Calculate return leg if applicable
  if (hasReturn && returnRoute && request.returnAt) {
    const returnLeg = calculateLegPrice(
      returnRoute,
      request.returnAt,
      request.luggage,
      request.passengers,
      'Terugreis'
    )
    breakdown = [...breakdown, ...returnLeg.breakdown]
    totalCents += returnLeg.subtotalCents
    totalDistanceMeters += returnRoute.distanceMeters
    totalDurationSeconds += returnRoute.durationSeconds
  }

  // Apply minimum fare
  if (totalCents < PRICING_CONFIG.minimumFareCents) {
    const difference = PRICING_CONFIG.minimumFareCents - totalCents
    breakdown.push({
      label: 'Opslag minimum tarief',
      amountCents: difference,
    })
    totalCents = PRICING_CONFIG.minimumFareCents
  }

  const notes = [
    'Indicatie op basis van het taximetertarief. De werkelijke prijs hangt af van de gereden route en het verkeer.',
  ]
  const isAirportRide = Boolean(findAirport(request.origin) || findAirport(request.destination))
  if (isAirportRide && request.passengers > PRICING_CONFIG.standardMaxPassengers) {
    notes.push(
      'Voor een grote taxi (5–8 personen) van of naar de luchthaven maken wij graag een offerte op maat.'
    )
  }

  return {
    breakdown,
    totalCents,
    distanceMeters: totalDistanceMeters,
    durationSeconds: totalDurationSeconds,
    pricing: 'meter',
    notes,
  }
}

/**
 * Format cents as EUR currency string ("€ 16,56")
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100)
}

/**
 * Format whole euros the way they appear in the tariff tables ("€150")
 */
export function formatEuro(euros: number): string {
  return `€${Math.round(euros).toLocaleString('nl-NL')}`
}

/**
 * Format duration in seconds to human readable string
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.round((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours} uur ${minutes} min`
  }
  return `${minutes} min`
}

/**
 * Format distance in meters to km string ("10,5 km")
 */
export function formatDistance(meters: number): string {
  const km = meters / 1000
  return `${km.toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`
}
