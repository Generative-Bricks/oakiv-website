# AGENTS.md - Oak IV Hydration & Wellness

> AI coding agent instructions for Vue 3 + AWS Amplify Gen 2 + Bedrock project

## Commands

```bash
# Development
npm run dev                    # Start Vite dev server (http://localhost:5173)
npm run build                  # Type-check + production build
npm run test                   # Run Vitest unit tests
npm run test:watch             # Watch mode

# Amplify Backend
npx ampx sandbox               # Start local sandbox (deploys to AWS)
npx ampx sandbox delete        # Clean up sandbox resources
npx ampx generate outputs      # Regenerate amplify_outputs.json

# Type Checking
npx vue-tsc --noEmit           # Check Vue + TS types
```

## Stack

- **Vue 3.5** + Vite 7 + TypeScript 5.9
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **Pinia 3** for state management
- **Vue Router 4** for routing
- **AWS Amplify Gen 2** (TypeScript backend)
- **Amazon Bedrock** (Claude Sonnet + Knowledge Bases)
- **Vitest** for testing

## Project Structure

```
amplify/                    # Backend (deploys to AWS)
├── auth/resource.ts        # Cognito config
├── data/resource.ts        # DynamoDB schema - CRITICAL FILE
├── storage/resource.ts     # S3 config
├── functions/chat/         # Bedrock Lambda
└── backend.ts              # Main config + IAM policies

src/
├── components/{ui,layout,features}/
├── views/                  # Route pages
├── composables/            # useChat, etc.
├── stores/                 # Pinia stores
├── router/                 # Vue Router
└── types/                  # TypeScript interfaces
```

## Critical Rules

### Amplify Data Schema (`amplify/data/resource.ts`)

**NEVER use `.default()` on enum types:**
```typescript
// WRONG - causes CDK assembly error
status: a.ref('ArticleStatus').default('DRAFT')
status: a.enum(['NEW', 'READ']).default('NEW')

// CORRECT
status: a.ref('ArticleStatus')
status: a.enum(['NEW', 'READ'])
```

### IAM Policies

**NEVER use wildcard resources:**
```typescript
// WRONG
resources: ['*']

// CORRECT - scope to specific ARNs
resources: [
  `arn:aws:bedrock:${region}::foundation-model/anthropic.claude-sonnet-4-20250514`
]
```

### Function URLs

**ALWAYS use IAM auth, never NONE:**
```typescript
authType: FunctionUrlAuthType.AWS_IAM  // CORRECT
authType: FunctionUrlAuthType.NONE     // WRONG - security risk
```

## Boundaries - Do NOT

- Add `.default()` to `a.ref()` or `a.enum()` types
- Use wildcard `*` in IAM resource ARNs
- Log user message content or PII in Lambda
- Use CORS `*` origin - specify allowed domains
- Commit `amplify_outputs.json` (gitignored)
- Skip MFA configuration (HIPAA requirement)
- Create public function URLs without IAM auth

## Code Style

- Vue 3 Composition API with `<script setup lang="ts">`
- Tailwind CSS classes (no custom CSS unless necessary)
- Pinia stores in `src/stores/` with `defineStore()`
- Composables in `src/composables/` prefixed with `use`
- Test files: `tests/unit/**/*.test.ts`

## Testing

```bash
# Unit tests (Vitest)
npm run test                   # Run all unit tests
npm run test -- ServiceCard    # Run specific test file
npm run test:watch             # Watch mode

# E2E tests (Playwright)
npm run test:e2e               # Run E2E tests headless
npm run test:e2e:ui            # Interactive Playwright UI
npm run test:e2e:headed        # Run in visible browser
npm run test:e2e:report        # View test report
```

Write unit tests in `tests/unit/` using Vitest:
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
```

Write E2E tests in `tests/e2e/` using Playwright:
```typescript
import { test, expect } from '@playwright/test'
```

## Git Workflow

- Branch: `feature/description` from `main`
- Commits: Conventional commits (`feat:`, `fix:`, `chore:`)
- PR: Squash merge to `main`
- Never force push to `main`

## Helpful Context

- **Design system:** See `CLAUDE.md` for brand colors
- **AI safety:** `amplify/functions/chat/handler.ts` has emergency detection
- **Auth groups:** Admin, Staff, Customer (Cognito)
- **Storage paths:** public/*, services/*, articles/*, knowledge-base/*

## Before Submitting PR

1. Run `npm run build` - must pass
2. Run `npm run test` - all tests pass
3. Verify `npx ampx sandbox` deploys without errors
4. Check no secrets or `amplify_outputs.json` committed
