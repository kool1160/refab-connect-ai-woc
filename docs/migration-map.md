# Migration Map

# Prototype to Structured Build

## Prototype repo

`kool1160/Applied-intelligence-Ai-Woc`

## Structured build repo

`kool1160/refab-connect-ai-woc`

## Migration principle

Borrow the intelligence, not the mess.

## Source references

- `docs/ui-brand-rules.md` is the locked UI/icon/brand source.
- `AGENTS.md` is the Codex operating rulebook.
- The old prototype remains the donor/reference app.

## Feature migration map

| Prototype Feature | New Build Location | Notes |
|---|---|---|
| WOC data model | `features/woc/types.ts` | Keep typed data structures separate from UI. |
| Blank/default data | `features/woc/defaults.ts` | Keep defaults reusable. |
| Correction options | `features/woc/options.ts` | Move option lists out of page component. |
| Field validation | `features/woc/validation.ts` | Keep readiness checks testable. |
| Router text extraction | `features/woc/routerExtraction.ts` | Migrate carefully from prototype. |
| Report generation | `features/woc/reportGenerator.ts` | Preserve wording, separate from UI. |
| Email draft generation | `features/woc/emailDraftGenerator.ts` | Preserve subject/body format. |
| Focused task views | `app/page.tsx` + `components/woc` | Home, Capture, Drafts, History, More. |
| Build Correction internal step | `components/woc` | Do not add as sixth bottom-nav item. |
| App shell | `components/layout` | Build reusable shell/navigation. |
| Shared buttons/cards/inputs | `components/ui` | Prevent one-off styling. |
| WOC screen sections | `components/woc` | Build screen pieces one at a time. |
| Send email route | `app/api/send/route.ts` | Server-side only. |
| AI Vision route | `app/api/extract-vision/route.ts` | Server-side only. |
| Glass workflow icons | `public/assets/icons/refab-connect-glass` | Store future icon files here. |
| Icon pack archive | `docs/design-assets/icon-packs` | Store original icon zip here if needed. |
| Logos | `public/logos` or future `public/assets/logos` | Move real assets later. |

## UI migration rules

- Keep five bottom-nav items only: Home, Capture, Drafts, History, More.
- Keep Build Correction as an internal workflow step.
- Keep the focused task flow.
- Do not turn the app back into one long scrolling form.
- Do not add dashboard, database, barcode scanning, ERP update, AI-CIS, LIR, ROI, or case-study logic during UI migration.

## Migration ticket sequence

1. Audit prototype app
2. Build clean UI shell
3. Migrate WOC data model/options/defaults
4. Migrate report generator
5. Migrate email draft generator
6. Migrate validation/confirmation rules
7. Migrate focused task views and compact bottom nav
8. Migrate capture/upload flow
9. Migrate OCR/Vision extraction
10. Migrate send email route
11. Test full workflow

## Operator rule

Nothing moves from the old app into the new app unless it has a home, a ticket, and a test.
