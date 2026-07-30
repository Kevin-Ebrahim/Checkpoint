import Link from "next/link";
import TaskForm from "../../../components/TaskForm";
import { getActiveTaskById } from "../../../lib/tasks";

export const dynamic = "force-dynamic";

export default async function EditTaskPage({ params }) {
  const { id } = await params;
  const task = getActiveTaskById(id);

  if (!task) {
    return (
      <main className="min-h-screen px-4 py-5 text-[var(--foreground)] sm:px-6 sm:py-8">
        <div className="mx-auto max-w-2xl">
          <section className="relative border-2 border-dashed border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <span aria-hidden="true" className="absolute right-3 top-3 h-3 w-3 border-2 border-[var(--border)]" />
            <p className="text-[10px] font-bold tracking-[0.2em]">EDIT MODULE / UNAVAILABLE</p>
            <h1 className="mt-4 text-3xl font-black uppercase tracking-[-0.06em]">Task not found</h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed">
              This task does not exist or is no longer in the active queue.
            </p>
            <Link
              className="mt-6 inline-block border-2 border-[var(--border)] bg-[var(--foreground)] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[var(--background)] transition-colors hover:bg-transparent hover:text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
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
    <main className="min-h-screen px-4 py-5 text-[var(--foreground)] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-2xl">
        <header className="border-y-2 border-[var(--border)] py-4 sm:py-5">
          <p className="text-[10px] font-bold tracking-[0.2em]">LOCAL TASK TERMINAL / 01</p>
          <h1 className="mt-1 text-4xl font-black uppercase leading-none tracking-[-0.08em] sm:text-5xl">Edit task</h1>
          <div className="mt-4 flex items-center justify-between border-t border-dashed border-[var(--border)] pt-3 text-[10px] font-bold tracking-[0.16em]">
            <span>TASK / {String(task.id).padStart(3, "0")}</span>
            <Link className="border-2 border-[var(--border)] px-2 py-1 transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 focus:ring-offset-[var(--background)]" href="/">
              ACTIVE TASKS
            </Link>
          </div>
        </header>

        <div className="py-8">
          <TaskForm task={task} />
        </div>
      </div>
    </main>
  );
}
