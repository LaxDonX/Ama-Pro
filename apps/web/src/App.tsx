import {
  ArrowRight,
  BarChart3,
  CheckSquare,
  ChevronRight,
  ClipboardList,
  Compass,
  Download,
  Eye,
  FileText,
  Image,
  LockKeyhole,
  Mail,
  Menu,
  Play,
  Search,
  Settings,
  Sparkles,
  Upload,
  Video,
  WandSparkles,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { tasks, tools } from "./data";
import type { Task, ToolCategory, ToolDefinition } from "./types";

type IconComponent = LucideIcon;

type Route =
  | { page: "home" }
  | { page: "workspace" }
  | { page: "tool"; toolId: string };

const categoryIcons: Record<ToolCategory, IconComponent> = {
  ads: BarChart3,
  listing: ClipboardList,
  image: Image,
  video: Video,
  keyword: Search,
  research: Compass,
  other: Sparkles,
};

function parseRoute(pathname: string): Route {
  const toolMatch = pathname.match(/^\/app\/tools\/([^/]+)/);

  if (toolMatch) {
    return { page: "tool", toolId: toolMatch[1] };
  }

  if (pathname.startsWith("/app")) {
    return { page: "workspace" };
  }

  return { page: "home" };
}

function useRoute() {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (href: string) => {
    window.history.pushState({}, "", href);
    setRoute(parseRoute(href));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { route, navigate };
}

function AppLink({
  href,
  className,
  children,
  onNavigate,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate: (href: string) => void;
  ariaLabel?: string;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("/")) {
      event.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <a aria-label={ariaLabel} className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}

export function App() {
  const { route, navigate } = useRoute();

  if (route.page === "workspace") {
    return <WorkspacePage navigate={navigate} />;
  }

  if (route.page === "tool") {
    return <ToolPage navigate={navigate} toolId={route.toolId} />;
  }

  return <HomePage navigate={navigate} />;
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-mark" aria-label="Ama-Pro">
      <span className="brand-symbol">
        <span />
        <span />
        <span />
      </span>
      {!compact && (
        <span className="brand-word">
          Ama-<strong>Pro</strong>
        </span>
      )}
    </div>
  );
}

function HomePage({ navigate }: { navigate: (href: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell">
      <header className="site-nav">
        <AppLink href="/" className="nav-brand" onNavigate={navigate}>
          <BrandMark />
        </AppLink>
        <button
          className="mobile-menu"
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <a href="#product" onClick={closeMenu}>
            Product
          </a>
          <a href="#tools" onClick={closeMenu}>
            Tools
          </a>
          <a href="#workflow" onClick={closeMenu}>
            Workflow
          </a>
          <a href="#docs" onClick={closeMenu}>
            Docs
          </a>
          <a href="#access" onClick={closeMenu}>
            Login
          </a>
          <AppLink href="/app" className="nav-cta" onNavigate={navigate}>
            Enter workspace <ArrowRight size={18} />
          </AppLink>
        </nav>
      </header>

      <section className="hero-section" id="product">
        <div className="hero-copy">
          <h1>
            <span>Ama-</span>
            <strong>Pro</strong>
          </h1>
          <p>
            One refined workspace for ecommerce tools, creative assets, listings, files,
            and repeatable seller workflows.
          </p>
          <div className="hero-actions">
            <AppLink href="/app" className="button button-primary" onNavigate={navigate}>
              Enter workspace <ArrowRight size={20} />
            </AppLink>
            <a className="button button-secondary" href="#tools">
              Explore tools <ArrowRight size={20} />
            </a>
          </div>
          <AccessStrip />
        </div>

        <HeroVisual />
      </section>

      <section className="workflow-preview" id="workflow" aria-labelledby="workflow-title">
        <div className="workflow-intro">
          <span>How it works</span>
          <h2 id="workflow-title">From file to output in four clear moves.</h2>
        </div>
        <div className="workflow-steps">
          <WorkflowStep icon={Upload} title="Upload" text="Add files, product notes, or creative assets." />
          <WorkflowStep icon={WandSparkles} title="Generate" text="Run the right module for the job." />
          <WorkflowStep icon={CheckSquare} title="Review" text="Tune results before they become work files." />
          <WorkflowStep icon={Download} title="Export" text="Download results and keep task history." />
        </div>
      </section>
    </main>
  );
}

function AccessStrip() {
  return (
    <form className="access-strip" id="access" onSubmit={(event) => event.preventDefault()}>
      <div className="access-title">
        <span />
        <p>Access your workspace</p>
        <span />
      </div>
      <div className="access-controls">
        <label>
          <Mail size={18} />
          <input type="email" placeholder="Email" aria-label="Email" />
        </label>
        <label>
          <LockKeyhole size={18} />
          <input type="password" placeholder="Password" aria-label="Password" />
          <Eye size={18} />
        </label>
        <button type="button">Sign in</button>
        <a href="#docs">
          Request access <ArrowRight size={17} />
        </a>
      </div>
      <div className="access-notes">
        <span>Secure and private</span>
        <span>Built for sellers</span>
        <span>File-first automation</span>
      </div>
    </form>
  );
}

function HeroVisual() {
  const modules = [
    { name: "Ads", text: "Optimize performance", icon: BarChart3, tone: "dark" },
    { name: "Listing", text: "Shape product pages", icon: ClipboardList, tone: "light" },
    { name: "Images", text: "Create product visuals", icon: Image, tone: "dark" },
    { name: "Video", text: "Build conversion clips", icon: Video, tone: "light" },
    { name: "Keywords", text: "Find high-intent terms", icon: Search, tone: "light" },
    { name: "Research", text: "Review market signals", icon: Compass, tone: "dark" },
  ];

  return (
    <div className="hero-visual" id="tools" aria-label="Ama-Pro capability modules">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="product-stack">
        <article className="product-sheet main-sheet">
          <div className="mock-image">
            <div />
          </div>
          <div className="mock-thumbs">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="mock-lines">
            <span />
            <span />
          </div>
        </article>
        <article className="product-sheet listing-sheet">
          <FileText size={28} />
          <span />
          <span />
          <span />
          <span />
        </article>
        <article className="video-card">
          <Play size={34} fill="currentColor" />
          <div>
            <span />
            <span />
          </div>
        </article>
        <article className="mini-gallery">
          <span />
          <span />
          <span />
        </article>
      </div>
      <div className="center-node">
        <BrandMark compact />
      </div>
      {modules.map((module, index) => {
        const Icon = module.icon;

        return (
          <article className={`module-chip module-${index + 1} ${module.tone}`} key={module.name}>
            <Icon size={24} />
            <div>
              <strong>{module.name}</strong>
              <span>{module.text}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function WorkflowStep({
  icon: Icon,
  title,
  text,
}: {
  icon: IconComponent;
  title: string;
  text: string;
}) {
  return (
    <article className="workflow-step">
      <div className="workflow-icon">
        <Icon size={28} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

function WorkspacePage({ navigate }: { navigate: (href: string) => void }) {
  const activeTools = tools.filter((tool) => tool.status === "available");
  const plannedTools = tools.filter((tool) => tool.status === "planned");

  return (
    <main className="app-frame">
      <aside className="app-sidebar">
        <AppLink href="/" className="sidebar-brand" onNavigate={navigate}>
          <BrandMark />
        </AppLink>
        <nav aria-label="Workspace navigation">
          <AppLink href="/app" className="active" onNavigate={navigate}>
            <Compass size={18} /> Workspace
          </AppLink>
          <a href="#tool-library">
            <Sparkles size={18} /> Tools
          </a>
          <a href="#recent-tasks">
            <CheckSquare size={18} /> Tasks
          </a>
          <a href="#settings">
            <Settings size={18} /> Settings
          </a>
        </nav>
      </aside>

      <section className="workspace-main">
        <header className="workspace-header">
          <div>
            <span>Mock workspace</span>
            <h1>Build ecommerce work into repeatable tools.</h1>
          </div>
          <AppLink href="/app/tools/ads-diagnosis" className="button button-primary" onNavigate={navigate}>
            New task <ArrowRight size={19} />
          </AppLink>
        </header>

        <section className="workspace-grid">
          <article className="workspace-panel spotlight-panel">
            <div className="panel-heading">
              <span>Available now</span>
              <strong>{activeTools.length} mock module</strong>
            </div>
            <h2>Start with Ads Diagnosis, keep the shell ready for creative and listing workflows.</h2>
            <p>
              The frontend uses the same tool contract for every module, so future image, video,
              listing, keyword, and research interfaces can plug into the same workspace pattern.
            </p>
            <AppLink href="/app/tools/ads-diagnosis" className="text-link" onNavigate={navigate}>
              Open Ads Diagnosis <ChevronRight size={18} />
            </AppLink>
          </article>

          <article className="workspace-panel task-panel" id="recent-tasks">
            <div className="panel-heading">
              <span>Recent tasks</span>
              <strong>{tasks.length} records</strong>
            </div>
            <TaskList taskItems={tasks} />
          </article>
        </section>

        <section className="tool-library" id="tool-library" aria-labelledby="tool-library-title">
          <div className="section-title-row">
            <div>
              <span>Tool library</span>
              <h2 id="tool-library-title">Modules are separate, the workspace stays consistent.</h2>
            </div>
          </div>
          <div className="tool-list">
            {[...activeTools, ...plannedTools].map((tool) => (
              <ToolRow key={tool.id} navigate={navigate} tool={tool} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function ToolRow({ tool, navigate }: { tool: ToolDefinition; navigate: (href: string) => void }) {
  const Icon = categoryIcons[tool.category];

  return (
    <article className="tool-row">
      <div className="tool-row-icon">
        <Icon size={22} />
      </div>
      <div className="tool-row-copy">
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
      </div>
      <span className={`status-label ${tool.status}`}>{tool.status}</span>
      <AppLink href={tool.route} className="tool-row-action" onNavigate={navigate}>
        Open <ArrowRight size={17} />
      </AppLink>
    </article>
  );
}

function TaskList({ compact = false, taskItems }: { compact?: boolean; taskItems: Task[] }) {
  return (
    <div className={compact ? "task-list compact" : "task-list"}>
      {taskItems.map((task) => {
        const tool = tools.find((item) => item.id === task.toolId);

        return (
          <article className="task-row" key={task.id}>
            <div>
              <strong>{task.id}</strong>
              <span>{tool?.name ?? task.toolId}</span>
            </div>
            <div className="task-progress" aria-label={`${task.progress}% complete`}>
              <span style={{ width: `${task.progress}%` }} />
            </div>
            <span className={`status-label ${task.status}`}>{task.status}</span>
          </article>
        );
      })}
    </div>
  );
}

function ToolPage({ navigate, toolId }: { navigate: (href: string) => void; toolId: string }) {
  const tool = useMemo(() => tools.find((item) => item.id === toolId), [toolId]);

  if (!tool) {
    return (
      <main className="tool-page simple-state">
        <BrandMark />
        <h1>Tool not found</h1>
        <AppLink href="/app" className="button button-primary" onNavigate={navigate}>
          Back to workspace <ArrowRight size={18} />
        </AppLink>
      </main>
    );
  }

  const Icon = categoryIcons[tool.category];
  const relatedTasks = tasks.filter((task) => task.toolId === tool.id);

  return (
    <main className="tool-page">
      <header className="tool-topbar">
        <AppLink href="/app" className="back-link" onNavigate={navigate}>
          <ChevronRight size={18} /> Workspace
        </AppLink>
        <BrandMark />
      </header>
      <section className="tool-hero">
        <div className="tool-title">
          <div className="tool-hero-icon">
            <Icon size={30} />
          </div>
          <div>
            <span className={`status-label ${tool.status}`}>{tool.status}</span>
            <h1>{tool.name}</h1>
            <p>{tool.description}</p>
          </div>
        </div>
      </section>

      <section className="tool-content">
        {tool.status === "available" ? <AvailableToolForm /> : <PlannedToolState tool={tool} />}
        <article className="tool-side-panel">
          <div className="panel-heading">
            <span>Task history</span>
            <strong>{relatedTasks.length || "Mock"}</strong>
          </div>
          {relatedTasks.length ? (
            <TaskList compact taskItems={relatedTasks} />
          ) : (
            <p className="muted">
              This module is planned. Once the interface is connected, tasks will appear here.
            </p>
          )}
        </article>
      </section>
    </main>
  );
}

function AvailableToolForm() {
  return (
    <article className="tool-form">
      <div className="panel-heading">
        <span>Create mock task</span>
        <strong>File-first</strong>
      </div>
      <label className="upload-target">
        <Upload size={30} />
        <strong>Drop performance file here</strong>
        <span>Excel or CSV placeholder for the first module workflow.</span>
        <input type="file" aria-label="Upload performance file" />
      </label>
      <div className="form-grid">
        <label>
          Target ACOS
          <input defaultValue="25%" />
        </label>
        <label>
          Report mode
          <select defaultValue="action">
            <option value="action">Action report</option>
            <option value="summary">Summary</option>
          </select>
        </label>
      </div>
      <button className="button button-primary" type="button">
        Create mock task <ArrowRight size={18} />
      </button>
    </article>
  );
}

function PlannedToolState({ tool }: { tool: ToolDefinition }) {
  return (
    <article className="tool-form planned-state">
      <div className="panel-heading">
        <span>Planned module</span>
        <strong>{tool.category}</strong>
      </div>
      <Sparkles size={34} />
      <h2>{tool.name} is ready for interface design later.</h2>
      <p>
        The route, status, category, and task pattern are already reserved. When the module is
        built, its form can be added here without changing the homepage.
      </p>
    </article>
  );
}
