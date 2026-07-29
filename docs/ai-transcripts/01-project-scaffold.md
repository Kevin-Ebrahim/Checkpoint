# AI Transcript 01 — Project Scaffold

**Date:** 29 July 2026  
**Tool:** gpt-5.6-terra (medium)
**Task:** Initialise the Checkpoint project scaffold

## User Prompt

We are starting COMS3011A Lab 1, a local-first todo application named
Checkpoint.

For this task, only initialise and organise the project. Do not implement
the todo features or database operations yet.

Requirements:

- Next.js
- JavaScript only, no TypeScript
- App Router
- Tailwind CSS
- npm
- Use a src directory
- Node.js 24
- Work inside the current repository
- Preserve the existing docs/ai-transcripts directory
- Keep the structure simple

Create this initial structure where appropriate:

src/
  app/
  components/
  lib/

database/
data/
tests/
docs/
  ai-transcripts/

Also create:

- .nvmrc containing 24
- a suitable .gitignore, including SQLite database files
- a minimal README with the project name and placeholder documentation links
- data/.gitkeep
- database/schema.sql as an empty placeholder with a comment
- placeholder documentation files:
  - docs/database-design.md
  - docs/running-it.md
  - docs/third-party-code.md

Do not add an ORM.
Do not install SQLite packages yet.
Do not create API routes.
Do not create unnecessary service, controller, model, hook or utility layers.
Do not create the task UI or task logic.
Do not make any Git commits.

After creating the scaffold:

1. Install dependencies.
2. Run the linter.
3. Confirm the default application starts successfully.
4. Report every file created or changed.
5. Explain any deviation from the requested structure.

## Codex Response

Initial Checkpoint scaffold is complete.

Validation:

- Node: v24.14.1
- Dependencies installed with npm
- `npm run lint` passes cleanly
- `npm run dev -- --hostname 127.0.0.1` started successfully and reported ready
- No Git commits made

Created files:

- `.nvmrc`
- `.gitignore`
- `README.md`
- `package.json`
- `package-lock.json`
- `eslint.config.mjs`
- `postcss.config.mjs`
- `database/schema.sql`
- `data/.gitkeep`
- `tests/.gitkeep`
- `docs/database-design.md`
- `docs/running-it.md`
- `docs/third-party-code.md`
- `src/app/layout.js`
- `src/app/page.js`
- `src/app/globals.css`
- `src/components/.gitkeep`
- `src/lib/.gitkeep`

The existing transcript directory was preserved.

Deviation: none. `.gitkeep` files were added only to retain intentionally
empty requested directories in Git.

## User Review

I reviewed the generated structure, confirmed that it followed the requested
JavaScript, Next.js and Tailwind setup, and verified that Codex did not
implement todo functionality or database operations ahead of scope.

## Commands Verified

```bash
node --version
npm run lint
npm run dev -- --hostname 127.0.0.1
```
