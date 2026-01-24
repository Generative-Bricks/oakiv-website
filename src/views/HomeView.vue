<template>
  <div>
    <!-- Hero Section -->
    <section data-testid="hero-section" class="relative min-h-[80vh] flex items-center bg-oak-green-pale">
      <div class="container mx-auto px-4 py-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block text-oak-gold text-sm font-semibold tracking-wider uppercase mb-4">
              Mobile IV Therapy
            </span>
            <h1 class="font-display text-4xl md:text-5xl lg:text-6xl text-oak-text mb-6 leading-tight">
              Premium IV Hydration & Wellness Services
            </h1>
            <p class="text-xl text-oak-text-light mb-8 leading-relaxed">
              Serving the DFW Metroplex with personalized wellness treatments delivered directly to your door.
            </p>
            <div class="flex flex-wrap gap-4">
              <router-link
                to="/book"
                data-testid="hero-cta"
                class="inline-flex px-8 py-4 bg-oak-green-primary text-white rounded-lg text-lg font-semibold hover:bg-oak-green-light transition-colors"
              >
                Schedule Your Service
              </router-link>
              <router-link
                to="/services"
                class="inline-flex px-8 py-4 border-2 border-oak-green-primary text-oak-green-primary rounded-lg text-lg font-semibold hover:bg-oak-green-pale transition-colors"
              >
                Explore Services
              </router-link>
            </div>
          </div>
          <div class="hidden lg:block">
            <div class="aspect-square bg-gradient-to-br from-oak-green-light/20 to-oak-gold/20 rounded-2xl flex items-center justify-center">
              <span class="text-oak-text-light">Hero Image Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Preview Section -->
    <section data-testid="services-section" class="py-20">
      <div class="container mx-auto px-4">
        <SectionHeading
          eyebrow="Our Services"
          title="Choose Your Wellness Blend"
          subtitle="Our signature treatments are designed to help you feel your best, whether you're recovering, rehydrating, or rejuvenating."
        />
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            v-for="service in featuredServices"
            :key="service.id"
            :service="service"
          />
        </div>
        <div class="text-center mt-12">
          <router-link
            to="/services"
            class="inline-flex items-center text-oak-green-primary font-semibold hover:text-oak-green-light transition-colors"
          >
            View All Services
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <SectionHeading
          eyebrow="Why Oak IV"
          title="The Oak IV Difference"
          subtitle="Experience premium wellness care with our professional team."
        />
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-oak-green-pale rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="font-display text-xl text-oak-text mb-2">Licensed Professionals</h3>
            <p class="text-oak-text-light">All treatments administered by certified healthcare professionals.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-oak-green-pale rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 class="font-display text-xl text-oak-text mb-2">Mobile Convenience</h3>
            <p class="text-oak-text-light">We come to you - home, office, hotel, or event venue.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-oak-green-pale rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="font-display text-xl text-oak-text mb-2">Personalized Care</h3>
            <p class="text-oak-text-light">Customized treatments tailored to your specific wellness needs.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-oak-green-primary">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-display text-3xl md:text-4xl text-white mb-4">
          Ready to Feel Your Best?
        </h2>
        <p class="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Book your mobile IV therapy session today and experience the Oak IV difference.
        </p>
        <router-link
          to="/book"
          class="inline-flex px-8 py-4 bg-oak-gold text-white rounded-lg text-lg font-semibold hover:bg-oak-gold/90 transition-colors"
        >
          Book Your Appointment
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SectionHeading } from '@/components/ui'
import { ServiceCard } from '@/components/features'
import type { Service } from '@/types'

// Placeholder featured services - will be replaced with store data
const featuredServices = ref<Service[]>([
  {
    id: '1',
    category: 'iv-therapy',
    name: 'Myers Cocktail',
    slug: 'myers-cocktail',
    shortDescription: 'Our signature IV blend for overall wellness, energy, and immune support.',
    fullDescription: '',
    price: 175,
    benefits: ['Energy boost', 'Immune support', 'Hydration'],
    featured: true,
    sortOrder: 1,
    active: true
  },
  {
    id: '2',
    category: 'iv-therapy',
    name: 'Hydration Therapy',
    slug: 'hydration-therapy',
    shortDescription: 'Pure hydration to replenish fluids and restore balance.',
    fullDescription: '',
    price: 125,
    benefits: ['Rehydration', 'Electrolyte balance', 'Recovery'],
    featured: true,
    sortOrder: 2,
    active: true
  },
  {
    id: '3',
    category: 'vitamin-injection',
    name: 'B12 Boost',
    slug: 'b12-boost',
    shortDescription: 'Quick energy boost with vitamin B12 injection.',
    fullDescription: '',
    price: 35,
    benefits: ['Energy', 'Mental clarity', 'Metabolism'],
    featured: true,
    sortOrder: 3,
    active: true
  },
  {
    id: '4',
    category: 'iv-therapy',
    name: 'Immunity Drip',
    slug: 'immunity-drip',
    shortDescription: 'High-dose vitamin C and zinc to strengthen your immune system.',
    fullDescription: '',
    price: 195,
    benefits: ['Immune boost', 'Antioxidants', 'Recovery'],
    featured: true,
    sortOrder: 4,
    active: true
  }
])
</script>
