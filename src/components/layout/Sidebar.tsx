"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, LayoutDashboard, FolderKanban, Settings } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      className={`bg-slate-900 text-white h-screen transition-all duration-300 flex ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sticky collapse button */}
      <div className="flex flex-col items-center pt-4 px-2 border-r border-slate-800">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="p-2 rounded hover:bg-slate-800 transition-colors"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Main sidebar content */}
      <div className="flex-1 overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-700">
          <Link href="/" className="flex items-center gap-2">
            {/* GND block */}
            <div className="px-3 py-1 bg-emerald-500 text-slate-900 font-extrabold rounded shadow-md">
              GND
            </div>

            {/* Studio text only when expanded */}
            {!collapsed && (
              <span className="font-bold text-lg tracking-wide text-white">
                Studio
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-3">
          <ul className="space-y-1">

            {/* Dashboard */}
            <li className="group relative">
              <button className="flex items-center w-full gap-3 py-2 px-2 rounded-md hover:bg-slate-800 transition-colors">
                <LayoutDashboard className="w-5 h-5 text-slate-100" />
                {!collapsed && <span className="text-sm">Dashboard</span>}
              </button>

              {collapsed && (
                <span className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-800 text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  Dashboard
                </span>
              )}
            </li>

            {/* Projects */}
            <li className="group relative">
              <button className="flex items-center w-full gap-3 py-2 px-2 rounded-md hover:bg-slate-800 transition-colors">
                <FolderKanban className="w-5 h-5 text-slate-100" />
                {!collapsed && <span className="text-sm">Projects</span>}
              </button>

              {collapsed && (
                <span className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-800 text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  Projects
                </span>
              )}
            </li>

            {/* Settings */}
            <li className="group relative">
              <button className="flex items-center w-full gap-3 py-2 px-2 rounded-md hover:bg-slate-800 transition-colors">
                <Settings className="w-5 h-5 text-slate-100" />
                {!collapsed && <span className="text-sm">Settings</span>}
              </button>

              {collapsed && (
                <span className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-800 text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  Settings
                </span>
              )}
            </li>

          </ul>
        </nav>
      </div>
    </div>
  );
}
