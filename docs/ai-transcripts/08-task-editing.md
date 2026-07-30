# AI Transcript 08 — Persistent Task Editing

**Assessment:** COMS3011A Lab 1  
**Project:** Checkpoint  
**Date:** 30 July 2026  
**Tool:** Codex CLI  
**Model:** gpt-5.6-terra (medium)  
**Purpose:** Add persistent editing for active tasks  
**Record type:** Faithful manually prepared record of the prompt and substantive Codex response

> This document is not a native Codex session export. It preserves the
> development prompt and the substantive final response from the session.

## User Prompt

Please read `AGENTS.md` and look through the current project before making any
changes.

For this task, I want to add editing for an existing active task.

Checkpoint already supports creating tasks, changing their status, archiving
them, and viewing archived tasks. Please keep all of that working and preserve
the current retro-futurist styling.

For now, do not work on sorting, overdue indicators, restoring archived tasks,
automated tests, or final documentation.

Add whatever small task functions are needed in `src/lib/tasks.js` to:

- Load one active task by its ID.
- Update its title, description, due date, and topic.
- Validate the submitted values using the same rules as task creation.
- Update the existing row instead of creating a new one.
- Update `updated_at` when the task is edited.
- Use parameterised SQL.
- Preserve the task ID, status, `archived_at`, and `created_at` values.
- Handle an unknown or archived task safely.

Since status already has its own control on the task card, the edit form does
not need to change status.

Add a server action in `src/app/actions.js` for saving task edits.

The action should:

- Read and validate the task ID and submitted task fields.
- Call the update function from `src/lib/tasks.js`.
- Return clear validation errors without exposing SQL, stack traces, or local
  file paths.
- Handle an unknown task safely.
- Revalidate the active page after a successful update.
- Return the user to the active-task page after saving.

Create an edit page at:

```text
src/app/edit/[id]/page.jsx
```

The page should:

- Load the selected active task from SQLite.
- Show the current title, description, due date, and topic in the form.
- Use the same styling as the existing task creation form.
- Provide a clear `Save changes` button.
- Provide a clear way to cancel and return to the active-task page.
- Show a useful not-found response if the task does not exist or is archived.

Please reuse the existing `TaskForm` component if that remains simple and
clear. It is also fine to make a small edit-form component if forcing both
behaviours into one component would make the code harder to understand.

Add a clearly labelled Edit link or button to each active task card.

Please keep it consistent with the current visual design and do not use an
icon-only control.

After editing a task:

- The updated values should appear in the active-task list.
- The task ID should remain unchanged.
- The status should remain unchanged.
- `archived_at` should remain `null`.
- `created_at` should remain unchanged.
- `updated_at` should advance.
- The changes should survive a page reload and application restart.

Keep using the existing `.js` and `.jsx` conventions. Do not introduce
TypeScript.

Do not:

- Edit archived tasks.
- Change task status through the edit form.
- Add restore functionality.
- Add sorting.
- Add overdue behaviour.
- Add an ORM.
- Add API routes.
- Add dependencies.
- Change the database schema unless there is a genuine defect.
- Introduce unnecessary architectural layers.
- Modify existing AI transcript files.
- Make any Git commits.

When you are finished, please verify the following:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Start the application.
4. Create or use an existing active task.
5. Open its edit page.
6. Change its title, description, due date, and topic.
7. Save the changes and confirm they appear in the active list.
8. Reload the page and confirm the edited values remain.
9. Restart the application and confirm the edited values still remain.
10. Check SQLite directly and confirm:
    - The task ID is unchanged.
    - The edited fields changed.
    - The status is unchanged.
    - `archived_at` is still `null`.
    - `created_at` is unchanged.
    - `updated_at` advanced.
11. Confirm that invalid input is rejected clearly.
12. Confirm that an unknown task ID is handled safely.
13. Confirm that task creation, status changes, archiving, and the archive page
    still work.

At the end, report:

- Every file created or modified.
- Every command you ran.
- Whether each check passed.
- Any assumptions you made.
- Any deviation from the requested scope.

## Codex Response

Active-task editing was implemented without changing the schema, dependencies,
documentation, existing transcripts, or Git history.

### Files modified

#### `src/lib/tasks.js`

- Added an active-task-only lookup operation.
- Added shared validation for editable task fields.
- Added a parameterised task-update operation.
- The operation updates:
  - Title
  - Description
  - Due date
  - Topic
  - `updated_at`
- It preserves:
  - Task ID
  - Status
  - Archive state
  - Creation timestamp
- Unknown and archived task IDs are handled safely.

#### `src/app/actions.js`

