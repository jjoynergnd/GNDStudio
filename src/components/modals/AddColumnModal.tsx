"use client";

import React from "react";

interface AddColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddColumnModal({ isOpen, onClose }: AddColumnModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[360px] p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-3">Add Column</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Column Name</label>
            <input
              type="text"
              className="w-full mt-1 border rounded px-2 py-1 outline-none"
              placeholder="Enter column name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Column Type</label>
            <select className="w-full mt-1 border rounded px-2 py-1 outline-none">
              <option>Text</option>
              <option>Number</option>
              <option>Date</option>
              <option>Status</option>
              <option>Checkbox</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded border text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-teal-600 text-white hover:bg-teal-700"
          >
            Add Column
          </button>
        </div>
      </div>
    </div>
  );
}
