'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { isCurrent, reserveTarget, type NavItem } from '@/lib/navigation'
import { cn } from '@/lib/utils'

const linkBase = 'relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground'
const currentMark =
  'text-foreground after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-foreground'

const linkClass = (current: boolean) => cn(linkBase, current ? currentMark : 'text-muted-foreground')

/**
 * "Werkgebied" with a sub-menu of places. The label is a link to the overview
 * page; the chevron opens the places. The list is always in the HTML (hidden
 * while closed) so search engines see the links.
 */
function PlacesMenu({ item, pathname }: { item: NavItem; pathname: string | null }) {
  // `open`: the menu is showing. `pinned`: the visitor clicked the chevron, so it
  // stays open when the mouse leaves. Hover alone only previews it.
  const [open, setOpen] = React.useState(false)
  const [pinned, setPinned] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const menuId = React.useId()
  const close = () => {
    setOpen(false)
    setPinned(false)
  }

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false)
        setPinned(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setPinned(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Hover is for a mouse only: on a touch screen a tap would fire it as well.
  const onHover = (hovering: boolean) => (event: React.PointerEvent) => {
    if (event.pointerType !== 'mouse') return
    if (hovering) setOpen(true)
    else if (!pinned) setOpen(false)
  }
  const toggle = () => {
    if (pinned) close()
    else {
      setPinned(true)
      setOpen(true)
    }
  }

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={onHover(true)}
      onPointerLeave={onHover(false)}
      onBlur={(event) => {
        if (!ref.current?.contains(event.relatedTarget as Node)) close()
      }}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          onClick={close}
          aria-current={pathname === item.href ? 'page' : undefined}
          className={cn(linkClass(isCurrent(item, pathname)), 'pr-1')}
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Toon alle plaatsen"
          onClick={toggle}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
        </button>
      </div>

      <div id={menuId} hidden={!open} className="absolute top-full left-0 z-50 pt-2">
        <ul className="w-60 rounded-xl border bg-popover p-2 shadow-lg">
          {item.places?.map((place) => (
            <li key={place.href}>
              <Link
                href={place.href}
                onClick={close}
                aria-current={pathname === place.href ? 'page' : undefined}
                className={cn(
                  'block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted',
                  pathname === place.href ? 'bg-muted font-semibold text-foreground' : 'text-muted-foreground'
                )}
              >
                {place.label}
              </Link>
            </li>
          ))}
          <li className="mt-1 border-t pt-1">
            <Link
              href={item.href}
              onClick={close}
              className="block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-muted"
            >
              Alle plaatsen en prijzen →
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

/** Desktop navigation. `pathname` is null while it is not known (the static fallback). */
export function HeaderNav({ items, pathname }: { items: NavItem[]; pathname: string | null }) {
  return (
    <nav aria-label="Hoofdmenu" className="hidden items-center gap-1 lg:flex">
      {items.map((item) =>
        item.places ? (
          <PlacesMenu key={item.href} item={item} pathname={pathname} />
        ) : (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? 'page' : undefined}
            className={linkClass(isCurrent(item, pathname))}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  )
}

/** Reads the current URL. Must sit inside <Suspense>: pages with dynamic params know it only at request time. */
export function HeaderNavLive({ items }: { items: NavItem[] }) {
  return <HeaderNav items={items} pathname={usePathname()} />
}

export function ReserveLink({ pathname, calculator }: { pathname: string | null; calculator: boolean }) {
  return (
    <Button variant="cta" className="hidden sm:inline-flex" asChild>
      <Link href={reserveTarget(pathname, calculator)}>Reserveren</Link>
    </Button>
  )
}

export function ReserveLinkLive({ calculator }: { calculator: boolean }) {
  return <ReserveLink pathname={usePathname()} calculator={calculator} />
}
