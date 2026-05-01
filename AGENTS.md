# AGENTS.md

# Refab Connect / AI-WOC Codex Instructions

Owner:
Christopher Hilton / Applied Intelligence

Core Principle:
Standardize to Optimize

Application:
Refab Connect / AI-WOC

Purpose:
This app captures work order correction issues, confirms extracted or entered information, generates a structured Engineering Work Order Correction Report, and creates an Engineering email draft.

Prototype Reference:
Use `kool1160/Applied-intelligence-Ai-Woc` as the working prototype reference. Borrow proven workflow, wording, and logic. Do not blindly copy tangled structure, duplicate styles, dead code, or uncontrolled patches.

Core Workflow:
Snap / Upload Work Order → Extract / Enter Details → Confirm Details → Select Correction Type → Generate Report → Generate Email Draft → Confirm Accuracy → Send / Copy / Save

Hard Send Rule:
Draft first. Confirm accuracy. Then send.

Operator:
Chris is the operator. Do not bypass operator confirmation.

Project Rules:
- Do not redesign the app unless the ticket specifically requests UI redesign.
- Do not rename the app.
- Do not remove confirmation steps.
- Do not bypass the draft-first workflow.
- Do not mix unrelated fixes in one change.
- Do not remove working features unless specifically instructed.
- Keep changes small, reviewable, and testable.
- Preserve the existing brand direction unless instructed otherwise.
- Prefer mobile-first behavior.
- Keep UI rules separate from business logic.
- Keep Work Order Correction domain logic inside `features/woc` when possible.
- Keep reusable UI inside `components`.
- Keep constants/utilities inside `lib`.
- Keep documentation inside `docs`.

Preferred Workflow:
1. Read the ticket.
2. Inspect the existing repo.
3. Check this AGENTS.md file.
4. Make the smallest safe change.
5. Run available checks.
6. Report what changed.
7. List anything that still needs testing.

Definition of Done:
- The requested change is complete.
- Existing workflow still works.
- No unrelated styling or structure was changed.
- Acceptance checks are satisfied.
- Testing notes are provided.

Build Discipline:
One ticket. One change. One test. Then move on.
