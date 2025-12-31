"use client";

import { useState } from "react";
import { Bell, Settings, ChevronDown } from "lucide-react";

export default function Header() {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="flex items-center justify-end gap-4 px-4 py-3">

        {/* Notifications */}
        <button className="text-slate-300 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        {/* Settings */}
        <button className="text-slate-300 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        {/* User Avatar + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenUserMenu((prev) => !prev)}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-900 font-bold">
              U
            </div>
            <ChevronDown className="w-4 h-4 text-slate-300" />
          </button>

          {openUserMenu && (
            <div className="absolute right-0 mt-2 w-44 rounded-md bg-slate-800 border border-slate-700 shadow-xl text-sm text-slate-200">
              <button className="w-full text-left px-3 py-2 hover:bg-slate-700">
                Profile
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-slate-700">
                Account settings
              </button>
              <div className="border-t border-slate-700 my-1" />
              <button className="w-full text-left px-3 py-2 text-red-400 hover:bg-slate-700">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
