# Refab Connect / AI-WOC

Structured application build for the Applied Intelligence Work Order Correction Agent.

## Purpose

Refab Connect / AI-WOC captures work order correction issues, confirms the affected work order, part number, process, and issue, then generates:

1. An Engineering Work Order Correction Report
2. A ready-to-review Engineering email draft

## Core workflow

Snap / Upload Work Order → Extract / Enter Details → Confirm Details → Select Correction Type → Generate Report → Generate Email Draft → Confirm Accuracy → Send / Copy / Save

## Hard rule

Draft first. Confirm accuracy. Then send.

## Prototype reference

The existing working prototype lives in:

`kool1160/Applied-intelligence-Ai-Woc`

This repo is the clean structured build. The prototype should be used as a donor/reference app, not copied blindly.

Borrow:
- Core workflow
- Working extraction logic
- Report wording
- Email draft wording
- Confirmation-before-send behavior
- Useful UI/brand pieces

Do not blindly copy:
- Tangled file structure
- Duplicate styling
- Dead code
- One-off UI patches
- Uncontrolled Codex changes

## Build discipline

One ticket. One change. One test. Then move on.

## Planned stack

- Next.js
- TypeScript
- React
- Mobile-first UI
- Server-side email route
- Optional AI Vision/OCR extraction route

## Folder map

```text
app/                 Next.js app routes, layout, global app entry
components/          Shared reusable UI and layout components
features/woc/        Work Order Correction domain logic
lib/                 Shared constants and utilities
styles/              Design tokens and CSS foundations
public/icons/        App icons
public/logos/        Brand/logo assets
public/images/       Supporting images
docs/                Product, architecture, UI, testing, and migration docs
```
