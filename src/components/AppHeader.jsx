import Link from "next/link";

const checkpointWordmark = ` ██████╗██╗  ██╗███████╗ ██████╗██╗  ██╗██████╗  ██████╗ ██╗███╗   ██╗████████╗
██╔════╝██║  ██║██╔════╝██╔════╝██║ ██╔╝██╔══██╗██╔═══██╗██║████╗  ██║╚══██╔══╝
██║     ███████║█████╗  ██║     █████╔╝ ██████╔╝██║   ██║██║██╔██╗ ██║   ██║
██║     ██╔══██║██╔══╝  ██║     ██╔═██╗ ██╔═══╝ ██║   ██║██║██║╚██╗██║   ██║
╚██████╗██║  ██║███████╗╚██████╗██║  ██╗██║     ╚██████╔╝██║██║ ╚████║   ██║
 ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝`;

export default function AppHeader({ title, description, navHref, navLabel, marker }) {
  return (
    <header className="masthead">
      <div className="masthead-grid">
        <div className="masthead-logo">
          <span className="sr-only">Checkpoint</span>
          <pre aria-hidden="true" className="ansi-logo">{checkpointWordmark}</pre>
          <span aria-hidden="true" className="compact-logo">Checkpoint</span>
        </div>

        <div className="masthead-copy">
          <p className="eyebrow">Local task system</p>
          <h1>{title}</h1>
          <p className="masthead-description">{description}</p>
        </div>
      </div>

      <div className="masthead-toolbar">
        <span>{marker}</span>
        <Link className="nav-link" href={navHref}>
          {navLabel}
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </header>
  );
}
