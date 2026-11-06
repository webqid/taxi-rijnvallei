import { Suspense } from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { PhoneLink } from '@/components/contact-links'
import { HeaderNav, HeaderNavLive, ReserveLink, ReserveLinkLive } from '@/components/header-nav'
import { MobileMenu, MobileMenuLive } from '@/components/mobile-menu'
import { LogoMark } from '@/components/steering-wheel'
import { LOCATIONS } from '@/lib/config/locations'
import { SITE } from '@/lib/config/site'
import type { NavItem } from '@/lib/navigation'

const calculator = SITE.features.priceCalculator

export const NAV_ITEMS: NavItem[] = [
  { href: '/taxi-schiphol', label: 'Luchthaven' },
  { href: '/zakelijk-vervoer', label: 'Zakelijk' },
  { href: '/tarieven', label: 'Tarieven' },
  {
    href: '/werkgebied',
    label: 'Werkgebied',
    places: LOCATIONS.map((location) => ({ href: `/${location.slug}`, label: `Taxi ${location.name}` })),
  },
]

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE.name}, naar de homepage`}>
      <LogoMark />
      <span className="text-lg font-bold text-foreground sm:text-xl">{SITE.name}</span>
    </Link>
  )
}

/*
 * The parts that depend on the current URL (the highlighted page, where
 * "Reserveren" goes) read it with usePathname. On a route with dynamic params
 * (/[slug]) the URL is known at request time only, so each sits in <Suspense>
 * with the same markup as the fallback, without the highlight.
 */
export default function Header() {
  return (
    <header className="sticky-header">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Logo />

        <Suspense fallback={<HeaderNav items={NAV_ITEMS} pathname={null} />}>
          <HeaderNavLive items={NAV_ITEMS} />
        </Suspense>

        <div className="flex items-center gap-2">
          <PhoneLink cta="header" className="hidden items-center gap-2 font-semibold text-primary sm:flex">
            <Phone className="size-4" aria-hidden="true" />
            <span>{SITE.phone.display}</span>
          </PhoneLink>
          <Suspense fallback={<ReserveLink pathname={null} calculator={calculator} />}>
            <ReserveLinkLive calculator={calculator} />
          </Suspense>
          <Suspense fallback={<MobileMenu items={NAV_ITEMS} calculator={calculator} pathname={null} />}>
            <MobileMenuLive items={NAV_ITEMS} calculator={calculator} />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
