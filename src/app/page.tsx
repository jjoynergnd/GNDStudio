import ProjectTile from "../components/home/ProjectTile";
import MyPortfolioTile from "../components/home/tiles/MyPortfolioTile";
import { projects } from "../features/projects/mockData";

// Type for portfolio items
type Portfolio = {
  id: number;
  name: string;
};

export default function Home() {
  // Example portfolio data (empty for now)
  const portfolios: Portfolio[] = [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Your Workspace</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => {
          // Inject flipContent ONLY for the "My Portfolio" tile
          if (project.name === "My Portfolio") {
            return (
              <ProjectTile
                key={project.id}
                project={{
                  ...project,
                  flipContent: <MyPortfolioTile portfolios={portfolios} />,
                }}
              />
            );
          }

          // All other tiles unchanged
          return <ProjectTile key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
