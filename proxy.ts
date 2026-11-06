import { NextResponse, type NextRequest } from 'next/server'

/**
 * Answers URLs that can never be a page with a real 404 status.
 *
 * The fallback route app/[slug] streams its response, and a streamed response
 * cannot change its status from 200 afterwards. Checking the URL here, before
 * anything renders, gives bots probing /wp-login.php and visitors of pages that
 * do not exist yet (/privacybeleid) a genuine 404, as described in
 * node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/loading.md
 * ("Status codes").
 *
 * The matcher is limited to URLs that are certainly invalid, so the cached
 * pages (/, /taxi-ede, ...) are never routed through this function.
 */

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const STATIC_FILE = /\.(?:jpe?g|png|webp|avif|svg|ico|txt|xml|json|webmanifest)$/i
// Linked from the site but not built yet. Remove an entry once its page exists.
const NOT_BUILT_YET = new Set(['privacybeleid', 'algemene-voorwaarden'])

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.slice(1)

  // Public files such as /logo.jpeg and /robots.txt, and Next's own not-found route.
  if (STATIC_FILE.test(slug) || slug === '_not-found') return NextResponse.next()

  // /Taxi-Ede: send capitalised variants of a valid slug to the lowercase URL.
  const lowercase = slug.toLowerCase()
  if (lowercase !== slug && SLUG_PATTERN.test(lowercase) && !NOT_BUILT_YET.has(lowercase)) {
    return NextResponse.redirect(new URL(`/${lowercase}${request.nextUrl.search}`, request.url), 308)
  }

  return NextResponse.rewrite(new URL('/_not-found', request.url), { status: 404 })
}

export const config = {
  matcher: [
    '/privacybeleid',
    '/algemene-voorwaarden',
    // One path segment with a character that is not a-z, 0-9 or "-".
    '/((?=[^/]*[^a-z0-9/-])[^/]+)',
  ],
}
