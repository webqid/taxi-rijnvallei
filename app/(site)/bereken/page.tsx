import { BookingWidget } from '@/components/booking'
import { Breadcrumbs } from '@/components/breadcrumbs'
import ContactSection from '@/components/contact-section'
import { QueryProvider } from '@/components/providers/query-provider'
import { BookingProvider } from '@/lib/context/booking-context'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Ritprijs berekenen en reserveren',
  description:
    'Bereken direct de prijs van uw taxirit en vraag uw reservering aan. Naar Schiphol en andere luchthavens ziet u meteen de vaste prijs.',
  path: '/bereken',
})

export default function BookingPage() {
  return (
    <main id="main" className="pt-8 lg:pt-12">
      {/* The providers are only needed here, so other pages don't ship their JavaScript. */}
      <QueryProvider>
        <BookingProvider>
          <div className="container mx-auto px-4">
            <div id="bereken" className="mx-auto max-w-5xl scroll-mt-24">
              <Breadcrumbs items={[{ name: 'Ritprijs berekenen', path: '/bereken' }]} />
              <div className="mt-6 mb-8 text-center">
                <h1 className="mb-4 text-3xl font-bold lg:text-4xl">Ritprijs berekenen en reserveren</h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  Vul uw ophaaladres en bestemming in en zie direct wat uw rit kost. Klik daarna op
                  Reserveren om uw rit aan te vragen.
                </p>
              </div>
              <BookingWidget />
            </div>
          </div>
          <ContactSection />
        </BookingProvider>
      </QueryProvider>
    </main>
  )
}
