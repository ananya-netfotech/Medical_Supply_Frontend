import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BellRing,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Factory,
  FileWarning,
  Filter,
  Gavel,
  IndianRupee,
  MapPin,
  PackageSearch,
  RefreshCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Stethoscope,
  Truck,
  XCircle,
} from "lucide-react";

const complianceSummary = [
  {
    label: "Open Compliance Alerts",
    value: "37",
    detail: "11 high priority",
    tone: "rose",
    icon: ShieldAlert,
  },
  {
    label: "License Exceptions",
    value: "14",
    detail: "6 expired / 8 renewal due",
    tone: "amber",
    icon: Gavel,
  },
  {
    label: "Recall Watch",
    value: "5",
    detail: "2 acknowledgement pending",
    tone: "blue",
    icon: Siren,
  },
  {
    label: "PM-JAY Claim Flags",
    value: "21",
    detail: "duplicate / unusual claims",
    tone: "indigo",
    icon: IndianRupee,
  },
];

const complianceAlerts = [
  {
    alertId: "ALRT-CDSCO-001",
    category: "Drug Quality / Recall",
    regulation: "Drugs & Cosmetics Act / Schedule M / Recall Rapid Alert",
    entity: "BATCH003",
    entityType: "Medicine Batch",
    region: "Maharashtra",
    severity: "Critical",
    status: "Open",
    detected: "5/1/2024, 10:45 AM",
    owner: "CDSCO Quality Desk",
    finding:
      "Contamination detected during quality audit. Recall acknowledgement pending from two downstream pharmacies.",
    requiredAction:
      "Freeze affected batch movement, notify all current holders, issue recall closure only after stock reconciliation.",
  },
  {
    alertId: "ALRT-LIC-014",
    category: "Manufacturer Licensing",
    regulation: "Manufacturing License Validity / State Drug Control Review",
    entity: "Cipla Limited",
    entityType: "Manufacturer",
    region: "Maharashtra",
    severity: "High",
    status: "Under Review",
    detected: "4/28/2024, 2:20 PM",
    owner: "State Drug Licensing Cell",
    finding:
      "One manufacturer license has crossed validity date while related medicine units are still visible in supply chain movement.",
    requiredAction:
      "Review active manufacturing permissions, block new batch creation if license remains expired, and record licensing decision.",
  },
  {
    alertId: "ALRT-DIST-022",
    category: "Distribution / GDP",
    regulation: "Good Distribution Practices for Pharmaceutical Products",
    entity: "North India Pharma Distributors",
    entityType: "Pharmacy / Distributor",
    region: "Delhi",
    severity: "High",
    status: "Open",
    detected: "4/22/2024, 5:30 AM",
    owner: "Distribution Compliance Desk",
    finding:
      "Unusual transfer velocity detected between distributor and downstream pharmacy branch within short interval.",
    requiredAction:
      "Verify transfer documents, receiving branch acknowledgement, storage conditions, and batch ownership chain.",
  },
  {
    alertId: "ALRT-EXP-008",
    category: "Expired Medicine Stock",
    regulation: "Sale / Distribution Restriction for Expired Drugs",
    entity: "BATCH005",
    entityType: "Medicine Unit",
    region: "Uttar Pradesh",
    severity: "Critical",
    status: "Open",
    detected: "4/15/2024, 9:00 AM",
    owner: "State Drug Inspector",
    finding:
      "Expired medicine units remain tagged under pharmacy inventory and have not been removed from active dispensing pool.",
    requiredAction:
      "Mark units as non-dispensable, initiate pharmacy inspection workflow, and verify stock quarantine records.",
  },
  {
    alertId: "ALRT-PMJAY-031",
    category: "PM-JAY Claim Risk",
    regulation: "NHA / AB PM-JAY Anti-Fraud Monitoring",
    entity: "CLAIM-PMJAY-99999999",
    entityType: "Healthcare Claim",
    region: "Karnataka",
    severity: "Medium",
    status: "Pending Evidence",
    detected: "4/12/2024, 1:35 PM",
    owner: "PM-JAY Claims Review Cell",
    finding:
      "Claim submitted for medicine benefit with incomplete beneficiary and pharmacy linkage records.",
    requiredAction:
      "Verify beneficiary ID, pharmacy license, medicine dispense record, and duplicate claim indicators before approval.",
  },
  {
    alertId: "ALRT-TRACE-017",
    category: "Traceability / Barcode",
    regulation: "Barcode / QR Traceability under Drugs Rules, 1945 expansion",
    entity: "BATCH004",
    entityType: "Medicine Batch",
    region: "Gujarat",
    severity: "Medium",
    status: "Under Review",
    detected: "4/10/2024, 11:12 AM",
    owner: "Traceability Monitoring Cell",
    finding:
      "Batch transfer record is present, but package-level scan/QR verification is missing for one downstream movement.",
    requiredAction:
      "Request distributor scan logs, reconcile package-level identifiers, and mark gap resolved after validation.",
  },
  {
    alertId: "ALRT-PV-005",
    category: "Pharmacovigilance",
    regulation: "PvPI / Post-Marketing Safety Monitoring",
    entity: "Amoxicillin 500mg",
    entityType: "Drug Type",
    region: "Tamil Nadu",
    severity: "Medium",
    status: "Monitoring",
    detected: "4/8/2024, 4:10 PM",
    owner: "Post-Marketing Safety Cell",
    finding:
      "Repeated adverse reaction notes received from multiple pharmacy points for same drug type and nearby batches.",
    requiredAction:
      "Correlate batch numbers, verify ADR reports, review marketing authorization holder safety submissions.",
  },
];

