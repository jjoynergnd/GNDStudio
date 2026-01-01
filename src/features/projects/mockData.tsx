import NewProjectTile from "../../components/home/tiles/NewProjectTile";

export const projects = [
  { id: 1, name: "My Portfolio", headerColor: "#f87171" },
  { id: 2, name: "My Projects", headerColor: "#34d399" },
  { id: 3, name: "My Work", headerColor: "#60a5fa" },
  { id: 4, name: "Templates", headerColor: "#facc15" },

  // Updated New Project tile
  {
    id: 5,
    name: "New Project",
    headerColor: "#f472b6",
    flipContent: <NewProjectTile />,
  },

  { id: 6, name: "Reports", headerColor: "#a78bfa" },
];
