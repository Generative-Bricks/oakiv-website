<script setup lang="ts">
// App shell - will be replaced with router-view
</script>

<template>
  <div class="min-h-screen bg-oak-cream">
    <!-- Header placeholder -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-6">
        <h1 class="font-display text-3xl text-oak-green-primary">
          Oak IV Hydration & Wellness
        </h1>
      </div>
    </header>

    <!-- Main content placeholder -->
    <main class="container mx-auto px-4 py-12">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="font-display text-4xl text-oak-text mb-4">
          Design System Ready
        </h2>
        <p class="text-oak-text-light mb-8">
          The Oak IV brand design system has been configured with Tailwind CSS v4.
        </p>

        <!-- Button examples -->
        <div class="flex flex-wrap justify-center gap-4">
          <button class="btn-primary">
            Primary Button
          </button>
          <button class="btn-secondary">
            Secondary Button
          </button>
          <button class="btn-outline">
            Outline Button
          </button>
        </div>

        <!-- Color swatches -->
        <div class="mt-12">
          <h3 class="font-display text-2xl text-oak-text mb-6">Brand Colors</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <div class="w-24 h-24 rounded-lg bg-oak-green-primary flex items-end justify-center pb-2">
              <span class="text-white text-xs">Primary</span>
            </div>
            <div class="w-24 h-24 rounded-lg bg-oak-green-light flex items-end justify-center pb-2">
              <span class="text-white text-xs">Light</span>
            </div>
            <div class="w-24 h-24 rounded-lg bg-oak-green-pale border flex items-end justify-center pb-2">
              <span class="text-oak-text text-xs">Pale</span>
            </div>
            <div class="w-24 h-24 rounded-lg bg-oak-gold flex items-end justify-center pb-2">
              <span class="text-white text-xs">Gold</span>
            </div>
            <div class="w-24 h-24 rounded-lg bg-oak-cream border flex items-end justify-center pb-2">
              <span class="text-oak-text text-xs">Cream</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
