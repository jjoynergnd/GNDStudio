"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuid } from "uuid";

// -----------------------------
// Types
// -----------------------------

export type TaskStatus = "Not Started" | "In Progress" | "Blocked" | "Complete";

export type Task = {
  id: string;
  wbs: string;
  customId?: string;
  name: string;
  description?: string;
  resources: string[];
  status: TaskStatus;
  percentComplete: number;
  parentId?: string;
  childIds: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  rootTaskIds: string[];
  createdAt: Date;
  updatedAt: Date;
};

// -----------------------------
// Context Shape
// -----------------------------

type ProjectContextType = {
  projects: Project[];
  tasks: Record<string, Task>;
  createProject: (name: string, description?: string) => string;
  getProjectById: (id: string) => Project | undefined;
  getTasksForProject: (projectId: string) => Task[];
  addTask: (projectId: string, name: string, parentId?: string) => string;
  indentTask: (taskId: string) => void;
  outdentTask: (taskId: string) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// -----------------------------
// Provider
// -----------------------------

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Record<string, Task>>({});

  // -----------------------------
  // WBS Recalculation
  // -----------------------------
  const recalcWBS = (project: Project) => {
    const assignWBS = (taskId: string, prefix: string) => {
      const task = tasks[taskId];
      if (!task) return;

      task.wbs = prefix;

      task.childIds.forEach((childId, index) => {
        assignWBS(childId, `${prefix}.${index + 1}`);
      });
    };

    project.rootTaskIds.forEach((taskId, index) => {
      assignWBS(taskId, `${index + 1}`);
    });

    setTasks({ ...tasks });
  };

  // -----------------------------
  // Create Project
  // -----------------------------
  const createProject = (name: string, description?: string): string => {
    const id = uuid();

    const newProject: Project = {
      id,
      name,
      description,
      rootTaskIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProjects((prev) => [...prev, newProject]);
    return id;
  };

  // -----------------------------
  // Add Task
  // -----------------------------
  const addTask = (
    projectId: string,
    name: string,
    parentId?: string
  ): string => {
    const id = uuid();
    const project = projects.find((p) => p.id === projectId);
    if (!project) return id;

    const newTask: Task = {
      id,
      wbs: "",
      name,
      description: "",
      resources: [],
      status: "Not Started",
      percentComplete: 0,
      parentId,
      childIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add task immutably
    setTasks((prev) => ({
      ...prev,
      [id]: newTask,
    }));

    // Attach to parent or root
    if (parentId) {
      setTasks((prev) => ({
        ...prev,
        [parentId]: {
          ...prev[parentId],
          childIds: [...prev[parentId].childIds, id],
        },
      }));
    } else {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, rootTaskIds: [...p.rootTaskIds, id] }
            : p
        )
      );
    }

    // Recalc WBS
    const updatedProject = projects.find((p) => p.id === projectId);
    if (updatedProject) recalcWBS(updatedProject);

    return id;
  };

  // -----------------------------
  // Indent Task
  // -----------------------------
  const indentTask = (taskId: string) => {
    const task = tasks[taskId];
    if (!task) return;

    const parentId = task.parentId;

    const project = projects.find((p) =>
      p.rootTaskIds.includes(taskId) ||
      (parentId && p.rootTaskIds.includes(parentId))
    );
    if (!project) return;

    const siblings = parentId
      ? tasks[parentId].childIds
      : project.rootTaskIds;

    const index = siblings.indexOf(taskId);
    if (index <= 0) return; // cannot indent first item

    const newParentId = siblings[index - 1];

    // Remove from old parent/root
    if (parentId) {
      setTasks((prev) => ({
        ...prev,
        [parentId]: {
          ...prev[parentId],
          childIds: prev[parentId].childIds.filter((id) => id !== taskId),
        },
      }));
    } else {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id
            ? {
                ...p,
                rootTaskIds: p.rootTaskIds.filter((id) => id !== taskId),
              }
            : p
        )
      );
    }

    // Add to new parent
    setTasks((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], parentId: newParentId },
      [newParentId]: {
        ...prev[newParentId],
        childIds: [...prev[newParentId].childIds, taskId],
      },
    }));

    recalcWBS(project);
  };

  // -----------------------------
  // Outdent Task
  // -----------------------------
  const outdentTask = (taskId: string) => {
    const task = tasks[taskId];
    if (!task || !task.parentId) return;

    const parent = tasks[task.parentId];
    const grandParentId = parent.parentId;

    const project = projects.find((p) =>
      p.rootTaskIds.includes(parent.id)
    );
    if (!project) return;

    // Remove from parent
    setTasks((prev) => ({
      ...prev,
      [parent.id]: {
        ...prev[parent.id],
        childIds: prev[parent.id].childIds.filter((id) => id !== taskId),
      },
    }));

    if (grandParentId) {
      // Move under grandparent
      setTasks((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], parentId: grandParentId },
        [grandParentId]: {
          ...prev[grandParentId],
          childIds: [...prev[grandParentId].childIds, taskId],
        },
      }));
    } else {
      // Move to project root
      setTasks((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], parentId: undefined },
      }));

      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id
            ? { ...p, rootTaskIds: [...p.rootTaskIds, taskId] }
            : p
        )
      );
    }

    recalcWBS(project);
  };

  // -----------------------------
  // Helpers
  // -----------------------------
  const getProjectById = (id: string) =>
    projects.find((p) => p.id === id);

  const getTasksForProject = (projectId: string): Task[] => {
    const project = getProjectById(projectId);
    if (!project) return [];

    const collect = (taskId: string): Task[] => {
      const t = tasks[taskId];
      return [t, ...t.childIds.flatMap(collect)];
    };

    return project.rootTaskIds.flatMap(collect);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        tasks,
        createProject,
        getProjectById,
        getTasksForProject,
        addTask,
        indentTask,
        outdentTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

// -----------------------------
// Hook
// -----------------------------
export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used inside ProjectProvider");
  return ctx;
}
