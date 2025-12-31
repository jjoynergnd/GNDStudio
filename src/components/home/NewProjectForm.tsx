"use client";

import { useState } from "react";

type ProjectType = "Website" | "CRM" | "Marketing Campaign" | "Other";

export default function NewProjectForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState<ProjectType>("Website");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Creating project: ${name} (${type})`);
    setName("");
    setType("Website");
  };

  return (
    <form
      className="w-full h-full p-4 flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold mb-2">New Project</h2>

      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value as ProjectType)}
        className="w-full p-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="Website">Website</option>
        <option value="CRM">CRM</option>
        <option value="Marketing Campaign">Marketing Campaign</option>
        <option value="Other">Other</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded shadow"
      >
        Create
      </button>
    </form>
  );
}
