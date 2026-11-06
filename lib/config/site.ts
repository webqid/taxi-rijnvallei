/**
 * Central business information.
 *
 * Every phone number, WhatsApp link and address on the site is read from here,
 * so a change (for example a Google forwarding number for call tracking) is a
 * one-line edit.
 */
export const SITE = {
  name: 'Taxi Rijnvallei',
  url: 'https://taxirijnvallei.nl',
  email: 'info@taxirijnvallei.nl',
  kvk: '65497759',
  gtmId: 'GTM-WWJV82TJ',

  /**
   * Main number. Google Ads "calls from website" conversion tracking replaces
   * this text with a forwarding number, so it must be displayed exactly as
   * configured in Google Ads/GTM. Always render it through <PhoneLink>.
   */
  phone: {
    display: '0317-844466',
    e164: '+31317844466',
  },
  /** Mobile number of the driver on duty (also used for WhatsApp). */
  mobile: {
    display: '06-47145342',
    e164: '+31647145342',
  },
  /** International format without "+", as wa.me expects. */
  whatsappNumber: '31647145342',

  addresses: [
    { streetAddress: 'Grootveld 27', postalCode: '6715 EX', addressLocality: 'Ede' },
    { streetAddress: 'Beekstraat 13', postalCode: '6707 DR', addressLocality: 'Wageningen' },
  ],

  /**
   * Google Business Profile place ID, for example "ChIJ...".
   * Look it up with https://developers.google.com/maps/documentation/places/web-service/place-id
   * While empty, review links fall back to a Google Maps search.
   */
  googlePlaceId: '' as string,

  /**
   * Price calculator (/bereken) with reservation request. Hidden for now:
   * while `false`, no page links to it, /bereken redirects to the home page and
   * texts do not mention it. The example route prices stay. Set to `true` to
   * bring it back.
   */
  features: { priceCalculator: false as boolean },

  /** Public Web3Forms access key (designed to be used client-side). */
  web3formsAccessKey: '01f94a2a-07e4-4f29-9823-d6adf4cb39a7',
} as const

export function telHref(e164: string) {
  return `tel:${e164}`
}

/** Prefilled WhatsApp messages, so customers know which details to send. */
export const WHATSAPP_MESSAGES = {
  default:
    'Hallo Taxi Rijnvallei, ik wil graag een taxi reserveren.\n\nOphaaladres:\nBestemming:\nDatum en tijd:\nAantal personen:',
  airport:
    'Hallo Taxi Rijnvallei, ik wil graag een taxi naar/van de luchthaven reserveren.\n\nOphaaladres:\nLuchthaven:\nDatum en vertrektijd vlucht:\nAantal personen:',
  business:
    'Hallo Taxi Rijnvallei, ik heb een vraag over zakelijk vervoer.\n\nBedrijf:\nVraag:',
} as const

export type WhatsAppMessage = keyof typeof WHATSAPP_MESSAGES

/** WhatsApp link that opens a chat with the given text already typed. */
export function whatsappTextHref(text: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export function whatsappHref(message: WhatsAppMessage = 'default') {
  return whatsappTextHref(WHATSAPP_MESSAGES[message])
}

const MAPS_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Taxi Rijnvallei Ede',
)}`

/** Page where customers can leave a Google review (used by /review). */
export function googleWriteReviewUrl() {
  return SITE.googlePlaceId
    ? `https://search.google.com/local/writereview?placeid=${SITE.googlePlaceId}`
    : MAPS_SEARCH_URL
}

/** Google Business Profile with all reviews. */
export function googleProfileUrl() {
  return SITE.googlePlaceId
    ? `https://www.google.com/maps/place/?q=place_id:${SITE.googlePlaceId}`
    : MAPS_SEARCH_URL
}
