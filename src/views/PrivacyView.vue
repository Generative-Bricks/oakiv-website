<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-oak-green-pale py-16">
      <div class="container mx-auto px-4 text-center">
        <SectionHeading
          title="Privacy Policy"
          subtitle="Last updated: January 2026"
          size="xl"
        />
      </div>
    </section>

    <!-- Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto prose prose-oak">
          <h2 class="font-display text-2xl text-oak-text mb-4">Introduction</h2>
          <p class="text-oak-text-light mb-6">
            Oak IV Hydration & Wellness ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Information We Collect</h2>
          <p class="text-oak-text-light mb-4">
            We may collect information about you in a variety of ways, including:
          </p>
          <ul class="list-disc list-inside text-oak-text-light mb-6 space-y-2">
            <li><strong>Personal Data:</strong> Name, email address, phone number, and mailing address when you book appointments or contact us.</li>
            <li><strong>Health Information:</strong> Medical history and health-related information necessary for providing our services safely.</li>
            <li><strong>Payment Information:</strong> Credit card details and billing information processed securely through third-party payment processors.</li>
            <li><strong>Usage Data:</strong> Information about how you access and use our website, including IP address, browser type, and pages visited.</li>
          </ul>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">How We Use Your Information</h2>
          <p class="text-oak-text-light mb-4">
            We use the information we collect to:
          </p>
          <ul class="list-disc list-inside text-oak-text-light mb-6 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process appointments and transactions</li>
            <li>Send you updates, marketing communications, and promotional materials (with your consent)</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Information Sharing</h2>
          <p class="text-oak-text-light mb-6">
            We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential.
          </p>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Data Security</h2>
          <p class="text-oak-text-light mb-6">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Your Rights</h2>
          <p class="text-oak-text-light mb-4">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul class="list-disc list-inside text-oak-text-light mb-6 space-y-2">
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to opt out of marketing communications</li>
          </ul>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Cookies</h2>
          <p class="text-oak-text-light mb-6">
            Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse cookies, but some features of our website may not function properly without them.
          </p>

          <h2 class="font-display text-2xl text-oak-text mb-4 mt-8">Contact Us</h2>
          <p class="text-oak-text-light mb-6">
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
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
