import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useServicesStore } from '@/stores/services'
import { mockServices } from '../../fixtures/services'

describe('useServicesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('has empty services array', () => {
      const store = useServicesStore()
      expect(store.services).toEqual([])
    })

    it('has loading set to false', () => {
      const store = useServicesStore()
      expect(store.loading).toBe(false)
    })

    it('has error set to null', () => {
      const store = useServicesStore()
      expect(store.error).toBeNull()
    })
  })

  describe('featured getter', () => {
    it('returns only featured and active services', () => {
      // Arrange
      const store = useServicesStore()
      store.services = mockServices

      // Act
      const result = store.featured

      // Assert
      expect(result).toHaveLength(2) // Myers Cocktail + B12 Boost (not inactive)
      expect(result.every(s => s.featured && s.active)).toBe(true)
    })

    it('returns services sorted by sortOrder', () => {
      // Arrange
      const store = useServicesStore()
      store.services = mockServices

      // Act
      const result = store.featured

      // Assert
      expect(result[0].name).toBe('Myers Cocktail') // sortOrder: 1
      expect(result[1].name).toBe('B12 Boost') // sortOrder: 1 (stable sort)
    })

    it('returns empty array when no featured services', () => {
      // Arrange
      const store = useServicesStore()
      store.services = mockServices.filter(s => !s.featured)

      // Act
      const result = store.featured

      // Assert
      expect(result).toEqual([])
    })
  })

  describe('byCategory getter', () => {
    it('returns only services matching the category', () => {
      // Arrange
      const store = useServicesStore()
      store.services = mockServices

      // Act
      const result = store.byCategory('iv-therapy')

      // Assert
      expect(result.every(s => s.category === 'iv-therapy')).toBe(true)
    })

    it('excludes inactive services', () => {
      // Arrange
      const store = useServicesStore()
      store.services = mockServices

      // Act
      const result = store.byCategory('iv-therapy')

      // Assert
      expect(result.every(s => s.active)).toBe(true)
      expect(result.find(s => s.slug === 'inactive-service')).toBeUndefined()
    })

    it('returns services sorted by sortOrder', () => {
      // Arrange
      const store = useServicesStore()
      store.services = mockServices

      // Act
      const result = store.byCategory('iv-therapy')

      // Assert
      expect(result[0].sortOrder).toBeLessThanOrEqual(result[1].sortOrder)
    })

    it('returns empty array for category with no services', () => {
      // Arrange
      const store = useServicesStore()
      store.services = mockServices

      // Act
      const result = store.byCategory('event-service')

      // Assert
      expect(result).toEqual([])
    })
  })

  describe('getBySlug getter', () => {
    it('returns service matching the slug', () => {
      // Arrange
      const store = useServicesStore()
      store.services = mockServices

      // Act
      const result = store.getBySlug('myers-cocktail')

      // Assert
      expect(result?.name).toBe('Myers Cocktail')
    })

    it('returns undefined for inactive service', () => {
      // Arrange
      const store = useServicesStore()
      store.services = mockServices

      // Act
      const result = store.getBySlug('inactive-service')

      // Assert
      expect(result).toBeUndefined()
    })

    it('returns undefined for non-existent slug', () => {
      // Arrange
      const store = useServicesStore()
      store.services = mockServices

      // Act
      const result = store.getBySlug('does-not-exist')

      // Assert
      expect(result).toBeUndefined()
    })
  })

  describe('fetchAll action', () => {
    it('sets loading to false after fetch completes', async () => {
      // Arrange
      const store = useServicesStore()

      // Act
      await store.fetchAll()

      // Assert
      expect(store.loading).toBe(false)
    })

    it('populates services after fetch', async () => {
      // Arrange
      const store = useServicesStore()

      // Act
      await store.fetchAll()

      // Assert
      expect(store.services.length).toBeGreaterThan(0)
    })

    it('clears error on successful fetch', async () => {
      // Arrange
      const store = useServicesStore()
      store.error = 'Previous error'

      // Act
      await store.fetchAll()

      // Assert
      expect(store.error).toBeNull()
    })
  })

  describe('fetchByCategory action', () => {
    it('fetches only services of specified category', async () => {
      // Arrange
      const store = useServicesStore()

      // Act
      await store.fetchByCategory('vitamin-injection')

      // Assert
      expect(store.services.every(s => s.category === 'vitamin-injection')).toBe(true)
    })

    it('sets loading state correctly', async () => {
      // Arrange
      const store = useServicesStore()

      // Act
      await store.fetchByCategory('iv-therapy')

      // Assert
      expect(store.loading).toBe(false)
    })
  })

  describe('category-specific computed properties', () => {
    it('ivTherapy returns only iv-therapy category services', () => {
      const store = useServicesStore()
      store.services = mockServices

      expect(store.ivTherapy).toHaveLength(2)
      expect(store.ivTherapy.every(s => s.category === 'iv-therapy')).toBe(true)
    })

    it('vitaminInjections returns only vitamin-injection category services', () => {
      const store = useServicesStore()
      store.services = mockServices

      expect(store.vitaminInjections).toHaveLength(1)
      expect(store.vitaminInjections[0].name).toBe('B12 Boost')
    })

    it('wellnessConsultations returns only wellness-consultation category services', () => {
      const store = useServicesStore()
      store.services = mockServices

      expect(store.wellnessConsultations).toHaveLength(1)
      expect(store.wellnessConsultations[0].name).toBe('Wellness Consultation')
    })

    it('eventServices returns empty array when no event services exist', () => {
      const store = useServicesStore()
      store.services = mockServices

      expect(store.eventServices).toEqual([])
    })
  })
})
