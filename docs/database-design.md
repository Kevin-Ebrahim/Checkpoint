# Database Design

Checkpoint currently has one SQLite table, `tasks`; therefore, there are no
inter-table relationships.

| Column | Type | Constraints and purpose |
| --- | --- | --- |
| `id` | INTEGER | Primary key that autoincrements to give each task a stable ID. |
| `title` | TEXT | Required and checked after trimming so it cannot be blank. |
| `description` | TEXT | Required with a default empty string; an empty description is allowed. |
| `due_date` | TEXT | Required date stored as `YYYY-MM-DD`, a consistently sortable format. |
| `topic` | TEXT | Required and checked after trimming so it cannot be blank. |
| `status` | TEXT | Required, defaults to `Todo`, and is limited to `Todo`, `In-Progress`, or `Complete`. |
| `archived_at` | TEXT | Nullable timestamp. A value marks a task as archived while keeping it in this table. |
| `created_at` | TEXT | Required timestamp, defaulting to SQLite's `CURRENT_TIMESTAMP`. |
| `updated_at` | TEXT | Required timestamp, defaulting to SQLite's `CURRENT_TIMESTAMP`. |

Active tasks will be selected with `WHERE archived_at IS NULL`; archived tasks
will be selected with `WHERE archived_at IS NOT NULL`. No archive table is
used, so archiving does not delete or copy a task.

Overdue is deliberately not stored in the database. It will be derived from a
task's `due_date`, the current date, and whether its status is `Complete`.

The preceding document was generated with the assistance of Codex
CLI[gpt-5.6-terra].
