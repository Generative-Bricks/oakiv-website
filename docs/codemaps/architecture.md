# Architecture Overview

**Generated:** 2026-01-28T15:45:00Z
**Project:** Oak IV Hydration & Wellness

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│  Vue 3 SPA + Vite + TypeScript + Tailwind CSS 4                │
├─────────────────────────────────────────────────────────────────┤
│  Views (14)  │  Components (15)  │  Stores (3)  │  Composables │
│  - Home      │  - UI (4)         │  - services  │  - useChat   │
│  - Services  │  - Layout (3)     │  - chat      │              │
│  - Book      │  - Features (2)   │  - testimonials             │
│  - Contact   │  - Home (4)       │              │              │
└──────────────┬──────────────────────────────────────────────────┘
               │ HTTP/WebSocket
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AWS AMPLIFY GEN 2                            │
├─────────────────────────────────────────────────────────────────┤
│  Auth          │  Data           │  Storage     │  Functions   │
│  (Cognito)     │  (DynamoDB)     │  (S3)        │  (Lambda)    │
│  - MFA         │  - Service      │  - Images    │  - Chat      │
│  - Groups      │  - Testimonial  │  - Assets    │    (Bedrock) │
│  - IAM         │  - Article      │              │              │
│                │  - Booking      │              │              │
│                │  - Contact      │              │              │
└────────────────┴─────────────────┴──────────────┴──────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AMAZON BEDROCK                               │
│  Claude Sonnet + Knowledge Bases (RAG)                          │
│  - AI Wellness Assistant                                        │
│  - Emergency detection                                          │
│  - Service recommendations                                      │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow

### Chat Request
```
User → ChatWidget → useChat → Lambda (IAM Auth) → Bedrock → Response
                                   │
                                   ├─→ Emergency? → Safety response
                                   ├─→ KB available? → RAG response
                                   └─→ Fallback → Direct Claude
```

### Data Request
```
User → View → Store → Amplify Data Client → DynamoDB → Response
                           │
                           └─→ Authorization: guest/auth/owner/groups
```

## Module Dependencies

```
src/
├── main.ts ──────────────→ App.vue
│   ├── router/index.ts ──→ views/*
│   ├── stores/* ─────────→ types/index.ts
│   └── composables/* ────→ amplify_outputs.json
│
amplify/
├── backend.ts ───────────→ auth, data, storage, chatFunction
│   ├── auth/resource.ts ─→ Cognito config
│   ├── data/resource.ts ─→ Schema + Authorization
│   └── functions/chat/ ──→ Bedrock integration
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Vue 3 Composition API | Better TypeScript support, code reuse via composables |
| Pinia over Vuex | Simpler API, TypeScript-first, better devtools |
| Amplify Gen 2 | TypeScript-first backend, single source of truth |
| Function URL + IAM | Secure serverless without API Gateway overhead |
| Knowledge Bases (RAG) | Domain-specific responses from Oak IV content |
| Owner-based auth | HIPAA compliance for booking data |

## Security Boundaries

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     PUBLIC      │     │  AUTHENTICATED  │     │     ADMIN       │
│  (Guest IAM)    │     │   (Cognito)     │     │   (Groups)      │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ Read: Services  │     │ Read: Services  │     │ CRUD: All       │
│ Read: Testimonials    │ Read: Testimonials    │ Read: Bookings  │
│ Create: Contact │     │ Read: Own Bookings    │ Read: Contacts  │
│ Create: Booking │     │ Chat: Bedrock   │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```
