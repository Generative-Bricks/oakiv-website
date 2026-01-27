<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-oak-green-pale py-16">
      <div class="container mx-auto px-4 text-center">
        <SectionHeading
          eyebrow="Our Story"
          title="About Oak IV Hydration & Wellness"
          subtitle="Bringing premium wellness services to the DFW Metroplex with a focus on personalized care and convenience."
          size="xl"
        />
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="font-display text-3xl text-oak-text mb-6">Our Mission</h2>
            <p class="text-oak-text-light mb-4">
              At Oak IV Hydration & Wellness, we believe that optimal health should be accessible to everyone. Our mission is to provide premium IV therapy and wellness services that help our clients feel their best, whether they're recovering from illness, seeking enhanced energy, or simply prioritizing their wellness.
            </p>
            <p class="text-oak-text-light mb-4">
              We bring the IV bar experience directly to you, offering the convenience of mobile services throughout the DFW Metroplex. Our team of trained healthcare professionals ensures that every treatment is administered safely and effectively.
            </p>
            <p class="text-oak-text-light">
              From individual treatments to group events, we're committed to making wellness a seamless part of your lifestyle.
            </p>
          </div>
          <div class="bg-oak-green-pale rounded-2xl p-8">
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-oak-green-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-display text-lg text-oak-text mb-1">Licensed Professionals</h3>
                  <p class="text-oak-text-light text-sm">All treatments administered by trained, licensed healthcare providers.</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-oak-green-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-display text-lg text-oak-text mb-1">Mobile Convenience</h3>
                  <p class="text-oak-text-light text-sm">We come to you - home, office, hotel, or event venue.</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-oak-green-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-display text-lg text-oak-text mb-1">Personalized Care</h3>
                  <p class="text-oak-text-light text-sm">Custom treatment plans based on your unique health goals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <SectionHeading
          title="Our Values"
          subtitle="The principles that guide everything we do at Oak IV."
        />
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-oak-green-pale rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-display text-xl text-oak-text mb-2">Quality</h3>
            <p class="text-oak-text-light text-sm">Premium ingredients and the highest standards of care in every treatment.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-oak-green-pale rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="font-display text-xl text-oak-text mb-2">Community</h3>
            <p class="text-oak-text-light text-sm">Building a healthier community one treatment at a time.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-oak-green-pale rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-display text-xl text-oak-text mb-2">Innovation</h3>
            <p class="text-oak-text-light text-sm">Staying current with the latest wellness research and techniques.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-oak-green-pale rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-display text-xl text-oak-text mb-2">Convenience</h3>
            <p class="text-oak-text-light text-sm">Making wellness accessible with flexible scheduling and mobile services.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Area Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <SectionHeading
          title="Serving the DFW Metroplex"
          subtitle="We bring wellness to your doorstep across the Dallas-Fort Worth area."
        />
        <div class="max-w-3xl mx-auto">
          <p class="text-oak-text-light text-center mb-8">
            Our mobile services are available throughout the DFW Metroplex, including Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Richardson, Arlington, Irving, and surrounding areas. Contact us to confirm service availability in your location.
          </p>
          <div class="bg-oak-green-pale rounded-xl p-6 text-center">
            <p class="text-oak-text font-semibold mb-2">Service Hours</p>
            <p class="text-oak-text-light">{{ HOURS_DISPLAY.FULL_WITH_DAYS }}</p>
            <p class="text-oak-text-light text-sm mt-2">
              After-hours appointments ({{ HOURS_DISPLAY.AFTER_HOURS }}) include a ${{ HOURS_CONFIG.AFTER_HOURS_FEE }} service fee
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-white overflow-hidden">
      <div class="container mx-auto px-4">
        <SectionHeading
          eyebrow="Our Team"
          title="Meet the Wellness Experts"
          subtitle="A dedicated team of professionals committed to your health and hydration."
        />
        
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div v-for="member in teamMembers" :key="member.name" class="group">
            <div class="aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-all duration-300">
              <img :src="member.image" :alt="member.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="font-display text-2xl text-oak-text mb-1">{{ member.name }}</h3>
            <p class="text-oak-gold font-semibold text-sm uppercase tracking-wider mb-2">{{ member.role }}</p>
            <p class="text-oak-text-light text-sm">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-oak-green-primary">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-display text-3xl text-white mb-4">
          Ready to Experience the Oak IV Difference?
        </h2>
        <p class="text-white/80 mb-8 max-w-2xl mx-auto">
          Book your first appointment today and discover how IV therapy can enhance your wellness routine.
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
import { SectionHeading } from '@/components/ui'
import { HOURS_DISPLAY, HOURS_CONFIG } from '@/constants'

const teamMembers = [
  {
    name: 'Kristin Mrnustik, NP',
    role: 'Founder & Board-Certified Nurse Practitioner',
    image: '/assets/team/photo_team_kristin-headshot.png',
    bio: 'With over 20 years of experience, Kristin leads Oak IV with a focus on holistic, root-cause wellness and personalized care.'
  },
  {
    name: 'Jill, RN',
    role: 'Registered Nurse',
    image: '/assets/team/photo_team_jill.jpg',
    bio: 'With a background in Pediatric ICU, Jill brings a passion for holistic wellness and expert clinical care to our mobile team.'
  },
  {
    name: 'Beth, RN',
    role: 'Registered Nurse',
    image: '/assets/team/photo_team_jill-alt.jpeg', // Using jill-alt as placeholder for Beth if specifically identifiable photo isn't clear
    bio: 'Beth brings extensive experience in transplant, reconstructive, and perioperative care to our wellness treatments.'
  },
  {
    name: 'Marc Bauer, DO',
    role: 'Medical Director',
    image: '/assets/team/photo_team_misc.png', // Using misc for doctor as medical director
    bio: 'Board Certified in Family Medicine, Dr. Bauer oversees all medical protocols to ensure safety and clinical excellence.'
  },
  {
    name: 'Abby, RN',
    role: 'Registered Nurse',
    image: '/assets/team/photo_team_abby.jpg',
    bio: 'Abby provides expert care and personalized wellness treatments, ensuring every client feels refreshed and rejuvenated.'
  },
  {
    name: 'Madie, RN',
    role: 'Registered Nurse',
    image: '/assets/team/photo_team_madie.png',
    bio: 'Madie is dedicated to helping clients achieve their health goals through specialized and effective IV therapy.'
  }
]
</script>
