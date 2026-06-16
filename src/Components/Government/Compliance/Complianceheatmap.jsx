function HeatCell({ value, type }) {
  const intensity =
    value >= 5 ? "strong" : value >= 3 ? "medium" : value >= 1 ? "light" : "empty";

  const styles = {
    critical: {
      strong: "bg-rose-600 text-white",
      medium: "bg-rose-200 text-rose-900",
      light: "bg-rose-50 text-rose-700",
      empty: "bg-gray-50 text-gray-400",
    },
    high: {
      strong: "bg-orange-500 text-white",
      medium: "bg-orange-200 text-orange-900",
      light: "bg-orange-50 text-orange-700",
      empty: "bg-gray-50 text-gray-400",
    },
    medium: {
      strong: "bg-amber-400 text-amber-950",
      medium: "bg-amber-200 text-amber-900",
      light: "bg-amber-50 text-amber-700",
      empty: "bg-gray-50 text-gray-400",
    },
  };

  return (
    <div className="px-2 py-2">
      <div className={`mx-auto flex h-10 w-full max-w-[110px] items-center justify-center rounded-md text-sm font-bold ${styles[type][intensity]}`}>
        {value}
      </div>
    </div>
  );
}

function ScoreCell({ score }) {
  const scoreStyle =
    score >= 85
      ? "bg-green-50 text-green-700 border-green-200"
      : score >= 75
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : score >= 65
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-rose-50 text-rose-700 border-rose-200";

  return (
    <div className="px-2 py-2">
      <div className={`mx-auto flex h-10 w-full max-w-[110px] items-center justify-center rounded-md border text-sm font-bold ${scoreStyle}`}>
        {score}%
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="text-xs">{label}</span>
    </span>
  );
}

export default function ComplianceHeatmap({ data }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[860px] overflow-hidden rounded-md border border-blue-200 bg-white">
        <div className="grid grid-cols-[120px_repeat(4,minmax(130px,1fr))] border-b border-blue-200 bg-blue-50 text-xs font-semibold uppercase tracking-wider text-blue-900">
          <div className="px-3 py-2.5">State</div>
          <div className="px-3 py-2.5 text-center">Critical</div>
          <div className="px-3 py-2.5 text-center">High</div>
          <div className="px-3 py-2.5 text-center">Medium</div>
          <div className="px-3 py-2.5 text-center">Score</div>
        </div>

        <div className="divide-y divide-blue-100">
          {data.map((item) => (
            <div
              key={item.state}
              className="grid grid-cols-[120px_repeat(4,minmax(130px,1fr))] items-center transition hover:bg-blue-50/40"
            >
              <div className="px-3 py-2.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-sm font-bold text-white">
                  {item.state}
                </span>
              </div>
              <HeatCell value={item.critical} type="critical" />
              <HeatCell value={item.high} type="high" />
              <HeatCell value={item.medium} type="medium" />
              <ScoreCell score={item.score} />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-blue-200 bg-blue-50 px-3 py-2 text-xs text-gray-600">
          <Legend color="bg-rose-500" label="Critical" />
          <Legend color="bg-orange-500" label="High" />
          <Legend color="bg-amber-400" label="Medium" />
          <Legend color="bg-blue-500" label="Compliance score" />
        </div>
      </div>
    </div>
  );
}