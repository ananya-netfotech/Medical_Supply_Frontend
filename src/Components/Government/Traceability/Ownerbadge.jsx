export default function OwnerBadge({ ownerType }) {
  const normalized = ownerType.toLowerCase();

  const styles = {
    pharmacy: "border-amber-200 bg-amber-50 text-amber-700",
    manufacturer: "border-green-200 bg-green-50 text-green-700",
    citizen: "border-blue-200 bg-blue-50 text-blue-700",
    system: "border-gray-200 bg-gray-50 text-gray-600",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${
        styles[normalized] || "border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      {ownerType}
    </span>
  );
}