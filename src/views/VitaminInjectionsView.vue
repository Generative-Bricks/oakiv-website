<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-oak-green-pale py-16">
      <div class="container mx-auto px-4 text-center">
        <SectionHeading
          eyebrow="Quick Boosts"
          title="Vitamin Injections"
          subtitle="Fast-acting vitamin shots that deliver powerful nutrients directly to your muscles for quick absorption and immediate benefits."
          size="xl"
        />
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            v-for="service in servicesStore.vitaminInjections"
            :key="service.id"
            :service="service"
          />
        </div>
        <div v-if="servicesStore.loading" class="text-center py-12 text-oak-text-light">
          Loading services...
        </div>
        <div v-else-if="servicesStore.vitaminInjections.length === 0" class="text-center py-12 text-oak-text-light">
          No vitamin injection services available at this time.
        </div>
      </div>
    </section>

    <!-- Why Injections Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <SectionHeading
          title="Why Vitamin Injections?"
          subtitle="Experience the benefits of targeted vitamin delivery."
        />
        <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="w-16 h-16 bg-oak-green-pale rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-display text-xl text-oak-text mb-2">Quick & Easy</h3>
            <p class="text-oak-text-light">In and out in 10 minutes or less. Perfect for busy schedules.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-oak-green-pale rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-display text-xl text-oak-text mb-2">Fast Acting</h3>
            <p class="text-oak-text-light">Feel the effects within hours as nutrients bypass digestion.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-oak-green-pale rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-display text-xl text-oak-text mb-2">Affordable</h3>
            <p class="text-oak-text-light">Budget-friendly way to boost your wellness routine.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Uses Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <SectionHeading
          title="Popular Uses"
          subtitle="Our clients use vitamin injections for a variety of wellness goals."
        />
        <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <h3 class="font-display text-lg text-oak-text mb-2">Energy & Fatigue</h3>
            <p class="text-oak-text-light">B12 injections are popular for combating fatigue and boosting energy levels naturally.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <h3 class="font-display text-lg text-oak-text mb-2">Weight Management</h3>
            <p class="text-oak-text-light">Lipotropic injections support metabolism and fat burning when combined with diet and exercise.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <h3 class="font-display text-lg text-oak-text mb-2">Skin Health</h3>
            <p class="text-oak-text-light">Glutathione injections provide antioxidant benefits and may help brighten skin tone.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <h3 class="font-display text-lg text-oak-text mb-2">Immunity Support</h3>
            <p class="text-oak-text-light">Regular vitamin injections can help maintain optimal nutrient levels for immune function.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-oak-green-primary">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-display text-3xl text-white mb-4">
          Quick Wellness Boost
        </h2>
        <p class="text-white/80 mb-8 max-w-2xl mx-auto">
          Stop by for a vitamin injection and feel the difference. No appointment necessary for most injections.
        </p>
        <router-link
          to="/book"
          class="inline-flex px-8 py-4 bg-oak-gold text-white rounded-lg text-lg font-semibold hover:bg-oak-gold/90 transition-colors"
        >
          Book Now
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { SectionHeading } from '@/components/ui'
import { ServiceCard } from '@/components/features'
import { useServicesStore } from '@/stores'

const servicesStore = useServicesStore()

onMounted(() => {
  servicesStore.fetchByCategory('vitamin-injection')
})
</script>
