import { test, expect } from '@playwright/test'

test.describe('Booking box on the home page', () => {
  test.beforeEach(async ({ page }) => {
    // Capture the WhatsApp URL instead of opening a new window.
    await page.addInitScript(() => {
      ;(window as unknown as { openedUrls: string[] }).openedUrls = []
      window.open = (url) => {
        ;(window as unknown as { openedUrls: string[] }).openedUrls.push(String(url))
        return null
      }
    })
    await page.goto('/')
  })

  test('shows destination tiles with prices in the HTML', async ({ page }) => {
    const tiles = page.getByRole('list', { name: 'Populaire bestemmingen' })
    await expect(tiles.getByRole('button', { name: /Schiphol.*vanaf €150.*vaste prijs/ })).toBeVisible()
    await expect(tiles.getByRole('button', { name: /Station Ede-Wageningen.*vanaf €25/ })).toBeVisible()
    await expect(tiles.getByRole('button', { name: /Wageningen Campus.*vanaf €30/ })).toBeVisible()
  })

  test('sends the ride as a prefilled WhatsApp message', async ({ page }) => {
    await page.getByRole('button', { name: /^Schiphol/ }).click()
    await expect(page.getByLabel('Bestemming', { exact: true })).toHaveValue('Schiphol')
    await expect(page.getByLabel('Ophaaladres', { exact: true })).toBeFocused()

    await page.getByLabel('Ophaaladres', { exact: true }).fill('Dorpsstraat 1, Bennekom')
    await page.getByLabel('Aantal personen').selectOption('3')
    await page.getByRole('radio', { name: 'Later' }).click()
    await page.getByLabel('Datum en tijd').fill('2030-05-14T06:30')
    await page.getByRole('button', { name: 'Verstuur via WhatsApp' }).click()

    const urls = await page.evaluate(() => (window as unknown as { openedUrls: string[] }).openedUrls)
    expect(urls).toHaveLength(1)
    const url = new URL(urls[0])
    expect(url.origin + url.pathname).toBe('https://wa.me/31647145342')
    const text = url.searchParams.get('text') ?? ''
    expect(text).toContain('Ophaaladres: Dorpsstraat 1, Bennekom')
    expect(text).toContain('Bestemming: Schiphol')
    expect(text).toContain('Wanneer: dinsdag 14 mei')
    expect(text).toContain('06:30')
    expect(text).toContain('Aantal personen: 3')
  })

  test('does not send without pickup address and destination', async ({ page }) => {
    await page.getByRole('button', { name: 'Verstuur via WhatsApp' }).click()
    const urls = await page.evaluate(() => (window as unknown as { openedUrls: string[] }).openedUrls)
    expect(urls).toHaveLength(0)
  })
})
