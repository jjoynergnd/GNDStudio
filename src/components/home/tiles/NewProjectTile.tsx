"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "../../../context/ProjectContext";

export default function NewProjectTile() {
  const router = useRouter();
  const { createProject } = useProjects();
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    const id = createProject(name.trim());
    router.push(`/projects/${id}`);
  };

  return (
    <div className="flex flex-col h-full justify-center space-y-4">
      <input
        type="text"
        placeholder="Project Name"
        className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="w-full py-2 bg-emerald-500 text-white rounded shadow hover:bg-emerald-600 transition"
      >
        Create Project →
      </button>
    </div>
  );
}
