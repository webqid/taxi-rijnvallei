import { cacheLife } from 'next/cache'
import type { GeocodeSuggestion } from '@/lib/types/booking'

const USER_AGENT = 'TaxiRijnvallei/1.0 (taxi booking widget; https://taxirijnvallei.nl)'

interface NominatimAddress {
  house_number?: string
  road?: string
  pedestrian?: string
  footway?: string
  cycleway?: string
  path?: string
  neighbourhood?: string
  suburb?: string
  hamlet?: string
  city?: string
  town?: string
  village?: string
  municipality?: string
  postcode?: string
  amenity?: string
  building?: string
  shop?: string
  tourism?: string
  leisure?: string
  office?: string
  craft?: string
  aeroway?: string
  railway?: string
  station?: string
}

interface NominatimResult {
  display_name: string
  lat: string
  lon: string
  place_id: number
  name?: string
  address?: NominatimAddress
  class?: string
  addresstype?: string
}

const NAMED_PLACE_TYPES = new Set(['hamlet', 'village', 'town', 'city'])
const NAMED_PLACE_CLASSES = new Set(['aeroway', 'railway', 'amenity'])

/** Turns a Nominatim result into a Dutch-style label: "Straatnaam 12, 1234AB, Plaats". */
function toSuggestion(item: NominatimResult): GeocodeSuggestion {
  const addr = item.address ?? {}
  const street = addr.road || addr.pedestrian || addr.footway || addr.cycleway || addr.path
  const city = addr.city || addr.town || addr.village || addr.municipality
  const postcode = addr.postcode?.replace(/\s/g, '')
  const poiName =
    item.name ||
    addr.aeroway ||
    addr.railway ||
    addr.station ||
    addr.amenity ||
    addr.building ||
    addr.shop ||
    addr.tourism ||
    addr.leisure ||
    addr.office ||
    addr.craft ||
    addr.hamlet

  const isNamedPlace =
    NAMED_PLACE_TYPES.has(item.addresstype ?? '') || NAMED_PLACE_CLASSES.has(item.class ?? '')

  const parts: string[] = []
  if (isNamedPlace && poiName) {
    parts.push(poiName)
    if (city && city !== poiName) parts.push(city)
    else if (addr.municipality && addr.municipality !== poiName) parts.push(addr.municipality)
  } else if (street) {
    parts.push(addr.house_number ? `${street} ${addr.house_number}` : street)
    if (postcode) parts.push(postcode)
    if (city) parts.push(city)
  } else if (addr.neighbourhood || addr.suburb) {
    parts.push(addr.neighbourhood || addr.suburb || '')
    if (city) parts.push(city)
  } else if (city) {
    parts.push(city)
  } else if (poiName) {
    parts.push(poiName)
    if (addr.municipality) parts.push(addr.municipality)
  } else {
    parts.push(...item.display_name.split(',').slice(0, 3))
  }

  return {
    label: parts.map((part) => part.trim()).filter(Boolean).join(', '),
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),
    placeId: String(item.place_id),
    city,
  }
}

/**
 * Address suggestions from OpenStreetMap Nominatim.
 *
 * Nominatim's usage policy asks clients to cache results and to stay below one
 * request per second. `use cache: remote` shares the results between all server
 * instances (on Vercel; elsewhere it falls back to memory), so popular searches
 * such as "Schiphol" are looked up once.
 */
export async function searchAddresses(query: string): Promise<GeocodeSuggestion[]> {
  'use cache: remote'
  cacheLife('weeks')

  const url = new URL('https://nominatim.openstreetmap.org/search')
  url.searchParams.set('q', query)
  url.searchParams.set('format', 'jsonv2')
  url.searchParams.set('addressdetails', '1')
  url.searchParams.set('limit', '5')
  url.searchParams.set('countrycodes', 'nl')
  url.searchParams.set('accept-language', 'nl')

  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
  // Throwing (instead of returning an empty list) keeps failures out of the cache.
  if (!response.ok) throw new Error(`Nominatim responded with ${response.status}`)

  const results = (await response.json()) as NominatimResult[]
  return results.map(toSuggestion)
}
