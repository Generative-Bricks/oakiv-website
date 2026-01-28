// tests/e2e/service-detail.spec.ts
import { test, expect } from './fixtures'

test.describe('Service Detail Pages', () => {
  const services = [
    { slug: 'myers-cocktail', name: 'Myers Cocktail', price: '$185' },
    { slug: 'hangover-cure', name: 'Hangover Cure', price: '$195' },
    { slug: 'virus-buster', name: 'Virus Buster', price: '$210' },
    { slug: 'b12-boost', name: 'B12 Boost', price: '$35' }
  ]

  for (const service of services) {
    test(`${service.name} page displays correctly`, async ({ page }) => {
      await page.goto(`/services/${service.slug}`)

      // Title should contain service name
      await expect(page).toHaveTitle(new RegExp(service.name, 'i'))

      // Service name should be visible
      await expect(page.locator(`h1, h2`).filter({ hasText: service.name })).toBeVisible()

      // Price should be displayed
      await expect(page.locator(`text=${service.price}`)).toBeVisible()

      // Benefits section should exist
      await expect(page.locator('text=Benefits, [data-testid="benefits"]')).toBeVisible()

      // Book button should exist
      await expect(page.locator('text=Book, a[href*="/book"]')).toBeVisible()
    })
  }

  test('service detail has ingredients list for IV therapy', async ({ page }) => {
    await page.goto('/services/myers-cocktail')

    // Ingredients should be listed
    await expect(page.locator('text=Vitamin C')).toBeVisible()
    await expect(page.locator('text=B12, text=B-Complex')).toBeVisible()
  })

  test('service detail shows duration', async ({ page }) => {
    await page.goto('/services/myers-cocktail')

    // Duration should be visible
    await expect(page.locator('text=45-60 min, text=minutes')).toBeVisible()
  })

  test('nonexistent service shows 404 or redirect', async ({ page }) => {
    await page.goto('/services/nonexistent-service')

    // Should either show 404 or redirect to services list
    const is404 = await page.locator('text=Not Found').isVisible().catch(() => false)
    const isServicesList = page.url().includes('/services') && !page.url().includes('nonexistent')

    expect(is404 || isServicesList).toBe(true)
  })
})
