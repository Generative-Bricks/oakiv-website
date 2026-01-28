// tests/e2e/booking-flow.spec.ts
import { test, expect } from './fixtures'

test.describe('Booking Flow', () => {
  test('complete booking flow from homepage', async ({ homePage, bookingPage, page }) => {
    // Start from homepage
    await homePage.goto()

    // Click Book Now CTA
    await homePage.clickBookNow()
    await expect(page).toHaveURL(/\/book/)

    // Select a service by clicking the card
    await bookingPage.selectServiceByName('Myers Cocktail')

    // Verify service is selected (card should have selected styling)
    const isSelected = await bookingPage.isServiceSelected('Myers Cocktail')
    expect(isSelected).toBe(true)

    // Proceed to step 2
    await bookingPage.proceedToStep2()

    // Fill contact info
    await bookingPage.fillContactInfo({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '4695551234',
      address: '123 Main St, Dallas, TX 75201'
    })

    // Verify form is filled
    await expect(bookingPage.firstNameInput).toHaveValue('Test')
    await expect(bookingPage.lastNameInput).toHaveValue('User')
    await expect(bookingPage.emailInput).toHaveValue('test@example.com')
  })

  test('booking with pre-selected service from URL', async ({ bookingPage }) => {
    // Go directly to booking with service pre-selected
    await bookingPage.goto('myers-cocktail')

    // Service should be pre-selected - shows summary card with "Selected Service" text
    const hasPreselected = await bookingPage.hasPreselectedService()
    expect(hasPreselected).toBe(true)

    // Continue button should be enabled
    await expect(bookingPage.continueButton).toBeEnabled()
  })

  test('can select different service', async ({ bookingPage }) => {
    await bookingPage.goto()

    // Select first service
    await bookingPage.selectServiceByIndex(0)
    await expect(bookingPage.selectedServiceCard).toBeVisible()

    // Select a different service
    await bookingPage.selectServiceByIndex(1)

    // Should only have one selected
    const selectedCount = await bookingPage.selectedServiceCard.count()
    expect(selectedCount).toBe(1)
  })

  test('booking from service detail page', async ({ page }) => {
    // Go to service detail
    await page.goto('/services/myers-cocktail')
    await page.waitForLoadState('networkidle')

    // Click book this service button
    await page.click('a:has-text("Book This Service")')

    // Should navigate to booking with service pre-selected
    await expect(page).toHaveURL(/\/book\?service=myers-cocktail/)
  })

  test('continue button is disabled without service selection', async ({ bookingPage }) => {
    await bookingPage.goto()

    // Continue button should be disabled when no service is selected
    await expect(bookingPage.continueButton).toBeDisabled()

    // Select a service
    await bookingPage.selectServiceByIndex(0)

    // Continue button should now be enabled
    await expect(bookingPage.continueButton).toBeEnabled()
  })
})
