// src/components/projects/EditableProjectTitle.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { updateProjectName } from "@/app/projects/actions";
import ProjectTitleGuard from "./ProjectTitleGuard";

type EditableProjectTitleProps = {
  project: {
    id: string;
    name: string;
  };
};

export default function EditableProjectTitle({ project }: EditableProjectTitleProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-focus + select-all when entering edit mode
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  async function handleSave() {
    setEditing(false);

    if (name.trim() === "") return;

    if (name !== project.name) {
      await updateProjectName(project.id, name.trim());
    }
  }

  return (
    <>
      {/* Navigation guard until renamed */}
      <ProjectTitleGuard isUnnamed={name === "New Project"} />

      {editing ? (
        <input
          ref={inputRef}
          className="text-3xl font-semibold text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSave();
            }
          }}
        />
      ) : (
        <h1
          className="text-3xl font-semibold text-slate-900 cursor-text"
          onClick={() => setEditing(true)}
        >
          {name}
        </h1>
      )}
    </>
  );
}
