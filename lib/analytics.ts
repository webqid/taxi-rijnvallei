import { sendGTMEvent } from '@next/third-parties/google'

/**
 * Pushes a conversion event to Google Tag Manager.
 *
 * Phone and WhatsApp clicks are plain links that GTM can track on its own
 * (see the `data-cta` attributes). Form submissions, and the booking box that
 * opens WhatsApp from script, are reported explicitly with the GA4 recommended
 * `generate_lead` event.
 */
export function trackLead(
  form: 'contact' | 'reservation' | 'whatsapp-booking',
  details: Record<string, string | number> = {}
) {
  sendGTMEvent({ event: 'generate_lead', form, ...details })
}
