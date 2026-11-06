import { test, expect, type Page } from '@playwright/test'
import { SITE } from '../lib/config/site'

/**
 * The contact form posts straight to Web3Forms, which e-mails the taxi company.
 * Every test answers that request locally, so running the suite never sends a
 * real e-mail. The captured form fields are returned for assertions.
 */
async function mockWeb3Forms(page: Page) {
  const submissions: Record<string, string>[] = []
  await page.route('https://api.web3forms.com/submit', async (route) => {
    const body = route.request().postDataBuffer()
    const contentType = route.request().headers()['content-type'] ?? ''
    const form = await new Response(body ? new Uint8Array(body) : null, {
      headers: { 'content-type': contentType },
    }).formData()
    submissions.push(Object.fromEntries([...form.entries()].map(([key, value]) => [key, String(value)])))
    await route.fulfill({ json: { success: true, message: 'Email sent successfully!' } })
  })
  return submissions
}

function localDateTime(daysAhead: number, hours: number) {
  const date = new Date()
  date.setDate(date.getDate() + daysAhead)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(hours)}:00`
}

async function selectLocation(page: Page, label: string, query: string) {
  await page.getByRole('combobox', { name: label }).fill(query)
  await page.getByRole('listbox', { name: `${label} suggesties` }).getByRole('option').first().click()
}

test.describe('Contact Form', () => {
  test.describe('Without reservation', () => {
    test('should submit contact form with basic info', async ({ page }) => {
      const submissions = await mockWeb3Forms(page)
      await page.goto('/')
      const contactSection = page.locator('#contact')
      await contactSection.scrollIntoViewIfNeeded()

      await page.locator('#contact-name').fill('Jan de Tester')
      await page.locator('#contact-phone').fill('0612345678')
      await page.locator('#contact-email').fill('jan@test.nl')
      await contactSection.getByPlaceholder('Waar kunnen wij u mee helpen?').fill('Dit is een testbericht')
      await contactSection.getByRole('button', { name: /Verstuur aanvraag/i }).click()

      await expect(page.getByText('Bedankt voor uw aanvraag!')).toBeVisible({ timeout: 10000 })
      await expect(page.getByText('Wij nemen zo snel mogelijk contact met u op')).toBeVisible()
      expect(submissions).toHaveLength(1)
      expect(submissions[0]).toMatchObject({
        name: 'Jan de Tester',
        phone: '0612345678',
        email: 'jan@test.nl',
        message: 'Dit is een testbericht',
      })
      expect(submissions[0].subject).toContain('Jan de Tester')
    })

    test('should not submit without the required fields', async ({ page }) => {
      const submissions = await mockWeb3Forms(page)
      await page.goto('/')
      await page.locator('#contact').getByRole('button', { name: /Verstuur aanvraag/i }).click()

      await expect(page.getByText('Bedankt voor uw aanvraag!')).not.toBeVisible()
      expect(submissions).toHaveLength(0)
    })

    test('should not submit with an invalid email', async ({ page }) => {
      const submissions = await mockWeb3Forms(page)
      await page.goto('/')
      await page.locator('#contact-name').fill('Jan de Tester')
      await page.locator('#contact-phone').fill('0612345678')
      await page.locator('#contact-email').fill('invalid-email')
      await page.locator('#contact').getByRole('button', { name: /Verstuur aanvraag/i }).click()

      await expect(page.getByText('Bedankt voor uw aanvraag!')).not.toBeVisible()
      expect(submissions).toHaveLength(0)
    })
  })

  test.describe('With reservation', () => {
    test.skip(!SITE.features.priceCalculator, 'The price calculator is hidden (SITE.features.priceCalculator)')

    async function calculateAndReserve(page: Page, options?: { withReturn?: boolean }) {
      await page.goto('/bereken')
      await selectLocation(page, 'Ophaaladres', 'Wageningen')
      await selectLocation(page, 'Bestemming', 'Ede')
      await page.locator('#pickupAt').fill(localDateTime(1, 14))

      if (options?.withReturn) {
        await page.getByLabel(/Retour gewenst/i).check()
        await page.getByLabel('Retourdatum en -tijd').fill(localDateTime(7, 20))
      }

      await page.getByRole('button', { name: /Bereken mijn ritprijs/i }).click()
      await expect(page.getByText('Uw offerte')).toBeVisible({ timeout: 30000 })
      await page.getByRole('button', { name: /^Reserveren/ }).click()
      await expect(page.getByText('Uw berekende rit')).toBeVisible()
    }

    test('should submit contact form with booking data', async ({ page }) => {
      const submissions = await mockWeb3Forms(page)
      await calculateAndReserve(page)

      await page.locator('#contact-name').fill('Jan de Tester')
      await page.locator('#contact-phone').fill('0612345678')
      await page.locator('#contact-email').fill('jan@test.nl')
      await page.getByPlaceholder('Eventuele bijzonderheden').fill('Graag op tijd')
      await page.getByRole('button', { name: /Reservering aanvragen/i }).click()

      await expect(page.getByText('Bedankt voor uw aanvraag!')).toBeVisible({ timeout: 10000 })
      expect(submissions).toHaveLength(1)
      expect(submissions[0].subject).toBe('Nieuwe reservering van Jan de Tester')
      expect(submissions[0].Van).toContain('Wageningen')
      expect(submissions[0].Ophalen).toBeTruthy()
      expect(submissions[0].Prijs).toMatch(/€/)
    })

    test('should show booking summary with return trip', async ({ page }) => {
      await mockWeb3Forms(page)
      await calculateAndReserve(page, { withReturn: true })

      await expect(page.getByText('Heenreis', { exact: true })).toBeVisible()
      await expect(page.getByText('Retour', { exact: true }).first()).toBeVisible()
    })

    test('should allow clearing booking data', async ({ page }) => {
      await mockWeb3Forms(page)
      await calculateAndReserve(page)

      await page.getByRole('button', { name: /Andere rit berekenen/i }).click()

      await expect(page.getByText('Uw berekende rit')).not.toBeVisible()
      await expect(page.getByRole('button', { name: /Verstuur aanvraag/i })).toBeVisible()
    })
  })
})
