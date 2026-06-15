export default function TraceMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-md border border-gray-100 bg-gray-50 p-3">
      <div className="mb-2 flex items-center gap-2 text-blue-600">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}