# AI Transcript 15 — Project Documentation

**Assessment:** COMS3011A Lab 1  
**Project:** Checkpoint  
**Date:** 30 July 2026  
**Tool:** Codex CLI  
**Model:** gpt-5.6-terra (medium)  
**Purpose:** Complete installation, operation, usage, and AI-assistance documentation  
**Record type:** Faithful manually prepared record of the prompt and substantive Codex response

> This document is not a native Codex session export. It preserves the
> development prompt and substantive final response from the session.

## User Prompt

Please read `AGENTS.md` and inspect the current repository before making any
changes.

For this task, I want to finish the project documentation so that someone can
clone Checkpoint and understand how to install, run, test, and use it without
needing any information outside the repository.

Please keep this as a documentation-only task. Do not change application code,
tests, dependencies, package versions, or database behaviour.

Start by checking the actual versions installed in the current environment
with:

```bash
node --version
npm --version
```

Also inspect `.nvmrc`, `package.json`, `package-lock.json`, the database module,
schema, tests, and current documentation. Do not guess commands, versions, or
behaviour.

Update `README.md` so that it gives a useful overview without becoming overly
long.

It should include:

- The project name and a short explanation that Checkpoint is a local-first
  todo application for COMS3011A Lab 1.
- A concise feature summary covering:
  - Task creation.
  - Task editing.
  - `Todo`, `In-Progress`, and `Complete` statuses.
  - Task archiving without deletion.
  - The archived-task view.
  - Sorting by newest, topic, status, and due date.
  - Derived overdue indicators.
  - Persistence through SQLite.
- The required Node.js version.
- A short quick-start section using `npm ci` and `npm run dev`.
- The default local address used by Next.js.
- The `npm test` command.
- Links to:
  - `docs/running-it.md`
  - `docs/database-design.md`
  - `docs/third-party-code.md`
  - `docs/ai-transcripts/`
- A clear note that the application is local only and does not require
  deployment, accounts, or an external database.

Replace the existing AI Usage section with an accurate declaration.

The repository has used:

- AI code generation through `Codex CLI[gpt-5.6-terra (medium)]`.
- AI code review through `ChatGPT Web[GPT-5.6 Thinking]`.
- No inline AI editing tool, assuming the existing declaration is still true.

Make the distinctions between code generation, inline editing, and code review
explicit. Do not say that AI code review was unused.

Also state that the AI development records are stored in
`docs/ai-transcripts/`. Do not describe manually prepared transcript records as
native exports or unedited exports.

Rewrite `docs/running-it.md` as the detailed setup and operation guide.

It should include:

1. Requirements
2. Clean-clone installation
3. Development mode
4. Automated tests
5. Linting
6. Production build
7. Local data and database setup
8. Resetting local data
9. Basic usage walkthrough
10. Troubleshooting

Document the exact Node.js and npm versions actually used, the `.nvmrc` file,
the clean-clone commands, development and production commands, temporary test
databases, the default SQLite path, the optional `CHECKPOINT_DB_PATH` override,
database reset instructions, and a concise feature walkthrough.

Review `docs/database-design.md` and correct stale future-tense wording,
particularly around active and archived queries and derived overdue behaviour.

Review `docs/third-party-code.md`, preserve its existing contents, and
standardise the Codex model declaration to:

```text
Codex CLI[gpt-5.6-terra (medium)]
```

Every changed Markdown document must contain an accurate AI-assistance
declaration.

Do not change code, tests, dependencies, package files, the database schema,
existing AI transcripts, deployment configuration, or Git history.

Verify the documented commands, local routes, optional database-path override,
database preservation, document links, model declarations, and absence of
placeholder text.

Do not claim that a full clean-clone audit was completed during this task,
because that will be performed separately after the documentation changes are
committed.

Please do not make a Git commit.

## Codex Response

The project documentation was completed and verified.

Only Markdown documentation was modified. No application code, automated tests,
dependencies, package versions, schema, or database behaviour changed.

## Files modified

- `README.md`
- `docs/running-it.md`
- `docs/database-design.md`
- `docs/third-party-code.md`

## Verified environment

The following versions were checked directly:

```text
Node.js: v24.14.1
npm:     11.18.0
.nvmrc:  24
```

## README changes

The README now includes:

- A concise project overview.
- A feature summary covering:
  - Task creation.
  - Task editing.
  - The three fixed task statuses.
  - Archiving without deletion.
  - The archived-task view.
  - Sorting by newest, topic, status, and due date.
  - Derived overdue indicators.
  - SQLite persistence.
- The required Node.js version.
- A quick-start section.
- The default local URL.
- The automated-test command.
- Links to all required documentation.
- A link to the AI transcript directory.
- A note that Checkpoint is local only and requires no accounts, deployment, or
  external database.

The AI Usage section now distinguishes between:

