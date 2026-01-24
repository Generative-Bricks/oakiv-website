<template>
  <footer class="bg-oak-green-primary text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Column -->
        <div class="lg:col-span-1">
            <router-link to="/" class="inline-block mb-4">
              <img
                src="/assets/logo_white.png"
                alt="Oak IV Hydration & Wellness"
                class="h-16 w-auto"
              />
            </router-link>
          <p class="text-white/80 text-sm leading-relaxed">
            Premium mobile IV hydration and wellness services serving the DFW Metroplex.
          </p>
        </div>

        <!-- Services Column -->
        <div>
          <h3 class="font-display text-lg font-semibold mb-4">Services</h3>
          <ul class="space-y-2">
            <li v-for="link in serviceLinks" :key="link.to">
              <router-link
                :to="link.to"
                class="text-white/80 hover:text-white transition-colors text-sm"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Quick Links Column -->
        <div>
          <h3 class="font-display text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.to">
              <router-link
                :to="link.to"
                class="text-white/80 hover:text-white transition-colors text-sm"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Column -->
        <div>
          <h3 class="font-display text-lg font-semibold mb-4">Contact Us</h3>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:info@oakivhydration.com" class="text-white/80 hover:text-white transition-colors">
                info@oakivhydration.com
              </a>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+14696306565" class="text-white/80 hover:text-white transition-colors">
                (469) 630-6565
              </a>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-white/80">
                Serving DFW Metroplex
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-white/20">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-white/60 text-sm">
            &copy; {{ currentYear }} Oak IV Hydration & Wellness. All rights reserved.
          </p>
          <div class="flex items-center gap-6">
            <router-link
              to="/privacy"
              class="text-white/60 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </router-link>
            <router-link
              to="/terms"
              class="text-white/60 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { NavLink } from '@/types'

const currentYear = computed(() => new Date().getFullYear())

const serviceLinks: NavLink[] = [
  { to: '/services/iv-therapy', label: 'IV Therapy' },
  { to: '/services/vitamin-injections', label: 'Vitamin Injections' },
  { to: '/services/wellness-consultations', label: 'Wellness Consultations' },
  { to: '/services/event-services', label: 'Event Services' }
]

const quickLinks: NavLink[] = [
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
  { to: '/book', label: 'Book Appointment' },
  { to: '/faq', label: 'FAQ' }
]
</script>
