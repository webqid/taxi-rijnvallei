/**
 * Domain types for the taxi booking widget
 */

export interface Location {
  label: string
  lat: number
  lon: number
  /** Place name (city, town or village). Used to find fixed airport fares. */
  city?: string
}

export interface QuoteRequest {
  origin: Location
  destination: Location
  stopovers: Location[]
  pickupAt: string // ISO string
  returnAt: string | null // ISO string or null
  luggage: boolean
  passengers: number
}

export interface BreakdownItem {
  label: string
  amountCents: number
}

/** `fixed`: a published fixed fare (airport rides). `meter`: taximeter estimate. */
export type PricingMode = 'fixed' | 'meter'

export interface QuoteResponse {
  distanceMeters: number
  durationSeconds: number
  breakdown: BreakdownItem[]
  totalCents: number
  pricing: PricingMode
  /** Conditions and remarks shown below the price. */
  notes: string[]
}

export interface QuoteResponseWithGeometry extends QuoteResponse {
  geometry?: string
  returnGeometry?: string
}

export interface RouteResult {
  distanceMeters: number
  durationSeconds: number
  geometry?: string // Encoded polyline for map display
}

export interface GeocodeSuggestion {
  label: string
  lat: number
  lon: number
  placeId: string
  city?: string
}
