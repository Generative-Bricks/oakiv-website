<template>
  <div>
    <!-- Hero Section -->
    <section data-testid="hero-section" class="relative min-h-[85vh] flex items-center bg-oak-green-pale overflow-hidden">
      <!-- Hero Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="/assets/hero_roots.png" alt="Deep Roots Wellness" class="w-full h-full object-cover" />
        <!-- Gradeint Overlay for Readability -->
        <div class="absolute inset-0 bg-gradient-to-r from-oak-green-dark/90 via-oak-green-dark/60 to-transparent"></div>
      </div>

      <div class="container relative z-10 mx-auto px-4 py-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="max-w-2xl">
            <span class="inline-block text-oak-gold text-sm font-semibold tracking-wider uppercase mb-4 pl-1">
              Mobile IV Therapy
            </span>
            <h1 class="font-display text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight">
              Premium IV Therapy <span class="text-oak-gold italic">at Your Doorstep</span>
            </h1>
            <p class="text-xl text-white/90 mb-8 leading-relaxed font-light">
              Revitalize your body and mind with our signature hydration blends. Our Registered Nurses bring premium wellness directly to you.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link
                to="/book"
                data-testid="hero-cta"
                class="inline-flex justify-center items-center px-8 py-4 bg-oak-gold text-white rounded-lg text-lg font-semibold hover:bg-oak-gold/90 transition-all shadow-lg hover:shadow-oak-gold/20 transform hover:-translate-y-0.5"
              >
                Book Your Service
              </router-link>
              <a
                href="sms:9402684088?&body=WELLNESS"
                class="inline-flex justify-center items-center px-8 py-4 border border-white/40 text-white rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Text Us: 940-268-4088
              </a>
            </div>
            <div class="mt-8 flex items-center gap-2 text-white/70 text-sm">
              <svg class="w-5 h-5 text-oak-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Serving the Entire DFW Metroplex</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <HowItWorks />

    <!-- Shop By Benefit -->
    <ShopByBenefit />

    <!-- Services Preview Section -->
    <section data-testid="services-section" class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <SectionHeading
          eyebrow="Our Menu"
          title="Most Popular Treatments"
          subtitle="Select from our premium IV drips and vitamin injections, formulated to help you feel your best."
        />
        
        <!-- Category Toggles -->
        <div class="flex justify-center mb-12">
          <div class="bg-oak-green-pale/30 p-1.5 rounded-full inline-flex">
            <button 
              @click="activeCategory = 'iv-therapy'"
              class="px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300"
              :class="activeCategory === 'iv-therapy' ? 'bg-oak-green-primary text-white shadow-md' : 'text-oak-text hover:text-oak-green-primary'"
            >
              IV Drips
            </button>
            <button 
              @click="activeCategory = 'vitamin-injection'"
              class="px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300"
              :class="activeCategory === 'vitamin-injection' ? 'bg-oak-green-primary text-white shadow-md' : 'text-oak-text hover:text-oak-green-primary'"
            >
              Injections
            </button>
          </div>
        </div>

        <!-- Service Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            v-for="service in filteredServices"
            :key="service.id"
            :service="service"
          />
        </div>

        <div class="text-center mt-12">
          <router-link
            to="/services"
            class="inline-flex items-center text-oak-green-primary font-semibold hover:text-oak-green-light transition-colors border-b-2 border-transparent hover:border-oak-green-light pb-0.5"
          >
            View Full Menu
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Trust Badges -->
    <TrustBadges />

    <!-- Testimonials -->
    <TestimonialCarousel />

    <!-- CTA Section -->
    <section class="py-20 bg-oak-text relative overflow-hidden">
      <!-- Background pattern/image could go here -->
      <div class="absolute inset-0 overflow-hidden opacity-10">
         <img src="/assets/hero_roots.png" alt="" class="w-full h-full object-cover grayscale" />
      </div>
      
      <div class="container mx-auto px-4 text-center text-white relative z-10">
        <h2 class="font-display text-3xl md:text-5xl mb-6">
          Ready to Feel Your Best?
        </h2>
        <p class="text-white/70 text-lg mb-10 max-w-2xl mx-auto font-light">
          Book your mobile IV therapy session today. Same-day appointments available.
        </p>
        <div class="flex flex-wrap justify-center gap-6">
          <router-link
            to="/book"
            class="inline-flex px-10 py-4 bg-oak-gold text-white rounded-lg text-lg font-semibold hover:bg-oak-gold/90 transition-colors shadow-lg shadow-oak-gold/20"
          >
            Book Now
          </router-link>
          <a
            href="sms:9402684088?&body=WELLNESS"
            class="inline-flex px-10 py-4 border border-white/30 text-white rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors"
          >
            Text Us
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SectionHeading } from '@/components/ui'
import { ServiceCard } from '@/components/features'
import HowItWorks from '@/components/home/HowItWorks.vue'
import ShopByBenefit from '@/components/home/ShopByBenefit.vue'
import TrustBadges from '@/components/home/TrustBadges.vue'
import TestimonialCarousel from '@/components/home/TestimonialCarousel.vue'
import type { Service } from '@/types'

