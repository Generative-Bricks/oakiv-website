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
