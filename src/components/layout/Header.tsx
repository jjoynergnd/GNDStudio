"use client";

import { Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-end gap-4 p-4 border-b border-slate-700 bg-slate-950">
      <Bell className="w-6 h-6 cursor-pointer text-white hover:text-slate-300" />
      <Settings className="w-6 h-6 cursor-pointer text-white hover:text-slate-300" />
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 font-bold cursor-pointer">
        U
      </div>
    </div>
  );
}
