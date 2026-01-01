"use client";

import { useParams } from "next/navigation";
import { useProjects } from "../../../context/ProjectContext";
import TaskTree from "../../../components/tasks/TaskTree";


export default function ProjectDetailPage() {
  const { id } = useParams();
  const { getProjectById } = useProjects();

  const project = getProjectById(id as string);

  if (!project) {
    return <div className="p-6">Project not found.</div>;
  }

  return (
    <div className="p-6 space-y-8">

      {/* Project Title */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          {project.name}
        </h1>
        {project.description && (
          <p className="text-slate-600 mt-1">{project.description}</p>
        )}
      </div>

      {/* View Switcher */}
      <div className="flex items-center space-x-6 border-b border-slate-200 pb-3 text-slate-600">
        <button className="font-medium text-emerald-600 border-b-2 border-emerald-600 pb-1">
          List
        </button>
        <button className="hover:text-slate-900">Board</button>
        <button className="hover:text-slate-900">Dashboard</button>
        <button className="hover:text-slate-900">Gantt</button>
        <button className="hover:text-slate-900">+ Views</button>
      </div>

      {/* Column Header Bar */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded px-4 py-2 text-sm font-medium text-slate-700">
        <div className="flex items-center space-x-8">
          <span className="w-20">ID</span>
          <span className="w-64">Task</span>
          <span className="w-40">Resource</span>
          <span className="w-32">Status</span>
          <span className="w-32">% Complete</span>
          <button className="text-emerald-600 hover:underline">+ Columns</button>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Task Grid Container */}
      <div className="border border-slate-200 rounded-lg">
        <div className="divide-y divide-slate-200">

          {/* Placeholder — TaskTree will go here */}
          <div className="p-4 text-slate-400 italic">
            <TaskTree projectId={project.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
