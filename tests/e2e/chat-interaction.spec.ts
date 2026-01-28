// tests/e2e/chat-interaction.spec.ts
import { test, expect } from './fixtures'

test.describe('Chat Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('welcome message appears when chat opens', async ({ chatWidget }) => {
    await chatWidget.open()

    // Welcome message should be visible
    const messages = await chatWidget.assistantMessages.count()
    expect(messages).toBeGreaterThanOrEqual(1)

    // Should mention Oak IV
    const welcomeText = await chatWidget.getLastAssistantMessage()
    expect(welcomeText.toLowerCase()).toContain('oak iv')
  })

  test('user can send a message', async ({ chatWidget }) => {
    await chatWidget.open()

    // Send a message
    await chatWidget.sendMessage('What services do you offer?')

    // User message should appear
    await expect(chatWidget.userMessages.last()).toContainText('What services do you offer?')
  })

  test('assistant responds to user message', async ({ chatWidget }) => {
    await chatWidget.open()

    // Count initial messages
    const initialCount = await chatWidget.assistantMessages.count()

    // Send a message
    await chatWidget.sendMessage('Tell me about IV therapy')

    // Wait for response
    await chatWidget.waitForResponse()

    // Should have more assistant messages
    const newCount = await chatWidget.assistantMessages.count()
    expect(newCount).toBeGreaterThan(initialCount)
  })

  test('emergency message triggers safety response', async ({ chatWidget }) => {
    await chatWidget.open()

    // Send emergency message
    await chatWidget.sendMessage('I am having a heart attack')

    // Wait for response
    await chatWidget.waitForResponse()

    // Should mention 911
    const response = await chatWidget.getLastAssistantMessage()
    expect(response).toContain('911')
  })

  test('chat persists messages after close and reopen', async ({ chatWidget }) => {
    await chatWidget.open()

    // Send a message
    await chatWidget.sendMessage('Hello')
    await chatWidget.waitForResponse()

    // Get message count
    const messageCount = await chatWidget.messages.count()

    // Close and reopen
    await chatWidget.close()
    await chatWidget.open()

    // Messages should still be there
    const newMessageCount = await chatWidget.messages.count()
    expect(newMessageCount).toBe(messageCount)
  })

  test('pricing question gets helpful response', async ({ chatWidget }) => {
    await chatWidget.open()

    await chatWidget.sendMessage('How much does the Myers Cocktail cost?')
    await chatWidget.waitForResponse()

    const response = await chatWidget.getLastAssistantMessage()
    // Should mention price or "pricing" or "$"
    expect(response).toMatch(/\$|\d+|price/i)
  })
})
