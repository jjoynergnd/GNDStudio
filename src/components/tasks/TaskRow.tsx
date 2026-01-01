"use client";

import { useState } from "react";
import { Task, useProjects } from "../../context/ProjectContext";

type Props = {
  task: Task;
  depth: number;
};

export default function TaskRow({ task, depth }: Props) {
  const { indentTask, outdentTask } = useProjects();
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="flex items-center px-4 py-2 text-sm hover:bg-slate-50"
      style={{ paddingLeft: depth * 24 }}
    >
      {/* Expand / Collapse */}
      {task.childIds.length > 0 ? (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mr-2 text-slate-500 hover:text-slate-700"
        >
          {expanded ? "▾" : "▸"}
        </button>
      ) : (
        <span className="w-4 mr-2" />
      )}

      {/* Indent / Outdent */}
      <div className="flex items-center space-x-1 text-slate-400 mr-4">
        <button
          onClick={() => outdentTask(task.id)}
          className="hover:text-slate-700"
        >
          &lt;
        </button>
        <span className="text-slate-300">|</span>
        <button
          onClick={() => indentTask(task.id)}
          className="hover:text-slate-700"
        >
          &gt;
        </button>
      </div>

      {/* WBS */}
      <div className="w-20 text-slate-700">{task.wbs}</div>

      {/* Task Name */}
      <input
        type="text"
        defaultValue={task.name}
        className="w-64 px-2 py-1 border border-transparent rounded hover:border-slate-300 focus:border-emerald-500 focus:outline-none"
      />

      {/* Resource */}
      <div className="w-40 text-slate-500">—</div>

      {/* Status */}
      <select
        defaultValue={task.status}
        className="w-32 px-2 py-1 border border-slate-300 rounded"
      >
        <option>Not Started</option>
        <option>In Progress</option>
        <option>Blocked</option>
        <option>Complete</option>
      </select>

      {/* % Complete */}
      <input
        type="number"
        defaultValue={task.percentComplete}
        className="w-24 ml-4 px-2 py-1 border border-slate-300 rounded"
      />
    </div>
  );
}
