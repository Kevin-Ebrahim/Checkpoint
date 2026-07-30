# Third-Party Code

## better-sqlite3

`better-sqlite3` provides the local SQLite connection used by Checkpoint. It
was selected because it is a small, direct SQLite interface that works well
for this single-user local application, without adding an ORM or migrations
framework.

## Next.js, React, and React DOM

Next.js provides the App Router application framework. React and React DOM are
its required UI runtime packages. They were selected to meet the lab's
required technology stack.

## Tailwind CSS and @tailwindcss/postcss

Tailwind CSS provides the project's styling utilities, while
`@tailwindcss/postcss` integrates Tailwind with the Next.js CSS build process.
They were selected to meet the lab's Tailwind CSS requirement with the
standard current integration.

## ESLint and eslint-config-next

ESLint checks JavaScript code quality, and `eslint-config-next` supplies
Next.js-specific linting rules. They were selected to provide the project's
documented lint command.

## Vitest

Vitest is the development test runner for Checkpoint's automated task and
database behaviour tests. It was selected for its straightforward JavaScript
test API, one-shot command support, and compatibility with the project's ES
module code.

The preceding document was generated with the assistance of Codex
CLI[gpt-5.6-terra].