- Code generation:
  `Codex CLI[gpt-5.6-terra (medium)]`
- Inline AI editing:
  Not used
- AI code review:
  `ChatGPT Web[GPT-5.6 Thinking]`

The previous inaccurate statement that AI code review was not used was removed.

## Running guide changes

The placeholder `docs/running-it.md` file was replaced with a complete guide
containing:

1. Requirements
2. Clean-clone installation
3. Development mode
4. Automated tests
5. Linting
6. Production build
7. Local data and database setup
8. Resetting local data
9. Basic usage walkthrough
10. Troubleshooting

The guide documents:

```bash
git clone https://github.com/Kevin-Ebrahim/Checkpoint.git
cd Checkpoint
nvm use
npm ci
npm run dev
npm test
npm run lint
npm run build
npm start
```

It explains that:

- `npm ci` installs the versions recorded in `package-lock.json`.
- The development server normally uses `http://localhost:3000`.
- `npm test` runs the Vitest suite once and exits.
- Tests use temporary SQLite databases and do not alter development data.
- The default database is `data/checkpoint.db`.
- The database and its directory are created when required.
- `database/schema.sql` is applied during database initialisation.
- Local task data persists after the application is stopped.
- The SQLite database file is intentionally ignored by Git.
- `CHECKPOINT_DB_PATH` can override the default database location.
- Relative override paths are resolved from the project working directory.
- Removing `data/checkpoint.db` permanently resets local data.

## Database-design corrections

The database documentation was updated to describe implemented behaviour rather
than future plans.

It now states that:

- Active tasks use `archived_at IS NULL`.
- Archived tasks use `archived_at IS NOT NULL`.
- Archiving retains the original row.
- Overdue is derived from the due date, local date, and completion state.
- Overdue is not stored in SQLite.
- Completed tasks are not treated as overdue.

The existing table description and single-table design were preserved.

## Third-party documentation

The existing Vitest section was retained.

The AI declaration was standardised to:

```text
Codex CLI[gpt-5.6-terra (medium)]
```

No third-party tools or dependencies were added.

## Verification

The following checks passed:

```text
node --version         v24.14.1
npm --version          11.18.0
npm ci                 passed
npm test               11 of 11 tests passed
npm run lint           passed
npm run build          passed
git diff --check       passed
```

The development application was started with:

```bash
CHECKPOINT_DB_PATH=/tmp/checkpoint-demo.db npm run dev
```

The following development routes returned HTTP 200 with expected content:

```text
/
 /archive
```

After building, the production server was started using the same temporary
database override:

```bash
CHECKPOINT_DB_PATH=/tmp/checkpoint-demo.db npm start
```

The production main page returned HTTP 200 with expected content.

SQLite inspection confirmed that the temporary override database contained the
committed tasks schema.

The temporary database and response files were removed after verification.

Additional checks confirmed:

- Documentation links point to existing files and directories.
- Placeholder text was removed.
- Stale future-tense feature descriptions were removed.
- Model names are consistent.
- The incorrect no-code-review claim was removed.
- Application, schema, test, and package files remained unchanged.
- `data/checkpoint.db` retained its checksum and modification timestamp.

## Verification issues encountered

The first sandboxed development-server attempt failed with a local port
permission error.

Initial sandboxed `curl` requests could not connect to the subsequently
permitted server.

The server and route checks were rerun with the required local-network
permission and passed.

Stopping the development and production servers with `Ctrl+C` produced the
expected interrupted-process exit status.

`npm ci` displayed install-script approval warnings for:

- `better-sqlite3`
- `sharp`
- `unrs-resolver`

The automated tests and production build nevertheless completed successfully.

## Assumption

The existing declaration that no inline AI editing or autocomplete tool was
used was treated as accurate.

## Scope confirmation

The following were not changed:

- Application code
- Automated tests
- Dependencies
- `package.json`
- `package-lock.json`
- Database schema
- Database behaviour
- Existing AI transcripts
- Deployment configuration
- Git history

No full clean-clone audit was claimed during this documentation task.

There were no scope deviations.

No Git commit was created.

## User Review

I reviewed the completed documentation and verification report.

The README now provides a concise entry point, while `docs/running-it.md`
contains the detailed clean-clone, development, test, build, database, reset,
usage, and troubleshooting instructions.

The exact runtime versions were obtained from the project environment rather
than guessed.

The documentation reflects the implemented application, including task
sorting, derived overdue indicators, isolated SQLite tests, and archive
retention.

The AI declarations now accurately distinguish code generation, inline
editing, and code review.

The local database was protected during verification, while the optional
database-path instructions were tested with a temporary SQLite file.

A separate clean-clone audit remains to be completed after this documentation
commit.

---

The preceding document was generated and edited with the assistance of Codex CLI[gpt-5.6-terra (medium)].