const complianceChecklist = [
  {
    label: "Drugs & Cosmetics Act / Rules",
    score: 91,
    status: "Strong",
    icon: Gavel,
  },
  {
    label: "License Validity Monitoring",
    score: 84,
    status: "Watch",
    icon: ClipboardCheck,
  },
  {
    label: "Recall & Rapid Alert Readiness",
    score: 78,
    status: "Watch",
    icon: Siren,
  },
  {
    label: "Good Distribution Practices",
    score: 73,
    status: "Watch",
    icon: Truck,
  },
  {
    label: "PM-JAY Anti-Fraud Controls",
    score: 68,
    status: "Risk",
    icon: IndianRupee,
  },
  {
    label: "Post-Marketing Safety / PvPI",
    score: 82,
    status: "Watch",
    icon: Stethoscope,
  },
];

const stateRisk = [
  { state: "MH", critical: 2, high: 4, medium: 7 },
  { state: "UP", critical: 3, high: 3, medium: 6 },
  { state: "DL", critical: 1, high: 5, medium: 4 },
  { state: "KA", critical: 1, high: 2, medium: 8 },
  { state: "GJ", critical: 0, high: 3, medium: 7 },
  { state: "TN", critical: 0, high: 2, medium: 5 },
];

const categoryBreakdown = [
  { label: "Drug Quality", value: 9, width: 92, color: "bg-rose-500" },
  { label: "Licensing", value: 7, width: 72, color: "bg-amber-500" },
  { label: "Distribution", value: 6, width: 64, color: "bg-blue-500" },
  { label: "PM-JAY Claims", value: 8, width: 80, color: "bg-indigo-500" },
  { label: "Traceability", value: 5, width: 52, color: "bg-cyan-500" },
  { label: "Pharmacovigilance", value: 2, width: 28, color: "bg-emerald-500" },
];

const toneStyles = {
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    glow: "bg-rose-500/20",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    glow: "bg-amber-500/20",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    glow: "bg-blue-500/20",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    glow: "bg-indigo-500/20",
  },
};

