<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <router-link to="/" data-testid="logo" class="flex items-center gap-3">
          <img
            src="/assets/logo_color.png"
            alt="Oak IV Hydration & Wellness"
            class="h-12 w-auto"
            @error="handleLogoError"
          />
          <span class="font-display text-xl text-oak-green-primary font-semibold hidden sm:inline">
            Oak IV
          </span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-8">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-oak-text hover:text-oak-green-primary transition-colors font-medium"
          >
            {{ link.label }}
          </router-link>
        </nav>

        <!-- CTA Button (Desktop) -->
        <router-link
          to="/book"
          data-testid="book-cta"
          class="hidden lg:inline-flex px-6 py-3 bg-oak-green-primary text-white rounded-lg hover:bg-oak-green-light transition-colors font-semibold"
        >
          Book Now
        </router-link>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          data-testid="mobile-menu-btn"
          class="lg:hidden p-2 text-oak-text hover:text-oak-green-primary transition-colors"
          :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="mobileMenuOpen"
        >
          <svg
            v-if="!mobileMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-show="mobileMenuOpen"
        data-testid="mobile-menu"
        class="lg:hidden pb-4 border-t border-gray-100"
      >
        <nav class="flex flex-col space-y-2 pt-4">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-2 text-oak-text hover:text-oak-green-primary hover:bg-oak-green-pale rounded-lg transition-colors font-medium"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </router-link>
          <router-link
            to="/book"
            class="mx-4 mt-2 px-6 py-3 bg-oak-green-primary text-white rounded-lg text-center font-semibold hover:bg-oak-green-light transition-colors"
            @click="mobileMenuOpen = false"
          >
            Book Now
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
  { to: '/services/iv-therapy', label: 'IV Therapy' },
  { to: '/services/vitamin-injections', label: 'Vitamin Injections' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
]

function handleLogoError(event: Event) {
  const img = event.target as HTMLImageElement
  // Hide broken image
  img.style.display = 'none'
}
</script>
