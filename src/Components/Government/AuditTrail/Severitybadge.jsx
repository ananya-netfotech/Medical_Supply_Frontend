// ../../../Components/Government/AuditTrail/SeverityBadge.jsx

export default function SeverityBadge({ severity }) {
  const styles = {
    Critical: "bg-rose-50 text-rose-700 border-rose-200",
    High: "bg-orange-50 text-orange-700 border-orange-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Low: "bg-green-50 text-green-700 border-green-200",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold ${
        styles[severity] || "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {severity}
    </span>
  );
}