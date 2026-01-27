import type { Service } from '@/types'

export const mockServices: Service[] = [
  {
    id: '1',
    category: 'iv-therapy',
    name: 'Myers Cocktail',
    slug: 'myers-cocktail',
    shortDescription: 'Essential vitamins and nutrients.',
    fullDescription: 'The Myers Cocktail is the gold standard.',
    price: 185,
    duration: '45-60 min',
    benefits: ['Immune support', 'Energy boost'],
    ingredients: ['Vitamin C', 'B12'],
    featured: true,
    sortOrder: 1,
    active: true
  },
  {
    id: '2',
    category: 'iv-therapy',
    name: 'Hangover Cure',
    slug: 'hangover-cure',
    shortDescription: 'Ease nausea and body aches.',
    fullDescription: 'Bounce back faster.',
    price: 195,
    duration: '45-60 min',
    benefits: ['Rehydration', 'Nausea relief'],
    ingredients: ['Zofran', 'Saline'],
    featured: false,
    sortOrder: 2,
    active: true
  },
  {
    id: '3',
    category: 'vitamin-injection',
    name: 'B12 Boost',
    slug: 'b12-boost',
    shortDescription: 'Quick energy boost.',
    fullDescription: 'Rapid absorption B12.',
    price: 35,
    duration: '5-10 min',
    benefits: ['Energy', 'Mental clarity'],
    ingredients: ['Methylcobalamin'],
    featured: true,
    sortOrder: 1,
    active: true
  },
  {
    id: '4',
    category: 'wellness-consultation',
    name: 'Wellness Consultation',
    slug: 'wellness-consultation',
    shortDescription: 'Personalized wellness assessment.',
    fullDescription: 'Meet with our experts.',
    price: 0,
    duration: '15-30 min',
    benefits: ['Custom plan', 'Expert guidance'],
    featured: false,
    sortOrder: 1,
    active: true
  },
  {
    id: '5',
    category: 'iv-therapy',
    name: 'Inactive Service',
    slug: 'inactive-service',
    shortDescription: 'This service is inactive.',
    fullDescription: 'Should not appear in results.',
    price: 100,
    benefits: [],
    featured: true,
    sortOrder: 99,
    active: false
  }
]

export const emptyServices: Service[] = []
