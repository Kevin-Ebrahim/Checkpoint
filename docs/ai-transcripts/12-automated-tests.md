# AI Transcript 14 — Automated Task Tests

**Assessment:** COMS3011A Lab 1  
**Project:** Checkpoint  
**Date:** 30 July 2026  
**Tool:** Codex CLI  
**Model:** gpt-5.6-terra (medium)  
**Purpose:** Add isolated automated tests for task and database behaviour  
**Record type:** Faithful manually prepared record of the prompt and substantive Codex response

> This document is not a native Codex session export. It preserves the
> development prompt and substantive final response from the session.

## User Prompt

Please read `AGENTS.md` and inspect the current project before changing
anything.

For this task, I want to add a meaningful automated test suite for Checkpoint.

The application now supports task creation, editing, status updates, archiving,
sorting, and derived overdue indicators. Please test the underlying task and
database behaviour without changing how the application works.

Use Vitest as a development dependency and add this command:

```bash
npm test
```

It should run the tests once and exit, rather than opening watch mode.

The tests must use real SQLite databases and the committed
`database/schema.sql` file. Do not mock the database and do not use the normal
`data/checkpoint.db` file.

Each test, or each test group, should use a temporary database path through
`CHECKPOINT_DB_PATH`. Create the database in an operating-system temporary
directory and remove the temporary files afterward.

Please keep the tests deterministic and isolated. They should not depend on:

- Existing development data.
- Test execution order.
- The current contents of `data/checkpoint.db`.
- Network access.
- A running Next.js development server.
- Arbitrary delays or sleeps.

The current database module keeps a cached connection. Handle that cleanly
between temporary databases. If necessary, add a small general-purpose
`closeDatabase` function to `src/lib/db.js` for teardown, but do not add
test-specific branches to production code.

Please add enough focused tests to cover the important behaviour, rather than
writing only the minimum three superficial tests.

At minimum, cover these areas:

1. Task creation
   - A valid task is stored with its submitted fields.
   - Its initial status is `Todo`.
   - It is returned by the active-task query.

2. Input validation
   - A blank title is rejected.
   - A blank topic is rejected.
   - An impossible calendar date is rejected.

3. Task editing
   - Editing changes the title, description, due date, and topic.
   - The existing ID, status, archive state, and creation timestamp are
     preserved.
   - An archived or unknown task cannot be edited as an active task.

4. Status updates
   - `Todo`, `In-Progress`, and `Complete` are accepted.
   - An unsupported status is rejected.
   - A status update does not create another row.

5. Archiving
   - Archiving keeps the original database row and ID.
   - `archived_at` becomes non-null.
   - The task disappears from `getActiveTasks`.
   - The same task appears in `getArchivedTasks`.
   - Archiving does not permanently delete or copy the task.

6. Sorting
   - Newest-first uses descending ID.
   - Topic sorting is case-insensitive A–Z.
   - Status sorting is `Todo`, `In-Progress`, then `Complete`.
   - Due-date sorting uses earliest date first.
   - An unsupported sort value falls back safely to newest-first.
   - Archived tasks do not appear in any active sort.

7. Overdue behaviour
   - A `Todo` task due before the supplied date is overdue.
   - An `In-Progress` task due before the supplied date is overdue.
   - A `Complete` task with the same past date is not overdue.
   - A task due on the supplied date is not overdue.
   - A future task is not overdue.

For overdue tests, pass a fixed `YYYY-MM-DD` date into the existing overdue
logic. Do not make the tests depend on the real date or timezone.

Please test the actual exported application functions where possible. Do not
duplicate the implementation logic inside the tests simply to make the
assertions pass.

Keep the number of tests sensible. A compact suite of around seven to twelve
meaningful tests is better than many repetitive tests.

Use JavaScript only. Do not introduce TypeScript.

Update `package.json` and `package-lock.json` for Vitest. Also add Vitest to
`docs/third-party-code.md` with a brief explanation that it is used as the
development test runner. Preserve the document's existing AI declaration.

Do not:

- Add browser or screenshot tests.
- Add React component tests during this task.
- Add a coverage dependency.
- Change the database schema.
- Change task behaviour.
- Change sorting rules.
- Change overdue rules.
- Add API routes.
- Edit existing AI transcript files.
- Make a Git commit.

When finished, verify:

1. `npm test` passes from a clean test state.
2. Run `npm test` a second time and confirm it still passes.
3. `npm run lint` passes.
4. `npm run build` passes.
5. `git diff --check` passes.
6. The tests create no tracked or untracked SQLite files in `data/`.
7. The tests do not modify `data/checkpoint.db`.
8. Temporary test directories are removed after the test run.
9. A deliberately failing assertion produces a non-zero test command, then
   restore it and confirm the real suite passes again.
10. Existing application behaviour remains unchanged.

At the end, report:

