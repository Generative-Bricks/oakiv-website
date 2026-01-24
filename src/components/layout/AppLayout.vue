<template>
  <div class="min-h-screen flex flex-col bg-oak-cream">
    <AppHeader />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />

    <!-- AI Wellness Assistant Chat Widget -->
    <ChatWidget />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import { ChatWidget } from '@/components/features'
</script>
