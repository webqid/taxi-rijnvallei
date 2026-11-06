import Link from 'next/link'
import { Building2, Car, Hospital, MapPin, Plane, Train } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/section-heading'

const services = [
  {
    icon: Car,
    title: 'Particulier vervoer',
    description: 'Vervoer voor korte en langere ritten. Van boodschappen tot een dagje uit.',
  },
  {
    icon: Building2,
    title: 'Zakelijk vervoer',
    description: 'Professioneel vervoer voor bedrijven. Facturatie achteraf mogelijk.',
    href: '/zakelijk-vervoer',
  },
  {
    icon: Plane,
    title: 'Luchthavenvervoer',
    description: 'Vaste tarieven naar Schiphol, Eindhoven, Rotterdam en andere luchthavens.',
    href: '/taxi-schiphol',
  },
  {
    icon: Train,
    title: 'Stationsvervoer',
    description: 'Van en naar stations in de regio, zoals Ede-Wageningen. Altijd op tijd voor uw trein.',
  },
  {
    icon: Hospital,
    title: 'Ziekenhuisvervoer',
    description: 'Vervoer naar ziekenhuizen en afspraken. Rustig en op tijd.',
  },
  {
    icon: MapPin,
    title: 'WUR vervoer',
    description: 'Vervoer van en naar Wageningen Universiteit voor medewerkers en gasten.',
    href: '/taxi-wageningen',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Onze diensten"
          description="Taxi Rijnvallei biedt vervoer voor particulieren en bedrijven. Hieronder een overzicht van onze diensten."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="relative border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <service.icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  {service.href ? (
                    <Link href={service.href} className="after:absolute after:inset-0 hover:underline">
                      {service.title}
                    </Link>
                  ) : (
                    service.title
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
