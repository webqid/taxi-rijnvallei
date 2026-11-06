import { estimateMeterFareCents, formatEuro } from '@/lib/services/pricing'

/**
 * Example routes with indicative prices, shown on the home page and the local
 * pages ("Wat kost een taxi van Bennekom naar station Ede-Wageningen?").
 *
 * Distances and driving times were measured with OSRM, the routing service the
 * price calculator uses, on 6 November 2026. The price is calculated from the
 * taximeter rates in `pricing.ts` (daytime, 1–4 persons), so it matches what the
 * calculator shows. To charge a fixed price for a route instead, set `fixedPrice`.
 */
export interface RouteExample {
  from: string
  to: string
  distanceKm: number
  durationMin: number
  /** Fixed price in whole euros. Overrides the taximeter estimate when set. */
  fixedPrice?: number
}

export const ROUTES = {
  'ede-station': { from: 'Ede centrum', to: 'Station Ede-Wageningen', distanceKm: 3.2, durationMin: 6 },
  'ede-ziekenhuis': { from: 'Ede centrum', to: 'Ziekenhuis Gelderse Vallei', distanceKm: 4.6, durationMin: 8 },
  'ede-wur': { from: 'Ede centrum', to: 'Wageningen Campus (WUR)', distanceKm: 9.2, durationMin: 13 },
  'ede-wageningen': { from: 'Ede centrum', to: 'Wageningen centrum', distanceKm: 13.3, durationMin: 19 },
  'ede-veenendaal': { from: 'Ede centrum', to: 'Veenendaal centrum', distanceKm: 13.6, durationMin: 17 },
  'ede-arnhem': { from: 'Ede centrum', to: 'Arnhem Centraal', distanceKm: 18.3, durationMin: 19 },

  'wageningen-station': { from: 'Wageningen centrum', to: 'Station Ede-Wageningen', distanceKm: 10.3, durationMin: 15 },
  'wur-station': { from: 'Wageningen Campus (WUR)', to: 'Station Ede-Wageningen', distanceKm: 6.7, durationMin: 9 },
  'wageningen-ziekenhuis': { from: 'Wageningen centrum', to: 'Ziekenhuis Gelderse Vallei', distanceKm: 8.9, durationMin: 14 },
  'wageningen-bennekom': { from: 'Wageningen centrum', to: 'Bennekom', distanceKm: 6.4, durationMin: 11 },
  'wageningen-arnhem': { from: 'Wageningen centrum', to: 'Arnhem Centraal', distanceKm: 20.2, durationMin: 26 },

  'bennekom-station': { from: 'Bennekom', to: 'Station Ede-Wageningen', distanceKm: 3.6, durationMin: 7 },
  'bennekom-ziekenhuis': { from: 'Bennekom', to: 'Ziekenhuis Gelderse Vallei', distanceKm: 5.2, durationMin: 8 },
  'bennekom-wur': { from: 'Bennekom', to: 'Wageningen Campus (WUR)', distanceKm: 2.4, durationMin: 4 },
  'bennekom-arnhem': { from: 'Bennekom', to: 'Arnhem Centraal', distanceKm: 22.5, durationMin: 22 },

  'lunteren-station': { from: 'Lunteren', to: 'Station Ede-Wageningen', distanceKm: 9.8, durationMin: 14 },
  'lunteren-ziekenhuis': { from: 'Lunteren', to: 'Ziekenhuis Gelderse Vallei', distanceKm: 8.7, durationMin: 13 },
  'lunteren-barneveld': { from: 'Lunteren', to: 'Barneveld centrum', distanceKm: 7.6, durationMin: 11 },
  'lunteren-amersfoort': { from: 'Lunteren', to: 'Amersfoort Centraal', distanceKm: 28.7, durationMin: 29 },

  'veenendaal-de-klomp': { from: 'Veenendaal centrum', to: 'Station Veenendaal-De Klomp', distanceKm: 4.1, durationMin: 7 },
  'veenendaal-ziekenhuis': { from: 'Veenendaal centrum', to: 'Ziekenhuis Gelderse Vallei', distanceKm: 10.4, durationMin: 12 },
  'veenendaal-station-ede': { from: 'Veenendaal centrum', to: 'Station Ede-Wageningen', distanceKm: 11.8, durationMin: 14 },
  'veenendaal-utrecht': { from: 'Veenendaal centrum', to: 'Utrecht Centraal', distanceKm: 37.6, durationMin: 35 },

  'barneveld-station-ede': { from: 'Barneveld centrum', to: 'Station Ede-Wageningen', distanceKm: 20.4, durationMin: 22 },
  'barneveld-ziekenhuis': { from: 'Barneveld centrum', to: 'Ziekenhuis Gelderse Vallei', distanceKm: 19.1, durationMin: 20 },
  'barneveld-lunteren': { from: 'Barneveld centrum', to: 'Lunteren', distanceKm: 7.5, durationMin: 11 },
  'barneveld-amersfoort': { from: 'Barneveld centrum', to: 'Amersfoort Centraal', distanceKm: 21.0, durationMin: 22 },
} satisfies Record<string, RouteExample>

export type RouteId = keyof typeof ROUTES

/** Routes highlighted on the home page. */
export const HOME_ROUTES: RouteId[] = [
  'bennekom-station',
  'ede-ziekenhuis',
  'wur-station',
  'wageningen-station',
  'veenendaal-station-ede',
  'ede-arnhem',
]

export function getRoute(id: RouteId): RouteExample {
  return ROUTES[id]
}

/** Price in whole euros: the fixed price, or the rounded taximeter estimate. */
export function getRoutePrice(route: RouteExample): number {
  return route.fixedPrice ?? Math.round(estimateMeterFareCents(route.distanceKm, route.durationMin) / 100)
}

/** Lowest example price to a destination, in whole euros ("vanaf ca. €17"). */
export function lowestRoutePriceTo(destination: string): number {
  const prices = Object.values(ROUTES as Record<string, RouteExample>)
    .filter((route) => route.to === destination)
    .map(getRoutePrice)
  if (prices.length === 0) throw new Error(`No example route to ${destination}`)
  return Math.min(...prices)
}

/** "ca. €18" for an estimate, "€18" for a fixed price. */
export function formatRoutePrice(route: RouteExample): string {
  const price = formatEuro(getRoutePrice(route))
  return route.fixedPrice ? price : `ca. ${price}`
}
