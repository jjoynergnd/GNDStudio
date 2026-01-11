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
    <div className="border rounded-lg bg-white shadow-sm p-4 overflow-auto max-h-[600px]">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 sticky top-0 z-10 rounded-t-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="group">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left px-3 py-2 text-sm font-medium text-gray-600 border-b border-r last:border-r-0 group-hover:bg-gray-100 transition-colors"
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
  );
}
