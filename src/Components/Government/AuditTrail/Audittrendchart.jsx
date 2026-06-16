// ../../../Components/Government/AuditTrail/AuditTrendChart.jsx

export default function AuditTrendChart({ data }) {
  const max = Math.max(...data.flatMap((item) => [item.audits, item.findings]));

  return (
    <div className="h-full flex flex-col">
      <div className="mb-2 flex items-center gap-4 text-xs font-medium text-gray-500 flex-shrink-0">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
          Audit events
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          Findings
        </span>
      </div>

      <div className="flex-1 flex items-end gap-3 rounded-md bg-gray-50 p-3">
        {data.map((item) => {
          const auditHeight = (item.audits / max) * 100;
          const findingHeight = (item.findings / max) * 100;

          return (
            <div key={item.month} className="flex flex-1 flex-col items-center h-full justify-end">
              <div className="flex w-full items-end justify-center gap-1" style={{ height: "80%" }}>
                <div
                  className="w-4 rounded-t-md bg-blue-600 transition-all duration-300"
                  style={{ height: `${auditHeight}%` }}
                />
                <div
                  className="w-4 rounded-t-md bg-rose-500 transition-all duration-300"
                  style={{ height: `${findingHeight}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-medium text-gray-500 flex-shrink-0">
                {item.month}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}