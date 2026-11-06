'use client'

import * as React from 'react'
import { Calendar, CheckCircle, Luggage, MapPin, Navigation, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { trackLead } from '@/lib/analytics'
import { useBookingContext, type BookingData } from '@/lib/context/booking-context'
import { SITE } from '@/lib/config/site'
import { formatDistance, formatDuration, formatPrice } from '@/lib/services/pricing'

const TIME_ZONE = 'Europe/Amsterdam'

const longDateTime = new Intl.DateTimeFormat('nl-NL', {
  timeZone: TIME_ZONE,
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const shortDateTime = new Intl.DateTimeFormat('nl-NL', {
  timeZone: TIME_ZONE,
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

/** Booking details as extra fields, so they appear in the e-mail from Web3Forms. */
function bookingFields(booking: BookingData): Record<string, string> {
  const { quote } = booking
  const fields: Record<string, string> = {
    Van: booking.origin?.label ?? '-',
    Naar: booking.destination?.label ?? '-',
  }
  if (booking.stopovers.length > 0) fields.Via = booking.stopovers.map((s) => s.label).join(' | ')
  if (booking.pickupAt) fields.Ophalen = longDateTime.format(new Date(booking.pickupAt))
  if (booking.returnAt) fields.Retour = longDateTime.format(new Date(booking.returnAt))
  fields.Passagiers = String(booking.passengers)
  fields.Bagage = booking.luggage ? 'Ja, grote bagage' : 'Nee'
  if (quote) {
    fields.Prijs = `${formatPrice(quote.totalCents)} (${quote.pricing === 'fixed' ? 'vaste prijs' : 'indicatie taximeter'})`
    fields.Afstand = `${formatDistance(quote.distanceMeters)}, ca. ${formatDuration(quote.durationSeconds)}`
  }
  return fields
}

function BookingSummary({ booking, onClear }: { booking: BookingData; onClear: () => void }) {
  const { quote } = booking
  if (!quote) return null

  return (
    <Card className="mb-6 border-sky-200 bg-sky-50/50 py-0 dark:border-sky-900 dark:bg-sky-950/30">
      <CardContent className="space-y-3 p-6 text-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold">Uw berekende rit</h4>
            <p className="text-muted-foreground">
              {quote.pricing === 'fixed' ? 'Vaste prijs' : 'Prijsindicatie'}
            </p>
          </div>
          <span className="text-2xl font-bold text-sky-700 tabular-nums">{formatPrice(quote.totalCents)}</span>
        </div>

        <dl className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-green-600" aria-hidden="true" />
            <div>
              <dt className="text-muted-foreground">Van</dt>
              <dd className="font-medium">{booking.origin?.label}</dd>
            </div>
          </div>
          {booking.stopovers.map((stopover, index) => (
            <div key={index} className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-orange-500" aria-hidden="true" />
              <div>
                <dt className="text-muted-foreground">Via</dt>
                <dd className="font-medium">{stopover.label}</dd>
              </div>
            </div>
          ))}
          <div className="flex items-start gap-3">
            <Navigation className="mt-0.5 size-4 shrink-0 text-red-500" aria-hidden="true" />
            <div>
              <dt className="text-muted-foreground">Naar</dt>
              <dd className="font-medium">{booking.destination?.label}</dd>
            </div>
          </div>
          {booking.pickupAt && (
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <div>
                <dt className="text-muted-foreground">{booking.returnAt ? 'Heenreis' : 'Ophalen'}</dt>
                <dd className="font-medium">{shortDateTime.format(new Date(booking.pickupAt))}</dd>
              </div>
            </div>
          )}
          {booking.returnAt && (
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <div>
                <dt className="text-muted-foreground">Retour</dt>
                <dd className="font-medium">{shortDateTime.format(new Date(booking.returnAt))}</dd>
              </div>
            </div>
          )}
        </dl>

        <div className="flex flex-wrap gap-x-6 gap-y-1 border-t pt-3">
          <span className="flex items-center gap-2">
            <Users className="size-4 text-muted-foreground" aria-hidden="true" />
            {booking.passengers} {booking.passengers === 1 ? 'passagier' : 'passagiers'}
          </span>
          <span className="flex items-center gap-2">
            <Luggage className="size-4 text-muted-foreground" aria-hidden="true" />
            {booking.luggage ? 'Grote bagage' : 'Handbagage'}
          </span>
          <span className="text-muted-foreground">
            {formatDistance(quote.distanceMeters)} · {formatDuration(quote.durationSeconds)}
          </span>
        </div>

        <Button type="button" variant="outline" size="sm" onClick={onClear}>
          Andere rit berekenen
        </Button>
      </CardContent>
    </Card>
  )
}

type Status = 'idle' | 'sending' | 'success' | 'error'

/**
 * Contact and reservation form. Submits directly to Web3Forms from the browser.
 * When the visitor calculated a ride on /bereken, its details are included.
 */
export function ContactForm() {
  const { bookingData, clearBookingData } = useBookingContext()
  const [status, setStatus] = React.useState<Status>('idle')
  const [errorMessage, setErrorMessage] = React.useState('')
  const booking = bookingData?.quote ? bookingData : null

  const handleClearBooking = () => {
    clearBookingData()
    document.getElementById('bereken')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    setErrorMessage('')

    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '')
    formData.append('access_key', SITE.web3formsAccessKey)
    formData.append('from_name', `${SITE.name} website`)
    formData.append(
      'subject',
      booking ? `Nieuwe reservering van ${name}` : `Nieuw bericht via taxirijnvallei.nl van ${name}`
    )
    if (booking) {
      for (const [key, value] of Object.entries(bookingFields(booking))) formData.append(key, value)
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const result = await response.json()
      if (!result.success) throw new Error(result.message || 'Verzenden mislukt')

      trackLead(booking ? 'reservation' : 'contact', booking ? { value: booking.quote!.totalCents / 100, currency: 'EUR' } : {})
      form.reset()
      clearBookingData()
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Er is een fout opgetreden. Probeer het later opnieuw.'
      )
    }
  }

  if (status === 'success') {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8 text-center" role="status">
          <CheckCircle className="mx-auto mb-4 size-12 text-emerald-700" aria-hidden="true" />
          <h3 className="mb-2 text-xl font-semibold">Bedankt voor uw aanvraag!</h3>
          <p className="text-muted-foreground">
            Wij nemen zo snel mogelijk contact met u op. Haast? Bel ons op{' '}
            <a href={`tel:${SITE.phone.e164}`} className="font-semibold text-primary">
              {SITE.phone.display}
            </a>
            .
          </p>
          <Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>
            Nog een bericht sturen
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8">
        <h3 className="mb-6 text-xl font-semibold">
          {booking ? 'Vraag uw reservering aan' : 'Stuur ons een bericht'}
        </h3>

        {booking && <BookingSummary booking={booking} onClear={handleClearBooking} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot for Web3Forms spam protection: real visitors never see or tick it. */}
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
                Naam *
              </label>
              <Input id="contact-name" name="name" placeholder="Uw naam" autoComplete="name" required />
            </div>
            <div>
              <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium">
                Telefoon *
              </label>
              <Input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="Uw telefoonnummer"
                autoComplete="tel"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
              E-mail *
            </label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              placeholder="uw.email@voorbeeld.nl"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
              {booking ? 'Opmerkingen' : 'Uw bericht'}
            </label>
            <Textarea
              id="contact-message"
              name="message"
              placeholder={
                booking
                  ? 'Eventuele bijzonderheden, zoals uw vluchtnummer'
                  : 'Waar kunnen wij u mee helpen?'
              }
              rows={4}
            />
          </div>

          {status === 'error' && (
            <p className="text-sm font-medium text-destructive" role="alert">
              {errorMessage}
            </p>
          )}

          <Button type="submit" size="xl" className="w-full" disabled={status === 'sending'}>
            {status === 'sending' ? 'Verzenden...' : booking ? 'Reservering aanvragen' : 'Verstuur aanvraag'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
