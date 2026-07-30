"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { archiveTaskAction, updateTaskStatusAction } from "../app/actions";

const initialState = {};
const taskStatuses = [
  { label: "Todo", value: "Todo" },
  { label: "In progress", value: "In-Progress" },
  { label: "Complete", value: "Complete" },
];

function ArchiveSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="button-danger button-compact"
      disabled={pending}
      type="submit"
    >
      {pending ? "Archiving..." : "Archive task"}
    </button>
  );
}

function StatusOptionButton({ currentStatus, label, value }) {
  const { pending } = useFormStatus();
  const isActive = currentStatus === value;

  return (
    <button
      aria-pressed={isActive}
      className={isActive ? "status-option is-active" : "status-option"}
      disabled={pending || isActive}
      name="status"
      type="submit"
      value={value}
    >
      <span aria-hidden="true" className="status-option-check">{isActive ? "✓" : ""}</span>
      <span>{pending ? "Updating..." : label}</span>
    </button>
  );
}

export default function TaskCard({ task }) {
  const isComplete = task.status === "Complete";
  const [state, formAction] = useActionState(updateTaskStatusAction, initialState);
  const [archiveState, archiveFormAction] = useActionState(archiveTaskAction, initialState);

  return (
    <article className={isComplete ? "task-card task-card-checked" : "task-card"}>
      <div className="task-card-topline">
        <span>#{String(task.id).padStart(3, "0")}</span>
        <span className={isComplete ? "status-badge status-badge-checked" : "status-badge"}>
          {isComplete ? "✓ " : ""}{task.status}
        </span>
      </div>

      <div className="task-card-body">
        <div>
          <p className="eyebrow">{task.topic}</p>
          <h3>{task.title}</h3>
          <p className="task-description">
            {task.description || "No description provided."}
          </p>
        </div>
      </div>

      <dl className="task-meta">
        <div>
          <dt>Due date</dt>
          <dd>{task.due_date}</dd>
        </div>
        <div>
          <dt>Topic</dt>
          <dd>{task.topic}</dd>
        </div>
      </dl>

      <div className="task-controls">
        <form action={formAction} className="status-picker">
          <input name="taskId" type="hidden" value={task.id} />
          <fieldset>
            <legend>Set task state</legend>
            <div className="status-options">
              {taskStatuses.map((status) => (
                <StatusOptionButton
                  currentStatus={task.status}
                  key={status.value}
                  label={status.label}
                  value={status.value}
                />
              ))}
            </div>
          </fieldset>
          {state.error ? <p className="control-message" role="alert">{state.error}</p> : null}
          {state.success ? <p className="control-message" role="status">Status updated.</p> : null}
        </form>

        <div className="secondary-actions">
          <Link className="button-secondary button-compact" href={`/edit/${task.id}`}>
            Edit
          </Link>
          <form action={archiveFormAction}>
            <input name="taskId" type="hidden" value={task.id} />
            <ArchiveSubmitButton />
            {archiveState.error ? <p className="control-message" role="alert">{archiveState.error}</p> : null}
            {archiveState.success ? <p className="control-message" role="status">Task archived.</p> : null}
          </form>
        </div>
      </div>
    </article>
  );
}
