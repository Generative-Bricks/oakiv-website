<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-oak-green-pale py-16">
      <div class="container mx-auto px-4 text-center">
        <SectionHeading
          eyebrow="What We Offer"
          title="Our Services"
          subtitle="From IV therapy to vitamin injections, we offer a range of wellness services designed to help you feel your best."
          size="xl"
        />
      </div>
    </section>

    <!-- Service Categories -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <!-- IV Therapy -->
        <div class="mb-16">
          <SectionHeading
            title="IV Therapy"
            subtitle="Premium intravenous hydration and vitamin infusions delivered directly to your bloodstream for maximum absorption."
            size="lg"
          />
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              v-for="service in servicesStore.ivTherapy"
              :key="service.id"
              :service="service"
            />
          </div>
          <div v-if="servicesStore.ivTherapy.length === 0" class="text-center py-8 text-oak-text-light">
            Loading services...
          </div>
        </div>

        <!-- Vitamin Injections -->
        <div class="mb-16">
          <SectionHeading
            title="Vitamin Injections"
            subtitle="Quick, targeted vitamin boosts for energy, metabolism, and overall wellness."
            size="lg"
          />
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              v-for="service in servicesStore.vitaminInjections"
              :key="service.id"
              :service="service"
            />
          </div>
        </div>

        <!-- Wellness Consultations -->
        <div class="mb-16">
          <SectionHeading
            title="Wellness Consultations"
            subtitle="Personalized guidance to help you choose the right treatments for your wellness goals."
            size="lg"
          />
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              v-for="service in servicesStore.wellnessConsultations"
              :key="service.id"
              :service="service"
            />
          </div>
        </div>

        <!-- Event Services -->
        <div>
          <SectionHeading
            title="Event Services"
            subtitle="Bring the IV bar to your next event - perfect for parties, corporate wellness, and group gatherings."
            size="lg"
          />
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              v-for="service in servicesStore.eventServices"
              :key="service.id"
              :service="service"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-oak-green-primary">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-display text-3xl text-white mb-4">
          Not Sure Which Service Is Right for You?
        </h2>
        <p class="text-white/80 mb-8 max-w-2xl mx-auto">
          Book a complimentary wellness consultation and let our experts help you find the perfect treatment.
        </p>
        <router-link
          to="/book"
          class="inline-flex px-8 py-4 bg-oak-gold text-white rounded-lg text-lg font-semibold hover:bg-oak-gold/90 transition-colors"
        >
          Book Your Consultation
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
  servicesStore.fetchAll()
})
</script>
