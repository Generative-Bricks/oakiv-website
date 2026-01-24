<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-oak-green-pale py-16">
      <div class="container mx-auto px-4 text-center">
        <SectionHeading
          eyebrow="Group Wellness"
          title="Event Services"
          subtitle="Bring the IV bar to your next event! Perfect for parties, corporate wellness days, and group gatherings."
          size="xl"
        />
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <ServiceCard
            v-for="service in servicesStore.eventServices"
            :key="service.id"
            :service="service"
          />
        </div>
        <div v-if="servicesStore.loading" class="text-center py-12 text-oak-text-light">
          Loading services...
        </div>
      </div>
    </section>

    <!-- Event Types Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <SectionHeading
          title="Perfect For Any Occasion"
          subtitle="Our mobile IV services are ideal for a variety of events and gatherings."
        />
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="bg-oak-green-pale p-6 rounded-xl">
            <h3 class="font-display text-xl text-oak-text mb-3">Bachelorette Parties</h3>
            <p class="text-oak-text-light">Start the celebration right or recover the next day with our group IV services.</p>
          </div>
          <div class="bg-oak-green-pale p-6 rounded-xl">
            <h3 class="font-display text-xl text-oak-text mb-3">Corporate Wellness</h3>
            <p class="text-oak-text-light">Boost employee wellness and productivity with on-site IV therapy sessions.</p>
          </div>
          <div class="bg-oak-green-pale p-6 rounded-xl">
            <h3 class="font-display text-xl text-oak-text mb-3">Birthday Parties</h3>
            <p class="text-oak-text-light">Add a unique wellness experience to your celebration.</p>
          </div>
          <div class="bg-oak-green-pale p-6 rounded-xl">
            <h3 class="font-display text-xl text-oak-text mb-3">Spa Days</h3>
            <p class="text-oak-text-light">Elevate your spa day with friends with hydrating IV treatments.</p>
          </div>
          <div class="bg-oak-green-pale p-6 rounded-xl">
            <h3 class="font-display text-xl text-oak-text mb-3">Athletic Events</h3>
            <p class="text-oak-text-light">Recovery support for sports teams, marathons, and fitness events.</p>
          </div>
          <div class="bg-oak-green-pale p-6 rounded-xl">
            <h3 class="font-display text-xl text-oak-text mb-3">Health Fairs</h3>
            <p class="text-oak-text-light">Provide wellness services at community health events and expos.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <SectionHeading
          title="How Event Services Work"
          subtitle="Planning a wellness event is easy with Oak IV."
        />
        <div class="max-w-3xl mx-auto">
          <div class="flex gap-6 mb-8">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-oak-green-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
            </div>
            <div>
              <h3 class="font-display text-xl text-oak-text mb-2">Contact Us</h3>
              <p class="text-oak-text-light">Reach out with your event details: date, location, estimated number of guests, and any special requests.</p>
            </div>
          </div>
          <div class="flex gap-6 mb-8">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-oak-green-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
            </div>
            <div>
              <h3 class="font-display text-xl text-oak-text mb-2">Customize Your Menu</h3>
              <p class="text-oak-text-light">We'll help you select the perfect treatments for your group, including IV options and vitamin injections.</p>
            </div>
          </div>
          <div class="flex gap-6 mb-8">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-oak-green-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
            </div>
            <div>
              <h3 class="font-display text-xl text-oak-text mb-2">We Come to You</h3>
              <p class="text-oak-text-light">Our team arrives with all equipment and supplies. We set up a comfortable treatment area at your venue.</p>
            </div>
          </div>
          <div class="flex gap-6">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-oak-green-primary text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
            </div>
            <div>
              <h3 class="font-display text-xl text-oak-text mb-2">Enjoy Your Event</h3>
              <p class="text-oak-text-light">Your guests receive professional wellness treatments while enjoying your event. We handle everything!</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-oak-green-primary">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-display text-3xl text-white mb-4">
          Plan Your Wellness Event
        </h2>
        <p class="text-white/80 mb-8 max-w-2xl mx-auto">
          Contact us to discuss your event needs and get a custom quote. Minimum of 4 guests required.
        </p>
        <router-link
          to="/contact"
          class="inline-flex px-8 py-4 bg-oak-gold text-white rounded-lg text-lg font-semibold hover:bg-oak-gold/90 transition-colors"
        >
          Request Event Quote
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
  servicesStore.fetchByCategory('event-service')
})
</script>
