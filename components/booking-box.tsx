'use client'

import * as React from 'react'
import { CalendarClock, Circle, MessageCircle, Square, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CallButton } from '@/components/contact-links'
import { trackLead } from '@/lib/analytics'
import { whatsappTextHref } from '@/lib/config/site'
import { cn } from '@/lib/utils'

export interface QuickDestination {
  /** Filled in as the destination when the tile is chosen. */
  name: string
  /** "vanaf €150 · vaste prijs" or "vanaf €25". */
  price: string
}

interface BookingBoxProps {
  destinations: QuickDestination[]
  /** Small print under the tiles. */
  priceNote: string
}

const dateTimeFormat = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
})

const fieldIcon = 'pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2'
const fieldInput = 'h-12 rounded-lg bg-muted/60 pl-11 text-base md:text-base'

/**
 * "Waar wilt u naartoe?": pick a destination, fill in the ride and send it as a
 * prefilled WhatsApp message, or call. No address lookup or price calculation,
 * so it needs no API and stays fast. The tiles and prices are server-rendered
 * HTML, readable for search engines.
 */
export function BookingBox({ destinations, priceNote }: BookingBoxProps) {
  const [destination, setDestination] = React.useState('')
  const [when, setWhen] = React.useState<'now' | 'later'>('now')
  const pickupRef = React.useRef<HTMLInputElement>(null)

  const chooseDestination = (name: string) => {
    setDestination(name)
    if (!pickupRef.current?.value) pickupRef.current?.focus()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const at = String(form.get('at') ?? '')
    const moment = when === 'later' && at ? dateTimeFormat.format(new Date(at)) : 'zo snel mogelijk'

    const message = [
      'Hallo Taxi Rijnvallei, ik wil graag een taxi reserveren.',
      '',
      `Ophaaladres: ${String(form.get('pickup') ?? '').trim()}`,
      `Bestemming: ${destination.trim()}`,
      `Wanneer: ${moment}`,
      `Aantal personen: ${form.get('passengers')}`,
    ].join('\n')

    trackLead('whatsapp-booking', { destination: destination.trim() })
    window.open(whatsappTextHref(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <div id="boeken" className="scroll-mt-24 rounded-2xl border bg-card p-5 shadow-xl sm:p-7">
      <h2 className="text-xl font-bold sm:text-2xl">Waar wilt u naartoe?</h2>

      <ul className="mt-4 grid grid-cols-2 gap-2" aria-label="Populaire bestemmingen">
        {destinations.map((item) => {
          const selected = destination === item.name
          return (
            <li key={item.name}>
              <button
                type="button"
                onClick={() => chooseDestination(item.name)}
                aria-pressed={selected}
                className={cn(
                  'h-full w-full rounded-xl border-2 px-3 py-2.5 text-left hover:border-foreground',
                  selected ? 'border-foreground bg-foreground/5' : 'border-border'
                )}
              >
                <span className="block text-sm leading-tight font-semibold">{item.name}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{item.price}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">{priceNote}</p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div className="relative">
          <label htmlFor="booking-pickup" className="sr-only">
            Ophaaladres
          </label>
          <Circle className={cn(fieldIcon, 'fill-foreground')} aria-hidden="true" />
          <Input
            ref={pickupRef}
            id="booking-pickup"
            name="pickup"
            required
            autoComplete="street-address"
            placeholder="Ophaaladres"
            className={cn('border-transparent', fieldInput)}
          />
        </div>
        <div className="relative">
          <label htmlFor="booking-destination" className="sr-only">
            Bestemming
          </label>
          <Square className={cn(fieldIcon, 'fill-foreground')} aria-hidden="true" />
          <Input
            id="booking-destination"
            name="destination"
            required
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="Bestemming"
            className={cn('border-transparent', fieldInput)}
          />
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3">
          <div className="flex rounded-lg bg-muted/60 p-1" role="radiogroup" aria-label="Wanneer">
            {(
              [
                ['now', 'Direct'],
                ['later', 'Later'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={when === value}
                onClick={() => setWhen(value)}
                className={cn(
                  'flex-1 rounded-md px-2 text-sm font-medium transition-colors',
                  when === value ? 'bg-background shadow-sm' : 'text-muted-foreground'
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="relative">
            <label htmlFor="booking-passengers" className="sr-only">
              Aantal personen
            </label>
            <Users className={fieldIcon} aria-hidden="true" />
            <select
              id="booking-passengers"
              name="passengers"
              defaultValue="1"
              className={cn('appearance-none rounded-lg pr-4 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50', fieldInput)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? 'persoon' : 'personen'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {when === 'later' && (
          <div className="relative">
            <label htmlFor="booking-at" className="sr-only">
              Datum en tijd
            </label>
            <CalendarClock className={fieldIcon} aria-hidden="true" />
            <Input id="booking-at" name="at" type="datetime-local" required className={cn('border-transparent', fieldInput)} />
          </div>
        )}

        <Button type="submit" variant="whatsapp" size="xl" className="w-full" data-whatsapp-anchor>
          <MessageCircle aria-hidden="true" />
          Verstuur via WhatsApp
        </Button>
      </form>

      <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        of
        <span className="h-px flex-1 bg-border" />
      </div>
      <CallButton cta="booking-box" variant="outline" className="mt-3 w-full" />
    </div>
  )
}
