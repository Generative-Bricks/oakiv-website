# After-Hours Service Fee Time Update Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update after-hours service fee window from 5 PM - 9 PM to 7 PM - 9 PM

**Architecture:** Single source of truth pattern - all time configuration lives in `src/constants/hours.ts`. Update the constant and display strings; business logic automatically adapts.

**Tech Stack:** Vue 3 + TypeScript + Vitest

---

## Summary of Changes

| File | Change |
|------|--------|
| `src/constants/hours.ts` | Update `REGULAR_CLOSE_HOUR` from 17 to 19, update display strings |
| `tests/unit/utils/hours.test.ts` | Update test cases for new boundary (19:00 instead of 17:00) |

**Total files to modify:** 2

---

### Task 1: Update Constants File

**Files:**
- Modify: `src/constants/hours.ts:7,13,14,22`

**Step 1: Update the REGULAR_CLOSE_HOUR constant**

Change line 7 from:
```typescript
REGULAR_CLOSE_HOUR: 17, // 5pm - end of regular hours
```

To:
```typescript
REGULAR_CLOSE_HOUR: 19, // 7pm - end of regular hours
```

**Step 2: Update the HOURS_DISPLAY.REGULAR string**

Change line 13 from:
```typescript
REGULAR: '8:00 AM - 5:00 PM',
```

To:
```typescript
REGULAR: '8:00 AM - 7:00 PM',
```

**Step 3: Update the HOURS_DISPLAY.AFTER_HOURS string**

Change line 14 from:
```typescript
AFTER_HOURS: '5:00 PM - 9:00 PM',
```

To:
```typescript
AFTER_HOURS: '7:00 PM - 9:00 PM',
```

**Step 4: Update the AFTER_HOURS_MESSAGE.WARNING_TEXT string**

Change line 21-22 from:
```typescript
WARNING_TEXT:
  'Appointments between 5:00 PM - 9:00 PM include a $25 after-hours service fee.',
```

To:
```typescript
WARNING_TEXT:
  'Appointments between 7:00 PM - 9:00 PM include a $25 after-hours service fee.',
```

**Step 5: Verify the constants file looks correct**

Run: `cat src/constants/hours.ts`

Expected output should show:
- `REGULAR_CLOSE_HOUR: 19`
- `REGULAR: '8:00 AM - 7:00 PM'`
- `AFTER_HOURS: '7:00 PM - 9:00 PM'`
- `WARNING_TEXT` with `7:00 PM - 9:00 PM`

---

### Task 2: Update Unit Tests

**Files:**
- Modify: `tests/unit/utils/hours.test.ts`

**Step 1: Update regular hours test boundary**

The test for 4:00 PM should remain as "returns false" (still regular hours).

Add new tests for 5:00 PM and 6:00 PM as regular hours.

In the `describe('regular hours (8am-7pm)')` section (rename from 5pm), add:

```typescript
it('returns false for 5:00 PM (17:00)', () => {
  expect(isAfterHours('17:00')).toBe(false)
})
it('returns false for 6:00 PM (18:00)', () => {
  expect(isAfterHours('18:00')).toBe(false)
})
```

**Step 2: Update after hours test boundary**

Change the test at line ~21 that currently expects `17:00` to be after-hours.

Remove or update the test:
```typescript
// OLD - REMOVE
it('returns true for 5:00 PM (17:00)', () => {
  expect(isAfterHours('17:00')).toBe(true)
})
```

Replace with a test for 7:00 PM:
```typescript
// NEW - ADD
it('returns true for 7:00 PM (19:00)', () => {
  expect(isAfterHours('19:00')).toBe(true)
})
```

**Step 3: Remove 6:00 PM from after-hours tests**

The existing test for `18:00` expecting `true` needs to be moved/removed since 6 PM is now regular hours.

**Step 4: Run tests to verify all pass**

Run: `cd /Users/guymrnustik/Desktop/projects/oakiv-repos/oakiv-website && npm run test -- tests/unit/utils/hours.test.ts`

Expected: All tests PASS

---

### Task 3: Run Full Test Suite

**Step 1: Run all unit tests**

Run: `cd /Users/guymrnustik/Desktop/projects/oakiv-repos/oakiv-website && npm run test`

Expected: All tests PASS

**Step 2: Run build to verify no TypeScript errors**

Run: `cd /Users/guymrnustik/Desktop/projects/oakiv-repos/oakiv-website && npm run build`

Expected: Build completes successfully

---

### Task 4: Manual Verification (Visual Check)

**Step 1: Start dev server**

Run: `cd /Users/guymrnustik/Desktop/projects/oakiv-repos/oakiv-website && npm run dev`

**Step 2: Verify About page shows updated hours**

Navigate to `/about` and confirm:
- After-hours text shows "7:00 PM - 9:00 PM"

**Step 3: Verify Booking page time slots**

Navigate to `/book` and confirm:
- Time slots 5 PM, 6 PM do NOT show "+$25"
- Time slots 7 PM, 8 PM, 9 PM DO show "+$25"
- Selecting 7 PM shows the after-hours warning banner

---

### Task 5: Commit Changes

**Step 1: Stage changes**

```bash
git add src/constants/hours.ts tests/unit/utils/hours.test.ts
```

**Step 2: Commit with descriptive message**

```bash
git commit -m "$(cat <<'EOF'
feat(hours): update after-hours fee window from 5pm to 7pm

- Changed REGULAR_CLOSE_HOUR from 17 (5pm) to 19 (7pm)
- Updated display strings: regular hours now 8am-7pm
- After-hours window is now 7pm-9pm (was 5pm-9pm)
- Updated unit tests for new time boundaries

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Verification Checklist

- [ ] `REGULAR_CLOSE_HOUR` is `19`
- [ ] Display strings show `7:00 PM` as boundary
- [ ] Unit tests pass with new boundary conditions
- [ ] Build completes without errors
- [ ] Visual check confirms UI displays correct times
- [ ] Time slots 5 PM and 6 PM no longer show fee indicator
- [ ] Time slots 7 PM+ show fee indicator
