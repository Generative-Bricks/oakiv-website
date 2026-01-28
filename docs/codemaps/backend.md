# Backend Architecture

**Generated:** 2026-01-28T15:45:00Z
**Stack:** AWS Amplify Gen 2 + DynamoDB + Lambda + Bedrock

## Directory Structure

```
amplify/
├── backend.ts              # Main config + IAM policies
├── auth/
│   └── resource.ts         # Cognito: MFA, groups, password policy
├── data/
│   └── resource.ts         # Schema: 7 models, authorization rules
├── storage/
│   └── resource.ts         # S3: images, assets
└── functions/
    └── chat/
        ├── resource.ts     # Lambda definition
        └── handler.ts      # Bedrock integration + safety
```

## Authentication (Cognito)

```typescript
// auth/resource.ts
export const auth = defineAuth({
  loginWith: { email: true },
  multifactor: { mode: 'REQUIRED' },  // HIPAA
  userAttributes: { ... },
  groups: ['Admin', 'Staff', 'Customer'],
  passwordPolicy: {
    minLength: 12,
    requireLowercase: true,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: true
  }
})
```

### User Groups
| Group | Permissions |
|-------|-------------|
| Admin | Full CRUD on all models |
| Staff | Read bookings/contacts, update status |
| Customer | Read own bookings only |
| Guest (IAM) | Read services/testimonials, create contact/booking |

## Data Schema (DynamoDB)

### Models

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│    Service      │  │  Testimonial    │  │    Article      │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ category (enum) │  │ quote           │  │ title           │
│ name            │  │ authorName      │  │ slug            │
│ slug            │  │ authorLocation  │  │ excerpt         │
│ shortDescription│  │ serviceReceived │  │ content         │
│ fullDescription │  │ rating          │  │ category (enum) │
│ price           │  │ featured        │  │ status (enum)   │
│ benefits[]      │  │ active          │  │ author          │
│ featured        │  └─────────────────┘  └─────────────────┘
│ active          │
└─────────────────┘

┌─────────────────┐  ┌─────────────────┐
│ContactSubmission│  │ BookingRequest  │
├─────────────────┤  ├─────────────────┤
│ name            │  │ service         │
│ email           │  │ preferredDate   │
│ phone           │  │ preferredTime   │
│ message         │  │ name/email/phone│
│ status (enum)   │  │ address         │
│ lastAccessedBy  │  │ status (enum)   │
│ lastAccessedAt  │  │ ownerEmail      │ ← Owner auth
└─────────────────┘  └─────────────────┘
```

### Authorization Matrix

| Model | Guest | Auth | Owner | Admin | Staff |
|-------|-------|------|-------|-------|-------|
| Service | R | R | - | CRUD | - |
| Testimonial | R | R | - | CRUD | - |
| Article | R | R | - | CRUD | - |
| ContactSubmission | C | - | - | RU | RU |
| BookingRequest | C | - | R | CRU | CRU |

R=Read, C=Create, U=Update, D=Delete

### Enums
```typescript
ServiceCategory: ['IV_THERAPY', 'VITAMIN_INJECTION', 'WELLNESS_CONSULTATION', 'EVENT_SERVICE']
ArticleCategory: ['WELLNESS_TIPS', 'IV_EDUCATION', 'NUTRITION', 'NEWS']
ArticleStatus: ['DRAFT', 'PUBLISHED', 'ARCHIVED']
ContactStatus: ['NEW', 'READ', 'RESPONDED', 'ARCHIVED']
BookingStatus: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']
```

## Chat Function (Lambda + Bedrock)

### Flow
```
Request → Validate → Emergency Check → RAG (KB) → Fallback (Direct) → Response
            │              │              │              │
            ▼              ▼              ▼              ▼
         400 error    911 guidance   KB + Claude   Claude only
```

### Configuration
```typescript
// Environment
KNOWLEDGE_BASE_ID     // Bedrock KB ID
BEDROCK_MODEL_ID      // anthropic.claude-sonnet-4-20250514
AWS_REGION            // us-east-1

// Security
MAX_MESSAGE_LENGTH: 2000
ALLOWED_ORIGINS: ['https://oakivhydration.com', ...]
AUTH: AWS_IAM (Function URL)
```

### Emergency Keywords
```typescript
const EMERGENCY_KEYWORDS = [
  'emergency', 'heart attack', 'stroke', "can't breathe",
  'severe pain', 'unconscious', 'bleeding heavily', 'chest pain',
  'overdose', 'seizure', 'anaphylaxis', 'allergic reaction severe',
  'passing out', 'fainted'
]
```

### IAM Policies (backend.ts)

```typescript
// Bedrock model access - scoped to specific models
{
  actions: ['bedrock:InvokeModel'],
  resources: [
    'arn:aws:bedrock:${region}::foundation-model/anthropic.claude-sonnet-4-*',
    'arn:aws:bedrock:${region}::foundation-model/anthropic.claude-3-5-sonnet*'
  ]
}

// Knowledge Base access - scoped to account
{
  actions: ['bedrock:RetrieveAndGenerate', 'bedrock:Retrieve'],
  resources: ['arn:aws:bedrock:${region}:${accountId}:knowledge-base/*']
}

// Authenticated users can invoke chat function
{
  actions: ['lambda:InvokeFunctionUrl'],
  resources: [chatFunction.functionArn]
}
```

## Storage (S3)

```typescript
// storage/resource.ts
export const storage = defineStorage({
  name: 'oakiv-assets',
  access: (allow) => ({
    'images/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
      allow.groups(['Admin']).to(['read', 'write', 'delete'])
    ],
    'assets/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read'])
    ]
  })
})
```

## Deployment

### Branch Strategy
| Branch | Environment | Backend |
|--------|-------------|---------|
| main | Production | prod |
| staging | Pre-prod | staging |
| dev | Development | sandbox |
| feature/* | Preview | ephemeral |

### CI/CD (amplify.yml)
```yaml
backend:
  phases:
    build:
      commands:
        - npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
frontend:
  phases:
    preBuild:
      commands:
        - npx ampx generate outputs --branch $AWS_BRANCH --app-id $AWS_APP_ID
```
