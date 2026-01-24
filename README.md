# Oak IV Hydration & Wellness

Mobile IV therapy and wellness service website for the Dallas-Fort Worth Metroplex.

## Tech Stack

- **Frontend:** Vue 3 + Vite + TypeScript + Tailwind CSS 4
- **Backend:** AWS Amplify Gen 2 (Auth, Data, Storage, Functions)
- **AI Assistant:** Amazon Bedrock (Claude Sonnet + Knowledge Bases)
- **Database:** DynamoDB
- **Auth:** Amazon Cognito with MFA

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Amplify sandbox (requires AWS credentials)
npx ampx sandbox
```

## Development Commands

```bash
npm run dev              # Start Vite dev server
npm run build            # Type-check and build
npm run test             # Run unit tests (Vitest)
npm run test:e2e         # Run E2E tests (Playwright)
npm run test:e2e:ui      # Playwright interactive UI
```

## Project Structure

```
├── amplify/              # AWS Amplify Gen 2 backend
│   ├── auth/             # Cognito configuration
│   ├── data/             # DynamoDB schema
│   ├── storage/          # S3 bucket config
│   └── functions/chat/   # Bedrock AI Lambda
├── src/
│   ├── components/       # Vue components
│   ├── views/            # Page components
│   ├── composables/      # Vue composables
│   ├── stores/           # Pinia stores
│   └── router/           # Vue Router
└── tests/
    ├── unit/             # Vitest unit tests
    └── e2e/              # Playwright E2E tests
```

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Detailed project documentation
- [AGENTS.md](./AGENTS.md) - AI coding agent instructions
- [TODO.md](./TODO.md) - Remaining tasks and deployment checklist
- [PROMPT.md](./PROMPT.md) - Context for continuing development

## Deployment

Connected to AWS Amplify Hosting with branch-based deployments:
- `main` → Production
- `staging` → Pre-production
- `dev` → Development

## Service Areas

Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Richardson, Garland, Irving, Arlington, and surrounding DFW communities.

## License

Proprietary - Generative Bricks / Oak IV Hydration & Wellness
