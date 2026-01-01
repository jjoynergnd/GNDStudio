"use client";

import React from "react";

type ProjectTileProps = {
  title: string;
  headerColor: string;
  children?: React.ReactNode; // preview content + actions
};

export default function ProjectTile({ title, headerColor, children }: ProjectTileProps) {
  return (
    <div className="w-72 h-72 rounded-xl shadow-md border border-slate-200 bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <div
        className="h-14 flex items-center justify-center text-white font-semibold text-base shadow-inner"
        style={{ backgroundColor: headerColor }}
      >
        {title}
      </div>

      {/* Body */}
      <div className="flex-1 p-4 text-sm text-slate-700 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
