export default function StatusBadge({ status }) {
  const styles = {
    Active: "border-green-200 bg-green-50 text-green-700",
    Sold: "border-blue-200 bg-blue-50 text-blue-700",
    Expired: "border-orange-200 bg-orange-50 text-orange-700",
    Recalled: "border-red-200 bg-red-50 text-red-700",
    "In Transit": "border-purple-200 bg-purple-50 text-purple-700",
    Quarantined: "border-yellow-200 bg-yellow-50 text-yellow-700",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}