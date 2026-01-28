# CLAUDE.md - Oak IV Hydration & Wellness

## Project Overview

Oak IV is a mobile IV hydration and wellness service website serving the Dallas-Fort Worth Metroplex. This is a Vue 3 SPA with AWS Amplify Gen 2 backend and Amazon Bedrock AI assistant.

## Architecture Reference

For detailed architecture, see codemaps: @docs/codemaps/architecture.md @docs/codemaps/frontend.md @docs/codemaps/backend.md @docs/codemaps/data.md

## Tech Stack

- **Frontend:** Vue 3 + Vite + TypeScript + Tailwind CSS 4
- **State Management:** Pinia
- **Backend:** AWS Amplify Gen 2 (TypeScript-first)
- **Database:** DynamoDB (via Amplify Data)
- **Storage:** S3 (via Amplify Storage)
- **Auth:** Amazon Cognito with MFA (HIPAA compliance)
- **AI:** Amazon Bedrock with Claude Sonnet + Knowledge Bases (RAG)

## Commands

```bash
# Development
npm run dev              # Start Vite dev server
npm run build            # Type-check and build for production
npm run preview          # Preview production build
npm run test             # Run Vitest tests
npm run test:watch       # Run tests in watch mode
npm run test --coverage  # Run tests with coverage (requires @vitest/coverage-v8)

# Amplify
npx ampx sandbox         # Start local Amplify sandbox
npx ampx sandbox delete  # Clean up sandbox resources
npx ampx generate outputs # Generate amplify_outputs.json
```

## Project Structure

```
oakiv-repos/
├── amplify/                    # AWS Amplify Gen 2 backend
│   ├── auth/resource.ts        # Cognito config (MFA required)
│   ├── data/resource.ts        # DynamoDB schema
│   ├── storage/resource.ts     # S3 bucket config
│   ├── functions/chat/         # Bedrock Lambda function
│   │   ├── handler.ts          # Chat handler with safety guardrails
│   │   └── resource.ts         # Function definition
│   └── backend.ts              # Main backend config + IAM policies
├── docs/
│   └── codemaps/               # Architecture documentation
│       ├── architecture.md     # System overview + request flows
│       ├── frontend.md         # Vue components/stores/routing
│       ├── backend.md          # Amplify/Lambda/Bedrock
│       └── data.md             # Schema definitions
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── layout/             # Header, Footer, Layout
│   │   └── features/           # Feature-specific components
│   ├── views/                  # Page components
│   ├── composables/            # Vue composables (useChat, etc.)
│   ├── stores/                 # Pinia stores
│   ├── types/                  # TypeScript interfaces
│   ├── router/                 # Vue Router config
│   └── assets/styles/          # Tailwind CSS
└── tests/                      # Vitest tests
```

## Amplify Gen 2 Patterns

### Data Schema Rules

**CRITICAL:** `.default()` modifier only works on scalar types, NOT on `a.ref()` or `a.enum()` types.

```typescript
// WRONG - will cause CDK assembly error
status: a.ref('ArticleStatus').default('DRAFT')  // Error!
status: a.enum(['NEW', 'READ']).default('NEW')   // Error!

// CORRECT
status: a.ref('ArticleStatus')
status: a.enum(['NEW', 'READ'])
```

### Authorization Patterns

```typescript
// Guest read, admin write
.authorization(allow => [
  allow.guest().to(['read']),
  allow.authenticated().to(['read']),
  allow.groups(['Admin']).to(['create', 'update', 'delete', 'read'])
])

// Owner-based access (HIPAA compliance)
.authorization(allow => [
  allow.guest().to(['create']),
  allow.ownerDefinedIn('ownerEmail').to(['read']),
  allow.groups(['Admin', 'Staff']).to(['read', 'update'])
])
```

### IAM Policy Scoping

Always scope Bedrock permissions to specific models:

```typescript
new PolicyStatement({
  actions: ['bedrock:InvokeModel'],
  resources: [
    `arn:aws:bedrock:${region}::foundation-model/anthropic.claude-sonnet-4-20250514`,
    `arn:aws:bedrock:${region}::foundation-model/anthropic.claude-3-5-sonnet*`
  ]
})
```

## Security Requirements

- **Function URLs:** Use `FunctionUrlAuthType.AWS_IAM`, never `NONE`
- **CORS:** Specify allowed origins explicitly, no wildcards
- **MFA:** Required mode for HIPAA compliance
- **IAM:** Scope to specific resources, no wildcard `resources: ['*']`
- **Error Logging:** Never log sensitive user data (message content, PII)

