<template>
  <article class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <!-- Image -->
    <div v-if="service.image" class="aspect-[4/3] overflow-hidden">
      <img
        :src="service.image"
        :alt="service.name"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>

    <!-- Placeholder if no image -->
    <div
      v-else
      class="aspect-[4/3] bg-gradient-to-br from-oak-green-pale to-oak-green-light/20 flex items-center justify-center"
    >
      <svg class="w-16 h-16 text-oak-green-primary/30" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.5 12c0 .88-.18 1.72-.5 2.5l2.1 2.1c.6-1.3.9-2.9.9-4.6s-.3-3.3-.9-4.6l-2.1 2.1c.32.78.5 1.62.5 2.5zM12 5.5c3.59 0 6.5 2.91 6.5 6.5 0 .88-.18 1.72-.5 2.5l2.1 2.1C20.7 15.3 21 13.7 21 12c0-4.97-4.03-9-9-9-1.7 0-3.3.3-4.6.9l2.1 2.1c.78-.32 1.62-.5 2.5-.5zm-7.5 6.5c0-.88.18-1.72.5-2.5L2.9 7.4C2.3 8.7 2 10.3 2 12s.3 3.3.9 4.6l2.1-2.1c-.32-.78-.5-1.62-.5-2.5zM12 18.5c-3.59 0-6.5-2.91-6.5-6.5 0-.88.18-1.72.5-2.5L3.9 7.4C3.3 8.7 3 10.3 3 12c0 4.97 4.03 9 9 9 1.7 0 3.3-.3 4.6-.9l-2.1-2.1c-.78.32-1.62.5-2.5.5z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Header with name and price -->
      <div class="flex items-start justify-between mb-3">
        <h3 class="font-display text-xl font-semibold text-oak-text">
          {{ service.name }}
        </h3>
        <div class="text-right flex-shrink-0 ml-4">
          <span v-if="service.priceNote" class="text-xs text-oak-text-light block">
            {{ service.priceNote }}
          </span>
          <span class="text-oak-gold font-bold text-lg">
            ${{ service.price }}
          </span>
        </div>
      </div>

      <!-- Duration -->
      <div v-if="service.duration" class="flex items-center gap-1 text-sm text-oak-text-light mb-3">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ service.duration }}
      </div>

      <!-- Description -->
      <p class="text-oak-text-light mb-4 line-clamp-2">
        {{ service.shortDescription }}
      </p>

      <!-- Benefits -->
      <ul v-if="service.benefits?.length" class="mb-4 space-y-1">
        <li
          v-for="benefit in displayedBenefits"
          :key="benefit"
          class="flex items-center text-sm text-oak-text-light"
        >
          <svg class="w-4 h-4 mr-2 text-oak-green-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          {{ benefit }}
        </li>
      </ul>

      <!-- Learn More Link -->
      <router-link
        :to="`/services/${service.slug}`"
        data-testid="service-link"
        class="inline-flex items-center text-oak-green-primary font-semibold hover:text-oak-green-light transition-colors group"
      >
        Learn More
        <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Service } from '@/types'

const props = defineProps<{
  service: Service
}>()

const displayedBenefits = computed(() => {
  return props.service.benefits?.slice(0, 3) || []
})
</script>
