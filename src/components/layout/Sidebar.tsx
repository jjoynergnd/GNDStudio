"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-slate-900 text-white h-screen transition-width duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!collapsed && <span className="font-bold text-lg">GNDStudio</span>}
        <button onClick={() => setCollapsed(!collapsed)}>
          <Menu size={24} />
        </button>
      </div>

      {/* ✅ Replace ONLY this section */}
      <nav className="p-4">
        <ul className="space-y-2">
          <li
            className={`py-2 px-2 hover:bg-slate-800 rounded transition-all ${
              collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            Dashboard
          </li>
          <li
            className={`py-2 px-2 hover:bg-slate-800 rounded transition-all ${
              collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            Projects
          </li>
          <li
            className={`py-2 px-2 hover:bg-slate-800 rounded transition-all ${
              collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            Settings
          </li>
        </ul>
      </nav>
      {/* ✅ End of replaced section */}
    </div>
  );
}
