export default function StatusBadge({ status }) {
  const styles = {
    Completed: "border-green-200 bg-green-50 text-green-700",
    Pending: "border-amber-200 bg-amber-50 text-amber-700",
    Failed: "border-red-200 bg-red-50 text-red-700",
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