# App Architecture

# Refab Connect / AI-WOC Structured Build

## Architecture principle

Keep the workflow stable and separate UI, domain logic, utilities, and documentation.

## Folder ownership

```text
app/                 Next.js routes, layout, page entry, API routes
components/          Reusable UI and layout components
features/woc/        Work Order Correction data, logic, generators, validation
lib/                 Shared constants and utilities
styles/              Global CSS foundations and design tokens
public/icons/        App icons and PWA icons
public/logos/        Refab Connect / Applied Intelligence logo assets
public/images/       Supporting UI images and screenshots
docs/                Project documentation, audits, migration maps, testing notes
```

## App layer

The `app` folder owns routing and high-level screen composition.

It should not become a junk drawer for every business rule.

## Feature layer

The `features/woc` folder owns Work Order Correction-specific logic.

Expected files:

- `types.ts`
- `defaults.ts`
- `options.ts`
- `validation.ts`
- `reportGenerator.ts`
- `emailDraftGenerator.ts`
- `routerExtraction.ts`

## UI layer

The `components` folder owns reusable interface pieces.

Expected component groups:

- `components/layout`
- `components/ui`
- `components/woc`

## Styling layer

Global visual rules live in `styles`.

Expected files:

- `tokens.css`
- `base.css`
- `layout.css`
- `components.css`

## Prototype migration rule

Use `kool1160/Applied-intelligence-Ai-Woc` as the working prototype reference.

Move one feature at a time.

Do not copy the old app wholesale.

## Ticket rule

One ticket. One change. One test. Then move on.
