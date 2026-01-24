import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/ui/BaseButton.vue'

describe('BaseButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click Me' }
    })
    expect(wrapper.text()).toContain('Click Me')
  })

  it('applies primary variant by default', () => {
    const wrapper = mount(BaseButton)
    expect(wrapper.classes()).toContain('bg-oak-green-primary')
  })

  it('applies secondary variant when specified', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'secondary' }
    })
    expect(wrapper.classes()).toContain('bg-oak-gold')
  })

  it('applies outline variant when specified', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'outline' }
    })
    expect(wrapper.classes()).toContain('border-oak-green-primary')
  })

  it('applies ghost variant when specified', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'ghost' }
    })
    expect(wrapper.classes()).toContain('text-oak-green-primary')
  })

  it('applies small size when specified', () => {
    const wrapper = mount(BaseButton, {
      props: { size: 'sm' }
    })
    expect(wrapper.classes()).toContain('text-sm')
  })

  it('applies large size when specified', () => {
    const wrapper = mount(BaseButton, {
      props: { size: 'lg' }
    })
    expect(wrapper.classes()).toContain('text-lg')
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('opacity-50')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
