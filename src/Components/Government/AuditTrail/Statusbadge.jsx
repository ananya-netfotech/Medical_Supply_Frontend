// ../../../Components/Government/AuditTrail/StatusBadge.jsx

export default function StatusBadge({ status }) {
  const styles = {
    Closed: "bg-green-50 text-green-700 border-green-200",
    Open: "bg-rose-50 text-rose-700 border-rose-200",
    "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
    Escalated: "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold ${
        styles[status] || "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}