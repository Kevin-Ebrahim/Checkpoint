import Image from "next/image";
import Link from "next/link";

export default function AppHeader({ title, description, navHref, navLabel, marker }) {
  return (
    <header className="masthead">
      <div className="masthead-grid">
        <div className="masthead-logo">
          <Image
            alt="Checkpoint"
            className="object-cover object-center"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 46rem"
            src="/images/checkpoint-logo.png"
          />
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
