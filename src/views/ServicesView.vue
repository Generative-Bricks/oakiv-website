<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-oak-green-pale py-16">
      <div class="container mx-auto px-4 text-center">
        <SectionHeading
          eyebrow="What We Offer"
          title="Our Services"
          subtitle="Comprehensive wellness solutions designed to help you look and feel your best."
          size="xl"
        />
      </div>
    </section>

    <!-- Service Categories Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          <!-- IV Therapy -->
          <router-link to="/services/iv-therapy" class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-80">
            <div class="absolute inset-0 bg-oak-green-primary transition-colors duration-300">
               <!-- Interactive hover effect overlay -->
               <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="relative p-8 h-full flex flex-col items-center justify-center text-center text-white">
              <div class="w-20 h-20 mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 class="font-display text-3xl mb-3">IV Therapy</h3>
              <p class="text-white/90 text-lg mb-6 max-w-sm">Premium intravenous hydration and vitamin infusions aimed at maximum absorption.</p>
              <span class="mt-auto inline-flex items-center text-sm font-bold uppercase tracking-wider border-b-2 border-transparent group-hover:border-oak-gold transition-colors pb-1">
                View Menu <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
            </div>
          </router-link>

          <!-- Vitamin Injections -->
          <router-link to="/services/vitamin-injections" class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-80">
            <div class="absolute inset-0 bg-oak-green-primary transition-colors duration-300">
               <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="relative p-8 h-full flex flex-col items-center justify-center text-center text-white">
              <div class="w-20 h-20 mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                 <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
              </div>
              <h3 class="font-display text-3xl mb-3">Vitamin Injections</h3>
              <p class="text-white/90 text-lg mb-6 max-w-sm">Quick, targeted nutrient boosts for energy, metabolism, and immunity.</p>
              <span class="mt-auto inline-flex items-center text-sm font-bold uppercase tracking-wider border-b-2 border-transparent group-hover:border-oak-gold transition-colors pb-1">
                View Menu <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
            </div>
          </router-link>

          <!-- Wellness Consultations -->
          <router-link to="/services/wellness-consultations" class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-80">
             <div class="absolute inset-0 bg-oak-green-primary transition-colors duration-300">
               <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="relative p-8 h-full flex flex-col items-center justify-center text-center text-white">
              <div class="w-20 h-20 mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="font-display text-3xl mb-3">Wellness Consultations</h3>
              <p class="text-white/90 text-lg mb-6 max-w-sm">Personalized health assessments and treatment plans from our experts.</p>
              <span class="mt-auto inline-flex items-center text-sm font-bold uppercase tracking-wider border-b-2 border-transparent group-hover:border-oak-gold transition-colors pb-1">
                Learn More <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
            </div>
          </router-link>

           <!-- Event Services -->
          <router-link to="/services/event-services" class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-80">
             <div class="absolute inset-0 bg-oak-green-primary transition-colors duration-300">
               <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="relative p-8 h-full flex flex-col items-center justify-center text-center text-white">
               <div class="w-20 h-20 mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="font-display text-3xl mb-3">Event Services</h3>
              <p class="text-white/90 text-lg mb-6 max-w-sm">Bring our mobile IV bar to your next party, corporate event, or gathering.</p>
              <span class="mt-auto inline-flex items-center text-sm font-bold uppercase tracking-wider border-b-2 border-transparent group-hover:border-oak-gold transition-colors pb-1">
                View Options <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
            </div>
          </router-link>

        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-oak-gold">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-display text-3xl text-white mb-4">
          Not Sure Which Service Is Right for You?
        </h2>
        <p class="text-white/90 mb-8 max-w-2xl mx-auto">
          Book a complimentary wellness consultation and let our experts help you find the perfect treatment.
        </p>
        <router-link
          to="/services/wellness-consultations"
          class="inline-flex px-8 py-4 bg-white text-oak-gold rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
        >
          Book Your Consultation
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { SectionHeading } from '@/components/ui'
</script>
