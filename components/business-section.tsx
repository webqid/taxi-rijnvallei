import Link from 'next/link'
import { ArrowRight, Building2, FileText, GraduationCap, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/section-heading'

export const BUSINESS_SERVICES = [
  {
    icon: Building2,
    title: 'Zakelijk vervoer',
    description: 'Professioneel vervoer voor bedrijven en instellingen. Facturatie achteraf mogelijk.',
  },
  {
    icon: FileText,
    title: 'Facturatie op maat',
    description: 'Maandelijkse factuur met ritoverzicht. Geschikt voor bedrijven met regelmatig vervoer.',
  },
  {
    icon: GraduationCap,
    title: 'WUR vervoer',
    description: 'Vervoer van en naar Wageningen University & Research. Voor medewerkers, gasten en studenten.',
  },
  {
    icon: Users,
    title: 'Groepsvervoer',
    description: 'Grotere groepen tot 8 personen. Ideaal voor zakelijke bijeenkomsten en evenementen.',
  },
]

export default function BusinessSection() {
  return (
    <section id="business" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Zakelijk vervoer"
          description="Taxi Rijnvallei werkt samen met bedrijven en instellingen in de regio. Facturatie en vaste afspraken zijn mogelijk."
        />

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {BUSINESS_SERVICES.map((service) => (
            <Card key={service.title} className="border-0 shadow-sm">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <service.icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/zakelijk-vervoer"
            className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:underline"
          >
            Meer over zakelijk vervoer en rijden op rekening
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
