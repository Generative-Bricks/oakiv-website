<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="min-h-[60vh] flex items-center justify-center">
      <div class="text-center">
        <div class="w-12 h-12 border-4 border-oak-green-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-oak-text-light">Loading service details...</p>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!service" class="min-h-[60vh] flex items-center justify-center">
      <div class="text-center">
        <h1 class="font-display text-4xl text-oak-text mb-4">Service Not Found</h1>
        <p class="text-oak-text-light mb-8">The service you're looking for doesn't exist or has been removed.</p>
        <router-link
          to="/services"
          class="inline-flex px-6 py-3 bg-oak-green-primary text-white rounded-lg font-semibold hover:bg-oak-green-light transition-colors"
        >
          View All Services
        </router-link>
      </div>
    </div>

    <!-- Service Content -->
    <template v-else>
      <!-- Hero Section -->
      <section class="bg-oak-green-pale py-16">
        <div class="container mx-auto px-4">
          <router-link
            to="/services"
            class="inline-flex items-center text-oak-green-primary hover:text-oak-green-light transition-colors mb-6"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </router-link>
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span class="inline-block text-oak-gold text-sm font-semibold tracking-wider uppercase mb-2">
                {{ getCategoryLabel(service.category) }}
              </span>
              <h1 class="font-display text-4xl md:text-5xl text-oak-text mb-4">{{ service.name }}</h1>
              <p class="text-xl text-oak-text-light mb-6">{{ service.shortDescription }}</p>
              <div class="flex items-center gap-6 mb-8">
                <div>
                  <span class="text-3xl font-bold text-oak-gold">${{ service.price }}</span>
                  <span v-if="service.priceNote" class="text-oak-text-light text-sm ml-2">{{ service.priceNote }}</span>
                </div>
                <div v-if="service.duration" class="text-oak-text-light">
                  <svg class="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ service.duration }}
                </div>
              </div>
              <router-link
                to="/book"
                class="inline-flex px-8 py-4 bg-oak-green-primary text-white rounded-lg text-lg font-semibold hover:bg-oak-green-light transition-colors"
              >
                Book This Service
              </router-link>
            </div>
            <div v-if="service.image" class="hidden lg:block">
              <img :src="service.image" :alt="service.name" class="rounded-2xl shadow-xl" />
            </div>
            <div v-else class="hidden lg:block bg-white/50 rounded-2xl p-12">
              <div class="w-32 h-32 bg-oak-green-primary/10 rounded-full flex items-center justify-center mx-auto">
                <svg class="w-16 h-16 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Details Section -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="grid lg:grid-cols-3 gap-12">
            <!-- Main Content -->
            <div class="lg:col-span-2">
              <h2 class="font-display text-2xl text-oak-text mb-6">About This Treatment</h2>
              <p class="text-oak-text-light leading-relaxed mb-8">{{ service.fullDescription }}</p>

              <!-- Benefits -->
              <div v-if="service.benefits?.length" class="mb-8">
                <h3 class="font-display text-xl text-oak-text mb-4">Benefits</h3>
                <ul class="grid md:grid-cols-2 gap-3">
                  <li
                    v-for="benefit in service.benefits"
                    :key="benefit"
                    class="flex items-start gap-3"
                  >
                    <svg class="w-5 h-5 text-oak-green-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-oak-text-light">{{ benefit }}</span>
                  </li>
                </ul>
              </div>

              <!-- Ingredients -->
              <div v-if="service.ingredients?.length">
                <h3 class="font-display text-xl text-oak-text mb-4">What's Included</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="ingredient in service.ingredients"
                    :key="ingredient"
                    class="px-4 py-2 bg-oak-green-pale text-oak-green-primary rounded-full text-sm font-medium"
                  >
                    {{ ingredient }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div>
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 class="font-display text-lg text-oak-text mb-4">Quick Info</h3>
                <div class="space-y-4 text-sm">
                  <div class="flex justify-between">
                    <span class="text-oak-text-light">Price</span>
                    <span class="font-semibold text-oak-text">${{ service.price }}</span>
                  </div>
                  <div v-if="service.duration" class="flex justify-between">
                    <span class="text-oak-text-light">Duration</span>
                    <span class="font-semibold text-oak-text">{{ service.duration }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-oak-text-light">Category</span>
                    <span class="font-semibold text-oak-text">{{ getCategoryLabel(service.category) }}</span>
                  </div>
                </div>
                <hr class="my-6 border-gray-100" />
                <router-link
                  to="/book"
                  class="block w-full px-6 py-3 bg-oak-green-primary text-white rounded-lg font-semibold text-center hover:bg-oak-green-light transition-colors"
                >
                  Book Now
                </router-link>
                <p class="text-xs text-oak-text-light text-center mt-4">
                  Questions? <router-link to="/contact" class="text-oak-green-primary hover:underline">Contact us</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Services -->
      <section class="py-16 bg-oak-green-pale">
        <div class="container mx-auto px-4">
          <SectionHeading
            title="Related Services"
            subtitle="You might also be interested in these treatments."
          />
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              v-for="relatedService in relatedServices"
              :key="relatedService.id"
              :service="relatedService"
            />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { SectionHeading } from '@/components/ui'
import { ServiceCard } from '@/components/features'
import { useServicesStore } from '@/stores'
import type { Service } from '@/types'

const route = useRoute()
const servicesStore = useServicesStore()

const loading = ref(true)
const service = ref<Service | null>(null)

const relatedServices = computed(() => {
  if (!service.value) return []
  return servicesStore.services
    .filter(s => s.category === service.value?.category && s.id !== service.value?.id)
    .slice(0, 3)
})

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'iv-therapy': 'IV Therapy',
    'vitamin-injection': 'Vitamin Injection',
    'wellness-consultation': 'Wellness Consultation',
    'event-service': 'Event Service'
  }
  return labels[category] || category
}

async function loadService() {
  loading.value = true

  // Ensure all services are loaded
  if (servicesStore.services.length === 0) {
    await servicesStore.fetchAll()
  }

  const slug = route.params.slug as string
  service.value = servicesStore.getBySlug(slug) || null

  loading.value = false
}

onMounted(loadService)

watch(() => route.params.slug, loadService)
</script>
