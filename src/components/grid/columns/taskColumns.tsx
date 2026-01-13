import { createColumnHelper } from "@tanstack/react-table";
import { TaskRow } from "@/types/tasks";

const columnHelper = createColumnHelper<TaskRow>();

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

  // ⭐ Start column
  columnHelper.accessor("start", {
    header: "Start",
    cell: ({ getValue }) => (
      <input
        type="date"
        className="bg-transparent outline-none min-w-[120px]"
        defaultValue={getValue() as string}
      />
    ),
  }),

  // ⭐ Finish column
  columnHelper.accessor("finish", {
    header: "Finish",
    cell: ({ getValue }) => (
      <input
        type="date"
        className="bg-transparent outline-none min-w-[120px]"
        defaultValue={getValue() as string}
      />
    ),
  }),

  // ⭐ Status column
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => {
      const value = (getValue() as string) ?? "Not Started";

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
          className={`rounded-full border px-3 py-1 inline-block min-w-[140px] ${getColor(
            value
          )}`}
        >
          <select
            defaultValue={value}
            className="outline-none bg-transparent w-full cursor-pointer text-black [&>option]:text-black"
            onChange={(e) => {
              const newValue = e.target.value;
              const parent = e.target.parentElement;
              if (parent) {
                parent.className = `rounded-full border px-3 py-1 inline-block min-w-[140px] ${getColor(
                  newValue
                )}`;
              }
            }}
          >
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Complete</option>
            <option>Past Due</option>
          </select>
        </div>
      );
    },
  }),

  columnHelper.accessor("percentComplete", {
    header: "% Complete",
    cell: ({ getValue }) => {
      const value = (getValue() as number) ?? 0;
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
