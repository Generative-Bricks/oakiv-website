import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Service, ServiceCategory } from '@/types'

/**
 * Services Store
 *
 * Manages service data fetched from Amplify Data.
 * In production, this will use generateClient from aws-amplify/data.
 * Currently uses mock data for development.
 */
export const useServicesStore = defineStore('services', () => {
  // State
  const services = ref<Service[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const featured = computed(() =>
    services.value.filter(s => s.featured && s.active).sort((a, b) => a.sortOrder - b.sortOrder)
  )

  const byCategory = computed(() => (category: ServiceCategory) =>
    services.value.filter(s => s.category === category && s.active).sort((a, b) => a.sortOrder - b.sortOrder)
  )

  const ivTherapy = computed(() => byCategory.value('iv-therapy'))
  const vitaminInjections = computed(() => byCategory.value('vitamin-injection'))
  const wellnessConsultations = computed(() => byCategory.value('wellness-consultation'))
  const eventServices = computed(() => byCategory.value('event-service'))

  const getBySlug = computed(() => (slug: string) =>
    services.value.find(s => s.slug === slug && s.active)
  )

  // Actions
  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      // TODO: Replace with Amplify Data client when backend is deployed
      // const client = generateClient<Schema>()
      // const { data } = await client.models.Service.list({
      //   filter: { active: { eq: true } }
      // })
      // services.value = data as Service[]

      // Mock data for development
      services.value = getMockServices()
    } catch (e) {
      error.value = 'Failed to fetch services'
      console.error('Services fetch error:', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchFeatured() {
    loading.value = true
    error.value = null

    try {
      // TODO: Replace with Amplify Data client
      // Filter for featured services only
      services.value = getMockServices().filter(s => s.featured)
    } catch (e) {
      error.value = 'Failed to fetch featured services'
      console.error('Featured services fetch error:', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchByCategory(category: ServiceCategory) {
    loading.value = true
    error.value = null

    try {
      // TODO: Replace with Amplify Data client
      const allServices = getMockServices()
      services.value = allServices.filter(s => s.category === category)
    } catch (e) {
      error.value = `Failed to fetch ${category} services`
      console.error('Category fetch error:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    services,
    loading,
    error,
    // Getters
    featured,
    byCategory,
    ivTherapy,
    vitaminInjections,
    wellnessConsultations,
    eventServices,
    getBySlug,
    // Actions
    fetchAll,
    fetchFeatured,
    fetchByCategory
  }
})

// Mock data for development
function getMockServices(): Service[] {
  return [
    {
      id: '1',
      category: 'iv-therapy',
      name: 'Myers Cocktail',
      slug: 'myers-cocktail',
      shortDescription: 'Our signature IV blend for overall wellness, energy, and immune support.',
      fullDescription: 'The Myers Cocktail is our most popular IV therapy treatment, featuring a powerful blend of vitamins and minerals including Vitamin C, B-Complex, Magnesium, and Calcium. Perfect for boosting energy, supporting immune function, and promoting overall wellness.',
      price: 175,
      duration: '45-60 min',
      benefits: ['Energy boost', 'Immune support', 'Hydration', 'Vitamin replenishment', 'Mental clarity'],
      ingredients: ['Vitamin C', 'B-Complex', 'Magnesium', 'Calcium', 'B12'],
      featured: true,
      sortOrder: 1,
      active: true
    },
    {
      id: '2',
      category: 'iv-therapy',
      name: 'Hydration Therapy',
      slug: 'hydration-therapy',
      shortDescription: 'Pure hydration to replenish fluids and restore electrolyte balance.',
      fullDescription: 'Our Hydration Therapy delivers essential fluids and electrolytes directly to your bloodstream for rapid rehydration. Ideal for recovery from illness, exercise, travel, or hangovers.',
      price: 125,
      duration: '30-45 min',
      benefits: ['Rapid rehydration', 'Electrolyte balance', 'Recovery support', 'Headache relief'],
      ingredients: ['Normal Saline', 'Electrolytes'],
      featured: true,
      sortOrder: 2,
      active: true
    },
    {
      id: '3',
      category: 'iv-therapy',
      name: 'Immunity Drip',
      slug: 'immunity-drip',
      shortDescription: 'High-dose vitamin C and zinc to strengthen your immune system.',
      fullDescription: 'Boost your immune defenses with our Immunity Drip, featuring high-dose Vitamin C, Zinc, and other immune-supporting nutrients. Perfect for cold and flu season or when you feel something coming on.',
      price: 195,
      duration: '45-60 min',
      benefits: ['Immune boost', 'Antioxidant protection', 'Faster recovery', 'Cold & flu defense'],
      ingredients: ['High-dose Vitamin C', 'Zinc', 'B-Complex', 'Glutathione'],
      featured: true,
      sortOrder: 3,
      active: true
    },
    {
      id: '4',
      category: 'iv-therapy',
      name: 'Beauty Glow',
      slug: 'beauty-glow',
      shortDescription: 'Biotin, glutathione, and vitamin C for radiant skin, hair, and nails.',
      fullDescription: 'Enhance your natural beauty from the inside out with our Beauty Glow IV. Packed with Biotin, Glutathione, and Vitamin C to promote healthy skin, strong hair, and beautiful nails.',
      price: 225,
      duration: '45-60 min',
      benefits: ['Glowing skin', 'Hair health', 'Nail strength', 'Anti-aging'],
      ingredients: ['Biotin', 'Glutathione', 'Vitamin C', 'B-Complex'],
      featured: false,
      sortOrder: 4,
      active: true
    },
    {
      id: '5',
      category: 'iv-therapy',
      name: 'Athletic Performance',
      slug: 'athletic-performance',
      shortDescription: 'Amino acids and electrolytes for peak performance and recovery.',
      fullDescription: 'Designed for athletes and active individuals, this IV delivers essential amino acids, electrolytes, and vitamins to enhance performance, speed recovery, and reduce muscle soreness.',
      price: 215,
      duration: '45-60 min',
      benefits: ['Enhanced performance', 'Faster recovery', 'Reduced soreness', 'Energy boost'],
      ingredients: ['Amino Acids', 'Electrolytes', 'B-Complex', 'Magnesium'],
      featured: false,
      sortOrder: 5,
      active: true
    },
    {
      id: '6',
      category: 'vitamin-injection',
      name: 'B12 Boost',
      slug: 'b12-boost',
      shortDescription: 'Quick energy boost with vitamin B12 injection.',
      fullDescription: 'Our B12 injection delivers a concentrated dose of Vitamin B12 directly into your muscle for rapid absorption. Perfect for boosting energy, improving mood, and supporting metabolism.',
      price: 35,
      duration: '5-10 min',
      benefits: ['Energy boost', 'Mental clarity', 'Metabolism support', 'Mood improvement'],
      ingredients: ['Methylcobalamin (B12)'],
      featured: true,
      sortOrder: 1,
      active: true
    },
    {
      id: '7',
      category: 'vitamin-injection',
      name: 'Lipotropic (Lipo-B)',
      slug: 'lipotropic',
      shortDescription: 'Fat-burning nutrients to support weight management goals.',
      fullDescription: 'Our Lipotropic injection combines B vitamins with fat-burning amino acids (MIC) to help support metabolism and weight management when combined with diet and exercise.',
      price: 45,
      priceNote: 'or 4 for $150',
      duration: '5-10 min',
      benefits: ['Metabolism boost', 'Fat burning support', 'Energy increase', 'Weight management'],
      ingredients: ['B12', 'Methionine', 'Inositol', 'Choline'],
      featured: false,
      sortOrder: 2,
      active: true
    },
    {
      id: '8',
      category: 'vitamin-injection',
      name: 'Glutathione',
      slug: 'glutathione-injection',
      shortDescription: 'Master antioxidant for detox and skin brightening.',
      fullDescription: 'Glutathione is the body\'s master antioxidant, supporting detoxification, immune function, and skin health. This injection helps brighten skin and protect against oxidative stress.',
      price: 50,
      duration: '5-10 min',
      benefits: ['Detoxification', 'Skin brightening', 'Antioxidant protection', 'Immune support'],
      ingredients: ['Glutathione'],
      featured: false,
      sortOrder: 3,
      active: true
    },
    {
      id: '9',
      category: 'wellness-consultation',
      name: 'Wellness Consultation',
      slug: 'wellness-consultation',
      shortDescription: 'Personalized wellness assessment and treatment recommendations.',
      fullDescription: 'Meet with our wellness experts for a comprehensive assessment of your health goals and lifestyle. Receive personalized recommendations for IV therapy and vitamin injections tailored to your needs.',
      price: 0,
      priceNote: 'Complimentary',
      duration: '15-30 min',
      benefits: ['Personalized assessment', 'Custom recommendations', 'Expert guidance', 'Treatment planning'],
      featured: false,
      sortOrder: 1,
      active: true
    },
    {
      id: '10',
      category: 'event-service',
      name: 'Group IV Party',
      slug: 'group-iv-party',
      shortDescription: 'Mobile IV services for groups of 4+ at your location.',
      fullDescription: 'Host a wellness party at your home, office, or venue! Our team brings the IV bar to you for groups of 4 or more. Perfect for bachelorette parties, corporate wellness events, or just a fun girls\' day.',
      price: 150,
      priceNote: 'per person (min 4)',
      duration: '2-3 hours',
      benefits: ['Mobile service', 'Group discounts', 'Custom menu options', 'Professional staff'],
      featured: false,
      sortOrder: 1,
      active: true
    }
  ]
}
