'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { Loader2, Calculator, MapPin, Navigation } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LocationInput } from './location-input'
import { StopoverInput } from './stopover-input'
import { SwapButton } from './swap-button'
import { DateTimeInput } from './datetime-input'
import { ReturnToggle } from './return-toggle'
import { LuggageRadio } from './luggage-radio'
import { PassengerStepper } from './passenger-stepper'
import { QuoteResult } from './quote-result'
import { QuoteSkeleton, MapSkeleton } from './quote-skeleton'
import { useQuote } from '@/hooks/use-quote'
import type { Location, QuoteRequest } from '@/lib/types/booking'

// Lazy-loaded map component (no SSR to avoid Leaflet window errors)
const RouteMapPreview = dynamic(
  () => import('./route-map-preview').then((mod) => mod.RouteMapPreview),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    ),
  }
)

interface BookingFormState {
  origin: Location | null
  destination: Location | null
  stopovers: (Location | null)[]
  pickupAt: string | null
  returnEnabled: boolean
  returnAt: string | null
  luggage: boolean
  passengers: number
}

const initialState: BookingFormState = {
  origin: null,
  destination: null,
  stopovers: [],
  pickupAt: null,
  returnEnabled: false,
  returnAt: null,
  luggage: false,
  passengers: 2,
}

export function BookingWidget({ className }: { className?: string }) {
  const [formState, setFormState] = React.useState<BookingFormState>(initialState)
  const { calculateQuote, quote, isLoading, error, reset } = useQuote()

  const updateField = <K extends keyof BookingFormState>(
    key: K,
    value: BookingFormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }))
    // Reset quote when form changes
    if (quote) {
      reset()
    }
  }

  const handleSwap = () => {
    setFormState((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }))
    if (quote) {
      reset()
    }
  }

  const handleReturnToggle = (enabled: boolean) => {
    setFormState((prev) => ({
      ...prev,
      returnEnabled: enabled,
      returnAt: enabled ? prev.returnAt : null,
    }))
    if (quote) {
      reset()
    }
  }

  // Validation
  const isValid = React.useMemo(() => {
    const { origin, destination, pickupAt, stopovers, returnEnabled, returnAt } = formState

    if (!origin || !destination) return false
    if (!pickupAt) return false

    // Check if all stopovers are filled (no null values)
    if (stopovers.some((s) => s === null)) return false

    // If return is enabled, return date must be set
    if (returnEnabled && !returnAt) return false

    return true
  }, [formState])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValid || !formState.origin || !formState.destination || !formState.pickupAt) {
      return
    }

    // Filter out null stopovers and cast to Location[]
    const validStopovers = formState.stopovers.filter(
      (s): s is Location => s !== null
    )

    const request: QuoteRequest = {
      origin: formState.origin,
      destination: formState.destination,
      stopovers: validStopovers,
      pickupAt: formState.pickupAt,
      returnAt: formState.returnEnabled ? formState.returnAt : null,
      luggage: formState.luggage,
      passengers: formState.passengers,
    }

    calculateQuote(request)
  }

  return (
    <div className={cn('grid gap-6 lg:grid-cols-2', className)}>
      {/* Form Card */}
      <Card className="shadow-xl">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="h-6 w-6 text-sky-600" />
            Ritprijs berekenen
          </CardTitle>
          <CardDescription>
            Vul uw reis in en ontvang direct een prijsindicatie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Origin & Destination */}
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <LocationInput
                  id="origin"
                  label="Ophaaladres"
                  placeholder="Waar worden u opgehaald?"
                  value={formState.origin}
                  onChange={(value) => updateField('origin', value)}
                  icon={<MapPin className="h-4 w-4 text-green-600" />}
                  className="flex-1"
                />
                <SwapButton
                  onClick={handleSwap}
                  disabled={!formState.origin && !formState.destination}
                  className="mb-0.5"
                />
              </div>

              <LocationInput
                id="destination"
                label="Bestemming"
                placeholder="Waar gaat u naartoe?"
                value={formState.destination}
                onChange={(value) => updateField('destination', value)}
                icon={<Navigation className="h-4 w-4 text-red-500" />}
              />

              {/* Stopovers */}
              <StopoverInput
                stopovers={formState.stopovers}
                onChange={(value) => updateField('stopovers', value)}
              />
            </div>

            {/* Date & Time */}
            <div className="space-y-4 border-t pt-4">
              <DateTimeInput
                id="pickupAt"
                label="Ophaaldatum en -tijd"
                value={formState.pickupAt}
                onChange={(value) => updateField('pickupAt', value)}
              />

              <ReturnToggle
                checked={formState.returnEnabled}
                onChange={handleReturnToggle}
              />

              {formState.returnEnabled && (
                <DateTimeInput
                  id="returnAt"
                  label="Retourdatum en -tijd"
                  value={formState.returnAt}
                  onChange={(value) => updateField('returnAt', value)}
                  minDateTime={formState.pickupAt ?? undefined}
                />
              )}
            </div>

            {/* Options */}
            <div className="space-y-4 border-t pt-4">
              <LuggageRadio
                value={formState.luggage}
                onChange={(value) => updateField('luggage', value)}
              />

              <PassengerStepper
                value={formState.passengers}
                onChange={(value) => updateField('passengers', value)}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full gap-2 bg-sky-600 py-6 text-lg font-semibold hover:bg-sky-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Berekenen...
                </>
              ) : (
                <>
                  <Calculator className="h-5 w-5" />
                  Bereken mijn ritprijs
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results & Map */}
      <div className="space-y-6">
        {quote ? (
          <>
            <QuoteResult quote={quote} error={error} />
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <RouteMapPreview
                  origin={formState.origin}
                  destination={formState.destination}
                  stopovers={formState.stopovers.filter((s): s is Location => s !== null)}
                  geometry={quote.geometry}
                />
              </div>
            </Card>
          </>
        ) : error ? (
          <QuoteResult quote={null} error={error} />
        ) : (
          <>
            {/* <QuoteSkeleton />
            <MapSkeleton /> */}
          </>
        )}
      </div>
    </div>
  )
}
