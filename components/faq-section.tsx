import { ChevronDown } from 'lucide-react'
import { JsonLd } from '@/components/json-ld'
import { SectionHeading } from '@/components/section-heading'
import { faqData, type FAQItem } from '@/lib/config/faq-data'
import { getFAQSchema } from '@/lib/config/structured-data'

interface FaqSectionProps {
  items?: FAQItem[]
  title?: string
  description?: string
}

/**
 * Frequently asked questions with the matching FAQPage structured data.
 * Native <details> keeps every answer in the HTML (for search engines and AI
 * assistants) and needs no JavaScript.
 */
export default function FaqSection({
  items = faqData,
  title = 'Veelgestelde vragen',
  description = 'Antwoorden op de meest gestelde vragen over onze taxidiensten.',
}: FaqSectionProps) {
  return (
    <section id="faq" className="bg-muted/50 py-20">
      <JsonLd data={getFAQSchema(items)} />
      <div className="container mx-auto px-4">
        <SectionHeading title={title} description={description} />

        {/* Two columns of cards on large screens; items-start so an open answer
            does not stretch the card next to it. */}
        <div className="mx-auto grid max-w-6xl items-start gap-4 lg:grid-cols-2 lg:gap-5">
          {items.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border bg-card shadow-sm transition-shadow open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-open:bg-foreground group-open:text-background">
                  <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                </span>
              </summary>
              <p className="px-6 pb-6 text-base leading-relaxed text-muted-foreground lg:text-lg">{faq.answer}</p>
            </details>
          ))}
        </div>

        <p className="mt-12 text-center text-muted-foreground">
          Staat uw vraag er niet bij?{' '}
          <a href="#contact" className="font-medium text-primary hover:underline">
            Neem contact met ons op
          </a>
        </p>
      </div>
    </section>
  )
}
