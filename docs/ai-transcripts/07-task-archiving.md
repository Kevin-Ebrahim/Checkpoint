# AI Transcript 07 — Task Archiving and Archived-Task View

**Assessment:** COMS3011A Lab 1  
**Project:** Checkpoint  
**Date:** 30 July 2026  
**Tool:** Codex CLI  
**Model:** gpt-5.6-terra (medium)  
**Purpose:** Add task archiving and a separate archived-task page  
**Record type:** Faithful manually prepared record of the prompt and substantive Codex response

> This document is not a native Codex session export. It preserves the
> development prompt and the substantive final response from the session.

## User Prompt

Please read `AGENTS.md` and have a quick look through the current project before
you start.

For this task, I want to add task archiving and a separate archived-task page.

Checkpoint already supports creating tasks, listing active tasks, and changing
their status. Please keep all of that working, along with the current database
design and retro-futurist styling.

For now, do not work on general task editing, restoring archived tasks,
sorting, overdue indicators, automated tests, or final documentation.

In `src/lib/tasks.js`, add a function for archiving an existing task.

Archiving should update the existing database row rather than delete it. It
should:

- Accept a task ID.
- Set `archived_at` to the current timestamp.
- Update `updated_at` at the same time.
- Use a parameterised SQL query.
- Keep the task ID and all existing task data unchanged.
- Handle an unknown task ID safely.
- Avoid making unnecessary changes if the task is already archived.

Also add a function that returns archived tasks using:

```sql
archived_at IS NOT NULL
```

In `src/app/actions.js`, add a server action for archiving a task.

The action should:

- Read and validate the task ID from the submitted form.
- Call the archive function from `src/lib/tasks.js`.
- Refresh both the active-task page and the archived-task page after success.
- Return a clear user-facing error without exposing SQL, stack traces, or
  internal file paths.
- Handle a missing task safely.

Update the active task card so that each task has a clearly labelled Archive
button.

Please keep the button consistent with the existing visual design. It should
use visible text, show a disabled or pending state while submitting, and must
not permanently delete the task. There is no need for a confirmation modal.

Create an archived-task page at:

```text
src/app/archive/page.jsx
```

The page should:

- Load archived tasks from SQLite.
- Display each task's title, description, due date, topic, status, and archived
  date.
- Use the same retro-futurist design as the rest of the application.
- Show a useful empty state when there are no archived tasks.
- Include clear navigation back to the active-task page.
- Show only archived tasks.
- Not include restore controls yet.

Also add clear navigation from the main active-task page to the archived-task
page.

After archiving a task:

- It should disappear from the active-task list.
- It should appear on the archived-task page.
- The original database row should still exist.
- Its ID and task data should remain unchanged.
- `archived_at` should no longer be null.
- The result should survive a page reload and application restart.

Please keep using the existing `.js` and `.jsx` conventions. Do not introduce
TypeScript.

Do not:

- Delete tasks.
- Create a separate archive table.
- Copy archived tasks into another table.
- Add an ORM.
- Add API routes.
- Add new dependencies.
- Change the database schema unless you find a genuine problem.
- Introduce new architectural layers.
- Edit existing AI transcript files.
- Make any Git commits.

When you are finished, please verify the following:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Start the application.
4. Create or use an existing active task.
5. Archive it through the interface.
6. Confirm that it disappears from the active list.
7. Open the archived-task page and confirm that it appears there.
8. Reload both pages and confirm that the result persists.
9. Check SQLite directly and confirm:
   - The original row still exists.
   - The task ID is unchanged.
   - `archived_at` is no longer null.
   - `updated_at` changed.
   - The other task fields are unchanged.
10. Confirm that an unknown task ID is handled safely.
11. Confirm that task creation and status changes still work.

At the end, report:

- Every file created or modified.
- Every command you ran.
- Whether each check passed.
- Any assumptions you made.
- Any deviation from the requested scope.

## Codex Response

Task archiving and the archived-task page were implemented.

### Files modified

- `src/lib/tasks.js`
- `src/app/actions.js`
- `src/components/TaskCard.jsx`
- `src/app/page.jsx`

### Files created

- `src/app/archive/page.jsx`

### Behaviour implemented

