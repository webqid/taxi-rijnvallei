# Taxi Rijnvallei

Website for Taxi Rijnvallei - a taxi company in the Rijnvallei region (Wageningen, Ede, Veenendaal area, Netherlands).

## Features

### Booking Widget

- **Real-time quote calculation** - Get instant price quotes based on distance, duration, and passenger count
- **Address autocomplete** - Geocoding with Nominatim API, cached results, and Dutch address suggestions
- **Route visualization** - Interactive map preview with Leaflet showing the calculated route via OSRM
- **Stopover support** - Add intermediate stops to your journey
- **Return trips** - Calculate round-trip fares
- **Night surcharge** - Automatic 15% surcharge for rides between 22:00-06:00
- **Passenger-based pricing** - Standard taxi (1-4 passengers) and large taxi (5-8 passengers) rates
- **Luggage surcharge** - Optional extra for large luggage

### Contact & Booking

- **Integrated contact form** - Submit booking requests with pre-filled quote data
- **Email notifications** - Automated emails via Resend with full booking details
- **24/7 availability** - Call, WhatsApp, or online booking

### Performance & SEO

- **Server-side rendering** - Next.js App Router with optimized metadata
- **Open Graph & Twitter cards** - Dynamic social media images
- **Sitemap & robots.txt** - Automated SEO optimization
- **Vercel Analytics** - Built-in analytics tracking

### Answer Engine Optimization (AEO)

- **FAQ section** - Structured Q&A content optimized for AI assistants and voice search
- **Multiple JSON-LD schemas** - TaxiService, FAQPage, Service, HowTo, Speakable, BreadcrumbList
- **Conversational content** - Natural language answers matching voice query patterns
- **Entity-based markup** - Clear definitions with Wikidata IDs for locations
- **Speakable specification** - Content marked for voice assistant readout

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Radix UI](https://www.radix-ui.com/) - Accessible UI primitives
- [TanStack Query](https://tanstack.com/query) - Server state management
- [Zod](https://zod.dev/) - Schema validation
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [Resend](https://resend.com/) - Transactional emails
- [Geist Font](https://vercel.com/font) - Typography

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Environment Variables

Create a `.env.local` file with:

```env
RESEND_API_KEY=your_resend_api_key
```

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run unit tests (Vitest)
pnpm test:unit    # Run unit tests once
pnpm test:e2e     # Run E2E tests (Playwright)
pnpm test:e2e:ui  # Run E2E tests with UI
```

## Testing

- **Unit tests** - Vitest for pricing calculations and business logic
- **E2E tests** - Playwright for booking widget and contact form flows

## Project Structure

```
app/
├── api/
│   ├── contact/     # Contact form submission & email
│   ├── geocode/     # Address autocomplete (Nominatim)
│   ├── quote/       # Price calculation
│   └── route/       # Route calculation (OSRM)
├── bereken/         # Quote calculator page
└── layout.tsx       # Root layout with metadata

components/
├── booking/         # Booking widget components
│   ├── booking-widget.tsx
│   ├── location-input.tsx
│   ├── route-map-preview.tsx
│   └── ...
├── ui/              # Radix-based UI components
└── *.tsx            # Page sections

hooks/
├── use-debounce.ts
├── use-geocode-suggestions.ts
└── use-quote.ts

lib/
├── config/faq-data.ts        # FAQ content for AEO
├── config/pricing.ts         # Pricing configuration
├── config/structured-data.ts # JSON-LD schemas for AEO
├── context/                  # React contexts (booking)
├── schemas/                  # Zod validation schemas
├── services/pricing.ts       # Price calculation logic
└── types/                    # TypeScript types
```

## Structured Data (AEO)

The project includes comprehensive Schema.org structured data for Answer Engine Optimization, configured in `lib/config/structured-data.ts`:

| Schema | Purpose |
|--------|---------|
| `TaxiService` / `LocalBusiness` | Business info, services, pricing, ratings |
| `FAQPage` | Common questions for AI assistants |
| `Service` (ItemList) | Individual service offerings |
| `HowTo` | Step-by-step booking instructions |
| `SpeakableSpecification` | Voice assistant content markers |
| `BreadcrumbList` | Navigation structure |

FAQ content is defined in `lib/config/faq-data.ts` and automatically synchronized with the FAQPage schema.

## Pricing Configuration

Pricing is configured in `lib/config/pricing.ts`:

- **Standard taxi** (1-4 passengers): €4.15 base + €3.05/km + €0.50/min
- **Large taxi** (5-8 passengers): €8.44 base + €3.85/km + €0.57/min
- **Night surcharge**: 15% (22:00-06:00)
- **Luggage surcharge**: €2.50
- **Minimum fare**: €12.00

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/geocode` | GET | Address autocomplete with caching |
| `/api/quote` | POST | Calculate ride price |
| `/api/route` | POST | Get route geometry for map |
| `/api/contact` | POST | Submit contact/booking form |

All API routes include rate limiting for abuse prevention.

## Branch

The default branch is `main`.
