import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PhoneLink } from '@/components/contact-links'
import { LogoMark } from '@/components/steering-wheel'
import { MobileMenu } from '@/components/mobile-menu'
import { SITE } from '@/lib/config/site'

export const NAV_ITEMS = [
  { href: '/taxi-schiphol', label: 'Luchthaven' },
  { href: '/zakelijk-vervoer', label: 'Zakelijk' },
  { href: '/tarieven', label: 'Tarieven' },
  { href: '/#local', label: 'Werkgebied' },
  { href: '/#contact', label: 'Contact' },
] as const

/** "Reserveren" goes to the calculator when it is enabled, otherwise to the contact form. */
const RESERVE_CTA = SITE.features.priceCalculator
  ? { href: '/bereken', label: 'Ritprijs berekenen & reserveren' }
  : { href: '/#contact', label: 'Reserveren' }

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE.name}, naar de homepage`}>
      <LogoMark />
      <span className="text-lg font-bold text-foreground sm:text-xl">{SITE.name}</span>
    </Link>
  )
}

export default function Header() {
  return (
    <header className="sticky-header">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Logo />

        <nav aria-label="Hoofdmenu" className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <PhoneLink
            cta="header"
            className="hidden items-center gap-2 font-semibold text-primary sm:flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            <span>{SITE.phone.display}</span>
          </PhoneLink>
          <Button variant="cta" className="hidden sm:inline-flex" asChild>
            <Link href={RESERVE_CTA.href}>Reserveren</Link>
          </Button>
          <MobileMenu items={NAV_ITEMS} cta={RESERVE_CTA} />
        </div>
      </div>
    </header>
  )
}
