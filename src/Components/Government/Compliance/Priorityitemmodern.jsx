export default function PriorityItemModern({ title, text, icon: Icon, urgency }) {
  const urgencyColors = {
    high: "border-l-4 border-l-rose-400 bg-rose-50/40",
    medium: "border-l-4 border-l-amber-400 bg-amber-50/40",
    low: "border-l-4 border-l-blue-400 bg-blue-50/40",
  };

  return (
    <div className={`rounded-md p-3 ${urgencyColors[urgency]}`}>
      <div className="flex gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white shadow-sm border border-gray-200">
          <Icon className="h-3.5 w-3.5 text-gray-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">{title}</p>
          <p className="mt-0.5 text-xs text-gray-500">{text}</p>
        </div>
      </div>
    </div>
  );
}