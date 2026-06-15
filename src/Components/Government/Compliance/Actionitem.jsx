export default function ActionItem({ action }) {
  const statusStyles = {
    completed: "bg-green-50 text-green-700 border border-green-200",
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
    review: "bg-blue-50 text-blue-700 border border-blue-200",
  };

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50">
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">
          {action.action}
        </p>
        <p className="text-xs text-gray-500">
          {action.entity} • {action.officer}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">{action.time}</span>
        <span className={`rounded-md px-1.5 py-0.5 text-xs font-medium ${statusStyles[action.status]}`}>
          {action.status}
        </span>
      </div>
    </div>
  );
}