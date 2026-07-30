# Checkpoint

```text
 ██████╗██╗  ██╗███████╗ ██████╗██╗  ██╗██████╗  ██████╗ ██╗███╗   ██╗████████╗
██╔════╝██║  ██║██╔════╝██╔════╝██║ ██╔╝██╔══██╗██╔═══██╗██║████╗  ██║╚══██╔══╝
██║     ███████║█████╗  ██║     █████╔╝ ██████╔╝██║   ██║██║██╔██╗ ██║   ██║
██║     ██╔══██║██╔══╝  ██║     ██╔═██╗ ██╔═══╝ ██║   ██║██║██║╚██╗██║   ██║
╚██████╗██║  ██║███████╗╚██████╗██║  ██╗██║     ╚██████╔╝██║██║ ╚████║   ██║
 ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝
```

![Node.js 24.14.1](https://img.shields.io/badge/Node.js-24.14.1-f3df8b?style=flat-square&labelColor=111111)
![Next.js 16.2.12](https://img.shields.io/badge/Next.js-16.2.12-f3df8b?style=flat-square&labelColor=111111)
![SQLite local storage](https://img.shields.io/badge/SQLite-local_storage-f3df8b?style=flat-square&labelColor=111111)

Checkpoint is a local-first todo application for COMS3011A Lab 1. It runs on
one user's machine and stores task data in a local SQLite database.

## Features

- Create and edit tasks with a title, description, due date, and topic.
- Move tasks between the fixed `Todo`, `In-Progress`, and `Complete` statuses.
- Archive tasks without deleting them and view retained tasks on the archive
  page.
- Sort active tasks by newest, topic, status, or due date.
- Show a derived overdue indicator for incomplete tasks past their due date.
- Preserve task data between application restarts with SQLite.

Checkpoint is local software. It does not require deployment, user accounts,
or an external database.

## Requirements

Checkpoint requires Node.js 24.14.1. The repository's `.nvmrc` selects the
Node.js 24 release line.

## Quick start

From the project directory, install the locked dependencies and start the
development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

Run the automated test suite once with:

```bash
npm test
```

See the detailed running guide for clean-clone, production, database, and
troubleshooting instructions.

## Documentation

- [Running Checkpoint](docs/running-it.md)
- [Database design](docs/database-design.md)
- [Third-party code](docs/third-party-code.md)
- [AI development records](docs/ai-transcripts/)

## AI usage

### Code generation

This repository uses AI code generation through Codex
CLI[gpt-5.6-terra (medium)].

### Inline editing

This repository does not use an AI inline editing or autocomplete tool.

### Code review

AI development records are stored in `docs/ai-transcripts/`. Records prepared
manually are not described as native or unedited exports.

The preceding document was generated and edited with the assistance of Codex
CLI[gpt-5.6-terra (medium)].
