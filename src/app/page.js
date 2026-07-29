import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getActiveTasks } from "../lib/tasks";

export const dynamic = "force-dynamic";

export default function Home() {
  const tasks = getActiveTasks();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-10">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Checkpoint</h1>
          <p className="mt-2 text-slate-600">A simple place to keep track of your tasks.</p>
        </header>

        <TaskForm />

        <section aria-labelledby="active-tasks-heading" className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold" id="active-tasks-heading">
              Active tasks
            </h2>
            <p className="mt-1 text-sm text-slate-600">Tasks you have not archived.</p>
          </div>
          <TaskList tasks={tasks} />
        </section>
      </div>
    </main>
  );
}
