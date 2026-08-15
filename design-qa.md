# Design QA

## Reference and setup

- Reference: approved option 03 with the animated orbital hero.
- Implementation: local Vite page at `http://127.0.0.1:4173/`.
- Comparison viewport: reference at 1536 x 1024; implementation captured at the same requested viewport. The in-app browser reserves 15 px for its scrollbar, so the rendered content is 1521 px wide.
- Normalization: both screenshots were resized to 1536 x 1024 and placed side by side in `.qa/design-comparison.png` for the inspection pass.

## Iteration log

### Iteration 1

- Result: hero hierarchy, equal two-way split, graphite/white palette, violet accent and trust strip matched the reference direction.
- Difference accepted: the page uses the supplied professional portrait rather than the generated model in the reference.
- Difference accepted: choice imagery was regenerated as clean project assets with more negative space and less embedded interface text.
- Fix applied after responsive inspection: preserved the whitespace after the forced desktop headline break on mobile.
- Fix applied after content review: replaced unverified testimonial quotations with transparent benefit cards and a clear pending-print label.

### Iteration 2

- Result: passed at 390, 768, 1440 and 1536 px.
- No horizontal overflow in the home or business journey.
- Both entry cards keep equivalent visual weight on desktop and stack in the same order on smaller screens.
- Motion is visible in the portrait/orbital field, choice reveal and fork marker, with a `prefers-reduced-motion` fallback.
- Buttons, form fields, FAQ accordion, project dialog, calendar demo and mentorship application were exercised successfully.

## Final checklist

- [x] Layout and section hierarchy
- [x] Typography and spacing
- [x] Colors and borders
- [x] Responsive behavior
- [x] Keyboard-friendly semantic controls and visible focus
- [x] Motion and reduced-motion behavior
- [x] Images loaded successfully
- [x] No relevant overlap or horizontal overflow
- [x] TypeScript, lint, tests and production build

Status: passed.
