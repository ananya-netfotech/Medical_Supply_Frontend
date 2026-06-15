// ../../../Components/Government/AuditTrail/SummaryCard.jsx

const toneStyles = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
  },
};

export default function SummaryCard({ item }) {
  const Icon = item.icon;
  const tone = toneStyles[item.tone];

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${tone.bg} ${tone.text} border ${tone.border}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="text-sm font-medium text-gray-500">{item.label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{item.value}</p>
      <p className="mt-1 text-xs text-gray-500">{item.detail}</p>
    </div>
  );
}