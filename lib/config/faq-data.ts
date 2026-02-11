/**
 * FAQ data optimized for Answer Engine Optimization (AEO)
 * Questions are structured to match voice search and AI query patterns
 * 
 * This data is shared between the FAQ component and structured data schema
 */

export interface FAQItem {
  question: string
  answer: string
}

export const faqData: FAQItem[] = [
  {
    question: 'Wat kost een taxi van Ede naar Schiphol?',
    answer:
      'Een taxi van Ede naar Schiphol kost bij Taxi Rijnvallei een vast tarief. De exacte prijs hangt af van het aantal passagiers en eventuele nachttoeslag (tussen 22:00 en 06:00 uur). Gebruik onze online ritprijscalculator voor een directe offerte, of bel ons op 0317-844466 voor een persoonlijke prijsopgave.',
  },
  {
    question: 'Hoe kan ik een taxi reserveren bij Taxi Rijnvallei?',
    answer:
      'U kunt op drie manieren reserveren: 1) Bel ons 24/7 op 0317-844466, 2) Stuur een WhatsApp naar 06-47145342, 3) Gebruik het contactformulier op onze website. Voor luchthavenritten adviseren wij minimaal 24 uur van tevoren te reserveren.',
  },
  {
    question: 'Is Taxi Rijnvallei 24 uur per dag bereikbaar?',
    answer:
      'Ja, Taxi Rijnvallei is 24 uur per dag, 7 dagen per week bereikbaar. Ook in de nacht, op feestdagen en in het weekend kunt u bij ons terecht. Voor ritten tussen 22:00 en 06:00 uur geldt een nachttoeslag van 15%.',
  },
  {
    question: 'In welke plaatsen rijdt Taxi Rijnvallei?',
    answer:
      'Taxi Rijnvallei is gevestigd in Ede en Wageningen en rijdt in de hele Rijnvallei regio: Wageningen, Ede, Veenendaal, Bennekom, Rhenen, Renkum, Barneveld en omgeving. Wij verzorgen ook ritten naar luchthavens en andere bestemmingen in heel Nederland.',
  },
  {
    question: 'Kan ik met meer dan 4 personen een taxi boeken?',
    answer:
      'Ja, bij Taxi Rijnvallei kunt u terecht voor groepen tot 8 personen. Wij beschikken over standaard taxi\'s (1-4 personen) en grote taxi\'s (5-8 personen). Voor de grote taxi geldt een ander tarief. Vermeld bij uw reservering altijd het exacte aantal passagiers.',
  },
  {
    question: 'Wat zijn de tarieven van Taxi Rijnvallei?',
    answer:
      'Onze tarieven zijn opgebouwd uit een instaptarief (€4,15 standaard / €8,44 grote taxi), kilometerprijs (€3,05 / €3,85) en tijdprijs (€0,50 / €0,57 per minuut). Nachttoeslag: 15% tussen 22:00-06:00. Bagage toeslag: €2,50. Minimumtarief: €12,00. Gebruik onze online calculator voor een exacte offerte.',
  },
  {
    question: 'Kan ik betalen met pinpas of creditcard?',
    answer:
      'Ja, bij Taxi Rijnvallei kunt u betalen met contant geld, pinpas (debit card) en creditcard. Zakelijke klanten kunnen ook op rekening betalen met facturatie achteraf.',
  },
  {
    question: 'Hoe vroeg moet ik een taxi naar Schiphol reserveren?',
    answer:
      'Voor ritten naar Schiphol adviseren wij minimaal 24 uur van tevoren te reserveren. Voor vroege ochtendvluchten (voor 06:00 uur) raden wij aan om minimaal 48 uur van tevoren te boeken. Last-minute reserveringen zijn vaak mogelijk, maar niet gegarandeerd.',
  },
  {
    question: 'Biedt Taxi Rijnvallei zakelijk vervoer aan?',
    answer:
      'Ja, Taxi Rijnvallei biedt uitgebreide zakelijke vervoersdiensten aan. Dit omvat personeelsvervoer, zakenreizen, luchthaventransfers en vervoer van gasten. Zakelijke klanten ontvangen facturen op maat en kunnen een bedrijfsaccount aanvragen.',
  },
  {
    question: 'Wat als mijn vlucht vertraging heeft?',
    answer:
      'Bij luchthavenritten monitoren wij de vluchtinformatie. Als uw vlucht vertraging heeft, passen wij de ophaaltijd automatisch aan. Dit is inbegrepen bij onze luchthavenservice. Neem bij vragen altijd contact op via 0317-844466.',
  },
]
