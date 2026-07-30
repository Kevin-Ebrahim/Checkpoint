import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getActiveTasks } from "../lib/tasks";

export const dynamic = "force-dynamic";

export default function Home() {
  const tasks = getActiveTasks();

  return (
    <main className="min-h-screen px-4 py-5 text-[var(--foreground)] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="border-y-2 border-[var(--border)] py-4 sm:py-5">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-1 grid h-8 w-8 place-items-center border-2 border-[var(--border)] bg-[var(--foreground)] text-xs text-[var(--background)]">
                CP
              </span>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em]">LOCAL TASK TERMINAL / 01</p>
                <h1 className="mt-1 text-4xl font-black uppercase leading-none tracking-[-0.08em] sm:text-5xl">
                  Checkpoint
                </h1>
              </div>
            </div>
            <div className="border-l-2 border-[var(--border)] pl-3 text-right text-[10px] font-bold leading-relaxed tracking-[0.12em]">
              <p>ACTIVE QUEUE</p>
              <p>SQLITE / LOCAL</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-dashed border-[var(--border)] pt-3 text-[10px] font-bold tracking-[0.16em]">
            <span>WORKSPACE: CURRENT TASKS</span>
            <span aria-hidden="true">[ READY ]</span>
          </div>
        </header>

        <div className="grid gap-10 py-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
          <TaskForm />

          <section aria-labelledby="active-tasks-heading" className="min-w-0">
            <div className="flex items-end justify-between gap-4 border-b-2 border-[var(--border)] pb-3">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em]">QUEUE / 02</p>
                <h2 className="mt-1 text-2xl font-black uppercase tracking-[-0.06em]" id="active-tasks-heading">
                  Active tasks
                </h2>
              </div>
              <p className="text-right text-[10px] font-bold leading-relaxed tracking-[0.08em]">
                {tasks.length} {tasks.length === 1 ? "RECORD" : "RECORDS"}<br />
                NOT ARCHIVED
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed">Your current task queue, stored locally on this machine.</p>
            <div className="mt-5">
              <TaskList tasks={tasks} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
