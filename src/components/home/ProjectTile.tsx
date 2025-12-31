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
    <div
      className="w-full h-40 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full bg-white rounded-lg shadow-lg backface-hidden">
          <div
            className="h-12 rounded-t-lg flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: project.headerColor }}
          >
            {project.name}
          </div>

          {/* Optional body area */}
          <div className="p-4 text-center text-sm text-slate-700"></div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full bg-slate-100 rounded-lg shadow-lg rotate-y-180 backface-hidden flex items-center justify-center p-4">
          {project.flipContent ? project.flipContent : <span>Coming Soon</span>}
        </div>
      </div>
    </div>
  );
}
