/**
 * All marketing pages: home, the local pages, the airport and business pages
 * and the price calculator.
 *
 * They must stay fully static, so visitors from Google Ads always get a
 * prerendered page from the CDN. With `ensureStatic = 'navigation'` the build
 * fails when a change would make one of these pages render per request.
 * See node_modules/next/dist/docs/01-app/02-guides/keeping-pages-static.md
 */
export const ensureStatic = 'navigation'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return children
}
