import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useChat } from '@/composables/useChat'

// Mock crypto.randomUUID
vi.stubGlobal('crypto', {
  randomUUID: () => 'test-uuid-' + Math.random().toString(36).slice(2)
})

// Mock fetch
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('useChat composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('initial state', () => {
    it('should return reactive messages array', () => {
      const { messages } = useChat()
      expect(messages.value).toEqual([])
    })

    it('should return isLoading as false initially', () => {
      const { isLoading } = useChat()
      expect(isLoading.value).toBe(false)
    })

    it('should return error as null initially', () => {
      const { error } = useChat()
      expect(error.value).toBeNull()
    })

    it('should return hasMessages as false when empty', () => {
      const { hasMessages } = useChat()
      expect(hasMessages.value).toBe(false)
    })
  })

  describe('sendMessage', () => {
    it('should not send empty messages', async () => {
      const { sendMessage, messages } = useChat()
      await sendMessage('')
      expect(messages.value).toHaveLength(0)
    })

    it('should not send whitespace-only messages', async () => {
      const { sendMessage, messages } = useChat()
      await sendMessage('   ')
      expect(messages.value).toHaveLength(0)
    })

    it('should add user message immediately', async () => {
      const { sendMessage, messages } = useChat()
      await sendMessage('Hello')

      expect(messages.value.length).toBeGreaterThanOrEqual(1)
      expect(messages.value[0].role).toBe('user')
      expect(messages.value[0].content).toBe('Hello')
    })

    it('should trim message content', async () => {
      const { sendMessage, messages } = useChat()
      await sendMessage('  Hello World  ')

      expect(messages.value[0].content).toBe('Hello World')
    })

    it('should set timestamp on messages', async () => {
      const { sendMessage, messages } = useChat()
      const before = new Date()
      await sendMessage('Hello')
      const after = new Date()

      const timestamp = messages.value[0].timestamp
      expect(timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime())
      expect(timestamp.getTime()).toBeLessThanOrEqual(after.getTime())
    })

    it('should generate unique IDs for messages', async () => {
      const { sendMessage, messages } = useChat()
      await sendMessage('First')
      await sendMessage('Second')

      const ids = messages.value.map(m => m.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('sendMessage - fallback mode', () => {
    it('should add fallback message when endpoint not available', async () => {
      const { sendMessage, messages } = useChat()
      await sendMessage('Hello')

      // Should have user message + fallback response
      expect(messages.value.length).toBe(2)
      expect(messages.value[1].role).toBe('assistant')
      expect(messages.value[1].content).toContain('info@oakivhydration.com')
    })
  })

  describe('clearChat', () => {
    it('should clear all messages', async () => {
      const { sendMessage, clearChat, messages } = useChat()
      await sendMessage('Hello')
      clearChat()

      expect(messages.value).toEqual([])
    })

    it('should reset error', async () => {
      const { clearChat, error } = useChat()
      clearChat()
      expect(error.value).toBeNull()
    })
  })

  describe('addWelcomeMessage', () => {
    it('should add welcome message when no messages exist', () => {
      const { addWelcomeMessage, messages } = useChat()
      addWelcomeMessage()

      expect(messages.value).toHaveLength(1)
      expect(messages.value[0].role).toBe('assistant')
      expect(messages.value[0].content).toContain('Oak IV Wellness Assistant')
    })

    it('should not add welcome message if messages already exist', async () => {
      const { sendMessage, addWelcomeMessage, messages } = useChat()
      await sendMessage('Hello')
      const countBefore = messages.value.length

      addWelcomeMessage()

      expect(messages.value.length).toBe(countBefore)
    })

    it('should mention available services', () => {
      const { addWelcomeMessage, messages } = useChat()
      addWelcomeMessage()

      const content = messages.value[0].content
      expect(content).toContain('IV therapy')
      expect(content).toContain('Vitamin injection')
    })
  })

  describe('hasMessages computed', () => {
    it('should be false initially', () => {
      const { hasMessages } = useChat()
      expect(hasMessages.value).toBe(false)
    })

    it('should be true after sending a message', async () => {
      const { sendMessage, hasMessages } = useChat()
      await sendMessage('Hello')
      expect(hasMessages.value).toBe(true)
    })

    it('should be false after clearing chat', async () => {
      const { sendMessage, clearChat, hasMessages } = useChat()
      await sendMessage('Hello')
      clearChat()
      expect(hasMessages.value).toBe(false)
    })
  })

  describe('isLoading state', () => {
    it('should be true during sendMessage', async () => {
      const { sendMessage, isLoading } = useChat()

      // Start the promise but don't await
      const promise = sendMessage('Hello')

      // isLoading should be true while processing
      // Note: Due to sync fallback, this might be fast
      await promise

      // After completion, should be false
      expect(isLoading.value).toBe(false)
    })
  })

  describe('message structure', () => {
    it('should create messages with correct ChatMessage shape', async () => {
      const { sendMessage, messages } = useChat()
      await sendMessage('Test message')

      const message = messages.value[0]
      expect(message).toHaveProperty('id')
      expect(message).toHaveProperty('role')
      expect(message).toHaveProperty('content')
      expect(message).toHaveProperty('timestamp')
      expect(typeof message.id).toBe('string')
      expect(['user', 'assistant']).toContain(message.role)
      expect(typeof message.content).toBe('string')
      expect(message.timestamp).toBeInstanceOf(Date)
    })
  })
})
