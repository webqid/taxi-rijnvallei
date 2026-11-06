import { test, expect, type Page } from '@playwright/test'
import { SITE } from '../lib/config/site'

// These tests use the real geocoding (Nominatim) and routing (OSRM) services
// through our API routes, so they need an internet connection.

function localDateTime(daysAhead: number, hours: number) {
  const date = new Date()
  date.setDate(date.getDate() + daysAhead)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(hours)}:00`
}

async function selectLocation(page: Page, label: string, query: string) {
  const input = page.getByRole('combobox', { name: label })
  await input.fill(query)
  await page.getByRole('listbox', { name: `${label} suggesties` }).getByRole('option').first().click()
  return input
}

test.describe('Booking Widget', () => {
  test.skip(!SITE.features.priceCalculator, 'The price calculator is hidden (SITE.features.priceCalculator)')

  test.beforeEach(async ({ page }) => {
    await page.goto('/bereken')
  })

  test('should compute quote with origin and destination', async ({ page }) => {
    await selectLocation(page, 'Ophaaladres', 'Wageningen')
    await selectLocation(page, 'Bestemming', 'Ede')
    await page.locator('#pickupAt').fill(localDateTime(1, 14))

    const submitButton = page.getByRole('button', { name: /Bereken mijn ritprijs/i })
    await expect(submitButton).toBeEnabled()
    await submitButton.click()

    await expect(page.getByText('Uw offerte')).toBeVisible({ timeout: 30000 })
    await expect(page.getByText('Afstand', { exact: true })).toBeVisible()
    await expect(page.getByText('Geschatte rijtijd')).toBeVisible()
    await expect(page.getByText('Prijsopbouw')).toBeVisible()
    await expect(page.getByText('Totaal')).toBeVisible()
    await expect(page.getByText('Prijsindicatie op basis van het taximetertarief')).toBeVisible()
  })

  test('should show the fixed fare for a ride to Schiphol', async ({ page }) => {
    await selectLocation(page, 'Ophaaladres', 'Dorpsstraat Bennekom')
    await page.getByRole('button', { name: 'Schiphol', exact: true }).click()
    await expect(page.getByRole('combobox', { name: 'Bestemming' })).toHaveValue('Schiphol')
    await page.locator('#pickupAt').fill(localDateTime(3, 10))

    await page.getByRole('button', { name: /Bereken mijn ritprijs/i }).click()

    await expect(page.getByText('Uw offerte')).toBeVisible({ timeout: 30000 })
    await expect(page.getByText('Vaste prijs', { exact: true })).toBeVisible()
    await expect(page.getByText('Vaste prijs Bennekom → Schiphol')).toBeVisible()
    await expect(page.getByText('€ 150,00').first()).toBeVisible()
  })

  test('should add stopover and swap, then compute quote', async ({ page }) => {
    const originInput = await selectLocation(page, 'Ophaaladres', 'Wageningen')
    const destinationInput = await selectLocation(page, 'Bestemming', 'Veenendaal')

    await page.getByRole('button', { name: /Tussenstop toevoegen/i }).click()
    await selectLocation(page, 'Tussenstop 1', 'Ede')

    const originValue = await originInput.inputValue()
    const destinationValue = await destinationInput.inputValue()
    await page.getByRole('button', { name: /Wissel vertrek- en aankomstlocatie/i }).click()
    await expect(originInput).toHaveValue(destinationValue)
    await expect(destinationInput).toHaveValue(originValue)

    await page.locator('#pickupAt').fill(localDateTime(1, 10))
    const submitButton = page.getByRole('button', { name: /Bereken mijn ritprijs/i })
    await expect(submitButton).toBeEnabled()
    await submitButton.click()

    await expect(page.getByText('Uw offerte')).toBeVisible({ timeout: 30000 })
    await expect(page.getByText('Totaal')).toBeVisible()
  })

  test('should keep the typed text when editing a selected address', async ({ page }) => {
    const originInput = await selectLocation(page, 'Ophaaladres', 'Wageningen')
    const selected = await originInput.inputValue()
    await originInput.press('End')
    await originInput.pressSequentially(' 1')
    await expect(originInput).toHaveValue(`${selected} 1`)
  })

  test('should show return trip options when return toggle is enabled', async ({ page }) => {
    await page.getByLabel(/Retour gewenst/i).check()
    await expect(page.getByLabel('Retourdatum en -tijd')).toBeVisible()
  })

  test('should update passenger count with stepper', async ({ page }) => {
    const count = page.locator('[aria-live="polite"]').filter({ hasText: /^\d$/ })
    await expect(count).toHaveText('2')
    await page.getByRole('button', { name: /Verhoog aantal passagiers/i }).click()
    await expect(count).toHaveText('3')
    await page.getByRole('button', { name: /Verminder aantal passagiers/i }).click()
    await expect(count).toHaveText('2')
  })

  test('should toggle luggage option', async ({ page }) => {
    await page.getByText('Ja, ik heb bagage').click()
    const yesOption = page.getByText('Ja, ik heb bagage').locator('..')
    await expect(yesOption).toHaveClass(/border-primary/)
  })

  test('submit button should be disabled when form is incomplete', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Bereken mijn ritprijs/i })).toBeDisabled()
  })
})
