"use client";

import { useActionState, useEffect, useRef } from "react";
import { createTaskAction } from "../app/actions";

const initialState = {};

export default function TaskForm() {
  const [state, formAction, isPending] = useActionState(createTaskAction, initialState);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      action={formAction}
      className="relative border-2 border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
      ref={formRef}
    >
      <span aria-hidden="true" className="absolute left-2 top-2 h-2 w-2 border border-[var(--border)]" />
      <span aria-hidden="true" className="absolute bottom-2 right-2 h-2 w-2 bg-[var(--foreground)]" />
      <div className="border-b border-dashed border-[var(--border)] pb-4">
        <p className="text-[10px] font-bold tracking-[0.2em]">ENTRY MODULE / 01</p>
        <h2 className="mt-1 text-2xl font-black uppercase tracking-[-0.06em]">Create task</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed">Log the next item in your active task queue.</p>
      </div>

      {state.error ? (
        <p className="mt-5 border-2 border-[var(--border)] bg-[var(--foreground)] px-3 py-2 text-sm font-bold text-[var(--background)]" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 sm:col-span-2">
          <span className="block text-[11px] font-bold tracking-[0.15em]">TITLE *</span>
          <input
            className="w-full border-2 border-[var(--border)] bg-[#f8edbd] px-3 py-2 text-sm outline-none placeholder:text-black/50 focus:bg-white focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
            name="title"
            required
            type="text"
          />
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className="block text-[11px] font-bold tracking-[0.15em]">DESCRIPTION</span>
          <textarea
            className="min-h-28 w-full border-2 border-[var(--border)] bg-[#f8edbd] px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
            name="description"
          />
        </label>

        <label className="space-y-2">
          <span className="block text-[11px] font-bold tracking-[0.15em]">DUE DATE *</span>
          <input
            className="w-full border-2 border-[var(--border)] bg-[#f8edbd] px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
            name="dueDate"
            required
            type="date"
          />
        </label>

        <label className="space-y-2">
          <span className="block text-[11px] font-bold tracking-[0.15em]">TOPIC *</span>
          <input
            className="w-full border-2 border-[var(--border)] bg-[#f8edbd] px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
            name="topic"
            required
            type="text"
          />
        </label>
      </div>

      <button
        className="mt-6 w-full border-2 border-[var(--border)] bg-[var(--foreground)] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[var(--background)] hover:bg-transparent hover:text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 focus:ring-offset-[var(--surface)] disabled:cursor-not-allowed disabled:border-black/40 disabled:bg-black/30 disabled:text-black/60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Creating task..." : "Create task"}
      </button>
    </form>
  );
}
