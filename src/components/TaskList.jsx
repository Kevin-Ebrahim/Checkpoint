import TaskCard from "./TaskCard";

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span aria-hidden="true" className="empty-state-mark">00</span>
        <p className="eyebrow">Queue clear</p>
        <h3>No active tasks.</h3>
        <p>Create your first task using the entry panel.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
