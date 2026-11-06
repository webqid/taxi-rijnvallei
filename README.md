# Taxi Rijnvallei

Website for Taxi Rijnvallei, a taxi company in Ede, Wageningen and the surrounding Rijnvallei region (Netherlands).

## Pages

| URL | Purpose |
| --- | --- |
| `/` | Home: booking box (destination tiles with prices, sends the ride via WhatsApp), popular rides, airport fares, reviews, how it works, work area, FAQ, contact |
| `/taxi-ede`, `/taxi-wageningen`, `/taxi-bennekom`, `/taxi-veenendaal`, `/taxi-lunteren`, `/taxi-barneveld`, `/taxi-arnhem` | Local landing pages with local text, the owner's fixed route prices, fixed airport fares and a local FAQ |
| `/taxi-schiphol` | Airport landing page: fixed fares per region, free waiting time, how pickup works |
| `/werkgebied` | Overview of all places with their cheapest prices; the "Werkgebied" menu points here |
| `/tarieven` | All fixed route prices, taximeter rates, airport fares per region, price FAQ |
| `/zakelijk-vervoer` | Business transport: invoicing, account requests |
| `/bereken` | Price calculator with reservation request. **Hidden** (redirects to `/`) while `SITE.features.priceCalculator` is `false` |
| `/review` | Redirects to the Google review form (short link for cards and WhatsApp) |
| `/[slug]` | Fallback for any other one-segment URL (older ad landing pages), `noindex` |

## Editing content

Business details, prices and texts live in `lib/config`, not in the components:

| File | What |
| --- | --- |
| `site.ts` | Phone numbers, WhatsApp, addresses, KvK, GTM ID, Google place ID, Web3Forms key |
| `pricing.ts` | Taximeter rates, night surcharge, minimum fare |
| `airport-fares.ts` | Fixed airport fares per region, waiting time, conditions |
| `route-examples.ts` | The owner's fixed route prices (single trip), with distance and driving time. Only the owner's own prices: no estimates |
| `locations.ts` | Text, routes and FAQ of the local landing pages |
| `reviews.ts` | Real customer reviews and the Google rating (empty until filled in) |
| `faq-data.ts` | FAQ texts for the home, airport and business pages |

The FAQ answers, page titles and structured data read prices from these files, so a price change is made in one place.

### Navigation

- **Header:** Luchthaven · Zakelijk · Tarieven · Werkgebied ▾ (a menu with every place; the label itself opens `/werkgebied`), the phone number and "Reserveren". The current page is marked (`aria-current`).
- **"Reserveren"** goes to the booking box on the home page and to the contact form of the page you are on; from other pages (the 404 page) to the home page's contact form. See `reserveTarget` in `lib/navigation.ts`.
- **Place switcher** under the hero of every city page, and "Alle plaatsen" in the footer.
- Places are listed once, in `LOCATIONS` (`lib/config/locations.ts`); the header, switcher, footer, overview and sitemap all read it. A new place needs only a new entry and a page file.
- The parts of the header that read the URL (`usePathname`) sit in `<Suspense>` with a static fallback: on `/[slug]` the URL is known at request time only.

### Price calculator

The calculator is hidden. `SITE.features.priceCalculator` in `site.ts` is `false`, so no page links to it, `/bereken` redirects to the home page, the sitemap leaves it out and the texts don't mention it. The route prices stay. Set the switch to `true` to bring it back; the calculator e2e tests then run again.

### Call tracking

Every phone number is rendered through `components/contact-links.tsx`, with the number in its own text node exactly as in `SITE.phone.display` (`0317-844466`). Google Ads "calls from website" conversion tracking (set up in GTM) can therefore replace it with a forwarding number. Calls to action carry a `data-cta` attribute (`call-hero`, `whatsapp-bar`, ...) for GTM click triggers, and successful form submissions push a GA4 `generate_lead` event to the data layer.

## Architecture

- [Next.js 16.4](https://nextjs.org/) App Router with [Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents) and [Partial Prefetching](https://nextjs.org/docs/app/api-reference/config/next-config-js/partialPrefetching) (`next.config.ts`)
- All marketing pages live in the `app/(site)` route group, whose layout sets `ensureStatic = 'navigation'`: the build fails if a change would make one of them render per request
- `app/[slug]` is the fallback for other one-segment URLs (old ad landing pages). A handful of slugs are prerendered (`generateStaticParams`); any other valid slug is rendered on its first visit and then stored in the ISR cache, so later visits come from the CDN (see the ISR with Cache Components guide)
- `proxy.ts` answers URLs that can never be a page (`/wp-login.php`, `/privacybeleid`, ...) with a real 404, because a streamed page cannot change its 200 status afterwards. Its matcher only covers such URLs, so cached pages never pass through it. Remove `/privacybeleid` and `/algemene-voorwaarden` from it when those pages exist
- The footer year is captured with `use cache`, because `new Date()` is not allowed while prerendering
- Geocoding (Nominatim) and routing (OSRM) results are cached with `use cache: remote` (`lib/services`), shared between server instances where the platform provides a remote cache handler
- React 19.3, Tailwind CSS 4, TypeScript, Radix UI primitives, TanStack Query (price calculator only), Zod, Leaflet

The Next.js documentation for the installed version is in `node_modules/next/dist/docs/`.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are required.

## Scripts

```bash
pnpm dev          # Development server
pnpm build        # Production build (includes type checking)
pnpm start        # Production server
pnpm lint         # ESLint (flat config, eslint.config.mjs)
pnpm typecheck    # TypeScript
pnpm test         # Unit tests (Vitest, watch mode)
pnpm test:unit    # Unit tests once
pnpm test:e2e     # E2E tests (Playwright)
```

## Testing

- **Unit tests** (`lib/services/__tests__`): pricing, fixed airport fares, night and weekend surcharges. Times are tested in Dutch time, independent of the machine's time zone.
- **E2E tests** (`e2e/`): price calculator, contact and reservation forms, landing pages, mobile call bar, `/review`. Web3Forms is mocked, so the tests never send real e-mails. The calculator tests use the real Nominatim and OSRM services. Set `BASE_URL` to test a server that is already running, and `E2E_PRODUCTION=1` as well when that is a production build (`next start`), which enables the caching test.

## API routes

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/geocode` | GET | Address suggestions (Nominatim), rate limited |
| `/api/quote` | POST | Route (OSRM) and price, with fixed fares for airport rides, rate limited |

The contact form posts directly from the browser to [Web3Forms](https://web3forms.com).

## Pricing

- **Standard taxi** (1–4 passengers): €4.15 base + €3.05/km + €0.50/min
- **Large taxi** (5–8 passengers): €8.44 base + €3.85/km + €0.57/min
- **Night surcharge**: 15% (22:00–06:00, Dutch time)
- **Luggage surcharge**: €2.50
- **Minimum fare**: €12.00
- **Airport rides** between a fare region and an airport use the fixed fares from `airport-fares.ts` (1–4 passengers, no stopovers)

## Branch

The default branch is `main`.
