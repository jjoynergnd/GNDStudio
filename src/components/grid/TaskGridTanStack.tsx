// @react-compiler-disable
/* eslint-disable react-hooks/incompatible-library */

"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  Row,
} from "@tanstack/react-table";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import AddColumnModal from "@/components/modals/AddColumnModal";
import { taskColumns } from "./columns/taskColumns";
import DraggableRow from "./DraggableRow";

export type TaskRow = {
  id: string;
  [key: string]: unknown;
};

interface TaskGridTanStackProps {
  data: TaskRow[];
  onReorder?: (newData: TaskRow[]) => void;
}

export default function TaskGridTanStack({
  data,
  onReorder,
}: TaskGridTanStackProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState<TaskRow[]>(data);

  const table = useReactTable<TaskRow>({
    data: rows,
    columns: taskColumns as ColumnDef<TaskRow, unknown>[],
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = rows.findIndex((r) => r.id === active.id);
    const newIndex = rows.findIndex((r) => r.id === over.id);

    const newData = arrayMove(rows, oldIndex, newIndex);
    setRows(newData);
    onReorder?.(newData);
  };

  return (
    <div className="space-y-4">
      {/* Ribbon */}
      <div className="flex items-center gap-6 border-b pb-2 text-sm font-medium text-gray-700">
        <span className="flex items-center gap-2 text-teal-600 border-b-2 border-teal-600 pb-1 cursor-pointer">
          <img
            src="/list_view.svg"
            alt="List"
            className="w-4 h-4 opacity-100 drop-shadow-sm"
          />
          List
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <img
            src="/board_view.svg"
            alt="Board"
            className="w-4 h-4 opacity-100 drop-shadow-sm"
          />
          Board
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <img
            src="/dashboard_view.svg"
            alt="Dashboard"
            className="w-4 h-4 opacity-100 drop-shadow-sm"
          />
          Dashboard
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <img
            src="/gantt_view.webp"
            alt="Gantt"
            className="w-4 h-4 opacity-100 drop-shadow-sm"
          />
          Gantt
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <img
            src="/calendar_view.webp"
            alt="Calendar"
            className="w-4 h-4 opacity-100 drop-shadow-sm"
          />
          Calendar
        </span>

        <span className="flex items-center gap-1 hover:text-gray-900 cursor-pointer">
          <img
            src="/more_views.svg"
            alt="Views"
            className="w-4 h-4 opacity-100 drop-shadow-sm"
          />
          Views
        </span>
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-auto max-h-[600px] p-0">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10 rounded-t-lg border-b border-gray-300">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="group">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-center px-3 py-2 text-sm font-semibold text-gray-800 border-b border-r last:border-r-0 whitespace-nowrap"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}

                  {/* ⭐ Sticky + Column */}
                  <th
                    className="sticky right-0 bg-gray-100 px-3 py-2 border-l cursor-pointer hover:bg-gray-200"
                    onClick={() => setModalOpen(true)}
                  >
                    +
                  </th>
                </tr>
              ))}
            </thead>

            <SortableContext
              items={rows.map((r) => r.id as string)}
              strategy={verticalListSortingStrategy}
            >
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-3 py-2 text-sm text-gray-800 border-b border-r last:border-r-0 whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}

                    {/* Empty sticky cell under + column */}
                    <td className="sticky right-0 bg-white border-l"></td>
                  </DraggableRow>
                ))}
              </tbody>
            </SortableContext>
          </table>
        </DndContext>
      </div>

      <AddColumnModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
