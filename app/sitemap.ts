import type { MetadataRoute } from 'next'
import { LOCATIONS } from '@/lib/config/locations'
import { SITE } from '@/lib/config/site'

/** Date of the last content change. Update it when page content changes. */
const LAST_MODIFIED = '2026-11-06'

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: path === '/' ? SITE.url : `${SITE.url}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority,
  })

  return [
    page('/', 1),
    page('/taxi-schiphol', 0.9),
    ...LOCATIONS.map((location) => page(`/${location.slug}`, 0.9)),
    page('/werkgebied', 0.8),
    page('/tarieven', 0.8),
    page('/zakelijk-vervoer', 0.8),
    ...(SITE.features.priceCalculator ? [page('/bereken', 0.7)] : []),
  ]
}
