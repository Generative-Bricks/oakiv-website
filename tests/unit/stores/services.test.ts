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
})
