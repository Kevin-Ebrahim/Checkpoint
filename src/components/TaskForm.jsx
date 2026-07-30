"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { createTaskAction, updateTaskAction } from "../app/actions";

const initialState = {};

export default function TaskForm({ task }) {
  const isEditing = Boolean(task);
  const action = isEditing ? updateTaskAction : createTaskAction;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const formRef = useRef(null);

  useEffect(() => {
    if (!isEditing && state.success) {
      formRef.current?.reset();
    }
  }, [isEditing, state.success]);

  return (
    <form
      action={formAction}
      className="task-form"
      ref={formRef}
    >
      <div className="form-heading">
        <div>
          <p className="eyebrow">{isEditing ? "Edit checkpoint" : "New checkpoint"}</p>
          <h2>{isEditing ? "Task details" : "Add a task"}</h2>
        </div>
        <span aria-hidden="true" className="form-index">{isEditing ? "02" : "01"}</span>
        <p>
          {isEditing ? "Revise this active task without changing its status." : "Add the next item to your checklist."}
        </p>
      </div>

      {state.error ? (
        <p className="form-message form-message-error" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="form-fields">
        {isEditing ? <input name="taskId" type="hidden" value={task.id} /> : null}
        <label className="field-group field-span">
          <span>Title <b>*</b></span>
          <input
            className="field-control"
            name="title"
            required
            type="text"
            defaultValue={task?.title}
          />
        </label>

        <label className="field-group field-span">
          <span>Description</span>
          <textarea
            className="field-control field-textarea"
            name="description"
            defaultValue={task?.description}
          />
        </label>

        <label className="field-group">
          <span>Due date <b>*</b></span>
          <input
            className="field-control"
            name="dueDate"
            required
            type="date"
            defaultValue={task?.due_date}
          />
        </label>

        <label className="field-group">
          <span>Topic <b>*</b></span>
          <input
            className="field-control"
            name="topic"
            required
            type="text"
            defaultValue={task?.topic}
          />
        </label>
      </div>

      <div className={isEditing ? "form-actions form-actions-split" : "form-actions"}>
        <button
          className="button-primary"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (isEditing ? "Saving changes..." : "Creating task...") : (isEditing ? "Save changes" : "Create task")}
        </button>
        {isEditing ? (
          <Link
            className="button-secondary"
            href="/"
          >
            Cancel
          </Link>
        ) : null}
      </div>
    </form>
  );
}
