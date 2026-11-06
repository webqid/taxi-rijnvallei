import { describe, it, expect } from 'vitest'
import {
  FIXED_PRICE_ROUTES,
  formatLowestPriceTo,
  formatRoutePrice,
  getRoute,
} from '@/lib/config/route-examples'

describe('formatRoutePrice', () => {
  it('shows a fixed price without "ca."', () => {
    expect(formatRoutePrice(getRoute('ede-station'))).toBe('€25')
  })

  it('shows two fixed prices as a range', () => {
    expect(formatRoutePrice(getRoute('bennekom-station'))).toBe('€30–€45')
  })
})

describe('formatLowestPriceTo', () => {
  it('shows the lowest fixed price to a destination', () => {
    expect(formatLowestPriceTo('Station Ede-Wageningen')).toBe('vanaf €25')
    expect(formatLowestPriceTo('Wageningen Campus (WUR)')).toBe('vanaf €30')
  })
})

describe('FIXED_PRICE_ROUTES', () => {
  it("contains the owner's priced routes", () => {
    expect(FIXED_PRICE_ROUTES).toHaveLength(15) // "binnen Ede €25" is one line from the owner but two routes (station and hospital)
    expect(FIXED_PRICE_ROUTES.every((id) => getRoute(id).fixedPrice > 0)).toBe(true)
  })
})
