// tests/e2e/pages/booking.page.ts
import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class BookingPage extends BasePage {
  readonly url = '/book'

  constructor(page: Page) {
    super(page)
  }

  // Step indicators
  get currentStep(): Locator {
    return this.page.locator('.bg-oak-green-primary.text-white.rounded-full.w-10.h-10')
  }

  // Step 1: Service Selection
  get serviceCards(): Locator {
    return this.page.locator('.border-2.rounded-xl.cursor-pointer')
  }

  get selectedServiceCard(): Locator {
    return this.page.locator('.border-oak-green-primary.bg-oak-green-pale')
  }

  get preselectedServiceSummary(): Locator {
    // Summary card shown when service is pre-selected via URL
    return this.page.locator('text=Selected Service').locator('xpath=ancestor::div[contains(@class, "border-oak-green-primary")]')
  }

  get selectedServiceName(): Locator {
    return this.page.locator('text=Selected Service').locator('..').locator('h3')
  }

  async hasPreselectedService(): Promise<boolean> {
    return this.preselectedServiceSummary.isVisible()
  }

  get continueButton(): Locator {
    return this.page.locator('button:has-text("Continue")')
  }

  get changeServiceButton(): Locator {
    return this.page.locator('button:has-text("Change Service")')
  }

  // Step 2: Contact Details
  get firstNameInput(): Locator {
    return this.page.locator('#firstName')
  }

  get lastNameInput(): Locator {
    return this.page.locator('#lastName')
  }

  get emailInput(): Locator {
    return this.page.locator('#email')
  }

  get phoneInput(): Locator {
    return this.page.locator('#phone')
  }

  get addressInput(): Locator {
    return this.page.locator('#address')
  }

  get preferredDateInput(): Locator {
    return this.page.locator('#preferredDate')
  }

  get preferredTimeSelect(): Locator {
    return this.page.locator('#preferredTime')
  }

  get notesInput(): Locator {
    return this.page.locator('#notes')
  }

  // Step 3: Confirmation
  get confirmButton(): Locator {
    return this.page.locator('button:has-text("Confirm"), button:has-text("Submit")')
  }

  get successMessage(): Locator {
    // Match any success-related text
    return this.page.locator('text=/Thank you|confirmed|success/i')
  }

  // Actions
  async goto(preselectedService?: string): Promise<void> {
    const url = preselectedService ? `${this.url}?service=${preselectedService}` : this.url
    await this.page.goto(url)
    await this.waitForPageLoad()
  }

  async selectServiceByName(serviceName: string): Promise<void> {
    // Click on the service card containing the service name
    const serviceCard = this.page.locator(`.border-2.rounded-xl.cursor-pointer:has-text("${serviceName}")`)
    await serviceCard.click()
  }

  async selectServiceByIndex(index: number): Promise<void> {
    await this.serviceCards.nth(index).click()
  }

  async isServiceSelected(serviceName: string): Promise<boolean> {
    const selected = this.page.locator(`.border-oak-green-primary:has-text("${serviceName}")`)
    return selected.isVisible()
  }

  async getSelectedServiceName(): Promise<string> {
    const selectedBadge = this.page.locator('text=Selected').first()
    if (await selectedBadge.isVisible()) {
      // Get the service name from the parent card
      const card = selectedBadge.locator('xpath=ancestor::div[contains(@class, "border-oak-green-primary")]')
      const nameElement = card.locator('h3').first()
      return (await nameElement.textContent()) || ''
    }
    return ''
  }

  async proceedToStep2(): Promise<void> {
    await this.continueButton.click()
    // Wait for step 2 to be visible
    await this.firstNameInput.waitFor({ state: 'visible' })
  }

  async fillContactInfo(info: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address?: string
  }): Promise<void> {
    await this.firstNameInput.fill(info.firstName)
    await this.lastNameInput.fill(info.lastName)
    await this.emailInput.fill(info.email)
    await this.phoneInput.fill(info.phone)
    if (info.address) {
      await this.addressInput.fill(info.address)
    }
  }

  async fillScheduleInfo(info: {
    date: string
    time: string
    notes?: string
  }): Promise<void> {
    await this.preferredDateInput.fill(info.date)
    await this.preferredTimeSelect.selectOption(info.time)
    if (info.notes) {
      await this.notesInput.fill(info.notes)
    }
  }

  async proceedToStep3(): Promise<void> {
    await this.continueButton.click()
  }

  async submitBooking(): Promise<void> {
    await this.confirmButton.click()
  }
}
