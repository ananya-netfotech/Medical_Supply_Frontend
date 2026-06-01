export default function InfoCard({ Icon, title, description }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-900">
        <Icon size={26} />
      </div>

      <h3 className="text-xl font-black text-slate-900">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </div>
  );
}