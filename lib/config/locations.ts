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
  /**
   * Fare region for the fixed airport prices (see airport-fares.ts). Leave out
   * for a place without airport prices; the page then shows its route price.
   */
  fareRegionId?: string
  /** <title>, without the " | Taxi Rijnvallei" suffix. */
  title: string
  description: string
  heading: string
  lead: string
  intro: string[]
  destinations: { name: string; description: string }[]
  routes: RouteId[]
  faq: FAQItem[]
}

const price = (id: RouteId) => formatRoutePrice(getRoute(id))
const schipholDropOff = (regionId: string) => getFareRegion(regionId).fares.schiphol!.dropOff

const ede: LocationPage = {
  slug: 'taxi-ede',
  name: 'Ede',
  fareRegionId: 'rijnvallei',
  title: `Taxi Ede – 24/7, Schiphol €${schipholDropOff('rijnvallei')}`,
  description: `Taxi in Ede nodig? Binnen Ede rijdt u voor een vaste prijs van ${price('ede-station')}, naar Schiphol voor €${schipholDropOff('rijnvallei')}. Dag en nacht bereikbaar: bel ${SITE.phone.display}.`,
  heading: 'Taxi in Ede',
  lead: 'Dag en nacht een taxi in Ede: naar station Ede-Wageningen, Ziekenhuis Gelderse Vallei of voor een vaste prijs naar Schiphol.',
  intro: [
    'Taxi Rijnvallei is gevestigd in Ede en Wageningen en rijdt dag en nacht door heel Ede: van het centrum en Veldhuizen tot Kernhem, Rietkampen en Ede-Zuid. Ook in de dorpen van de gemeente Ede, zoals Bennekom, Lunteren, Ederveen, De Klomp, Otterlo en Harskamp, staan wij voor u klaar.',
    `Binnen Ede rijdt u voor een vaste prijs van ${price('ede-station')}. Ook vanuit de dorpen, naar het Kröller-Müller Museum en naar de luchthaven betaalt u een vaste prijs. Zo weet u vooraf waar u aan toe bent. Betalen kan met pin, contant, creditcard of op factuur.`,
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
      name: 'Kröller-Müller Museum',
      description: `In Nationaal Park De Hoge Veluwe bij Otterlo. Vanaf station Ede-Wageningen ${price('station-kroller-muller')}.`,
    },
    {
      name: 'Bedrijven in Ede',
      description: 'Zakelijke ritten voor bedrijven en instellingen, met facturatie achteraf.',
    },
  ],
  routes: [
    'ede-station',
    'ede-ziekenhuis',
    'station-kroller-muller',
    'otterlo-station',
    'harskamp-ede',
    'wekerom-ede',
  ],
  faq: [
    {
      question: 'Wat kost een taxi in Ede?',
      answer: `Binnen Ede rijdt u voor een vaste prijs van ${price('ede-station')}, bijvoorbeeld van het centrum naar station Ede-Wageningen of Ziekenhuis Gelderse Vallei. Vanuit Otterlo naar station Ede-Wageningen kost ${price('otterlo-station')}, vanuit Wekerom naar Ede ${price('wekerom-ede')} en vanuit Harskamp ${price('harskamp-ede')}. Deze vaste prijzen gelden voor een enkele rit. ${ownRidePriceSentence}`,
    },
    {
      question: 'Wat kost een taxi van station Ede-Wageningen naar het Kröller-Müller Museum?',
      answer: `Een taxi van station Ede-Wageningen naar het Kröller-Müller Museum kost een vaste prijs van ${price('station-kroller-muller')} voor een enkele rit. Het museum ligt in Nationaal Park De Hoge Veluwe bij Otterlo, op ongeveer twintig minuten rijden.`,
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
}

const wageningen: LocationPage = {
  slug: 'taxi-wageningen',
  name: 'Wageningen',
  fareRegionId: 'rijnvallei',
  title: `Taxi Wageningen – 24/7, Schiphol €${schipholDropOff('rijnvallei')}`,
  description: `Taxi in Wageningen: van station Ede-Wageningen naar Wageningen ${price('station-wageningen')}, naar Wageningen Campus ${price('station-wur')} en naar Schiphol €${schipholDropOff('rijnvallei')}. Dag en nacht.`,
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
      description: 'Naar Arnhem Centraal, Ziekenhuis Rijnstate of uw afspraak in Arnhem.',
    },
  ],
  routes: ['station-wageningen', 'station-wur'],
  faq: [
    {
      question: 'Wat kost een taxi van station Ede-Wageningen naar Wageningen?',
      answer: `Van station Ede-Wageningen naar Wageningen centrum kost een taxi een vaste prijs van ${price('station-wageningen')}, naar Wageningen Campus ${price('station-wur')}. Deze prijzen gelden voor een enkele rit.`,
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
}

const bennekom: LocationPage = {
  slug: 'taxi-bennekom',
  name: 'Bennekom',
  fareRegionId: 'rijnvallei',
  title: `Taxi Bennekom – 24/7, Schiphol €${schipholDropOff('rijnvallei')}`,
  description: `Taxi in Bennekom: naar station Ede-Wageningen ${price('bennekom-station')} en voor een vaste prijs naar Schiphol (€${schipholDropOff('rijnvallei')}). Dag en nacht bereikbaar.`,
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
      description: 'Naar Arnhem Centraal, Ziekenhuis Rijnstate of uw afspraak in Arnhem.',
    },
  ],
  routes: ['bennekom-station'],
  faq: [
    {
      question: 'Wat kost een taxi van Bennekom naar station Ede-Wageningen?',
      answer: `Een taxi van Bennekom naar station Ede-Wageningen kost ${price('bennekom-station')} voor een enkele rit. De rit duurt ongeveer zeven minuten.`,
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
}

const veenendaal: LocationPage = {
  slug: 'taxi-veenendaal',
  name: 'Veenendaal',
  fareRegionId: 'rijnvallei',
  title: `Taxi Veenendaal – 24/7, Schiphol €${schipholDropOff('rijnvallei')}`,
  description: `Taxi in Veenendaal: naar Ziekenhuis Gelderse Vallei ${price('veenendaal-ziekenhuis')} en voor een vaste prijs naar Schiphol (€${schipholDropOff('rijnvallei')}). Dag en nacht bereikbaar.`,
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
  routes: ['veenendaal-ziekenhuis'],
  faq: [
    {
      question: 'Wat kost een taxi in Veenendaal?',
      answer: `Naar Ziekenhuis Gelderse Vallei rijdt u voor een vaste prijs van ${price('veenendaal-ziekenhuis')} (enkele rit). Andere ritten rijden wij op het taximetertarief: ${meterRatesSentence}. ${ownRidePriceSentence}`,
    },
    {
      question: 'Wat kost een taxi van Veenendaal naar Schiphol?',
      answer: schipholFareAnswer('Veenendaal', 'rijnvallei'),
    },
    {
      question: 'Rijden jullie van Veenendaal naar Ziekenhuis Gelderse Vallei?',
      answer: `Ja. Een enkele rit van Veenendaal centrum naar het ziekenhuis in Ede kost ${price('veenendaal-ziekenhuis')}. Wij halen u na afloop ook weer op, en de chauffeur helpt u desgewenst bij het in- en uitstappen.`,
    },
  ],
}

const lunteren: LocationPage = {
  slug: 'taxi-lunteren',
  name: 'Lunteren',
  fareRegionId: 'gelderse-vallei',
  title: `Taxi Lunteren – 24/7, Schiphol €${schipholDropOff('gelderse-vallei')}`,
  description: `Taxi in Lunteren: naar station Ede-Wageningen ${price('lunteren-station')} en voor een vaste prijs naar Schiphol (€${schipholDropOff('gelderse-vallei')}). Dag en nacht bereikbaar.`,
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
  routes: ['lunteren-station'],
  faq: [
    {
      question: 'Wat kost een taxi in Lunteren?',
      answer: `Een enkele rit van Lunteren naar station Ede-Wageningen kost ${price('lunteren-station')}. Andere ritten rijden wij op het taximetertarief: ${meterRatesSentence}. ${ownRidePriceSentence}`,
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
}

const barneveld: LocationPage = {
  slug: 'taxi-barneveld',
  name: 'Barneveld',
  fareRegionId: 'gelderse-vallei',
  title: `Taxi Barneveld – 24/7, Schiphol €${schipholDropOff('gelderse-vallei')}`,
  description: `Taxi in Barneveld en omgeving: naar Ziekenhuis Gelderse Vallei ${price('barneveld-ziekenhuis')} en voor een vaste prijs naar Schiphol (€${schipholDropOff('gelderse-vallei')}). Dag en nacht bereikbaar.`,
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
      description: `Het ziekenhuis in Ede, voor afspraken en bezoek. Vanuit Barneveld en omgeving ${price('barneveld-ziekenhuis')} (enkele rit).`,
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
  routes: ['barneveld-ziekenhuis'],
  faq: [
    {
      question: 'Wat kost een taxi van Barneveld naar Schiphol?',
      answer: schipholFareAnswer('Barneveld', 'gelderse-vallei'),
    },
    {
      question: 'Wat kost een taxi in Barneveld?',
      answer: `Naar Ziekenhuis Gelderse Vallei in Ede rijdt u vanuit Barneveld en omgeving voor een vaste prijs van ${price('barneveld-ziekenhuis')} (enkele rit). Andere ritten rijden wij op het taximetertarief: ${meterRatesSentence}. ${ownRidePriceSentence}`,
    },
    {
      question: 'Rijden jullie ook in Voorthuizen en Kootwijkerbroek?',
      answer: `Ja. Naar Schiphol rijdt u vanuit Voorthuizen voor €${schipholDropOff('gelderse-vallei')} en vanuit Kootwijkerbroek voor €${schipholDropOff('veluwe')}. Andere ritten rijden wij op het taximetertarief.`,
    },
  ],
}

const arnhem: LocationPage = {
  slug: 'taxi-arnhem',
  name: 'Arnhem',
  title: 'Taxi Arnhem – 24/7, ook naar Rijnstate',
  description: `Taxi naar Arnhem en Ziekenhuis Rijnstate vanuit Ede, Wageningen, Bennekom en Renkum. Vanuit Renkum naar Rijnstate ${price('renkum-rijnstate')}, vaste prijs. Bel ${SITE.phone.display}.`,
  heading: 'Taxi naar Arnhem',
  lead: `Dag en nacht een taxi naar Arnhem: naar Ziekenhuis Rijnstate, station Arnhem Centraal of uw afspraak. Vanuit Renkum naar Rijnstate rijdt u voor een vaste prijs van ${price('renkum-rijnstate')}.`,
  intro: [
    'Taxi Rijnvallei is gevestigd in Ede en Wageningen en rijdt dag en nacht naar Arnhem. Vanuit Ede centrum is Arnhem Centraal ongeveer 18 kilometer en 19 minuten rijden, vanuit Wageningen ongeveer 20 kilometer en 26 minuten en vanuit Bennekom ongeveer 22 kilometer.',
    'Wij brengen u naar uw afspraak bij Ziekenhuis Rijnstate en halen u daarna weer op. Vanuit Renkum rijdt u voor een vaste prijs naar het ziekenhuis; voor andere vertrekplaatsen maken wij graag een prijsopgave. Betalen kan met pin, contant, creditcard of op factuur.',
  ],
  destinations: [
    {
      name: 'Ziekenhuis Rijnstate',
      description: `Voor een afspraak, onderzoek of bezoek. Vanuit Renkum ${price('renkum-rijnstate')} (enkele rit).`,
    },
    {
      name: 'Arnhem Centraal',
      description: 'Het centrale station van Arnhem, voor de intercity en regionale treinen.',
    },
    {
      name: 'Terug naar Ede en Wageningen',
      description: 'Ook voor de terugrit naar Ede, Wageningen, Bennekom en omgeving.',
    },
  ],
  routes: ['renkum-rijnstate'],
  faq: [
    {
      question: 'Wat kost een taxi naar Ziekenhuis Rijnstate in Arnhem?',
      answer: `Vanuit Renkum kost een taxi naar Ziekenhuis Rijnstate een vaste prijs van ${price('renkum-rijnstate')} (enkele rit). Voor andere vertrekplaatsen rijden wij op het taximetertarief: ${meterRatesSentence}. ${ownRidePriceSentence}`,
    },
    {
      question: 'Rijden jullie naar Arnhem?',
      answer:
        'Ja, dag en nacht, vanuit Ede, Wageningen, Bennekom, Renkum en omgeving. Vanuit Ede centrum is Arnhem Centraal ongeveer 18 kilometer (19 minuten) rijden, vanuit Wageningen ongeveer 20 kilometer (26 minuten).',
    },
    {
      question: 'Kan ik een taxi naar Arnhem vooraf reserveren?',
      answer: `Ja. Reserveer via telefoon (${SITE.phone.display}), WhatsApp of het contactformulier, dan staan wij op het afgesproken tijdstip voor de deur. Moet u vroeg in de ochtend in Arnhem zijn, reserveer dan de dag ervoor.`,
    },
  ],
}

/** Order used in navigation and link lists. */
export const LOCATIONS: LocationPage[] = [ede, wageningen, bennekom, veenendaal, lunteren, barneveld, arnhem]

export function getLocation(slug: LocationPage['slug']): LocationPage {
  const location = LOCATIONS.find((l) => l.slug === slug)
  if (!location) throw new Error(`Unknown location page: ${slug}`)
  return location
}

/** Place name → local page, for linking place names in lists. */
export function findLocationByName(name: string): LocationPage | undefined {
  return LOCATIONS.find((l) => l.name.toLowerCase() === name.toLowerCase())
}
