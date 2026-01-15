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
  ArrowRight,
  ArrowLeft,
  Plus,
} from "lucide-react";

export default function FormattingRibbon({
  onIndent,
  onOutdent,
  onAddColumn,
}: {
  onIndent?: () => void;
  onOutdent?: () => void;
  onAddColumn?: () => void;
}) {
  return (
    <div className="w-full border-b bg-white/70 backdrop-blur-sm">
      <div className="flex items-center gap-8 px-3 py-1 text-gray-700">

        {/* Group: Font */}
        <RibbonGroup>
          <RibbonButton icon={<Type size={16} />} tooltip="Font options" />
          <RibbonButton icon={<Bold size={16} />} tooltip="Bold" />
          <RibbonButton icon={<Italic size={16} />} tooltip="Italic" />
          <RibbonButton icon={<Underline size={16} />} tooltip="Underline" />
        </RibbonGroup>

        {/* Group: Alignment */}
        <RibbonGroup>
          <RibbonButton icon={<AlignLeft size={16} />} tooltip="Align left" />
          <RibbonButton icon={<AlignCenter size={16} />} tooltip="Align center" />
          <RibbonButton icon={<AlignRight size={16} />} tooltip="Align right" />
        </RibbonGroup>

        {/* Group: Color */}
        <RibbonGroup>
          <RibbonButton icon={<Palette size={16} />} tooltip="Color" />
        </RibbonGroup>

        {/* Group: WBS */}
        <RibbonGroup>
          <RibbonButton
            icon={<ArrowRight size={16} />}
            tooltip="Indent"
            onClick={onIndent}
          />
          <RibbonButton
            icon={<ArrowLeft size={16} />}
            tooltip="Outdent"
            onClick={onOutdent}
          />
        </RibbonGroup>

        {/* Group: Add Column */}
        <RibbonGroup>
          <RibbonButton
            icon={
              <div className="flex items-center gap-1">
                <Plus size={16} />
                <span className="text-sm">Column</span>
              </div>
            }
            tooltip="Add Column"
            onClick={onAddColumn}
          />
        </RibbonGroup>

        {/* Group: More */}
        <RibbonGroup>
          <RibbonButton
            icon={
              <div className="flex items-center gap-1">
                <span className="text-sm">More</span>
                <ChevronDown size={14} />
              </div>
            }
            tooltip="More options"
          />
        </RibbonGroup>
      </div>
    </div>
  );
}

function RibbonGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-r pr-4 last:border-r-0 last:pr-0">
      {children}
    </div>
  );
}

function RibbonButton({
  icon,
  tooltip,
  onClick,
}: {
  icon: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-md px-2 py-1 hover:bg-gray-100 active:bg-gray-200 transition-colors"
      title={tooltip}
    >
      {icon}
    </button>
  );
}
