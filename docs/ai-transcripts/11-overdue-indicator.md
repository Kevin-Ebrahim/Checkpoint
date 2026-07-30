# AI Transcript 13 — Derived Overdue Indicators

**Assessment:** COMS3011A Lab 1  
**Project:** Checkpoint  
**Date:** 30 July 2026  
**Tool:** Codex CLI  
**Model:** gpt-5.6-terra (medium)  
**Purpose:** Add derived overdue indicators to active tasks  
**Record type:** Faithful manually prepared record of the prompt and substantive Codex response

> This document is not a native Codex session export. It preserves the
> development prompt and substantive final response from the session.

## User Prompt

Please read `AGENTS.md` and inspect the current project before changing
anything.

For this task, I want overdue active tasks to be clearly identified.

Checkpoint already supports creating, editing, sorting, changing status, and
archiving tasks. Please preserve all of that behaviour and keep the current
frontend design.

A task is overdue only when:

- Its due date is before today's local date.
- Its status is not `Complete`.

A task due today is not overdue. A completed task is not overdue even when its
due date is in the past.

Overdue must remain derived behaviour. Do not add an overdue status, database
column, or stored flag.

Please calculate the result in a way that avoids timezone and hydration
problems. The due dates are stored as `YYYY-MM-DD` strings, so a date-only
comparison would probably be the simplest approach. Use the local date of the
machine running this local-first application rather than relying on a UTC date
that could be one day ahead or behind around midnight.

Update the active task cards so overdue tasks are visibly different.

The overdue treatment should:

- Include the visible word `Overdue`.
- Make the due-date area easy to notice.
- Fit the current retro control-desk design.
- Remain readable on narrow screens.
- Not rely on colour alone.
- Not replace or alter the task's actual status.

Please keep the existing `Todo`, `In-Progress`, and `Complete` controls exactly
as the available statuses.

The overdue appearance should update correctly when:

- A task's due date is edited.
- A task is changed to `Complete`.
- A completed past-due task is changed back to `Todo` or `In-Progress`.
- The page is reloaded.
- The application is restarted.
- A different sort order is selected.

Only active task cards need the overdue treatment during this task. Do not add
it to the archive page.

Please do not:

- Store overdue in SQLite.
- Add a fourth status.
- Change the database schema.
- Add dependencies.
- Add automated tests yet.
- Add filtering.
- Change the sorting behaviour.
- Add restore functionality.
- Modify existing AI transcripts.
- Make a Git commit.

When you are finished, verify the feature with tasks covering these cases:

1. A `Todo` task due yesterday is overdue.
2. An `In-Progress` task due yesterday is overdue.
3. A `Complete` task due yesterday is not overdue.
4. A task due today is not overdue.
5. A task due tomorrow is not overdue.
6. Changing an overdue task to `Complete` removes the overdue treatment.
7. Changing that task back to `Todo` or `In-Progress` restores the overdue
   treatment.
8. Editing the due date updates the result correctly.
9. Topic, status, due-date, and newest-first sorting still work.
10. Archived tasks remain excluded from the active list.
11. `npm run lint` passes.
12. `npm run build` passes.
13. `git diff --check` passes.

Please use the real application runtime for the checks where appropriate.

At the end, report:

- Every file created or modified.
- The approach used to calculate today's local date.
- Every command you ran.
- Whether each verification check passed.
- Any assumptions you made.
- Any deviation from the requested scope.

Please do not make a Git commit.

## Codex Response

Derived overdue indicators were implemented for active tasks only.

### Files modified

- `src/lib/tasks.js`
- `src/app/page.jsx`
- `src/components/TaskCard.jsx`
- `src/app/globals.css`

No files were created.

## Overdue calculation

The application creates today's date as a local `YYYY-MM-DD` value using:

- `getFullYear()`
- `getMonth()`
- `getDate()`

It does not use `toISOString()` or another UTC conversion.

The overdue condition is equivalent to:

