import type { NextConfig } from 'next'
import { SITE } from './lib/config/site'

const nextConfig: NextConfig = {
  // Cache Components: pages are prerendered into a static shell, data is
  // uncached unless it is wrapped in `use cache`. This also enables Partial
  // Prerendering (PPR). See node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md
  cacheComponents: true,
  // Partial Prefetching: a <Link> prefetches one shared App Shell per route.
  // See node_modules/next/dist/docs/01-app/02-guides/adopting-partial-prefetching.md
  partialPrefetching: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // 75 is the default; the wide banner photos use 60 (see PhotoFrame).
    qualities: [60, 75],
  },
  async redirects() {
    // The price calculator is hidden (SITE.features.priceCalculator): send
    // anyone with an old link or bookmark to the home page.
    return SITE.features.priceCalculator
      ? []
      : [{ source: '/bereken', destination: '/', permanent: false }]
  },
}

export default nextConfig
