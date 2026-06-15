// ../../../Components/Government/AuditTrail/Panel.jsx

export default function Panel({ title, icon: Icon, children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm flex flex-col ${className}`}>
      <div className="border-b border-blue-200 bg-blue-50 px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-600">
            <Icon className="h-4 w-4" />
          </div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="p-4 flex-1">{children}</div>
    </div>
  );
}