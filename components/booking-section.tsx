'use client'

import { BookingWidget } from '@/components/booking'

export default function BookingSection() {
  return (
    <section id="booking" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl text-balance">
            Bereken uw ritprijs
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground text-pretty">
            Vul uw reis in en ontvang direct een transparante prijsindicatie
          </p>
        </div>
        <div className="mx-auto max-w-5xl">
          <BookingWidget />
        </div>
      </div>
    </section>
  )
}
