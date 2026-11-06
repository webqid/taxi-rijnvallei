import type { NextRequest } from 'next/server'
import { GeocodeQuerySchema } from '@/lib/schemas/booking'
import { createRateLimiter } from '@/lib/rate-limit'
import { searchAddresses } from '@/lib/services/geocoding'

const isAllowed = createRateLimiter({ limit: 30, windowMs: 60_000 })

export async function GET(request: NextRequest) {
  // Read the request before any try/catch: with Cache Components, request data
  // signals that this handler runs at request time.
  const query = request.nextUrl.searchParams.get('q') ?? ''

  if (!isAllowed(request.headers)) {
    return Response.json({ error: 'Te veel verzoeken. Probeer het later opnieuw.' }, { status: 429 })
  }

  const validation = GeocodeQuerySchema.safeParse({ q: query })
  if (!validation.success) {
    return Response.json(
      { error: validation.error.issues[0]?.message || 'Ongeldige zoekopdracht' },
      { status: 400 }
    )
  }

  try {
    return Response.json(await searchAddresses(validation.data.q.trim().toLowerCase()))
  } catch (error) {
    console.error('Geocode error:', error)
    return Response.json({ error: 'Adres zoeken is tijdelijk niet beschikbaar' }, { status: 503 })
  }
}
