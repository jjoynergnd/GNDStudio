// @react-compiler-disable
/* eslint-disable react-hooks/incompatible-library */

"use client";

import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Image from "next/image";

import AddColumnModal from "@/components/modals/AddColumnModal";
import { taskColumns } from "./columns/taskColumns";
import DraggableRow from "./DraggableRow";
import { TaskRow } from "@/types/tasks";

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

  // Keep local rows in sync if parent data changes
  useEffect(() => {
    setRows(data);
  }, [data]);

  const table = useReactTable<TaskRow>({
    data: rows,
    columns: taskColumns as ColumnDef<TaskRow, unknown>[],
    getCoreRowModel: getCoreRowModel(),
  });

  // Better drag activation: click-and-hold / press-and-hold
  // Better drag activation: click-and-hold / press-and-hold
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // small movement required
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = rows.findIndex((r) => r.id === active.id);
    const newIndex = rows.findIndex((r) => r.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newData = arrayMove(rows, oldIndex, newIndex);
    setRows(newData);
    onReorder?.(newData);
  };

  return (
    <div className="space-y-4">
      {/* Ribbon */}
      <div className="flex items-center gap-6 border-b pb-2 text-sm font-medium text-gray-700">
        <span className="flex items-center gap-2 text-teal-600 border-b-2 border-teal-600 pb-1 cursor-pointer">
          <Image
            src="/list_view.svg"
            alt="List"
            width={16}
            height={16}
            className="opacity-100 drop-shadow-sm"
          />
          List
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <Image
            src="/board_view.svg"
            alt="Board"
            width={16}
            height={16}
            className="opacity-100 drop-shadow-sm"
          />
          Board
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <Image
            src="/dashboard_view.svg"
            alt="Dashboard"
            width={16}
            height={16}
            className="opacity-100 drop-shadow-sm"
          />
          Dashboard
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <Image
            src="/gantt_view.webp"
            alt="Gantt"
            width={16}
            height={16}
            className="opacity-100 drop-shadow-sm"
          />
          Gantt
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <Image
            src="/calendar_view.webp"
            alt="Calendar"
            width={16}
            height={16}
            className="opacity-100 drop-shadow-sm"
          />
          Calendar
        </span>

        <span className="flex items-center gap-1 hover:text-gray-900 cursor-pointer">
          <Image
            src="/more_views.svg"
            alt="Views"
            width={16}
            height={16}
            className="opacity-100 drop-shadow-sm"
          />
          Views
        </span>
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-auto max-h-[600px] p-0">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10 rounded-t-lg border-b border-gray-300">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="group">
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={[
                        "text-center px-3 py-2 text-sm font-semibold text-gray-800 border-b border-r last:border-r-0 whitespace-nowrap",
                        index === 0
                          ? "sticky left-0 bg-gray-100 z-20"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}

                  {/* ⭐ Sticky + Column */}
                  <th
                    className="sticky right-0 bg-gray-100 px-3 py-2 border-l cursor-pointer hover:bg-gray-200 z-20"
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
                    {row.getVisibleCells().map((cell, index) => (
                      <td
                        key={cell.id}
                        className={[
                          "px-3 py-2 text-sm text-gray-800 border-b border-r last:border-r-0 whitespace-nowrap",
                          index === 0
                            ? "sticky left-0 bg-white z-10"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}

                    {/* Empty sticky cell under + column */}
                    <td className="sticky right-0 bg-white border-l z-10"></td>
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
