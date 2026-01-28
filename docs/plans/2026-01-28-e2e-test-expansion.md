# E2E Test Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Expand Playwright E2E tests to cover critical user journeys: booking flow, service detail pages, and chat interactions.

**Architecture:** Page Object Model for reusable selectors + fixtures for common setup. Tests organized by user journey, not page.

**Tech Stack:** Playwright 1.58, TypeScript, Page Object Model pattern

---

## Current State

| File | Tests | Coverage |
|------|-------|----------|
| home.spec.ts | 6 | Hero, nav, footer, mobile |
| navigation.spec.ts | 12 | Routes, titles, 404 |
| contact.spec.ts | 7 | Forms, validation |
| chat.spec.ts | 5 | Toggle, window, input |
| **Total** | **30** | Basic smoke tests |

## Gaps to Address

1. **No Page Object Model** - Selectors duplicated, brittle
2. **No booking flow** - Critical revenue path untested
3. **No service detail tests** - `/services/:slug` untested
4. **No chat interaction tests** - Only UI visibility, not messages
5. **No fixtures** - Each test repeats setup

---

### Task 1: Create Page Object Model Base

**Files:**
- Create: `tests/e2e/pages/base.page.ts`

**Step 1: Write the base page class**

```typescript
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
```

**Step 2: Verify file created**

Run: `cat tests/e2e/pages/base.page.ts`

**Step 3: Commit**

```bash
git add tests/e2e/pages/base.page.ts
git commit -m "test(e2e): add base page object model class"
```

---

### Task 2: Create Home Page Object

**Files:**
- Create: `tests/e2e/pages/home.page.ts`

**Step 1: Write the home page class**

```typescript
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
```

**Step 2: Verify file created**

Run: `cat tests/e2e/pages/home.page.ts`

**Step 3: Commit**

```bash
git add tests/e2e/pages/home.page.ts
git commit -m "test(e2e): add home page object model"
```

---

### Task 3: Create Booking Page Object

**Files:**
- Create: `tests/e2e/pages/booking.page.ts`

**Step 1: Write the booking page class**

```typescript
// tests/e2e/pages/booking.page.ts
import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class BookingPage extends BasePage {
  readonly url = '/book'

  constructor(page: Page) {
    super(page)
  }

  // Selectors
  get serviceSelect(): Locator {
    return this.page.locator('select[name="service"], [data-testid="service-select"]')
  }

  get dateInput(): Locator {
    return this.page.locator('input[type="date"], input[name*="date" i]')
  }

  get timeSelect(): Locator {
    return this.page.locator('select[name="time"], [data-testid="time-select"]')
  }

  get nameInput(): Locator {
    return this.page.locator('input[name="name"]')
  }

  get emailInput(): Locator {
    return this.page.locator('input[name="email"], input[type="email"]')
  }

  get phoneInput(): Locator {
    return this.page.locator('input[name="phone"], input[type="tel"]')
  }

  get addressInput(): Locator {
    return this.page.locator('input[name="address"], textarea[name="address"]')
  }

  get notesInput(): Locator {
    return this.page.locator('textarea[name="notes"]')
  }

  get submitButton(): Locator {
    return this.page.locator('button[type="submit"]')
  }

  get successMessage(): Locator {
    return this.page.locator('[data-testid="success-message"], text=Thank you')
  }

  // Actions
  async goto(preselectedService?: string): Promise<void> {
    const url = preselectedService ? `${this.url}?service=${preselectedService}` : this.url
    await this.page.goto(url)
    await this.waitForPageLoad()
  }

  async selectService(serviceName: string): Promise<void> {
    await this.serviceSelect.selectOption({ label: serviceName })
  }

  async selectDate(date: string): Promise<void> {
    await this.dateInput.fill(date)
  }

  async selectTime(time: string): Promise<void> {
    await this.timeSelect.selectOption({ label: time })
  }

  async fillContactInfo(info: {
    name: string
    email: string
    phone: string
    address?: string
    notes?: string
  }): Promise<void> {
    await this.nameInput.fill(info.name)
    await this.emailInput.fill(info.email)
    await this.phoneInput.fill(info.phone)
    if (info.address) await this.addressInput.fill(info.address)
    if (info.notes) await this.notesInput.fill(info.notes)
  }

  async submit(): Promise<void> {
    await this.submitButton.click()
  }
}
```

