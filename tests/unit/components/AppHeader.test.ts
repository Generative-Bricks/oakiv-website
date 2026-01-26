import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '@/components/layout/AppHeader.vue'

describe('AppHeader', () => {
  const stubs = {
    'router-link': {
      template: '<a :href="to"><slot /></a>',
      props: ['to']
    }
  }

  it('renders logo', () => {
    const wrapper = mount(AppHeader, { global: { stubs } })
    expect(wrapper.find('[data-testid="logo"]').exists()).toBe(true)
  })

  it('renders navigation links', () => {
    const wrapper = mount(AppHeader, { global: { stubs } })
    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('has book now CTA button', () => {
    const wrapper = mount(AppHeader, { global: { stubs } })
    expect(wrapper.find('[data-testid="book-cta"]').exists()).toBe(true)
  })

  it('renders logo with proper alt text', () => {
    const wrapper = mount(AppHeader, { global: { stubs } })
    const logo = wrapper.find('[data-testid="logo"] img')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('alt')).toContain('Oak IV')
  })

  it('has mobile menu button', () => {
    const wrapper = mount(AppHeader, { global: { stubs } })
    expect(wrapper.find('[data-testid="mobile-menu-btn"]').exists()).toBe(true)
  })

  it('toggles mobile menu on button click', async () => {
    const wrapper = mount(AppHeader, { global: { stubs } })
    const menuBtn = wrapper.find('[data-testid="mobile-menu-btn"]')
    const mobileMenu = wrapper.find('[data-testid="mobile-menu"]')

    // Menu should be hidden initially (v-show adds display:none)
    expect(mobileMenu.attributes('style')).toContain('display: none')

    // Click to open
    await menuBtn.trigger('click')
    expect(mobileMenu.attributes('style')).not.toContain('display: none')

    // Click to close
    await menuBtn.trigger('click')
    expect(mobileMenu.attributes('style')).toContain('display: none')
  })
})
