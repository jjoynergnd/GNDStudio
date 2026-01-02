import Link from "next/link";

const TILE_GROUPS = [
  {
    id: "workspace",
    title: "My Workspace",
    description: "Your personal command center for active work.",
    items: [
      {
        label: "My Projects",
        href: "/projects",
        subtle: "All active workspaces",
      },
      {
        label: "My Work",
        href: "/work",
        subtle: "Assigned to you across projects",
      },
      {
        label: "My Dashboard",
        href: "/dashboard",
        subtle: "Roll‑up views and widgets",
      },
    ],
  },
  {
    id: "create",
    title: "Create",
    description: "Spin up new structures and starting points.",
    items: [
      {
        label: "New Project",
        href: "/projects",
        subtle: "Create a fresh workspace",
        // Later: we can wire this to instant createProject() like your current tile.
      },
      {
        label: "Templates",
        href: "/templates",
        subtle: "Reusable starting points",
      },
    ],
  },
  {
    id: "shortcuts",
    title: "Shortcuts",
    description: "Jump back into your most important work.",
    items: [
      {
        label: "Portfolio",
        href: "/portfolio",
        subtle: "High‑level view across projects",
      },
      {
        label: "Recent Projects",
        href: "/projects/recent",
        subtle: "What you touched last",
      },
      {
        label: "Favorites",
        href: "/favorites",
        subtle: "Pinned workspaces",
      },
    ],
  },
  {
    id: "control-center",
    title: "Control Center",
    description: "Configure the brain and plumbing of your workspace.",
    items: [
      {
        label: "AI",
        href: "/ai",
        subtle: "Assistance and automation",
      },
      {
        label: "Integrations",
        href: "/integrations",
        subtle: "Connect your tools",
      },
      {
        label: "APIs",
        href: "/apis",
        subtle: "Developer access and webhooks",
      },
      {
        label: "Settings",
        href: "/settings",
        subtle: "Workspace preferences",
      },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        {/* Top intro */}
        <header className="text-center mb-10 sm:mb-14 lg:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">
            GND Studio
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50 mb-3">
            Where your workday begins.
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Four hubs that mirror how you actually work: your space, creation,
            shortcuts, and control.
          </p>
        </header>

        {/* Tile grid */}
        <section className="grid gap-5 sm:gap-6 lg:gap-7 grid-cols-1 sm:grid-cols-2">
          {TILE_GROUPS.map((group) => (
            <article
              key={group.id}
              className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-900/80 shadow-[0_22px_60px_rgba(15,23,42,0.85)] hover:shadow-[0_26px_80px_rgba(15,23,42,1)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Soft light gradient accent */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(94,234,212,0.18),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(129,140,248,0.16),transparent_55%)]" />

              <div className="relative p-5 sm:p-6 lg:p-7 flex flex-col h-full">
                {/* Header */}
                <header className="mb-4 sm:mb-5 text-center">
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-50 mb-1">
                    {group.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {group.description}
                  </p>
                </header>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-slate-700/40 via-slate-600/30 to-slate-700/40 mb-3 sm:mb-4" />

                {/* Items */}
                <ul className="space-y-1.5 sm:space-y-2">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-slate-200/90 hover:text-slate-50 bg-slate-900/40 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700/80 transition-colors duration-200"
                      >
                        <span className="flex flex-col">
                          <span className="font-medium tracking-tight">
                            {item.label}
                          </span>
                          {item.subtle && (
                            <span className="text-[0.7rem] sm:text-[0.72rem] text-slate-400 mt-0.5">
                              {item.subtle}
                            </span>
                          )}
                        </span>
                        <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/70 text-[0.65rem] text-slate-300/80 group-hover:text-slate-50 group-hover:border-slate-500/80">
                          ↗
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Subtle footer hint */}
                <footer className="mt-4 sm:mt-5 pt-2 border-t border-slate-800/70">
                  <p className="text-[0.68rem] sm:text-[0.7rem] text-slate-500 text-center">
                    This hub will expand with dashboards, sidebars, and
                    automations as we grow.
                  </p>
                </footer>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
