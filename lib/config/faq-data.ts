/**
 * FAQ content, written to match how people ask questions in search engines,
 * voice search and AI assistants (AEO).
 *
 * Prices and contact details are read from the config files, so the answers
 * never drift from the tariff tables. Each list is used for both the visible
 * FAQ and the FAQPage structured data on the same page.
 */
import { PRICING_CONFIG } from '@/lib/config/pricing'
import { AIRPORT_WAITING, AIRPORTS, getFareRegion } from '@/lib/config/airport-fares'
import { formatRoutePrice, getRoute } from '@/lib/config/route-examples'
import { SITE } from '@/lib/config/site'
import { formatPrice } from '@/lib/services/pricing'

export interface FAQItem {
  question: string
  answer: string
}

const { standaard, groot } = PRICING_CONFIG

/** Closing sentence of the price answers: points to the calculator when enabled, otherwise to a call. */
export const ownRidePriceSentence = SITE.features.priceCalculator
  ? 'Met de ritprijscalculator op onze website ziet u direct de prijs van uw eigen rit.'
  : `Wilt u de prijs van uw eigen rit weten? Bel ons op ${SITE.phone.display} of stuur een WhatsApp.`
const rijnvallei = getFareRegion('rijnvallei')
const schiphol = rijnvallei.fares.schiphol!

export const meterRatesSentence = `${formatPrice(standaard.baseFeeCents)} instaptarief, ${formatPrice(standaard.perKmCents)} per kilometer en ${formatPrice(standaard.perMinCents)} per minuut (1–4 personen)`

const hour = (h: number) => `${String(h).padStart(2, '0')}:00`

export const nightSurchargeSentence = `Tussen ${hour(PRICING_CONFIG.nightStartHour)} en ${hour(PRICING_CONFIG.nightEndHour)} uur geldt een nachttoeslag van ${PRICING_CONFIG.nightSurchargePercent}%.`

export function schipholFareAnswer(from: string, regionId: string): string {
  const fare = getFareRegion(regionId).fares.schiphol!
  return `Vanuit ${from} rijdt u voor een vaste prijs van €${fare.dropOff} naar Schiphol. Ophalen op Schiphol kost €${fare.pickUp} en een retourrit €${fare.roundTrip}. De prijs geldt voor 1–4 personen bij reservering minimaal 24 uur van tevoren. Bij ophalen wachten wij ${AIRPORT_WAITING.freeMinutes} minuten gratis.`
}

export const faqData: FAQItem[] = [
  {
    question: 'Wat kost een taxi van Ede naar Schiphol?',
    answer: `Een taxi van Ede naar Schiphol kost bij Taxi Rijnvallei een vaste prijs van €${schiphol.dropOff}. Ophalen op Schiphol kost €${schiphol.pickUp} en een retourrit €${schiphol.roundTrip}. Dezelfde prijzen gelden vanuit Wageningen, Bennekom en Veenendaal, voor 1–4 personen bij reservering minimaal 24 uur van tevoren. Bij ophalen wachten wij ${AIRPORT_WAITING.freeMinutes} minuten gratis.`,
  },
  {
    question: 'Hoe kan ik een taxi reserveren bij Taxi Rijnvallei?',
    answer: `${SITE.features.priceCalculator ? 'U kunt op vier manieren reserveren' : 'U kunt op drie manieren reserveren'}: 1) bel ons 24/7 op ${SITE.phone.display}, 2) stuur een WhatsApp naar ${SITE.mobile.display}, ${SITE.features.priceCalculator ? '3) bereken uw ritprijs online en vraag direct een reservering aan, of 4) gebruik het contactformulier op de website' : 'of 3) gebruik het contactformulier op de website'}. Voor luchthavenritten adviseren wij minimaal 24 uur van tevoren te reserveren.`,
  },
  {
    question: 'Is Taxi Rijnvallei 24 uur per dag bereikbaar?',
    answer: `Ja, Taxi Rijnvallei is 24 uur per dag, 7 dagen per week bereikbaar. Ook in de nacht, op feestdagen en in het weekend kunt u bij ons terecht. ${nightSurchargeSentence}`,
  },
  {
    question: 'In welke plaatsen rijdt Taxi Rijnvallei?',
    answer:
      'Taxi Rijnvallei is gevestigd in Ede en Wageningen en rijdt in de hele regio: Ede, Wageningen, Bennekom, Veenendaal, Lunteren, Barneveld, Rhenen, Renkum en omgeving. Wij verzorgen ook ritten naar luchthavens en andere bestemmingen in heel Nederland.',
  },
  {
    question: 'Wat kost een taxi in Ede en Wageningen?',
    answer: `Ritten in de regio rijden wij op het taximetertarief: ${meterRatesSentence}. Een rit van Bennekom naar station Ede-Wageningen kost daarmee ${formatRoutePrice(getRoute('bennekom-station'))} en van Wageningen Campus naar station Ede-Wageningen ${formatRoutePrice(getRoute('wur-station'))}. ${ownRidePriceSentence}`,
  },
  {
    question: 'Kan ik met meer dan 4 personen een taxi boeken?',
    answer: `Ja, bij Taxi Rijnvallei kunt u terecht voor groepen tot 8 personen. Wij hebben standaard taxi's (1–4 personen) en grote taxi's (5–8 personen). Voor de grote taxi geldt een ander tarief: ${formatPrice(groot.baseFeeCents)} instaptarief, ${formatPrice(groot.perKmCents)} per kilometer en ${formatPrice(groot.perMinCents)} per minuut. Vermeld bij uw reservering altijd het aantal passagiers.`,
  },
  {
    question: 'Kan ik betalen met pinpas of creditcard?',
    answer:
      'Ja, bij Taxi Rijnvallei kunt u betalen met contant geld, pinpas en creditcard. Zakelijke klanten kunnen ook op rekening rijden met facturatie achteraf.',
  },
  {
    question: 'Hoe vroeg moet ik een taxi naar Schiphol reserveren?',
    answer:
      'Voor ritten naar Schiphol adviseren wij minimaal 24 uur van tevoren te reserveren; de vaste luchthavenprijzen gelden ook bij reservering minimaal 24 uur vooraf. Voor vroege ochtendvluchten (voor 06:00 uur) raden wij aan om minimaal 48 uur van tevoren te boeken. Last-minute reserveringen zijn vaak mogelijk, maar niet gegarandeerd.',
  },
  {
    question: 'Biedt Taxi Rijnvallei zakelijk vervoer aan?',
    answer:
      'Ja, Taxi Rijnvallei verzorgt zakelijk vervoer voor bedrijven en instellingen: zakelijke ritten, luchthaventransfers en vervoer van gasten en medewerkers. Zakelijke klanten kunnen op rekening rijden en ontvangen een maandelijkse factuur met ritoverzicht.',
  },
  {
    question: 'Wat als mijn vlucht vertraging heeft?',
    answer: `Bij luchthavenritten volgen wij uw vlucht. Heeft uw vlucht vertraging, dan passen wij de ophaaltijd aan, zonder extra kosten. Bij ophalen wachten wij bovendien ${AIRPORT_WAITING.freeMinutes} minuten gratis. Vragen? Bel ons op ${SITE.phone.display}.`,
  },
]

