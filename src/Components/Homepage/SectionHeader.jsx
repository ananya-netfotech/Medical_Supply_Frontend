export default function SectionHeader({ eyebrow, title, description, center }) {
  return (
    <div className={center ? "mx-auto mb-14 max-w-3xl text-center" : "mb-12 max-w-3xl"}>
      {eyebrow && (
        <p className="mb-3 text-sm font-black uppercase tracking-wider text-blue-900">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl font-black leading-tight text-slate-950">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}