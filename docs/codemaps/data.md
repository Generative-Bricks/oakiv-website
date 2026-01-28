# Data Models & Schema

**Generated:** 2026-01-28T15:45:00Z
**Source:** amplify/data/resource.ts, src/types/index.ts

## Schema Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     DATA LAYER                                  │
├──────────────┬──────────────┬──────────────┬───────────────────┤
│   Backend    │   Frontend   │  Auth Model  │  Data Flow        │
│   (Amplify)  │   (Types)    │              │                   │
├──────────────┼──────────────┼──────────────┼───────────────────┤
│ Service      │ Service      │ Guest: R     │ Store → DynamoDB  │
│ Testimonial  │ Testimonial  │ Auth: R      │ (via mock data    │
│ Article      │ -            │ Admin: CRUD  │  until deployed)  │
│ Contact...   │ -            │ Staff: RU    │                   │
│ Booking...   │ -            │ Owner: R     │                   │
└──────────────┴──────────────┴──────────────┴───────────────────┘
```

## Frontend Types (src/types/index.ts)

### Service
```typescript
interface Service {
  id: string
  category: ServiceCategory
  name: string
  slug: string                    // URL-safe identifier
  shortDescription: string        // Card display
  fullDescription: string         // Detail page
  price: number                   // Base price
  priceNote?: string              // "or $120 for 1L"
  duration?: string               // "45-60 min"
  benefits: string[]              // Bullet points
  ingredients?: string[]          // What's in it
  image?: string                  // Product image path
  featured: boolean               // Show on homepage
  sortOrder: number               // Display order
  active: boolean                 // Published state
}

type ServiceCategory =
  | 'iv-therapy'
  | 'vitamin-injection'
  | 'wellness-consultation'
  | 'event-service'
```

### ChatMessage
```typescript
interface ChatMessage {
  id: string                      // crypto.randomUUID()
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isEmergency?: boolean           // Triggers safety UI
}
```

### Testimonial
```typescript
interface Testimonial {
  id: string
  quote: string
  authorName: string
  authorLocation?: string         // "Dallas, TX"
  serviceReceived?: string        // "Myers Cocktail"
  rating?: number                 // 1-5
  featured: boolean
  active: boolean
}
```

## Backend Schema (amplify/data/resource.ts)

### Enums
```typescript
ServiceCategory: [
  'IV_THERAPY',
  'VITAMIN_INJECTION',
  'WELLNESS_CONSULTATION',
  'EVENT_SERVICE'
]

ArticleCategory: [
  'WELLNESS_TIPS',
  'IV_EDUCATION',
  'NUTRITION',
  'NEWS'
]

