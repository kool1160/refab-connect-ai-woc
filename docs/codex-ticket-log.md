# Codex Ticket Log

# Refab Connect / AI-WOC

## Ticket rule

One ticket. One change. One test. Then move on.

## Ticket template

```text
CODEX TICKET

Title:

Goal:

Context:

Files likely affected:

Instructions:

Do not change:

Acceptance checks:

Testing:
```

## Initial planned tickets

### Ticket 001 — Audit prototype app

Create `docs/rebuild-audit.md` by reviewing `kool1160/Applied-intelligence-Ai-Woc` without changing behavior.

### Ticket 002 — Build clean app shell

Create the reusable app shell, navigation pattern, and screen layout foundation.

### Ticket 003 — Migrate WOC domain model

Move WOC data types, options, defaults, and validation into `features/woc`.

### Ticket 004 — Migrate report generator

Move report generation logic into `features/woc/reportGenerator.ts`.

### Ticket 005 — Migrate email draft generator

Move subject/body draft generation into `features/woc/emailDraftGenerator.ts`.

### Ticket 006 — Migrate confirmation rules

Move readiness and confirmation logic into `features/woc/validation.ts`.

### Ticket 007 — Migrate capture/upload flow

Add controlled capture/upload screen and manual entry fallback.

### Ticket 008 — Full workflow test

Test snap/upload, confirm, issue, report, email draft, confirmation, and send/copy flow.
