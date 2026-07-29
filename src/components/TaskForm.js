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
      className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      ref={formRef}
    >
      <div>
        <h2 className="text-xl font-semibold">Create a task</h2>
        <p className="mt-1 text-sm text-slate-600">Add the details for your next task.</p>
      </div>

      {state.error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-1 sm:col-span-2">
          <span className="text-sm font-medium">Title</span>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            name="title"
            required
            type="text"
          />
        </label>

        <label className="space-y-1 sm:col-span-2">
          <span className="text-sm font-medium">Description</span>
          <textarea
            className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2"
            name="description"
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Due date</span>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            name="dueDate"
            required
            type="date"
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Topic</span>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            name="topic"
            required
            type="text"
          />
        </label>
      </div>

      <button
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Creating task..." : "Create task"}
      </button>
    </form>
  );
}
