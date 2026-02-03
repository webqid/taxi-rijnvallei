import { NextRequest, NextResponse } from 'next/server'
import { QuoteRequestSchema } from '@/lib/schemas/booking'
import { calculateQuote } from '@/lib/services/pricing'
import type { Location, QuoteResponse, RouteResult } from '@/lib/types/booking'

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 15

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
  return ip
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  record.count++
  return true
}

async function fetchRoute(coordinates: [number, number][]): Promise<RouteResult> {
  const coordString = coordinates.map(([lon, lat]) => `${lon},${lat}`).join(';')
  const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=polyline`

  const response = await fetch(osrmUrl, {
    headers: {
      'User-Agent': 'TaxiRijnvallei/1.0 (taxi booking widget)',
    },
  })

  if (!response.ok) {
    throw new Error('Route service unavailable')
  }

  const data = await response.json()

  if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
    throw new Error('No route found')
  }

  const route = data.routes[0]
  return {
    distanceMeters: route.distance,
    durationSeconds: route.duration,
    geometry: route.geometry,
  }
}

function buildCoordinates(origin: Location, stopovers: Location[], destination: Location): [number, number][] {
  const coords: [number, number][] = [[origin.lon, origin.lat]]
  for (const stop of stopovers) {
    coords.push([stop.lon, stop.lat])
  }
  coords.push([destination.lon, destination.lat])
  return coords
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Te veel verzoeken. Probeer het later opnieuw.' },
        { status: 429 }
      )
    }

    // Parse and validate body
    const body = await request.json()
    const validationResult = QuoteRequestSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0]?.message || 'Ongeldige aanvraag' },
        { status: 400 }
      )
    }

    const quoteRequest = validationResult.data

    // Build coordinates for outward journey
    const outwardCoords = buildCoordinates(
      quoteRequest.origin,
      quoteRequest.stopovers,
      quoteRequest.destination
    )

    // Fetch outward route
    let outwardRoute: RouteResult
    try {
      outwardRoute = await fetchRoute(outwardCoords)
    } catch {
      return NextResponse.json(
        { error: 'Geen route gevonden. Controleer de opgegeven locaties.' },
        { status: 404 }
      )
    }

    // Fetch return route if needed
    let returnRoute: RouteResult | null = null
    if (quoteRequest.returnAt) {
      // Return route is reverse: destination -> stopovers (reversed) -> origin
      const returnCoords = buildCoordinates(
        quoteRequest.destination,
        [...quoteRequest.stopovers].reverse(),
        quoteRequest.origin
      )

      try {
        returnRoute = await fetchRoute(returnCoords)
      } catch {
        return NextResponse.json(
          { error: 'Geen retourroute gevonden. Controleer de opgegeven locaties.' },
          { status: 404 }
        )
      }
    }

    // Calculate quote
    const quote = calculateQuote(outwardRoute, returnRoute, quoteRequest)

    const response: QuoteResponse & { geometry?: string; returnGeometry?: string } = {
      distanceMeters: quote.distanceMeters,
      durationSeconds: quote.durationSeconds,
      breakdown: quote.breakdown,
      totalCents: quote.totalCents,
      geometry: outwardRoute.geometry,
      returnGeometry: returnRoute?.geometry,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Quote calculation error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het berekenen van de prijs' },
      { status: 500 }
    )
  }
}
