import TaskGridTanStack from "@/components/grid/TaskGridTanStack";
import { mockTasks } from "@/features/projects/mockData";

export default function NewProjectPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">New Project</h1>

      <TaskGridTanStack data={mockTasks} />
    </div>
  );
}
