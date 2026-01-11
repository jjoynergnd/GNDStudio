import React, { useState } from 'react';
import TaskGridTanStack from '@/components/grid/TaskGridTanStack';
import { TaskGridToolbar } from '@/components/grid/TaskGridToolbar';
import { Task } from '@/types/tasks';
import { mockTasks } from '@/features/projects/mockData';

const ProjectPage: React.FC = () => {
  // ✅ Use plain Task[] only
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleAddTask = () => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      name: 'New Task',
      status: 'Not Started',
      subTasks: [],
      assignee: undefined,
      dueDate: undefined,
      priority: undefined,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleAddSubtask = () => {
    if (!tasks[0]) return;

    const subtask: Task = {
      id: `subtask-${Date.now()}`,
      name: 'New Subtask',
      status: 'Not Started',
      subTasks: [],
      assignee: undefined,
      dueDate: undefined,
      priority: undefined,
    };

    // Add subtask to first task's subTasks array
    const updatedTasks = [...tasks];
    updatedTasks[0].subTasks = [...(updatedTasks[0].subTasks ?? []), subtask];
    setTasks(updatedTasks);
  };

  const handleExpandAll = () => console.log('Expand all clicked');
  const handleCollapseAll = () => console.log('Collapse all clicked');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Tasks</h1>

      <TaskGridToolbar
        onAddTask={handleAddTask}
        onAddSubtask={handleAddSubtask}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      <TaskGridTanStack tasks={tasks} />
    </div>
  );
};

export default ProjectPage;
