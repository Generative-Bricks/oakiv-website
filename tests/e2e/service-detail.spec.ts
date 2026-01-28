// tests/e2e/service-detail.spec.ts
import { test, expect } from './fixtures'

test.describe('Service Detail Pages', () => {
  const services = [
    { slug: 'myers-cocktail', name: 'Myers Cocktail', price: '185' },
    { slug: 'hangover-cure', name: 'Hangover Cure', price: '195' },
    { slug: 'virus-buster', name: 'Virus Buster', price: '210' },
    { slug: 'b12-boost', name: 'B12 Boost', price: '35' }
  ]

  for (const service of services) {
    test(`${service.name} page displays correctly`, async ({ page }) => {
      await page.goto(`/services/${service.slug}`)
      await page.waitForLoadState('networkidle')

      // Service name should be visible in h1
      await expect(page.locator('h1').filter({ hasText: service.name })).toBeVisible()

      // Price should be displayed in hero section (format: $XXX)
      const priceInHero = page.locator('.text-oak-gold').filter({ hasText: `$${service.price}` })
      await expect(priceInHero.first()).toBeVisible()

      // Book button should exist
      await expect(page.locator('a:has-text("Book This Service")')).toBeVisible()
    })
  }

  test('service detail has benefits section', async ({ page }) => {
    await page.goto('/services/myers-cocktail')
    await page.waitForLoadState('networkidle')

    // Benefits heading should be visible
    await expect(page.locator('h3:has-text("Benefits")')).toBeVisible()
  })

  test('service detail has ingredients section', async ({ page }) => {
    await page.goto('/services/myers-cocktail')
    await page.waitForLoadState('networkidle')

    // Ingredients section has heading "What's Included"
    await expect(page.locator('h3:has-text("What\'s Included")')).toBeVisible()
  })

  test('service detail shows duration in sidebar', async ({ page }) => {
    await page.goto('/services/myers-cocktail')
    await page.waitForLoadState('networkidle')

    // Duration shows in Quick Info sidebar
    await expect(page.getByText('Duration')).toBeVisible()
  })

  test('nonexistent service shows not found message', async ({ page }) => {
    await page.goto('/services/nonexistent-service')
    await page.waitForLoadState('networkidle')

    // Should show "Service Not Found" message
    await expect(page.locator('text=Service Not Found')).toBeVisible()
  })

  test('service detail has back to services link', async ({ page }) => {
    await page.goto('/services/myers-cocktail')
    await page.waitForLoadState('networkidle')

    // Back link should exist
    const backLink = page.locator('a:has-text("Back to Services")')
    await expect(backLink).toBeVisible()
  })

  test('book button navigates to booking with service param', async ({ page }) => {
    await page.goto('/services/myers-cocktail')
    await page.waitForLoadState('networkidle')

    // Click book button
    await page.click('a:has-text("Book This Service")')

    // Should navigate to booking with service query param
    await expect(page).toHaveURL(/\/book\?service=myers-cocktail/)
  })
})
