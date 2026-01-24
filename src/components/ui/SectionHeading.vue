<template>
  <div :class="['text-center', { 'mb-12': !noMargin }]">
    <span
      v-if="eyebrow"
      class="inline-block text-oak-gold text-sm font-semibold tracking-wider uppercase mb-2"
    >
      {{ eyebrow }}
    </span>
    <component
      :is="tag"
      :class="[
        'font-display text-oak-text',
        sizeClasses
      ]"
    >
      {{ title }}
    </component>
    <p
      v-if="subtitle"
      class="text-oak-text-light mt-4 max-w-2xl mx-auto"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  subtitle?: string
  eyebrow?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  noMargin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'h2',
  size: 'lg',
  noMargin: false
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl',
    xl: 'text-4xl md:text-5xl lg:text-6xl'
  }
  return sizes[props.size]
})
</script>
