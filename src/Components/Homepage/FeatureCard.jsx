export default function FeatureCard({ Icon, title, description }) {
  return (
    <div className="rounded-3xl border p-8 transition hover:shadow-lg">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-900">
        <Icon />
      </div>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>

      <p className="leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}