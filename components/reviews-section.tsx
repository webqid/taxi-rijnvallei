import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/section-heading'
import { GOOGLE_RATING, REVIEWS, type Review } from '@/lib/config/reviews'
import { googleProfileUrl } from '@/lib/config/site'
import { cn } from '@/lib/utils'

const monthFormat = new Intl.DateTimeFormat('nl-NL', { month: 'long', year: 'numeric', timeZone: 'UTC' })

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn('flex gap-0.5', className)} role="img" aria-label={`${rating} van 5 sterren`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          aria-hidden="true"
          className={cn(
            'size-5',
            star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40',
          )}
        />
      ))}
    </span>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm">
      {review.rating && <Stars rating={review.rating} className="mb-4" />}
      <blockquote className="flex-1 text-pretty">“{review.text}”</blockquote>
      <figcaption className="mt-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{review.author}</span>
        {review.date && <> · {monthFormat.format(new Date(`${review.date}-01T12:00:00Z`))}</>} · Google
      </figcaption>
    </figure>
  )
}

function ReviewActions({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col justify-center gap-3 sm:flex-row', className)}>
      {/* /review redirects to the Google review form: one short URL for cards and WhatsApp. */}
      <Button variant="cta" size="lg" asChild>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- route handler, not a page */}
        <a href="/review">Schrijf een review</a>
      </Button>
      <Button variant="outline" size="lg" asChild>
        <a href={googleProfileUrl()} target="_blank" rel="noopener noreferrer">
          Bekijk onze reviews op Google
        </a>
      </Button>
    </div>
  )
}

/**
 * Customer reviews. Shows the reviews from `lib/config/reviews.ts`; while that
 * list is empty, only an invitation to leave a review on Google.
 */
export function ReviewsSection() {
  if (REVIEWS.length === 0) {
    return (
      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center shadow-sm">
            {/* Decorative outline stars: an invitation, not a rating. */}
            <span className="flex justify-center gap-0.5" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="size-5 text-amber-400" />
              ))}
            </span>
            <h2 className="mt-4 text-2xl font-bold text-balance">Reed u met Taxi Rijnvallei?</h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
              Laat een review achter op Google. Daarmee helpt u andere reizigers bij het kiezen van een
              betrouwbare taxi, en ons om nog beter te worden.
            </p>
            <ReviewActions className="mt-6" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="reviews" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Wat klanten over ons zeggen"
          description={
            GOOGLE_RATING ? (
              <span className="inline-flex flex-wrap items-center justify-center gap-2">
                <Stars rating={GOOGLE_RATING.value} />
                <span>
                  <strong className="text-foreground">{GOOGLE_RATING.value.toLocaleString('nl-NL')}</strong>{' '}
                  uit 5 op Google, op basis van {GOOGLE_RATING.count} reviews
                </span>
              </span>
            ) : (
              'Ervaringen van klanten op Google.'
            )
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.author} review={review} />
          ))}
        </div>
        <ReviewActions className="mt-10" />
      </div>
    </section>
  )
}
