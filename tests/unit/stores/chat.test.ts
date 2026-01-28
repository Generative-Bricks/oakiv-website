import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useChatStore } from '@/stores/chat'

// Mock crypto.randomUUID
vi.stubGlobal('crypto', {
  randomUUID: () => 'test-uuid-' + Math.random().toString(36).slice(2)
})

describe('useChatStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  describe('initial state', () => {
    it('should start with empty messages', () => {
      const store = useChatStore()
      expect(store.messages).toEqual([])
    })

    it('should start with chat closed', () => {
      const store = useChatStore()
      expect(store.isOpen).toBe(false)
    })

    it('should start with no loading state', () => {
      const store = useChatStore()
      expect(store.isLoading).toBe(false)
    })

    it('should start with no error', () => {
      const store = useChatStore()
      expect(store.error).toBeNull()
    })
  })

  describe('openChat', () => {
    it('should set isOpen to true', () => {
      const store = useChatStore()
      store.openChat()
      expect(store.isOpen).toBe(true)
    })

    it('should add welcome message when opening with no messages', () => {
      const store = useChatStore()
      store.openChat()
      expect(store.messages).toHaveLength(1)
      expect(store.messages[0].role).toBe('assistant')
      expect(store.messages[0].content).toContain('Oak IV Wellness Assistant')
    })

    it('should not add welcome message if messages already exist', () => {
      const store = useChatStore()
      store.openChat()
      const initialLength = store.messages.length
      store.closeChat()
      store.openChat()
      expect(store.messages).toHaveLength(initialLength)
    })
  })

  describe('closeChat', () => {
    it('should set isOpen to false', () => {
      const store = useChatStore()
      store.openChat()
      store.closeChat()
      expect(store.isOpen).toBe(false)
    })
  })

  describe('toggleChat', () => {
    it('should toggle from closed to open', () => {
      const store = useChatStore()
      store.toggleChat()
      expect(store.isOpen).toBe(true)
    })

    it('should toggle from open to closed', () => {
      const store = useChatStore()
      store.openChat()
      store.toggleChat()
      expect(store.isOpen).toBe(false)
    })
  })

  describe('hasMessages getter', () => {
    it('should return false when no messages', () => {
      const store = useChatStore()
      expect(store.hasMessages).toBe(false)
    })

    it('should return true when messages exist', () => {
      const store = useChatStore()
      store.openChat()
      expect(store.hasMessages).toBe(true)
    })
  })

  describe('lastMessage getter', () => {
    it('should return null when no messages', () => {
      const store = useChatStore()
      expect(store.lastMessage).toBeNull()
    })

    it('should return the most recent message', () => {
      const store = useChatStore()
      store.openChat()
      expect(store.lastMessage?.role).toBe('assistant')
    })
  })

  describe('clearChat', () => {
    it('should clear all messages', () => {
      const store = useChatStore()
      store.openChat()
      store.clearChat()
      expect(store.messages).toEqual([])
    })

    it('should reset sessionId', () => {
      const store = useChatStore()
      store.openChat()
      store.clearChat()
      expect(store.sessionId).toBeUndefined()
    })

    it('should reset error', () => {
      const store = useChatStore()
      store.error = 'test error'
      store.clearChat()
      expect(store.error).toBeNull()
    })
  })

  describe('sendMessage - emergency detection', () => {
    it('should detect "emergency" keyword', async () => {
      const store = useChatStore()
      await store.sendMessage('This is an emergency!')

      const lastMsg = store.messages[store.messages.length - 1]
      expect(lastMsg.isEmergency).toBe(true)
      expect(lastMsg.content).toContain('911')
    })

    it('should detect "heart attack" keyword', async () => {
      const store = useChatStore()
      await store.sendMessage('I think I am having a heart attack')

      const lastMsg = store.messages[store.messages.length - 1]
      expect(lastMsg.isEmergency).toBe(true)
    })

    it('should detect "stroke" keyword', async () => {
      const store = useChatStore()
      await store.sendMessage('Signs of a stroke')

      const lastMsg = store.messages[store.messages.length - 1]
      expect(lastMsg.isEmergency).toBe(true)
    })

    it('should detect "911" keyword', async () => {
      const store = useChatStore()
      await store.sendMessage('Should I call 911?')

      const lastMsg = store.messages[store.messages.length - 1]
      expect(lastMsg.isEmergency).toBe(true)
    })

    it('should be case insensitive for emergency detection', async () => {
      const store = useChatStore()
      await store.sendMessage('EMERGENCY help needed')

      const lastMsg = store.messages[store.messages.length - 1]
      expect(lastMsg.isEmergency).toBe(true)
    })
  })

  describe('sendMessage - normal flow', () => {
    it('should add user message immediately', async () => {
      const store = useChatStore()
      const promise = store.sendMessage('Hello')

      // User message should be added before async completes
      expect(store.messages[0].role).toBe('user')
      expect(store.messages[0].content).toBe('Hello')

      vi.runAllTimers()
      await promise
    })

    it('should set isLoading to true during request', async () => {
      const store = useChatStore()
      const promise = store.sendMessage('Hello')

      expect(store.isLoading).toBe(true)

      vi.runAllTimers()
      await promise

      expect(store.isLoading).toBe(false)
    })

    it('should add assistant response after mock delay', async () => {
      const store = useChatStore()
      const promise = store.sendMessage('What are your prices?')

      vi.runAllTimers()
      await promise

      expect(store.messages).toHaveLength(2)
      expect(store.messages[1].role).toBe('assistant')
    })
  })

  describe('sendMessage - mock responses', () => {
    it('should respond to price questions', async () => {
      const store = useChatStore()
      const promise = store.sendMessage('How much does it cost?')

      vi.runAllTimers()
      await promise

      const response = store.messages[1].content
      expect(response).toContain('$')
    })

    it('should respond to Myers Cocktail questions', async () => {
      const store = useChatStore()
      const promise = store.sendMessage('Tell me about the Myers Cocktail')

      vi.runAllTimers()
      await promise

      const response = store.messages[1].content
      expect(response).toContain('Myers Cocktail')
      expect(response).toContain('$175')
    })

    it('should respond to booking questions', async () => {
      const store = useChatStore()
      const promise = store.sendMessage('How do I book an appointment?')

      vi.runAllTimers()
      await promise

      const response = store.messages[1].content
      expect(response).toContain('book')
    })

    it('should respond to location questions', async () => {
      const store = useChatStore()
      const promise = store.sendMessage('Where are you located?')

      vi.runAllTimers()
      await promise

      const response = store.messages[1].content
      expect(response).toContain('DFW')
    })
  })
})
