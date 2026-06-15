export default function ModernPanel({ title, icon: Icon, badge, tone = "blue", children }) {
  const styles = {
    blue: {
      header: "border-b border-blue-200 bg-blue-50",
      border: "border-blue-200",
      icon: "bg-blue-50 text-blue-600",
      badge: "bg-blue-50 text-blue-700 border border-blue-200",
      title: "text-gray-900",
    },
    emerald: {
      header: "border-b border-green-200 bg-green-50",
      border: "border-green-200",
      icon: "bg-green-50 text-green-600",
      badge: "bg-green-50 text-green-700 border border-green-200",
      title: "text-gray-900",
    },
    amber: {
      header: "border-b border-amber-200 bg-amber-50",
      border: "border-amber-200",
      icon: "bg-amber-50 text-amber-600",
      badge: "bg-amber-50 text-amber-700 border border-amber-200",
      title: "text-gray-900",
    },
    rose: {
      header: "border-b border-rose-200 bg-rose-50",
      border: "border-rose-200",
      icon: "bg-rose-50 text-rose-600",
      badge: "bg-rose-50 text-rose-700 border border-rose-200",
      title: "text-gray-900",
    },
    slate: {
      header: "border-b border-gray-200 bg-gray-50",
      border: "border-gray-200",
      icon: "bg-gray-50 text-gray-600",
      badge: "bg-gray-50 text-gray-600 border border-gray-200",
      title: "text-gray-900",
    },
  };

  const active = styles[tone] || styles.blue;

  return (
    <div className={`h-fit overflow-hidden rounded-lg border ${active.border} bg-white shadow-sm`}>
      <div className={`flex items-center justify-between gap-4 border-b ${active.header} px-4 py-3`}>
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-md ${active.icon}`}>
            <Icon className="h-4 w-4" />
          </div>
          <h3 className={`font-semibold ${active.title}`}>{title}</h3>
        </div>
        <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${active.badge}`}>
          {badge}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}