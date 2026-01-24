import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ChatMessage } from '@/types'

/**
 * Chat Store
 *
 * Manages chat state for the AI Wellness Assistant.
 * Handles message history, loading states, and session management.
 */
export const useChatStore = defineStore('chat', () => {
  // State
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const sessionId = ref<string | undefined>()
  const isOpen = ref(false)

  // Getters
  const hasMessages = computed(() => messages.value.length > 0)

  const lastMessage = computed(() =>
    messages.value.length > 0 ? messages.value[messages.value.length - 1] : null
  )

  // Actions
  function openChat() {
    isOpen.value = true
    // Add welcome message if no messages
    if (messages.value.length === 0) {
      addAssistantMessage(
        "Hi! I'm the Oak IV Wellness Assistant. I can help you learn about our IV therapy and vitamin injection services, answer questions about treatments, or help you decide which service might be right for you. How can I help you today?"
      )
    }
  }

  function closeChat() {
    isOpen.value = false
  }

  function toggleChat() {
    if (isOpen.value) {
      closeChat()
    } else {
      openChat()
    }
  }

  function addUserMessage(content: string) {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date()
    }
    messages.value.push(message)
  }

  function addAssistantMessage(content: string, isEmergency = false) {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      isEmergency
    }
    messages.value.push(message)
  }

  async function sendMessage(content: string) {
    // Check for emergency keywords first
    const emergencyKeywords = [
      'emergency', 'heart attack', 'stroke', "can't breathe",
      'severe pain', 'unconscious', 'bleeding heavily', '911', 'dying'
    ]

    const isEmergency = emergencyKeywords.some(kw =>
      content.toLowerCase().includes(kw)
    )

    if (isEmergency) {
      addUserMessage(content)
      addAssistantMessage(
        "⚠️ EMERGENCY: If you're experiencing a medical emergency, please call 911 immediately. Do not wait for online assistance. Oak IV provides wellness services but cannot help with medical emergencies.",
        true
      )
      return
    }

    addUserMessage(content)
    isLoading.value = true
    error.value = null

    try {
      // TODO: Replace with actual Bedrock API call when backend is deployed
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: content, sessionId: sessionId.value })
      // })
      // const data = await response.json()
      // sessionId.value = data.sessionId
      // addAssistantMessage(data.response)

      // Mock response for development
      await mockChatResponse(content)
    } catch (e) {
      error.value = 'Failed to send message'
      console.error('Chat error:', e)
      addAssistantMessage(
        "I'm having trouble connecting right now. Please try again later or contact Oak IV directly at info@oakivhydration.com or (469) 630-6565."
      )
    } finally {
      isLoading.value = false
    }
  }

  function clearChat() {
    messages.value = []
    sessionId.value = undefined
    error.value = null
  }

  // Mock chat response for development
  async function mockChatResponse(userMessage: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500))

    const lowerMessage = userMessage.toLowerCase()

    // Simple keyword matching for mock responses
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      addAssistantMessage(
        "Our IV therapy services range from $125 for basic Hydration Therapy to $225 for specialty treatments like Beauty Glow. Vitamin injections start at just $35 for a B12 boost. Would you like details about a specific treatment?"
      )
    } else if (lowerMessage.includes('myers') || lowerMessage.includes('cocktail')) {
      addAssistantMessage(
        "The Myers Cocktail is our signature IV blend at $175. It includes Vitamin C, B-Complex, Magnesium, and Calcium for overall wellness, energy, and immune support. It takes about 45-60 minutes and is great for general wellness maintenance. Would you like to book this treatment?"
      )
    } else if (lowerMessage.includes('hangover') || lowerMessage.includes('dehydrated')) {
      addAssistantMessage(
        "For recovery from dehydration or hangovers, I'd recommend our Hydration Therapy ($125) for pure rehydration, or the Myers Cocktail ($175) for hydration plus vitamins and energy support. Both can help you feel better quickly! Which interests you?"
      )
    } else if (lowerMessage.includes('immune') || lowerMessage.includes('sick') || lowerMessage.includes('cold') || lowerMessage.includes('flu')) {
      addAssistantMessage(
        "Our Immunity Drip ($195) is perfect for boosting your immune system! It features high-dose Vitamin C, Zinc, and Glutathione. Great for when you're feeling under the weather or want to strengthen your defenses during cold and flu season."
      )
    } else if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
      addAssistantMessage(
        "Great! You can book an appointment through our booking page. We offer mobile services throughout the DFW Metroplex - we come to your home, office, or event venue! Would you like me to direct you to our booking page?"
      )
    } else if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('area')) {
      addAssistantMessage(
        "Oak IV is a mobile IV therapy service - we come to you! We serve the entire DFW Metroplex including Dallas, Fort Worth, Plano, Frisco, McKinney, Richardson, and surrounding areas. Just let us know your location when you book!"
      )
    } else {
      addAssistantMessage(
        "Thanks for your question! I can help you with information about our IV therapy treatments, vitamin injections, pricing, or booking. What would you like to know more about?"
      )
    }
  }

  return {
    // State
    messages,
    isLoading,
    error,
    sessionId,
    isOpen,
    // Getters
    hasMessages,
    lastMessage,
    // Actions
    openChat,
    closeChat,
    toggleChat,
    sendMessage,
    clearChat
  }
})
