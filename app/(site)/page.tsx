import AirportSection from '@/components/airport-section'
import ContactSection from '@/components/contact-section'
import FaqSection from '@/components/faq-section'
import HeroSection from '@/components/hero-section'
import { HowItWorks } from '@/components/how-it-works'
import { JsonLd } from '@/components/json-ld'
import LocalSection from '@/components/local-section'
import { ReviewsSection } from '@/components/reviews-section'
import { RoutePrices } from '@/components/route-prices'
import { lowestDropOffFare } from '@/lib/config/airport-fares'
import { HOME_ROUTES } from '@/lib/config/route-examples'
import { SITE } from '@/lib/config/site'
import { getHowToSchema, getSpeakableSchema } from '@/lib/config/structured-data'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Taxi Rijnvallei | Taxi in Ede, Wageningen en omgeving | 24/7',
  absoluteTitle: true,
  description: `Uw taxi in Ede, Wageningen, Bennekom en Veenendaal. Vaste prijs naar Schiphol (€${lowestDropOffFare('schiphol')}), 45 min gratis wachttijd en 24/7 bereikbaar. Bel ${SITE.phone.display}.`,
  path: '/',
})

/**
 * Seven sections, in the order a visitor decides: where to and what it costs,
 * airport fares, what others say, how booking works, where we drive, questions,
 * contact. Rates in detail are on /tarieven, business transport on /zakelijk-vervoer.
 */
export default function Home() {
  return (
    <main id="main">
      <JsonLd data={[getHowToSchema(), getSpeakableSchema()]} />
      <HeroSection />
      <RoutePrices
        routes={HOME_ROUTES}
        title="Populaire ritten en prijzen"
        description="Zo weet u vooraf wat uw rit kost."
        airport={{ from: 'Ede of Wageningen', regionId: 'rijnvallei' }}
      />
      <AirportSection />
      <ReviewsSection />
      <HowItWorks />
      <LocalSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}
