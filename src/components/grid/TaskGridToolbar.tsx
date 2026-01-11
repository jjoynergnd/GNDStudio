import React from 'react';

interface Props {
  onAddTask: () => void;
  onAddSubtask: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export const TaskGridToolbar: React.FC<Props> = ({
  onAddTask,
  onAddSubtask,
  onExpandAll,
  onCollapseAll,
}) => {
  return (
    <div className="flex gap-2 mb-4">
      <button onClick={onAddTask} className="btn bg-blue-500 text-white px-3 py-1 rounded">
        Add Task
      </button>
      <button onClick={onAddSubtask} className="btn bg-green-500 text-white px-3 py-1 rounded">
        Add Subtask
      </button>
      <button onClick={onExpandAll} className="btn bg-gray-200 px-3 py-1 rounded">
        Expand All
      </button>
      <button onClick={onCollapseAll} className="btn bg-gray-200 px-3 py-1 rounded">
        Collapse All
      </button>
    </div>
  );
};
