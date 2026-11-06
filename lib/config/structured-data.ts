import { HOW_IT_WORKS_STEPS } from '@/components/how-it-works'
import { AIRPORTS, getFareRegion } from '@/lib/config/airport-fares'
import type { FAQItem } from '@/lib/config/faq-data'
import { LOCATIONS } from '@/lib/config/locations'
import { SITE } from '@/lib/config/site'

/**
 * Structured data (JSON-LD) for search engines and AI assistants.
 *
 * The organisation is described once in the root layout. Pages add the schemas
 * for what they actually show (FAQ, breadcrumbs, services), so every piece of
 * markup matches visible content.
 *
 * There is deliberately no `aggregateRating`: Google does not allow ratings that
 * are not collected on this site, and self-serving ratings for a LocalBusiness
 * are not eligible for review stars anyway.
 */

const ORGANIZATION_ID = `${SITE.url}/#organization`
const [ede, wageningen] = SITE.addresses

const absoluteUrl = (path: string) => (path === '/' ? SITE.url : `${SITE.url}${path}`)

const organizationRef = { '@type': 'TaxiService', '@id': ORGANIZATION_ID, name: SITE.name }

/** TaxiService / LocalBusiness, rendered once in the root layout. */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TaxiService', 'LocalBusiness'],
    '@id': ORGANIZATION_ID,
    name: SITE.name,
    description:
      'Taxi Rijnvallei is een taxibedrijf in Ede en Wageningen. Wij rijden 24/7 in de regio, met vaste prijzen naar Schiphol en andere luchthavens, en verzorgen zakelijk en particulier vervoer.',
    url: SITE.url,
    logo: `${SITE.url}/logo.jpeg`,
    image: `${SITE.url}/logo.jpeg`,
    telephone: SITE.phone.e164,
    email: SITE.email,
    // Keep this address identical to the Google Business Profile (NAP consistency).
    address: { '@type': 'PostalAddress', ...wageningen, addressCountry: 'NL' },
    location: [ede, wageningen].map((address) => ({
      '@type': 'Place',
      address: { '@type': 'PostalAddress', ...address, addressCountry: 'NL' },
    })),
    // Tarthorst 64, Wageningen
    geo: { '@type': 'GeoCoordinates', latitude: 51.9787, longitude: 5.6593 },
    areaServed: [
      ...LOCATIONS.map((location) => ({ '@type': 'City', name: location.name })),
      ...['Rhenen', 'Renkum', 'Oosterbeek'].map((name) => ({ '@type': 'City', name })),
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '€€',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Invoice'],
    currenciesAccepted: 'EUR',
    ...(SITE.googlePlaceId
      ? { sameAs: [`https://www.google.com/maps/place/?q=place_id:${SITE.googlePlaceId}`] }
      : {}),
  }
}

/** FAQPage for the questions shown on the same page. */
export function getFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

/** BreadcrumbList, starting at the home page. */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  const crumbs = [{ name: 'Home', path: '/' }, ...items]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** A service offered on a specific page, such as "Taxi Ede". */
export function getServiceSchema(service: {
  name: string
  description: string
  path: string
  areaServed: string[]
  offers?: { name: string; price: number }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: service.name,
    description: service.description,
    url: absoluteUrl(service.path),
    provider: organizationRef,
    areaServed: service.areaServed.map((name) => ({ '@type': 'City', name })),
    ...(service.offers && {
      offers: service.offers.map((offer) => ({
        '@type': 'Offer',
        name: offer.name,
        price: offer.price.toFixed(2),
        priceCurrency: 'EUR',
      })),
    }),
  }
}

/** Fixed airport fares from one region, as offers. */
export function getAirportOffers(regionId: string, from: string) {
  const region = getFareRegion(regionId)
  return AIRPORTS.flatMap((airport) => {
    const fare = region.fares[airport.id]
    return fare ? [{ name: `Taxi ${from} – ${airport.name} (wegbrengen)`, price: fare.dropOff }] : []
  })
}

/** Booking steps, for the home page (the visible "Zo werkt het" section). */
export function getHowToSchema() {
  const calculate = [
    {
      '@type': 'HowToStep',
      name: 'Bereken uw ritprijs',
      text: 'Vul op de website uw ophaaladres, bestemming, datum en tijd in. Naar de luchthaven ziet u direct de vaste prijs.',
      url: absoluteUrl('/bereken'),
    },
  ]
  const steps = [
    ...(SITE.features.priceCalculator ? calculate : []),
    ...HOW_IT_WORKS_STEPS.map((step) => ({ '@type': 'HowToStep', name: step.title, text: step.description })),
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Hoe boek ik een taxi bij Taxi Rijnvallei?',
    description: 'Stapsgewijze uitleg om een taxi te reserveren bij Taxi Rijnvallei in Ede, Wageningen en omgeving.',
    totalTime: 'PT5M',
    step: steps.map((step, index) => ({ ...step, position: index + 1 })),
  }
}

/** Content that voice assistants may read aloud, for the home page. */
export function getSpeakableSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Taxi Rijnvallei – taxi in Ede, Wageningen en omgeving',
    url: SITE.url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#hero h1', '#hero p', '#faq h2'],
    },
  }
}
