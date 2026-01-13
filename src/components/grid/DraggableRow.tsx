"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Row } from "@tanstack/react-table";
import type { TaskRow } from "@/types/tasks";

interface DraggableRowProps {
  row: Row<TaskRow>;
  children: React.ReactNode;
}

export default function DraggableRow({ row, children }: DraggableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.original.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging ? 50 : undefined,
    position: "relative",
    background: isDragging ? "rgba(255,255,255,0.9)" : undefined,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="
        group
        select-none
        pointer-events-auto
        hover:bg-gray-50
      "
    >
      {children}
    </tr>
  );
}
