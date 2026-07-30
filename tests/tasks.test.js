import {
  existsSync,
  mkdtempSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { closeDatabase, getDatabase } from "../src/lib/db.js";
import {
  archiveTask,
  createTask,
  getActiveTasks,
  getArchivedTasks,
  isOverdue,
  updateTask,
  updateTaskStatus,
} from "../src/lib/tasks.js";

const originalDatabasePath = process.env.CHECKPOINT_DB_PATH;
const defaultTaskInput = {
  title: "Write lab report",
  description: "Summarise the implementation",
  dueDate: "2026-08-01",
  topic: "Coursework",
};

let temporaryDirectory;

function createFixtureTask(overrides = {}) {
  return createTask({ ...defaultTaskInput, ...overrides });
}

beforeEach(() => {
  temporaryDirectory = mkdtempSync(path.join(tmpdir(), "checkpoint-test-"));
  process.env.CHECKPOINT_DB_PATH = path.join(
    temporaryDirectory,
    "checkpoint.db",
  );
});

afterEach(() => {
  closeDatabase();

  if (originalDatabasePath === undefined) {
    delete process.env.CHECKPOINT_DB_PATH;
  } else {
    process.env.CHECKPOINT_DB_PATH = originalDatabasePath;
  }

  rmSync(temporaryDirectory, { recursive: true, force: true });
  expect(existsSync(temporaryDirectory)).toBe(false);
});

describe("task database behaviour", () => {
  test("creates a Todo task with the submitted fields and returns it as active", () => {
    const created = createFixtureTask();
    const activeTasks = getActiveTasks();

    expect(created).toMatchObject({
      title: defaultTaskInput.title,
      description: defaultTaskInput.description,
      due_date: defaultTaskInput.dueDate,
      topic: defaultTaskInput.topic,
      status: "Todo",
      archived_at: null,
    });
    expect(activeTasks).toHaveLength(1);
    expect(activeTasks[0].id).toBe(created.id);
  });

  test("rejects blank titles, blank topics, and impossible calendar dates", () => {
    expect(() => createFixtureTask({ title: "   " })).toThrow(
      "Please enter a task title.",
    );
    expect(() => createFixtureTask({ topic: "   " })).toThrow(
      "Please enter a topic.",
    );
    expect(() => createFixtureTask({ dueDate: "2026-02-30" })).toThrow(
      "Please enter a valid due date.",
    );
    expect(getActiveTasks()).toEqual([]);
  });

  test("edits task fields while preserving identity, status, archive state, and creation time", () => {
    const created = createFixtureTask();
    const inProgress = updateTaskStatus(created.id, "In-Progress");

    const edited = updateTask({
      id: created.id,
      title: "Present lab work",
      description: "Demonstrate persistent editing",
      dueDate: "2026-08-03",
      topic: "Demonstration",
    });

    expect(edited).toMatchObject({
      id: created.id,
      title: "Present lab work",
      description: "Demonstrate persistent editing",
      due_date: "2026-08-03",
      topic: "Demonstration",
      status: inProgress.status,
      archived_at: null,
      created_at: created.created_at,
    });
  });

  test("does not edit archived or unknown tasks as active tasks", () => {
    const created = createFixtureTask();
    archiveTask(created.id);

    const archivedEdit = updateTask({
      id: created.id,
      title: "Changed after archive",
      description: "This must not be stored",
      dueDate: "2026-08-04",
      topic: "Archive",
    });
    const unknownEdit = updateTask({
      id: created.id + 1000,
      ...defaultTaskInput,
    });
    const stored = getDatabase()
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(created.id);

    expect(archivedEdit).toBeNull();
    expect(unknownEdit).toBeNull();
    expect(stored.title).toBe(created.title);
  });

  test("accepts every supported status, rejects unsupported values, and keeps one row", () => {
    const created = createFixtureTask();

    for (const status of ["Todo", "In-Progress", "Complete"]) {
      expect(updateTaskStatus(created.id, status).status).toBe(status);
    }

    expect(() => updateTaskStatus(created.id, "Blocked")).toThrow(
      "Please select a valid task status.",
    );
    expect(
      getDatabase().prepare("SELECT COUNT(*) AS count FROM tasks").get().count,
    ).toBe(1);
  });

  test("archives the original row without deleting or copying it", () => {
    const created = createFixtureTask();
    const archived = archiveTask(created.id);
    const storedRows = getDatabase()
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .all(created.id);

    expect(archived.id).toBe(created.id);
    expect(archived.archived_at).not.toBeNull();
    expect(storedRows).toHaveLength(1);
    expect(storedRows[0].id).toBe(created.id);
    expect(getActiveTasks()).toEqual([]);
    expect(getArchivedTasks().map((task) => task.id)).toEqual([created.id]);
    expect(
      getDatabase().prepare("SELECT COUNT(*) AS count FROM tasks").get().count,
    ).toBe(1);
  });

  test("sorts newest first, safely falls back to newest, and excludes archived tasks", () => {
    const oldest = createFixtureTask({ title: "Oldest" });
    const archived = createFixtureTask({ title: "Archived" });
    const newest = createFixtureTask({ title: "Newest" });
    archiveTask(archived.id);

    const expectedIds = [newest.id, oldest.id];

    expect(getActiveTasks("newest").map((task) => task.id)).toEqual(expectedIds);
    expect(getActiveTasks("unsupported").map((task) => task.id)).toEqual(
      expectedIds,
    );

    for (const sort of ["newest", "topic", "status", "due-date"]) {
      expect(getActiveTasks(sort).map((task) => task.id)).not.toContain(
        archived.id,
      );
    }
  });

  test("sorts topics case-insensitively from A to Z", () => {
    createFixtureTask({ title: "Z task", topic: "zebra" });
    createFixtureTask({ title: "B task", topic: "Banana" });
    createFixtureTask({ title: "A task", topic: "apple" });

    expect(getActiveTasks("topic").map((task) => task.topic)).toEqual([
      "apple",
      "Banana",
      "zebra",
    ]);
  });

  test("sorts statuses in Todo, In-Progress, Complete order", () => {
    const complete = createFixtureTask({ title: "Complete task" });
    const todo = createFixtureTask({ title: "Todo task" });
    const inProgress = createFixtureTask({ title: "In-progress task" });
    updateTaskStatus(complete.id, "Complete");
    updateTaskStatus(inProgress.id, "In-Progress");

    expect(getActiveTasks("status").map((task) => task.id)).toEqual([
      todo.id,
      inProgress.id,
      complete.id,
    ]);
  });

  test("sorts due dates from earliest to latest", () => {
    createFixtureTask({ title: "Latest", dueDate: "2027-03-01" });
    createFixtureTask({ title: "Earliest", dueDate: "2026-01-15" });
    createFixtureTask({ title: "Middle", dueDate: "2026-09-10" });

    expect(getActiveTasks("due-date").map((task) => task.due_date)).toEqual([
      "2026-01-15",
      "2026-09-10",
      "2027-03-01",
    ]);
  });

  test("derives overdue state from a supplied calendar date and task status", () => {
    const today = "2026-06-15";
    const pastTodo = createFixtureTask({
      title: "Past Todo",
      dueDate: "2026-06-14",
    });
    const pastInProgress = createFixtureTask({
      title: "Past In-Progress",
      dueDate: "2026-06-14",
    });
    const pastComplete = createFixtureTask({
      title: "Past Complete",
      dueDate: "2026-06-14",
    });
    const dueToday = createFixtureTask({
      title: "Due today",
      dueDate: today,
    });
    const future = createFixtureTask({
      title: "Future",
      dueDate: "2026-06-16",
    });

    updateTaskStatus(pastInProgress.id, "In-Progress");
    updateTaskStatus(pastComplete.id, "Complete");

    const tasksById = new Map(
      getActiveTasks().map((task) => [task.id, task]),
    );

    expect(isOverdue(tasksById.get(pastTodo.id), today)).toBe(true);
    expect(isOverdue(tasksById.get(pastInProgress.id), today)).toBe(true);
    expect(isOverdue(tasksById.get(pastComplete.id), today)).toBe(false);
    expect(isOverdue(tasksById.get(dueToday.id), today)).toBe(false);
    expect(isOverdue(tasksById.get(future.id), today)).toBe(false);
  });
});
