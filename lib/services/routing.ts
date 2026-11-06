import { cacheLife } from 'next/cache'
import type { RouteResult } from '@/lib/types/booking'

const USER_AGENT = 'TaxiRijnvallei/1.0 (taxi booking widget; https://taxirijnvallei.nl)'

/**
 * Driving route from the public OSRM demo server, or `null` when there is no
 * route between the points.
 *
 * Coordinates are rounded to about 10 metres, so nearby addresses share a cache
 * entry. `use cache: remote` shares results between server instances and keeps
 * the load on the free OSRM server low. Network and server errors are thrown,
 * which keeps them out of the cache.
 *
 * @param coordinates [lon, lat] pairs, in driving order
 */
export async function getDrivingRoute(coordinates: [number, number][]): Promise<RouteResult | null> {
  const coordString = coordinates.map(([lon, lat]) => `${lon.toFixed(4)},${lat.toFixed(4)}`).join(';')
  return fetchDrivingRoute(coordString)
}

async function fetchDrivingRoute(coordString: string): Promise<RouteResult | null> {
  'use cache: remote'
  cacheLife('days')

  const url = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=polyline`
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
  if (!response.ok && response.status !== 400) {
    throw new Error(`OSRM responded with ${response.status}`)
  }

  const data = await response.json()
  if (data.code !== 'Ok' || !data.routes?.length) return null

  const route = data.routes[0]
  return {
    distanceMeters: route.distance,
    durationSeconds: route.duration,
    geometry: route.geometry,
  }
}
