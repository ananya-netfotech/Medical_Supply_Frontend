export default function OwnerBadge({ ownerType }) {
  const normalized = ownerType.toLowerCase();

  const styles = {
    pharmacy: "border-amber-200 bg-amber-50 text-amber-700",
    manufacturer: "border-green-200 bg-green-50 text-green-700",
    citizen: "border-blue-200 bg-blue-50 text-blue-700",
    distributor: "border-purple-200 bg-purple-50 text-purple-700",
    wholesaler: "border-indigo-200 bg-indigo-50 text-indigo-700",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold ${
        styles[normalized] || "border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      {ownerType}
    </span>
  );
}