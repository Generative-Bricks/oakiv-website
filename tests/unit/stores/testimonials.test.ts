import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTestimonialsStore } from '@/stores/testimonials'

describe('useTestimonialsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should start with empty testimonials', () => {
      const store = useTestimonialsStore()
      expect(store.testimonials).toEqual([])
    })

    it('should start with loading false', () => {
      const store = useTestimonialsStore()
      expect(store.loading).toBe(false)
    })

    it('should start with no error', () => {
      const store = useTestimonialsStore()
      expect(store.error).toBeNull()
    })
  })

  describe('fetchAll', () => {
    it('should populate testimonials', async () => {
      const store = useTestimonialsStore()
      await store.fetchAll()

      expect(store.testimonials.length).toBeGreaterThan(0)
    })

    it('should set loading to false after completion', async () => {
      const store = useTestimonialsStore()

      await store.fetchAll()

      // After async operation completes, loading should be false
      expect(store.loading).toBe(false)
    })

    it('should load testimonials with required fields', async () => {
      const store = useTestimonialsStore()
      await store.fetchAll()

      store.testimonials.forEach(t => {
        expect(t).toHaveProperty('id')
        expect(t).toHaveProperty('quote')
        expect(t).toHaveProperty('authorName')
        expect(t).toHaveProperty('rating')
        expect(t).toHaveProperty('active')
      })
    })
  })

  describe('fetchFeatured', () => {
    it('should only load featured testimonials', async () => {
      const store = useTestimonialsStore()
      await store.fetchFeatured()

      expect(store.testimonials.length).toBeGreaterThan(0)
      store.testimonials.forEach(t => {
        expect(t.featured).toBe(true)
      })
    })
  })

  describe('featured getter', () => {
    it('should return only featured and active testimonials', async () => {
      const store = useTestimonialsStore()
      await store.fetchAll()

      store.featured.forEach(t => {
        expect(t.featured).toBe(true)
        expect(t.active).toBe(true)
      })
    })

    it('should be computed reactively', async () => {
      const store = useTestimonialsStore()
      expect(store.featured).toEqual([])

      await store.fetchAll()
      expect(store.featured.length).toBeGreaterThan(0)
    })
  })

  describe('active getter', () => {
    it('should return only active testimonials', async () => {
      const store = useTestimonialsStore()
      await store.fetchAll()

      store.active.forEach(t => {
        expect(t.active).toBe(true)
      })
    })

    it('should include both featured and non-featured active testimonials', async () => {
      const store = useTestimonialsStore()
      await store.fetchAll()

      const featuredCount = store.active.filter(t => t.featured).length
      const nonFeaturedCount = store.active.filter(t => !t.featured).length

      expect(featuredCount).toBeGreaterThan(0)
      expect(nonFeaturedCount).toBeGreaterThan(0)
    })
  })

  describe('testimonial data quality', () => {
    it('should have valid ratings (1-5)', async () => {
      const store = useTestimonialsStore()
      await store.fetchAll()

      store.testimonials.forEach(t => {
        expect(t.rating).toBeGreaterThanOrEqual(1)
        expect(t.rating).toBeLessThanOrEqual(5)
      })
    })

    it('should have non-empty quotes', async () => {
      const store = useTestimonialsStore()
      await store.fetchAll()

      store.testimonials.forEach(t => {
        expect(t.quote.length).toBeGreaterThan(10)
      })
    })

    it('should have author names', async () => {
      const store = useTestimonialsStore()
      await store.fetchAll()

      store.testimonials.forEach(t => {
        expect(t.authorName).toBeTruthy()
        expect(t.authorName.length).toBeGreaterThan(0)
      })
    })

    it('should have Texas locations', async () => {
      const store = useTestimonialsStore()
      await store.fetchAll()

      store.testimonials.forEach(t => {
        expect(t.authorLocation).toContain('TX')
      })
    })
  })
})