**Step 2: Verify file created**

Run: `cat tests/e2e/pages/booking.page.ts`

**Step 3: Commit**

```bash
git add tests/e2e/pages/booking.page.ts
git commit -m "test(e2e): add booking page object model"
```

---

### Task 4: Create Chat Page Object

**Files:**
- Create: `tests/e2e/pages/chat.page.ts`

**Step 1: Write the chat page class**

```typescript
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
```

**Step 2: Verify file created**

Run: `cat tests/e2e/pages/chat.page.ts`

**Step 3: Commit**

```bash
git add tests/e2e/pages/chat.page.ts
git commit -m "test(e2e): add chat widget page object model"
```

---

### Task 5: Create Page Object Barrel Export

**Files:**
- Create: `tests/e2e/pages/index.ts`

**Step 1: Write the barrel export**

```typescript
// tests/e2e/pages/index.ts
export { BasePage } from './base.page'
export { HomePage } from './home.page'
export { BookingPage } from './booking.page'
export { ChatWidget } from './chat.page'
```

**Step 2: Verify file created**

Run: `cat tests/e2e/pages/index.ts`

**Step 3: Commit**

```bash
git add tests/e2e/pages/index.ts
git commit -m "test(e2e): add page object barrel export"
```

---

### Task 6: Create Test Fixtures

**Files:**
- Create: `tests/e2e/fixtures.ts`

**Step 1: Write the fixtures file**

```typescript
// tests/e2e/fixtures.ts
import { test as base } from '@playwright/test'
import { HomePage, BookingPage, ChatWidget } from './pages'

type Fixtures = {
  homePage: HomePage
  bookingPage: BookingPage
  chatWidget: ChatWidget
}

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await use(homePage)
  },
  bookingPage: async ({ page }, use) => {
    const bookingPage = new BookingPage(page)
    await use(bookingPage)
  },
  chatWidget: async ({ page }, use) => {
    const chatWidget = new ChatWidget(page)
    await use(chatWidget)
  }
})

export { expect } from '@playwright/test'
```

**Step 2: Verify file created**

Run: `cat tests/e2e/fixtures.ts`

**Step 3: Commit**

```bash
git add tests/e2e/fixtures.ts
git commit -m "test(e2e): add Playwright fixtures for page objects"
```

---

### Task 7: Create Booking Flow Tests

**Files:**
- Create: `tests/e2e/booking-flow.spec.ts`

**Step 1: Write the booking flow tests**

```typescript
// tests/e2e/booking-flow.spec.ts
import { test, expect } from './fixtures'

test.describe('Booking Flow', () => {
  test('complete booking flow from homepage', async ({ homePage, bookingPage, page }) => {
    // Start from homepage
    await homePage.goto()

    // Click Book Now CTA
    await homePage.clickBookNow()
    await expect(page).toHaveURL(/\/book/)

    // Select a service
    await bookingPage.selectService('Myers Cocktail')

    // Select date (tomorrow)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateStr = tomorrow.toISOString().split('T')[0]
    await bookingPage.selectDate(dateStr)

    // Fill contact info
    await bookingPage.fillContactInfo({
      name: 'Test User',
      email: 'test@example.com',
      phone: '4695551234',
      address: '123 Main St, Dallas, TX 75201'
    })

    // Verify form is filled
    await expect(bookingPage.nameInput).toHaveValue('Test User')
    await expect(bookingPage.emailInput).toHaveValue('test@example.com')
  })

  test('booking with pre-selected service from URL', async ({ bookingPage }) => {
    // Go directly to booking with service pre-selected
    await bookingPage.goto('myers-cocktail')

    // Service should be pre-selected
    await expect(bookingPage.serviceSelect).toHaveValue(/myers/i)
  })

  test('booking form validates required fields', async ({ bookingPage }) => {
    await bookingPage.goto()

    // Try to submit empty form
    await bookingPage.submit()

    // Should show validation (HTML5 or custom)
    const nameInput = bookingPage.nameInput
    const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBe(true)
  })

  test('booking from service detail page', async ({ page }) => {
    // Go to service detail
    await page.goto('/services/myers-cocktail')

    // Click book this service
    await page.click('text=Book This Service, text=Book Now').catch(() => {
      // Fallback selector
      return page.click('a[href*="/book"]')
    })

    // Should navigate to booking with service pre-selected
    await expect(page).toHaveURL(/\/book\?service=myers-cocktail/)
  })
})
```

