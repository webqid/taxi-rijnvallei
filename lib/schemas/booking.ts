import { z } from 'zod'

/**
 * Zod schemas for validating API input
 */

export const LocationSchema = z.object({
  label: z.string().min(1, 'Locatie is verplicht').max(300),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  city: z.string().max(100).optional(),
})

export const QuoteRequestSchema = z.object({
  origin: LocationSchema,
  destination: LocationSchema,
  stopovers: z.array(LocationSchema).max(5, 'Maximaal 5 tussenstops').default([]),
  pickupAt: z.string().datetime({ message: 'Ongeldige datum/tijd' }),
  returnAt: z.string().datetime().nullable().default(null),
  luggage: z.boolean(),
  passengers: z.number().int().min(1, 'Minimaal 1 passagier').max(8, 'Maximaal 8 passagiers'),
})

export const GeocodeQuerySchema = z.object({
  q: z.string().trim().min(2, 'Zoekterm te kort').max(200, 'Zoekterm te lang'),
})

export type LocationInput = z.infer<typeof LocationSchema>
export type QuoteRequestInput = z.infer<typeof QuoteRequestSchema>
export type GeocodeQueryInput = z.infer<typeof GeocodeQuerySchema>
