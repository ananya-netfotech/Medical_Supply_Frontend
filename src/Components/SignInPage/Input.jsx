export function Input({ label, placeholder, type = "text", accent }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:ring-4 ${accent.ring}`}
      />
    </label>
  );
}
