import Link from 'next/link'
import { ArrowRight, Briefcase, CheckCircle, Clock, Euro, MapPin, Plane, Smile } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { AirportFareTable } from '@/components/airport-fares'
import { PhoneLink } from '@/components/contact-links'
import { SectionHeading } from '@/components/section-heading'
import { AIRPORT_WAITING, formatPlaceList, getFareRegion } from '@/lib/config/airport-fares'
import { formatPrice } from '@/lib/services/pricing'

const benefits = [
  'Vaste prijs per regio, vooraf bekend',
  `${AIRPORT_WAITING.freeMinutes} minuten gratis wachttijd bij ophalen`,
  'Geen extra kosten bij een vertraagde vlucht',
  `Wachttijd daarna: ${formatPrice(AIRPORT_WAITING.per15MinutesCents)} per 15 minuten`,
]

export const PICKUP_STEPS = [
  {
    title: 'Telefoon aan na landing',
    description: 'Zet uw telefoon aan zodra u geland bent.',
  },
  {
    title: 'Chauffeur belt u',
    description:
      'Ongeveer 10 minuten na de landing belt de chauffeur u en geeft de precieze ophaallocatie door.',
  },
  {
    title: 'Ophalen bij de vertrekhal',
    description:
      'Uw taxi haalt u op bij vertrekhal 1, 2 of 3 op de 2e verdieping. Let op: dus niet bij de aankomsthallen!',
  },
]

export const AIRPORT_SERVICES = [
  { icon: Clock, title: 'Altijd stipt op tijd', description: 'Uw taxi staat op tijd op het afgesproken adres.' },
  { icon: Briefcase, title: 'Bagageservice', description: 'De chauffeur draagt uw bagage, ook van bovenverdiepingen.' },
  { icon: Smile, title: 'Hulp bij instappen', description: 'Hulp nodig met in- en uitstappen? Wij helpen u graag.' },
  { icon: MapPin, title: 'Juiste vertrekhal', description: 'Wij zetten u af bij de juiste vertrekhal.' },
]

export function PickupSteps() {
  return (
    <div>
      <h3 className="mb-8 text-center text-2xl font-bold">Hoe vind ik mijn taxi bij aankomst op Schiphol?</h3>
      <ol className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
        {PICKUP_STEPS.map((item, index) => (
          <li key={item.title}>
            <Card className="h-full border-0 text-center shadow-sm">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <h4 className="mb-2 font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Indien nodig bereikt u de chauffeur op{' '}
        <PhoneLink cta="airport-driver" number="mobile" className="font-medium text-primary hover:underline" />
      </p>
    </div>
  )
}

/** Airport fares and pickup service. The pickup steps and extras are on /taxi-schiphol. */
export default function AirportSection() {
  const region = getFareRegion('rijnvallei')

  return (
    <section id="airport" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/10">
          <Plane className="size-7 text-primary" aria-hidden="true" />
        </div>
        <SectionHeading
          title="Luchthavenvervoer voor een vaste prijs"
          description="Ontspannen naar de luchthaven of weer thuis. Wij zorgen dat u op tijd bent, zonder stress."
        />

        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Tarieven vanuit {formatPlaceList(region.places)}</h3>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <AirportFareTable regionId={region.id} />
              </CardContent>
            </Card>
            <p className="mt-4 text-sm text-muted-foreground">
              Prijzen inclusief 9% btw, voor 1–4 personen. Woont u elders?{' '}
              <Link href="/taxi-schiphol" className="font-medium text-primary hover:underline">
                Bekijk alle regio&apos;s
              </Link>
              .
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-semibold">Ophaalservice luchthaven</h3>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
              <Euro className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              Groep van 5–8 personen? Daarvoor gelden afwijkende tarieven; vraag een offerte aan.
            </p>
            <Link
              href="/taxi-schiphol"
              className="mt-8 inline-flex items-center gap-1 font-semibold text-sky-700 hover:underline"
            >
              Alles over taxi naar Schiphol en ophalen op de luchthaven
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