// Active category for the filter
const activeCategory = ref('iv-therapy')

// Featured services with updated pricing from oakivhydration.com
const featuredServices = ref<Service[]>([
  {
    id: '1',
    category: 'iv-therapy',
    name: 'Myers Cocktail',
    slug: 'myers-cocktail',
    shortDescription: 'The gold standard for overall wellness, immunity, and energy.',
    fullDescription: '',
    price: 185,
    image: '/assets/products/product_drip_myers-cocktail.png',
    benefits: ['Energy boost', 'Immune support', 'Hydration'],
    featured: true,
    sortOrder: 1,
    active: true
  },
  {
    id: '4',
    category: 'iv-therapy',
    name: 'Immunity Boost',
    slug: 'immunity-boost',
    shortDescription: 'High-dose vitamin C, Zinc & B-Vitamins to strengthen defense.',
    fullDescription: '',
    price: 195,
    image: '/assets/products/product_drip_immunity-boost.png',
    benefits: ['Immune boost', 'Antioxidants', 'Recovery'],
    featured: true,
    sortOrder: 2,
    active: true
  },
  {
    id: '2',
    category: 'iv-therapy',
    name: 'Quench',
    slug: 'quench',
    shortDescription: 'Pure hydration with essential electrolytes to restore balance.',
    fullDescription: '',
    price: 99,
    image: '/assets/products/product_drip_quench.png',
    benefits: ['Rehydration', 'Electrolyte balance', 'Recovery'],
    featured: true,
    sortOrder: 3,
    active: true
  },
  {
    id: '5',
    category: 'iv-therapy',
    name: 'Brighten Up Beauty Mix',
    slug: 'brighten-up-beauty-mix',
    shortDescription: 'Biotin and Glutathione for radiant hair, skin, and nails.',
    fullDescription: '',
    price: 215,
    image: '/assets/products/product_drip_brighten-up-beauty-mix.png',
    benefits: ['Radiant skin', 'Hair growth', 'Detox'],
    featured: true,
    sortOrder: 4,
    active: true
  },
  {
    id: '3',
    category: 'vitamin-injection',
    name: 'B12 Boost',
    slug: 'b12-boost',
    shortDescription: 'Quick energy boost with vitamin B12 injection.',
    fullDescription: '',
    price: 20,
    image: '/assets/products/product_injection_b12.png',
    benefits: ['Energy', 'Mental clarity', 'Metabolism'],
    featured: true,
    sortOrder: 1,
    active: true
  },
  {
    id: '6',
    category: 'vitamin-injection',
    name: 'Lipotropic (Lipo-B)',
    slug: 'lipotropic',
    shortDescription: 'Boosts metabolism and helps burn fat.',
    fullDescription: '',
    price: 45,
    image: '/assets/products/product_injection_lipo-c.png',
    benefits: ['Metabolism', 'Fat loss', 'Energy'],
    featured: true,
    sortOrder: 2,
    active: true
  },
  {
    id: '7',
    category: 'vitamin-injection',
    name: 'Glutathione',
    slug: 'glutathione-injection',
    shortDescription: 'Master antioxidant for detox and skin glow.',
    fullDescription: '',
    price: 50,
    image: '/assets/products/product_injection_glutathione.png',
    benefits: ['Detox', 'Skin health', 'Immunity'],
    featured: true,
    sortOrder: 3,
    active: true
  },
  {
    id: '8',
    category: 'vitamin-injection',
    name: 'Toradol (Pain Relief)',
    slug: 'toradol',
    shortDescription: 'Strong anti-inflammatory for pain relief.',
    fullDescription: '',
    price: 35,
    image: '/assets/products/product_injection_tri-immune.png',
    benefits: ['Pain relief', 'Anti-inflammatory', 'Comfort'],
    featured: true,
    sortOrder: 4,
    active: true
  }
])

const filteredServices = computed(() => {
  return featuredServices.value.filter(service => service.category === activeCategory.value)
})
</script>
