# Vue Standards Compliance Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Bring the oakiv-website codebase to 100% compliance with the vue-coding-standards skill.

**Architecture:** Four independent improvements: consolidate chat logic, add route meta types, normalize folder casing, and add defineModel to form components. Each task is self-contained with its own tests and commits.

**Tech Stack:** Vue 3.5+, TypeScript, Pinia, Vue Router 4, Vitest

---

## Task 1: Add Route Meta TypeScript Types

**Files:**
- Create: `src/router/types.ts`
- Modify: `src/router/index.ts:1-5`

**Step 1: Write the type definition file**

Create `src/router/types.ts`:

```typescript
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    requiresAdmin?: boolean
  }
}
```

**Step 2: Import types in router index**

Modify `src/router/index.ts` to add import at top:

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import './types' // Import route meta types

const routes: RouteRecordRaw[] = [
```

**Step 3: Verify TypeScript compilation**

Run: `npm run build`
Expected: No TypeScript errors, clean build

**Step 4: Commit**

```bash
git add src/router/types.ts src/router/index.ts
git commit -m "feat(router): add TypeScript types for route meta"
```

---

## Task 2: Consolidate Chat Logic (Remove Duplicate Composable)

**Files:**
- Delete: `src/composables/useChat.ts`
- Modify: `src/composables/index.ts`
- Modify: `src/components/features/ChatWidget.vue` (if using useChat)

**Step 1: Check ChatWidget imports**

Read `src/components/features/ChatWidget.vue` to verify which chat module it uses.

**Step 2: Update composables barrel export**

Modify `src/composables/index.ts` to remove useChat export:

```typescript
// Re-export composables
// useChat removed - use useChatStore from @/stores instead
```

**Step 3: Delete the duplicate composable**

Delete file: `src/composables/useChat.ts`

**Step 4: Verify no imports broken**

Run: `npm run build`
Expected: Clean build (no imports of useChat should exist)

**Step 5: Run existing tests**

Run: `npm run test`
Expected: All tests pass

**Step 6: Commit**

```bash
git add -A
git commit -m "refactor(chat): consolidate chat logic to useChatStore only"
```

---

## Task 3: Normalize Component Folder Casing

**Files:**
- Rename: `src/components/home/` → `src/components/Home/`
- Modify: All imports referencing `@/components/home/`

**Step 1: Identify files importing from home folder**

Run: `grep -r "components/home" src/`

**Step 2: Rename the folder**

```bash
mv src/components/home src/components/Home
```

**Step 3: Update imports in HomeView.vue**

Modify `src/views/HomeView.vue` imports:

```typescript
// Before
import HowItWorks from '@/components/home/HowItWorks.vue'
import ShopByBenefit from '@/components/home/ShopByBenefit.vue'
import TestimonialCarousel from '@/components/home/TestimonialCarousel.vue'
import TrustBadges from '@/components/home/TrustBadges.vue'

// After
import HowItWorks from '@/components/Home/HowItWorks.vue'
import ShopByBenefit from '@/components/Home/ShopByBenefit.vue'
import TestimonialCarousel from '@/components/Home/TestimonialCarousel.vue'
import TrustBadges from '@/components/Home/TrustBadges.vue'
```

**Step 4: Verify build**

Run: `npm run build`
Expected: Clean build

**Step 5: Commit**

```bash
git add -A
git commit -m "refactor(components): normalize Home folder to PascalCase"
```

---

## Task 4: Add defineModel to Form Components (Vue 3.4+ Pattern)

**Files:**
- Identify form input components that could use defineModel
- This task is exploratory - check if any custom form components exist

**Step 1: Search for v-model usage in custom components**

Run: `grep -r "v-model" src/components/`

**Step 2: Check for components with modelValue props**

Run: `grep -r "modelValue" src/components/`

**Step 3: If applicable, refactor to defineModel**

Example refactor pattern:

```typescript
// Before (old pattern)
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

// After (Vue 3.4+ defineModel)
const modelValue = defineModel<string>()
```

**Step 4: Verify build**

Run: `npm run build`
Expected: Clean build

**Step 5: Run tests**

Run: `npm run test`
Expected: All tests pass

**Step 6: Commit (if changes made)**

```bash
git add -A
git commit -m "refactor(forms): use defineModel for two-way binding"
```

---

## Task 5: Update Vue Coding Standards Skill with Project Specifics

**Files:**
- Modify: `oakiv-website/.claude/skills/vue-coding-standards/SKILL.md`

**Step 1: Add project-specific notes**

Add a section to SKILL.md:

```markdown
---

## Project-Specific Patterns (oakiv-website)

### Tailwind CSS 4
- Use Tailwind utility classes exclusively (no inline styles)
- Brand colors: `oak-green-primary`, `oak-gold`, `oak-cream`
- Use `@apply` sparingly in `<style scoped>`

### Amplify Integration
- Types in `src/types/index.ts` mirror Amplify Data schema
- Stores handle mock data until backend deployed
- Chat uses Bedrock Lambda via Function URL
```

**Step 2: Commit**

```bash
git add oakiv-website/.claude/skills/vue-coding-standards/SKILL.md
git commit -m "docs(skill): add project-specific patterns to vue-coding-standards"
```

---

## Verification Checklist

After all tasks complete:

- [ ] `npm run build` passes with no errors
- [ ] `npm run test` passes with no failures
- [ ] No TypeScript errors in IDE
- [ ] Route meta has type hints in IDE
- [ ] Only `useChatStore` exists (no `useChat` composable)
- [ ] `src/components/Home/` folder is PascalCase
- [ ] Git log shows 4-5 clean commits

---

## Notes

- Tasks 1-3 are definite improvements
- Task 4 depends on whether custom form components with v-model exist
- Task 5 is documentation-only
- Each task is independent and can be done in any order
