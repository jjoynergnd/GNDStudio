// File: src/components/grid/DraggableRow.tsx

"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { TaskRow } from "@/types/tasks";

interface DraggableRowProps {
  row: Row<TaskRow>;
  children: React.ReactNode;
  isSelected: boolean;
  isFirstRow?: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function DraggableRow({
  row,
  children,
  isSelected,
  isFirstRow,
  onClick,
}: DraggableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      data-dragging={isDragging}
      data-selected={isSelected}
      onClick={onClick}
      className={[
        "cursor-pointer transition-colors",
        isSelected ? "bg-blue-50" : "bg-white hover:bg-gray-50",
        // Slight top border on first row helps avoid any visual overlap with header
        isFirstRow ? "border-t border-transparent" : "",
      ].join(" ")}
    >
      {/* Drag handle cell (sticky to the left) */}
      <td
        className="w-6 px-1 py-2 border-b border-r bg-white sticky left-0 z-30"
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
      >
        <GripVertical
          size={14}
          className="text-gray-500 hover:text-gray-700 cursor-grab active:cursor-grabbing"
        />
      </td>

      {/* Actual row cells */}
      {children}
    </tr>
  );
}
