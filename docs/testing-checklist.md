# Testing Checklist

# Refab Connect / AI-WOC

## Core workflow test

- App opens without error
- Start correction workflow is visible
- Work order/router image can be uploaded or captured
- Manual entry works if extraction fails
- Work order number can be confirmed
- Part number can be confirmed
- Operation/process can be confirmed
- Correction type can be selected
- Category can be selected
- Priority can be selected
- Problem summary can be entered
- Requested Engineering action can be entered
- Report can be generated
- Email draft can be generated
- Send/copy action remains blocked until confirmation rules pass
- Confirmation checkboxes reset when key fields change
- Success/submission state is shown after completion

## Mobile testing

- iPhone Safari
- iPhone Chrome
- iPad Safari
- Desktop Chrome

## UI testing

- Text is readable on mobile
- Buttons are easy to tap
- Forms do not feel cramped
- Bottom navigation does not cover content
- Dark/glass styling is consistent
- No random one-off component styles

## Build checks

Run when available:

```bash
npm install
npm run typecheck
npm run build
```

## Bug log format

```text
BUG ID:
Title:
Screen:
Device:
Browser:
Steps to Reproduce:
Expected Result:
Actual Result:
Severity:
Status:
Fix Needed:
Retest Notes:
```
