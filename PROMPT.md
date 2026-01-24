# Oak IV - Conversation Resume Prompt

> Copy this prompt when starting a new conversation to continue work on the Oak IV project.

---

## Project Context

I'm working on the **Oak IV Hydration & Wellness** website rebuild. This is a Vue 3 SPA with AWS Amplify Gen 2 backend and Amazon Bedrock AI assistant.

**Repository:** `/Users/guymrnustik/Desktop/projects/oakiv-repos`
**GitHub:** https://github.com/Generative-Bricks/oakiv-website

## Tech Stack

- Vue 3 + Vite + TypeScript + Tailwind CSS 4
- AWS Amplify Gen 2 (Auth, Data, Storage, Functions)
- Amazon Bedrock (Claude Sonnet + Knowledge Bases for RAG)
- Vitest (unit tests) + Playwright (E2E tests)

## Current Status

**Code Complete:**
- All Vue components and views
- Amplify backend configuration (auth, data schema, storage, chat function)
- AI chat widget with safety guardrails
- Unit and E2E test infrastructure
- CI/CD configuration (amplify.yml)

**AWS Infrastructure NOT YET DEPLOYED:**
- No production Amplify backend
- No Bedrock Knowledge Base created
- No seed data in DynamoDB
- Domain not connected

## Key Files

- `amplify/data/resource.ts` - DynamoDB schema (CRITICAL: no .default() on enums)
- `amplify/functions/chat/handler.ts` - Bedrock Lambda with safety guardrails
- `amplify/backend.ts` - Main backend config with IAM policies
- `CLAUDE.md` - Full project documentation
- `AGENTS.md` - AI agent instructions
- `TODO.md` - Remaining deployment tasks

## Known Constraints

1. **Amplify Gen 2:** `.default()` does NOT work on `a.ref()` or `a.enum()` types
2. **Security:** Always scope IAM to specific ARNs, never use wildcards
3. **Function URLs:** Must use `FunctionUrlAuthType.AWS_IAM`, never NONE
4. **HIPAA:** MFA is REQUIRED, owner-based access for bookings

## What I Need Help With

[FILL IN YOUR SPECIFIC REQUEST HERE]

Examples:
- "Help me deploy the Amplify backend to production"
- "Create the Bedrock Knowledge Base and connect it"
- "Seed the DynamoDB tables with initial service data"
- "Set up the custom domain oakivhydration.com"
- "Review and fix any security issues"

---

**Important:** Read `CLAUDE.md` and `TODO.md` for full context before starting work.
