import TaskGridTanStack from "@/components/grid/TaskGridTanStack";
import { mockTasks } from "@/features/projects/mockData";

export default function NewProjectPage() {
  return (
    <div className="p-8 space-y-6">
      <input
        type="text"
        defaultValue="New Project"
        className="text-2xl font-semibold bg-transparent outline-none border-b border-gray-300 pb-1 w-full"
      />

      <TaskGridTanStack data={mockTasks} />
    </div>
  );
}
