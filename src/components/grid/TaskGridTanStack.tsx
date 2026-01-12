// @react-compiler-disable
/* eslint-disable react-hooks/incompatible-library */

"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

import { taskColumns } from "./columns/taskColumns";

export type TaskRow = Record<string, unknown>;

interface TaskGridTanStackProps {
  data: TaskRow[];
}

export default function TaskGridTanStack({ data }: TaskGridTanStackProps) {
  const table = useReactTable<TaskRow>({
    data,
    columns: taskColumns as ColumnDef<TaskRow, unknown>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">

      {/* Ribbon Menu */}
      <div className="flex items-center gap-6 border-b pb-2 text-sm font-medium">
        <span className="text-teal-600 border-b-2 border-teal-600 pb-1 cursor-pointer">
          List
        </span>
        <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
          Board
        </span>
        <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
          Dashboard
        </span>
        <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
          Gantt
        </span>
        <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
          Calendar
        </span>

        {/* Views Icon (now next to Calendar) */}
        <span className="flex items-center gap-1 text-gray-500 hover:text-gray-700 cursor-pointer">
          <img src="/Views_Icon.svg" className="w-4 h-4" alt="views icon" />
          View
        </span>
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-auto max-h-[600px] p-0">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10 rounded-t-lg border-b border-gray-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="group">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-center px-3 py-2 text-sm font-semibold text-gray-800 border-b border-r last:border-r-0 group-hover:bg-gray-200 transition-colors"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 group">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 py-2 text-sm text-gray-800 border-b border-r last:border-r-0 group-hover:bg-gray-100 transition-colors"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
