import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BUSINESS_SERVICES } from '@/components/business-section'
import ContactSection from '@/components/contact-section'
import { PhoneLink } from '@/components/contact-links'
import FaqSection from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { PageHero } from '@/components/page-hero'
import { ReviewsSection } from '@/components/reviews-section'
import { SectionHeading } from '@/components/section-heading'
import { businessFaq } from '@/lib/config/faq-data'
import { LOCATIONS } from '@/lib/config/locations'
import { SITE } from '@/lib/config/site'
import { getServiceSchema } from '@/lib/config/structured-data'
import { pageMetadata } from '@/lib/seo'

const description =
  'Zakelijk taxivervoer in Ede, Wageningen en omgeving. Rijden op rekening met maandfactuur, luchthaventransfers en vervoer van gasten. 24/7.'

const accountMailto = `mailto:${SITE.email}?subject=${encodeURIComponent('Zakelijk account aanvragen')}`

const steps = [
  { title: 'Neem contact op', description: 'Bel of mail ons met uw bedrijfsgegevens.' },
  {
    title: 'Wij maken afspraken',
    description: 'Over de werkwijze, de facturatie en eventuele vaste ritten.',
  },
  {
    title: 'Rijden op rekening',
    description:
      'Uw medewerkers en gasten reserveren via telefoon, WhatsApp of e-mail. U ontvangt maandelijks één factuur met ritoverzicht.',
  },
]

export const metadata = pageMetadata({
  title: 'Zakelijk taxivervoer in Ede en Wageningen',
  description,
  path: '/zakelijk-vervoer',
})

function AccountCard() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <p className="mb-2 text-lg font-semibold">Zakelijk account aanvragen</p>
      <p className="mb-4 text-sm text-muted-foreground">
        Mail ons uw bedrijfsgegevens of bel ons. Wij nemen snel contact met u op.
      </p>
      <Button variant="cta" size="lg" className="w-full" asChild>
        <a href={accountMailto}>
          <Mail aria-hidden="true" />
          Mail {SITE.email}
        </a>
      </Button>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        of bel{' '}
        <PhoneLink cta="business-card" className="font-semibold text-primary hover:underline" />
      </p>
    </div>
  )
}

export default function BusinessPage() {
  return (
    <main id="main">
      <JsonLd
        data={getServiceSchema({
          name: 'Zakelijk taxivervoer',
          description,
          path: '/zakelijk-vervoer',
          areaServed: LOCATIONS.map((location) => location.name),
        })}
      />

      <PageHero
        breadcrumbs={[{ name: 'Zakelijk vervoer', path: '/zakelijk-vervoer' }]}
        title="Zakelijk taxivervoer in Ede, Wageningen en omgeving"
        lead="Voor bedrijven, instellingen en Wageningen University & Research. Rijden op rekening, met één maandfactuur en een overzicht van alle ritten."
        cta="business"
        whatsappMessage="business"
        highlights={[
          'Rijden op rekening',
          'Maandelijkse factuur met ritoverzicht',
          'Vaste prijzen naar Schiphol en andere luchthavens',
          'Dag en nacht beschikbaar',
        ]}
        aside={<AccountCard />}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Vervoer voor uw organisatie"
            description="Van een rit naar een afspraak tot het ophalen van gasten op Schiphol."
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
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Zo werkt rijden op rekening" />
          <ol className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Card className="h-full border-0 text-center shadow-sm">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <h3 className="mb-2 font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ReviewsSection />

      <FaqSection
        items={businessFaq}
        title="Veelgestelde vragen over zakelijk vervoer"
        description="Over rijden op rekening, facturatie en vervoer van gasten."
      />

      <ContactSection whatsappMessage="business" />
    </main>
  )
}
