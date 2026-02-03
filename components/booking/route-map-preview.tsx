'use client'

import * as React from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Location } from '@/lib/types/booking'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Next.js
const createIcon = (color: string) =>
  new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
        <path fill="${color}" stroke="#fff" stroke-width="2" d="M12 2C6.48 2 2 6.48 2 12c0 7.5 10 22 10 22s10-14.5 10-22c0-5.52-4.48-10-10-10z"/>
        <circle fill="#fff" cx="12" cy="12" r="4"/>
      </svg>
    `)}`,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  })

const originIcon = createIcon('#16a34a') // green-600
const destinationIcon = createIcon('#dc2626') // red-600
const stopoverIcon = createIcon('#2563eb') // blue-600

// Decode polyline from OSRM format
function decodePolyline(str: string, precision = 5): [number, number][] {
  let index = 0
  let lat = 0
  let lng = 0
  const coordinates: [number, number][] = []
  const factor = Math.pow(10, precision)

  while (index < str.length) {
    // Decode latitude
    let shift = 0
    let result = 0
    let byte: number

    do {
      byte = str.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1
    lat += deltaLat

    // Decode longitude
    shift = 0
    result = 0

    do {
      byte = str.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1
    lng += deltaLng

    coordinates.push([lat / factor, lng / factor])
  }

  return coordinates
}

interface FitBoundsProps {
  bounds: L.LatLngBoundsExpression
}

function FitBounds({ bounds }: FitBoundsProps) {
  const map = useMap()

  React.useEffect(() => {
    map.fitBounds(bounds, { padding: [50, 50] })
  }, [map, bounds])

  return null
}

interface RouteMapPreviewProps {
  origin: Location | null
  destination: Location | null
  stopovers: Location[]
  geometry?: string
}

export function RouteMapPreview({
  origin,
  destination,
  stopovers,
  geometry,
}: RouteMapPreviewProps) {
  // Calculate bounds
  const bounds = React.useMemo(() => {
    const points: [number, number][] = []

    if (origin) points.push([origin.lat, origin.lon])
    stopovers.forEach((s) => points.push([s.lat, s.lon]))
    if (destination) points.push([destination.lat, destination.lon])

    if (points.length < 2) {
      // Default to Netherlands center
      return L.latLngBounds([51.5, 4.0], [52.5, 6.0])
    }

    return L.latLngBounds(points)
  }, [origin, destination, stopovers])

  // Decode route geometry
  const routeCoordinates = React.useMemo(() => {
    if (!geometry) return []
    return decodePolyline(geometry)
  }, [geometry])

  // Center point for initial view
  const center: [number, number] = React.useMemo(() => {
    if (origin) return [origin.lat, origin.lon]
    // Default to Netherlands
    return [52.1326, 5.2913]
  }, [origin])

  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ minHeight: '300px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds bounds={bounds} />

      {/* Route line */}
      {routeCoordinates.length > 0 && (
        <Polyline
          positions={routeCoordinates}
          color="#16a34a"
          weight={4}
          opacity={0.8}
        />
      )}

      {/* Origin marker */}
      {origin && (
        <Marker position={[origin.lat, origin.lon]} icon={originIcon} />
      )}

      {/* Stopover markers */}
      {stopovers.map((stop, index) => (
        <Marker
          key={`stopover-${index}`}
          position={[stop.lat, stop.lon]}
          icon={stopoverIcon}
        />
      ))}

      {/* Destination marker */}
      {destination && (
        <Marker position={[destination.lat, destination.lon]} icon={destinationIcon} />
      )}
    </MapContainer>
  )
}
