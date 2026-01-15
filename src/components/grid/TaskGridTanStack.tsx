// File: src/components/grid/TaskGridTanStack.tsx

// @react-compiler-disable
/* eslint-disable react-hooks/incompatible-library */
"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  KeyboardEvent,
  MouseEvent,
} from "react";
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
import FormattingRibbon from "@/components/grid/FormattingRibbon";

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

  // Selection state
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [lastSelectedRowId, setLastSelectedRowId] = useState<string | null>(
    null
  );

  useEffect(() => {
    setRows(data);
    setSelectedRowIds([]);
    setLastSelectedRowId(null);
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

  // DnD sensors – activation constrained so simple clicks don't start drag
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 150, tolerance: 5 },
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

  // Ordered row ids in current sort/order
  const getOrderedRowIds = useCallback(() => {
    return table.getRowModel().rows.map((r) => r.id as string);
  }, [table]);

  // Row click / selection handler
  const handleRowClick = useCallback(
    (event: MouseEvent, rowId: string) => {
      const target = event.target as HTMLElement;

      // Let interactive controls handle their own clicks
      if (
        target.closest(
          "input, textarea, [contenteditable='true'], select, button"
        )
      ) {
        return;
      }

      // Prevent random text selection / blue focus outlines on the grid itself
      event.preventDefault();

      const orderedIds = getOrderedRowIds();

      // Shift-click: select a continuous range
      if (event.shiftKey && lastSelectedRowId) {
        const startIndex = orderedIds.indexOf(lastSelectedRowId);
        const endIndex = orderedIds.indexOf(rowId);

        if (startIndex === -1 || endIndex === -1) {
          setSelectedRowIds([rowId]);
          setLastSelectedRowId(rowId);
          return;
        }

        const [from, to] =
          startIndex < endIndex
            ? [startIndex, endIndex]
            : [endIndex, startIndex];

        const rangeIds = orderedIds.slice(from, to + 1);
        const newSelection = Array.from(
          new Set([...selectedRowIds, ...rangeIds])
        );
        setSelectedRowIds(newSelection);
        return;
      }

      // Ctrl/Cmd-click: toggle individual row
      if (event.metaKey || event.ctrlKey) {
        setSelectedRowIds((prev) =>
          prev.includes(rowId)
            ? prev.filter((id) => id !== rowId)
            : [...prev, rowId]
        );
        setLastSelectedRowId(rowId);
        return;
      }

      // Regular click: single select
      setSelectedRowIds([rowId]);
      setLastSelectedRowId(rowId);
    },
    [getOrderedRowIds, lastSelectedRowId, selectedRowIds]
  );

  const getSelectedRowObjects = useCallback(() => {
    const idSet = new Set(selectedRowIds);
    return table.getRowModel().rows.filter((row) => idSet.has(row.id as string));
  }, [selectedRowIds, table]);

  // Placeholder WBS actions
  const handleIndent = useCallback(() => {
    const selected = getSelectedRowObjects();
    console.log("Indent selected rows (WBS logic coming soon)", selected);
  }, [getSelectedRowObjects]);

  const handleOutdent = useCallback(() => {
    const selected = getSelectedRowObjects();
    console.log("Outdent selected rows (WBS logic coming soon)", selected);
  }, [getSelectedRowObjects]);

  // Real actions for now: delete / duplicate
  const handleDeleteSelected = useCallback(() => {
    if (selectedRowIds.length === 0) return;
    setRows((prev) => prev.filter((row) => !selectedRowIds.includes(row.id)));
    setSelectedRowIds([]);
    setLastSelectedRowId(null);
  }, [selectedRowIds]);

  const handleDuplicateSelected = useCallback(() => {
    if (selectedRowIds.length === 0) return;
    const idSet = new Set(selectedRowIds);
    const selectedRows = rows.filter((row) => idSet.has(row.id));
    const duplicates = selectedRows.map((row) => ({
      ...row,
      id: `${row.id}-copy-${Date.now()}-${Math.random()
        .toString(16)
        .slice(2)}`,
    }));
    setRows((prev) => [...prev, ...duplicates]);
  }, [rows, selectedRowIds]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (selectedRowIds.length === 0) return;

      // Tab / Shift+Tab for indent/outdent
      if (event.key === "Tab") {
        event.preventDefault();
        if (event.shiftKey) {
          handleOutdent();
        } else {
          handleIndent();
        }
        return;
      }

      // Ctrl+] / Ctrl+[ for indent/outdent
      if (event.ctrlKey && event.key === "]") {
        event.preventDefault();
        handleIndent();
        return;
      }

      if (event.ctrlKey && event.key === "[") {
        event.preventDefault();
        handleOutdent();
        return;
      }

      // Delete: remove selected rows
      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        handleDeleteSelected();
        return;
      }

      // Ctrl+D: duplicate selected rows
      if (event.ctrlKey && (event.key === "d" || event.key === "D")) {
        event.preventDefault();
        handleDuplicateSelected();
        return;
      }
    },
    [
      selectedRowIds.length,
      handleIndent,
      handleOutdent,
      handleDeleteSelected,
      handleDuplicateSelected,
    ]
  );

  const hasSelection = selectedRowIds.length > 0;

  return (
    <div
      className="space-y-3 grid-container outline-none focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* View ribbon */}
      <div className="flex items-center gap-6 border-b pb-2 text-sm font-medium text-gray-700">
        <span className="flex items-center gap-2 text-teal-600 border-b-2 border-teal-600 pb-1 cursor-pointer">
          <Image src="/list_view.svg" alt="List" width={16} height={16} />
          List
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <Image src="/board_view.svg" alt="Board" width={16} height={16} />
          Board
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <Image
            src="/dashboard_view.svg"
            alt="Dashboard"
            width={16}
            height={16}
          />
          Dashboard
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <Image src="/gantt_view.webp" alt="Gantt" width={16} height={16} />
          Gantt
        </span>

        <span className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
          <Image
            src="/calendar_view.webp"
            alt="Calendar"
            width={16}
            height={16}
          />
          Calendar
        </span>

        <span className="flex items-center gap-1 hover:text-gray-900 cursor-pointer">
          <Image src="/more_views.svg" alt="Views" width={16} height={16} />
          Views
        </span>
      </div>

      {/* Formatting Ribbon */}
      <FormattingRibbon
        onIndent={hasSelection ? handleIndent : undefined}
        onOutdent={hasSelection ? handleOutdent : undefined}
        onAddColumn={() => setModalOpen(true)}
      />

      {/* Columns visibility button */}
      <div className="flex justify-end -mt-1">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColumnMenu((prev) => !prev)}
            className="inline-flex items-center gap-1 bg-transparent px-1 py-1 text-xs font-semibold tracking-wide text-gray-800 hover:text-gray-900 focus:outline-none cursor-pointer"
          >
            Columns <span className="text-[10px]">▾</span>
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

      {/* Grid */}
      <div className="relative border rounded-lg bg-white shadow-sm overflow-auto max-h-[600px] p-0">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-20 rounded-t-lg border-b border-gray-300 pointer-events-none">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {/* Drag handle header cell (sticky) */}
                  <th className="w-6 px-1 py-2 border-b border-r bg-gray-100 sticky left-0 z-30" />

                  {headerGroup.headers.map((header) => {
                    const canResize = header.column.getCanResize();
                    const isResizing = header.column.getIsResizing();

                    const baseClasses =
                      "text-center px-3 py-2 text-xs font-semibold text-gray-700 border-b border-r last:border-r-0 whitespace-nowrap select-none";

                    const className = baseClasses;

                    const style: React.CSSProperties = {
                      width: header.getSize(),
                    };

                    return (
                      <th key={header.id} className={className} style={style}>
                        <div className="flex items-center justify-between gap-2 pointer-events-auto">
                          <div className="flex-1 truncate">
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
              <tbody className="relative z-10">
                {table.getRowModel().rows.map((row, rowIndex) => {
                  const isSelected = selectedRowIds.includes(row.id as string);

                  return (
                    <DraggableRow
                      key={row.id}
                      row={row}
                      isSelected={isSelected}
                      isFirstRow={rowIndex === 0}
                      onClick={(e) => handleRowClick(e, row.id as string)}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const baseClasses =
                          "px-3 py-2 text-sm text-gray-800 border-b border-r last:border-r-0 whitespace-nowrap cursor-pointer";

                        const className = baseClasses;

                        const style: React.CSSProperties = {
                          width: cell.column.getSize(),
                        };

                        return (
                          <td key={cell.id} className={className} style={style}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </DraggableRow>
                  );
                })}
              </tbody>
            </SortableContext>
          </table>
        </DndContext>
      </div>

      <AddColumnModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
