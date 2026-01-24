import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ChatWidget from '@/components/features/ChatWidget.vue'

describe('ChatWidget', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders toggle button when closed', () => {
    const wrapper = mount(ChatWidget)
    expect(wrapper.find('[data-testid="chat-toggle"]').exists()).toBe(true)
  })

  it('shows chat window when opened', async () => {
    const wrapper = mount(ChatWidget)
    await wrapper.find('[data-testid="chat-toggle"]').trigger('click')
    expect(wrapper.find('[data-testid="chat-window"]').exists()).toBe(true)
  })

  it('displays emergency warning banner', async () => {
    const wrapper = mount(ChatWidget)
    await wrapper.find('[data-testid="chat-toggle"]').trigger('click')
    expect(wrapper.find('[data-testid="emergency-banner"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('911')
  })

  it('has input field and send button', async () => {
    const wrapper = mount(ChatWidget)
    await wrapper.find('[data-testid="chat-toggle"]').trigger('click')
    expect(wrapper.find('[data-testid="chat-input"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="chat-send"]').exists()).toBe(true)
  })

  it('displays welcome message when opened', async () => {
    const wrapper = mount(ChatWidget)
    await wrapper.find('[data-testid="chat-toggle"]').trigger('click')
    expect(wrapper.text()).toContain('Oak IV Wellness Assistant')
  })

  it('closes chat window when close button clicked', async () => {
    const wrapper = mount(ChatWidget)
    // Open chat
    await wrapper.find('[data-testid="chat-toggle"]').trigger('click')
    expect(wrapper.find('[data-testid="chat-window"]').exists()).toBe(true)

    // Close chat
    await wrapper.find('[data-testid="chat-close"]').trigger('click')
    expect(wrapper.find('[data-testid="chat-window"]').exists()).toBe(false)
  })
})