export default function ComplianceAlerts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");

  const filteredAlerts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return complianceAlerts.filter((alert) => {
      const matchesSeverity =
        severityFilter === "All" || alert.severity === severityFilter;

      const matchesQuery =
        !query ||
        alert.alertId.toLowerCase().includes(query) ||
        alert.category.toLowerCase().includes(query) ||
        alert.regulation.toLowerCase().includes(query) ||
        alert.entity.toLowerCase().includes(query) ||
        alert.region.toLowerCase().includes(query) ||
        alert.status.toLowerCase().includes(query) ||
        alert.finding.toLowerCase().includes(query);

      return matchesSeverity && matchesQuery;
    });
  }, [searchTerm, severityFilter]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-1 py-2">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <ShieldAlert className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                Compliance Monitoring
              </h1>

              <p className="mt-2 max-w-3xl text-lg leading-7 text-slate-500">
                Monitor Indian drug regulatory compliance, licensing exceptions,
                recall readiness, traceability gaps, PM-JAY claim risks and audit
                escalation workflows.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">
            <BellRing className="h-4 w-4" />
            11 high-priority
          </div>
        </div>

        {/* Government compliance note */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                Government Regulatory View
              </p>
              <h2 className="mt-2 text-xl font-semibold text-blue-950">
                Built for CDSCO / State Drug Control operational oversight
              </h2>
              <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-600">
                This screen helps officials identify non-compliance across
                medicine quality, manufacturing license status, expired stock,
                batch recalls, distribution chain gaps, pharmacovigilance signals
                and PM-JAY claim anomalies. The goal is to prioritize action,
                not just display alerts.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
              Audit-ready queue
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {complianceSummary.map((item) => (
            <SummaryCard key={item.label} item={item} />
          ))}
        </section>

        {/* Visual analytics */}
        <section className="mb-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel title="Compliance readiness scorecard" icon={ClipboardCheck}>
            <div className="space-y-4">
              {complianceChecklist.map((item) => (
                <ChecklistRow key={item.label} item={item} />
              ))}
            </div>
          </Panel>

          <Panel title="Alert category distribution" icon={PackageSearch}>
            <div className="space-y-4">
              {categoryBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-blue-950">
                      {item.value}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.width}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section className="mb-6 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
          <Panel title="State-wise compliance risk" icon={MapPin}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stateRisk.map((item) => (
                <StateRiskCard key={item.state} item={item} />
              ))}
            </div>
          </Panel>

          <Panel title="Regulatory action priorities" icon={RefreshCcw}>
            <div className="space-y-3">
              <PriorityItem
                title="Freeze affected inventory"
                text="Stop movement of recalled or expired units until stock reconciliation is complete."
                icon={PackageSearch}
              />
              <PriorityItem
                title="Block non-compliant licenses"
                text="Prevent new batch creation when manufacturer license is expired, revoked or under review."
                icon={Factory}
              />
              <PriorityItem
                title="Escalate suspicious claims"
                text="Route duplicate or incomplete PM-JAY claims to manual review before approval."
                icon={IndianRupee}
              />
              <PriorityItem
                title="Maintain audit trail"
                text="Capture every approval, recall, revoke, release and claim decision with actor/time metadata."
                icon={Clock3}
              />
            </div>
          </Panel>
        </section>

        {/* Filters */}
        <section className="mb-5 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-md">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by alert, entity, regulation, region..."
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="mr-1 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
              <Filter className="h-4 w-4" />
              Severity
            </div>

            {["All", "Critical", "High", "Medium"].map((severity) => (
              <button
                key={severity}
                type="button"
                onClick={() => setSeverityFilter(severity)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  severityFilter === severity
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                {severity}
              </button>
            ))}
          </div>
        </section>

        {/* Alerts table */}
        <section className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1280px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100/80">
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Regulation / Control</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Detected</TableHead>
                  <TableHead>Action</TableHead>
                </tr>
              </thead>

              <tbody>
                {filteredAlerts.map((alert) => (
                  <tr
                    key={alert.alertId}
                    className="border-b border-slate-300 align-top transition last:border-b-0 hover:bg-blue-50/35"
                  >
                    <td className="px-5 py-5">
                      <span className="font-mono text-sm text-slate-500">
                        {alert.alertId}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <p className="text-base font-semibold text-slate-950">
                        {alert.category}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Owner: {alert.owner}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="max-w-[260px] text-sm leading-6 text-slate-600">
                        {alert.regulation}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-semibold text-slate-950">
                        {alert.entity}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {alert.entityType}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-base text-slate-600">
                      {alert.region}
                    </td>

                    <td className="px-5 py-5">
                      <SeverityBadge severity={alert.severity} />
                    </td>

                    <td className="px-5 py-5">
                      <StatusBadge status={alert.status} />
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-500">
                      {alert.detected}
                    </td>

                    <td className="px-5 py-5">
                      <button
                        type="button"
                        className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredAlerts.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-14 text-center text-slate-500"
                    >
                      No compliance alerts found for “{searchTerm}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed action queue */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {filteredAlerts.slice(0, 4).map((alert) => (
            <AlertDetailCard key={alert.alertId} alert={alert} />
          ))}
        </section>
      </div>
    </div>
  );
}

function SummaryCard({ item }) {
  const Icon = item.icon;
  const tone = toneStyles[item.tone];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div
        className={`pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full ${tone.glow} blur-2xl`}
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone.bg} ${tone.text} border ${tone.border}`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <AlertTriangle className={`h-5 w-5 ${tone.text}`} />
        </div>

        <p className="text-sm font-medium text-slate-500">{item.label}</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-blue-950">
          {item.value}
        </p>
        <p className="mt-2 text-sm text-slate-500">{item.detail}</p>
      </div>
    </div>
  );
}

function Panel({ title, icon: Icon, children }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-100/70 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-semibold text-blue-950">{title}</h3>
        </div>

        {children}
      </div>
    </section>
  );
}

function ChecklistRow({ item }) {
  const Icon = item.icon;
  const color =
    item.score >= 90
      ? "bg-emerald-500"
      : item.score >= 75
        ? "bg-blue-500"
        : item.score >= 65
          ? "bg-amber-500"
          : "bg-rose-500";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-blue-700">
            <Icon className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              {item.label}
            </p>
            <p className="text-xs text-slate-500">{item.status}</p>
          </div>
        </div>

        <span className="text-sm font-semibold text-blue-950">
          {item.score}%
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${item.score}%` }}
        />
      </div>
    </div>
  );
}

