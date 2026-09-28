---
name: navbar-toggle-fix
description: Fixed navbar not expanding from collapsed state when clicked
metadata:
  type: project
  modified: 2026-09-28
---

Fixed the navbar toggle issue in Header.jsx where clicking the nav pill would not expand the navbar from the collapsed state.

**Problem:** The `handlePillClick` function only set `setIsExpanded(true)` when collapsed, but did not toggle. Additionally, the scroll-driven expand/collapse logic would immediately counteract the change because it reacted to scroll direction.

**Solution:** 
1. Changed `handlePillClick` to toggle `isExpanded` with `setIsExpanded(!isExpanded)`.
2. Added an `ignoreScroll` state and a timeout mechanism to temporarily disable the scroll-driven logic after a manual toggle, preventing immediate conflict.
3. Used `useRef` to track the timeout ID and clear it appropriately to avoid memory leaks and state updates on unmounted components.

**How it works:** 
- When the user clicks the nav pill, the navbar toggles its expanded state.
- The scroll logic is ignored for 4 seconds after the click to allow the user's action to take effect without being overridden by scroll-based animations.
- After 1 second, the scroll logic resumes control.

**Verification:** Build passes without errors.