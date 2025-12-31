import ProjectTile from "../components/home/ProjectTile";
import { projects } from "../features/projects/mockData";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Your Workspace</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectTile key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
