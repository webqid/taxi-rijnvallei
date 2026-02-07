'use client'

import * as React from 'react'
import type { Location, QuoteRequest } from '@/lib/types/booking'
import type { QuoteResponseWithGeometry } from '@/hooks/use-quote'

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

const BookingContext = React.createContext<BookingContextType | null>(null)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookingData, setBookingDataState] = React.useState<BookingData | null>(null)

  const setBookingData = React.useCallback((data: BookingData) => {
    setBookingDataState(data)
  }, [])

  const clearBookingData = React.useCallback(() => {
    setBookingDataState(null)
  }, [])

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        clearBookingData,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBookingContext() {
  const context = React.useContext(BookingContext)
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider')
  }
  return context
}
