import { getDatabase } from "./db";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
export const TASK_STATUSES = ["Todo", "In-Progress", "Complete"];
const DEFAULT_ACTIVE_TASK_SORT = "newest";
const ACTIVE_TASK_ORDER_BY = {
  newest: "id DESC",
  topic: "topic COLLATE NOCASE ASC, id DESC",
  status: `CASE status
    WHEN 'Todo' THEN 1
    WHEN 'In-Progress' THEN 2
    WHEN 'Complete' THEN 3
    END ASC, id DESC`,
  "due-date": "due_date ASC, id DESC",
};

export function normalizeActiveTaskSort(sort) {
  return typeof sort === "string" && Object.hasOwn(ACTIVE_TASK_ORDER_BY, sort)
    ? sort
    : DEFAULT_ACTIVE_TASK_SORT;
}

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
  const idValidation = validateTaskId(id);

  if (idValidation.error) {
    return idValidation;
  }

  if (!TASK_STATUSES.includes(status)) {
    return { error: "Please select a valid task status." };
  }

  return { value: { id: idValidation.value, status } };
}

export function validateTaskId(id) {
  const taskId = Number(id);

  if (!Number.isSafeInteger(taskId) || taskId < 1) {
    return { error: "Please select a valid task." };
  }

  return { value: taskId };
}

export function validateTaskUpdateInput({ id, title, description, dueDate, topic }) {
  const idValidation = validateTaskId(id);

  if (idValidation.error) {
    return idValidation;
  }

  const taskValidation = validateTaskInput({ title, description, dueDate, topic });

  if (taskValidation.error) {
    return taskValidation;
  }

  return {
    value: {
      id: idValidation.value,
      ...taskValidation.value,
    },
  };
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

export function getActiveTasks(sort = DEFAULT_ACTIVE_TASK_SORT) {
  const selectedSort = normalizeActiveTaskSort(sort);
  const orderBy = ACTIVE_TASK_ORDER_BY[selectedSort];

  return getDatabase()
    .prepare(
      `SELECT * FROM tasks
       WHERE archived_at IS NULL
       ORDER BY ${orderBy}`,
    )
    .all();
}

export function getActiveTaskById(id) {
  const validation = validateTaskId(id);

  if (validation.error) {
    return null;
  }

  return getDatabase()
    .prepare(
      `SELECT * FROM tasks
       WHERE id = ? AND archived_at IS NULL`,
    )
    .get(validation.value) ?? null;
}

export function updateTask(input) {
  const validation = validateTaskUpdateInput(input);

  if (validation.error) {
    throw new Error(validation.error);
  }

  const database = getDatabase();
  const result = database
    .prepare(
      `UPDATE tasks
       SET title = ?, description = ?, due_date = ?, topic = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND archived_at IS NULL`,
    )
    .run(
      validation.value.title,
      validation.value.description,
      validation.value.dueDate,
      validation.value.topic,
      validation.value.id,
    );

  if (result.changes === 0) {
    return null;
  }

  return getActiveTaskById(validation.value.id);
}

export function archiveTask(id) {
  const validation = validateTaskId(id);

  if (validation.error) {
    throw new Error(validation.error);
  }

  const database = getDatabase();
  const task = database
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(validation.value);

  if (!task) {
    return null;
  }

  if (task.archived_at !== null) {
    return task;
  }

  database
    .prepare(
      `UPDATE tasks
       SET archived_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND archived_at IS NULL`,
    )
    .run(validation.value);

  return database
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(validation.value);
}

export function getArchivedTasks() {
  return getDatabase()
    .prepare(
      `SELECT * FROM tasks
       WHERE archived_at IS NOT NULL
       ORDER BY archived_at DESC, id DESC`,
    )
    .all();
}
