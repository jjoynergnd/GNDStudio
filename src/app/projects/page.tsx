"use client";

import Link from "next/link";
import { useProjects } from "../../context/ProjectContext";

export default function ProjectsListPage() {
  const { projects } = useProjects();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Projects</h1>

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-700 text-sm">
            <tr>
              <th className="px-4 py-2">Project Name</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>

          <tbody className="text-slate-800">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-t border-slate-200 hover:bg-slate-50 transition"
              >
                <td className="px-4 py-2 font-medium">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-emerald-600 hover:underline"
                  >
                    {project.name}
                  </Link>
                </td>
                <td className="px-4 py-2">{project.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
