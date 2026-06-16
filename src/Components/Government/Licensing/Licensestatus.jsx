export default function LicenseStatus({ status }) {
  const styles = {
    Expired: "border-orange-200 bg-orange-50 text-orange-700",
    Valid: "border-green-200 bg-green-50 text-green-700",
    Revoked: "border-red-200 bg-red-50 text-red-700",
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