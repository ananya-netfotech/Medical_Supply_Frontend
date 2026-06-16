// ../../../Components/Government/AuditTrail/ChecklistRow.jsx

export default function ChecklistRow({ item }) {
  const color =
    item.completion >= 85
      ? "bg-green-500"
      : item.completion >= 75
        ? "bg-blue-500"
        : "bg-amber-500";

  return (
    <div className="rounded-md bg-gray-50 p-3">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
          <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">
            {item.description}
          </p>
        </div>
        <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
          {item.completion}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${item.completion}%` }}
        />
      </div>
    </div>
  );
}