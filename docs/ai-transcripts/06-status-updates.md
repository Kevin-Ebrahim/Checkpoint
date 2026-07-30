# AI Transcript 06 — Persistent Task Status Updates

**Assessment:** COMS3011A Lab 1  
**Project:** Checkpoint  
**Date:** 30 July 2026  
**Tool:** Codex CLI  
**Model:** gpt-5.6-terra (medium)  
**Purpose:** Add persistent status changes for existing tasks  
**Record type:** Faithful manually prepared record of the prompt and substantive Codex response

> This document is not a native Codex session export. It preserves the
> development prompt and the substantive final response from the session.

## User Prompt

Please read `AGENTS.md` and take a quick look through the current project before
changing anything.

For this task, I only want to add persistent task status updates.

Checkpoint already supports creating tasks and showing the active-task list.
Please keep the current structure, styling, validation, database setup, and task
creation behaviour intact.

Do not work on editing, archiving, restoring, archived-task views, sorting,
overdue indicators, automated tests, or documentation yet.

Add a task function in `src/lib/tasks.js` that changes the status of an existing
task.

The function should:

- Accept a task ID and a new status.
- Allow only `Todo`, `In-Progress`, or `Complete`.
- Reject any other value.
- Update the existing row rather than creating a new one.
- Update `updated_at` when the status changes.
- Use a parameterised SQL query.
- Handle an unknown task ID safely.
- Leave `archived_at` and all unrelated task fields unchanged.

Add a server action in `src/app/actions.js` for submitting the status change.

The action should:

- Read the task ID and selected status from form data.
- Validate both values on the server.
- Call the task function from `src/lib/tasks.js`.
- Refresh the active-task page after a successful update.
- Return a clear error without exposing SQL, stack traces, or file paths.
- Handle a missing task safely.

Update the existing task card so the user can change a task's status.

Please keep the interface simple and consistent with the existing
retro-futurist design. A labelled select control is fine. It should show exactly
these three options:

- `Todo`
- `In-Progress`
- `Complete`

Where practical, show a disabled or pending state while the update is being
submitted.

Do not add a modal, icon-only control, new dependency, API route, ORM, database
migration system, or new architectural layer.

Use the existing `.js` and `.jsx` conventions. Do not introduce TypeScript.

After a status change, the new status must appear in the active list and remain
correct after a page reload and application restart.

Please do not make any Git commits or modify existing AI transcript files.

When finished, verify the following:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Start the application.
4. Create or use an existing task.
5. Change its status from `Todo` to `In-Progress`.
6. Reload the page and confirm that `In-Progress` remains visible.
7. Change it to `Complete`.
8. Check SQLite directly and confirm:
   - The status is `Complete`.
   - The task ID did not change.
   - `archived_at` is still `null`.
   - `updated_at` changed.
9. Confirm that an invalid status is rejected.
10. Confirm that normal task creation still works.

At the end, report:

- Every file created or modified.
- Every command run.
- Whether each check passed.
- Any assumptions made.
- Any deviation from the requested scope.

## Codex Response

Persistent task status updates were implemented.

### Files modified

#### `src/lib/tasks.js`

- Added validation for task IDs.
- Added validation for task status values.
- Added a parameterised `updateTaskStatus(id, status)` operation.
- The operation updates only `status` and `updated_at`.
- The existing task ID is preserved.
- The archive state and all unrelated fields are preserved.
- Unknown task IDs safely return `null`.

#### `src/app/actions.js`

- Added a validated `updateTaskStatusAction`.
- The action returns safe, user-facing errors.
- The active-task page is revalidated after a successful status change.

#### `src/components/TaskCard.jsx`

- Added a labelled status select.
- The select contains exactly:
  - `Todo`
  - `In-Progress`
  - `Complete`
- Added a disabled pending state while the status change is submitted.
- Added inline success and error messages.
- Preserved the existing retro-futurist design.

### Verification

- `npm run lint` — passed.
- `npm run build` — passed.

The first production-build attempt was blocked by the sandbox's internal-port
restriction. The build was rerun outside the restricted sandbox and passed.

- `npm run dev` — started successfully.
- The active-task page responded on localhost.
- A verification task was created using the existing task-creation function.
- Its status was changed from `Todo` to `In-Progress`.
- The application was reloaded and the `In-Progress` status remained visible.
- Its status was then changed to `Complete`.

A direct SQLite inspection confirmed:

- The task ID remained `4`.
- The final status was `Complete`.
- `archived_at` remained `null`.
- `updated_at` advanced after each status change.

The invalid status `Overdue` was rejected with:

```text
Please select a valid task status.
```

Existing task creation remained functional.

### Scope confirmation

The existing `.jsx` component convention was retained.

The following were not added:

- General task editing
- Task archiving
- Task restoration
- An archived-task view
- Sorting
- Overdue indication
- Automated tests
- Documentation changes
- New dependencies
- API routes
- An ORM
- New architectural layers
- Git commits

There were no requested scope deviations.

Codex noted that the eventual commit must contain an accurate `Assisted-by`
trailer because the changes were AI-assisted.

## User Review

I reviewed the reported implementation against the requested scope.

The implementation remained focused on changing the status of an existing task
and did not introduce unrelated task-lifecycle features.

The status operation satisfies the important design requirements because:

- Only the three fixed statuses are accepted.
- `Overdue` is rejected rather than added as a status.
- The existing task row is updated in place.
- The task ID remains unchanged.
- The archive state remains unchanged.
- `updated_at` changes with each status update.
- Submitted values are validated on the server.
- SQL values are passed through a parameterised query.
- Unknown task IDs fail safely.
- Changes persist in SQLite after a page reload.

The user interface remains consistent with the existing visual design and
provides an explicit label, pending state, and inline feedback.

## Verification Commands

The following commands were reported as completed:

```bash
npm run lint
npm run build
npm run dev
```

The running application and SQLite database were then used to verify:

1. `Todo` to `In-Progress` persistence.
2. `In-Progress` to `Complete` persistence.
3. Stable task identity.
4. Unchanged archive state.
5. Updated timestamps.
6. Invalid-status rejection.
7. Continued task-creation behaviour.

## Files Associated With This Stage

```text
src/lib/tasks.js
src/app/actions.js
src/components/TaskCard.jsx
docs/ai-transcripts/06-status-updates.md
```

## Intended Commit Attribution

```text
[feat] add persistent task status updates

Assisted-by: OpenAI Codex CLI[gpt-5.6-terra (medium)]
```

---

The preceding document was generated and edited with the assistance of Codex CLI[gpt-5.6-terra (medium)].
