"use client";

type Portfolio = {
  id: number;
  name: string;
};

export default function MyPortfolioTile({ portfolios = [] }: { portfolios: Portfolio[] }) {
  const hasPortfolios = portfolios.length > 0;

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        {hasPortfolios ? (
          <ul className="space-y-1 mb-4">
            {portfolios.slice(0, 3).map((p) => (
              <li key={p.id} className="text-slate-700">
                • {p.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-600 mb-4">No portfolios yet</p>
        )}
      </div>

      <button className="w-full py-2 bg-emerald-500 text-white rounded shadow hover:bg-emerald-600 transition">
        {hasPortfolios ? "View All Portfolios" : "Create Your First Portfolio"}
      </button>
    </div>
  );
}
