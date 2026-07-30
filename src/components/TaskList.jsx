import TaskCard from "./TaskCard";

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <div className="relative border-2 border-dashed border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <span aria-hidden="true" className="absolute right-3 top-3 h-3 w-3 border-2 border-[var(--border)]" />
        <p className="text-[10px] font-bold tracking-[0.2em]">QUEUE STATUS: CLEAR</p>
        <p className="mt-4 max-w-sm text-lg font-bold leading-snug">No active tasks recorded.</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed">Use the entry module to add the first item to this workspace.</p>
      </div>
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
