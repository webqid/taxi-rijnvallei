import { googleWriteReviewUrl } from '@/lib/config/site'

/**
 * taxirijnvallei.nl/review → the Google review form of the Business Profile.
 *
 * A short, memorable link for review cards in the taxi, WhatsApp messages and
 * e-mails after a ride. Set `SITE.googlePlaceId` in lib/config/site.ts to send
 * customers straight to the review form instead of Google Maps.
 */
export function GET() {
  return new Response(null, {
    status: 307,
    headers: { Location: googleWriteReviewUrl() },
  })
}