const otherAirports = AIRPORTS.filter((airport) => airport.id !== 'schiphol')
  .map((airport) => `${airport.name} €${rijnvallei.fares[airport.id]!.dropOff}`)
  .join(', ')

export const airportFaq: FAQItem[] = [
  {
    question: 'Wat kost een taxi naar Schiphol?',
    answer: `Vanuit Ede, Wageningen, Bennekom en Veenendaal kost een taxi naar Schiphol een vaste prijs van €${schiphol.dropOff}. Vanuit Barneveld, Lunteren en omgeving is dat €${getFareRegion('gelderse-vallei').fares.schiphol!.dropOff}. De prijzen gelden per taxi voor 1–4 personen, inclusief 9% btw, bij reservering minimaal 24 uur van tevoren.`,
  },
  {
    question: 'Wat kost een taxi van Schiphol naar huis?',
    answer: `Ophalen op Schiphol kost €${schiphol.pickUp} naar Ede, Wageningen, Bennekom of Veenendaal. Daarbij zijn ${AIRPORT_WAITING.freeMinutes} minuten wachttijd inbegrepen en betaalt u niets extra als uw vlucht vertraagd is. Een retourrit (wegbrengen en ophalen) kost €${schiphol.roundTrip}.`,
  },
  {
    question: 'Waar word ik opgehaald op Schiphol?',
    answer:
      'Zet na de landing uw telefoon aan. Ongeveer 10 minuten na de landing belt de chauffeur u met de precieze ophaallocatie. Uw taxi haalt u op bij vertrekhal 1, 2 of 3 op de 2e verdieping, dus niet bij de aankomsthallen.',
  },
  {
    question: 'Wat gebeurt er als mijn vlucht vertraagd is?',
    answer: `Wij volgen uw vlucht en passen de ophaaltijd aan, zonder extra kosten. Na de landing wachten wij ${AIRPORT_WAITING.freeMinutes} minuten gratis. Daarna rekenen wij ${formatPrice(AIRPORT_WAITING.per15MinutesCents)} per 15 minuten.`,
  },
  {
    question: 'Rijden jullie ook naar andere luchthavens?',
    answer: `Ja. Vanuit Ede, Wageningen, Bennekom en Veenendaal gelden vaste prijzen naar ${otherAirports}. Voor overige bestemmingen maken wij graag een offerte op maat.`,
  },
  {
    question: 'Kan ik met meer dan 4 personen naar Schiphol?',
    answer:
      'Ja, met een grote taxi voor 5–8 personen. Voor de grote taxi gelden afwijkende tarieven; neem contact met ons op voor een offerte.',
  },
]

export const businessFaq: FAQItem[] = [
  {
    question: 'Kan mijn bedrijf op rekening rijden?',
    answer:
      'Ja. Zakelijke klanten kunnen op rekening rijden. U ontvangt maandelijks één factuur met een overzicht van alle ritten.',
  },
  {
    question: 'Hoe vraag ik een zakelijk account aan?',
    answer: `Bel ons op ${SITE.phone.display} of mail naar ${SITE.email} met uw bedrijfsgegevens. Wij maken afspraken over de werkwijze en de facturatie.`,
  },
  {
    question: 'Kunnen jullie gasten of medewerkers ophalen van Schiphol of het station?',
    answer: `Ja. Wij halen gasten en medewerkers op van Schiphol, andere luchthavens en stations zoals Ede-Wageningen. Voor luchthavenritten gelden vaste prijzen, bijvoorbeeld €${schiphol.pickUp} voor ophalen op Schiphol naar Ede of Wageningen.`,
  },
  {
    question: 'Rijden jullie voor Wageningen University & Research?',
    answer:
      'Ja. Wij verzorgen vervoer van en naar Wageningen Campus voor medewerkers, gasten en studenten. Afdelingen en onderzoeksgroepen kunnen op rekening rijden.',
  },
  {
    question: 'Kunnen jullie groepen vervoeren?',
    answer:
      'Ja, met een grote taxi voor 5–8 personen, bijvoorbeeld voor zakelijke bijeenkomsten en evenementen.',
  },
]
