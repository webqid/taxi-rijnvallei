import ContactSection from '@/components/contact-section'
import FaqSection from '@/components/faq-section'
import { PageHero } from '@/components/page-hero'
import RatesSection from '@/components/rates-section'
import { RoutePrices } from '@/components/route-prices'
import { lowestDropOffFare } from '@/lib/config/airport-fares'
import { faqData } from '@/lib/config/faq-data'
import { PRICING_CONFIG } from '@/lib/config/pricing'
import { FIXED_PRICE_ROUTES } from '@/lib/config/route-examples'
import { formatPrice } from '@/lib/services/pricing'
import { pageMetadata } from '@/lib/seo'

const PRICE_QUESTIONS = [
  'Wat kost een taxi in Ede en Wageningen?',
  'Wat kost een taxi van Ede naar Schiphol?',
  'Kan ik met meer dan 4 personen een taxi boeken?',
  'Kan ik betalen met pinpas of creditcard?',
]

export const metadata = pageMetadata({
  title: 'Taxi tarieven Ede en Wageningen',
  description: `Taxitarieven van Taxi Rijnvallei: vaste prijzen per route (binnen Ede €25), naar Schiphol vanaf €${lowestDropOffFare('schiphol')} en ${formatPrice(PRICING_CONFIG.standaard.perKmCents)} per km op de taximeter.`,
  path: '/tarieven',
})

export default function RatesPage() {
  return (
    <main id="main">
      <PageHero
        breadcrumbs={[{ name: 'Tarieven', path: '/tarieven' }]}
        title="Taxitarieven in Ede, Wageningen en omgeving"
        lead="Vaste prijzen voor veelgereden ritten en naar de luchthaven, en het taximetertarief voor alle andere ritten. Alle prijzen zijn inclusief 9% btw."
        cta="rates"
      />
      <RoutePrices
        routes={FIXED_PRICE_ROUTES}
        title="Vaste prijzen per route"
        description="Wat een rit kost tussen de plaatsen en bestemmingen in onze regio."
        airport={{ from: 'Ede of Wageningen', regionId: 'rijnvallei' }}
      />
      <RatesSection />
      <FaqSection
        items={faqData.filter((faq) => PRICE_QUESTIONS.includes(faq.question))}
        title="Vragen over prijzen"
        description="Over tarieven, groepen en betalen."
      />
      <ContactSection />
    </main>
  )
}
