import { CalendarCheck, Car, MessageCircle } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { AIRPORT_WAITING } from '@/lib/config/airport-fares'
import { SITE } from '@/lib/config/site'

/** Keep in sync with getHowToSchema() in lib/config/structured-data.ts. */
export const HOW_IT_WORKS_STEPS = [
  {
    icon: MessageCircle,
    title: 'Neem contact op',
    description: `Bel ${SITE.phone.display}, stuur een WhatsApp of gebruik het formulier. Geef uw ophaaladres, bestemming, tijd en aantal personen door.`,
  },
  {
    icon: CalendarCheck,
    title: 'Ontvang de bevestiging',
    description: 'Wij bevestigen de rit en de prijs. Naar de luchthaven betaalt u een vaste prijs.',
  },
  {
    icon: Car,
    title: 'Op tijd opgehaald',
    description: `De chauffeur staat op tijd voor de deur. Op de luchthaven volgen wij uw vlucht en wachten wij ${AIRPORT_WAITING.freeMinutes} minuten gratis.`,
  },
]

export function HowItWorks() {
  return (
    <section id="zo-werkt-het" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Zo werkt het" description="In drie stappen geregeld, dag en nacht." />
        <ol className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4 md:flex-col">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                <step.icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold">
                  <span className="text-muted-foreground">{index + 1}. </span>
                  {step.title}
                </h3>
                <p className="mt-1 text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
