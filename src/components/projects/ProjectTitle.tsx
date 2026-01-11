"use client";

import { useState } from "react";

type ProjectTitleProps = {
  id: string;
  name: string;
  hideId?: boolean;
};

export default function ProjectTitle({ name }: ProjectTitleProps) {
  const initial = name === "Untitled Project" ? "" : name;
  const [value, setValue] = useState(initial);
  const [editing, setEditing] = useState(!initial);

  return (
    <div className="flex flex-col">
      {editing ? (
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setEditing(false)}
          placeholder="Project Name"
          className="
            w-full
            text-3xl
            font-semibold
            bg-slate-100
            text-slate-700
            placeholder-slate-400
            rounded-md
            px-3
            py-2
            border border-slate-300
            focus:bg-white
            focus:border-slate-400
            transition
            outline-none
          "
        />
      ) : (
        <h1
          className="text-3xl font-semibold text-slate-900 cursor-text"
          onClick={() => setEditing(true)}
        >
          {value || "Project Name"}
        </h1>
      )}
    </div>
  );
}
