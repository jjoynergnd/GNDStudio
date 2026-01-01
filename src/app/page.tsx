"use client";

import ProjectTile from "../components/home/ProjectTile";
import MyPortfolioTile from "../components/home/tiles/MyPortfolioTile";
import NewProjectTile from "../components/home/tiles/NewProjectTile";

import { projects as baseProjects } from "../features/projects/mockData";

type Portfolio = {
  id: number;
  name: string;
};

export default function Home() {
  const portfolios: Portfolio[] = [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Your Workspace</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {baseProjects.map((project) => {
          if (project.name === "My Portfolio") {
            return (
              <ProjectTile
                key={project.id}
                title={project.name}
                headerColor={project.headerColor}
              >
                <MyPortfolioTile portfolios={portfolios} />
              </ProjectTile>
            );
          }

          if (project.name === "New Project") {
            return (
              <ProjectTile
                key={project.id}
                title={project.name}
                headerColor={project.headerColor}
              >
                <NewProjectTile />
              </ProjectTile>
            );
          }

          return (
            <ProjectTile
              key={project.id}
              title={project.name}
              headerColor={project.headerColor}
            >
              <p className="text-slate-600">Coming soon…</p>
            </ProjectTile>
          );
        })}
      </div>
    </div>
  );
}
