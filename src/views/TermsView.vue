<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-oak-green-pale py-16">
      <div class="container mx-auto px-4 text-center">
        <SectionHeading
          title="Terms of Service"
          subtitle="Last updated: January 2026"
          size="xl"
        />
      </div>
    </section>

    <!-- Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto prose prose-oak">
          <h2 class="font-display text-2xl text-oak-text mb-4">Agreement to Terms</h2>
          <p class="text-oak-text-light mb-6">
            By accessing or using the services provided by Oak IV Hydration & Wellness ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Services Provided</h2>
          <p class="text-oak-text-light mb-6">
            Oak IV Hydration & Wellness provides IV therapy, vitamin injections, and wellness consultation services. Our services are intended for wellness purposes and are not a substitute for medical treatment. Always consult with your healthcare provider before starting any new wellness regimen.
          </p>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Eligibility</h2>
          <p class="text-oak-text-light mb-4">
            To use our services, you must:
          </p>
          <ul class="list-disc list-inside text-oak-text-light mb-6 space-y-2">
            <li>Be at least 18 years of age</li>
            <li>Provide accurate and complete health information</li>
            <li>Not have any conditions that contraindicate IV therapy</li>
            <li>Have legal capacity to enter into binding agreements</li>
          </ul>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Booking and Appointments</h2>
          <p class="text-oak-text-light mb-4">
            When booking an appointment:
          </p>
          <ul class="list-disc list-inside text-oak-text-light mb-6 space-y-2">
            <li>You agree to provide accurate contact and health information</li>
            <li>Appointments are confirmed upon receipt of confirmation email</li>
            <li>We reserve the right to refuse service at our discretion</li>
            <li>Cancellations require at least 24 hours notice to avoid cancellation fees</li>
          </ul>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Payment Terms</h2>
          <p class="text-oak-text-light mb-6">
            Payment is due at the time of service unless otherwise arranged. We accept major credit cards, HSA, and FSA payments. Prices are subject to change without notice. All sales are final, and refunds are provided at our sole discretion.
          </p>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Health Disclaimer</h2>
          <p class="text-oak-text-light mb-6">
            Our services are provided for general wellness purposes only and are not intended to diagnose, treat, cure, or prevent any disease. You should consult with a qualified healthcare provider before receiving any treatments, especially if you have underlying health conditions, are pregnant, or are taking medications.
          </p>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Limitation of Liability</h2>
          <p class="text-oak-text-light mb-6">
            To the maximum extent permitted by law, Oak IV Hydration & Wellness shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.
          </p>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Intellectual Property</h2>
          <p class="text-oak-text-light mb-6">
            All content on our website, including text, graphics, logos, and images, is the property of Oak IV Hydration & Wellness and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
          </p>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Changes to Terms</h2>
          <p class="text-oak-text-light mb-6">
            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes constitutes acceptance of the modified terms.
          </p>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Governing Law</h2>
          <p class="text-oak-text-light mb-6">
            These Terms of Service shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.
          </p>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Contact Information</h2>
          <p class="text-oak-text-light mb-6">
            For questions about these Terms of Service, please contact us:
          </p>
          <div class="bg-oak-green-pale rounded-xl p-6">
            <p class="text-oak-text"><strong>Oak IV Hydration & Wellness</strong></p>
            <p class="text-oak-text-light">Email: info@oakivhydration.com</p>
            <p class="text-oak-text-light">Phone: (469) 555-1234</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { SectionHeading } from '@/components/ui'
</script>
