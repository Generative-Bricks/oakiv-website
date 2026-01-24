import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders hero section with CTA', async ({ page }) => {
    // Hero section should be visible
    const hero = page.locator('[data-testid="hero-section"], section >> nth=0')
    await expect(hero).toBeVisible()

    // Should have a primary CTA button
    const ctaButton = page.locator('[data-testid="hero-cta"], text=Book >> nth=0')
    await expect(ctaButton).toBeVisible()
  })

  test('renders services preview section', async ({ page }) => {
    const servicesSection = page.locator('[data-testid="services-section"], text=Services >> nth=0')
    await expect(servicesSection).toBeVisible()
  })

  test('has working navigation header', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Should have navigation links
    await expect(page.locator('nav')).toBeVisible()
  })

  test('has footer with contact info', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Should have email or phone contact
    await expect(
      page.locator('footer >> text=@oakivhydration.com, footer >> text=469')
    ).toBeVisible()
  })
})

test.describe('Home Page - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('mobile menu toggle works', async ({ page }) => {
    await page.goto('/')

    // Mobile menu button should be visible
    const menuButton = page.locator('[aria-label*="menu"], button >> nth=0')
    await expect(menuButton).toBeVisible()

    // Click to open mobile menu
    await menuButton.click()

    // Navigation links should become visible
    await expect(page.locator('nav >> text=Services')).toBeVisible()
  })

  test('hero is visible on mobile', async ({ page }) => {
    await page.goto('/')

    const hero = page.locator('[data-testid="hero-section"], section >> nth=0')
    await expect(hero).toBeVisible()
  })
})
