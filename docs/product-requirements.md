# Product Requirements

# Refab Connect / AI-WOC

## Purpose

Refab Connect / AI-WOC is a lightweight mobile-first application for creating controlled Engineering Work Order Correction requests.

The app helps a shop-floor user capture work order/router information, confirm the affected part and process, describe the issue, generate a structured correction report, and create an Engineering email draft.

## Core workflow

1. Start correction request
2. Snap or upload work order/router image
3. Extract or manually enter work order details
4. Confirm work order, part number, operation, process, and issue details
5. Select correction category and priority
6. Generate Engineering Work Order Correction Report
7. Generate Engineering email draft
8. Confirm accuracy
9. Send, copy, or save the request

## Hard send rule

Draft first. Confirm accuracy. Then send.

## Required outputs

1. Engineering Work Order Correction Report
2. Engineering email draft

## Required data fields

- Work Order Number
- Part Number
- Revision
- Customer
- Quantity
- Department
- Operation / Router Step
- Process
- Current Listed Rate / Condition
- Observed Sustainable Baseline
- Issue Type
- Correction Type
- Category
- Priority
- Problem Summary
- Requested Engineering Action
- Optional Note

## Required correction categories

- Welding
- Machining
- Fixtures
- Routing
- Material
- Hardware
- Quality
- Other

## Required correction types

- Incorrect Time / Rate
- Missing Grind / Finish Operation
- Missing Weld Operation
- Missing Fixture / Work Instruction
- Wrong / Missing Router Step
- Other

## Confirmation requirements

Before sending, the user must confirm:

- Work order number is correct
- Part number is correct
- Operation/process is correct
- Issue and requested correction are accurate
- Email draft is ready to send

## MVP boundaries

AI-WOC is not AI-CIS.

Do not generate:

- Lean Incident Reports
- ROI reports
- Case studies
- Quoting estimates
- RMA reports

AI-WOC owns controlled Engineering work order correction requests only.
