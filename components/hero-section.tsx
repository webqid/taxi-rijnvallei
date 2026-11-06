import { CheckCircle, Star } from 'lucide-react'
import { BookingBox, type QuickDestination } from '@/components/booking-box'
import { AIRPORT_WAITING, lowestDropOffFare } from '@/lib/config/airport-fares'
import { GOOGLE_RATING } from '@/lib/config/reviews'
import { lowestRoutePriceTo } from '@/lib/config/route-examples'

const highlights = [
  `Vaste prijs naar Schiphol, ${AIRPORT_WAITING.freeMinutes} minuten gratis wachttijd bij ophalen`,
  'Dag en nacht bereikbaar, ook in het weekend',
  'Betalen met pin, contant of op factuur',
]

const fromPrice = (destination: string) => `vanaf ca. €${lowestRoutePriceTo(destination)}`

const destinations: QuickDestination[] = [
  { name: 'Schiphol', price: `vanaf €${lowestDropOffFare('schiphol')} · vaste prijs` },
  { name: 'Station Ede-Wageningen', price: fromPrice('Station Ede-Wageningen') },
  { name: 'Ziekenhuis Gelderse Vallei', price: fromPrice('Ziekenhuis Gelderse Vallei') },
  { name: 'Wageningen Campus (WUR)', price: fromPrice('Wageningen Campus (WUR)') },
]

/** Home page hero: the booking box first, like a ride app, without the weight of one. */
export default function HeroSection() {
  return (
    <section id="hero" className="bg-linear-to-br from-primary/5 to-secondary/5 py-6 lg:py-16">
      <div className="container mx-auto grid items-center gap-6 px-4 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16">
        {/* On phones the booking box sits right under the heading, on the first screen. */}
        <div className="space-y-3 sm:space-y-6">
          <p className="hidden text-sm font-semibold tracking-wide text-sky-700 uppercase sm:block">
            Taxi Rijnvallei · 24/7 bereikbaar
          </p>
          <h1 className="text-3xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Uw taxi in Ede, Wageningen en omgeving
          </h1>
          <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg lg:text-xl">
            Vaste tarieven, professionele chauffeurs, dag en nacht bereikbaar.
            <span className="hidden sm:inline">
              {' '}
              Kies uw bestemming en stuur uw rit in één keer via WhatsApp, of bel ons.
            </span>
          </p>
          <ul className="hidden space-y-2 sm:block">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-5 shrink-0 text-emerald-700" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          {GOOGLE_RATING && (
            <a href="#reviews" className="inline-flex items-center gap-1.5 text-sm">
              <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span>
                <strong>{GOOGLE_RATING.value.toLocaleString('nl-NL')}</strong> op Google ({GOOGLE_RATING.count}{' '}
                reviews)
              </span>
            </a>
          )}
        </div>

        <BookingBox
          destinations={destinations}
          priceNote="Prijsindicatie overdag voor 1–4 personen. Naar Schiphol een vaste prijs bij reservering minimaal 24 uur vooraf."
        />
      </div>
    </section>
  )
}
