"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { archiveTaskAction, updateTaskStatusAction } from "../app/actions";

const initialState = {};
const taskStatuses = ["Todo", "In-Progress", "Complete"];

function StatusSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="border-2 border-[var(--border)] bg-[var(--foreground)] px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--background)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      {pending ? "Updating..." : "Update status"}
    </button>
  );
}

function ArchiveSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="border-2 border-[var(--border)] bg-transparent px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)] disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      {pending ? "Archiving..." : "Archive task"}
    </button>
  );
}

export default function TaskCard({ task }) {
  const [state, formAction] = useActionState(updateTaskStatusAction, initialState);
  const [archiveState, archiveFormAction] = useActionState(archiveTaskAction, initialState);

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

      <div className="mt-4 border-t border-dashed border-[var(--border)] pt-4">
        <Link
          className="inline-block border-2 border-[var(--border)] bg-transparent px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 focus:ring-offset-[#f8edbd]"
          href={`/edit/${task.id}`}
        >
          Edit task
        </Link>
      </div>

      <form action={formAction} className="mt-4 border-t border-dashed border-[var(--border)] pt-4">
        <input name="taskId" type="hidden" value={task.id} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="block text-[10px] font-bold tracking-[0.15em]" htmlFor={`status-${task.id}`}>
              STATUS
            </label>
            <select
              className="mt-1 w-full border-2 border-[var(--border)] bg-[var(--background)] px-3 py-2 font-mono text-sm font-bold focus:outline-2 focus:outline-offset-2 focus:outline-[var(--foreground)]"
              defaultValue={task.status}
              id={`status-${task.id}`}
              name="status"
            >
              {taskStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <StatusSubmitButton />
        </div>
        {state.error ? <p className="mt-3 text-sm font-bold" role="alert">{state.error}</p> : null}
        {state.success ? <p className="mt-3 text-sm font-bold" role="status">Status updated.</p> : null}
      </form>

      <form action={archiveFormAction} className="mt-4 border-t border-dashed border-[var(--border)] pt-4">
        <input name="taskId" type="hidden" value={task.id} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[10px] font-bold tracking-[0.15em]">REMOVE FROM ACTIVE QUEUE</p>
          <ArchiveSubmitButton />
        </div>
        {archiveState.error ? <p className="mt-3 text-sm font-bold" role="alert">{archiveState.error}</p> : null}
        {archiveState.success ? <p className="mt-3 text-sm font-bold" role="status">Task archived.</p> : null}
      </form>
    </article>
  );
}
