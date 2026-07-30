import Link from "next/link";
import AppHeader from "../components/AppHeader";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  getActiveTasks,
  getLocalDateString,
  isOverdue,
  normalizeActiveTaskSort,
} from "../lib/tasks";

export const dynamic = "force-dynamic";

const sortOptions = [
  { label: "Newest first", value: "newest" },
  { label: "Topic", value: "topic" },
  { label: "Status", value: "status" },
  { label: "Due date", value: "due-date" },
];

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const selectedSort = normalizeActiveTaskSort(params?.sort);
  const today = getLocalDateString();
  const tasks = getActiveTasks(selectedSort).map((task) => ({
    ...task,
    overdue: isOverdue(task, today),
  }));

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
            <nav aria-label="Sort active tasks" className="sort-control">
              <span className="sort-control-label">Sort by</span>
              <div className="sort-links">
                {sortOptions.map((option) => {
                  const isSelected = selectedSort === option.value;

                  return (
                    <Link
                      aria-current={isSelected ? "page" : undefined}
                      className={isSelected ? "sort-link is-active" : "sort-link"}
                      href={`/?sort=${option.value}`}
                      key={option.value}
                    >
                      <span aria-hidden="true" className="sort-link-check">{isSelected ? "✓" : ""}</span>
                      {option.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
            <div className="task-list-wrap">
              <TaskList tasks={tasks} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