**Step 2: Run the test to verify it works**

Run: `npx playwright test booking-flow.spec.ts --project=chromium --reporter=list`
Expected: Tests should run (may fail if selectors need adjustment)

**Step 3: Commit**

```bash
git add tests/e2e/booking-flow.spec.ts
git commit -m "test(e2e): add booking flow integration tests"
```

---

### Task 8: Create Service Detail Tests

**Files:**
- Create: `tests/e2e/service-detail.spec.ts`

**Step 1: Write the service detail tests**

```typescript
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
```

**Step 2: Run the test to verify it works**

Run: `npx playwright test service-detail.spec.ts --project=chromium --reporter=list`
Expected: Tests should run

**Step 3: Commit**

```bash
git add tests/e2e/service-detail.spec.ts
git commit -m "test(e2e): add service detail page tests"
```

---

### Task 9: Create Chat Interaction Tests

**Files:**
- Create: `tests/e2e/chat-interaction.spec.ts`

**Step 1: Write the chat interaction tests**

```typescript
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
```

**Step 2: Run the test to verify it works**

Run: `npx playwright test chat-interaction.spec.ts --project=chromium --reporter=list`
Expected: Tests should run

**Step 3: Commit**

```bash
git add tests/e2e/chat-interaction.spec.ts
git commit -m "test(e2e): add chat interaction tests with message flow"
```

---

### Task 10: Run Full E2E Suite and Fix Selectors

**Files:**
- Modify: `tests/e2e/*.spec.ts` as needed

**Step 1: Run full E2E suite**

Run: `npx playwright test --project=chromium --reporter=list`

**Step 2: Fix any failing tests by adjusting selectors**

Review failures and update selectors in page objects or test files to match actual DOM.

**Step 3: Run again to verify all pass**

Run: `npx playwright test --project=chromium`
Expected: All tests pass

**Step 4: Commit fixes**

```bash
git add tests/e2e/
git commit -m "test(e2e): fix selectors for E2E test suite"
```

---

### Task 11: Update CLAUDE.md with E2E Documentation

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Add E2E section to CLAUDE.md**

Add after Testing section:

```markdown
## E2E Testing with Playwright

### Page Object Pattern

```
tests/e2e/
├── pages/              # Page Object Models
│   ├── base.page.ts    # Shared selectors/actions
│   ├── home.page.ts    # Homepage
│   ├── booking.page.ts # Booking form
│   └── chat.page.ts    # Chat widget
├── fixtures.ts         # Test fixtures
├── booking-flow.spec.ts    # User journey tests
├── chat-interaction.spec.ts # Chat behavior tests
└── service-detail.spec.ts   # Service pages
```

### Running E2E Tests

```bash
npx playwright test                    # All tests, all browsers
npx playwright test --project=chromium # Chrome only
npx playwright test --ui               # Interactive UI mode
npx playwright test --headed           # Visible browser
npx playwright test chat-interaction   # Single file
```

### Data Test IDs

Components should use `data-testid` attributes for reliable selectors:
- `data-testid="hero-section"` - Hero section
- `data-testid="chat-toggle"` - Chat open button
- `data-testid="chat-window"` - Chat dialog
- `data-testid="service-card"` - Service cards
```

**Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add E2E testing documentation to CLAUDE.md"
```

---

## Summary

| Task | Description | New Files |
|------|-------------|-----------|
| 1 | Base page object | pages/base.page.ts |
| 2 | Home page object | pages/home.page.ts |
| 3 | Booking page object | pages/booking.page.ts |
| 4 | Chat page object | pages/chat.page.ts |
| 5 | Barrel export | pages/index.ts |
| 6 | Test fixtures | fixtures.ts |
| 7 | Booking flow tests | booking-flow.spec.ts |
| 8 | Service detail tests | service-detail.spec.ts |
| 9 | Chat interaction tests | chat-interaction.spec.ts |
| 10 | Run and fix | (modifications) |
| 11 | Documentation | CLAUDE.md |

**Total new tests:** ~25 additional E2E tests
**New architecture:** Page Object Model with fixtures
