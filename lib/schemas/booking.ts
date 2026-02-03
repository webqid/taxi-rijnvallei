import { z } from 'zod'

/**
 * Zod schemas for validation
 */

export const LocationSchema = z.object({
  label: z.string().min(1, 'Locatie is verplicht'),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
})

export const QuoteRequestSchema = z.object({
  origin: LocationSchema,
  destination: LocationSchema,
  stopovers: z.array(LocationSchema).default([]),
  pickupAt: z.string().datetime({ message: 'Ongeldige datum/tijd' }),
  returnAt: z.string().datetime().nullable().default(null),
  luggage: z.boolean(),
  passengers: z.number().int().min(1, 'Minimaal 1 passagier').max(8, 'Maximaal 8 passagiers'),
})

export const GeocodeQuerySchema = z.object({
  q: z.string().min(2, 'Zoekterm te kort').max(200, 'Zoekterm te lang'),
})

export const RouteRequestSchema = z.object({
  coordinates: z.array(z.tuple([z.number(), z.number()])).min(2, 'Minimaal 2 coördinaten vereist'),
})

export type LocationInput = z.infer<typeof LocationSchema>
export type QuoteRequestInput = z.infer<typeof QuoteRequestSchema>
export type GeocodeQueryInput = z.infer<typeof GeocodeQuerySchema>
export type RouteRequestInput = z.infer<typeof RouteRequestSchema>
