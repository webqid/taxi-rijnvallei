import { AIRPORT_SERVICES, PickupSteps } from '@/components/airport-section'
import { AirportFareConditions, AirportFareRegions, SchipholFareCard } from '@/components/airport-fares'
import ContactSection from '@/components/contact-section'
import FaqSection from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { SCHIPHOL_PHOTO } from '@/components/location-photos'
import { PageHero } from '@/components/page-hero'
import { PhotoFrame } from '@/components/photo-frame'
import { ReviewsSection } from '@/components/reviews-section'
import { SectionHeading } from '@/components/section-heading'
import { AIRPORT_WAITING, formatPlaceList, getFareRegion } from '@/lib/config/airport-fares'
import { airportFaq } from '@/lib/config/faq-data'
import { getAirportOffers, getServiceSchema } from '@/lib/config/structured-data'
import { formatPrice } from '@/lib/services/pricing'
import { pageMetadata } from '@/lib/seo'

const region = getFareRegion('rijnvallei')
const schiphol = region.fares.schiphol!
const description = `Taxi naar Schiphol vanuit Ede, Wageningen, Bennekom of Veenendaal: vaste prijs €${schiphol.dropOff}. Ophalen €${schiphol.pickUp}, incl. ${AIRPORT_WAITING.freeMinutes} min gratis wachttijd. 24/7 reserveren.`

export const metadata = pageMetadata({
  title: `Taxi naar Schiphol vanaf €${schiphol.dropOff} – vaste prijs`,
  description,
  path: '/taxi-schiphol',
})

export default function AirportPage() {
  return (
    <main id="main">
      <JsonLd
        data={getServiceSchema({
          name: 'Taxi naar Schiphol en andere luchthavens',
          description,
          path: '/taxi-schiphol',
          areaServed: [...region.places],
          offers: getAirportOffers(region.id, formatPlaceList(region.places)),
        })}
      />

      <PageHero
        breadcrumbs={[{ name: 'Taxi naar Schiphol', path: '/taxi-schiphol' }]}
        title="Taxi naar Schiphol voor een vaste prijs"
        lead={`Vanuit Ede, Wageningen, Bennekom en Veenendaal rijdt u voor €${schiphol.dropOff} naar Schiphol. Ophalen kost €${schiphol.pickUp}, inclusief ${AIRPORT_WAITING.freeMinutes} minuten gratis wachttijd.`}
        cta="airport"
        whatsappMessage="airport"
        highlights={[
          'Vaste prijs, vooraf bekend',
          `${AIRPORT_WAITING.freeMinutes} minuten gratis wachttijd bij ophalen`,
          'Vlucht vertraagd? Geen extra kosten',
          'Ook naar Eindhoven, Rotterdam, Weeze, Maastricht en Brussel',
        ]}
        aside={<SchipholFareCard regionId={region.id} />}
      />

      <div className="container mx-auto px-4 pt-8 lg:pt-10">
        <PhotoFrame
          photo={SCHIPHOL_PHOTO}
          className="aspect-video rounded-2xl sm:aspect-21/9"
          sizes="(min-width: 1280px) 1216px, 100vw"
        />
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Vaste prijzen naar de luchthaven"
            description="Kies uw woonplaats voor de prijzen naar Schiphol en de andere luchthavens."
          />
          <div className="mx-auto max-w-4xl">
            <AirportFareRegions />
            <AirportFareConditions className="mt-4" />
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Ontspannen op reis"
            description={`Bij ophalen wachten wij ${AIRPORT_WAITING.freeMinutes} minuten gratis. Wij volgen uw vlucht, dus bij vertraging past de chauffeur de ophaaltijd aan, zonder extra kosten. Daarna rekenen wij ${formatPrice(AIRPORT_WAITING.per15MinutesCents)} per 15 minuten.`}
          />
          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {AIRPORT_SERVICES.map((service) => (
              <div key={service.title} className="text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <service.icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mb-1 font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
          <PickupSteps />
        </div>
      </section>

      <ReviewsSection />

      <FaqSection
        items={airportFaq}
        title="Veelgestelde vragen over taxi naar Schiphol"
        description="Alles over prijzen, wachttijd en ophalen op de luchthaven."
      />

      <ContactSection whatsappMessage="airport" />
    </main>
  )
}
