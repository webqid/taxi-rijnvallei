import Link from 'next/link'
import { cacheLife } from 'next/cache'
import { Clock, Mail, MessageCircle, Phone } from 'lucide-react'
import { PhoneLink } from '@/components/contact-links'
import { LogoMark } from '@/components/steering-wheel'
import { LOCATIONS } from '@/lib/config/locations'
import { SITE, whatsappHref } from '@/lib/config/site'

/**
 * `new Date()` would make every page render at request time. `use cache`
 * captures the year in the static shell instead; the pages are refreshed in the
 * background once a day, so the year changes shortly after New Year.
 */
async function CurrentYear() {
  'use cache'
  cacheLife({ revalidate: 60 * 60 * 24, expire: 60 * 60 * 24 * 365 })
  return new Date().getFullYear()
}

const SERVICE_LINKS = [
  { href: '/taxi-schiphol', label: 'Taxi naar Schiphol' },
  { href: '/zakelijk-vervoer', label: 'Zakelijk vervoer' },
  ...(SITE.features.priceCalculator ? [{ href: '/bereken', label: 'Ritprijs berekenen' }] : []),
  { href: '/tarieven', label: 'Tarieven' },
] as const

export default function Footer() {
  return (
    <footer className="bg-foreground py-16 text-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <LogoMark />
              <p className="text-xl font-bold">{SITE.name}</p>
            </div>
            {SITE.addresses.map((address) => (
              <address key={address.addressLocality} className="mb-3 not-italic text-background/80">
                {address.streetAddress}
                <br />
                {address.postalCode} {address.addressLocality}
              </address>
            ))}
            <p className="text-sm text-background/80">KvK {SITE.kvk}</p>
          </div>

          <div>
            <h2 className="mb-4 font-semibold">Contact</h2>
            <ul className="space-y-3 text-background/80">
              <li className="flex items-center gap-2">
                <Phone className="size-4" aria-hidden="true" />
                <PhoneLink cta="footer" className="transition-colors hover:text-background" />
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4" aria-hidden="true" />
                <PhoneLink cta="footer-mobile" number="mobile" className="transition-colors hover:text-background" />
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="size-4" aria-hidden="true" />
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="whatsapp-footer"
                  className="transition-colors hover:text-background"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-background">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4" aria-hidden="true" />
                <span>24/7 bereikbaar</span>
              </li>
            </ul>
          </div>

          <nav aria-label="Werkgebied">
            <h2 className="mb-4 font-semibold">Werkgebied</h2>
            <ul className="space-y-2 text-background/80">
              {LOCATIONS.map((location) => (
                <li key={location.slug}>
                  <Link href={`/${location.slug}`} className="transition-colors hover:text-background">
                    Taxi {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/werkgebied" className="font-medium text-background transition-colors hover:underline">
                  Alle plaatsen
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Diensten">
            <h2 className="mb-4 font-semibold">Diensten</h2>
            <ul className="space-y-2 text-background/80">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-background">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                {/* /review is a route handler that redirects to Google, not a page. */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href="/review" className="transition-colors hover:text-background">
                  Schrijf een review
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-background/20 pt-8 text-sm text-background/60 md:flex-row">
          <p>
            © <CurrentYear /> {SITE.name}. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-background">
              Privacybeleid
            </a>
            <a href="#" className="transition-colors hover:text-background">
              Algemene voorwaarden
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
