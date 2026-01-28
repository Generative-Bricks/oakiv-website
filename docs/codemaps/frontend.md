# Frontend Architecture

**Generated:** 2026-01-28T16:30:00Z
**Stack:** Vue 3 + Vite + TypeScript + Tailwind CSS 4 + Pinia

## Directory Structure

```
src/
├── main.ts                    # App entry, Pinia/Router setup
├── App.vue                    # Root component
├── router/index.ts            # Route definitions (14 routes)
├── types/index.ts             # TypeScript interfaces
├── constants/
│   ├── index.ts               # Barrel export
│   └── hours.ts               # Business hours config
├── composables/
│   ├── index.ts               # Barrel export
│   └── useChat.ts             # Chat logic + Bedrock integration
├── stores/
│   ├── index.ts               # Barrel export
│   ├── services.ts            # Service catalog (mock → Amplify)
│   ├── chat.ts                # Chat state + emergency detection
│   └── testimonials.ts        # Testimonial data
├── components/
│   ├── ui/                    # Reusable primitives
│   ├── layout/                # App shell
│   ├── features/              # Domain components
│   └── home/                  # Homepage sections
├── views/                     # Page components
└── services/
    └── amplify.ts             # Amplify client config
```

## Component Hierarchy

```
App.vue
└── AppLayout.vue
    ├── AppHeader.vue
    │   └── Navigation + Mobile menu
    ├── <router-view />
    │   ├── HomeView.vue
    │   │   ├── HeroSection (inline)
    │   │   ├── ShopByBenefit.vue
    │   │   ├── ServiceCard.vue (×N)
    │   │   ├── HowItWorks.vue
    │   │   ├── TestimonialCarousel.vue
    │   │   └── TrustBadges.vue
    │   ├── ServicesView.vue → ServiceCard.vue
    │   ├── ServiceDetailView.vue (/:slug)
    │   ├── BookView.vue (?service=slug)
    │   └── ... (10 more views)
    ├── AppFooter.vue
    └── ChatWidget.vue (floating)
```

## State Management

### stores/services.ts
```typescript
// State
services: Service[]
loading: boolean
error: string | null

// Getters
featured         → Service[]        // featured && active
byCategory(cat)  → Service[]        // filter by category
ivTherapy        → Service[]        // category='iv-therapy'
vitaminInjections→ Service[]        // category='vitamin-injection'
getBySlug(slug)  → Service | undefined

// Actions
fetchAll()             // All active services
fetchFeatured()        // Featured only
fetchByCategory(cat)   // By category
```

### stores/chat.ts
```typescript
// State
messages: ChatMessage[]
isLoading: boolean
error: string | null
sessionId: string | undefined
isOpen: boolean

// Getters
hasMessages  → boolean
lastMessage  → ChatMessage | null

// Actions
openChat()              // Opens + welcome message
closeChat()
toggleChat()
sendMessage(content)    // Emergency detection + API
clearChat()
```

### stores/testimonials.ts
```typescript
// State
testimonials: Testimonial[]
loading: boolean
error: string | null

// Getters
featured  → Testimonial[]   // featured && active
active    → Testimonial[]   // active only

// Actions
fetchAll()
fetchFeatured()
```

## Routing

| Path | Component | Meta |
|------|-----------|------|
| `/` | HomeView | title: Oak IV... |
| `/services` | ServicesView | |
| `/services/iv-therapy` | IVTherapyView | |
| `/services/vitamin-injections` | VitaminInjectionsView | |
| `/services/wellness-consultations` | WellnessConsultationsView | |
| `/services/event-services` | EventServicesView | |
| `/services/:slug` | ServiceDetailView | Dynamic |
| `/about` | AboutView | |
| `/contact` | ContactView | |
| `/book` | BookView | ?service=slug |
| `/faq` | FAQView | |
| `/privacy` | PrivacyView | |
| `/terms` | TermsView | |
| `/:pathMatch(.*)*` | NotFoundView | 404 |

## Key Components

### BookView.vue (Multi-Step Wizard)

4-step booking wizard with card-based service selection:

```
Step 1: Service Selection
├── Pre-selected mode (?service=slug) → Summary card
└── Manual selection → Clickable service cards

Step 2: Personal Info
├── firstName, lastName, email, phone
└── Continue button

Step 3: Scheduling
├── Date picker, time selector
├── Address input
└── Notes textarea

Step 4: Confirmation
└── Success message
```

**Key Selectors (E2E Testing):**
```typescript
// Service cards (not dropdown)
serviceCards: '.border-2.rounded-xl.cursor-pointer'

// Pre-selected service summary
preselectedServiceSummary: 'text=Selected Service' + border styling

// Form inputs (standard)
firstNameInput: 'input[name="firstName"]'
continueButton: 'button:has-text("Continue")'
```

### ChatWidget.vue (Floating AI Assistant)

Floating chat widget with data-testid attributes:

```
┌─────────────────────────────────────┐
│ [data-testid="chat-window"]         │
│ ┌─────────────────────────────────┐ │
│ │ Messages scroll area            │ │
│ │ [data-testid="emergency-banner"]│ │ (conditional)
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [data-testid="chat-input"]      │ │
│ │ [data-testid="chat-send"]       │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
         [data-testid="chat-toggle"]   (FAB button)
         [data-testid="chat-close"]    (X button when open)
```

**Key Selectors (E2E Testing):**
```typescript
toggle: '[data-testid="chat-toggle"]'
window: '[data-testid="chat-window"]'
closeButton: '[data-testid="chat-close"]'
input: '[data-testid="chat-input"]'
sendButton: '[data-testid="chat-send"]'
emergencyBanner: '[data-testid="emergency-banner"]'
```

## Key Patterns

### Lazy Loading
All routes use dynamic imports:
```typescript
component: () => import('@/views/HomeView.vue')
```

### Composable Pattern
```typescript
// useChat.ts
export function useChat() {
  const messages = ref<ChatMessage[]>([])
  // ... reactive state
  return { messages, sendMessage, ... }
}
```

### Store Composition
```typescript
// In component
const servicesStore = useServicesStore()
const { featured, loading } = storeToRefs(servicesStore)
await servicesStore.fetchAll()
```

## Type Definitions

```typescript
// types/index.ts
interface Service {
  id: string
  category: ServiceCategory
  name: string
  slug: string
  shortDescription: string
  fullDescription: string
  price: number
  priceNote?: string
  duration?: string
  benefits: string[]
  ingredients?: string[]
  image?: string
  featured: boolean
  sortOrder: number
  active: boolean
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isEmergency?: boolean
}

type ServiceCategory =
  | 'iv-therapy'
  | 'vitamin-injection'
  | 'wellness-consultation'
  | 'event-service'
```
