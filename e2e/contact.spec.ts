import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.describe('Without reservation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/')
      // Wait for page to load and scroll to contact section
      await page.waitForLoadState('networkidle')
    })

    test('should submit contact form with basic info', async ({ page }) => {
      // Get the contact section (the one with "Contact & Reservering")
      const contactSection = page.locator('#contact').filter({ hasText: 'Contact & Reservering' })
      await contactSection.scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)
      
      // Fill in the form using id selectors (unique to our contact section)
      await page.locator('#contact-name').fill('Jan de Tester')
      await page.locator('#contact-phone').fill('0612345678')
      await page.locator('#contact-email').fill('jan@test.nl')
      await contactSection.getByPlaceholder('Waar kunnen wij u mee helpen?').fill('Dit is een testbericht')

      // Submit the form
      const submitButton = contactSection.getByRole('button', { name: /Verstuur aanvraag/i })
      await expect(submitButton).toBeEnabled()
      await submitButton.click()

      // Wait for success message
      await expect(page.getByText('Bedankt voor uw aanvraag!')).toBeVisible({ timeout: 10000 })
      await expect(page.getByText('Wij nemen zo snel mogelijk contact met u op')).toBeVisible()
    })

    test('should show validation for required fields', async ({ page }) => {
      const contactSection = page.locator('#contact').filter({ hasText: 'Contact & Reservering' })
      await contactSection.scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)
      
      // The name input should be required - clicking submit should not work
      const submitButton = contactSection.getByRole('button', { name: /Verstuur aanvraag/i })
      await submitButton.click()

      // Form should not submit (no success message)
      await expect(page.getByText('Bedankt voor uw aanvraag!')).not.toBeVisible()
    })

    test('should show error for invalid email', async ({ page }) => {
      const contactSection = page.locator('#contact').filter({ hasText: 'Contact & Reservering' })
      await contactSection.scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)
      
      await page.locator('#contact-name').fill('Jan de Tester')
      await page.locator('#contact-phone').fill('0612345678')
      await page.locator('#contact-email').fill('invalid-email')

      const submitButton = contactSection.getByRole('button', { name: /Verstuur aanvraag/i })
      await submitButton.click()

      // The form should not submit due to invalid email
      await expect(page.getByText('Bedankt voor uw aanvraag!')).not.toBeVisible()
    })
  })

  test.describe('With reservation', () => {
    async function fillBookingForm(page: import('@playwright/test').Page, options?: { withReturn?: boolean }) {
      // Fill origin - use a simple location
      const originInput = page.getByLabel('Ophaaladres')
      await originInput.click()
      await originInput.fill('Wageningen')
      
      // Wait for suggestions dropdown
      const listbox = page.locator('[role="listbox"]')
      await expect(listbox).toBeVisible({ timeout: 15000 })
      
      // Click the first suggestion
      const firstOption = listbox.locator('[role="option"]').first()
      await expect(firstOption).toBeVisible({ timeout: 5000 })
      await firstOption.click()
      
      // Wait for the selection to register
      await page.waitForTimeout(500)

      // Fill destination
      const destinationInput = page.getByLabel('Bestemming')
      await destinationInput.click()
      await destinationInput.fill('Ede')
      
      // Wait for suggestions dropdown
      await expect(listbox).toBeVisible({ timeout: 15000 })
      
      // Click the first suggestion
      const destOption = listbox.locator('[role="option"]').first()
      await expect(destOption).toBeVisible({ timeout: 5000 })
      await destOption.click()
      
      await page.waitForTimeout(500)

      // Fill pickup datetime
      const pickupInput = page.locator('input[type="datetime-local"]').first()
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(14, 0, 0, 0)
      const dateValue = tomorrow.toISOString().slice(0, 16)
      await pickupInput.fill(dateValue)

      if (options?.withReturn) {
        // Enable return
        await page.getByLabel(/Retour gewenst/i).check()

        // Fill return datetime
        const returnInput = page.getByLabel('Retourdatum en -tijd')
        const returnDate = new Date()
        returnDate.setDate(returnDate.getDate() + 7)
        returnDate.setHours(20, 0, 0, 0)
        const returnValue = returnDate.toISOString().slice(0, 16)
        await returnInput.fill(returnValue)
      }
    }

    test('should submit contact form with booking data', async ({ page }) => {
      // Start on the booking page
      await page.goto('/bereken')
      await page.waitForLoadState('networkidle')

      await fillBookingForm(page)

      // Calculate quote
      const calculateButton = page.getByRole('button', { name: /Bereken mijn ritprijs/i })
      await expect(calculateButton).toBeEnabled({ timeout: 15000 })
      await calculateButton.click()

      // Wait for quote to appear
      await expect(page.getByText('Uw offerte')).toBeVisible({ timeout: 30000 })

      // Click reserve button
      const reserveButton = page.getByRole('button', { name: /Reserveren/i })
      await expect(reserveButton).toBeVisible()
      await reserveButton.click()

      // Wait for scroll to contact section
      await page.waitForTimeout(1500)

      // Verify booking summary is visible
      await expect(page.getByText('Uw berekende rit')).toBeVisible()

      // Fill contact form using id selectors
      await page.locator('#contact-name').fill('Jan de Tester')
      await page.locator('#contact-phone').fill('0612345678')
      await page.locator('#contact-email').fill('jan@test.nl')
      await page.getByPlaceholder('Eventuele bijzonderheden').fill('Graag op tijd')

      // Submit - should say "Reservering aanvragen" when booking data is present
      const submitButton = page.getByRole('button', { name: /Reservering aanvragen/i })
      await expect(submitButton).toBeVisible()
      await submitButton.click()

      // Wait for success message
      await expect(page.getByText('Bedankt voor uw aanvraag!')).toBeVisible({ timeout: 10000 })
    })

    test('should show booking summary with return trip', async ({ page }) => {
      await page.goto('/bereken')
      await page.waitForLoadState('networkidle')

      await fillBookingForm(page, { withReturn: true })

      // Calculate quote
      const calculateButton = page.getByRole('button', { name: /Bereken mijn ritprijs/i })
      await expect(calculateButton).toBeEnabled({ timeout: 15000 })
      await calculateButton.click()

      // Wait for quote to appear
      await expect(page.getByText('Uw offerte')).toBeVisible({ timeout: 30000 })

      // Click reserve button
      const reserveButton = page.getByRole('button', { name: /Reserveren/i })
      await reserveButton.click()

      // Wait for scroll to contact section
      await page.waitForTimeout(1500)

      // Verify booking summary shows both dates - use exact text match
      await expect(page.getByText('Uw berekende rit')).toBeVisible()
      await expect(page.getByText('Heenreis', { exact: true })).toBeVisible()
      await expect(page.getByText('Retour', { exact: true }).first()).toBeVisible()
    })

    test('should allow clearing booking data', async ({ page }) => {
      await page.goto('/bereken')
      await page.waitForLoadState('networkidle')

      await fillBookingForm(page)

      // Calculate quote
      const calculateButton = page.getByRole('button', { name: /Bereken mijn ritprijs/i })
      await expect(calculateButton).toBeEnabled({ timeout: 15000 })
      await calculateButton.click()

      // Wait for quote
      await expect(page.getByText('Uw offerte')).toBeVisible({ timeout: 30000 })

      // Click reserve
      await page.getByRole('button', { name: /Reserveren/i }).click()
      await page.waitForTimeout(1500)

      // Verify booking summary is visible
      await expect(page.getByText('Uw berekende rit')).toBeVisible()

      // Click "Andere rit berekenen" to clear
      await page.getByRole('button', { name: /Andere rit berekenen/i }).click()

      // Verify booking summary is gone
      await expect(page.getByText('Uw berekende rit')).not.toBeVisible()
      
      // The submit button should say "Verstuur aanvraag" instead of "Reservering aanvragen"
      await expect(page.getByRole('button', { name: /Verstuur aanvraag/i })).toBeVisible()
    })
  })
})
