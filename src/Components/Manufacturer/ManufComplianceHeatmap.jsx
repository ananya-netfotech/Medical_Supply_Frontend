const heatmap = [
  ["Licenses", "low", "low", "medium", "low", "low"],
  ["Batches", "low", "medium", "medium", "high", "low"],
  ["Inventory", "low", "low", "medium", "medium", "high"],
  ["Transfers", "low", "medium", "low", "medium", "high"],
  ["Complaints", "medium", "high", "medium", "low", "medium"],
  ["Recalls", "low", "medium", "high", "high", "medium"],
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function ManufComplianceHeatmap() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">
        Compliance Risk Heatmap
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Visual risk concentration across operational areas.
      </p>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[620px]">
          <div className="grid grid-cols-6 gap-3">
            <div />
            {days.map((day) => (
              <div key={day} className="text-center text-xs font-bold text-slate-500">
                {day}
              </div>
            ))}

            {heatmap.map(([area, ...levels]) => (
              <>
                <div key={`${area}-label`} className="text-sm font-semibold text-slate-700">
                  {area}
                </div>
                {levels.map((level, index) => (
                  <div
                    key={`${area}-${index}`}
                    className={`h-12 rounded-2xl ${getColor(level)}`}
                    title={`${area} ${days[index]}: ${level}`}
                  />
                ))}
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
        <Legend color="bg-emerald-100" label="Low" />
        <Legend color="bg-amber-200" label="Medium" />
        <Legend color="bg-rose-300" label="High" />
      </div>
    </div>
  );
}

function getColor(level) {
  const map = {
    low: "bg-emerald-100",
    medium: "bg-amber-200",
    high: "bg-rose-300",
  };
  return map[level];
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      {label}
    </span>
  );
}