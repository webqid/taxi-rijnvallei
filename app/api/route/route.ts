import { NextRequest, NextResponse } from 'next/server'
import { RouteRequestSchema } from '@/lib/schemas/booking'
import type { RouteResult } from '@/lib/types/booking'

// Simple in-memory cache for routing results
const cache = new Map<string, { data: RouteResult; timestamp: number }>()
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 20

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

function getCacheKey(coordinates: [number, number][]): string {
  return coordinates.map(([lon, lat]) => `${lon.toFixed(5)},${lat.toFixed(5)}`).join('|')
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
    const validationResult = RouteRequestSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0]?.message || 'Ongeldige route aanvraag' },
        { status: 400 }
      )
    }

    const { coordinates } = validationResult.data

    // Check cache
    const cacheKey = getCacheKey(coordinates)
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json(cached.data)
    }

    // Build OSRM URL
    // OSRM expects coordinates as lon,lat pairs separated by semicolons
    const coordString = coordinates.map(([lon, lat]) => `${lon},${lat}`).join(';')
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=polyline`

    const response = await fetch(osrmUrl, {
      headers: {
        'User-Agent': 'TaxiRijnvallei/1.0 (taxi booking widget)',
      },
      next: { revalidate: 600 }, // Cache for 10 minutes
    })

    if (!response.ok) {
      console.error('OSRM API error:', response.status)
      return NextResponse.json(
        { error: 'Routeberekening service niet beschikbaar' },
        { status: 503 }
      )
    }

    const data = await response.json()

    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      return NextResponse.json(
        { error: 'Geen route gevonden tussen de opgegeven locaties' },
        { status: 404 }
      )
    }

    const route = data.routes[0]
    const result: RouteResult = {
      distanceMeters: route.distance,
      durationSeconds: route.duration,
      geometry: route.geometry, // Encoded polyline
    }

    // Update cache
    cache.set(cacheKey, { data: result, timestamp: Date.now() })

    // Clean old cache entries
    if (cache.size > 500) {
      const now = Date.now()
      for (const [key, value] of cache.entries()) {
        if (now - value.timestamp > CACHE_TTL_MS) {
          cache.delete(key)
        }
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Route calculation error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het berekenen van de route' },
      { status: 500 }
    )
  }
}
