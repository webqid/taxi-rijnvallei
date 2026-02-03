import { PRICING_CONFIG } from '@/lib/config/pricing'
import type { BreakdownItem, QuoteRequest, RouteResult } from '@/lib/types/booking'

/**
 * Check if a given ISO datetime falls within night hours
 */
export function isNightTime(isoDateTime: string): boolean {
  const date = new Date(isoDateTime)
  const hour = date.getHours()
  return hour >= PRICING_CONFIG.nightStartHour || hour < PRICING_CONFIG.nightEndHour
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
    label: `${prefix}Afstand (${distanceKm.toFixed(1)} km × €${(rates.perKmCents / 100).toFixed(2)})`,
    amountCents: distanceCost,
  })

  // Duration cost
  const durationMin = route.durationSeconds / 60
  const durationCost = Math.round(durationMin * rates.perMinCents)
  breakdown.push({
    label: `${prefix}Rijtijd (${Math.round(durationMin)} min × €${(rates.perMinCents / 100).toFixed(2)})`,
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
 * Calculate full quote including optional return trip
 */
export function calculateQuote(
  outwardRoute: RouteResult,
  returnRoute: RouteResult | null,
  request: QuoteRequest
): { breakdown: BreakdownItem[]; totalCents: number; distanceMeters: number; durationSeconds: number } {
  const hasReturn = returnRoute !== null && request.returnAt !== null

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

  return {
    breakdown,
    totalCents,
    distanceMeters: totalDistanceMeters,
    durationSeconds: totalDurationSeconds,
  }
}

/**
 * Format cents as EUR currency string
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100)
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
 * Format distance in meters to km string
 */
export function formatDistance(meters: number): string {
  const km = meters / 1000
  return `${km.toFixed(1)} km`
}
