<template>
  <header class="sticky top-0 z-50 bg-oak-cream/95 backdrop-blur-sm border-b border-oak-green-primary/10">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-24 relative">
        <!-- Logo -->
        <router-link to="/" data-testid="logo" class="flex items-center gap-3 group z-10 shrink-0">
          <img
            src="/assets/logo_color.png"
            alt="Oak IV Hydration & Wellness"
            class="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            @error="handleLogoError"
          />
        </router-link>

        <!-- Desktop Navigation (Centered) -->
        <nav class="hidden lg:flex items-center space-x-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-oak-green-dark hover:text-oak-green-primary transition-colors font-display text-lg tracking-wide border-b-2 border-transparent hover:border-oak-green-primary/30 pb-1"
          >
            {{ link.label }}
          </router-link>
        </nav>

        <!-- CTA Button (Right) -->
        <div class="hidden lg:flex items-center gap-4 z-10 shrink-0">
           <!-- Phone Number (Optional, good for trust) -->
           <a href="tel:+15555555555" class="text-sm font-sans text-oak-text-light hover:text-oak-green-primary transition-colors">
             (555) 555-5555
           </a>
          <router-link
            to="/book"
            data-testid="book-cta"
            class="inline-flex px-8 py-3 bg-oak-green-primary text-white rounded-full hover:bg-oak-green-dark transition-all duration-300 font-sans font-medium text-sm tracking-widest uppercase shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Book Now
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          data-testid="mobile-menu-btn"
          class="lg:hidden p-2 text-oak-green-primary hover:bg-oak-green-pale rounded-full transition-colors"
          :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="mobileMenuOpen"
        >
          <svg
            v-if="!mobileMenuOpen"
            class="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-show="mobileMenuOpen"
        data-testid="mobile-menu"
        class="lg:hidden absolute top-24 left-0 w-full bg-oak-cream border-b border-oak-green-primary/10 shadow-xl"
      >
        <nav class="flex flex-col p-6 space-y-4">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-xl font-display text-oak-green-dark hover:text-oak-green-primary transition-colors"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </router-link>
          <div class="h-px bg-oak-green-primary/10 my-4"></div>
          <router-link
            to="/book"
            class="w-full py-4 bg-oak-green-primary text-white rounded-xl text-center font-sans font-bold uppercase tracking-widest hover:bg-oak-green-dark transition-colors shadow-md"
            @click="mobileMenuOpen = false"
          >
            Book Appointment
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { NavLink } from '@/types'

const mobileMenuOpen = ref(false)

const navLinks: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
//   { to: '/services/iv-therapy', label: 'IV Therapy' }, // Simplified nav for header
//   { to: '/services/vitamin-injections', label: 'Injections' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
]

function handleLogoError(event: Event) {
  const img = event.target as HTMLImageElement
  // Hide broken image
  img.style.display = 'none'
}
</script>
