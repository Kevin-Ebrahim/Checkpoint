# AI Transcript 02 — SQLite Database Setup

**Assessment:** COMS3011A Lab 1  
**Project:** Checkpoint  
**Date:** 29 July 2026  
**Tool:** Codex CLI  
**Model:** gpt-5.6-terra (medium)  
**Purpose:** Create the SQLite schema and database initialisation layer  
**Record type:** Faithful manually prepared record of the prompt and final Codex response

> This document is not a native Codex session export. It preserves the exact
> development prompt and the substantive final response from the session.

## User Prompt

Read `AGENTS.md` before making any changes.

This task is limited to the SQLite schema and database initialisation for
Checkpoint. Do not implement task forms, pages, server actions, sorting,
archiving UI, or other todo features yet.

Requirements:

1. Install the minimal SQLite dependency needed by the project.
2. Replace the placeholder `database/schema.sql` with the tasks table schema.
3. Implement `src/lib/db.js`.
4. The default database path must be `data/checkpoint.db`.
5. The application must automatically create the data directory and database
   when needed.
6. The committed `database/schema.sql` file must be used to initialise the
   database.
7. Allow the database path to be overridden so later tests can use a temporary
   database.
8. Do not create or commit `data/checkpoint.db`.
9. Do not add an ORM.
10. Do not create a migrations framework.
11. Do not implement task CRUD functions yet.
12. Do not make any Git commits.

The tasks table must include:

- `id`
- `title`
- `description`
- `due_date`
- `topic`
- `status`
- `archived_at`
- `created_at`
- `updated_at`

Database constraints:

- `id` must be the primary key
- `title` must not be blank
- `topic` must not be blank
- `description` may be empty
- `status` must default to `Todo`
- `status` must be restricted to `Todo`, `In-Progress`, or `Complete`
- `archived_at` must be nullable
- Overdue must not be stored
- Archived tasks must remain in the `tasks` table

Use date values in a consistently sortable text format.

Update `docs/third-party-code.md` with the SQLite dependency and a specific
reason for choosing it.

Update `docs/database-design.md` so it accurately describes the current schema.
Explicitly state that there is one table and therefore no inter-table
relationships.

Do not complete `docs/running-it.md` beyond changes genuinely required by this
task.

After making the changes:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Demonstrate that a fresh temporary database can be initialised.
4. Confirm that no generated database file is tracked by Git.
5. Report every file created or modified.
6. Explain any deviation from the requested scope.

## Codex Response

SQLite setup is complete. `getDatabase()` lazily creates the database
directory, opens the configured database, and applies the committed schema.

### Files changed

- Modified `.gitignore` with explicit ignored SQLite data-file patterns.
- Modified `database/schema.sql` with the constrained `tasks` table.
- Created `src/lib/db.js`.
- Modified `package.json` and `package-lock.json`, adding
  `better-sqlite3` version `13.0.2`.
- Modified `docs/database-design.md`.
- Modified `docs/third-party-code.md`.

### Verification

- `npm run lint` — passed.
- `npm run build` — passed.
- Fresh temporary database initialisation through `CHECKPOINT_DB_PATH` —
  passed.
- All nine expected `tasks` columns were present:
  - `id`
  - `title`
  - `description`
  - `due_date`
  - `topic`
  - `status`
  - `archived_at`
  - `created_at`
  - `updated_at`
- The temporary database was removed after verification.
- The `data/` directory contains only `.gitkeep`.
- `data/checkpoint.db` is not tracked by Git.
- No Git commit was made.

### Implementation notes

- The default database path is `data/checkpoint.db`.
- `CHECKPOINT_DB_PATH` can override the default path for later isolated tests.
- The committed `database/schema.sql` file is used to initialise a new
  database.
- No CRUD operations were added.
- No user-interface functionality was added.
- No server actions were added.
- No migrations framework was added.
- No ORM was added.
- Existing uncommitted changes to `README.md` and
  `docs/ai-transcripts/02-database-setup.md` were preserved and not altered.
- There was no deviation from the requested scope.
- The third-party dependency documentation was updated to include the existing
  direct dependencies as well as `better-sqlite3`, keeping the document aligned
  with the repository instructions.

Codex also noted that any commit containing this AI-generated code must include
an accurate `Assisted-by` trailer.

## User Review

I reviewed the reported implementation against the task constraints.

The database stage remained limited to:

- The SQLite dependency
- The committed schema
- Database opening and initialisation
- Configurable database paths
- Database-design documentation
- Third-party dependency documentation

The implementation did not introduce an ORM, migrations framework, CRUD
functions, server actions, task pages, or user-interface features.

The chosen design supports the later lab requirements because:

- Data is persisted in SQLite.
- Archived tasks will remain in the same `tasks` table.
- The status column is constrained to the three permitted values.
- Overdue is not stored in the schema.
- A temporary database path can be used for deterministic tests.
- A clean clone can initialise its own local database from the committed
  schema.

## Verification Commands

The following checks were reported as completed successfully:

```bash
npm run lint
npm run build
```

The preceding document was generated and edited with the assistance of Codex
CLI[gpt-5.6-terra (medium)].
