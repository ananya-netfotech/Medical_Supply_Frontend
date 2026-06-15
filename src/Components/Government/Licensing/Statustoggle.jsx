export default function StatusToggle({ checked, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-200 ${
          checked
            ? "border-green-300 bg-green-500"
            : "border-red-300 bg-red-500"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>

      <span
        className={`min-w-[52px] text-sm font-medium ${
          checked ? "text-green-700" : "text-red-700"
        }`}
      >
        {checked ? "Active" : "Revoked"}
      </span>
    </div>
  );
}