```text
task.due_date < today
and
task.status is not Complete
```

Because both values use the sortable `YYYY-MM-DD` format, they can be compared
directly as date-only strings.

The derived Boolean is added only to the data used to render the active page.
It is not stored in SQLite.

## Interface changes

Overdue task cards now include:

- A heavier surrounding frame.
- A striped due-date panel.
- A visible `Overdue` label.
- An overdue marker independent of the task's actual status.

The design does not rely on colour alone.

The existing statuses remain:

```text
Todo
In-Progress
Complete
```

No fourth status was added.

## Verification

The following checks passed:

1. Yesterday with `Todo` is overdue.
2. Yesterday with `In-Progress` is overdue.
3. Yesterday with `Complete` is not overdue.
4. A task due today is not overdue.
5. A task due tomorrow is not overdue.
6. Changing an overdue task to `Complete` removes the overdue treatment.
7. Changing it back to `In-Progress` restores the overdue treatment.
8. Editing to a future date removes the treatment.
9. Editing back to yesterday restores the treatment.
10. Topic sorting continues to work.
11. Status sorting continues to work.
12. Due-date sorting continues to work.
13. Newest-first sorting continues to work.
14. Archived tasks remain excluded from the active page.
15. The archive page remains unchanged.
16. Reloading the page recalculates overdue state correctly.
17. Reloading a sorted URL preserves sorting and overdue behaviour.
18. Restarting the application preserves task data and recalculates the
    overdue state.
19. `npm run lint` passed.
20. `npm run build` passed.
21. `git diff --check` passed.

## Commands and inspection

Commands used included:

- Repository inspection with `sed`
- Repository searches with `rg`
- `git status`
- `git diff`
- `git log`
- `date` to produce local yesterday, today, and tomorrow values
- `mktemp`
- A temporary SQLite seeding script
- `npm run dev`
- Local route requests using `curl`
- Runtime assertions using Node.js
- `npm run lint`
- `npm run build`
- `git diff --check`

The development server was started twice to verify behaviour before and after
an application restart.

Temporary verification data was removed afterward. The normal development
database was not changed.

## Verification-script corrections

Two initial verification-script assertions required correction:

1. A form lookup assumed that rendered HTML attributes would appear in a fixed
   order.
2. A text assertion did not account for a React HTML comment inserted between
   rendered text nodes.

These were verification-script assumptions rather than application failures.

The application state transitions had succeeded. The checks were corrected and
rerun successfully.

## Assumptions

- The machine running Checkpoint has its intended local timezone configured.
- Stored due dates remain in the validated `YYYY-MM-DD` format.
- Existing deterministic sorting orders remain unchanged.

## Scope confirmation

The following were not added or changed:

- Database schema
- Stored overdue field
- Fourth task status
- Dependencies
- Automated tests
- Filtering
- Restore functionality
- Archived-task interface
- Existing transcript files
- Git history

There were no scope deviations.

No Git commit was created.

## User Review

I reviewed the reported implementation and verification results.

The feature correctly treats overdue as derived presentation behaviour rather
than persistent task state.

The implementation follows the required rule:

```text
Due before the current local date and not Complete
```

A task due today is not overdue, and a completed task is not marked overdue even
when its due date has passed.

Using locally constructed date components avoids changing the comparison date
through an unintended UTC conversion. Direct comparison is valid because both
dates use the normalised `YYYY-MM-DD` format.

The interface preserves the task's actual status and makes the overdue
condition visible through both text and structural styling.

The two corrected verification assertions concerned assumptions made by the
verification scripts, not defects in the implementation.

## Files Associated With This Stage

```text
src/lib/tasks.js
src/app/page.jsx
src/components/TaskCard.jsx
src/app/globals.css
docs/ai-transcripts/13-overdue-indicator.md
```

---

The preceding document was generated and edited with the assistance of Codex CLI[gpt-5.6-terra (medium)].
