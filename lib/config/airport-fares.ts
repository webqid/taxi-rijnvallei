/**
 * Fixed airport fares. These are the company's published prices: whole euros,
 * including 9% btw, for 1–4 passengers, booked at least 24 hours in advance.
 *
 * The same data drives the rates tables, the airport landing page, the FAQ
 * answers and the price calculator, so a price change is made only here.
 */

export type AirportId = 'schiphol' | 'eindhoven' | 'rotterdam' | 'weeze' | 'maastricht' | 'brussel'

export interface Airport {
  id: AirportId
  name: string
  /** Terminal coordinates. The calculator treats a location within `radiusKm` as this airport. */
  lat: number
  lon: number
  radiusKm: number
}

/** Display order of the airports in every table. */
export const AIRPORTS: Airport[] = [
  { id: 'schiphol', name: 'Schiphol', lat: 52.3096, lon: 4.7622, radiusKm: 3 },
  { id: 'eindhoven', name: 'Eindhoven Airport', lat: 51.4582, lon: 5.3917, radiusKm: 3 },
  { id: 'rotterdam', name: 'Rotterdam The Hague Airport', lat: 51.9563, lon: 4.4397, radiusKm: 2.5 },
  { id: 'weeze', name: 'Weeze Airport', lat: 51.6031, lon: 6.1434, radiusKm: 3 },
  { id: 'maastricht', name: 'Maastricht Aachen Airport', lat: 50.9159, lon: 5.7686, radiusKm: 2.5 },
  { id: 'brussel', name: 'Brussels Airport', lat: 50.8983, lon: 4.4833, radiusKm: 3 },
]

export interface AirportFare {
  /** Wegbrengen: from the region to the airport. */
  dropOff: number
  /** Ophalen: from the airport to the region. */
  pickUp: number
  /** Retour: there and back. */
  roundTrip: number
}

export interface FareRegion {
  id: string
  places: string[]
  fares: Partial<Record<AirportId, AirportFare>>
}

const single = (price: number, roundTrip: number): AirportFare => ({
  dropOff: price,
  pickUp: price,
  roundTrip,
})

export const FARE_REGIONS: FareRegion[] = [
  {
    id: 'rijnvallei',
    places: ['Veenendaal', 'Ede', 'Bennekom', 'Wageningen'],
    fares: {
      schiphol: { dropOff: 150, pickUp: 160, roundTrip: 300 },
      eindhoven: single(150, 300),
      rotterdam: single(160, 320),
      weeze: single(150, 300),
      maastricht: { dropOff: 260, pickUp: 280, roundTrip: 520 },
      brussel: { dropOff: 260, pickUp: 280, roundTrip: 520 },
    },
  },
  {
    id: 'gelderse-vallei',
    places: ['Barneveld', 'Voorthuizen', 'Lunteren', 'Renswoude', 'Woudenberg', 'Scherpenzeel'],
    fares: {
      schiphol: { dropOff: 160, pickUp: 170, roundTrip: 320 },
      eindhoven: single(170, 340),
      rotterdam: single(160, 320),
      weeze: single(160, 320),
      maastricht: { dropOff: 270, pickUp: 290, roundTrip: 540 },
      brussel: { dropOff: 270, pickUp: 290, roundTrip: 540 },
    },
  },
  {
    id: 'rhenen-renkum',
    places: ['Rhenen', 'Renkum', 'Doorwerth'],
    fares: { schiphol: { dropOff: 160, pickUp: 170, roundTrip: 320 } },
  },
  {
    id: 'oosterbeek',
    places: ['Oosterbeek'],
    fares: { schiphol: { dropOff: 170, pickUp: 180, roundTrip: 340 } },
  },
  {
    id: 'veluwe',
    places: ['Otterlo', 'Harskamp', 'Wekerom', 'Kootwijkerbroek'],
    fares: { schiphol: { dropOff: 170, pickUp: 180, roundTrip: 340 } },
  },
  {
    id: 'kesteren',
    places: ['Kesteren'],
    fares: { schiphol: { dropOff: 160, pickUp: 170, roundTrip: 320 } },
  },
  {
    id: 'druten',
    places: ['Druten'],
    fares: { schiphol: { dropOff: 170, pickUp: 180, roundTrip: 340 } },
  },
]

/** Waiting time when picking up at the airport. */
export const AIRPORT_WAITING = {
  freeMinutes: 45,
  /** Charged per started 15 minutes after the free waiting time. */
  per15MinutesCents: 1384,
} as const

export const AIRPORT_FARE_CONDITIONS = [
  'Vaste prijzen gelden bij reservering minimaal 24 uur van tevoren.',
  'Prijzen per taxi voor 1–4 personen, inclusief 9% btw. Grote taxi (5–8 personen) op aanvraag.',
  'Op zaterdag- en zondagochtend tussen 01:00 en 05:00 uur gelden hogere tarieven.',
] as const

export function getAirport(id: AirportId): Airport {
  const airport = AIRPORTS.find((a) => a.id === id)
  if (!airport) throw new Error(`Unknown airport: ${id}`)
  return airport
}

export function getFareRegion(id: string): FareRegion {
  const region = FARE_REGIONS.find((r) => r.id === id)
  if (!region) throw new Error(`Unknown fare region: ${id}`)
  return region
}

/** Finds the fare region for a place name such as "Bennekom" (case-insensitive). */
export function findFareRegion(place: string | undefined): FareRegion | undefined {
  if (!place) return undefined
  const needle = place.trim().toLowerCase()
  return FARE_REGIONS.find((region) => region.places.some((p) => p.toLowerCase() === needle))
}

/** Lowest drop-off price for an airport across all regions ("vanaf €150"). */
export function lowestDropOffFare(airport: AirportId): number {
  const prices = FARE_REGIONS.flatMap((r) => (r.fares[airport] ? [r.fares[airport].dropOff] : []))
  return Math.min(...prices)
}

/** "Veenendaal, Ede, Bennekom en Wageningen" */
export function formatPlaceList(places: readonly string[]): string {
  if (places.length <= 1) return places.join('')
  return `${places.slice(0, -1).join(', ')} en ${places[places.length - 1]}`
}
