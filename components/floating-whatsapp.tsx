'use client'

import * as React from 'react'
import { MessageCircle } from 'lucide-react'
import { whatsappHref } from '@/lib/config/site'
import { cn } from '@/lib/utils'

const ANCHOR = '[data-whatsapp-anchor]'
/** Pages without WhatsApp buttons show the floating one after this much scrolling. */
const FALLBACK_SCROLL_PX = 400

/**
 * Floating WhatsApp button in the bottom right corner, from tablet width up.
 *
 * It appears once the visitor has scrolled past the WhatsApp button at the top
 * of the page (booking box or hero, marked with `data-whatsapp-anchor`) and hides
 * only while that button is back in view. Further down, for example next to the
 * contact section's WhatsApp button, it stays visible. Phones already have the
 * fixed call bar with a WhatsApp button, so it stays hidden there.
 *
 * It uses IntersectionObserver instead of scroll events, and a MutationObserver
 * to pick up the buttons of the next page after a client-side navigation.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = React.useState(false)
  const [href, setHref] = React.useState(() => whatsappHref())

  React.useEffect(() => {
    // Position of each anchor: in view, or scrolled past (above the viewport).
    const states = new Map<Element, 'in-view' | 'above' | 'below'>()

    const isRendered = (element: Element) => (element as HTMLElement).offsetParent !== null

    const update = () => {
      const anchors = [...states.keys()].filter((element) => element.isConnected && isRendered(element))
      if (anchors.length === 0) {
        setVisible(window.scrollY > FALLBACK_SCROLL_PX)
        return
      }
      const inView = anchors.some((element) => states.get(element) === 'in-view')
      const scrolledPast = anchors.some((element) => states.get(element) === 'above')
      setVisible(!inView && scrolledPast)

      // Keep the page's own message (airport, business) when its button is a link.
      const link = anchors.find((element): element is HTMLAnchorElement => element instanceof HTMLAnchorElement)
      setHref(link?.href ?? whatsappHref())
    }

    const intersection = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        states.set(
          entry.target,
          entry.isIntersecting ? 'in-view' : entry.boundingClientRect.top < 0 ? 'above' : 'below'
        )
      }
      update()
    })

    const scan = () => {
      for (const element of [...states.keys()]) {
        if (!element.isConnected) {
          states.delete(element)
          intersection.unobserve(element)
        }
      }
      for (const element of document.querySelectorAll(ANCHOR)) {
        if (!states.has(element)) {
          states.set(element, 'below')
          intersection.observe(element)
        }
      }
      update()
    }

    let frame = 0
    const scheduleScan = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(scan)
    }
    const mutations = new MutationObserver(scheduleScan)
    mutations.observe(document.body, { childList: true, subtree: true })
    // Only needed for pages without anchors; passive, and React skips equal states.
    window.addEventListener('scroll', scheduleScan, { passive: true })
    scheduleScan()

    return () => {
      cancelAnimationFrame(frame)
      intersection.disconnect()
      mutations.disconnect()
      window.removeEventListener('scroll', scheduleScan)
    }
  }, [])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp-floating"
      aria-label="WhatsApp ons"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={cn(
        'fixed right-6 bottom-6 z-40 hidden h-14 items-center gap-2 rounded-full bg-emerald-700 px-5 font-semibold text-white shadow-lg transition-[opacity,transform,visibility] duration-200 hover:bg-emerald-800 focus-visible:ring-[3px] focus-visible:ring-emerald-700/50 focus-visible:outline-none md:flex',
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-4 opacity-0'
      )}
    >
      <MessageCircle className="size-6" aria-hidden="true" />
      WhatsApp
    </a>
  )
}
