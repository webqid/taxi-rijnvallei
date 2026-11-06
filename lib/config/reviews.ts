/**
 * Customer reviews shown on the site.
 *
 * Only add real reviews, for example copied from the Google Business Profile.
 * Never invent reviews or ratings: that misleads customers and breaks Google's
 * policies.
 *
 * While both values below are empty, the reviews section only shows an
 * invitation to leave a review on Google (via /review).
 *
 * The Google rating is deliberately NOT added to the structured data (JSON-LD):
 * Google does not allow marking up ratings that come from another website.
 */

export interface Review {
  /** Reviewer's name, shortened to first name and initial: "Marieke V." */
  author: string
  /** Stars (1-5). Leave out when you don't know it; the card then shows no stars. */
  rating?: 1 | 2 | 3 | 4 | 5
  text: string
  /** Month of the review, "YYYY-MM". Leave out when unknown; the card then shows no date. */
  date?: string
}

/**
 * Reviews copied from the Google Business Profile in November 2026.
 * Texts are verbatim; "…" marks a review that Google had cut off.
 * Add the month (`date: 'YYYY-MM'`) of each review when you have it.
 */
export const REVIEWS: Review[] = [
  {
    author: 'Enayat H.',
    rating: 5,
    text: 'Ik ben echt ontzettend tevreden over de service van Taxi Rijnvallei! De chauffeurs zijn zeer beleefd, professioneel en altijd stipt op tijd. Ze gaan respectvol met klanten om en zorgen voor een prettige rit. De auto’s zijn schoon, comfortabel en in uitstekende staat, wat de hele ervaring nog beter maakt. Wat ik vooral waardeer is hun betrouwbaarheid – je kunt echt op ze rekenen. Absoluut een topservice die ik zeker opnieuw zal gebruiken en aan iedereen aanbeveel!',
  },
  {
    author: 'Henk M.',
    rating: 5,
    text: 'Taxi Rijnvallei geboekt via WhatsApp. Nette bevestiging, dag voorafgaand werd er kort nagebeld. Chauffeur was prima op tijd met een nette auto, reed zeer netjes. Aanrader!',
  },
  {
    author: 'Tim V.',
    rating: 5,
    text: 'Ik heb al meerdere keren gebruikgemaakt van deze taxiservice en ben elke keer zeer tevreden. De chauffeur is vriendelijk en altijd op tijd, en de auto is netjes en verzorgd. Ik boek hier zeker opnieuw.',
  },
  {
    author: 'Jet S.',
    rating: 5,
    text: 'Heel fijne taxi bedrijf. Chauffeur is op tijd en als het ietsjes vroeger of later is wordt je gebeld. Duidelijke afspraken over vervoer en kosten …',
  },
  {
    author: 'Saifurahman S.',
    rating: 5,
    text: 'Professionele chauffeur waarbij ik me veilig en op mijn gemak voelde. Alles was netjes geregeld.',
  },
  {
    author: 'Rens d.V.',
    rating: 5,
    text: 'Fijne taxi. Komt afspraken zeker na. Super bedankt voor de fijne reis',
  },
]

/**
 * Average rating and number of reviews as shown on the Google Business Profile,
 * for example `{ value: 4.9, count: 23 }`. Both are visible at the top of the
 * Google Maps listing. Leave `null` until you have the real numbers.
 */
export const GOOGLE_RATING: { value: number; count: number } | null = null
