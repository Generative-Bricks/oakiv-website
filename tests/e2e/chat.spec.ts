import { test, expect } from '@playwright/test'

test.describe('Chat Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('chat toggle button is visible', async ({ page }) => {
    const chatToggle = page.locator('[data-testid="chat-toggle"], button[aria-label*="chat" i]')
    await expect(chatToggle).toBeVisible()
  })

  test('clicking chat toggle opens chat window', async ({ page }) => {
    const chatToggle = page.locator('[data-testid="chat-toggle"], button[aria-label*="chat" i]')
    await chatToggle.click()

    // Chat window should appear
    const chatWindow = page.locator('[data-testid="chat-window"], [role="dialog"]')
    await expect(chatWindow).toBeVisible()
  })

  test('chat window has emergency banner', async ({ page }) => {
    const chatToggle = page.locator('[data-testid="chat-toggle"], button[aria-label*="chat" i]')
    await chatToggle.click()

    // Emergency banner should be visible
    const emergencyBanner = page.locator('[data-testid="emergency-banner"], text=911')
    await expect(emergencyBanner).toBeVisible()
  })

  test('chat window can be closed', async ({ page }) => {
    const chatToggle = page.locator('[data-testid="chat-toggle"], button[aria-label*="chat" i]')
    await chatToggle.click()

    // Chat window should be open
    const chatWindow = page.locator('[data-testid="chat-window"], [role="dialog"]')
    await expect(chatWindow).toBeVisible()

    // Close button
    const closeButton = page.locator('[data-testid="chat-window"] button >> nth=0, [role="dialog"] button >> nth=0')
    await closeButton.click()

    // Chat window should be hidden, toggle should be visible again
    await expect(chatToggle).toBeVisible()
  })

  test('chat has input field and send button', async ({ page }) => {
    const chatToggle = page.locator('[data-testid="chat-toggle"], button[aria-label*="chat" i]')
    await chatToggle.click()

    // Input field
    const input = page.locator('[data-testid="chat-window"] input, [role="dialog"] input')
    await expect(input).toBeVisible()

    // Send button
    const sendButton = page.locator('[data-testid="chat-window"] button[type="submit"], text=Send')
    await expect(sendButton).toBeVisible()
  })
})
