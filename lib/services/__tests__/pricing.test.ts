import { describe, it, expect } from 'vitest'
import {
  isNightTime,
  calculateLegPrice,
  calculateQuote,
  formatPrice,
  formatDuration,
  formatDistance,
} from '@/lib/services/pricing'
import { PRICING_CONFIG } from '@/lib/config/pricing'
import type { QuoteRequest, RouteResult } from '@/lib/types/booking'

// Helper to create ISO string for a specific local hour
function createLocalTimeISO(hour: number, minute: number = 0): string {
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

describe('isNightTime', () => {
  it('should return true for 22:00 local time', () => {
    expect(isNightTime(createLocalTimeISO(22, 0))).toBe(true)
  })

  it('should return true for 23:30 local time', () => {
    expect(isNightTime(createLocalTimeISO(23, 30))).toBe(true)
  })

  it('should return true for 05:00 local time', () => {
    expect(isNightTime(createLocalTimeISO(5, 0))).toBe(true)
  })

  it('should return false for 06:00 local time', () => {
    expect(isNightTime(createLocalTimeISO(6, 0))).toBe(false)
  })

  it('should return false for 12:00 local time', () => {
    expect(isNightTime(createLocalTimeISO(12, 0))).toBe(false)
  })

  it('should return false for 21:59 local time', () => {
    expect(isNightTime(createLocalTimeISO(21, 59))).toBe(false)
  })
})

describe('calculateLegPrice', () => {
  const baseRoute: RouteResult = {
    distanceMeters: 10000, // 10 km
    durationSeconds: 900, // 15 min
  }

  it('should calculate base price without extras for standard taxi', () => {
    const pickupAt = createLocalTimeISO(14, 0) // Day time
    const result = calculateLegPrice(baseRoute, pickupAt, false, 2)

    // Should use standard taxi rates for 2 passengers
    expect(result.breakdown).toContainEqual(
      expect.objectContaining({
        label: expect.stringContaining('Instaptarief'),
        amountCents: PRICING_CONFIG.standaard.baseFeeCents,
      })
    )

    // Distance: 10km * 305 cents = 3050 cents
    expect(result.breakdown).toContainEqual(
      expect.objectContaining({
        label: expect.stringContaining('Afstand'),
        amountCents: 3050,
      })
    )

    // Duration: 15min * 50 cents = 750 cents
    expect(result.breakdown).toContainEqual(
      expect.objectContaining({
        label: expect.stringContaining('Rijtijd'),
        amountCents: 750,
      })
    )

    // No luggage surcharge
    const luggageItem = result.breakdown.find((b) => b.label.includes('Bagage'))
    expect(luggageItem).toBeUndefined()

    // No night surcharge
    const nightItem = result.breakdown.find((b) => b.label.includes('Nacht'))
    expect(nightItem).toBeUndefined()
  })

  it('should add luggage surcharge when luggage is true', () => {
    const pickupAt = createLocalTimeISO(14, 0)
    const result = calculateLegPrice(baseRoute, pickupAt, true, 2)

    expect(result.breakdown).toContainEqual({
      label: 'Bagage toeslag',
      amountCents: PRICING_CONFIG.luggageSurchargeCents,
    })
  })

  it('should use large taxi rates for more than 4 passengers', () => {
    const pickupAt = createLocalTimeISO(14, 0)
    const passengers = 5

    const result = calculateLegPrice(baseRoute, pickupAt, false, passengers)

    // Should use large taxi rates
    expect(result.breakdown).toContainEqual(
      expect.objectContaining({
        label: expect.stringContaining('Grote taxi'),
        amountCents: PRICING_CONFIG.groot.baseFeeCents,
      })
    )

    // Distance: 10km * 385 cents = 3850 cents
    expect(result.breakdown).toContainEqual(
      expect.objectContaining({
        label: expect.stringContaining('Afstand'),
        amountCents: 3850,
      })
    )
  })

  it('should use standard taxi rates for 4 passengers', () => {
    const pickupAt = createLocalTimeISO(14, 0)
    const result = calculateLegPrice(baseRoute, pickupAt, false, 4)

    expect(result.breakdown).toContainEqual(
      expect.objectContaining({
        label: expect.stringContaining('Standaard taxi'),
        amountCents: PRICING_CONFIG.standaard.baseFeeCents,
      })
    )
  })

  it('should add night surcharge during night hours', () => {
    const pickupAt = createLocalTimeISO(23, 0) // 23:00 local time
    const result = calculateLegPrice(baseRoute, pickupAt, false, 2)

    const nightItem = result.breakdown.find((b) => b.label.includes('Nacht'))
    expect(nightItem).toBeDefined()
    expect(nightItem!.amountCents).toBeGreaterThan(0)
  })

  it('should calculate correct subtotal', () => {
    const pickupAt = createLocalTimeISO(14, 0)
    const result = calculateLegPrice(baseRoute, pickupAt, false, 2)

    const expectedSubtotal = result.breakdown.reduce((sum, item) => sum + item.amountCents, 0)
    expect(result.subtotalCents).toBe(expectedSubtotal)
  })
})

describe('calculateQuote', () => {
  const baseRoute: RouteResult = {
    distanceMeters: 5000, // 5 km
    durationSeconds: 600, // 10 min
  }

  const baseRequest: QuoteRequest = {
    origin: { label: 'A', lat: 52.0, lon: 5.0 },
    destination: { label: 'B', lat: 52.1, lon: 5.1 },
    stopovers: [],
    pickupAt: createLocalTimeISO(14, 0),
    returnAt: null,
    luggage: false,
    passengers: 2,
  }

  it('should apply minimum fare when calculated price is too low', () => {
    const shortRoute: RouteResult = {
      distanceMeters: 500, // 0.5 km
      durationSeconds: 120, // 2 min
    }

    const result = calculateQuote(shortRoute, null, baseRequest)

    expect(result.totalCents).toBe(PRICING_CONFIG.minimumFareCents)
    expect(result.breakdown).toContainEqual(
      expect.objectContaining({
        label: 'Opslag minimum tarief',
      })
    )
  })

  it('should not apply minimum fare when price exceeds it', () => {
    const result = calculateQuote(baseRoute, null, baseRequest)

    const minimumItem = result.breakdown.find((b) => b.label.includes('minimum'))
    expect(minimumItem).toBeUndefined()
    expect(result.totalCents).toBeGreaterThanOrEqual(PRICING_CONFIG.minimumFareCents)
  })

  it('should calculate return trip correctly', () => {
    const requestWithReturn: QuoteRequest = {
      ...baseRequest,
      returnAt: createLocalTimeISO(18, 0),
    }

    const result = calculateQuote(baseRoute, baseRoute, requestWithReturn)

    // Should have items for both legs
    const heenItems = result.breakdown.filter((b) => b.label.includes('Heenreis'))
    const terugItems = result.breakdown.filter((b) => b.label.includes('Terugreis'))

    expect(heenItems.length).toBeGreaterThan(0)
    expect(terugItems.length).toBeGreaterThan(0)

    // Total distance should be doubled
    expect(result.distanceMeters).toBe(baseRoute.distanceMeters * 2)
    expect(result.durationSeconds).toBe(baseRoute.durationSeconds * 2)
  })

  it('should handle all extras combined', () => {
    const nightRequest: QuoteRequest = {
      ...baseRequest,
      pickupAt: createLocalTimeISO(23, 0),
      luggage: true,
      passengers: 6,
    }

    const result = calculateQuote(baseRoute, null, nightRequest)

    // Should have luggage
    expect(result.breakdown.some((b) => b.label.includes('Bagage'))).toBe(true)

    // Should use large taxi rates for 6 passengers
    expect(result.breakdown.some((b) => b.label.includes('Grote taxi'))).toBe(true)

    // Should have night surcharge
    expect(result.breakdown.some((b) => b.label.includes('Nacht'))).toBe(true)
  })
})

describe('formatPrice', () => {
  it('should format cents to EUR', () => {
    expect(formatPrice(1500)).toMatch(/15[,.]00/)
  })

  it('should handle zero', () => {
    expect(formatPrice(0)).toMatch(/0[,.]00/)
  })

  it('should handle large amounts', () => {
    expect(formatPrice(123456)).toMatch(/1[.,]?234[,.]56/)
  })
})

describe('formatDuration', () => {
  it('should format minutes only', () => {
    expect(formatDuration(900)).toBe('15 min')
  })

  it('should format hours and minutes', () => {
    expect(formatDuration(3900)).toBe('1 uur 5 min')
  })

  it('should handle zero', () => {
    expect(formatDuration(0)).toBe('0 min')
  })
})

describe('formatDistance', () => {
  it('should format meters to km', () => {
    expect(formatDistance(10000)).toBe('10.0 km')
  })

  it('should handle decimals', () => {
    expect(formatDistance(15500)).toBe('15.5 km')
  })
})
