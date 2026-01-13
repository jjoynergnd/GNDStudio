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

      {/* Ribbon Menu — updated icons */}
      <div className="flex items-center gap-6 border-b pb-2 text-sm font-medium text-gray-700">

        <span className="flex items-center gap-2 text-teal-600 border-b-2 border-teal-600 pb-1 cursor-pointer">
          <img src="/list_view.svg" className="w-4 h-4 opacity-100 drop-shadow-sm" alt="List view" />
          List
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <img src="/board_view.svg" className="w-4 h-4 opacity-100 drop-shadow-sm" alt="Board view" />
          Board
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <img src="/dashboard_view.svg" className="w-4 h-4 opacity-100 drop-shadow-sm" alt="Dashboard view" />
          Dashboard
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <img src="/gantt_view.webp" className="w-4 h-4 opacity-100 drop-shadow-sm" alt="Gantt view" />
          Gantt
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <img src="/calendar_view.webp" className="w-4 h-4 opacity-100 drop-shadow-sm" alt="Calendar view" />
          Calendar
        </span>

        {/* New “More Views” icon */}
        <span className="flex items-center gap-1 hover:text-gray-900 cursor-pointer">
          <img src="/more_views.svg" className="w-4 h-4 opacity-100 drop-shadow-sm" alt="More views" />
          Views
        </span>
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-auto max-h-[600px] p-0">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10 rounded-t-lg border-b border-gray-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="group">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-center px-3 py-2 text-sm font-semibold text-gray-800 border-b border-r last:border-r-0 group-hover:bg-gray-200 transition-colors whitespace-nowrap"
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
                    className="px-3 py-2 text-sm text-gray-800 border-b border-r last:border-r-0 group-hover:bg-gray-100 transition-colors whitespace-nowrap"
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
