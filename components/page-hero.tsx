import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CallButton, WhatsAppButton } from '@/components/contact-links'
import { SITE, type WhatsAppMessage } from '@/lib/config/site'

interface PageHeroProps {
  /** Trail after "Home" for the breadcrumbs; the last item is this page. */
  breadcrumbs: { name: string; path: string }[]
  title: ReactNode
  lead: ReactNode
  highlights?: string[]
  /** Identifies this hero in the `data-cta` attributes. */
  cta: string
  whatsappMessage?: WhatsAppMessage
  /** Card on the right, for example the fixed price to Schiphol. */
  aside?: ReactNode
}

/** Hero for the landing pages: title, the main calls to action and an optional price card. */
export function PageHero({
  breadcrumbs,
  title,
  lead,
  highlights = [],
  cta,
  whatsappMessage = 'default',
  aside,
}: PageHeroProps) {
  return (
    <section id="hero" className="bg-linear-to-br from-primary/5 to-secondary/5 py-8 lg:py-14">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
          <div className="space-y-6">
            <h1 className="text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl">{title}</h1>
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground lg:text-xl">{lead}</p>

            {highlights.length > 0 && (
              <ul className="grid gap-2 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-5 shrink-0 text-emerald-700" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <CallButton cta={cta} />
              <WhatsAppButton cta={cta} message={whatsappMessage} />
            </div>
            {SITE.features.priceCalculator && (
              <Link
                href="/bereken"
                className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:underline"
              >
                Of bereken direct uw ritprijs
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            )}
          </div>

          {aside}
        </div>
      </div>
    </section>
  )
}
