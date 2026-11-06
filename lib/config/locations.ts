/**
 * Local landing pages (/taxi-ede, /taxi-wageningen, ...).
 *
 * One page per place helps people who search for "taxi ede" land on a page
 * about Ede, both from Google Ads and in the organic results. Each page needs
 * its own text: near-identical pages are treated as duplicates by Google.
 */
import { getFareRegion } from '@/lib/config/airport-fares'
import {
  meterRatesSentence,
  nightSurchargeSentence,
  ownRidePriceSentence,
  schipholFareAnswer,
  type FAQItem,
} from '@/lib/config/faq-data'
import { formatRoutePrice, getRoute, type RouteId } from '@/lib/config/route-examples'
import { SITE } from '@/lib/config/site'

export interface LocationPage {
  slug: `taxi-${string}`
  name: string
  /** Fare region for the fixed airport prices (see airport-fares.ts). */
  fareRegionId: string
  /** <title>, without the " | Taxi Rijnvallei" suffix. */
  title: string
  description: string
  heading: string
  lead: string
  intro: string[]
  destinations: { name: string; description: string }[]
  routes: RouteId[]
  faq: FAQItem[]
  nearby: LocationPage['slug'][]
}

const price = (id: RouteId) => formatRoutePrice(getRoute(id))
const schipholDropOff = (regionId: string) => getFareRegion(regionId).fares.schiphol!.dropOff

const ede: LocationPage = {
  slug: 'taxi-ede',
  name: 'Ede',
  fareRegionId: 'rijnvallei',
  title: `Taxi Ede – 24/7, Schiphol €${schipholDropOff('rijnvallei')}`,
  description: `Taxi in Ede nodig? Taxi Rijnvallei rijdt dag en nacht in Ede. Naar station Ede-Wageningen ${price('ede-station')}, vaste prijs naar Schiphol €${schipholDropOff('rijnvallei')}. Bel ${SITE.phone.display}.`,
  heading: 'Taxi in Ede',
  lead: 'Dag en nacht een taxi in Ede: naar station Ede-Wageningen, Ziekenhuis Gelderse Vallei of voor een vaste prijs naar Schiphol.',
  intro: [
    'Taxi Rijnvallei is gevestigd in Ede en Wageningen en rijdt dag en nacht door heel Ede: van het centrum en Veldhuizen tot Kernhem, Rietkampen en Ede-Zuid. Ook in de dorpen van de gemeente Ede, zoals Bennekom, Lunteren, Ederveen, De Klomp, Otterlo en Harskamp, staan wij voor u klaar.',
    'Ritten binnen Ede rijden wij op het taximetertarief, naar de luchthaven betaalt u een vaste prijs. Zo weet u vooraf waar u aan toe bent. Betalen kan met pin, contant, creditcard of op factuur.',
  ],
  destinations: [
    {
      name: 'Station Ede-Wageningen',
      description: 'Voor de intercity naar Utrecht, Amsterdam en Arnhem. Wij brengen u tot aan de ingang en halen u op na aankomst.',
    },
    {
      name: 'Ziekenhuis Gelderse Vallei',
      description: 'Voor een afspraak, onderzoek of bezoek. De chauffeur helpt u desgewenst bij het in- en uitstappen.',
    },
    {
      name: 'Station Ede Centrum',
      description: 'Voor de Valleilijn richting Lunteren, Barneveld en Amersfoort.',
    },
    {
      name: 'Bedrijven in Ede',
      description: 'Zakelijke ritten voor bedrijven en instellingen, met facturatie achteraf.',
    },
  ],
  routes: ['ede-station', 'ede-ziekenhuis', 'ede-wur', 'ede-veenendaal', 'ede-arnhem'],
  faq: [
    {
      question: 'Wat kost een taxi in Ede?',
      answer: `Binnen Ede rijden wij op het taximetertarief: ${meterRatesSentence}. Een rit van Ede centrum naar station Ede-Wageningen kost daarmee ${price('ede-station')} en naar Ziekenhuis Gelderse Vallei ${price('ede-ziekenhuis')}. ${ownRidePriceSentence}`,
    },
    {
      question: 'Wat kost een taxi van Ede naar Schiphol?',
      answer: schipholFareAnswer('Ede', 'rijnvallei'),
    },
    {
      question: 'Kan ik een taxi bestellen naar station Ede-Wageningen?',
      answer:
        'Ja, wij rijden dag en nacht van en naar station Ede-Wageningen en station Ede Centrum. Moet u een vroege trein halen? Reserveer dan vooraf, dan staan wij op tijd voor de deur.',
    },
    {
      question: 'Rijden jullie ook naar Ziekenhuis Gelderse Vallei?',
      answer:
        'Ja. Wij brengen u naar uw afspraak en halen u na afloop weer op. Heeft u hulp nodig bij het in- en uitstappen, dan helpt de chauffeur u graag.',
    },
    {
      question: "Is er 's nachts een taxi in Ede?",
      answer: `Ja, Taxi Rijnvallei is 24 uur per dag bereikbaar, ook in het weekend en op feestdagen. ${nightSurchargeSentence}`,
    },
  ],
  nearby: ['taxi-bennekom', 'taxi-wageningen', 'taxi-lunteren', 'taxi-veenendaal'],
}

