import { createColumnHelper } from "@tanstack/react-table";
import { TreeTask } from "@/types/tasks";

const columnHelper = createColumnHelper<TreeTask>();

export const taskColumns = [
  columnHelper.accessor("wbs", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("task", {
    header: "Task",
    cell: ({ getValue }) => (
      <input
        className="w-full bg-transparent outline-none"
        defaultValue={getValue() as string}
      />
    ),
  }),

  columnHelper.accessor("resource", {
    header: "Resource",
    cell: ({ getValue }) => (
      <input
        className="w-full bg-transparent outline-none"
        defaultValue={getValue() as string}
      />
    ),
  }),

  // ✅ FIXED — dynamic status color + correct syntax
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => {
      const value = getValue() as string;

      const getColor = (v: string) =>
        v === "In Progress"
          ? "bg-yellow-100"
          : v === "Complete"
          ? "bg-green-100"
          : v === "Past Due"
          ? "bg-red-100"
          : "bg-white";

      return (
        <select
          defaultValue={value}
          className={`outline-none px-2 py-1 rounded ${getColor(value)}`}
          onChange={(e) => {
            const newValue = e.target.value;
            e.target.className = `outline-none px-2 py-1 rounded ${getColor(
              newValue
            )}`;
          }}
        >
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Complete</option>
          <option>Past Due</option>
        </select>
      );
    },
  }),

  columnHelper.accessor("start", {
    header: "Start",
    cell: ({ getValue }) => (
      <input
        type="date"
        className="bg-transparent outline-none"
        defaultValue={getValue() as string}
      />
    ),
  }),

  columnHelper.accessor("finish", {
    header: "Finish",
    cell: ({ getValue }) => (
      <input
        type="date"
        className="bg-transparent outline-none"
        defaultValue={getValue() as string}
      />
    ),
  }),

  columnHelper.accessor("percentComplete", {
    header: "% Complete",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return (
        <input
          type="number"
          min={0}
          max={100}
          className="w-16 bg-transparent outline-none"
          defaultValue={value}
        />
      );
    },
  }),
];
