import { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { BookingWidget } from '@/components/booking'

export const metadata: Metadata = {
  title: 'Ritprijs Berekenen',
  description:
    'Bereken direct de prijs voor uw taxirit. Vul uw ophaaladres en bestemming in en ontvang een transparante prijsopbouw.',
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-3xl font-bold lg:text-4xl">Ritprijs Berekenen</h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Voer uw ophaaladres en bestemming in en ontvang direct een
                transparante prijsindicatie voor uw taxirit.
              </p>
            </div>
            <BookingWidget />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
