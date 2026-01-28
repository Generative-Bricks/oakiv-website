// tests/e2e/pages/base.page.ts
import { Page, Locator } from '@playwright/test'

export abstract class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Common selectors
  get header(): Locator {
    return this.page.locator('header')
  }

  get footer(): Locator {
    return this.page.locator('footer')
  }

  get chatToggle(): Locator {
    return this.page.locator('[data-testid="chat-toggle"], button[aria-label*="chat" i]')
  }

  // Common actions
  async openChat(): Promise<void> {
    await this.chatToggle.click()
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle')
  }
}
