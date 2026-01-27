# Services Store Unit Tests Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add comprehensive unit tests for the services Pinia store to achieve 80%+ coverage on store logic.

**Architecture:** We'll test the store in isolation using Pinia's testing utilities. Each getter and action will have dedicated test cases covering happy paths and edge cases. Mock data will be extracted to a shared fixture.

**Tech Stack:** Vitest, Pinia, Vue Test Utils, TypeScript

---

## Task 1: Create Test File Structure and Mock Data Fixture

**Files:**
- Create: `tests/unit/stores/services.test.ts`
- Create: `tests/fixtures/services.ts`

**Parallelizable:** Yes (can run independently)

**Step 1: Create the fixtures file with mock service data**

```typescript
// tests/fixtures/services.ts
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
```

**Step 2: Create the test file with basic setup**

```typescript
// tests/unit/stores/services.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
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
```

**Step 3: Run test to verify setup works**

Run: `npm run test -- tests/unit/stores/services.test.ts`
Expected: PASS (3 tests)

**Step 4: Commit**

```bash
git add tests/unit/stores/services.test.ts tests/fixtures/services.ts
git commit -m "test(stores): add services store test file with initial state tests"
```

---

## Task 2: Test the `featured` Getter

**Files:**
- Modify: `tests/unit/stores/services.test.ts`

**Parallelizable:** No (depends on Task 1)

**Step 1: Write the failing test for featured getter**

Add to `tests/unit/stores/services.test.ts`:

```typescript
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
```

**Step 2: Run test to verify it passes**

Run: `npm run test -- tests/unit/stores/services.test.ts`
Expected: PASS (6 tests)

**Step 3: Commit**

```bash
git add tests/unit/stores/services.test.ts
git commit -m "test(stores): add featured getter tests"
```

---

## Task 3: Test the `byCategory` Getter

**Files:**
- Modify: `tests/unit/stores/services.test.ts`

**Parallelizable:** No (depends on Task 2)

**Step 1: Write tests for byCategory getter**

Add to `tests/unit/stores/services.test.ts`:

```typescript
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
```

**Step 2: Run test to verify it passes**

Run: `npm run test -- tests/unit/stores/services.test.ts`
Expected: PASS (10 tests)

**Step 3: Commit**

```bash
git add tests/unit/stores/services.test.ts
git commit -m "test(stores): add byCategory getter tests"
```

---

## Task 4: Test the `getBySlug` Getter

**Files:**
- Modify: `tests/unit/stores/services.test.ts`

**Parallelizable:** No (depends on Task 3)

**Step 1: Write tests for getBySlug getter**

Add to `tests/unit/stores/services.test.ts`:

```typescript
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
```

**Step 2: Run test to verify it passes**

Run: `npm run test -- tests/unit/stores/services.test.ts`
Expected: PASS (13 tests)

**Step 3: Commit**

```bash
git add tests/unit/stores/services.test.ts
git commit -m "test(stores): add getBySlug getter tests"
```

---

## Task 5: Test the `fetchAll` Action

**Files:**
- Modify: `tests/unit/stores/services.test.ts`

**Parallelizable:** No (depends on Task 4)

**Step 1: Write tests for fetchAll action**

Add to `tests/unit/stores/services.test.ts`:

```typescript
describe('fetchAll action', () => {
  it('sets loading to true while fetching', async () => {
    // Arrange
    const store = useServicesStore()

    // Act
    const promise = store.fetchAll()
    expect(store.loading).toBe(true)
    await promise

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
```

**Step 2: Run test to verify it passes**

Run: `npm run test -- tests/unit/stores/services.test.ts`
Expected: PASS (16 tests)

**Step 3: Commit**

```bash
git add tests/unit/stores/services.test.ts
git commit -m "test(stores): add fetchAll action tests"
```

---

## Task 6: Test the `fetchByCategory` Action

**Files:**
- Modify: `tests/unit/stores/services.test.ts`

**Parallelizable:** No (depends on Task 5)

**Step 1: Write tests for fetchByCategory action**

Add to `tests/unit/stores/services.test.ts`:

```typescript
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
    const promise = store.fetchByCategory('iv-therapy')
    expect(store.loading).toBe(true)
    await promise

    // Assert
    expect(store.loading).toBe(false)
  })
})
```

**Step 2: Run test to verify it passes**

Run: `npm run test -- tests/unit/stores/services.test.ts`
Expected: PASS (18 tests)

**Step 3: Commit**

```bash
git add tests/unit/stores/services.test.ts
git commit -m "test(stores): add fetchByCategory action tests"
```

---

## Task 7: Test Category-Specific Computed Properties

**Files:**
- Modify: `tests/unit/stores/services.test.ts`

**Parallelizable:** No (depends on Task 6)

**User Input Required:** Write the test assertions for `ivTherapy`, `vitaminInjections`, `wellnessConsultations`, and `eventServices` computed properties.

**Step 1: Write tests for category computed properties**

Add to `tests/unit/stores/services.test.ts`:

```typescript
describe('category-specific computed properties', () => {
  beforeEach(async () => {
    const store = useServicesStore()
    store.services = mockServices
  })

  // USER: Write assertions here to test each category getter
  // Consider: What should ivTherapy return? How many items?
  // Consider: What about eventServices when there are none in mock data?

  it('ivTherapy returns only iv-therapy category services', () => {
    const store = useServicesStore()
    store.services = mockServices

    // YOUR CODE HERE: Write the assertion
  })

  it('vitaminInjections returns only vitamin-injection category services', () => {
    const store = useServicesStore()
    store.services = mockServices

    // YOUR CODE HERE: Write the assertion
  })

  it('wellnessConsultations returns only wellness-consultation category services', () => {
    const store = useServicesStore()
    store.services = mockServices

    // YOUR CODE HERE: Write the assertion
  })

  it('eventServices returns empty array when no event services exist', () => {
    const store = useServicesStore()
    store.services = mockServices

    // YOUR CODE HERE: Write the assertion
  })
})
```

**Guidance:** Each computed property is a shorthand for `byCategory(categoryName)`. Test that they return the correct filtered list. The mock data has:
- 2 active iv-therapy services
- 1 vitamin-injection service
- 1 wellness-consultation service
- 0 event-service entries

**Step 2: Run test to verify it passes**

Run: `npm run test -- tests/unit/stores/services.test.ts`
Expected: PASS (22 tests)

**Step 3: Commit**

```bash
git add tests/unit/stores/services.test.ts
git commit -m "test(stores): add category computed property tests"
```

---

## Task 8: Final Test Run and Coverage Report

**Files:**
- None (verification only)

**Parallelizable:** No (depends on all previous tasks)

**Step 1: Run full test suite**

Run: `npm run test`
Expected: All tests PASS

**Step 2: Generate coverage report**

Run: `npm run test -- --coverage`
Expected: services.ts should have 80%+ coverage

**Step 3: Final commit with all tests**

```bash
git add -A
git commit -m "test(stores): complete services store unit test coverage"
```

---

## Execution Summary

| Task | Description | Parallelizable | User Input |
|------|-------------|----------------|------------|
| 1 | Create test file + fixtures | Yes | No |
| 2 | Test `featured` getter | No | No |
| 3 | Test `byCategory` getter | No | No |
| 4 | Test `getBySlug` getter | No | No |
| 5 | Test `fetchAll` action | No | No |
| 6 | Test `fetchByCategory` action | No | No |
| 7 | Test category computed properties | No | **Yes** |
| 8 | Final verification + coverage | No | No |

**Total estimated tests:** 22
**User writes code in:** Task 7 (4 assertions, ~8 lines)
