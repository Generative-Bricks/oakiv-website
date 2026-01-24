<template>
  <div class="min-h-[70vh] flex items-center justify-center py-20">
    <div class="container mx-auto px-4 text-center">
      <div class="max-w-lg mx-auto">
        <div class="w-24 h-24 bg-oak-green-pale rounded-full flex items-center justify-center mx-auto mb-8">
          <svg class="w-12 h-12 text-oak-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="font-display text-5xl text-oak-text mb-4">404</h1>
        <h2 class="font-display text-2xl text-oak-text mb-4">Page Not Found</h2>
        <p class="text-oak-text-light mb-8">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/"
            class="inline-flex items-center justify-center px-6 py-3 bg-oak-green-primary text-white rounded-lg font-semibold hover:bg-oak-green-light transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </router-link>
          <router-link
            to="/services"
            class="inline-flex items-center justify-center px-6 py-3 border-2 border-oak-green-primary text-oak-green-primary rounded-lg font-semibold hover:bg-oak-green-pale transition-colors"
          >
            View Services
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 Not Found View - no dynamic content needed
</script>
