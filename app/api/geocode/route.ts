import { NextRequest, NextResponse } from 'next/server'
import { GeocodeQuerySchema } from '@/lib/schemas/booking'
import type { GeocodeSuggestion } from '@/lib/types/booking'

// Simple in-memory cache for geocoding results
const cache = new Map<string, { data: GeocodeSuggestion[]; timestamp: number }>()
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

// Simple rate limiting per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30

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

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Te veel verzoeken. Probeer het later opnieuw.' },
        { status: 429 }
      )
    }

    // Parse and validate query
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''

    const validationResult = GeocodeQuerySchema.safeParse({ q: query })
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0]?.message || 'Ongeldige zoekopdracht' },
        { status: 400 }
      )
    }

    const normalizedQuery = query.toLowerCase().trim()

    // Check cache
    const cached = cache.get(normalizedQuery)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json(cached.data)
    }

    // Call Nominatim API
    const nominatimUrl = new URL('https://nominatim.openstreetmap.org/search')
    nominatimUrl.searchParams.set('q', query)
    nominatimUrl.searchParams.set('format', 'json')
    nominatimUrl.searchParams.set('addressdetails', '1')
    nominatimUrl.searchParams.set('limit', '5')
    nominatimUrl.searchParams.set('countrycodes', 'nl') // Focus on Netherlands
    nominatimUrl.searchParams.set('accept-language', 'nl')

    const response = await fetch(nominatimUrl.toString(), {
      headers: {
        'User-Agent': 'TaxiRijnvallei/1.0 (taxi booking widget)',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      console.error('Nominatim API error:', response.status)
      return NextResponse.json(
        { error: 'Geocoding service niet beschikbaar' },
        { status: 503 }
      )
    }

    const data = await response.json()

    // Transform to our format
    const suggestions: GeocodeSuggestion[] = data.map((item: {
      display_name: string
      lat: string
      lon: string
      place_id: number
    }) => ({
      label: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      placeId: String(item.place_id),
    }))

    // Update cache
    cache.set(normalizedQuery, { data: suggestions, timestamp: Date.now() })

    // Clean old cache entries periodically
    if (cache.size > 1000) {
      const now = Date.now()
      for (const [key, value] of cache.entries()) {
        if (now - value.timestamp > CACHE_TTL_MS) {
          cache.delete(key)
        }
      }
    }

    return NextResponse.json(suggestions)
  } catch (error) {
    console.error('Geocode error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het zoeken' },
      { status: 500 }
    )
  }
}
