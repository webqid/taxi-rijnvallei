import { faqData } from '@/lib/config/faq-data'

/**
 * Structured Data (JSON-LD) configuration for Answer Engine Optimization
 * Schema.org markup optimized for AI assistants, voice search, and featured snippets
 */

const BUSINESS_INFO = {
  name: 'Taxi Rijnvallei',
  telephone: '+31317844466',
  email: 'info@taxirijnvallei.nl',
  url: 'https://taxirijnvallei.nl',
  address: {
    streetAddress: 'Beekstraat 13',
    addressLocality: 'Wageningen',
    postalCode: '6707 DR',
    addressCountry: 'NL',
  },
  geo: {
    latitude: 51.9692,
    longitude: 5.6654,
  },
}

/**
 * TaxiService / LocalBusiness schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TaxiService', 'LocalBusiness'],
    '@id': 'https://taxirijnvallei.nl/#organization',
    name: BUSINESS_INFO.name,
    alternateName: 'Taxi Rijnvallei Wageningen',
    description:
      'Taxi Rijnvallei is een betrouwbare taxiservice in Wageningen, Ede, Veenendaal en omgeving. Wij bieden 24/7 taxivervoer, luchthaventransfers naar Schiphol, zakelijk vervoer en particulier vervoer.',
    url: BUSINESS_INFO.url,
    telephone: BUSINESS_INFO.telephone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS_INFO.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...BUSINESS_INFO.geo,
    },
    areaServed: [
      { '@type': 'City', name: 'Wageningen', '@id': 'https://www.wikidata.org/wiki/Q9908' },
      { '@type': 'City', name: 'Ede', '@id': 'https://www.wikidata.org/wiki/Q203307' },
      { '@type': 'City', name: 'Veenendaal', '@id': 'https://www.wikidata.org/wiki/Q10049' },
      { '@type': 'City', name: 'Bennekom' },
      { '@type': 'City', name: 'Barneveld' },
      { '@type': 'City', name: 'Rhenen' },
      { '@type': 'City', name: 'Renkum' },
      { '@type': 'City', name: 'Oosterbeek' },
      { '@type': 'City', name: 'Arnhem' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '€€',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Invoice'],
    currenciesAccepted: 'EUR',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Taxidiensten',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Standaard taxi',
            description: 'Taxi voor 1-4 passagiers',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '4.15',
            priceCurrency: 'EUR',
            unitText: 'instaptarief',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Grote taxi',
            description: 'Taxi voor 5-8 passagiers',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '8.44',
            priceCurrency: 'EUR',
            unitText: 'instaptarief',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [],
  }
}

/**
 * FAQPage schema for common taxi questions
 * Optimized for AI assistants and featured snippets
 */
export function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Service schema for individual taxi services
 */
export function getServicesSchema() {
  const services = [
    {
      name: 'Luchthavenvervoer Schiphol',
      description:
        'Taxi van Wageningen, Ede of Veenendaal naar Schiphol Airport. Vaste tarieven, 24/7 beschikbaar. Vluchtmonitoring inbegrepen.',
      serviceType: 'Airport Transfer',
    },
    {
      name: 'Zakelijk vervoer',
      description:
        'Professioneel taxivervoer voor bedrijven in de Rijnvallei. Personeelsvervoer, zakenreizen en gastentransfers. Facturatie op maat.',
      serviceType: 'Business Transportation',
    },
    {
      name: 'Particulier vervoer',
      description:
        'Taxi voor particulieren in Wageningen en omgeving. Van korte ritten tot dagjes uit. Comfortabel en betrouwbaar.',
      serviceType: 'Personal Transportation',
    },
    {
      name: 'Ziekenhuisvervoer',
      description:
        'Vervoer naar ziekenhuizen en medische afspraken. Rustig vervoer met hulp bij in- en uitstappen indien nodig.',
      serviceType: 'Medical Transportation',
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        serviceType: service.serviceType,
        provider: {
          '@type': 'LocalBusiness',
          '@id': 'https://taxirijnvallei.nl/#organization',
          name: BUSINESS_INFO.name,
        },
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: BUSINESS_INFO.geo.latitude,
            longitude: BUSINESS_INFO.geo.longitude,
          },
          geoRadius: '50000',
        },
      },
    })),
  }
}

/**
 * HowTo schema for booking process
 * Helps AI assistants understand the booking flow
 */
export function getHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Hoe boek ik een taxi bij Taxi Rijnvallei?',
    description:
      'Stapsgewijze uitleg om een taxi te reserveren bij Taxi Rijnvallei in Wageningen en omgeving.',
    totalTime: 'PT5M',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Bereken uw ritprijs',
        text: 'Gebruik de online ritprijscalculator op onze website. Vul uw ophaaladres, bestemming, datum en tijd in.',
        url: 'https://taxirijnvallei.nl/bereken',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Controleer de offerte',
        text: 'Bekijk de berekende prijs inclusief kilometerprijs, tijdprijs en eventuele toeslagen zoals nachttoeslag of bagagetoeslag.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Neem contact op',
        text: 'Bel 0317-844466, stuur een WhatsApp naar 06-47145342, of vul het contactformulier in op de website.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Bevestig uw reservering',
        text: 'U ontvangt een bevestiging van uw reservering. Bij luchthavenritten monitoren wij uw vlucht automatisch.',
      },
    ],
  }
}

/**
 * Speakable schema for voice assistants
 * Identifies content that can be read aloud
 */
export function getSpeakableSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Taxi Rijnvallei - Taxiservice Wageningen, Ede, Veenendaal',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#hero h1', '#services h2', '#faq h2', '.speakable'],
    },
    url: 'https://taxirijnvallei.nl',
  }
}

/**
 * BreadcrumbList schema for navigation
 */
export function getBreadcrumbSchema(page = 'home') {
  const breadcrumbs: Record<string, { name: string; url: string }[]> = {
    home: [{ name: 'Home', url: 'https://taxirijnvallei.nl' }],
    bereken: [
      { name: 'Home', url: 'https://taxirijnvallei.nl' },
      { name: 'Ritprijs berekenen', url: 'https://taxirijnvallei.nl/bereken' },
    ],
  }

  const items = breadcrumbs[page] || breadcrumbs.home

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Get all structured data for the page
 * Returns a combined array for the main page
 */
export function getAllStructuredData() {
  return [
    getOrganizationSchema(),
    getFAQSchema(),
    getServicesSchema(),
    getHowToSchema(),
    getSpeakableSchema(),
    getBreadcrumbSchema('home'),
  ]
}
