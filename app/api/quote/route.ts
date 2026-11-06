import type { NextRequest } from 'next/server'
import { QuoteRequestSchema } from '@/lib/schemas/booking'
import { createRateLimiter } from '@/lib/rate-limit'
import { calculateQuote } from '@/lib/services/pricing'
import { getDrivingRoute } from '@/lib/services/routing'
import type { Location, QuoteResponseWithGeometry } from '@/lib/types/booking'

const isAllowed = createRateLimiter({ limit: 15, windowMs: 60_000 })

function toCoordinates(points: Location[]): [number, number][] {
  return points.map((point) => [point.lon, point.lat])
}

export async function POST(request: NextRequest) {
  if (!isAllowed(request.headers)) {
    return Response.json({ error: 'Te veel verzoeken. Probeer het later opnieuw.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const validation = QuoteRequestSchema.safeParse(body)
  if (!validation.success) {
    // The widget only submits complete forms, so this is a malformed request.
    return Response.json(
      { error: 'Ongeldige aanvraag. Controleer de ingevulde gegevens.' },
      { status: 400 }
    )
  }

  const quoteRequest = validation.data
  const { origin, stopovers, destination } = quoteRequest

  try {
    const [outwardRoute, returnRoute] = await Promise.all([
      getDrivingRoute(toCoordinates([origin, ...stopovers, destination])),
      // The return trip drives the same stops in reverse order.
      quoteRequest.returnAt
        ? getDrivingRoute(toCoordinates([destination, ...[...stopovers].reverse(), origin]))
        : null,
    ])

    if (!outwardRoute || (quoteRequest.returnAt && !returnRoute)) {
      return Response.json(
        { error: 'Geen route gevonden. Controleer de opgegeven locaties.' },
        { status: 404 }
      )
    }

    const quote = calculateQuote(outwardRoute, returnRoute, quoteRequest)
    const response: QuoteResponseWithGeometry = {
      ...quote,
      geometry: outwardRoute.geometry,
      returnGeometry: returnRoute?.geometry,
    }
    return Response.json(response)
  } catch (error) {
    console.error('Quote calculation error:', error)
    return Response.json(
      { error: 'De routeberekening is tijdelijk niet beschikbaar. Bel ons gerust voor een prijsopgave.' },
      { status: 503 }
    )
  }
}
