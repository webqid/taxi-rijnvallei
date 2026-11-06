import { Car, Clock, CreditCard, Euro, Plane, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AirportFareConditions, AirportFareRegions } from '@/components/airport-fares'
import { PhoneLink } from '@/components/contact-links'
import { SectionHeading } from '@/components/section-heading'
import { AIRPORT_WAITING } from '@/lib/config/airport-fares'
import { PRICING_CONFIG } from '@/lib/config/pricing'
import { formatPrice } from '@/lib/services/pricing'

const WAITING_RATE_PER_HOUR_CENTS = 5720

const meterTariffs = [
  { icon: Car, title: 'Standaard taxi', capacity: '1–4 personen', rates: PRICING_CONFIG.standaard },
  { icon: Users, title: 'Grote taxi', capacity: '5–8 personen', rates: PRICING_CONFIG.groot },
]

const paymentMethods = ['Pinbetaling', 'Contant', 'Creditcard', 'Factuur (bedrijven en instellingen)']

export default function RatesSection() {
  return (
    <section id="rates" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Tarieven"
          description="Transparante prijzen, vooraf bekend. Alle tarieven zijn inclusief 9% btw."
        />

        {/* Taximeter */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meterTariffs.map(({ icon: Icon, title, capacity, rates }) => (
            <Card key={title} className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  {title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{capacity}</p>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  {[
                    ['Instaptarief', rates.baseFeeCents],
                    ['Per kilometer', rates.perKmCents],
                    ['Per minuut', rates.perMinCents],
                  ].map(([label, cents]) => (
                    <div key={label} className="flex justify-between">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-semibold tabular-nums">{formatPrice(Number(cents))}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          ))}

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="size-5 text-primary" aria-hidden="true" />
                Wachttarief
              </CardTitle>
              <p className="text-sm text-muted-foreground">Wanneer u de taxi laat wachten</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per uur</span>
                <span className="font-semibold tabular-nums">{formatPrice(WAITING_RATE_PER_HOUR_CENTS)}</span>
              </div>
              <p className="pt-2 text-xs text-muted-foreground">
                Bij ophalen op de luchthaven: {AIRPORT_WAITING.freeMinutes} min gratis, daarna{' '}
                {formatPrice(AIRPORT_WAITING.per15MinutesCents)} per 15 min
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Airport fares */}
        <div className="mb-12">
          <h3 className="mb-2 flex items-center justify-center gap-2 text-center text-2xl font-bold">
            <Plane className="size-6 text-primary" aria-hidden="true" />
            Luchthaventarieven
          </h3>
          <p className="mb-6 text-center text-muted-foreground">
            Vaste prijzen per vertrekgebied. Kies uw regio voor de tarieven.
          </p>

          <div className="mx-auto max-w-4xl">
            <AirportFareRegions />
            <AirportFareConditions className="mt-4" />
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
            <p className="mb-2 font-semibold">Let op</p>
            <p>
              Prijzen kunnen afwijken van de hier genoemde bedragen, bijvoorbeeld op zaterdag- en
              zondagochtend tussen 1 en 5 uur. Vraag naar de prijs die voor uw reis geldt. Voor overige
              bestemmingen maken wij graag een vrijblijvende offerte. Stuur een bericht of bel{' '}
              <PhoneLink cta="rates" number="mobile" className="font-semibold underline hover:no-underline" />.
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-semibold">
            <CreditCard className="size-5 text-primary" aria-hidden="true" />
            Betaalmethoden
          </h3>
          <ul className="mb-6 flex flex-wrap justify-center gap-3">
            {paymentMethods.map((method) => (
              <li key={method} className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm">
                <Euro className="size-3 text-primary" aria-hidden="true" />
                {method}
              </li>
            ))}
          </ul>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Alle prijzen zijn inclusief 9% btw</p>
            <p>Nacht- en weekendtarieven kunnen afwijken</p>
            <p>Reserveren minimaal 24 uur van tevoren wordt aanbevolen</p>
          </div>
        </div>
      </div>
    </section>
  )
}
