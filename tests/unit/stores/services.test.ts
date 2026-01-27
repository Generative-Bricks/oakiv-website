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
})