const wageningen: LocationPage = {
  slug: 'taxi-wageningen',
  name: 'Wageningen',
  fareRegionId: 'rijnvallei',
  title: `Taxi Wageningen – 24/7, Schiphol €${schipholDropOff('rijnvallei')}`,
  description: `Taxi in Wageningen nodig? Wij rijden 24/7 naar station Ede-Wageningen (${price('wur-station')} vanaf de Campus) en voor een vaste prijs naar Schiphol (€${schipholDropOff('rijnvallei')}).`,
  heading: 'Taxi in Wageningen',
  lead: 'Uw taxi in Wageningen, dag en nacht: naar station Ede-Wageningen, Wageningen Campus of voor een vaste prijs naar Schiphol.',
  intro: [
    'Taxi Rijnvallei is gevestigd in Wageningen en Ede. Wij rijden dag en nacht voor inwoners, studenten, medewerkers en gasten van Wageningen University & Research. Van het centrum en de Wageningse Berg tot de Campus en Wageningen-Hoog: wij kennen de weg.',
    'Wageningen heeft geen eigen treinstation. Wij brengen u in ongeveer een kwartier naar station Ede-Wageningen voor de intercity naar Utrecht, Amsterdam en Arnhem, of rijden u direct naar uw bestemming.',
  ],
  destinations: [
    {
      name: 'Wageningen Campus (WUR)',
      description: 'Voor medewerkers, studenten en gasten van de universiteit. Zakelijke ritten op rekening zijn mogelijk.',
    },
    {
      name: 'Station Ede-Wageningen',
      description: 'Het dichtstbijzijnde treinstation, op ongeveer tien kilometer van het centrum.',
    },
    {
      name: 'Ziekenhuis Gelderse Vallei',
      description: 'Het ziekenhuis in Ede, voor afspraken en bezoek.',
    },
    {
      name: 'Arnhem',
      description: 'Naar Arnhem Centraal of uw afspraak in Arnhem.',
    },
  ],
  routes: ['wageningen-station', 'wur-station', 'wageningen-ziekenhuis', 'wageningen-bennekom', 'wageningen-arnhem'],
  faq: [
    {
      question: 'Wat kost een taxi van Wageningen naar station Ede-Wageningen?',
      answer: `Vanaf Wageningen centrum kost een taxi naar station Ede-Wageningen ${price('wageningen-station')}, vanaf Wageningen Campus ${price('wur-station')}. Dit is een indicatie op basis van het taximetertarief overdag voor 1–4 personen.`,
    },
    {
      question: 'Wat kost een taxi van Wageningen naar Schiphol?',
      answer: schipholFareAnswer('Wageningen', 'rijnvallei'),
    },
    {
      question: 'Rijden jullie voor Wageningen University & Research?',
      answer:
        'Ja. Wij rijden medewerkers, gasten en studenten van en naar Wageningen Campus. Voor afdelingen en bedrijven is rijden op rekening mogelijk, met een maandelijkse factuur.',
    },
    {
      question: 'Kan ik vroeg in de ochtend een taxi in Wageningen bestellen?',
      answer: `Ja, wij zijn 24/7 bereikbaar. Voor een vroege rit naar het station of Schiphol reserveert u het best vooraf. ${nightSurchargeSentence}`,
    },
  ],
  nearby: ['taxi-bennekom', 'taxi-ede', 'taxi-veenendaal', 'taxi-lunteren'],
}

