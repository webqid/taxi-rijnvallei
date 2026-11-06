'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MobileMenuProps {
  items: readonly { href: string; label: string }[]
  cta: { href: string; label: string }
}

/** Menu toggle for small screens. The only client-side part of the header. */
export function MobileMenu({ items, cta }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

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
          className="absolute inset-x-0 top-full border-b bg-background px-4 pb-4 shadow-sm"
        >
          <div className="container mx-auto flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="border-b py-3 text-muted-foreground transition-colors last:border-0 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="cta" size="xl" className="mt-3 w-full" asChild>
              <Link href={cta.href} onClick={close}>
                {cta.label}
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </div>
  )
}
