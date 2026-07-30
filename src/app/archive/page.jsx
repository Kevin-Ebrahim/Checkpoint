import Link from "next/link";
import { getArchivedTasks } from "../../lib/tasks";

export const dynamic = "force-dynamic";

export default function ArchivePage() {
  const tasks = getArchivedTasks();

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
                  Archive
                </h1>
              </div>
            </div>
            <div className="border-l-2 border-[var(--border)] pl-3 text-right text-[10px] font-bold leading-relaxed tracking-[0.12em]">
              <p>ARCHIVED QUEUE</p>
              <p>SQLITE / LOCAL</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-dashed border-[var(--border)] pt-3 text-[10px] font-bold tracking-[0.16em]">
            <span>WORKSPACE: ARCHIVED TASKS</span>
            <Link className="border-2 border-[var(--border)] px-2 py-1 transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 focus:ring-offset-[var(--background)]" href="/">
              ACTIVE TASKS
            </Link>
          </div>
        </header>

        <section aria-labelledby="archived-tasks-heading" className="py-8">
          <div className="flex items-end justify-between gap-4 border-b-2 border-[var(--border)] pb-3">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em]">ARCHIVE / 03</p>
              <h2 className="mt-1 text-2xl font-black uppercase tracking-[-0.06em]" id="archived-tasks-heading">
                Archived tasks
              </h2>
            </div>
            <p className="text-right text-[10px] font-bold leading-relaxed tracking-[0.08em]">
              {tasks.length} {tasks.length === 1 ? "RECORD" : "RECORDS"}<br />
              RETAINED LOCALLY
            </p>
          </div>

          {tasks.length === 0 ? (
            <div className="relative mt-5 border-2 border-dashed border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
              <span aria-hidden="true" className="absolute right-3 top-3 h-3 w-3 border-2 border-[var(--border)]" />
              <p className="text-[10px] font-bold tracking-[0.2em]">ARCHIVE STATUS: EMPTY</p>
              <p className="mt-4 max-w-sm text-lg font-bold leading-snug">No archived tasks recorded.</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed">Archived tasks remain stored here after they leave the active queue.</p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4">
              {tasks.map((task) => (
                <article className="relative border-2 border-[var(--border)] bg-[#f8edbd] p-4 sm:p-5" key={task.id}>
                  <span aria-hidden="true" className="absolute left-2 top-2 h-2 w-2 bg-[var(--foreground)]" />
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-dashed border-[var(--border)] pb-4">
                    <div className="min-w-0 pr-3">
                      <p className="text-[10px] font-bold tracking-[0.16em]">TASK / {String(task.id).padStart(3, "0")}</p>
                      <h3 className="mt-2 break-words text-xl font-black uppercase leading-tight tracking-[-0.05em]">{task.title}</h3>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{task.description || "No description provided."}</p>
                    </div>
                    <span className="shrink-0 border-2 border-[var(--border)] bg-[var(--foreground)] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--background)]">{task.status}</span>
                  </div>
                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-[10px] font-bold tracking-[0.15em]">DUE DATE</dt>
                      <dd className="mt-1 font-bold">{task.due_date}</dd>
                    </div>
                    <div className="border-t border-dashed border-[var(--border)] pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                      <dt className="text-[10px] font-bold tracking-[0.15em]">TOPIC</dt>
                      <dd className="mt-1 font-bold">{task.topic}</dd>
                    </div>
                    <div className="border-t border-dashed border-[var(--border)] pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                      <dt className="text-[10px] font-bold tracking-[0.15em]">ARCHIVED</dt>
                      <dd className="mt-1 break-words font-bold">{task.archived_at}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