const bennekom: LocationPage = {
  slug: 'taxi-bennekom',
  name: 'Bennekom',
  fareRegionId: 'rijnvallei',
  title: `Taxi Bennekom – 24/7, Schiphol €${schipholDropOff('rijnvallei')}`,
  description: `Taxi in Bennekom: naar station Ede-Wageningen ${price('bennekom-station')}, naar Wageningen Campus ${price('bennekom-wur')} en voor een vaste prijs naar Schiphol (€${schipholDropOff('rijnvallei')}). Dag en nacht bereikbaar.`,
  heading: 'Taxi in Bennekom',
  lead: `Vanuit Bennekom in een paar minuten bij station Ede-Wageningen (${price('bennekom-station')}) of voor een vaste prijs naar Schiphol.`,
  intro: [
    'Bennekom ligt tussen Ede en Wageningen, op een paar minuten rijden van onze adressen in beide plaatsen. Daardoor staan wij snel bij u voor de deur, of u nu naar het station, het ziekenhuis of de luchthaven moet.',
    'Vanuit Bennekom rijden wij u naar station Ede-Wageningen, Ziekenhuis Gelderse Vallei, Wageningen Campus of uw afspraak in Arnhem. Voor een rit naar Schiphol of een andere luchthaven betaalt u een vaste prijs.',
  ],
  destinations: [
    {
      name: 'Station Ede-Wageningen',
      description: 'Op ongeveer zeven minuten rijden van het centrum van Bennekom.',
    },
    {
      name: 'Ziekenhuis Gelderse Vallei',
      description: 'Voor een afspraak of bezoek. Wij halen u na afloop ook weer op.',
    },
    {
      name: 'Wageningen Campus (WUR)',
      description: 'De universiteit ligt direct naast Bennekom.',
    },
    {
      name: 'Arnhem',
      description: 'Naar Arnhem Centraal of uw afspraak in Arnhem.',
    },
  ],
  routes: ['bennekom-station', 'bennekom-ziekenhuis', 'bennekom-wur', 'bennekom-arnhem'],
  faq: [
    {
      question: 'Wat kost een taxi van Bennekom naar station Ede-Wageningen?',
      answer: `Een taxi van Bennekom naar station Ede-Wageningen kost ${price('bennekom-station')}. Dit is een indicatie op basis van het taximetertarief overdag voor 1–4 personen; de rit duurt ongeveer zeven minuten.`,
    },
    {
      question: 'Wat kost een taxi van Bennekom naar Schiphol?',
      answer: schipholFareAnswer('Bennekom', 'rijnvallei'),
    },
    {
      question: 'Kan ik in Bennekom een taxi bestellen voor een vroege trein?',
      answer:
        'Ja. Wij zijn 24/7 bereikbaar. Reserveer uw rit vooraf via telefoon, WhatsApp of het contactformulier, dan staan wij op het afgesproken tijdstip voor de deur.',
    },
  ],
  nearby: ['taxi-ede', 'taxi-wageningen', 'taxi-veenendaal', 'taxi-lunteren'],
}

