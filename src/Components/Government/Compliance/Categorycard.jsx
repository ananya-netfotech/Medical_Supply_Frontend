export default function CategoryCard({ item }) {
  return (
    <div className={`flex flex-col rounded-md border ${item.bg} p-3 transition-colors hover:shadow-sm`}>
      <div className="mb-2 flex items-center justify-between">
        <span className={`text-sm font-semibold ${item.text}`}>
          {item.label}
        </span>
        <span className={`text-base font-bold ${item.text}`}>
          {item.value}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/70">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
          style={{ width: `${item.percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">
        {item.percent}% of total alerts
      </p>
    </div>
  );
}