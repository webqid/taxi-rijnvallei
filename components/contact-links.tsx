import type { ComponentProps } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE, telHref, whatsappHref, type WhatsAppMessage } from '@/lib/config/site'

/*
 * Every phone and WhatsApp link on the site is rendered by these components.
 *
 * - The phone number sits in its own text node, displayed exactly as in
 *   `SITE.phone.display`, so Google Ads call tracking can swap it for a
 *   forwarding number.
 * - `data-cta` names the position of the button ("hero", "call-bar", ...), so
 *   GTM triggers can report which call to action converts.
 */

type ButtonProps = Pick<ComponentProps<typeof Button>, 'size' | 'className'>

interface CallButtonProps extends ButtonProps {
  cta: string
  variant?: 'call' | 'outline'
  label?: string
  /** Show the number next to the label. */
  showNumber?: boolean
}

export function CallButton({
  cta,
  label = 'Bel direct',
  showNumber = true,
  size = 'xl',
  variant = 'call',
  className,
}: CallButtonProps) {
  return (
    <Button variant={variant} size={size} className={className} asChild>
      <a href={telHref(SITE.phone.e164)} data-cta={`call-${cta}`}>
        <Phone aria-hidden="true" />
        <span>
          {label}
          {showNumber && (
            <>
              {' '}
              <span className="whitespace-nowrap">{SITE.phone.display}</span>
            </>
          )}
        </span>
      </a>
    </Button>
  )
}

interface WhatsAppButtonProps extends ButtonProps {
  cta: string
  label?: string
  message?: WhatsAppMessage
  /**
   * The floating WhatsApp button appears once every such button on the page has
   * scrolled out of view. Set to `false` for buttons that are always visible.
   */
  floatingAnchor?: boolean
}

export function WhatsAppButton({
  cta,
  label = 'WhatsApp ons',
  message = 'default',
  size = 'xl',
  floatingAnchor = true,
  className,
}: WhatsAppButtonProps) {
  return (
    <Button variant="whatsapp" size={size} className={className} asChild>
      <a
        href={whatsappHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={`whatsapp-${cta}`}
        data-whatsapp-anchor={floatingAnchor || undefined}
      >
        <MessageCircle aria-hidden="true" />
        {label}
      </a>
    </Button>
  )
}

interface PhoneLinkProps extends Omit<ComponentProps<'a'>, 'href'> {
  cta: string
  /** `main` is the office number, `mobile` the driver's number. */
  number?: 'main' | 'mobile'
}

/** Inline phone number link. */
export function PhoneLink({ cta, number = 'main', children, ...props }: PhoneLinkProps) {
  const phone = number === 'main' ? SITE.phone : SITE.mobile
  return (
    <a href={telHref(phone.e164)} data-cta={`call-${cta}`} {...props}>
      {children ?? phone.display}
    </a>
  )
}