const veenendaal: LocationPage = {
  slug: 'taxi-veenendaal',
  name: 'Veenendaal',
  fareRegionId: 'rijnvallei',
  title: `Taxi Veenendaal – 24/7, Schiphol €${schipholDropOff('rijnvallei')}`,
  description: `Taxi in Veenendaal: naar station Veenendaal-De Klomp ${price('veenendaal-de-klomp')}, naar Ziekenhuis Gelderse Vallei ${price('veenendaal-ziekenhuis')} en voor een vaste prijs naar Schiphol (€${schipholDropOff('rijnvallei')}).`,
  heading: 'Taxi in Veenendaal',
  lead: 'Uw taxi in Veenendaal, dag en nacht: naar station Veenendaal-De Klomp, het ziekenhuis in Ede of voor een vaste prijs naar Schiphol.',
  intro: [
    'Taxi Rijnvallei rijdt dag en nacht in Veenendaal. Wij halen u op in het centrum, in Dragonder of in Veenendaal-Oost en brengen u naar het station, het ziekenhuis of uw afspraak.',
    'Veenendaal heeft drie stations. Voor de intercity rijdt u naar station Veenendaal-De Klomp; wij brengen u er vanuit het centrum in ongeveer zeven minuten heen. Voor een rit naar Schiphol of een andere luchthaven betaalt u bij ons een vaste prijs.',
  ],
  destinations: [
    {
      name: 'Station Veenendaal-De Klomp',
      description: 'Het intercitystation van Veenendaal, voor treinen naar Utrecht en Arnhem.',
    },
    {
      name: 'Ziekenhuis Gelderse Vallei',
      description: 'Het ziekenhuis in Ede, op ongeveer tien kilometer van Veenendaal.',
    },
    {
      name: 'Station Ede-Wageningen',
      description: 'Voor wie in Ede wil instappen of uitstappen.',
    },
    {
      name: 'Utrecht',
      description: 'Naar Utrecht Centraal of uw afspraak in Utrecht.',
    },
  ],
  routes: ['veenendaal-de-klomp', 'veenendaal-ziekenhuis', 'veenendaal-station-ede', 'veenendaal-utrecht'],
  faq: [
    {
      question: 'Wat kost een taxi in Veenendaal?',
      answer: `Wij rijden op het taximetertarief: ${meterRatesSentence}. Een rit van Veenendaal centrum naar station Veenendaal-De Klomp kost daarmee ${price('veenendaal-de-klomp')}.`,
    },
    {
      question: 'Wat kost een taxi van Veenendaal naar Schiphol?',
      answer: schipholFareAnswer('Veenendaal', 'rijnvallei'),
    },
    {
      question: 'Rijden jullie van Veenendaal naar Ziekenhuis Gelderse Vallei?',
      answer: `Ja. Een rit van Veenendaal centrum naar het ziekenhuis in Ede kost ${price('veenendaal-ziekenhuis')}. Wij halen u na afloop ook weer op, en de chauffeur helpt u desgewenst bij het in- en uitstappen.`,
    },
  ],
  nearby: ['taxi-ede', 'taxi-wageningen', 'taxi-bennekom', 'taxi-barneveld'],
}

const lunteren: LocationPage = {
  slug: 'taxi-lunteren',
  name: 'Lunteren',
  fareRegionId: 'gelderse-vallei',
  title: `Taxi Lunteren – 24/7, Schiphol €${schipholDropOff('gelderse-vallei')}`,
  description: `Taxi in Lunteren: naar station Ede-Wageningen ${price('lunteren-station')}, naar Barneveld ${price('lunteren-barneveld')} en voor een vaste prijs naar Schiphol (€${schipholDropOff('gelderse-vallei')}). Dag en nacht bereikbaar.`,
  heading: 'Taxi in Lunteren',
  lead: 'Dag en nacht een taxi in Lunteren: naar station Ede-Wageningen, het ziekenhuis in Ede, Barneveld of voor een vaste prijs naar Schiphol.',
  intro: [
    'Lunteren ligt midden in de Gelderse Vallei, in de gemeente Ede. Taxi Rijnvallei rijdt u vanuit Lunteren naar uw bestemming in de regio of daarbuiten, ook vroeg in de ochtend en laat in de avond.',
    'Lunteren heeft een station aan de Valleilijn tussen Ede en Amersfoort. Reist u verder met de intercity, dan rijden wij u in ongeveer een kwartier naar station Ede-Wageningen. Naar Schiphol en andere luchthavens rijdt u voor een vaste prijs.',
  ],
  destinations: [
    {
      name: 'Station Ede-Wageningen',
      description: 'Voor de intercity naar Utrecht, Amsterdam en Arnhem.',
    },
    {
      name: 'Ziekenhuis Gelderse Vallei',
      description: 'Het ziekenhuis in Ede, voor afspraken en bezoek.',
    },
    {
      name: 'Barneveld',
      description: 'Naar het centrum van Barneveld of uw afspraak daar.',
    },
    {
      name: 'Amersfoort',
      description: 'Naar Amersfoort Centraal of uw afspraak in Amersfoort.',
    },
  ],
  routes: ['lunteren-station', 'lunteren-ziekenhuis', 'lunteren-barneveld', 'lunteren-amersfoort'],
  faq: [
    {
      question: 'Wat kost een taxi in Lunteren?',
      answer: `Wij rijden op het taximetertarief: ${meterRatesSentence}. Een rit van Lunteren naar station Ede-Wageningen kost daarmee ${price('lunteren-station')} en naar Barneveld ${price('lunteren-barneveld')}.`,
    },
    {
      question: 'Wat kost een taxi van Lunteren naar Schiphol?',
      answer: schipholFareAnswer('Lunteren', 'gelderse-vallei'),
    },
    {
      question: "Rijden jullie 's nachts in Lunteren?",
      answer: `Ja, Taxi Rijnvallei is 24 uur per dag bereikbaar. ${nightSurchargeSentence}`,
    },
  ],
  nearby: ['taxi-ede', 'taxi-barneveld', 'taxi-bennekom', 'taxi-veenendaal'],
}

