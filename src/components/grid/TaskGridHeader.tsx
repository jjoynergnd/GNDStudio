export default function TaskGridHeader() {
  return (
    <div className="sticky top-0 z-20 grid grid-cols-[40px_80px_1fr_160px_140px_120px] border-b border-slate-300 bg-slate-50 text-xs font-semibold uppercase text-slate-600">
      <div className="px-2 py-2 border-r border-slate-200"></div>
      <div className="px-2 py-2 border-r border-slate-200">WBS</div>
      <div className="px-2 py-2 border-r border-slate-200">Task</div>
      <div className="px-2 py-2 border-r border-slate-200">Assignee</div>
      <div className="px-2 py-2 border-r border-slate-200">Status</div>
      <div className="px-2 py-2">%</div>
    </div>
  )
}
