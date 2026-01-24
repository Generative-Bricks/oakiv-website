/**
 * Oak IV Chat Composable
 *
 * Provides reactive chat state and methods for communicating
 * with the AI Wellness Assistant via the Bedrock Lambda function.
 *
 * Usage:
 * ```vue
 * <script setup>
 * import { useChat } from '@/composables/useChat'
 *
 * const { messages, isLoading, sendMessage, clearChat } = useChat()
 * </script>
 * ```
 */

import { ref, computed } from 'vue'
import type { ChatMessage } from '@/types'

// Chat function URL from Amplify outputs
// This will be populated after deployment
let chatEndpoint: string | null = null

/**
 * Initialize chat endpoint from Amplify outputs
 */
export async function initializeChatEndpoint(): Promise<void> {
  try {
    const outputs = await import('../../amplify_outputs.json')
    const config = outputs.default || outputs
    // The chat function URL is exposed as a custom output
    chatEndpoint = config.custom?.chatFunctionUrl || null

    if (!chatEndpoint) {
      console.warn('Chat function URL not found in Amplify outputs.')
    }
  } catch {
    console.warn('Amplify outputs not available. Chat will use fallback mode.')
  }
}

export function useChat() {
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const sessionId = ref<string | undefined>()
  const error = ref<string | null>(null)

  const hasMessages = computed(() => messages.value.length > 0)

  /**
   * Send a message to the AI assistant
   */
  async function sendMessage(content: string): Promise<void> {
    if (!content.trim()) return

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    }
    messages.value.push(userMessage)

    isLoading.value = true
    error.value = null

    try {
      if (!chatEndpoint) {
        // Initialize if not done yet
        await initializeChatEndpoint()
      }

      if (!chatEndpoint) {
        // Fallback response when backend is not available
        const fallbackMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `Thank you for your message! Our AI assistant is currently being set up. In the meantime, please contact us directly:

- **Email**: info@oakivhydration.com
- **Phone**: (469) 555-1234

We'll be happy to answer your questions about our IV therapy and wellness services!`,
          timestamp: new Date()
        }
        messages.value.push(fallbackMessage)
        return
      }

      const response = await fetch(chatEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: content.trim(),
          sessionId: sessionId.value
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      // Update session ID for conversation continuity
      if (data.sessionId) {
        sessionId.value = data.sessionId
      }

      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }
      messages.value.push(assistantMessage)

    } catch (err) {
      console.error('Chat error:', err)
      error.value = 'Failed to send message'

      // Add error message
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `I'm having trouble connecting right now. Please try again in a moment, or contact Oak IV directly:

- **Email**: info@oakivhydration.com
- **Phone**: (469) 555-1234`,
        timestamp: new Date()
      }
      messages.value.push(errorMessage)

    } finally {
      isLoading.value = false
    }
  }

  /**
   * Clear all messages and reset session
   */
  function clearChat(): void {
    messages.value = []
    sessionId.value = undefined
    error.value = null
  }

  /**
   * Add a welcome message
   */
  function addWelcomeMessage(): void {
    if (messages.value.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Hi there! I'm the Oak IV Wellness Assistant. I can help you with:

- Information about our IV therapy services
- Vitamin injection options
- Wellness consultations
- Event services
- Booking and scheduling questions

How can I help you today?`,
        timestamp: new Date()
      }
      messages.value.push(welcomeMessage)
    }
  }

  return {
    messages,
    isLoading,
    error,
    hasMessages,
    sendMessage,
    clearChat,
    addWelcomeMessage
  }
}