## AI Assistant Safety

The chat handler (`amplify/functions/chat/handler.ts`) implements:

1. **Emergency Detection:** Keywords trigger immediate 911 guidance
2. **Input Validation:** 2000 character limit, sanitization
3. **Medical Disclaimers:** Cannot provide medical advice
4. **Safe Error Responses:** Generic errors without sensitive data

**CRITICAL:** Emergency detection also exists in `src/stores/chat.ts` for frontend fallback. Both locations must stay in sync. Test coverage exists in `tests/unit/stores/chat.test.ts`.

## Design System

```css
/* Brand Colors */
--oak-green-primary: #2E5B3C
--oak-green-light: #4A7C59
--oak-green-pale: #E8F0EB
--oak-gold: #C9A962
--oak-cream: #FAF9F6
--oak-text: #333333
--oak-text-light: #666666

/* Typography */
Font (body): Inter
Font (headings): Playfair Display
```

## Branch Strategy

- `main` - Production deployment
- `staging` - Pre-production testing
- `dev` - Development environment
- `feature/*` - Feature branches with PR previews

## CI/CD

Amplify Hosting handles deployments via `amplify.yml`:

```yaml
# Backend deploys per branch
npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID

# Frontend outputs generated after backend
npx ampx generate outputs --branch $AWS_BRANCH --app-id $AWS_APP_ID
```

## Booking Flow

- Service detail pages link to `/book?service={slug}` to pre-select the service
- `BookView.vue` reads query param and sets `selectedService` + `wasPreselected`
- Only `bookableServices` shown (excludes `vitamin-injection` category which are add-ons)
- Keep slugs consistent between `HomeView.vue` and `stores/services.ts` to avoid "Service Not Found"

## Testing

- **Unit tests:** `tests/unit/` with Vitest + Vue Test Utils
- **E2E tests:** `tests/e2e/` with Playwright
- **TDD approach:** Write failing tests first

```bash
npm run test              # Unit tests (Vitest)
npm run test:e2e          # E2E tests (Playwright)
npm run test:e2e:ui       # E2E with interactive UI
npm run test:e2e:headed   # E2E in visible browser
```

## E2E Testing with Playwright

### Page Object Pattern

```
tests/e2e/
├── pages/                  # Page Object Models
│   ├── base.page.ts        # Shared selectors/actions
│   ├── home.page.ts        # Homepage
│   ├── booking.page.ts     # Booking form (multi-step)
│   ├── chat.page.ts        # Chat widget
│   └── index.ts            # Barrel export
├── fixtures.ts             # Test fixtures
├── booking-flow.spec.ts    # User journey tests
├── chat-interaction.spec.ts # Chat behavior tests
└── service-detail.spec.ts  # Service pages
```

### Running E2E Tests

```bash
npx playwright test                    # All tests, all browsers
npx playwright test --project=chromium # Chrome only
npx playwright test --ui               # Interactive UI mode
npx playwright test --headed           # Visible browser
npm run test:e2e:report                # Open HTML report
```

HTML report auto-generates at `playwright-report/index.html` (multi-reporter: list + html).

### Writing E2E Tests

Use page objects and fixtures:

```typescript
import { test, expect } from './fixtures'

test('booking flow', async ({ homePage, bookingPage }) => {
  await homePage.goto()
  await homePage.clickBookNow()
  await bookingPage.selectServiceByName('Myers Cocktail')
  await bookingPage.proceedToStep2()
})
```

### Selector Best Practices

- Prefer `data-testid` attributes over CSS classes
- Use `getByText()` for user-visible content
- Avoid brittle Tailwind class selectors when possible

## Common Issues

### CDK Assembly Error: `a.ref(...).default is not a function`
Remove `.default()` from all `a.ref()` and `a.enum()` fields in `amplify/data/resource.ts`.

### Sandbox Not Deploying
1. Check AWS credentials: `aws sts get-caller-identity`
2. Delete existing sandbox: `npx ampx sandbox delete`
3. Restart: `npx ampx sandbox`

### Chat Function Not Working
1. Verify `KNOWLEDGE_BASE_ID` environment variable
2. Check IAM permissions for Bedrock model access
3. Review CloudWatch logs for the Lambda function

### Tests fail with "Cannot resolve amplify_outputs.json"
Create a minimal `amplify_outputs.json` at project root for tests:
```json
{ "version": "1", "custom": {} }
```
This file is generated by `npx ampx sandbox` but tests need a stub.
