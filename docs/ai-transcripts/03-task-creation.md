# AI Transcript 03 — Task Creation and Active Task Listing

**Assessment:** COMS3011A Lab 1  
**Project:** Checkpoint  
**Date:** 30 July 2026  
**Tool:** Codex CLI  
**Model:** gpt-5.6-terra (medium)  
**Purpose:** Implement task creation and persistent active-task listing  
**Record type:** Faithful manually prepared record of the prompt and substantive Codex response

> This document is not a native Codex session export. It preserves the exact
> development prompt and the substantive final response from the session.

## User Prompt

Implement only task creation and active task listing for Checkpoint.

Do not implement editing, archiving, archived-task views, sorting, or overdue
indicators during this task.

Requirements:

1. Create `src/lib/tasks.js`.
2. Add a function that inserts a task into SQLite.
3. Add a function that returns active tasks where `archived_at IS NULL`.
4. Create `src/app/actions.js` with a server action for task creation.
5. Update `src/app/page.js` to display:
   - A task creation form
   - The active task list
6. Create only the simple components genuinely needed:
   - `src/components/TaskForm.js`
   - `src/components/TaskList.js`
   - `src/components/TaskCard.js`
7. Use JavaScript only.
8. Use Tailwind CSS for simple, readable styling.
9. Do not add TypeScript.
10. Do not add an ORM or new architectural layers.
11. Do not add API routes.
12. Do not add new dependencies unless absolutely necessary.
13. Do not make any Git commits.

Task creation requirements:

- The form must contain title, description, due date, and topic.
- Title must not be blank.
- Topic must not be blank.
- Due date must be present and valid.
- Description may be empty.
- New tasks must default to `Todo`.
- Validation must occur on the server as well as through suitable HTML inputs.
- Submitted values must be written to SQLite.
- After successful creation, the active task list must update.
- Errors should be understandable and must not expose database details.

Active task list requirements:

- Read tasks from SQLite.
- Include only rows where `archived_at IS NULL`.
- Display title, description, due date, topic, and status.
- Display a useful empty-state message when there are no tasks.
- Do not implement sorting yet.
- Do not implement an overdue calculation yet.
- Do not add edit or archive controls yet.

Preserve the existing database schema and database initialisation design.

After implementation:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Start the application and verify that a task can be created.
4. Reload the page and confirm that the task remains visible.
5. Confirm that the task exists in SQLite.
6. Report every file created or modified.
7. Explain any deviation from the requested scope.
8. Do not alter existing transcript files.

## Codex Response

Task creation and active-task listing were implemented without adding later
features.

### Files created

- `src/lib/tasks.js`
- `src/app/actions.js`
- `src/components/TaskForm.js`
- `src/components/TaskList.js`
- `src/components/TaskCard.js`

### Files modified

- `src/app/page.js`

### Behaviour implemented

- Added server-side task validation.
- Added SQLite insertion for new tasks.
- New tasks receive the default status `Todo`.
- Added an active-task query restricted to rows where
  `archived_at IS NULL`.
- Added a Tailwind-styled task creation form.
- Added task cards and an active-task list.
- Added a useful empty-state message.
- Configured the page to render dynamically so that page reloads read the
  current SQLite data.

### Scope confirmation

The following were not added:

- Task editing
- Task archiving
- An archived-task view
- Sorting
- Overdue calculation
- API routes
- New dependencies
- Git commits

Existing transcript files were not modified.

### Verification

- `npm run lint` — passed.
- `npm run build` — passed.

The initial sandboxed production-build attempt was blocked because Next.js
attempted to use a local worker port. The build was rerun with approved local
execution and completed successfully.

The development server was started using:

```bash
npm run dev -- -p 3000
```

The preceding document was generated and edited with the assistance of Codex CLI[gpt-5.6-terra (medium)].
