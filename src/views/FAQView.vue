<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-oak-green-pale py-16">
      <div class="container mx-auto px-4 text-center">
        <SectionHeading
          eyebrow="Questions & Answers"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services, treatments, and booking process."
          size="xl"
        />
      </div>
    </section>

    <!-- FAQ Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <!-- General Questions -->
          <div class="mb-12">
            <h2 class="font-display text-2xl text-oak-text mb-6">General Questions</h2>
            <div class="space-y-4">
              <FAQItem
                v-for="faq in generalFAQs"
                :key="faq.question"
                :question="faq.question"
                :answer="faq.answer"
              />
            </div>
          </div>

          <!-- IV Therapy Questions -->
          <div class="mb-12">
            <h2 class="font-display text-2xl text-oak-text mb-6">IV Therapy</h2>
            <div class="space-y-4">
              <FAQItem
                v-for="faq in ivTherapyFAQs"
                :key="faq.question"
                :question="faq.question"
                :answer="faq.answer"
              />
            </div>
          </div>

          <!-- Booking Questions -->
          <div class="mb-12">
            <h2 class="font-display text-2xl text-oak-text mb-6">Booking & Appointments</h2>
            <div class="space-y-4">
              <FAQItem
                v-for="faq in bookingFAQs"
                :key="faq.question"
                :question="faq.question"
                :answer="faq.answer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-oak-green-primary">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-display text-3xl text-white mb-4">
          Still Have Questions?
        </h2>
        <p class="text-white/80 mb-8 max-w-2xl mx-auto">
          Our team is here to help. Contact us directly and we'll be happy to answer any questions you have.
        </p>
        <router-link
          to="/contact"
          class="inline-flex px-8 py-4 bg-oak-gold text-white rounded-lg text-lg font-semibold hover:bg-oak-gold/90 transition-colors"
        >
          Contact Us
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SectionHeading } from '@/components/ui'

// FAQ Item Component (inline for simplicity)
const FAQItem = {
  props: ['question', 'answer'],
  setup(props: { question: string; answer: string }) {
    const isOpen = ref(false)
    return { isOpen, props }
  },
  template: `
    <div class="border border-gray-200 rounded-xl overflow-hidden">
      <button
        @click="isOpen = !isOpen"
        class="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <span class="font-semibold text-oak-text">{{ props.question }}</span>
        <svg
          :class="['w-5 h-5 text-oak-green-primary transition-transform', { 'rotate-180': isOpen }]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div v-show="isOpen" class="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p class="text-oak-text-light">{{ props.answer }}</p>
      </div>
    </div>
  `
}

const generalFAQs = [
  {
    question: 'What is IV therapy?',
    answer: 'IV (intravenous) therapy is a method of delivering vitamins, minerals, and fluids directly into your bloodstream through an IV drip. This allows for 100% absorption of nutrients, compared to oral supplements which may only achieve 20-30% absorption.'
  },
  {
    question: 'Is IV therapy safe?',
    answer: 'Yes, IV therapy is safe when administered by trained healthcare professionals. All of our treatments are performed by licensed nurses and medical staff using sterile equipment and pharmaceutical-grade ingredients.'
  },
  {
    question: 'How long does a treatment take?',
    answer: 'Most IV therapy sessions take between 30-60 minutes, depending on the treatment. Vitamin injections are much quicker, typically 5-10 minutes.'
  },
  {
    question: 'What areas do you serve?',
    answer: 'We provide mobile IV therapy services throughout the DFW Metroplex, including Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Richardson, Arlington, Irving, and surrounding areas.'
  }
]

const ivTherapyFAQs = [
  {
    question: 'How often should I get IV therapy?',
    answer: 'This depends on your individual health goals. Some clients benefit from weekly treatments, while others may only need monthly sessions. During your consultation, we can help create a personalized treatment plan.'
  },
  {
    question: 'Are there any side effects?',
    answer: 'Side effects are rare but may include minor bruising at the injection site, coolness in the arm during infusion, or a slight vitamin taste. Our staff monitors you throughout the treatment to ensure your comfort.'
  },
  {
    question: 'Can I eat before my IV treatment?',
    answer: 'Yes, we recommend having a light meal before your treatment. Being well-hydrated beforehand also helps, as it makes it easier to find a vein for the IV.'
  },
  {
    question: 'What should I do after my treatment?',
    answer: 'You can resume normal activities immediately after your treatment. We recommend staying hydrated and avoiding alcohol for 24 hours to maximize the benefits of your IV therapy.'
  }
]

const bookingFAQs = [
  {
    question: 'How do I book an appointment?',
    answer: 'You can book online through our website, call us directly, or send us a message through our contact form. We\'ll confirm your appointment within 24 hours.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We ask for at least 24 hours notice for cancellations or rescheduling. Late cancellations may be subject to a cancellation fee.'
  },
  {
    question: 'Do you accept insurance?',
    answer: 'IV therapy is typically not covered by insurance as it\'s considered a wellness service. However, we accept all major credit cards, HSA, and FSA payments.'
  },
  {
    question: 'Can I book a group appointment?',
    answer: 'Yes! We offer group IV parties for 4 or more people at a discounted rate. Contact us to learn more about our event services and custom packages.'
  }
]
</script>
