# Running Checkpoint

## Requirements

Checkpoint was verified with:

- Node.js 24.14.1
- npm 11.18.0
- Git
- Node Version Manager (`nvm`) for the commands below

The repository's `.nvmrc` contains `24`, so `nvm use` selects the Node.js 24
release line. No project package needs to be installed globally.

## Clean-clone installation

```bash
git clone https://github.com/Kevin-Ebrahim/Checkpoint.git
cd Checkpoint
nvm use
npm ci
```

`npm ci` installs the exact dependency versions locked in `package-lock.json`.
It is intended for a reproducible installation from a clean clone.

## Development mode

Start the development server with:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Stop the server by
pressing `Ctrl+C` in the terminal where it is running.

## Automated tests

```bash
npm test
```

This runs the Vitest suite once and exits. The tests create temporary SQLite
databases, apply the committed `database/schema.sql`, avoid
`data/checkpoint.db`, and remove their temporary data afterward.

## Linting

```bash
npm run lint
```

## Production build

Build the application before starting the production server:

```bash
npm run build
npm start
```

`npm run build` must complete successfully before `npm start`. The production
server is available at [http://localhost:3000](http://localhost:3000) and can
also be stopped with `Ctrl+C`.

## Local data and database setup

The default database is `data/checkpoint.db`. Checkpoint creates the `data`
directory and database automatically when they are needed, then applies the
committed `database/schema.sql` during database initialisation. SQLite keeps
task data after the application is stopped and restarted. The generated
database file is intentionally ignored by Git.

`CHECKPOINT_DB_PATH` can override the database location. For example, on
Linux or macOS:

```bash
CHECKPOINT_DB_PATH=/tmp/checkpoint-demo.db npm run dev
```

Absolute paths are used as supplied. Relative override paths are resolved
from the project working directory. The parent directory is created
automatically when possible, but the process must have permission to write
there.

## Resetting local data

First stop every running Checkpoint server. Then, from the project directory,
remove the default database:

```bash
rm data/checkpoint.db
```

This permanently removes every task stored in the default local database. A
new empty database is created automatically the next time Checkpoint starts.

## Basic usage walkthrough

1. On the main page, create a task by entering its title, description, due
   date, and topic.
2. Use **Edit** to change the task details, and use the status controls to
   choose `Todo`, `In-Progress`, or `Complete`.
3. Sort the active list using **Newest first**, **Topic**, **Status**, or
   **Due date**.
4. Look for the **Overdue** indicator on an incomplete task whose due date is
   before today. Completed tasks are never shown as overdue.
5. Select **Archive task** to remove the task from the active list without
   deleting it, then open **View archive** to see the retained task.
6. Stop and restart the application to confirm that the SQLite-backed task
   data remains available.

## Troubleshooting

- **Wrong Node.js version:** run `nvm use` and confirm `node --version` reports
  `v24.14.1` in the verified environment.
- **Dependencies are missing:** run `npm ci` from the project directory.
- **Port 3000 is already in use:** stop the process using that port, or start
  development mode on another port with `npm run dev -- --port 3001`.
- **The database path is not writable:** use a `CHECKPOINT_DB_PATH` inside a
  directory that the current user can create and write to.
- **Dependencies or production source changed:** run `npm ci` after dependency
  changes and run `npm run build` again before restarting the production
  server.

The preceding document was generated and edited with the assistance of Codex
CLI[gpt-5.6-terra (medium)].
