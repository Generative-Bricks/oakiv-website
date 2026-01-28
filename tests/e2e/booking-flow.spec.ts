// tests/e2e/booking-flow.spec.ts
import { test, expect } from './fixtures'

test.describe('Booking Flow', () => {
  test('complete booking flow from homepage', async ({ homePage, bookingPage, page }) => {
    // Start from homepage
    await homePage.goto()

    // Click Book Now CTA
    await homePage.clickBookNow()
    await expect(page).toHaveURL(/\/book/)

    // Select a service
    await bookingPage.selectService('Myers Cocktail')

    // Select date (tomorrow)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateStr = tomorrow.toISOString().split('T')[0]
    await bookingPage.selectDate(dateStr)

    // Fill contact info
    await bookingPage.fillContactInfo({
      name: 'Test User',
      email: 'test@example.com',
      phone: '4695551234',
      address: '123 Main St, Dallas, TX 75201'
    })

    // Verify form is filled
    await expect(bookingPage.nameInput).toHaveValue('Test User')
    await expect(bookingPage.emailInput).toHaveValue('test@example.com')
  })

  test('booking with pre-selected service from URL', async ({ bookingPage }) => {
    // Go directly to booking with service pre-selected
    await bookingPage.goto('myers-cocktail')

    // Service should be pre-selected
    await expect(bookingPage.serviceSelect).toHaveValue(/myers/i)
  })

  test('booking form validates required fields', async ({ bookingPage }) => {
    await bookingPage.goto()

    // Try to submit empty form
    await bookingPage.submit()

    // Should show validation (HTML5 or custom)
    const nameInput = bookingPage.nameInput
    const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBe(true)
  })

  test('booking from service detail page', async ({ page }) => {
    // Go to service detail
    await page.goto('/services/myers-cocktail')

    // Click book this service
    await page.click('text=Book This Service, text=Book Now').catch(() => {
      // Fallback selector
      return page.click('a[href*="/book"]')
    })

    // Should navigate to booking with service pre-selected
    await expect(page).toHaveURL(/\/book\?service=myers-cocktail/)
  })
})
