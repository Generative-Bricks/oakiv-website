<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Toggle Button -->
    <button
      v-if="!chatStore.isOpen"
      @click="chatStore.openChat()"
      data-testid="chat-toggle"
      class="w-14 h-14 bg-oak-green-primary text-white rounded-full shadow-lg hover:bg-oak-green-light transition-all duration-200 flex items-center justify-center hover:scale-105"
      aria-label="Open chat"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </button>

    <!-- Chat Window -->
    <div
      v-else
      data-testid="chat-window"
      class="w-96 h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
    >
      <!-- Header -->
      <div class="bg-oak-green-primary text-white p-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold">Oak IV Wellness Assistant</h3>
            <p class="text-sm text-white/80">Ask me about our services</p>
          </div>
        </div>
        <button
          @click="chatStore.closeChat()"
          data-testid="chat-close"
          class="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Close chat"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Emergency Banner -->
      <div
        data-testid="emergency-banner"
        class="bg-red-600 text-white px-4 py-2 text-sm text-center font-medium"
      >
        <span class="mr-1">&#9888;</span>
        Medical Emergency? Call 911 immediately
      </div>

      <!-- Messages Container -->
      <div
        ref="messagesContainer"
        class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        <div
          v-for="message in chatStore.messages"
          :key="message.id"
          :class="[
            'max-w-[85%] p-3 rounded-2xl',
            message.role === 'user'
              ? 'bg-oak-green-primary text-white ml-auto rounded-br-sm'
              : message.isEmergency
                ? 'bg-red-100 text-red-800 border border-red-200 rounded-bl-sm'
                : 'bg-white text-oak-text shadow-sm rounded-bl-sm'
          ]"
        >
          <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ message.content }}</p>
          <span
            :class="[
              'text-xs mt-1 block',
              message.role === 'user' ? 'text-white/70' : 'text-oak-text-light'
            ]"
          >
            {{ formatTime(message.timestamp) }}
          </span>
        </div>

        <!-- Loading indicator -->
        <div v-if="chatStore.isLoading" class="flex items-center gap-2 text-oak-text-light">
          <div class="flex gap-1">
            <div class="w-2 h-2 bg-oak-green-primary rounded-full animate-bounce [animation-delay:0ms]" />
            <div class="w-2 h-2 bg-oak-green-primary rounded-full animate-bounce [animation-delay:150ms]" />
            <div class="w-2 h-2 bg-oak-green-primary rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
          <span class="text-sm">Thinking...</span>
        </div>
      </div>

      <!-- Input Form -->
      <form @submit.prevent="handleSubmit" class="p-4 border-t bg-white">
        <div class="flex gap-2">
          <input
            v-model="inputMessage"
            data-testid="chat-input"
            type="text"
            placeholder="Ask about our services..."
            class="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-oak-green-primary focus:border-transparent text-sm"
            :disabled="chatStore.isLoading"
          />
          <button
            type="submit"
            data-testid="chat-send"
            :disabled="!inputMessage.trim() || chatStore.isLoading"
            class="px-4 py-2 bg-oak-green-primary text-white rounded-full hover:bg-oak-green-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        <!-- Disclaimer -->
        <p class="text-xs text-oak-text-light mt-2 text-center">
          I'm an AI assistant and cannot provide medical advice.
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const inputMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

async function handleSubmit() {
  if (!inputMessage.value.trim() || chatStore.isLoading) return

  const message = inputMessage.value.trim()
  inputMessage.value = ''

  await chatStore.sendMessage(message)
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date)
}

// Auto-scroll to bottom when new messages arrive
watch(
  () => chatStore.messages.length,
  async () => {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }
)
</script>

<style scoped>
@keyframes animate-in {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: animate-in 0.2s ease-out;
}
</style>
