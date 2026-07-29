"use server";

import { revalidatePath } from "next/cache";
import { createTask, validateTaskInput } from "../lib/tasks";

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
