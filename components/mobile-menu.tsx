'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { isCurrent, reserveTarget, type NavItem } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  items: NavItem[]
  calculator: boolean
  /** null while the URL is not known (the static fallback). */
  pathname: string | null
}

/** Menu for small screens, with the places as an expandable list. */
export function MobileMenu({ items, calculator, pathname }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [placesOpen, setPlacesOpen] = useState(false)
  const close = () => setIsOpen(false)

  const rowClass = (current: boolean) =>
    cn('py-3 transition-colors hover:text-foreground', current ? 'font-semibold text-foreground' : 'text-muted-foreground')

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="p-2"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Menu sluiten' : 'Menu openen'}
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Hoofdmenu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b bg-background px-4 pb-4 shadow-sm"
        >
          <div className="container mx-auto flex flex-col">
            {items.map((item) => (
              <div key={item.href} className="border-b last:border-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={cn(rowClass(isCurrent(item, pathname)), 'flex-1')}
                  >
                    {item.label}
                  </Link>
                  {item.places && (
                    <button
                      type="button"
                      aria-expanded={placesOpen}
                      aria-controls="mobile-places"
                      aria-label="Toon alle plaatsen"
                      onClick={() => setPlacesOpen((value) => !value)}
                      className="p-3 text-muted-foreground"
                    >
                      <ChevronDown className={cn('size-5 transition-transform', placesOpen && 'rotate-180')} />
                    </button>
                  )}
                </div>
                {item.places && (
                  <ul id="mobile-places" hidden={!placesOpen} className="mb-2 ml-3 border-l pl-3">
                    {item.places.map((place) => (
                      <li key={place.href}>
                        <Link
                          href={place.href}
                          onClick={close}
                          aria-current={pathname === place.href ? 'page' : undefined}
                          className={cn(rowClass(pathname === place.href), 'block text-sm')}
                        >
                          {place.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <Button variant="cta" size="xl" className="mt-3 w-full" asChild>
              <Link href={reserveTarget(pathname, calculator)} onClick={close}>
                {calculator ? 'Ritprijs berekenen & reserveren' : 'Reserveren'}
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </div>
  )
}

/** Reads the current URL. Must sit inside <Suspense>. */
export function MobileMenuLive(props: Omit<MobileMenuProps, 'pathname'>) {
  return <MobileMenu {...props} pathname={usePathname()} />
}
