"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProjectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialName = searchParams.get("name") || "";
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;

    // Placeholder for future API call
    console.log("Creating project:", { name, description });

    router.push("/projects");
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">

      <h1 className="text-3xl font-semibold text-slate-900">
        Create New Project
      </h1>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Project Name
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="e.g. Marketing Website Redesign"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Description
        </label>
        <textarea
          className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Describe the purpose or goals of this project..."
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button
        onClick={handleCreate}
        className="px-6 py-2 bg-emerald-500 text-white rounded shadow hover:bg-emerald-600 transition"
      >
        Create Project
      </button>
    </div>
  );
}
