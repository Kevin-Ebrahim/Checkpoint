import Database from "better-sqlite3";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

let database;
let openDatabasePath;

function getDatabasePath() {
  const configuredPath = process.env.CHECKPOINT_DB_PATH;

  if (configuredPath) {
    return path.resolve(process.cwd(), configuredPath);
  }

  return path.join(process.cwd(), "data", "checkpoint.db");
}

function getSchema() {
  const schemaPath = path.join(process.cwd(), "database", "schema.sql");

  return readFileSync(schemaPath, "utf8");
}

export function getDatabase() {
  const databasePath = getDatabasePath();

  if (database && openDatabasePath === databasePath) {
    return database;
  }

  if (database) {
    database.close();
  }

  mkdirSync(path.dirname(databasePath), { recursive: true });
  database = new Database(databasePath);
  database.exec(getSchema());
  openDatabasePath = databasePath;

  return database;
}

export function closeDatabase() {
  if (!database) {
    return;
  }

  database.close();
  database = undefined;
  openDatabasePath = undefined;
}