- Every file created or modified.
- The test runner and configuration used.
- Every test case added.
- How temporary databases are created and cleaned up.
- Every command run.
- Whether each verification check passed.
- Any failed verification attempts and how they were corrected.
- Any assumptions.
- Any deviation from the requested scope.

Please do not make a Git commit.

## Codex Response

An isolated Vitest suite was implemented with eleven meaningful behaviour
tests.

No application behaviour, database schema, interface, sorting rule, overdue
rule, or existing transcript was changed.

## Files created

- `tests/tasks.test.js`

## Files modified

- `package.json`
- `package-lock.json`
- `src/lib/db.js`
- `docs/third-party-code.md`

## Test runner

The project now uses Vitest `4.1.10`.

The following package script was added:

```json
"test": "vitest run"
```

This runs the test suite once and exits without entering watch mode.

No separate Vitest configuration file was required. The suite uses Vitest's
default Node environment.

## Tests added

The eleven test cases cover:

1. Creating a task with the submitted fields, a default `Todo` status, and
   inclusion in active-task results.
2. Rejecting blank titles, blank topics, and impossible dates.
3. Editing all editable fields while preserving the ID, status, archive state,
   and creation timestamp.
4. Rejecting edits to archived and unknown active tasks.
5. Accepting all three valid statuses, rejecting an invalid status, and
   preserving the number of database rows.
6. Archiving the original row without deleting or copying it.
7. Newest-first ordering, unsupported-sort fallback, and archived-task
   exclusion from every active sort.
8. Case-insensitive topic ordering.
9. Fixed `Todo`, `In-Progress`, `Complete` status ordering.
10. Earliest-first due-date ordering.
11. Fixed-date overdue behaviour for `Todo`, `In-Progress`, `Complete`,
    due-today, and future tasks.

## Temporary database isolation

Before every test, the suite:

1. Creates a uniquely named `checkpoint-test-*` directory under the operating
   system's temporary directory using `mkdtempSync`.
2. Sets `CHECKPOINT_DB_PATH` to an absolute SQLite path inside that directory.
3. Allows the real database module to initialise the database using the
   committed `database/schema.sql`.

After every test, the suite:

1. Calls the general-purpose `closeDatabase` function.
2. Restores the original `CHECKPOINT_DB_PATH` environment value.
3. Removes the temporary directory recursively.
4. Confirms that the temporary directory no longer exists.

The suite does not mock SQLite and does not use the normal
`data/checkpoint.db`.

## Database connection cleanup

An idempotent `closeDatabase()` export was added to `src/lib/db.js`.

It closes the cached connection and resets the module's cached connection
state. This is a general-purpose connection lifecycle function rather than a
test-specific production branch.

## Documentation

Vitest was added to `docs/third-party-code.md` as the project's development
test runner.

The existing AI declaration in that document was preserved.

## Verification

All requested checks passed:

- Initial `npm test`: 11 of 11 tests passed.
- A deliberately broken assertion caused the command to exit with status `1`.
- The failing assertion was restored.
- The restored suite passed with 11 of 11 tests.
- An immediate second test run passed with 11 of 11 tests.
- Initial and final `npm run lint` checks passed.
- `npm run build` passed.
- `git diff --check` passed.
- No tracked or untracked SQLite files appeared under `data/`.
- No `checkpoint-test-*` directories remained under `/tmp`.
- No files were staged.
- No Git commit was created.

The pre-existing development database retained its original:

- SHA-256 checksum
- File size
- Modification timestamp
- Contents

The recorded SHA-256 value was:

```text
b689880232fa648213e4d04b048db86dffc38189d997c53a81e85a4cc3228f40
```

## Verification issue encountered

A preliminary `npm view vitest` command stalled because network access was
restricted and was interrupted.

The approved command:

```bash
npm install --save-dev vitest
```

then completed successfully.

The installation reported twelve high-severity npm audit findings. Dependency
remediation was outside the scope of this task and no automatic audit fix was
run.

## Assumptions

The ignored `data/checkpoint.db` file was treated as existing user development
data and preserved without modification.

## Scope confirmation

The following were not changed:

- Application behaviour
- Database schema
- Interface
- Sorting rules
- Overdue rules
- API structure
- Existing transcripts
- Git history

There were no scope deviations or unresolved test or build failures.

No Git commit was created.

## User Review

I reviewed the reported implementation and verification results.

The tests exercise the real database and exported task functions rather than
mocking the persistence layer. They apply the committed schema to temporary
SQLite files and do not depend on the development database.

The suite covers creation, validation, editing, status changes, archiving,
sorting, and overdue behaviour. It also verifies the important distinction
between archived and deleted records.

The explicit failing-assertion check confirms that `npm test` returns a
non-zero exit status when a test fails.

The temporary database cleanup and development-database checksum checks provide
evidence that the tests are deterministic and isolated.

The stalled package lookup and npm audit report did not affect the successful
installation, test execution, lint check, or production build.

---

The preceding document was generated and edited with the assistance of Codex CLI[gpt-5.6-terra (medium)].
