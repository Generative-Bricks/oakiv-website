import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceCard from '@/components/features/ServiceCard.vue'
import type { Service } from '@/types'

const mockService: Service = {
  id: '1',
  category: 'iv-therapy',
  name: 'Myers Cocktail',
  slug: 'myers-cocktail',
  shortDescription: 'Our signature IV blend for overall wellness and energy boost.',
  fullDescription: 'The Myers Cocktail is our most popular IV therapy treatment...',
  price: 175,
  benefits: ['Hydration', 'Energy boost', 'Immune support', 'Vitamin replenishment'],
  ingredients: ['Vitamin C', 'B-Complex', 'Magnesium', 'Calcium'],
  featured: true,
  sortOrder: 1,
  active: true
}

describe('ServiceCard', () => {
  const stubs = {
    'router-link': {
      template: '<a :href="to"><slot /></a>',
      props: ['to']
    }
  }

  it('displays service name', () => {
    const wrapper = mount(ServiceCard, {
      props: { service: mockService },
      global: { stubs }
    })
    expect(wrapper.text()).toContain('Myers Cocktail')
  })

  it('displays price', () => {
    const wrapper = mount(ServiceCard, {
      props: { service: mockService },
      global: { stubs }
    })
    expect(wrapper.text()).toContain('$175')
  })

  it('displays short description', () => {
    const wrapper = mount(ServiceCard, {
      props: { service: mockService },
      global: { stubs }
    })
    expect(wrapper.text()).toContain('Our signature IV blend')
  })

  it('displays benefits list', () => {
    const wrapper = mount(ServiceCard, {
      props: { service: mockService },
      global: { stubs }
    })
    expect(wrapper.text()).toContain('Hydration')
    expect(wrapper.text()).toContain('Energy boost')
  })

  it('limits benefits shown to 3', () => {
    const wrapper = mount(ServiceCard, {
      props: { service: mockService },
      global: { stubs }
    })
    // Should show first 3 benefits
    expect(wrapper.text()).toContain('Hydration')
    expect(wrapper.text()).toContain('Energy boost')
    expect(wrapper.text()).toContain('Immune support')
    // Fourth benefit should not be directly visible in the list
  })

  it('links to service detail page', () => {
    const wrapper = mount(ServiceCard, {
      props: { service: mockService },
      global: { stubs }
    })
    const link = wrapper.find('[data-testid="service-link"]')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/services/myers-cocktail')
  })

  it('shows price note when provided', () => {
    const serviceWithNote = {
      ...mockService,
      priceNote: 'Starting at'
    }
    const wrapper = mount(ServiceCard, {
      props: { service: serviceWithNote },
      global: { stubs }
    })
    expect(wrapper.text()).toContain('Starting at')
  })

  it('shows duration when provided', () => {
    const serviceWithDuration = {
      ...mockService,
      duration: '45-60 min'
    }
    const wrapper = mount(ServiceCard, {
      props: { service: serviceWithDuration },
      global: { stubs }
    })
    expect(wrapper.text()).toContain('45-60 min')
  })
})
