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
    // IV THERAPIES
    // 1. Myers Cocktail
    {
      id: '1',
      category: 'iv-therapy',
      name: 'Myers Cocktail',
      slug: 'myers-cocktail',
      shortDescription: 'Essential vitamins and nutrients to boost immunity, energy, and overall wellness.',
      fullDescription: 'The Myers Cocktail is the gold standard of IV therapy. This powerful blend features essential vitamins and minerals including Vitamin C, B-Complex, Magnesium, and Calcium. It is perfectly formulated to boost your energy levels, support immune function, and promote overall wellness.',
      price: 185,
      duration: '45-60 min',
      image: '/assets/products/product_drip_myers-cocktail.png',
      benefits: ['Immune system support', 'Increased energy', 'Improved sleep', 'Reduced stress', 'Overall wellness'],
      ingredients: ['Vitamin C', 'Calcium', 'Magnesium', 'VitaComplex', 'B12', '1L Normal Saline'],
      featured: true,
      sortOrder: 1,
      active: true
    },
    // 2. Migraine Relief
    {
      id: '2',
      category: 'iv-therapy',
      name: 'Migraine Relief',
      slug: 'migraine-relief',
      shortDescription: 'Vitamins and anti-inflammatories that ease migraines, offering quick relief and restored function.',
      fullDescription: 'Don\'t let a migraine ruin your day. Our Migraine Relief drip is a specialized blend designed to target the root causes of migraines. It combines powerful anti-inflammatories with essential vitamins and hydration to offer quick relief from pain and nausea, helping you get back to restored function fast.',
      price: 195,
      duration: '45-60 min',
      image: '/assets/products/product_drip_migraine-relief.png',
      benefits: ['Rapid pain relief', 'Reduces inflammation', 'Nausea relief', 'Rehydration', 'Restores function'],
      ingredients: ['Magnesium', 'Calcium', 'Vitamin C', 'Dexamethasone', 'Toradol', '1L Normal Saline'],
      featured: false,
      sortOrder: 2,
      active: true
    },
    // 3. PMS Pain Relief
    {
      id: '3',
      category: 'iv-therapy',
      name: 'PMS Pain Relief',
      slug: 'pms-pain-relief',
      shortDescription: 'A vitamin and anti-inflammatory blend that eases PMS symptoms, offering quick relief and hydration.',
      fullDescription: 'Find relief from the monthly discomfort of PMS. This soothing blend of vitamins, minerals, and anti-inflammatories targets cramps, bloating, and irritability. It offers quick relief and hydration to help you feel like yourself again.',
      price: 195,
      duration: '45-60 min',
      image: '/assets/products/product_drip_pms-relief.png',
      benefits: ['Alleviates cramps', 'Reduces bloating', 'Mood support', 'Hydration', 'Nausea relief'],
      ingredients: ['Magnesium', 'Calcium', 'VitaComplex', 'B12', 'Dexamethasone', 'Zofran', '1L Normal Saline'],
      featured: false,
      sortOrder: 3,
      active: true
    },
    // 4. Hangover Cure
    {
      id: '4',
      category: 'iv-therapy',
      name: 'Hangover Cure',
      slug: 'hangover-cure',
      shortDescription: 'Available 24/7! Ease nausea, body aches, and replenish essential vitamins.',
      fullDescription: 'Bounce back faster with our Hangover Cure. This rescue blend includes anti-nausea medication, anti-inflammatories for headache and body aches, and a full electrolyte fluid replenishment to get you back on your feet.',
      price: 195,
      duration: '45-60 min',
      image: '/assets/products/product_drip_hangover-cure.png',
      benefits: ['Rapid rehydration', 'Nausea relief', 'Headache relief', 'Replenishes vitamins', 'Detox support'],
      ingredients: ['VitaComplex', 'Mineral Blend', 'Zofran', 'Dexamethasone', 'Pepcid', '1L Normal Saline'],
      featured: true,
      sortOrder: 4,
      active: true
    },
    // 5. GI Cocktail
    {
      id: '5',
      category: 'iv-therapy',
      name: 'GI Cocktail',
      slug: 'gi-cocktail',
      shortDescription: 'Combat stomach bugs with fast hydration, stomach acid relief, and anti-nausea meds.',
      fullDescription: 'Fighting a stomach bug or food poisoning? The GI Cocktail provides fast hydration along with stomach acid relief, anti-nausea medication, and powerful antioxidants to help speed up your recovery and settle your system.',
      price: 195,
      duration: '45-60 min',
      image: '/assets/products/product_drip_gi-cocktail.png',
      benefits: ['Soothes stomach', 'Stops nausea', 'Acid reflux relief', 'Rehydration', 'Detoxification'],
      ingredients: ['Glutathione', 'Zofran', 'Pepcid', '1L Normal Saline'],
      featured: false,
      sortOrder: 5,
      active: true
    },
    // 6. Brighten Up Beauty Mix
    {
      id: '6',
      category: 'iv-therapy',
      name: 'Brighten Up Beauty Mix',
      slug: 'brighten-up-beauty-mix',
      shortDescription: 'A nutrient-rich formula that enhances skin, hair, and nails for a radiant, youthful look.',
      fullDescription: 'Glow from the inside out with our Brighten Up Beauty Mix. This nutrient-rich formula is packed with Biotin, Vitamin C, and Glutathione to enhance the health of your skin, hair, and nails, leaving you with a radiant and youthful look.',
      price: 195,
      duration: '45-60 min',
      image: '/assets/products/product_drip_brighten-up-beauty-mix.png',
      benefits: ['Radiant skin', 'Stronger hair & nails', 'Anti-aging', 'Detoxification', 'Collagen production'],
      ingredients: ['VitaComplex', 'Vitamin C', 'Biotin', 'Glutathione', '1L Normal Saline'],
      featured: true,
      sortOrder: 6,
      active: true
    },
    // 7. Recovery & Performance
    {
      id: '7',
      category: 'iv-therapy',
      name: 'Recovery & Performance',
      slug: 'recovery-performance',
      shortDescription: 'Hydrate, boost athletic performance, speed recovery, and optimize training potential.',
      fullDescription: 'Designed for the athlete and the active. Our Recovery & Performance IV delivers a potent mix of Amino Acids, Minerals, and Vitamins to help hydrate your body, boost your athletic performance, speed up muscle recovery, and optimize your training potential.',
      price: 195,
      duration: '45-60 min',
      image: '/assets/products/product_drip_recovery-performance.png',
      benefits: ['Speeds muscle recovery', 'Enhances performance', 'Reduces soreness', 'Rehydration', 'Energy boost'],
      ingredients: ['Amino Blend', 'Mineral Blend', 'Vitamin C', 'VitaComplex', '1L Normal Saline'],
      featured: false,
      sortOrder: 7,
      active: true
    },
    // 8. Youth Recovery & Performance
    {
      id: '8',
      category: 'iv-therapy',
      name: 'Youth Recovery & Performance',
      slug: 'youth-recovery-performance',
      shortDescription: 'A formula for youth athletes to provide a vital edge in recovery and enhance training.',
      fullDescription: 'Specially formulated for youth athletes. This drip provides safe and effective hydration and nutrient replenishment to give young athletes a vital edge in recovery and enhance their training potential.',
      price: 160,
      duration: '30-45 min',
      image: '/assets/products/product_drip_youth-recovery.png',
      benefits: ['Safe hydration', 'Muscle recovery', 'Nutrient replenishment', 'Energy support'],
      ingredients: ['Amino Blend', 'Mineral Blend', 'Vitamin C', 'VitaComplex', '500 mL Normal Saline'],
      featured: false,
      sortOrder: 8,
      active: true
    },
    // 9. Virus Buster
    {
      id: '9',
      category: 'iv-therapy',
      name: 'Virus Buster',
      slug: 'virus-buster',
      shortDescription: 'High-dose vitamins and anti-inflammatories to boost immune system and ease symptoms.',
      fullDescription: 'Kick sickness to the curb with the Virus Buster. This high-dose cocktail of vitamins, essential nutrients, and anti-inflammatories is designed to supercharge your immune system, ease severe symptoms, and restore your energy levels quickly.',
      price: 210,
      duration: '45-60 min',
      image: '/assets/products/product_drip_virus-buster.png',
      benefits: ['Maximum immune boost', 'Symptom relief', 'Reduces inflammation', 'Restores energy', 'Faster recovery'],
      ingredients: ['Magnesium', 'Calcium', 'Vitamin C', 'B12', 'Zinc', 'Toradol', 'Dexamethasone', '1L Normal Saline'],
      featured: true,
      sortOrder: 9,
      active: true
    },
    // 10. Executive Express
    {
      id: '10',
      category: 'iv-therapy',
      name: 'Executive Express',
      slug: 'executive-express',
      shortDescription: 'A fast vitamin and fluid blend for replenishment and hydration. Takes about 20-25 mins.',
      fullDescription: 'Busy day? The Executive Express is designed for those on the go. This efficient vitamin and fluid blend provides fast replenishment and hydration to enhance well-being without taking up your whole day. Administered in just 20-25 minutes.',
      price: 160,
      duration: '20-25 min',
      image: '/assets/products/product_drip_executive-express.png',
      benefits: ['Quick hydration', 'Energy boost', 'Time-efficient', 'Nutrient replenishment'],
      ingredients: ['VitaComplex', 'Vitamin C', 'B12', 'Glutathione', '500mL Normal Saline'],
      featured: false,
      sortOrder: 10,
      active: true
    },
    // 11. Immunity Boost
    {
      id: '11',
      category: 'iv-therapy',
      name: 'Immunity Boost',
      slug: 'immunity-boost',
      shortDescription: 'Strengthen the immune system with essential nutrients and antioxidants.',
      fullDescription: 'Build your body\'s natural defenses. The Immunity Boost is packed with essential nutrients and antioxidants including Zinc and Vitamin C to strengthen your immune system and promote overall health and resilience.',
      price: 195,
      duration: '45-60 min',
      image: '/assets/products/product_drip_immunity-boost.png',
      benefits: ['Immune defense', 'Antioxidant support', 'Health resilience', 'Illness prevention'],
      ingredients: ['VitaComplex', 'Vitamin C', 'Zinc', '1L Normal Saline'],
      featured: false,
      sortOrder: 11,
      active: true
    },
    // 12. Glutathione Power House
    {
      id: '12',
      category: 'iv-therapy',
      name: 'Glutathione Power House',
      slug: 'glutathione-power-house',
      shortDescription: 'Reduce inflammation and fight free radicals with high dose antioxidant.',
      fullDescription: 'Experience the ultimate detox. The Glutathione Power House delivers a high dose of the "master antioxidant" to reduce inflammation, fight free radicals, strengthen your body, and reduce oxidative stress.',
      price: 230,
      duration: '45-60 min',
      image: '/assets/products/product_injection_glutathione-powerhouse.png',
      benefits: ['Powerful detox', 'Reduces inflammation', 'Fights free radicals', 'Skin health', 'Liver support'],
      ingredients: ['1200mg Glutathione', '1L Normal Saline (or 500mL)'],
      featured: false,
      sortOrder: 12,
      active: true
    },
    // 13. Quench
    {
      id: '13',
      category: 'iv-therapy',
      name: 'Quench',
      slug: 'quench',
      shortDescription: 'Experience the rejuvenating benefits of enhancing your hydration for optimal wellness.',
      fullDescription: 'Simple, effective hydration. Quench is perfect for when you just need to rehydrate and restore balance to your body. Experience the rejuvenating benefits of 100% absorbed fluids for optimal wellness.',
      price: 99,
      priceNote: 'or $120 for 1L',
      duration: '30-45 min',
      image: '/assets/products/product_drip_quench.png',
      benefits: ['Instant hydration', 'Restores balance', 'Increases energy', 'Refreshens body'],
      ingredients: ['500mL Normal Saline (Standard)', 'Option for 1L Normal Saline'],
      featured: false,
      sortOrder: 13,
      active: true
    },

    // VITAMIN INJECTIONS
    {
      id: '14',
      category: 'vitamin-injection',
      name: 'B12 Boost',
      slug: 'b12-boost',
      shortDescription: 'Quick energy boost with vitamin B12 injection.',
      fullDescription: 'Our B12 injection delivers a concentrated dose of Vitamin B12 directly into your muscle for rapid absorption. Perfect for boosting energy, improving mood, and supporting metabolism.',
      price: 35,
      duration: '5-10 min',
      image: '/assets/products/product_injection_b12.png',
      benefits: ['Energy boost', 'Mental clarity', 'Metabolism support', 'Mood improvement'],
      ingredients: ['Methylcobalamin (B12)'],
      featured: true,
      sortOrder: 1,
      active: true
    },
    {
      id: '15',
      category: 'vitamin-injection',
      name: 'Lipotropic (Lipo-B)',
      slug: 'lipotropic',
      shortDescription: 'Fat-burning nutrients to support weight management goals.',
      fullDescription: 'Our Lipotropic injection combines B vitamins with fat-burning amino acids (MIC) to help support metabolism and weight management when combined with diet and exercise.',
      price: 45,
      priceNote: 'or 4 for $150',
      duration: '5-10 min',
      image: '/assets/products/product_injection_lipo-c.png',
      benefits: ['Metabolism boost', 'Fat burning support', 'Energy increase', 'Weight management'],
      ingredients: ['B12', 'Methionine', 'Inositol', 'Choline'],
      featured: false,
      sortOrder: 2,
      active: true
    },
    {
      id: '16',
      category: 'vitamin-injection',
      name: 'Glutathione',
      slug: 'glutathione-injection',
      shortDescription: 'Master antioxidant for detox and skin brightening.',
      fullDescription: 'Glutathione is the body\'s master antioxidant, supporting detoxification, immune function, and skin health. This injection helps brighten skin and protect against oxidative stress.',
      price: 50,
      duration: '5-10 min',
      image: '/assets/products/product_injection_glutathione.png',
      benefits: ['Detoxification', 'Skin brightening', 'Antioxidant protection', 'Immune support'],
      ingredients: ['Glutathione'],
      featured: false,
      sortOrder: 3,
      active: true
    },
    {
      id: '19',
      category: 'vitamin-injection',
      name: 'Toradol (Pain Relief)',
      slug: 'toradol',
      shortDescription: 'Strong anti-inflammatory for pain relief.',
      fullDescription: 'Toradol (Ketorolac) is a powerful non-steroidal anti-inflammatory drug (NSAID) that provides fast-acting relief from moderate to severe pain. Ideal for migraines, muscle pain, and post-workout soreness.',
      price: 35,
      duration: '5-10 min',
      image: '/assets/products/product_injection_toradol.png',
      benefits: ['Rapid pain relief', 'Reduces inflammation', 'Migraine relief', 'Muscle pain relief'],
      ingredients: ['Ketorolac (Toradol)'],
      featured: true,
      sortOrder: 4,
      active: true
    },

    // OTHER SERVICES
    {
      id: '17',
      category: 'wellness-consultation',
      name: 'Wellness Consultation',
      slug: 'wellness-consultation',
      shortDescription: 'Personalized wellness assessment and treatment recommendations.',
      fullDescription: 'Meet with our wellness experts for a comprehensive assessment of your health goals and lifestyle. Receive personalized recommendations for IV therapy and vitamin injections tailored to your needs.',
      price: 0,
      priceNote: 'Complimentary',
      duration: '15-30 min',
      image: '/assets/services/consultation.jpg',
      benefits: ['Personalized assessment', 'Custom recommendations', 'Expert guidance', 'Treatment planning'],
      featured: false,
      sortOrder: 1,
      active: true
    },
    {
      id: '18',
      category: 'event-service',
      name: 'Group IV Party',
      slug: 'group-iv-party',
      shortDescription: 'Mobile IV services for groups of 4+ at your location.',
      fullDescription: 'Host a wellness party at your home, office, or venue! Our team brings the IV bar to you for groups of 4 or more. Perfect for bachelorette parties, corporate wellness events, or just a fun girls\' day.',
      price: 150,
      priceNote: 'per person (min 4)',
      duration: '2-3 hours',
      image: '/assets/services/group-iv.jpg',
      benefits: ['Mobile service', 'Group discounts', 'Custom menu options', 'Professional staff'],
      featured: false,
      sortOrder: 1,
      active: true
    }
  ]
}
