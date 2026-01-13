// @react-compiler-disable
/* eslint-disable react-hooks/incompatible-library */
"use client";

import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  VisibilityState,
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
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  // Keep local rows in sync if parent data changes
  useEffect(() => {
    setRows(data);
  }, [data]);

  const table = useReactTable<TaskRow>({
    data: rows,
    columns: taskColumns as ColumnDef<TaskRow, unknown>[],
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  // Better drag activation: small move for mouse, press-and-hold for touch
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
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
      {/* View ribbon */}
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

      {/* Columns visibility button + menu (aligned right, above grid) */}
      <div className="flex justify-end">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColumnMenu((prev) => !prev)}
            className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer"
          >
            Columns
            <span className="text-[10px]">▾</span>
          </button>

          {showColumnMenu && (
            <div className="absolute right-0 mt-2 w-52 rounded-lg border border-gray-200 bg-white shadow-lg text-xs text-gray-800 z-30">
              <div className="max-h-60 overflow-auto py-2">
                {table.getAllLeafColumns().map((column) => {
                  const columnId = column.id;
                  const header =
                    typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : columnId;

                  return (
                    <label
                      key={columnId}
                      className="flex items-center gap-2 px-3 py-1 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="h-3 w-3 cursor-pointer"
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                      />
                      <span className="truncate">{header}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid container */}
      <div className="relative border rounded-lg bg-white shadow-sm overflow-auto max-h-[600px] p-0">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-20 rounded-t-lg border-b border-gray-300">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="group">
                  {headerGroup.headers.map((header, index) => {
                    const canResize = header.column.getCanResize();
                    const isResizing = header.column.getIsResizing();

                    return (
                      <th
                        key={header.id}
                        className={[
                          "text-center px-3 py-2 text-sm font-semibold text-gray-800 border-b border-r last:border-r-0 whitespace-nowrap select-none cursor-pointer",
                          index === 0
                            ? "sticky left-0 bg-gray-100 z-30"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={{
                          position: header.column.getIsPinned()
                            ? "sticky"
                            : undefined,
                          width: header.getSize(),
                        }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-1">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          {canResize && (
                            <div
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              className={`w-1 h-6 ml-1 cursor-col-resize select-none ${
                                isResizing ? "bg-teal-500" : "bg-gray-300"
                              }`}
                            />
                          )}
                        </div>
                      </th>
                    );
                  })}
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
                          "px-3 py-2 text-sm text-gray-800 border-b border-r last:border-r-0 whitespace-nowrap cursor-pointer",
                          index === 0
                            ? "sticky left-0 bg-white z-10"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
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
