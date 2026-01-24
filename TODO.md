# Oak IV - Deployment & Setup TODO

> Checklist of remaining tasks to go live

## AWS Infrastructure Setup

### 1. Connect GitHub to Amplify Console
- [ ] Go to AWS Amplify Console
- [ ] Click "New app" → "Host web app"
- [ ] Connect GitHub repository: `Generative-Bricks/oakiv-website`
- [ ] Configure branch deployments:
  - `main` → Production
  - `staging` → Staging (optional)
  - `dev` → Development (optional)
- [ ] Set build settings (should auto-detect from `amplify.yml`)

### 2. Deploy Amplify Backend
- [ ] Verify AWS credentials are configured
- [ ] Run: `npx ampx pipeline-deploy --branch main --app-id <APP_ID>`
- [ ] Verify `amplify_outputs.json` is populated
- [ ] Test that frontend connects to backend

### 3. Create Bedrock Knowledge Base
- [ ] Go to Amazon Bedrock Console → Knowledge Bases
- [ ] Create new Knowledge Base named "oak-iv-wellness-kb"
- [ ] Configure S3 data source: `s3://oakiv-assets/knowledge-base/`
- [ ] Select embedding model (Titan or Cohere)
- [ ] Create and sync the Knowledge Base
- [ ] Copy Knowledge Base ID
- [ ] Set `KNOWLEDGE_BASE_ID` environment variable in Amplify Console:
  - Go to App settings → Environment variables
  - Add: `KNOWLEDGE_BASE_ID` = `<your-kb-id>`

### 4. Upload Knowledge Base Content
Create and upload these documents to S3 `knowledge-base/` folder:
- [ ] `services.md` - All IV therapy and injection services with details
- [ ] `faq.md` - Common questions and answers
- [ ] `about.md` - Company info, service areas, team
- [ ] `policies.md` - Booking, cancellation, medical disclaimers
- [ ] Sync Knowledge Base after upload

### 5. Seed DynamoDB Data
- [ ] Create seed script or use Amplify Console Data Manager
- [ ] Add services:
  - IV Therapy (Myers Cocktail, Immunity Boost, Hangover Relief, etc.)
  - Vitamin Injections (B12, Vitamin D, Glutathione, etc.)
  - Wellness Consultations
  - Event Services
- [ ] Add testimonials (3-5 featured reviews)
- [ ] Add articles (2-3 wellness/education posts)

### 6. Upload S3 Assets
- [ ] Upload logo to `public/logo.png`
- [ ] Upload service images to `services/`
- [ ] Upload article images to `articles/`
- [ ] Verify public read access works

### 7. Domain Configuration
- [ ] Go to Amplify Console → Domain management
- [ ] Add custom domain: `oakivhydration.com`
- [ ] Configure DNS records (CNAME or ALIAS)
- [ ] Enable HTTPS (auto-provisioned SSL)
- [ ] Add `www` subdomain redirect
- [ ] Update CORS in `amplify/functions/chat/handler.ts` if needed

### 8. Production Verification
- [ ] Test all pages load correctly
- [ ] Test contact form submission
- [ ] Test booking form submission
- [ ] Test AI chat widget responses
- [ ] Test emergency keyword detection in chat
- [ ] Verify mobile responsiveness
- [ ] Run Lighthouse audit (target: 90+ performance)

---

## Content Tasks

### Services to Add
| Service | Category | Price | Status |
|---------|----------|-------|--------|
| Myers Cocktail | IV_THERAPY | $175 | [ ] |
| Immunity Boost | IV_THERAPY | $199 | [ ] |
| Hangover Relief | IV_THERAPY | $150 | [ ] |
| Energy Boost | IV_THERAPY | $175 | [ ] |
| Beauty Glow | IV_THERAPY | $225 | [ ] |
| Athletic Recovery | IV_THERAPY | $199 | [ ] |
| B12 Injection | VITAMIN_INJECTION | $35 | [ ] |
| Vitamin D Injection | VITAMIN_INJECTION | $45 | [ ] |
| Glutathione | VITAMIN_INJECTION | $55 | [ ] |
| Lipo-B (MIC) | VITAMIN_INJECTION | $45 | [ ] |
| Wellness Consultation | WELLNESS_CONSULTATION | $75 | [ ] |
| Corporate Events | EVENT_SERVICE | Custom | [ ] |
| Party/Wedding Services | EVENT_SERVICE | Custom | [ ] |

### Testimonials to Add
- [ ] 3-5 customer reviews with names, locations, services received
- [ ] At least 2 marked as `featured: true`

### Knowledge Base Documents
- [ ] Write comprehensive services guide (1500+ words)
- [ ] Write FAQ document (20+ questions)
- [ ] Write about/company info
- [ ] Write medical disclaimer and policies

---

## Post-Launch

- [ ] Set up Google Analytics
- [ ] Set up Google Search Console
- [ ] Submit sitemap
- [ ] Monitor CloudWatch logs for errors
- [ ] Set up billing alerts in AWS
- [ ] Test booking flow end-to-end
- [ ] Gather initial customer feedback

---

## Quick Commands Reference

```bash
# Development
npm run dev                    # Start local server
npm run build                  # Production build
npm run test                   # Unit tests
npm run test:e2e               # E2E tests

# Amplify
npx ampx sandbox               # Local sandbox
npx ampx sandbox delete        # Cleanup sandbox
npx ampx generate outputs      # Regenerate outputs
npx ampx pipeline-deploy       # Deploy to AWS
```

---

**Last Updated:** January 24, 2026
