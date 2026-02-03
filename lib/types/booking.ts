/**
 * Domain types for the taxi booking widget
 */

export interface Location {
  label: string
  lat: number
  lon: number
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

export interface QuoteResponse {
  distanceMeters: number
  durationSeconds: number
  breakdown: BreakdownItem[]
  totalCents: number
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
}
