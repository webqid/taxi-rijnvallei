import { test, expect } from '@playwright/test'
import { SITE } from '../lib/config/site'

const LANDING_PAGES = [
  { path: '/taxi-ede', heading: 'Taxi in Ede' },
  { path: '/taxi-wageningen', heading: 'Taxi in Wageningen' },
  { path: '/taxi-bennekom', heading: 'Taxi in Bennekom' },
  { path: '/taxi-veenendaal', heading: 'Taxi in Veenendaal' },
  { path: '/taxi-lunteren', heading: 'Taxi in Lunteren' },
  { path: '/taxi-barneveld', heading: 'Taxi in Barneveld' },
  { path: '/taxi-schiphol', heading: 'Taxi naar Schiphol voor een vaste prijs' },
  { path: '/zakelijk-vervoer', heading: 'Zakelijk taxivervoer in Ede, Wageningen en omgeving' },
  { path: '/tarieven', heading: 'Taxitarieven in Ede, Wageningen en omgeving' },
]

test.describe('Landing pages', () => {
  for (const { path, heading } of LANDING_PAGES) {
    test(`${path} has its own heading, canonical URL and call to action`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://taxirijnvallei.nl${path}`
      )
      await expect(page.locator('a[data-cta^="call-"]').first()).toHaveAttribute('href', 'tel:+31317844466')
    })
  }

  test('unknown slugs render a noindex landing page', async ({ page }) => {
    await page.goto('/taxi-arnhem')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Taxi Arnhem')
    await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached()
  })

  test('local pages link to each other through client-side navigation', async ({ page }) => {
    await page.goto('/taxi-ede')
    await page.getByRole('navigation', { name: 'Taxi in de buurt' }).getByRole('link', { name: 'Taxi Bennekom' }).click()
    await expect(page).toHaveURL(/\/taxi-bennekom$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Taxi in Bennekom')
  })
})

test.describe('Unknown URLs', () => {
  for (const path of ['/wp-login.php', '/xmlrpc.php', '/privacybeleid', '/.env']) {
    test(`${path} returns a real 404`, async ({ request }) => {
      const response = await request.get(path, { maxRedirects: 0 })
      expect(response.status()).toBe(404)
      expect(await response.text()).toContain('Pagina niet gevonden')
    })
  }

  test('a capitalised slug redirects to the lowercase URL, keeping the query', async ({ request }) => {
    const response = await request.get('/Taxi-Ede?utm_source=google', { maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(response.headers().location).toBe('/taxi-ede?utm_source=google')
  })

  test('a valid unknown slug is a noindex landing page', async ({ request }) => {
    const response = await request.get('/taxi-testplaats-e2e')
    expect(response.status()).toBe(200)
    expect(await response.text()).toContain('noindex')
  })

  // `next dev` never caches pages: run with E2E_PRODUCTION=1 against `next start`.
  test('a valid unknown slug is cached after its first visit', async ({ request }) => {
    test.skip(!process.env.E2E_PRODUCTION, 'Needs a production build (E2E_PRODUCTION=1)')
    await request.get('/taxi-testplaats-cache')
    await request.get('/taxi-testplaats-cache')
    const response = await request.get('/taxi-testplaats-cache')
    expect(response.headers()['x-nextjs-cache']).toBe('HIT')
    expect(response.headers()['cache-control']).toMatch(/s-maxage=\d+/)
  })
})

test.describe('Price calculator hidden', () => {
  test.skip(SITE.features.priceCalculator, 'The price calculator is enabled')

  test('/bereken redirects to the home page', async ({ page }) => {
    await page.goto('/bereken')
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Uw taxi in Ede, Wageningen en omgeving')
  })

  test('no page links to the calculator, but the example prices stay', async ({ page }) => {
    for (const path of ['/', '/taxi-ede', '/taxi-schiphol', '/zakelijk-vervoer']) {
      await page.goto(path)
      await expect(page.locator('a[href="/bereken"]')).toHaveCount(0)
    }
    await page.goto('/taxi-bennekom')
    await expect(page.getByRole('heading', { name: /Wat kost een taxi in Bennekom/ })).toBeVisible()
    await expect(page.getByText(/ca\. €\d+/).first()).toBeVisible()
  })

  test('the sitemap does not list the calculator', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap).not.toContain('/bereken')
    expect(sitemap).toContain('/taxi-ede')
  })
})

test.describe('Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })

  test('shows the call bar with phone and WhatsApp', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[data-cta="call-bar"]')).toBeVisible()
    await expect(page.locator('a[data-cta="call-bar"]')).toHaveAttribute('href', 'tel:+31317844466')
    await expect(page.locator('a[data-cta="whatsapp-bar"]')).toHaveAttribute('href', /^https:\/\/wa\.me\/31647145342\?text=/)
  })
})

test('/review redirects to Google', async ({ request }) => {
  const response = await request.get('/review', { maxRedirects: 0 })
  expect(response.status()).toBe(307)
  expect(response.headers().location).toMatch(/^https:\/\/(search|www)\.google\.com\//)
})

test.describe('Floating WhatsApp button', () => {
  const floating = 'a[data-cta="whatsapp-floating"]'

  test('appears after scrolling past the top WhatsApp button and stays visible further down', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/taxi-schiphol')
    await expect(page.locator(floating)).toBeHidden()

    await page.locator('#faq').scrollIntoViewIfNeeded()
    await expect(page.locator(floating)).toBeVisible()
    // Keeps the page's own message (airport).
    await expect(page.locator(floating)).toHaveAttribute('href', /luchthaven/)

    await page.locator('[data-cta="whatsapp-contact"]').scrollIntoViewIfNeeded()
    await expect(page.locator(floating)).toBeVisible()

    await page.evaluate(() => window.scrollTo(0, 0))
    await expect(page.locator(floating)).toBeHidden()
  })

  test('appears on the home page once the booking box is out of view', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await expect(page.locator(floating)).toBeHidden()
    await page.locator('#airport').scrollIntoViewIfNeeded()
    await expect(page.locator(floating)).toBeVisible()
  })

  test('stays hidden on phones, which have the call bar', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.locator('#faq').scrollIntoViewIfNeeded()
    await expect(page.locator(floating)).toBeHidden()
    await expect(page.locator('a[data-cta="whatsapp-bar"]')).toBeVisible()
  })
})
