# AI Transcript 12 — Active Task Sorting

**Assessment:** COMS3011A Lab 1  
**Project:** Checkpoint  
**Date:** 30 July 2026  
**Tool:** Codex CLI  
**Model:** gpt-5.6-terra (medium)  
**Purpose:** Add URL-based sorting for active tasks  
**Record type:** Record of the prompt and substantive Codex response

> This document is not a native Codex session export. It preserves the
> development prompt and the substantive final response from the session.

## User Prompt

Please read `AGENTS.md` and inspect the current project before making any
changes.

For this task, I want to add sorting to the active-task list.

Checkpoint already supports creating, editing, updating the status of, and
archiving tasks. Please keep all of that working and preserve the current
frontend design.

The user must be able to sort active tasks by:

- Topic
- Status
- Due date

Please also keep the current newest-first order as the default option.

I think the simplest approach would be to store the selected sort in the URL,
for example:

- `/?sort=topic`
- `/?sort=status`
- `/?sort=due-date`

That way, the chosen order remains clear and survives a page reload. You may
use a different simple approach if it fits the existing project better, but do
not add client-side state or a dependency just for sorting.

Update `getActiveTasks` in `src/lib/tasks.js` so it accepts a supported sort
value.

Use these orders:

- Topic: alphabetical, case-insensitive, A to Z
- Status: Todo, then In-Progress, then Complete
- Due date: earliest due date first
- Default: newest task first, matching the current behaviour

Please make every order deterministic by adding a sensible secondary order,
such as task ID.

Do not insert the raw URL value into SQL. Map the supported sort values to
predefined `ORDER BY` clauses so an unsupported or malicious value cannot
become part of the query.

An unknown sort value should safely fall back to the default order.

Update `src/app/page.jsx` so it reads the selected sort from the page's search
parameters and passes it to `getActiveTasks`.

Add a clear sorting control above the active-task list. A small group of links
or a labelled select is fine.

The control should:

- Include Topic, Status, Due date, and Newest first.
- Clearly show which option is selected.
- Use normal navigation so the URL updates.
- Fit the existing retro control-desk design.
- Remain usable on narrow screens.
- Have an accessible label.
- Not be icon-only.

This is sorting only, not filtering. All active tasks should remain visible.

Do not add sorting to the archived-task page during this task.

Please do not:

- Add overdue behaviour yet.
- Add automated tests yet.
- Change the database schema.
- Add dependencies.
- Add an ORM or API routes.
- Introduce another architectural layer.
- Change task creation, editing, status, or archive behaviour.
- Modify existing AI transcript files.
- Make a Git commit.

When finished, please verify it with several active tasks that have different
topics, statuses, and due dates.

Check that:

1. `npm run lint` passes.
2. `npm run build` passes.
3. The default order remains newest first.
4. Topic sorting is case-insensitive and alphabetical.
5. Status sorting uses Todo, In-Progress, Complete rather than alphabetical
   order.
6. Due-date sorting places the earliest date first.
7. Reloading a sorted URL keeps the same order selected.
8. An invalid sort value safely falls back to the default order.
9. Archived tasks remain excluded.
10. Existing creation, editing, status updates, and archiving still work.

At the end, tell me:

- Which files you created or modified.
- Which commands you ran.
- Whether each check passed.
- Any assumptions you made.
- Whether you had to deviate from the requested scope.

Please do not make a Git commit.

## Codex Response

URL-based active-task sorting was implemented while preserving the existing
interface and application behaviour.

### Files modified

- `src/lib/tasks.js`
- `src/app/page.jsx`
- `src/app/globals.css`

No files were created.

### Sorting behaviour

The following URL values are supported:

```text
/                     Newest task first
/?sort=newest         Newest task first
/?sort=topic          Topic A–Z
/?sort=status         Todo, In-Progress, Complete
/?sort=due-date       Earliest due date first
```

Every ordering uses descending task ID as a deterministic tie-breaker.

Topic sorting is case-insensitive.

Unsupported, repeated, malicious, or non-string sort values safely fall back to
the default newest-first order.

### SQL safety

The URL value is normalised before querying.

The raw URL value is not inserted into SQL. The implementation selects the
`ORDER BY` clause from a predefined internal map of supported values.

### Interface

A sorting control was added above the active-task list.

It:

- Includes Newest first, Topic, Status, and Due date.
- Updates the URL through normal navigation.
- Shows the currently selected option.
- Retains its selection after reload.
- Fits the existing visual design.
- Remains usable on narrow screens.
- Does not hide or filter any active tasks.

The archived-task page was not changed.

### Verification

The following checks passed:

1. `npm run lint`
2. `npm run build`
3. Default newest-first ordering
4. Case-insensitive topic ordering
5. Todo → In-Progress → Complete ordering
6. Earliest-first due-date ordering
7. Sorted URL reload and selected-control persistence
8. Safe fallback for an SQL-like invalid value
9. Continued exclusion of archived tasks
10. Existing creation, editing, status updates, and archiving through the
    actual server-action forms

Additional checks included:

- `git diff --check`
- Repository inspection with `git`, `sed`, and `rg`
- Isolated database seeding
- Local route requests using `curl`
- Runtime assertions using Node.js
- Archive-without-deletion verification

Temporary verification data was removed afterward.

### Verification issue encountered

Two initial standalone Node.js verification attempts failed because Node's
direct ESM resolver could not resolve the project's existing extensionless
`./db` import.

This was not a sorting or application failure. Next.js resolves the existing
import normally.

The verification was rerun successfully through the actual Next.js runtime,
which is the environment in which the application operates.

### Assumptions

- Descending task ID is used as the deterministic tie-breaker for every sort.
- `newest` is the canonical default sort value.
- Invalid, repeated, or non-string sort parameters use the default order.

### Scope confirmation

The following were not added or changed:

- Automated tests
- Dependencies
- Database schema
- Archived-task sorting
- Overdue behaviour
- Existing transcripts
- Git history

There were no scope deviations.

No Git commit was created.

## User Review

I reviewed the reported implementation and verification results.

The feature satisfies the sorting requirements because active tasks can be
ordered by topic, status, and due date. The existing newest-first order remains
available as the default.

The status ordering correctly follows the application's workflow rather than
alphabetical order:

```text
Todo → In-Progress → Complete
```

The implementation avoids using untrusted URL content directly in SQL. Only
predefined internal ordering clauses can reach the query.

The URL-based approach also makes the current sort visible, reloadable, and
easy to verify without introducing unnecessary client-side state.

The failed standalone Node checks were caused by a difference between direct
Node ESM resolution and the existing Next.js runtime. The feature was
subsequently verified through the real application environment.

## Files Associated With This Stage

```text
src/lib/tasks.js
src/app/page.jsx
src/app/globals.css
docs/ai-transcripts/12-task-sorting.md
```

---

The preceding document was generated and edited with the assistance of Codex CLI[gpt-5.6-terra (medium)].
