"use client";

type Portfolio = {
  id: number;
  name: string;
};

export default function MyPortfolioTile({
  portfolios = [],
}: {
  portfolios: Portfolio[];
}) {
  const hasPortfolios = portfolios.length > 0;

  return (
    <div className="w-full text-center">
      <h3 className="font-semibold text-slate-800 mb-3">Your Portfolios</h3>

      {hasPortfolios ? (
        <ul className="space-y-1 mb-4">
          {portfolios.map((p) => (
            <li key={p.id} className="text-slate-700">
              • {p.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-600 mb-4">No portfolios yet</p>
      )}

      <button className="px-3 py-1 bg-emerald-500 text-white rounded shadow hover:bg-emerald-600 transition">
        + {hasPortfolios ? "Add Portfolio" : "Create Your First Portfolio"}
      </button>
    </div>
  );
}
