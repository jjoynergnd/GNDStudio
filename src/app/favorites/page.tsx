export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <header className="mb-6 sm:mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
            Shortcuts
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
            Favorites
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Pin your most important projects, dashboards, and views for
            one‑click access.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-8 sm:px-6 sm:py-10 text-sm text-slate-400">
          We&apos;ll eventually store favorites and surface them here and in the
          sidebar.
        </section>
      </div>
    </main>
  );
}
