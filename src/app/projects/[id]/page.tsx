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

      {/* Ribbon */}
      <div className="flex items-center space-x-4 bg-slate-50 border border-slate-200 rounded px-4 py-2 text-slate-700 text-sm">

        {/* Bold */}
        <button className="px-2 py-1 hover:bg-slate-200 rounded font-bold">
          B
        </button>

        {/* Italic */}
        <button className="px-2 py-1 hover:bg-slate-200 rounded italic">
          I
        </button>

        {/* Underline */}
        <button className="px-2 py-1 hover:bg-slate-200 rounded underline">
          U
        </button>

        {/* Font Size */}
        <select className="px-2 py-1 border border-slate-300 rounded">
          <option>12</option>
          <option>14</option>
          <option>16</option>
          <option>18</option>
        </select>

        {/* Row Height */}
        <button className="px-2 py-1 hover:bg-slate-200 rounded">
          ⇅
        </button>

        {/* Column Width */}
        <button className="px-2 py-1 hover:bg-slate-200 rounded">
          ⇆
        </button>

        {/* Add Row */}
        <button className="px-2 py-1 hover:bg-slate-200 rounded">
          + Row
        </button>

        {/* Add Column */}
        <button className="px-2 py-1 hover:bg-slate-200 rounded">
          + Col
        </button>

        {/* Paint Can (Pastel Palette) */}
        <button className="px-2 py-1 hover:bg-slate-200 rounded">
          🎨
        </button>
      </div>

      {/* Column Header Bar */}
      <div className="grid grid-cols-[80px_1fr_200px_150px_120px] bg-slate-50 border border-slate-200 rounded text-sm font-medium text-slate-700">
        <div className="px-4 py-2 border-r border-slate-200">ID</div>
        <div className="px-4 py-2 border-r border-slate-200">Task</div>
        <div className="px-4 py-2 border-r border-slate-200">Resource</div>
        <div className="px-4 py-2 border-r border-slate-200">Status</div>
        <div className="px-4 py-2">%</div>
      </div>

      {/* Task Grid */}
      <div className="border border-slate-200 rounded-lg divide-y divide-slate-200">
        <TaskTree projectId={project.id} />
      </div>
    </div>
  );
}
