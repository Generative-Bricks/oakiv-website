// tests/e2e/chat-interaction.spec.ts
import { test, expect } from './fixtures'

test.describe('Chat Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('welcome message appears when chat opens', async ({ chatWidget, page }) => {
    await chatWidget.open()

    // Wait for messages to render
    await page.waitForTimeout(500)

    // Welcome message should be visible (check for Oak IV text)
    const welcomeMessage = chatWidget.messagesContainer.locator('text=Oak IV')
    await expect(welcomeMessage).toBeVisible({ timeout: 5000 })
  })

  test('user can send a message', async ({ chatWidget, page }) => {
    await chatWidget.open()
    await page.waitForTimeout(300)

    // Send a message
    await chatWidget.sendMessage('What services do you offer?')

    // User message should appear
    await expect(chatWidget.userMessages.last()).toContainText('What services do you offer?')
  })

  test('chat toggle opens and closes window', async ({ chatWidget }) => {
    // Initially closed
    await expect(chatWidget.window).not.toBeVisible()

    // Open chat
    await chatWidget.open()
    await expect(chatWidget.window).toBeVisible()

    // Close chat
    await chatWidget.close()
    await expect(chatWidget.window).not.toBeVisible()
  })

  test('emergency banner is visible when chat opens', async ({ chatWidget }) => {
    await chatWidget.open()

    // Emergency banner should be visible with 911 text
    await expect(chatWidget.emergencyBanner).toBeVisible()
    await expect(chatWidget.emergencyBanner).toContainText('911')
  })

  test('chat input and send button are functional', async ({ chatWidget }) => {
    await chatWidget.open()

    // Input should be visible and enabled
    await expect(chatWidget.messageInput).toBeVisible()
    await expect(chatWidget.messageInput).toBeEnabled()

    // Send button should be visible
    await expect(chatWidget.sendButton).toBeVisible()

    // Type a message
    await chatWidget.messageInput.fill('Test message')
    await expect(chatWidget.messageInput).toHaveValue('Test message')
  })

  test('chat persists messages after close and reopen', async ({ chatWidget, page }) => {
    await chatWidget.open()
    await page.waitForTimeout(300)

    // Send a message
    await chatWidget.sendMessage('Hello')

    // Wait for user message to appear
    await expect(chatWidget.userMessages.last()).toContainText('Hello')

    // Get message count
    const messageCount = await chatWidget.getMessageCount()
    expect(messageCount).toBeGreaterThan(0)

    // Close and reopen
    await chatWidget.close()
    await chatWidget.open()
    await page.waitForTimeout(300)

    // Messages should still be there
    const newMessageCount = await chatWidget.getMessageCount()
    expect(newMessageCount).toBe(messageCount)
  })
})
