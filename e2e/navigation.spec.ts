import { test, expect } from '@playwright/test'

const PLACES = ['Ede', 'Wageningen', 'Bennekom', 'Veenendaal', 'Lunteren', 'Barneveld', 'Arnhem']

test.describe('Header on desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test('has four clear items, no separate Contact link', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Hoofdmenu' })
    for (const label of ['Luchthaven', 'Zakelijk', 'Tarieven', 'Werkgebied']) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible()
    }
    await expect(nav.getByRole('link', { name: 'Contact' })).toHaveCount(0)
  })

  test('marks the current page', async ({ page }) => {
    await page.goto('/tarieven')
    const nav = page.getByRole('navigation', { name: 'Hoofdmenu' })
    await expect(nav.getByRole('link', { name: 'Tarieven', exact: true })).toHaveAttribute('aria-current', 'page')
    await expect(nav.getByRole('link', { name: 'Zakelijk', exact: true })).not.toHaveAttribute('aria-current', 'page')
  })

  test('the Werkgebied menu lists every place and marks the current one', async ({ page }) => {
    await page.goto('/taxi-ede')
    const nav = page.getByRole('navigation', { name: 'Hoofdmenu' })
    await nav.getByRole('button', { name: 'Toon alle plaatsen' }).click()
    for (const place of PLACES) await expect(nav.getByRole('link', { name: `Taxi ${place}`, exact: true })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Taxi Ede', exact: true })).toHaveAttribute('aria-current', 'page')

    await nav.getByRole('link', { name: 'Taxi Bennekom', exact: true }).click()
    await expect(page).toHaveURL(/\/taxi-bennekom$/)
    // The menu closes after choosing a place.
    await expect(nav.getByRole('link', { name: 'Taxi Ede', exact: true })).toBeHidden()
  })

  test('the Werkgebied menu closes with Escape and keeps its links in the HTML', async ({ page, request }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Hoofdmenu' })
    await nav.getByRole('button', { name: 'Toon alle plaatsen' }).click()
    await expect(nav.getByRole('link', { name: 'Taxi Arnhem', exact: true })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(nav.getByRole('link', { name: 'Taxi Arnhem', exact: true })).toBeHidden()

    const html = await (await request.get('/')).text()
    for (const place of PLACES) expect(html).toContain(`href="/taxi-${place.toLowerCase()}"`)
  })

  test('the Werkgebied label opens the overview page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation', { name: 'Hoofdmenu' }).getByRole('link', { name: 'Werkgebied', exact: true }).click()
    await expect(page).toHaveURL(/\/werkgebied$/)
  })
})

test.describe('"Reserveren" goes to the right place', () => {
  test.use({ viewport: { width: 1280, height: 800 } })
  const reserve = (page: import('@playwright/test').Page) =>
    page.locator('header').getByRole('link', { name: 'Reserveren', exact: true })

  test('home page: the booking box', async ({ page }) => {
    await page.goto('/')
    await expect(reserve(page)).toHaveAttribute('href', '#boeken')
    await expect(page.locator('#boeken')).toBeVisible()
  })

  test('a city page: its own contact form, not the home page', async ({ page }) => {
    await page.goto('/taxi-ede')
    await expect(reserve(page)).toHaveAttribute('href', '#contact')
    await reserve(page).click()
    await expect(page).toHaveURL(/\/taxi-ede#contact$/)
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('a page without a contact form (404): the home page contact form', async ({ page }) => {
    await page.goto('/wp-login.php')
    await expect(reserve(page)).toHaveAttribute('href', '/#contact')
  })

  test('a fallback landing page', async ({ page }) => {
    await page.goto('/taxi-doorwerth')
    await expect(reserve(page)).toHaveAttribute('href', '#contact')
    await expect(page.getByRole('navigation', { name: 'Hoofdmenu' }).getByRole('link', { name: 'Werkgebied', exact: true })).toBeVisible()
  })
})

test.describe('Header on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })

  test('the menu expands the places and navigates', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu openen' }).click()
    const menu = page.locator('#mobile-menu')
    await expect(menu.getByRole('link', { name: 'Taxi Wageningen' })).toBeHidden()
    await menu.getByRole('button', { name: 'Toon alle plaatsen' }).click()
    for (const place of PLACES) await expect(menu.getByRole('link', { name: `Taxi ${place}`, exact: true })).toBeVisible()
    await menu.getByRole('link', { name: 'Taxi Wageningen', exact: true }).click()
    await expect(page).toHaveURL(/\/taxi-wageningen$/)
    await expect(page.locator('#mobile-menu')).toHaveCount(0)
  })
})

test.describe('Place switcher and overview', () => {
  test('every city page has a switcher with the current place marked', async ({ page }) => {
    await page.goto('/taxi-lunteren')
    const switcher = page.getByRole('navigation', { name: 'Taxi in andere plaatsen' })
    for (const place of PLACES) await expect(switcher.getByRole('link', { name: place, exact: true })).toBeVisible()
    await expect(switcher.getByRole('link', { name: 'Lunteren', exact: true })).toHaveAttribute('aria-current', 'page')
    await switcher.getByRole('link', { name: 'Arnhem', exact: true }).click()
    await expect(page).toHaveURL(/\/taxi-arnhem$/)
    await expect(page.getByRole('navigation', { name: 'Taxi in andere plaatsen' }).getByRole('link', { name: 'Arnhem', exact: true })).toHaveAttribute('aria-current', 'page')
  })

  test('the overview lists every place with its price and links to it', async ({ page }) => {
    await page.goto('/werkgebied')
    for (const place of PLACES) {
      const card = page.getByRole('link', { name: new RegExp(`^Taxi ${place}\\b`) }).filter({ hasText: 'Bekijk prijzen' })
      await expect(card).toBeVisible()
    }
    await expect(page.getByRole('link', { name: /^Taxi Ede\b/ }).filter({ hasText: 'Schiphol €150' })).toBeVisible()
    await page.getByRole('link', { name: /^Taxi Bennekom\b/ }).filter({ hasText: 'Bekijk prijzen' }).click()
    await expect(page).toHaveURL(/\/taxi-bennekom$/)
  })
})
