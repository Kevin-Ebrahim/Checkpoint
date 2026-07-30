import AppHeader from "../../components/AppHeader";
import { getArchivedTasks } from "../../lib/tasks";

export const dynamic = "force-dynamic";

export default function ArchivePage() {
  const tasks = getArchivedTasks();

  return (
    <main className="app-shell">
      <div className="app-frame">
        <AppHeader
          description="A permanent local record of work moved out of the active queue."
          marker={`${tasks.length} archived ${tasks.length === 1 ? "task" : "tasks"}`}
          navHref="/"
          navLabel="Back to active"
          title="Archive"
        />

        <section aria-labelledby="archived-tasks-heading" className="archive-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Retained records</p>
              <h2 id="archived-tasks-heading">Archived tasks</h2>
            </div>
            <span className="record-count">{String(tasks.length).padStart(2, "0")}</span>
          </div>
          <p className="section-intro">These tasks remain in SQLite and are no longer shown in the active desk.</p>

          {tasks.length === 0 ? (
            <div className="empty-state">
              <span aria-hidden="true" className="empty-state-mark">00</span>
              <p className="eyebrow">Archive clear</p>
              <h3>No archived tasks yet.</h3>
              <p>Tasks will appear here after you archive them from the active desk.</p>
            </div>
          ) : (
            <div className="archive-grid">
              {tasks.map((task) => (
                <article className="archive-card" key={task.id}>
                  <div className="archive-card-topline">
                    <span>#{String(task.id).padStart(3, "0")}</span>
                    <span className="status-badge">{task.status}</span>
                  </div>
                  <div className="archive-card-body">
                    <div>
                      <p className="eyebrow">{task.topic}</p>
                      <h3>{task.title}</h3>
                      <p className="task-description">{task.description || "No description provided."}</p>
                    </div>
                  </div>
                  <dl className="archive-meta">
                    <div>
                      <dt>Due</dt>
                      <dd>{task.due_date}</dd>
                    </div>
                    <div>
                      <dt>Archived</dt>
                      <dd>{task.archived_at}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
