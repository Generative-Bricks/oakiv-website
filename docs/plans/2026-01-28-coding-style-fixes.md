# Coding Style Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all coding style violations in the oakiv-website components directory to achieve 100% compliance with `.claude/rules/coding-style.md`.

**Architecture:** Systematic file-by-file fixes targeting inline styles (convert to Tailwind), magic numbers (extract to constants), and cleanup of unused starter template code.

**Tech Stack:** Vue 3, TypeScript, Tailwind CSS 4

---

## Task 1: Delete Unused Starter Template

**Files:**
- Delete: `src/components/HelloWorld.vue`

**Step 1: Verify HelloWorld is not imported anywhere**

Run: `grep -r "HelloWorld" src/`
Expected: No results (or only the file itself)

**Step 2: Delete the file**

Run: `rm src/components/HelloWorld.vue`

**Step 3: Run build to verify no breakage**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused Vite starter template component"
```

---

## Task 2: Fix ChatWidget Inline Styles (Animation Delays)

**Files:**
- Modify: `src/components/features/ChatWidget.vue:87-89`

**Step 1: Locate the inline styles**

Current code (lines 87-89):
```vue
<div class="w-2 h-2 bg-oak-green-primary rounded-full animate-bounce" style="animation-delay: 0ms" />
<div class="w-2 h-2 bg-oak-green-primary rounded-full animate-bounce" style="animation-delay: 150ms" />
<div class="w-2 h-2 bg-oak-green-primary rounded-full animate-bounce" style="animation-delay: 300ms" />
```

**Step 2: Replace with Tailwind arbitrary values**

New code:
```vue
<div class="w-2 h-2 bg-oak-green-primary rounded-full animate-bounce [animation-delay:0ms]" />
<div class="w-2 h-2 bg-oak-green-primary rounded-full animate-bounce [animation-delay:150ms]" />
<div class="w-2 h-2 bg-oak-green-primary rounded-full animate-bounce [animation-delay:300ms]" />
```

**Step 3: Run dev server and verify loading animation works**

Run: `npm run dev`
Expected: Chat widget loading dots animate with staggered bounce

**Step 4: Commit**

```bash
git add src/components/features/ChatWidget.vue
git commit -m "style: replace inline animation-delay with Tailwind arbitrary values"
```

---

## Task 3: Fix ChatWidget Custom Animation (Move to Tailwind Config)

**Files:**
- Modify: `src/components/features/ChatWidget.vue:165-179` (remove scoped styles)
- Modify: `tailwind.config.js` or `tailwind.config.ts` (add animation)

**Step 1: Check Tailwind config location**

Run: `ls tailwind.config.*`
Expected: Find the config file

**Step 2: Add custom animation to Tailwind config**

Add to `theme.extend.animation`:
```js
'slide-in-from-bottom': 'slide-in-from-bottom 0.2s ease-out',
```

Add to `theme.extend.keyframes`:
```js
'slide-in-from-bottom': {
  from: { opacity: '0', transform: 'translateY(1rem)' },
  to: { opacity: '1', transform: 'translateY(0)' },
},
```

**Step 3: Update ChatWidget template class**

Replace `animate-in slide-in-from-bottom-4` with `animate-slide-in-from-bottom`

**Step 4: Remove scoped styles from ChatWidget**

Delete lines 165-179 (the `<style scoped>` block with custom animation)

**Step 5: Run dev server and verify animation works**

Run: `npm run dev`
Expected: Chat window slides in when opened

**Step 6: Commit**

```bash
git add src/components/features/ChatWidget.vue tailwind.config.*
git commit -m "refactor: move chat widget animation to Tailwind config"
```

---

## Task 4: Fix AppHeader Logo Error Handler

**Files:**
- Modify: `src/components/layout/AppHeader.vue:122-126`

**Step 1: Add reactive ref for logo visibility**

Add to script section after `mobileMenuOpen`:
```typescript
const logoVisible = ref(true)
```

**Step 2: Update handleLogoError function**

Replace current function:
```typescript
function handleLogoError(event: Event) {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}
```

With:
```typescript
function handleLogoError() {
  logoVisible.value = false
}
```

**Step 3: Update template to use v-show**

Change the img element to include:
```vue
<img
  v-show="logoVisible"
  src="/assets/logo_color.png"
  ...
/>
```

**Step 4: Run build to verify no TypeScript errors**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/components/layout/AppHeader.vue
git commit -m "refactor: use reactive ref instead of direct DOM manipulation for logo error"
```

---

## Task 5: Extract Magic Numbers in TestimonialCarousel

**Files:**
- Modify: `src/components/home/TestimonialCarousel.vue:54-88`

**Step 1: Add constants at top of script section**

After imports, add:
```typescript
const AUTOPLAY_INTERVAL_MS = 6000
```

**Step 2: Replace magic number usage**

Change line 84 from:
```typescript
autoplayInterval.value = window.setInterval(nextSlide, 6000)
```

To:
```typescript
autoplayInterval.value = window.setInterval(nextSlide, AUTOPLAY_INTERVAL_MS)
```

**Step 3: Run build to verify no errors**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/components/home/TestimonialCarousel.vue
git commit -m "refactor: extract autoplay interval to named constant"
```

---

## Task 6: Final Verification

**Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with no errors or warnings

**Step 2: Run tests**

Run: `npm run test`
Expected: All tests pass

**Step 3: Visual verification**

Run: `npm run dev`
Check:
- [ ] Chat widget opens with slide animation
- [ ] Chat loading dots animate with stagger
- [ ] Testimonial carousel auto-advances every 6 seconds
- [ ] Logo displays correctly (or hides gracefully on error)

**Step 4: Final commit (if any missed files)**

```bash
git status
# If any unstaged changes:
git add -A
git commit -m "chore: coding style compliance cleanup"
```

---

## Summary of Changes

| File | Change | Rule Fixed |
|------|--------|------------|
| `HelloWorld.vue` | Deleted | Cleanup unused code |
| `ChatWidget.vue` | Inline styles → Tailwind | No inline styles |
| `ChatWidget.vue` | Scoped CSS → Tailwind config | No inline styles |
| `AppHeader.vue` | DOM manipulation → reactive ref | No inline styles |
| `TestimonialCarousel.vue` | `6000` → `AUTOPLAY_INTERVAL_MS` | No magic numbers |
