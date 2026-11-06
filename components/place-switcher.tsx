import Link from 'next/link'
import { LOCATIONS } from '@/lib/config/locations'
import { cn } from '@/lib/utils'

/**
 * "Taxi in: Ede · Wageningen · ..." right under the hero of a city page, with
 * the current place marked, so a visitor can hop to another place at the top of
 * the page. Scrolls sideways on small screens.
 */
export function PlaceSwitcher({ current }: { current: string }) {
  return (
    <nav aria-label="Taxi in andere plaatsen" className="container mx-auto px-4 pt-6">
      <ul className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <li className="shrink-0 text-sm font-medium text-muted-foreground">Taxi in:</li>
        {LOCATIONS.map((location) => {
          const isCurrent = location.slug === current
          return (
            <li key={location.slug} className="shrink-0">
              <Link
                href={`/${location.slug}`}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn(
                  'inline-block rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  isCurrent
                    ? 'bg-foreground text-background'
                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'
                )}
              >
                {location.name}
              </Link>
            </li>
          )
        })}
        <li className="shrink-0">
          <Link
            href="/werkgebied"
            className="inline-block px-2 py-1.5 text-sm font-semibold text-sky-700 hover:underline"
          >
            Alle plaatsen →
          </Link>
        </li>
      </ul>
    </nav>
  )
}
