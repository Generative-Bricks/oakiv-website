<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-oak-green-pale py-16">
      <div class="container mx-auto px-4 text-center">
        <SectionHeading
          eyebrow="Personalized Guidance"
          title="Wellness Consultations"
          subtitle="Meet with our wellness experts for personalized recommendations tailored to your unique health goals and lifestyle."
          size="xl"
        />
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <ServiceCard
            v-for="service in servicesStore.wellnessConsultations"
            :key="service.id"
            :service="service"
          />
        </div>
        <div v-if="servicesStore.loading" class="text-center py-12 text-oak-text-light">
          Loading services...
        </div>
      </div>
    </section>

    <!-- What We Cover Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <SectionHeading
          title="What We Cover"
          subtitle="Our consultations provide comprehensive guidance for your wellness journey."
        />
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-oak-green-pale rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <div>
              <h3 class="font-display text-lg text-oak-text mb-2">Health Assessment</h3>
              <p class="text-oak-text-light">We review your current health status, lifestyle, and any concerns you may have.</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-oak-green-pale rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 class="font-display text-lg text-oak-text mb-2">Goal Setting</h3>
              <p class="text-oak-text-light">We help you define clear, achievable wellness goals based on your priorities.</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-oak-green-pale rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 class="font-display text-lg text-oak-text mb-2">Treatment Recommendations</h3>
              <p class="text-oak-text-light">Receive personalized recommendations for IV therapy and vitamin injections.</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-oak-green-pale rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 class="font-display text-lg text-oak-text mb-2">Ongoing Support</h3>
              <p class="text-oak-text-light">We create a treatment plan and schedule follow-ups to track your progress.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-oak-green-primary">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-display text-3xl text-white mb-4">
          Start Your Wellness Journey
        </h2>
        <p class="text-white/80 mb-8 max-w-2xl mx-auto">
          Book a complimentary wellness consultation and let us help you create a personalized plan for optimal health.
        </p>
        <router-link
          to="/book"
          class="inline-flex px-8 py-4 bg-oak-gold text-white rounded-lg text-lg font-semibold hover:bg-oak-gold/90 transition-colors"
        >
          Schedule Consultation
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
  servicesStore.fetchByCategory('wellness-consultation')
})
</script>