const barneveld: LocationPage = {
  slug: 'taxi-barneveld',
  name: 'Barneveld',
  fareRegionId: 'gelderse-vallei',
  title: `Taxi Barneveld – 24/7, Schiphol €${schipholDropOff('gelderse-vallei')}`,
  description: `Taxi in Barneveld en omgeving: naar Lunteren ${price('barneveld-lunteren')}, naar Amersfoort Centraal ${price('barneveld-amersfoort')} en voor een vaste prijs naar Schiphol (€${schipholDropOff('gelderse-vallei')}).`,
  heading: 'Taxi in Barneveld',
  lead: 'Dag en nacht een taxi in Barneveld en omgeving: naar het station, het ziekenhuis of voor een vaste prijs naar Schiphol.',
  intro: [
    'Ook in Barneveld, Voorthuizen en Kootwijkerbroek kunt u op Taxi Rijnvallei rekenen. Wij rijden u naar de stations aan de Valleilijn, naar station Ede-Wageningen voor de intercity of naar uw afspraak in de regio.',
    `Naar Schiphol rijdt u vanuit Barneveld en Voorthuizen voor een vaste prijs van €${schipholDropOff('gelderse-vallei')}. Zo weet u vooraf precies wat de rit kost.`,
  ],
  destinations: [
    {
      name: 'Station Ede-Wageningen',
      description: 'Voor de intercity naar Utrecht, Amsterdam en Arnhem.',
    },
    {
      name: 'Ziekenhuis Gelderse Vallei',
      description: 'Het ziekenhuis in Ede, voor afspraken en bezoek.',
    },
    {
      name: 'Amersfoort',
      description: 'Naar Amersfoort Centraal of uw afspraak in Amersfoort.',
    },
    {
      name: 'Lunteren',
      description: 'Het buurdorp, op ongeveer elf minuten rijden.',
    },
  ],
  routes: ['barneveld-station-ede', 'barneveld-ziekenhuis', 'barneveld-amersfoort', 'barneveld-lunteren'],
  faq: [
    {
      question: 'Wat kost een taxi van Barneveld naar Schiphol?',
      answer: schipholFareAnswer('Barneveld', 'gelderse-vallei'),
    },
    {
      question: 'Wat kost een taxi in Barneveld?',
      answer: `Wij rijden op het taximetertarief: ${meterRatesSentence}. Een rit van Barneveld naar Lunteren kost daarmee ${price('barneveld-lunteren')} en naar station Ede-Wageningen ${price('barneveld-station-ede')}.`,
    },
    {
      question: 'Rijden jullie ook in Voorthuizen en Kootwijkerbroek?',
      answer: `Ja. Naar Schiphol rijdt u vanuit Voorthuizen voor €${schipholDropOff('gelderse-vallei')} en vanuit Kootwijkerbroek voor €${schipholDropOff('veluwe')}. Andere ritten rijden wij op het taximetertarief.`,
    },
  ],
  nearby: ['taxi-lunteren', 'taxi-ede', 'taxi-veenendaal'],
}

/** Order used in navigation and link lists. */
export const LOCATIONS: LocationPage[] = [ede, wageningen, bennekom, veenendaal, lunteren, barneveld]

export function getLocation(slug: LocationPage['slug']): LocationPage {
  const location = LOCATIONS.find((l) => l.slug === slug)
  if (!location) throw new Error(`Unknown location page: ${slug}`)
  return location
}

/** Place name → local page, for linking place names in lists. */
export function findLocationByName(name: string): LocationPage | undefined {
  return LOCATIONS.find((l) => l.name.toLowerCase() === name.toLowerCase())
}
