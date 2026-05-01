# Migration Map

# Prototype to Structured Build

## Prototype repo

`kool1160/Applied-intelligence-Ai-Woc`

## Structured build repo

`kool1160/refab-connect-ai-woc`

## Migration principle

Borrow the intelligence, not the mess.

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
| App shell | `components/layout` | Build reusable shell/navigation. |
| Shared buttons/cards/inputs | `components/ui` | Prevent one-off styling. |
| WOC screen sections | `components/woc` | Build screen pieces one at a time. |
| Send email route | `app/api/send/route.ts` | Server-side only. |
| AI Vision route | `app/api/extract-vision/route.ts` | Server-side only. |
| Icons | `public/icons` | Move real assets later. |
| Logos | `public/logos` | Move real assets later. |

## Migration ticket sequence

1. Audit prototype app
2. Build clean UI shell
3. Migrate WOC data model/options/defaults
4. Migrate report generator
5. Migrate email draft generator
6. Migrate validation/confirmation rules
7. Migrate capture/upload flow
8. Migrate OCR/Vision extraction
9. Migrate send email route
10. Test full workflow
