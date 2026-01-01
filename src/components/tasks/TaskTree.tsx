"use client";

import { useProjects } from "../../context/ProjectContext";
import TaskRow from "./TaskRow";

type Props = {
  projectId: string;
};

export default function TaskTree({ projectId }: Props) {
  const { getProjectById, tasks } = useProjects();
  const project = getProjectById(projectId);

  if (!project) return null;

  const renderTask = (taskId: string, depth: number) => {
    const task = tasks[taskId];
    if (!task) return null;

    return (
      <div key={taskId}>
        <TaskRow task={task} depth={depth} />
        {task.childIds.map((childId) => renderTask(childId, depth + 1))}
      </div>
    );
  };

  return (
    <div>
      {project.rootTaskIds.map((taskId) => renderTask(taskId, 0))}
    </div>
  );
}
