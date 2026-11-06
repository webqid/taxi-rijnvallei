/**
 * Navigation helpers shared by the header and the mobile menu. Kept free of the
 * big config files (locations, prices) so they stay out of the client bundle:
 * the server header passes the items in as props.
 */

export interface NavPlace {
  href: string
  label: string
}

export interface NavItem {
  href: string
  label: string
  /** Sub-menu: the places we drive in. The label itself links to `href` (the overview page). */
  places?: NavPlace[]
}

/** True when the item, or one of its places, is the page the visitor is on. */
export function isCurrent(item: NavItem, pathname: string | null): boolean {
  if (!pathname) return false
  return pathname === item.href || (item.places?.some((place) => place.href === pathname) ?? false)
}

// Pages that have a contact section with id="contact".
const HAS_CONTACT_SECTION = /^\/(?:taxi-[a-z0-9-]+|tarieven|zakelijk-vervoer|werkgebied)$/

/**
 * Where "Reserveren" goes: the booking box on the home page, the contact form on
 * the page you are on, and the home page's contact form from anywhere else (the
 * 404 page, for example).
 */
export function reserveTarget(pathname: string | null, calculatorEnabled: boolean): string {
  if (calculatorEnabled) return '/bereken'
  if (pathname === '/') return '#boeken'
  if (pathname && HAS_CONTACT_SECTION.test(pathname)) return '#contact'
  return '/#contact'
}
