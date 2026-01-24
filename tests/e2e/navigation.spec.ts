import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Oak IV/)
  })

  test('can navigate to all main pages', async ({ page }) => {
    await page.goto('/')

    // Navigate to Services
    await page.click('nav >> text=Services')
    await expect(page).toHaveURL(/\/services/)
    await expect(page).toHaveTitle(/Services/)

    // Navigate to About
    await page.click('nav >> text=About')
    await expect(page).toHaveURL(/\/about/)
    await expect(page).toHaveTitle(/About/)

    // Navigate to Contact
    await page.click('nav >> text=Contact')
    await expect(page).toHaveURL(/\/contact/)
    await expect(page).toHaveTitle(/Contact/)
  })

  test('book now CTA navigates to booking page', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="book-cta"], text=Book Now >> nth=0')
    await expect(page).toHaveURL(/\/book/)
  })

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/about')
    await page.click('[data-testid="logo"], header a >> nth=0')
    await expect(page).toHaveURL('/')
  })

  test('404 page shows for invalid routes', async ({ page }) => {
    await page.goto('/nonexistent-page')
    await expect(page).toHaveTitle(/Not Found/)
    await expect(page.locator('text=Page Not Found')).toBeVisible()
  })
})

test.describe('Service Pages', () => {
  test('IV Therapy page loads', async ({ page }) => {
    await page.goto('/services/iv-therapy')
    await expect(page).toHaveTitle(/IV Therapy/)
  })

  test('Vitamin Injections page loads', async ({ page }) => {
    await page.goto('/services/vitamin-injections')
    await expect(page).toHaveTitle(/Vitamin Injections/)
  })

  test('Wellness Consultations page loads', async ({ page }) => {
    await page.goto('/services/wellness-consultations')
    await expect(page).toHaveTitle(/Wellness Consultations/)
  })

  test('Event Services page loads', async ({ page }) => {
    await page.goto('/services/event-services')
    await expect(page).toHaveTitle(/Event Services/)
  })
})

test.describe('Footer Links', () => {
  test('privacy policy page loads', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page).toHaveTitle(/Privacy/)
  })

  test('terms of service page loads', async ({ page }) => {
    await page.goto('/terms')
    await expect(page).toHaveTitle(/Terms/)
  })

  test('FAQ page loads', async ({ page }) => {
    await page.goto('/faq')
    await expect(page).toHaveTitle(/FAQ/)
  })
})
