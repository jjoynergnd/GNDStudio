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
          ? "bg-yellow-100 text-yellow-800 border-yellow-300"
          : v === "Complete"
          ? "bg-green-100 text-green-800 border-green-300"
          : v === "Past Due"
          ? "bg-red-100 text-red-800 border-red-300"
          : "bg-gray-100 text-gray-700 border-gray-300";

      return (
        <div
          className={`rounded-full border px-3 py-1 inline-block ${getColor(
            value
          )}`}
        >
          <select
            defaultValue={value}
            className="outline-none bg-transparent w-full cursor-pointer text-black"
            onChange={(e) => {
              const newValue = e.target.value;
              const parent = e.target.parentElement;
              if (parent) {
                parent.className = `rounded-full border px-3 py-1 inline-block ${getColor(
                  newValue
                )}`;
              }
            }}
          >
            <option className="text-black">Not Started</option>
            <option className="text-black">In Progress</option>
            <option className="text-black">Complete</option>
            <option className="text-black">Past Due</option>
          </select>
        </div>
      );
    },
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
