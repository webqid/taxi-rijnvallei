/**
 * Pricing configuration for taxi rides
 * All amounts are in cents (EUR)
 * Based on official taximeter rates
 */

export const PRICING_CONFIG = {
  /** Standard taxi rates (1-4 passengers) */
  standaard: {
    /** Base fee (instaptarief) */
    baseFeeCents: 415,
    /** Price per kilometer */
    perKmCents: 305,
    /** Price per minute */
    perMinCents: 50,
    /** Max passengers for this rate */
    maxPassengers: 4,
  },

  /** Large taxi rates (5-8 passengers) */
  groot: {
    /** Base fee (instaptarief) */
    baseFeeCents: 844,
    /** Price per kilometer */
    perKmCents: 385,
    /** Price per minute */
    perMinCents: 57,
    /** Max passengers for this rate */
    maxPassengers: 8,
  },

  /** Surcharge for luggage */
  luggageSurchargeCents: 250,

  /** Night surcharge percentage (applied between nightStartHour and nightEndHour) */
  nightSurchargePercent: 15,

  /** Night hours start (22:00) */
  nightStartHour: 22,

  /** Night hours end (06:00) */
  nightEndHour: 6,

  /** Minimum fare for any ride */
  minimumFareCents: 1200,

  /** Maximum passengers allowed */
  maxPassengers: 8,

  /** Minimum passengers */
  minPassengers: 1,

  /** Threshold for standard vs large taxi */
  standardMaxPassengers: 4,
} as const

export type PricingConfig = typeof PRICING_CONFIG
