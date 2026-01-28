// tests/e2e/pages/chat.page.ts
import { Page, Locator } from '@playwright/test'

export class ChatWidget {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Selectors - match actual data-testid attributes from ChatWidget.vue
  get toggle(): Locator {
    return this.page.locator('[data-testid="chat-toggle"]')
  }

  get window(): Locator {
    return this.page.locator('[data-testid="chat-window"]')
  }

  get closeButton(): Locator {
    return this.page.locator('[data-testid="chat-close"]')
  }

  get messageInput(): Locator {
    return this.page.locator('[data-testid="chat-input"]')
  }

  get sendButton(): Locator {
    return this.page.locator('[data-testid="chat-send"]')
  }

  get messagesContainer(): Locator {
    return this.window.locator('.overflow-y-auto')
  }

  get messages(): Locator {
    // Messages are divs with max-w-[85%] class inside the messages container
    return this.messagesContainer.locator('div.max-w-\\[85\\%\\]')
  }

  get userMessages(): Locator {
    // User messages have bg-oak-green-primary class
    return this.messagesContainer.locator('div.bg-oak-green-primary')
  }

  get assistantMessages(): Locator {
    // Assistant messages have bg-white or bg-red-100 (emergency) class
    return this.messagesContainer.locator('div.bg-white, div.bg-red-100')
  }

  get emergencyBanner(): Locator {
    return this.page.locator('[data-testid="emergency-banner"]')
  }

  get loadingIndicator(): Locator {
    // Loading shows "Thinking..." text
    return this.window.locator('text=Thinking...')
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

  async isOpen(): Promise<boolean> {
    return this.window.isVisible()
  }

  async sendMessage(message: string): Promise<void> {
    await this.messageInput.fill(message)
    await this.sendButton.click()
  }

  async waitForResponse(timeout = 10000): Promise<void> {
    // Wait for loading to appear then disappear
    try {
      await this.loadingIndicator.waitFor({ state: 'visible', timeout: 2000 })
    } catch {
      // Loading may have already finished
    }
    try {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout })
    } catch {
      // May not have loading indicator
    }
  }

  async getLastAssistantMessage(): Promise<string> {
    const messages = await this.assistantMessages.all()
    if (messages.length === 0) return ''
    const lastMessage = messages[messages.length - 1]
    return (await lastMessage.textContent()) || ''
  }

  async getMessageCount(): Promise<number> {
    return this.messages.count()
  }
}
