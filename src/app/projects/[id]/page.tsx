"use client";

import React, { useState } from "react";
import TaskGridTanStack from "@/components/grid/TaskGridTanStack";
import { TaskGridToolbar } from "@/components/grid/TaskGridToolbar";
import { TaskRow } from "@/types/tasks";
import { mockTasks } from "@/features/projects/mockData";

const ProjectPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskRow[]>(mockTasks);

  const handleAddTask = () => {
    const newTask: TaskRow = {
      id: `task-${Date.now()}`,
      wbs: "",
      task: "New Task",
      resource: "",
      status: "Not Started",
      start: "",
      finish: "",
      percentComplete: 0,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleAddSubtask = () => {
    console.log("Subtasks not implemented yet");
  };

  const handleExpandAll = () => console.log("Expand all clicked");
  const handleCollapseAll = () => console.log("Collapse all clicked");

  const handleReorder = (newData: TaskRow[]) => {
    setTasks(newData);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Tasks</h1>

      <TaskGridToolbar
        onAddTask={handleAddTask}
        onAddSubtask={handleAddSubtask}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      <TaskGridTanStack data={tasks} onReorder={handleReorder} />
    </div>
  );
};

export default ProjectPage;
