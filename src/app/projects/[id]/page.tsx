"use client";

import React, { useState } from "react";
import TaskGridTanStack from "@/components/grid/TaskGridTanStack";
import { TaskGridToolbar } from "@/components/grid/TaskGridToolbar";
import { TreeTask } from "@/types/tasks";
import { mockTasks } from "@/features/projects/mockData";

const ProjectPage: React.FC = () => {
  // Store tasks as TreeTask[]
  const [tasks, setTasks] = useState<TreeTask[]>(mockTasks);

  const handleAddTask = () => {
    const newTask: TreeTask = {
      id: `task-${Date.now()}`,
      wbs: "",
      task: "New Task",
      resource: "",
      status: "Not Started",
      start: "",              // ✅ REQUIRED FIELD ADDED
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Tasks</h1>

      <TaskGridToolbar
        onAddTask={handleAddTask}
        onAddSubtask={handleAddSubtask}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      <TaskGridTanStack data={tasks} />
    </div>
  );
};

export default ProjectPage;