function StateRiskCard({ item }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-semibold text-blue-950 shadow-sm">
          {item.state}
        </span>
        <span className="text-xs font-semibold text-slate-500">
          {item.critical + item.high + item.medium} alerts
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <RiskMini label="Critical" value={item.critical} color="text-rose-700" />
        <RiskMini label="High" value={item.high} color="text-orange-700" />
        <RiskMini label="Medium" value={item.medium} color="text-amber-700" />
      </div>
    </div>
  );
}

function RiskMini({ label, value, color }) {
  return (
    <div className="rounded-xl bg-white px-2 py-2">
      <p className={`text-lg font-semibold ${color}`}>{value}</p>
      <p className="text-[10px] text-slate-400">{label}</p>
    </div>
  );
}

function PriorityItem({ title, text, icon: Icon }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const styles = {
    Critical: "bg-rose-100 text-rose-700 border-rose-300",
    High: "bg-orange-100 text-orange-700 border-orange-300",
    Medium: "bg-amber-100 text-amber-700 border-amber-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
        styles[severity] || "bg-slate-100 text-slate-700 border-slate-300"
      }`}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Open: "bg-rose-50 text-rose-700 border-rose-200",
    "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
    "Pending Evidence": "bg-amber-50 text-amber-700 border-amber-200",
    Monitoring: "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
        styles[status] || "bg-slate-100 text-slate-700 border-slate-300"
      }`}
    >
      {status}
    </span>
  );
}

function AlertDetailCard({ alert }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-slate-500">{alert.alertId}</p>
          <h3 className="mt-2 text-lg font-semibold text-blue-950">
            {alert.category}
          </h3>
        </div>

        <SeverityBadge severity={alert.severity} />
      </div>

      <div className="space-y-4">
        <DetailBlock title="Finding" text={alert.finding} />
        <DetailBlock title="Required Government Action" text={alert.requiredAction} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          Mark Reviewed
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
          <XCircle className="h-4 w-4" />
          Escalate
        </button>
      </div>
    </div>
  );
}

function DetailBlock({ title, text }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function TableHead({ children }) {
  return (
    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
      {children}
    </th>
  );
}