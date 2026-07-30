"use server";

import { revalidatePath } from "next/cache";
import {
  archiveTask,
  createTask,
  updateTaskStatus,
  validateTaskId,
  validateTaskInput,
  validateTaskStatusInput,
} from "../lib/tasks";

export async function createTaskAction(previousState, formData) {
  const input = {
    title: formData.get("title"),
    description: formData.get("description"),
    dueDate: formData.get("dueDate"),
    topic: formData.get("topic"),
  };
  const validation = validateTaskInput(input);

  if (validation.error) {
    return { error: validation.error };
  }

  try {
    createTask(validation.value);
  } catch {
    return { error: "We could not create that task. Please try again." };
  }

  revalidatePath("/");
  return { success: true };
}

export async function updateTaskStatusAction(previousState, formData) {
  const validation = validateTaskStatusInput({
    id: formData.get("taskId"),
    status: formData.get("status"),
  });

  if (validation.error) {
    return { error: validation.error };
  }

  try {
    const task = updateTaskStatus(validation.value.id, validation.value.status);

    if (!task) {
      return { error: "That task could not be found." };
    }
  } catch {
    return { error: "We could not update that task status. Please try again." };
  }

  revalidatePath("/");
  return { success: true };
}

export async function archiveTaskAction(previousState, formData) {
  const validation = validateTaskId(formData.get("taskId"));

  if (validation.error) {
    return { error: validation.error };
  }

  try {
    const task = archiveTask(validation.value);

    if (!task) {
      return { error: "That task could not be found." };
    }
  } catch {
    return { error: "We could not archive that task. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/archive");
  return { success: true };
}
