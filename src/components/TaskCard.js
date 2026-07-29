export default function TaskCard({ task }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">
            {task.description || "No description provided."}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {task.status}
        </span>
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium text-slate-500">Due date</dt>
          <dd className="mt-1 text-slate-800">{task.due_date}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Topic</dt>
          <dd className="mt-1 text-slate-800">{task.topic}</dd>
        </div>
      </dl>
    </article>
  );
}
