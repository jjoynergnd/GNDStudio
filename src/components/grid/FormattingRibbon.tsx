// File: src/components/grid/FormattingRibbon.tsx

"use client";

import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Type,
  ChevronDown,
} from "lucide-react";

export default function FormattingRibbon() {
  return (
    <div className="w-full border-b bg-white/70 backdrop-blur-sm">
      <div className="flex items-center gap-6 px-4 py-2 text-gray-700">

        {/* Group: Font */}
        <div className="flex items-center gap-2">
          <RibbonButton icon={<Type size={16} />} tooltip="Font options" />
          <RibbonButton icon={<Bold size={16} />} tooltip="Bold" />
          <RibbonButton icon={<Italic size={16} />} tooltip="Italic" />
          <RibbonButton icon={<Underline size={16} />} tooltip="Underline" />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300" />

        {/* Group: Alignment */}
        <div className="flex items-center gap-2">
          <RibbonButton icon={<AlignLeft size={16} />} tooltip="Align left" />
          <RibbonButton icon={<AlignCenter size={16} />} tooltip="Align center" />
          <RibbonButton icon={<AlignRight size={16} />} tooltip="Align right" />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300" />

        {/* Group: Color */}
        <div className="flex items-center gap-2">
          <RibbonButton icon={<Palette size={16} />} tooltip="Color" />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300" />

        {/* Group: More */}
        <div className="flex items-center gap-2">
          <RibbonButton
            icon={
              <div className="flex items-center gap-1">
                <span className="text-sm">More</span>
                <ChevronDown size={14} />
              </div>
            }
            tooltip="More options"
          />
        </div>
      </div>
    </div>
  );
}

function RibbonButton({
  icon,
  tooltip,
}: {
  icon: React.ReactNode;
  tooltip: string;
}) {
  return (
    <button
      className="flex items-center justify-center rounded-md px-2 py-1 hover:bg-gray-100 active:bg-gray-200 transition-colors"
      title={tooltip}
    >
      {icon}
    </button>
  );
}
