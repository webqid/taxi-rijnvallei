import { test, expect } from '@playwright/test'

test.describe('Booking Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bereken')
  })

  test('should compute quote with origin and destination', async ({ page }) => {
    // Fill origin
    const originInput = page.getByLabel('Ophaaladres')
    await originInput.fill('Wageningen')
    
    // Wait for suggestions and select first one
    await page.waitForSelector('[role="listbox"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    // Fill destination
    const destinationInput = page.getByLabel('Bestemming')
    await destinationInput.fill('Ede')
    
    // Wait for suggestions and select first one
    await page.waitForSelector('[role="listbox"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    // Fill pickup datetime (use a date in the future)
    const pickupInput = page.locator('input[type="datetime-local"]').first()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(14, 0, 0, 0)
    const dateValue = tomorrow.toISOString().slice(0, 16)
    await pickupInput.fill(dateValue)

    // Submit form
    const submitButton = page.getByRole('button', { name: /Bereken mijn ritprijs/i })
    await expect(submitButton).toBeEnabled()
    await submitButton.click()

    // Wait for loading to finish
    await expect(submitButton).not.toContainText('Berekenen...')

    // Verify quote result is shown
    await expect(page.getByText('Uw offerte')).toBeVisible()
    await expect(page.getByText('Afstand')).toBeVisible()
    await expect(page.getByText('Geschatte rijtijd')).toBeVisible()
    await expect(page.getByText('Prijsopbouw')).toBeVisible()
    await expect(page.getByText('Totaal')).toBeVisible()
  })

  test('should add stopover and swap, then compute quote', async ({ page }) => {
    // Fill origin
    const originInput = page.getByLabel('Ophaaladres')
    await originInput.fill('Wageningen')
    await page.waitForSelector('[role="listbox"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    // Fill destination
    const destinationInput = page.getByLabel('Bestemming')
    await destinationInput.fill('Veenendaal')
    await page.waitForSelector('[role="listbox"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    // Add a stopover
    await page.getByRole('button', { name: /Tussenstop toevoegen/i }).click()
    
    // Fill stopover
    const stopoverInput = page.getByLabel('Tussenstop 1')
    await stopoverInput.fill('Ede')
    await page.waitForSelector('[role="listbox"]')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    // Get current origin and destination values
    const originValue = await originInput.inputValue()
    const destinationValue = await destinationInput.inputValue()

    // Swap origin and destination
    await page.getByRole('button', { name: /Wissel vertrek- en aankomstlocatie/i }).click()

    // Verify swap happened
    await expect(originInput).toHaveValue(destinationValue)
    await expect(destinationInput).toHaveValue(originValue)

    // Fill pickup datetime
    const pickupInput = page.locator('input[type="datetime-local"]').first()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(10, 0, 0, 0)
    const dateValue = tomorrow.toISOString().slice(0, 16)
    await pickupInput.fill(dateValue)

    // Submit form
    const submitButton = page.getByRole('button', { name: /Bereken mijn ritprijs/i })
    await expect(submitButton).toBeEnabled()
    await submitButton.click()

    // Wait for loading to finish
    await expect(submitButton).not.toContainText('Berekenen...')

    // Verify quote result is shown
    await expect(page.getByText('Uw offerte')).toBeVisible()
    await expect(page.getByText('Totaal')).toBeVisible()
  })

  test('should show return trip options when return toggle is enabled', async ({ page }) => {
    // Enable return toggle
    await page.getByLabel(/Retour gewenst/i).check()

    // Verify return datetime input is visible
    await expect(page.getByLabel('Retourdatum en -tijd')).toBeVisible()
  })

  test('should update passenger count with stepper', async ({ page }) => {
    // Check initial value
    await expect(page.getByText('2').first()).toBeVisible()

    // Increase passengers
    await page.getByRole('button', { name: /Verhoog aantal passagiers/i }).click()
    await expect(page.locator('[aria-live="polite"]')).toContainText('3')

    // Decrease passengers
    await page.getByRole('button', { name: /Verminder aantal passagiers/i }).click()
    await expect(page.locator('[aria-live="polite"]')).toContainText('2')
  })

  test('should toggle luggage option', async ({ page }) => {
    // Select "Yes, I have luggage"
    await page.getByText('Ja, ik heb bagage').click()
    
    // Verify it's selected (by checking the visual indicator)
    const yesOption = page.getByText('Ja, ik heb bagage').locator('..')
    await expect(yesOption).toHaveClass(/border-primary/)
  })

  test('submit button should be disabled when form is incomplete', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /Bereken mijn ritprijs/i })
    await expect(submitButton).toBeDisabled()
  })
})
