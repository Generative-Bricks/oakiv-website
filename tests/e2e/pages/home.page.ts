// tests/e2e/pages/home.page.ts
import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class HomePage extends BasePage {
  readonly url = '/'

  constructor(page: Page) {
    super(page)
  }

  // Selectors
  get heroSection(): Locator {
    return this.page.locator('[data-testid="hero-section"], section').first()
  }

  get heroCta(): Locator {
    return this.page.locator('[data-testid="hero-cta"], a:has-text("Book")').first()
  }

  get servicesSection(): Locator {
    return this.page.locator('[data-testid="services-section"]')
  }

  get featuredServices(): Locator {
    return this.page.locator('[data-testid="service-card"]')
  }

  get testimonialsCarousel(): Locator {
    return this.page.locator('[data-testid="testimonials"]')
  }

  // Actions
  async goto(): Promise<void> {
    await this.page.goto(this.url)
    await this.waitForPageLoad()
  }

  async clickBookNow(): Promise<void> {
    await this.heroCta.click()
  }

  async clickFeaturedService(index: number): Promise<void> {
    await this.featuredServices.nth(index).click()
  }
}
