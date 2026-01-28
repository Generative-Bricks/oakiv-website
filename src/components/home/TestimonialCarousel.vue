<template>
  <section class="py-20 bg-oak-green-primary relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-oak-gold/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="font-display text-3xl md:text-4xl text-white mb-4">Client Stories</h2>
        <div class="w-16 h-1 bg-oak-gold mx-auto"></div>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 relative">
          <!-- Quote Icon -->
          <div class="absolute -top-6 left-8 bg-oak-gold text-white p-3 rounded-full shadow-lg">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
            </svg>
          </div>

          <!-- Carousel Content -->
          <div v-for="(review, index) in reviews" :key="index" v-show="currentSlide === index" class="transition-all duration-500 ease-in-out">
            <p class="text-white md:text-xl leading-relaxed italic mb-8 min-h-[120px] flex items-center">
              "{{ review.text }}"
            </p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-oak-green-light rounded-full flex items-center justify-center text-white font-bold text-lg">
                {{ review.author.charAt(0) }}
              </div>
              <div class="text-left">
                <div class="font-display text-oak-gold text-lg mb-0.5">{{ review.author }}</div>
                <div class="text-white/60 text-sm">Verified Client</div>
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex justify-center gap-4 mt-8">
            <button 
              v-for="(_, index) in reviews" 
              :key="index"
              @click="currentSlide = index"
              class="w-3 h-3 rounded-full transition-colors duration-300"
              :class="currentSlide === index ? 'bg-oak-gold' : 'bg-white/30 hover:bg-white/50'"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const AUTOPLAY_INTERVAL_MS = 6000

const currentSlide = ref(0)
const autoplayInterval = ref<number | null>(null)

const reviews = [
  {
    text: "Jill coming out and doing my iv revitalized my outlook on life. The entire process was seamless. I experienced immediate results, providing the necessary boost to enhance my well-being and embrace the summer season with joy.",
    author: "Verified Client"
  },
  {
    text: "I setup an appointment after I started having flu symptoms and I needed to be able to go to work the next day. Abby came to our house with a Virus Buster and did a fabulous job. She explained everything well and made it a painless experience. The best part is I started feeling better within a few hours. Well worth the money!",
    author: "Verified Client"
  },
  {
    text: "After an IV hydration, the first thing I noticed was how revived I felt after only a 15 min nap. I normally need 30-45 min. Then my hair and nails grew. Madie was very calm, explained my ingredients and helped me get comfortable. I was also traveling all summer and never got sick due to the immunity boost. Highly recommend!",
    author: "Verified Client"
  },
  {
    text: "It works!!!! I was skeptical at first as I’ve never gotten an IV treatment before but after lingering soreness from working out I said why not and got the Recovery and Performance IV Infusion. I got the treatment in the afternoon and for me it didn’t kick in until the next day (yours should kick in earlier) but once it did I felt like I could run through a brick wall and come out unscathed. If you’re dealing with any pain/soreness or if your body just needs a boost I would definitely recommend you get this treatment.",
    author: "Verified Client"
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % reviews.length
}

onMounted(() => {
  autoplayInterval.value = window.setInterval(nextSlide, AUTOPLAY_INTERVAL_MS)
})

onUnmounted(() => {
  if (autoplayInterval.value) clearInterval(autoplayInterval.value)
})
</script>
