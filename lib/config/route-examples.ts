import { formatEuro } from '@/lib/services/pricing'

/**
 * Route prices shown on the home page, the local pages and /tarieven ("Wat kost
 * een taxi van Bennekom naar station Ede-Wageningen?").
 *
 * Only the owner's own prices, received November 2026: fixed prices per taxi
 * for a single trip (enkele rit). Do not add estimates here.
 *
 * Distances and driving times were measured with OSRM on 6 November 2026; they
 * are shown next to the price.
 */
export interface RouteExample {
  from: string
  to: string
  distanceKm: number
  durationMin: number
  /** Fixed price in whole euros, for a single trip. */
  fixedPrice: number
  /** Second, higher price when the owner gave two ("€30/€45"); shown as a range. */
  fixedPriceMax?: number
  /** Replaces "vaste prijs" in the details line, e.g. "vaste prijs binnen Ede". */
  note?: string
}

const WITHIN_EDE = { fixedPrice: 25, note: 'vaste prijs binnen Ede' }

export const ROUTES = {
  'ede-station': { from: 'Ede centrum', to: 'Station Ede-Wageningen', distanceKm: 3.2, durationMin: 6, ...WITHIN_EDE },
  'ede-ziekenhuis': { from: 'Ede centrum', to: 'Ziekenhuis Gelderse Vallei', distanceKm: 4.6, durationMin: 8, ...WITHIN_EDE },
  'station-kroller-muller': { from: 'Station Ede-Wageningen', to: 'Kröller-Müller Museum (De Hoge Veluwe)', distanceKm: 16.2, durationMin: 22, fixedPrice: 65 },
  'otterlo-station': { from: 'Otterlo', to: 'Station Ede-Wageningen', distanceKm: 12.9, durationMin: 15, fixedPrice: 55 },
  'wekerom-ede': { from: 'Wekerom', to: 'Ede', distanceKm: 8.7, durationMin: 11, fixedPrice: 45 },
  'harskamp-ede': { from: 'Harskamp', to: 'Ede', distanceKm: 14.5, durationMin: 16, fixedPrice: 60 },

  'station-wageningen': { from: 'Station Ede-Wageningen', to: 'Wageningen centrum', distanceKm: 10.3, durationMin: 15, fixedPrice: 45 },
  'station-wur': { from: 'Station Ede-Wageningen', to: 'Wageningen Campus (WUR)', distanceKm: 6.7, durationMin: 9, fixedPrice: 30 },

  'renkum-ziekenhuis': { from: 'Renkum of Heelsum', to: 'Ziekenhuis Gelderse Vallei', distanceKm: 10.2, durationMin: 13, fixedPrice: 45 },
  'renkum-rijnstate': { from: 'Renkum', to: 'Ziekenhuis Rijnstate Arnhem', distanceKm: 21.4, durationMin: 19, fixedPrice: 70 },
  'renkum-station': { from: 'Renkum', to: 'Station Ede-Wageningen', distanceKm: 11.6, durationMin: 15, fixedPrice: 45 },

  'bennekom-station': { from: 'Bennekom', to: 'Station Ede-Wageningen', distanceKm: 3.6, durationMin: 7, fixedPrice: 30, fixedPriceMax: 45 },

  'lunteren-station': { from: 'Lunteren', to: 'Station Ede-Wageningen', distanceKm: 9.8, durationMin: 14, fixedPrice: 35, fixedPriceMax: 50 },

  // Distance and time measured from Barneveld centrum; the owner's price covers Barneveld and surroundings.
  'barneveld-ziekenhuis': { from: 'Barneveld en omgeving', to: 'Ziekenhuis Gelderse Vallei', distanceKm: 19.1, durationMin: 20, fixedPrice: 70 },

  'veenendaal-ziekenhuis': { from: 'Veenendaal centrum', to: 'Ziekenhuis Gelderse Vallei', distanceKm: 10.4, durationMin: 12, fixedPrice: 40, fixedPriceMax: 50 },
} satisfies Record<string, RouteExample>

export type RouteId = keyof typeof ROUTES

/** Routes highlighted on the home page: all with the owner's own prices. */
export const HOME_ROUTES: RouteId[] = [
  'ede-station',
  'bennekom-station',
  'station-wur',
  'station-wageningen',
  'lunteren-station',
  'veenendaal-ziekenhuis',
  'station-kroller-muller',
]

/** Every route, for /tarieven. */
export const FIXED_PRICE_ROUTES = Object.keys(ROUTES) as RouteId[]

export function getRoute(id: RouteId): RouteExample {
  return ROUTES[id]
}

/** "€25", or "€30–€45" when the owner gave two prices. */
export function formatRoutePrice(route: RouteExample): string {
  return route.fixedPriceMax
    ? `${formatEuro(route.fixedPrice)}–${formatEuro(route.fixedPriceMax)}`
    : formatEuro(route.fixedPrice)
}

/** Lowest price to a destination, for "vanaf" labels: "vanaf €25". */
export function formatLowestPriceTo(destination: string): string {
  const prices = (Object.values(ROUTES) as RouteExample[])
    .filter((route) => route.to === destination)
    .map((route) => route.fixedPrice)
  if (prices.length === 0) throw new Error(`No route to ${destination}`)
  return `vanaf ${formatEuro(Math.min(...prices))}`
}
