export default function TaskCard({ task }) {
  return (
    <article className="relative border-2 border-[var(--border)] bg-[#f8edbd] p-4 sm:p-5">
      <span aria-hidden="true" className="absolute left-2 top-2 h-2 w-2 bg-[var(--foreground)]" />
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-dashed border-[var(--border)] pb-4">
        <div className="min-w-0 pr-3">
          <p className="text-[10px] font-bold tracking-[0.16em]">TASK / {String(task.id).padStart(3, "0")}</p>
          <h3 className="mt-2 break-words text-xl font-black uppercase leading-tight tracking-[-0.05em]">{task.title}</h3>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
            {task.description || "No description provided."}
          </p>
        </div>
        <span className="shrink-0 border-2 border-[var(--border)] bg-[var(--foreground)] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--background)]">
          {task.status}
        </span>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[10px] font-bold tracking-[0.15em]">DUE DATE</dt>
          <dd className="mt-1 font-bold">{task.due_date}</dd>
        </div>
        <div className="border-t border-dashed border-[var(--border)] pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
          <dt className="text-[10px] font-bold tracking-[0.15em]">TOPIC</dt>
          <dd className="mt-1 font-bold">{task.topic}</dd>
        </div>
      </dl>
    </article>
  );
}
