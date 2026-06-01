export default function StatCard({ title, value, Icon }) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-black">{value}</h3>
        </div>

        <div className="rounded-xl bg-blue-100 p-3 text-blue-900">
          <Icon />
        </div>
      </div>
    </div>
  );
}