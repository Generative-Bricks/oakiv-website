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
