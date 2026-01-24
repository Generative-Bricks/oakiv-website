import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('contact page loads with form', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact/)

    // Form should be present
    const form = page.locator('form')
    await expect(form).toBeVisible()
  })

  test('form has required fields', async ({ page }) => {
    // Name field
    await expect(page.locator('input[name="name"], input[placeholder*="name" i]')).toBeVisible()

    // Email field
    await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible()

    // Message field
    await expect(page.locator('textarea[name="message"], textarea')).toBeVisible()

    // Submit button
    await expect(page.locator('button[type="submit"], button >> text=Send')).toBeVisible()
  })

  test('form shows validation errors for empty submission', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"], button >> text=Send')
    await submitButton.click()

    // Should show validation - either HTML5 validation or custom error messages
    // Check for :invalid state or error text
    const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]')
    const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBe(true)
  })

  test('displays contact information', async ({ page }) => {
    // Should show email
    await expect(page.locator('text=oakivhydration.com')).toBeVisible()

    // Should show service area
    await expect(page.locator('text=Dallas, text=DFW')).toBeVisible()
  })
})

test.describe('Booking Page', () => {
  test('booking page loads', async ({ page }) => {
    await page.goto('/book')
    await expect(page).toHaveTitle(/Book/)
  })

  test('booking form has service selection', async ({ page }) => {
    await page.goto('/book')

    // Should have a way to select service
    const serviceSelect = page.locator('select, [role="listbox"], input[name="service"]')
    await expect(serviceSelect).toBeVisible()
  })

  test('booking form has date/time selection', async ({ page }) => {
    await page.goto('/book')

    // Should have date picker
    const dateInput = page.locator('input[type="date"], input[name*="date" i]')
    await expect(dateInput).toBeVisible()
  })
})