ArticleStatus: ['DRAFT', 'PUBLISHED', 'ARCHIVED']
ContactStatus: ['NEW', 'READ', 'RESPONDED', 'ARCHIVED']
BookingStatus: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']
PreferredContact: ['EMAIL', 'PHONE']
```

### Service Model
```typescript
Service: a.model({
  category: a.ref('ServiceCategory').required(),
  name: a.string().required(),
  slug: a.string().required(),
  shortDescription: a.string().required(),
  fullDescription: a.string().required(),
  price: a.float().required(),
  priceNote: a.string(),
  duration: a.string(),
  benefits: a.string().array().required(),
  ingredients: a.string().array(),
  image: a.string(),
  featured: a.boolean().default(false),
  sortOrder: a.integer().default(0),
  active: a.boolean().default(true)
}).authorization(allow => [
  allow.guest().to(['read']),
  allow.authenticated().to(['read']),
  allow.groups(['Admin']).to(['create', 'update', 'delete', 'read'])
])
```

### Testimonial Model
```typescript
Testimonial: a.model({
  quote: a.string().required(),
  authorName: a.string().required(),
  authorLocation: a.string(),
  serviceReceived: a.string(),
  rating: a.integer(),
  featured: a.boolean().default(false),
  active: a.boolean().default(true)
}).authorization(allow => [
  allow.guest().to(['read']),
  allow.authenticated().to(['read']),
  allow.groups(['Admin']).to(['create', 'update', 'delete', 'read'])
])
```

### Article Model
```typescript
Article: a.model({
  title: a.string().required(),
  slug: a.string().required(),
  excerpt: a.string().required(),
  content: a.string().required(),
  featuredImage: a.string(),
  category: a.ref('ArticleCategory'),
  tags: a.string().array(),
  author: a.string().required(),
  publishedAt: a.datetime(),
  status: a.ref('ArticleStatus')
}).authorization(/* same as above */)
```

### ContactSubmission Model
```typescript
ContactSubmission: a.model({
  name: a.string().required(),
  email: a.email().required(),
  phone: a.phone(),
  service: a.string(),
  message: a.string().required(),
  preferredContact: a.enum(['EMAIL', 'PHONE']),
  status: a.enum(['NEW', 'READ', 'RESPONDED', 'ARCHIVED']),
  // Audit fields
  lastAccessedBy: a.string(),
  lastAccessedAt: a.datetime()
}).authorization(allow => [
  allow.guest().to(['create']),           // Anyone can submit
  allow.groups(['Admin', 'Staff']).to(['read', 'update'])
  // No delete - use ARCHIVED for audit
])
```

### BookingRequest Model
```typescript
BookingRequest: a.model({
  service: a.string().required(),
  preferredDate: a.date().required(),
  preferredTime: a.string().required(),
  name: a.string().required(),
  email: a.email().required(),
  phone: a.phone().required(),
  address: a.string(),
  notes: a.string(),
  status: a.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
  ownerEmail: a.string()                   // For owner-based auth
}).authorization(allow => [
  allow.guest().to(['create']),
  allow.ownerDefinedIn('ownerEmail').to(['read']),  // HIPAA: own data only
  allow.groups(['Admin', 'Staff']).to(['create', 'update', 'read'])
  // No delete - audit compliance
])
```

## Data Access Patterns

### Store → Amplify Client (Future)
```typescript
// Current: Mock data
services.value = getMockServices()

// Future: Amplify Data
const client = generateClient<Schema>()
const { data } = await client.models.Service.list({
  filter: { active: { eq: true } }
})
services.value = data as Service[]
```

### Chat → Lambda → Bedrock
```typescript
// Request
{ message: string, sessionId?: string }

// Response
{ response: string, sessionId?: string, isEmergency?: boolean }
```

## Service Catalog (Mock Data)

| ID | Category | Name | Price | Featured |
|----|----------|------|-------|----------|
| 1 | iv-therapy | Myers Cocktail | $185 | Yes |
| 2 | iv-therapy | Migraine Relief | $195 | No |
| 3 | iv-therapy | PMS Pain Relief | $195 | No |
| 4 | iv-therapy | Hangover Cure | $195 | Yes |
| 5 | iv-therapy | GI Cocktail | $195 | No |
| 6 | iv-therapy | Brighten Up Beauty | $195 | Yes |
| 7 | iv-therapy | Recovery & Performance | $195 | No |
| 8 | iv-therapy | Youth Recovery | $160 | No |
| 9 | iv-therapy | Virus Buster | $210 | Yes |
| 10 | iv-therapy | Executive Express | $160 | No |
| 11 | iv-therapy | Immunity Boost | $195 | No |
| 12 | iv-therapy | Glutathione Power House | $230 | No |
| 13 | iv-therapy | Quench | $99 | No |
| 14 | vitamin-injection | B12 Boost | $35 | Yes |
| 15 | vitamin-injection | Lipotropic | $45 | No |
| 16 | vitamin-injection | Glutathione | $50 | No |
| 19 | vitamin-injection | Toradol | $35 | Yes |
| 17 | wellness-consultation | Wellness Consultation | $0 | No |
| 18 | event-service | Group IV Party | $150 | No |
