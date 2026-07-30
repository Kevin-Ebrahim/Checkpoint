import Link from "next/link";
import TaskForm from "../../../components/TaskForm";
import { getActiveTaskById } from "../../../lib/tasks";

export const dynamic = "force-dynamic";

export default async function EditTaskPage({ params }) {
  const { id } = await params;
  const task = getActiveTaskById(id);

  if (!task) {
    return (
      <main className="app-shell">
        <div className="app-frame compact-frame">
          <section className="not-found-panel">
            <p className="eyebrow">Record unavailable</p>
            <h1>Task not found</h1>
            <p>
              This task does not exist or is no longer in the active queue.
            </p>
            <Link
              className="button-primary"
              href="/"
            >
              Return to active tasks
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <div className="app-frame compact-frame">
        <h1 className="sr-only">Edit task</h1>
        <div className="edit-form-wrap">
          <TaskForm task={task} />
        </div>
      </div>
    </main>
  );
}