- Added a server action for saving task edits.
- The action validates submitted values.
- It returns safe, user-facing validation and missing-task errors.
- It revalidates the active-task page after a successful update.
- It redirects back to `/` after saving.

#### `src/components/TaskForm.jsx`

- Extended the existing form component with a reusable edit mode.
- Existing task values are prefilled.
- Added a `Save changes` submission button.
- Added a clear Cancel action.
- Preserved the existing task-creation mode.

#### `src/components/TaskCard.jsx`

- Added a clearly labelled `Edit task` link.
- Preserved the existing status and archive controls.
- Kept the current retro-futurist styling.

### File created

#### `src/app/edit/[id]/page.jsx`

- Added an edit page for active tasks.
- Loads the selected task from SQLite.
- Displays the existing editable values.
- Uses the reusable task form.
- Shows a safe not-found response for:
  - Unknown task IDs
  - Archived tasks

### Verification

- `npm run lint` — passed.
- `npm run build` — passed.

The first sandboxed build attempt failed because Next.js could not bind its CSS
helper port. The build was rerun with approved local execution and passed.

- `npm run dev` — started successfully.
- The application was verified locally.

A real edit form was submitted for task ID `4`.

The submission:

- Returned HTTP status `303`.
- Redirected to `/`.
- Updated the active-task list with the new:
  - Title
  - Description
  - Due date
  - Topic

Blank-title validation displayed:

```text
Please enter a task title.
```

The edit page was reloaded and the application was restarted. The edited values
remained present.

Direct SQLite inspection confirmed:

- The task ID remained unchanged.
- The title changed.
- The description changed.
- The due date changed.
- The topic changed.
- The status remained `In-Progress`.
- `archived_at` remained `null`.
- `created_at` remained unchanged.
- `updated_at` advanced.

Unknown and archived task edit URLs displayed the safe not-found response.

The archive page continued to load, and the existing status and archive
controls remained available.

### Commands and inspection

Commands used included:

- Repository inspection with `rg`
- File inspection with `sed`
- `git diff`
- `git diff --check`
- `git status`
- `npm run lint`
- `npm run build`
- `npm run dev`
- Local `curl` page and form checks
- Direct SQLite inspection using Node.js

No Git commit was made.

### Assumption

The existing local verification task with ID `4` was used for the live editing
check.

Its title is now:

```text
Edited verification task
```

This was an intentional local data change used for verification. The local
SQLite database remains ignored by Git.

### Scope confirmation

The following were not added or changed:

- Editing archived tasks
- Status changes through the edit form
- Restore functionality
- Sorting
- Overdue behaviour
- Automated tests
- Database schema
- Dependencies
- API routes
- An ORM
- Additional architectural layers
- Documentation
- Existing transcripts
- Git commits

There were no scope deviations beyond the intentional local verification data
change.

Codex noted that the eventual commit must include an accurate `Assisted-by`
trailer because the implementation was AI-assisted.

## User Review

I reviewed the reported implementation against the requested scope and the lab
requirements.

The feature correctly edits the existing task row rather than creating a new
task.

The implementation preserves the required task properties because:

- The task ID remains stable.
- Status is not changed by the edit form.
- Archive state is preserved.
- The creation timestamp is preserved.
- `updated_at` advances after editing.
- Only active tasks can be edited.
- Archived and unknown tasks fail safely.
- Submitted values are validated on the server.
- SQL values are parameterised.
- Changes persist after page reload and application restart.

Reusing `TaskForm.jsx` keeps the project simple while preserving distinct create
and edit behaviour.

The existing task-creation, status-change, archiving, and archive-view features
remain functional.

## Verification Commands

The following checks were reported as completed successfully:

```bash
npm run lint
npm run build
npm run dev
```

The running application and SQLite database were also used to verify:

1. Edit-page loading.
2. Prefilled values.
3. Successful form submission and redirect.
4. Updated active-list values.
5. Persistence after reload.
6. Persistence after restart.
7. Validation errors.
8. Safe unknown-task handling.
9. Safe archived-task handling.
10. Preservation of task identity, status, archive state, and creation time.

## Files Associated With This Stage

```text
src/lib/tasks.js
src/app/actions.js
src/components/TaskForm.jsx
src/components/TaskCard.jsx
src/app/edit/[id]/page.jsx
docs/ai-transcripts/08-task-editing.md
```

## Intended Commit Attribution

```text
[feat] add persistent task editing

Assisted-by: OpenAI Codex CLI[gpt-5.6-terra (medium)]
```

---

The preceding document was generated and edited with the assistance of Codex CLI[gpt-5.6-terra (medium)].
