'use client'

import * as React from 'react'
import type { Location, QuoteResponseWithGeometry } from '@/lib/types/booking'

export interface BookingData {
  origin: Location | null
  destination: Location | null
  stopovers: Location[]
  pickupAt: string | null
  returnAt: string | null
  luggage: boolean
  passengers: number
  quote: QuoteResponseWithGeometry | null
}

interface BookingContextType {
  bookingData: BookingData | null
  setBookingData: (data: BookingData) => void
  clearBookingData: () => void
}

// Outside a <BookingProvider> (every page without the price calculator) the
// contact form simply has no booking data.
const noBooking: BookingContextType = {
  bookingData: null,
  setBookingData: () => {},
  clearBookingData: () => {},
}

const BookingContext = React.createContext<BookingContextType>(noBooking)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookingData, setBookingData] = React.useState<BookingData | null>(null)

  const value = React.useMemo(
    () => ({
      bookingData,
      setBookingData,
      clearBookingData: () => setBookingData(null),
    }),
    [bookingData]
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBookingContext() {
  return React.useContext(BookingContext)
}
