# UI / Icon / Brand Rules

# Refab Connect / AI-WOC

Owner: Christopher Hilton / Applied Intelligence

Core Principle: Standardize to Optimize

## Source purpose

This document is the locked UI, icon, and brand reference for Refab Connect / AI-WOC.

The app should feel like a fast mobile shop-floor tool, not a crowded ERP-style form.

Core UX principle:

> Fast, simple, guided, and hard to mess up.

## Current working context

AI-WOC is a lightweight work-order correction app for shop-floor use.

The working beta flow is:

1. Capture router/header photo
2. Use AI Vision to extract header fields
3. Verify extracted values
4. Build correction
5. Generate draft
6. Confirm and send
7. Start new correction

## Visual direction

The app should follow the newer Applied Intelligence / Refab Connect direction:

- Dark premium shell
- Glass / translucent chrome used mainly for navigation and key UI elements
- Red, black, silver/gray Refab brand influence
- Clean rounded cards
- Mobile-first layout
- iPhone/PWA-friendly spacing
- Compact premium bottom dock
- Avoid huge buttons, overbuilt cards, and cluttered one-page scrolling

Important design rule:

> The app should feel like a focused mobile task flow, not one long scrolling website.

## Navigation model

The app uses focused task views.

Bottom nav should stay simple:

- Home
- Capture
- Drafts
- History
- More

Build Correction is an internal workflow step, not a bottom-nav item.

Build Correction should be reached from:

- Home workflow card
- Capture view: Continue to Build Correction
- Drafts empty state: Build Correction button

Recommended workflow:

Home → Capture → AI Vision / Verify Header → Continue to Build Correction → Correction Type / Issue Fields → Generate Draft → Drafts → Confirm + Send → Start New Correction

## Icon asset storage plan

Do not replace app icons automatically until there is a specific Codex ticket to do so.

Store new icon assets for later use here:

```text
public/assets/icons/refab-connect-glass/
```

Suggested icon file names:

```text
home.png
capture.png
drafts.png
history.png
more.png
work-order.png
ai-vision.png
correction.png
send.png
```

If preserving the original uploaded icon pack zip, store it here:

```text
docs/design-assets/icon-packs/refab-connect-glass-icons.zip
```

## Icon usage rules

Icons should support the workflow, not decorate everything.

Use icons for:

- Bottom nav
- Workflow cards
- Major task actions
- Capture / AI Vision / correction / send states

Avoid using icons for every field or every small label.

Icon style direction:

- Premium glass
- Simple shapes
- Recognizable at small size
- Works on dark background
- Consistent sizing
- Not too much glow
- No visual clutter
- Avoid overly complex details that disappear at mobile size

Preferred bottom nav icon visual footprint:

```text
28px–34px
```

Labels should stay readable and should not wrap.

## Working features to preserve

Do not break these while changing UI/icons:

- AI Vision extraction
- Basic OCR fallback
- Uploaded image preview
- Quick Entry/header fields
- Focused task views
- Simplified correction type flow
- Generate Draft
- Confirmation checkboxes
- Send Email
- History
- Start New Correction / Clear Form
- Vercel environment variable usage
- Server-side AI key usage only

## Correction types

Keep correction entry simple.

Correction Type options:

- Incorrect Time / Rate
- Missing Grind / Finish Operation
- Missing Weld Operation
- Missing Fixture / Work Instruction
- Wrong / Missing Router Step
- Other

Do not reintroduce a long ERP-style list of options.

Core principle:

> Pick correction type, enter one or two values, review, send.

## AI Vision behavior

AI Vision is used to read the router/header photo.

Important extracted fields:

- Work Order
- Part Number
- Revision
- Customer
- Quantity

Best photo:

- Close, clear shot of the printed work order header
- Full router photos can be used as evidence/reference later

Core rule:

> Header photo = extraction. Full router photo = evidence/reference.

## UI problems to avoid bringing back

- Too much on one page
- Too many dropdowns
- Oversized bottom dock
- Six bottom nav items
- Placeholder junk in generated emails

## Design / development guardrails

Do not add these during UI/icon work:

- Database/storage
- Dashboard
- Barcode scanning
- ERP updates
- AI-CIS logic
- LIR logic
- ROI logic
- Case study logic
- New workflow agents
- Extra app sections unless explicitly requested

Focus on polishing the existing flow.

## UI polish priority order

1. Keep the focused task view flow working
2. Keep bottom dock compact
3. Make Capture → Build Correction → Drafts feel obvious
4. Make icons consistent and premium
5. Reduce field clutter
6. Improve one-page email output
7. Only then consider deeper visual/icon swaps

## Final UI principle

Applied Intelligence / Refab Connect should feel like a practical manufacturing tool built from the floor up.

> Standardize to Optimize.
>
> Make the correct action obvious.
>
> Make the wrong action hard to do.

## UI migration rule

Do not rebuild every screen at once.

Stabilize one screen or component group per Codex ticket.
