// ../../../Components/Government/AuditTrail/DetailBlock.jsx

export default function DetailBlock({ title, text }) {
  return (
    <div className="rounded-md bg-gray-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {title}
      </p>
      <p className="mt-1 text-sm text-gray-700 break-words">{text}</p>
    </div>
  );
}