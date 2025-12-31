"use client";

import { useState } from "react";

type Project = {
  id: number;
  name: string;
  headerColor: string;
  flipContent?: React.ReactNode;
};

export default function ProjectTile({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-72 h-72 cursor-pointer">
      {/* Hover lift wrapper */}
      <div className="w-full h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl rounded-xl">

        {/* 3D flip container */}
        <div
          className={`relative w-full h-full transition-transform duration-500 [perspective:1100px] [transform-style:preserve-3d] rounded-xl shadow-xl ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
          onClick={() => setFlipped((prev) => !prev)}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-white rounded-xl [backface-visibility:hidden] overflow-hidden border border-slate-200">
            <div
              className="h-14 flex items-center justify-center text-white font-semibold text-base shadow-inner"
              style={{ backgroundColor: project.headerColor }}
            >
              {project.name}
            </div>
            <div className="p-4 text-center text-sm text-slate-600"></div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-slate-100 rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center p-4 text-sm text-slate-800 border border-slate-200">
            {project.flipContent ? project.flipContent : <span>Coming Soon</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
