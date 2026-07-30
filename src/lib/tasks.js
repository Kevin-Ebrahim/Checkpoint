import { getDatabase } from "./db";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
export const TASK_STATUSES = ["Todo", "In-Progress", "Complete"];

function isValidDate(value) {
  if (!DATE_PATTERN.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validateTaskInput({ title, description, dueDate, topic }) {
  const trimmedTitle = title?.trim() ?? "";
  const trimmedTopic = topic?.trim() ?? "";
  const trimmedDescription = description?.trim() ?? "";

  if (!trimmedTitle) {
    return { error: "Please enter a task title." };
  }

  if (!dueDate || !isValidDate(dueDate)) {
    return { error: "Please enter a valid due date." };
  }

  if (!trimmedTopic) {
    return { error: "Please enter a topic." };
  }

  return {
    value: {
      title: trimmedTitle,
      description: trimmedDescription,
      dueDate,
      topic: trimmedTopic,
    },
  };
}

export function createTask(input) {
  const validation = validateTaskInput(input);

  if (validation.error) {
    throw new Error(validation.error);
  }

  const database = getDatabase();
  const result = database
    .prepare(
      `INSERT INTO tasks (title, description, due_date, topic, status)
       VALUES (?, ?, ?, ?, 'Todo')`,
    )
    .run(
      validation.value.title,
      validation.value.description,
      validation.value.dueDate,
      validation.value.topic,
    );

  return database
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);
}

export function validateTaskStatusInput({ id, status }) {
  const taskId = Number(id);

  if (!Number.isSafeInteger(taskId) || taskId < 1) {
    return { error: "Please select a valid task." };
  }

  if (!TASK_STATUSES.includes(status)) {
    return { error: "Please select a valid task status." };
  }

  return { value: { id: taskId, status } };
}

export function updateTaskStatus(id, status) {
  const validation = validateTaskStatusInput({ id, status });

  if (validation.error) {
    throw new Error(validation.error);
  }

  const database = getDatabase();
  const result = database
    .prepare(
      `UPDATE tasks
       SET status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND status <> ?`,
    )
    .run(validation.value.status, validation.value.id, validation.value.status);

  if (result.changes === 0) {
    return database
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(validation.value.id) ?? null;
  }

  return database
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(validation.value.id);
}

export function getActiveTasks() {
  return getDatabase()
    .prepare(
      `SELECT * FROM tasks
       WHERE archived_at IS NULL
       ORDER BY id DESC`,
    )
    .all();
}
