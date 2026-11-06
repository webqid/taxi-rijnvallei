import { CallButton, WhatsAppButton } from '@/components/contact-links'

/**
 * Fixed "Bel direct" / "WhatsApp" bar on small screens, so visitors from an ad
 * can contact us from anywhere on the page. Rendered as plain links: no JS.
 */
export function MobileCallBar() {
  return (
    <>
      {/* Keeps the footer content clear of the fixed bar. */}
      <div aria-hidden="true" className="h-20 md:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-2px_10px_rgba(0,0,0,0.06)] backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-3">
          <CallButton cta="bar" showNumber={false} className="w-full" />
          <WhatsAppButton cta="bar" label="WhatsApp" className="w-full" floatingAnchor={false} />
        </div>
      </div>
    </>
  )
}
