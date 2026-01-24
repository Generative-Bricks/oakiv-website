<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-oak-green-pale py-16">
      <div class="container mx-auto px-4 text-center">
        <SectionHeading
          eyebrow="Premium Treatments"
          title="IV Therapy"
          subtitle="Experience the benefits of intravenous vitamin and mineral infusions, delivered directly to your bloodstream for maximum absorption and rapid results."
          size="xl"
        />
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            v-for="service in servicesStore.ivTherapy"
            :key="service.id"
            :service="service"
          />
        </div>
        <div v-if="servicesStore.loading" class="text-center py-12 text-oak-text-light">
          Loading services...
        </div>
        <div v-else-if="servicesStore.ivTherapy.length === 0" class="text-center py-12 text-oak-text-light">
          No IV therapy services available at this time.
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <SectionHeading
          title="Why Choose IV Therapy?"
          subtitle="Discover the advantages of intravenous nutrient delivery over oral supplements."
        />
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="benefit in benefits" :key="benefit.title" class="text-center">
            <div class="w-16 h-16 bg-oak-green-pale rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="benefit.icon" />
              </svg>
            </div>
            <h3 class="font-display text-xl text-oak-text mb-2">{{ benefit.title }}</h3>
            <p class="text-oak-text-light">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <SectionHeading
          title="What to Expect"
          subtitle="Your IV therapy session is comfortable, relaxing, and tailored to your needs."
        />
        <div class="max-w-3xl mx-auto">
          <div v-for="(step, index) in process" :key="step.title" class="flex gap-6 mb-8 last:mb-0">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-oak-green-primary text-white rounded-full flex items-center justify-center font-bold">
                {{ index + 1 }}
              </div>
            </div>
            <div>
              <h3 class="font-display text-xl text-oak-text mb-2">{{ step.title }}</h3>
              <p class="text-oak-text-light">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-oak-green-primary">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-display text-3xl text-white mb-4">
          Ready to Feel Your Best?
        </h2>
        <p class="text-white/80 mb-8 max-w-2xl mx-auto">
          Book your IV therapy session today and experience the difference of premium wellness care.
        </p>
        <router-link
          to="/book"
          class="inline-flex px-8 py-4 bg-oak-gold text-white rounded-lg text-lg font-semibold hover:bg-oak-gold/90 transition-colors"
        >
          Book Your Session
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

const benefits = [
  {
    title: '100% Absorption',
    description: 'Nutrients go directly into your bloodstream, bypassing the digestive system.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Rapid Results',
    description: 'Feel the effects within hours, not days or weeks like oral supplements.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: 'Customizable',
    description: 'Each treatment can be tailored to your specific health needs and goals.',
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
  },
  {
    title: 'Professional Care',
    description: 'Administered by trained healthcare professionals in a relaxing environment.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  }
]

const process = [
  {
    title: 'Consultation',
    description: 'We start with a brief consultation to understand your health goals and recommend the best treatment for you.'
  },
  {
    title: 'Preparation',
    description: 'Get comfortable in our relaxing space. We\'ll prepare your customized IV blend fresh for each session.'
  },
  {
    title: 'Treatment',
    description: 'Relax for 30-60 minutes while your IV infuses. Read, work, or simply rest - the choice is yours.'
  },
  {
    title: 'Aftercare',
    description: 'Receive aftercare instructions and recommendations for maintaining your wellness between visits.'
  }
]

onMounted(() => {
  servicesStore.fetchByCategory('iv-therapy')
})
</script>
