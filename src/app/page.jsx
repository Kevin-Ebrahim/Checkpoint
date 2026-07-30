import AppHeader from "../components/AppHeader";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getActiveTasks } from "../lib/tasks";

export const dynamic = "force-dynamic";

export default function Home() {
  const tasks = getActiveTasks();

  return (
    <main className="app-shell">
      <div className="app-frame">
        <AppHeader
          description="Capture tasks, check them off, and keep every completed record close."
          marker={`${tasks.length} active ${tasks.length === 1 ? "task" : "tasks"}`}
          navHref="/archive"
          navLabel="View archive"
          title="Task desk"
        />

        <div className="workspace-grid">
          <aside className="form-column">
            <TaskForm />
          </aside>

          <section aria-labelledby="active-tasks-heading" className="task-column">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Current queue</p>
                <h2 id="active-tasks-heading">Task checklist</h2>
              </div>
              <span className="record-count">{String(tasks.length).padStart(2, "0")}</span>
            </div>
            <p className="section-intro">Check tasks off as you finish them, or use the status control for work still in progress.</p>
            <div className="task-list-wrap">
              <TaskList tasks={tasks} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
