import TaskCard from "./TaskCard";

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        No active tasks yet. Create one above to get started.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
