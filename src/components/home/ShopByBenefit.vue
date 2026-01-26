<template>
  <section class="py-20 bg-oak-green-pale/30">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl md:text-4xl text-oak-text mb-4">How Do You Want to Feel?</h2>
        <p class="text-oak-text-light text-lg">Select a benefit to find your perfect match.</p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <router-link 
          to="/services?filter=energy"
          class="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center border border-transparent hover:border-oak-gold/20"
        >
          <div class="w-20 h-20 mx-auto mb-4 p-4 bg-oak-green-pale rounded-full group-hover:bg-oak-green-primary transition-colors flex items-center justify-center">
            <!-- Energy Icon: Sun + Bolt -->
            <svg class="w-full h-full text-oak-green-primary group-hover:text-oak-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h3 class="font-display text-lg text-oak-text mb-1 group-hover:text-oak-green-primary transition-colors">Energy Boost</h3>
        </router-link>

        <router-link 
          to="/services?filter=immunity"
          class="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center border border-transparent hover:border-oak-gold/20"
        >
          <div class="w-20 h-20 mx-auto mb-4 p-4 bg-oak-green-pale rounded-full group-hover:bg-oak-green-primary transition-colors flex items-center justify-center">
            <!-- Immunity Icon: Shield -->
            <svg class="w-full h-full text-oak-green-primary group-hover:text-oak-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3 class="font-display text-lg text-oak-text mb-1 group-hover:text-oak-green-primary transition-colors">Immunity Defense</h3>
        </router-link>

        <router-link 
          to="/services?filter=recovery"
          class="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center border border-transparent hover:border-oak-gold/20"
        >
          <div class="w-20 h-20 mx-auto mb-4 p-4 bg-oak-green-pale rounded-full group-hover:bg-oak-green-primary transition-colors flex items-center justify-center">
             <!-- Recovery Icon: Drop -->
            <svg class="w-full h-full text-oak-green-primary group-hover:text-oak-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </div>
          <h3 class="font-display text-lg text-oak-text mb-1 group-hover:text-oak-green-primary transition-colors">Recovery</h3>
        </router-link>

        <router-link 
          to="/services?filter=beauty"
          class="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center border border-transparent hover:border-oak-gold/20"
        >
          <div class="w-20 h-20 mx-auto mb-4 p-4 bg-oak-green-pale rounded-full group-hover:bg-oak-green-primary transition-colors flex items-center justify-center">
             <!-- Beauty Icon: Sparkles -->
            <svg class="w-full h-full text-oak-green-primary group-hover:text-oak-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <h3 class="font-display text-lg text-oak-text mb-1 group-hover:text-oak-green-primary transition-colors">Beauty & Glow</h3>
        </router-link>
      </div>
    </div>
  </section>
</template>