- Added a parameterised `archiveTask` database operation.
- Added a `getArchivedTasks` query.
- Added safe task-ID validation.
- Added a server action for task archiving.
- Revalidated both `/` and `/archive` after a successful archive operation.
- Added a clearly labelled Archive button to active task cards.
- Added a pending and disabled state while an archive request is submitted.
- Added navigation between the active-task and archived-task pages.
- Added an archived-task page displaying:
  - Title
  - Description
  - Due date
  - Topic
  - Status
  - Archive timestamp
- Added an archived-task empty state.
- Preserved the existing retro-futurist visual design.

### Database behaviour

Archiving updates the existing row rather than deleting or copying it.

The operation:

- Sets `archived_at`.
- Updates `updated_at`.
- Preserves the task ID.
- Preserves the title.
- Preserves the description.
- Preserves the due date.
- Preserves the topic.
- Preserves the status.
- Preserves the creation timestamp.

The existing SQLite schema and single-table design were retained.

### Verification

- `npm run lint` — passed.
- `npm run build` — passed.

The first build attempt was blocked by the sandbox because the Next.js CSS
worker could not bind to a local port. The build was rerun with approved local
execution and passed.

The development server was started twice successfully.

The running application was used to:

1. Create a task.
2. Change its status.
3. Archive it using the new interface.
4. Confirm that it disappeared from the active-task page.
5. Confirm that it appeared on the archived-task page.
6. Reload the pages.
7. Restart the application.
8. Confirm that the archive state persisted.

An unknown task ID returned the safe user-facing error:

```text
That task could not be found.
```

Direct SQLite verification confirmed:

- The original row remained present.
- The task ID remained `5`.
- `archived_at` changed from `null` to `2026-07-30 11:39:57`.
- `updated_at` changed.
- The title remained unchanged.
- The description remained unchanged.
- The due date remained unchanged.
- The topic remained unchanged.
- The status remained unchanged.
- The creation timestamp remained unchanged.
- The task was excluded from active-task results.
- The task appeared in archived-task results after reload and restart.

Existing task creation and status-change behaviour continued to work.

### Commands and inspection

Commands used included:

- Repository inspection with `rg`
- File inspection with `sed`
- `git status`
- `git diff`
- `npm run lint`
- `npm run build`
- `npm run dev`
- Local `curl` checks
- Local Node.js and SQLite verification scripts

No Git commit was made.

### Assumption

The existing local development database was used for the requested interface
verification.

It now contains the archived verification task with ID `5`.

The task was not removed afterward because permanent deletion is prohibited and
was outside the scope of this task.

The generated database remains ignored by Git.

### Scope confirmation

The following were not added:

- General task editing
- Restoring archived tasks
- Sorting
- Overdue indicators
- Automated tests
- Documentation changes
- Schema changes
- New dependencies
- API routes
- An ORM
- Additional architectural layers
- Git commits

There were no requested scope deviations.

Codex noted that the eventual commit must contain an accurate `Assisted-by`
trailer because the changes were AI-assisted.

## User Review

I reviewed the reported implementation against the requested scope and the lab
requirements.

The implementation correctly archives tasks by updating the existing row
rather than deleting it or moving it to another table.

The feature satisfies the important behaviour because:

- Archived tasks leave the active-task list.
- Archived tasks remain viewable.
- The original database row remains present.
- The task ID remains stable.
- Existing task information is preserved.
- `archived_at` records the archive state.
- `updated_at` changes when the task is archived.
- The archive state persists after reload and application restart.
- Unknown task IDs are handled safely.
- Existing creation and status-change behaviour remains functional.

The interface also remains consistent with the existing visual design and
provides clear navigation between active and archived tasks.

## Verification Commands

The following checks were reported as completed successfully:

```bash
npm run lint
npm run build
npm run dev
```

The running interface and SQLite database were then used to verify task
creation, status changes, archiving, active-list exclusion, archived-list
inclusion, safe missing-task handling, and persistence across reloads and
application restarts.

## Files Associated With This Stage

```text
src/lib/tasks.js
src/app/actions.js
src/components/TaskCard.jsx
src/app/page.jsx
src/app/archive/page.jsx
docs/ai-transcripts/07-task-archiving.md
```

## Intended Commit Attribution

```text
[feat] add task archiving and archived task view

Assisted-by: OpenAI Codex CLI[gpt-5.6-terra (medium)]
```

---

The preceding document was generated and edited with the assistance of Codex CLI[gpt-5.6-terra (medium)].
