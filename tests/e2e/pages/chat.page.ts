// tests/e2e/pages/chat.page.ts
import { Page, Locator } from '@playwright/test'

export class ChatWidget {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Selectors
  get toggle(): Locator {
    return this.page.locator('[data-testid="chat-toggle"], button[aria-label*="chat" i]')
  }

  get window(): Locator {
    return this.page.locator('[data-testid="chat-window"], [role="dialog"]')
  }

  get closeButton(): Locator {
    return this.window.locator('button').first()
  }

  get messageInput(): Locator {
    return this.window.locator('input, textarea').first()
  }

  get sendButton(): Locator {
    return this.window.locator('button[type="submit"], button:has-text("Send")')
  }

  get messages(): Locator {
    return this.window.locator('[data-testid="chat-message"], [class*="message"]')
  }

  get userMessages(): Locator {
    return this.window.locator('[data-testid="user-message"], [class*="user"]')
  }

  get assistantMessages(): Locator {
    return this.window.locator('[data-testid="assistant-message"], [class*="assistant"]')
  }

  get emergencyBanner(): Locator {
    return this.window.locator('[data-testid="emergency-banner"], text=911')
  }

  get loadingIndicator(): Locator {
    return this.window.locator('[data-testid="loading"], [class*="loading"]')
  }

  // Actions
  async open(): Promise<void> {
    await this.toggle.click()
    await this.window.waitFor({ state: 'visible' })
  }

  async close(): Promise<void> {
    await this.closeButton.click()
    await this.window.waitFor({ state: 'hidden' })
  }

  async sendMessage(message: string): Promise<void> {
    await this.messageInput.fill(message)
    await this.sendButton.click()
  }

  async waitForResponse(): Promise<void> {
    // Wait for loading to appear then disappear
    await this.loadingIndicator.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {})
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {})
  }

  async getLastAssistantMessage(): Promise<string> {
    const messages = await this.assistantMessages.all()
    const lastMessage = messages[messages.length - 1]
    return lastMessage ? await lastMessage.textContent() || '' : ''
  }
}
