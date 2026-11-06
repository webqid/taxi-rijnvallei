import type { Metadata } from 'next'
import { SITE } from '@/lib/config/site'

interface PageMetadataOptions {
  /** Page title. The root layout appends " | Taxi Rijnvallei" unless `absoluteTitle` is set. */
  title: string
  description: string
  /** Path of the page, used for the canonical URL ("/taxi-ede"). */
  path: string
  absoluteTitle?: boolean
  noIndex?: boolean
}

/**
 * Metadata for a page, with its own canonical URL.
 *
 * Next.js merges metadata shallowly, so a page that sets `openGraph` replaces
 * the whole `openGraph` object of the root layout. This helper always returns
 * the complete objects.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'nl_NL',
      siteName: SITE.name,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  }
}
