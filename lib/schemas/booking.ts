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

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Naam is verplicht'),
  phone: z.string().min(6, 'Geldig telefoonnummer is verplicht'),
  email: z.string().email('Geldig e-mailadres is verplicht'),
  message: z.string().optional(),
  // Booking data (optional, from quote)
  origin: LocationSchema.optional(),
  destination: LocationSchema.optional(),
  stopovers: z.array(LocationSchema).optional(),
  pickupAt: z.string().optional(), // Accept any string format for datetime
  returnAt: z.string().nullable().optional(),
  luggage: z.boolean().optional(),
  passengers: z.number().min(1).max(8).optional(),
  // Quote details - accept number, will be stored as-is
  quoteTotalCents: z.number().optional(),
  quoteDistanceMeters: z.number().optional(),
  quoteDurationSeconds: z.number().optional(),
})

export type LocationInput = z.infer<typeof LocationSchema>
export type QuoteRequestInput = z.infer<typeof QuoteRequestSchema>
export type GeocodeQueryInput = z.infer<typeof GeocodeQuerySchema>
export type RouteRequestInput = z.infer<typeof RouteRequestSchema>
export type ContactFormInput = z.infer<typeof ContactFormSchema>
