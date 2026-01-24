import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Testimonial } from '@/types'

/**
 * Testimonials Store
 *
 * Manages testimonial/review data fetched from Amplify Data.
 * Currently uses mock data for development.
 */
export const useTestimonialsStore = defineStore('testimonials', () => {
  // State
  const testimonials = ref<Testimonial[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const featured = computed(() =>
    testimonials.value.filter(t => t.featured && t.active)
  )

  const active = computed(() =>
    testimonials.value.filter(t => t.active)
  )

  // Actions
  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      // TODO: Replace with Amplify Data client when backend is deployed
      testimonials.value = getMockTestimonials()
    } catch (e) {
      error.value = 'Failed to fetch testimonials'
      console.error('Testimonials fetch error:', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchFeatured() {
    loading.value = true
    error.value = null

    try {
      testimonials.value = getMockTestimonials().filter(t => t.featured)
    } catch (e) {
      error.value = 'Failed to fetch featured testimonials'
      console.error('Featured testimonials fetch error:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    testimonials,
    loading,
    error,
    // Getters
    featured,
    active,
    // Actions
    fetchAll,
    fetchFeatured
  }
})

// Mock data for development
function getMockTestimonials(): Testimonial[] {
  return [
    {
      id: '1',
      quote: 'I was feeling completely drained after a long week of travel. The Myers Cocktail gave me the energy boost I needed to get back on my feet. The team was professional and made the whole experience so easy!',
      authorName: 'Sarah M.',
      authorLocation: 'Dallas, TX',
      serviceReceived: 'Myers Cocktail',
      rating: 5,
      featured: true,
      active: true
    },
    {
      id: '2',
      quote: 'As an athlete, recovery is everything. The Athletic Performance IV has become a regular part of my training routine. I notice a real difference in how quickly I bounce back after intense workouts.',
      authorName: 'Michael R.',
      authorLocation: 'Plano, TX',
      serviceReceived: 'Athletic Performance',
      rating: 5,
      featured: true,
      active: true
    },
    {
      id: '3',
      quote: 'The convenience of having IV therapy come to my home was a game-changer. When I was fighting off a cold, the Immunity Drip helped me recover so much faster than usual.',
      authorName: 'Jennifer L.',
      authorLocation: 'Frisco, TX',
      serviceReceived: 'Immunity Drip',
      rating: 5,
      featured: true,
      active: true
    },
    {
      id: '4',
      quote: 'We had Oak IV come to our bachelorette party and it was such a hit! Everyone felt amazing and ready to celebrate. Highly recommend for any group event.',
      authorName: 'Amanda K.',
      authorLocation: 'Fort Worth, TX',
      serviceReceived: 'Group IV Party',
      rating: 5,
      featured: true,
      active: true
    },
    {
      id: '5',
      quote: 'The B12 shots have become my weekly pick-me-up. Quick, easy, and I feel the difference immediately. The staff is always friendly and professional.',
      authorName: 'David T.',
      authorLocation: 'Richardson, TX',
      serviceReceived: 'B12 Boost',
      rating: 5,
      featured: false,
      active: true
    },
    {
      id: '6',
      quote: 'After trying the Beauty Glow IV, my skin has never looked better. My friends keep asking what my secret is!',
      authorName: 'Lisa H.',
      authorLocation: 'McKinney, TX',
      serviceReceived: 'Beauty Glow',
      rating: 5,
      featured: false,
      active: true
    }
  ]
}
