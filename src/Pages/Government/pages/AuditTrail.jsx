import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Eye,
  Factory,
  FileCheck2,
  Filter,
  Gavel,
  MapPin,
  PackageCheck,
  RefreshCcw,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const auditSummary = [
  {
    label: "Total Audit Events",
    value: "1,482",
    detail: "Across manufacturers, pharmacies, claims and batches",
    icon: Activity,
    tone: "blue",
  },
  {
    label: "Manufacturer Audits",
    value: "286",
    detail: "License, batch and GMP-related reviews",
    icon: Factory,
    tone: "emerald",
  },
  {
    label: "Pending Review",
    value: "34",
    detail: "Require regulatory officer action",
    icon: AlertTriangle,
    tone: "amber",
  },
  {
    label: "Critical Findings",
    value: "11",
    detail: "High-risk issues requiring escalation",
    icon: Gavel,
    tone: "rose",
  },
];

const manufacturerAuditScorecards = [
  {
    manufacturer: "Cipla Limited",
    location: "Mumbai Manufacturing Unit",
    licenseId: "LIC-MFG-CDSCO-2026-001",
    score: 92,
    status: "Compliant",
    lastAudit: "5/2/2024",
    nextAudit: "8/2/2024",
    findings: 2,
    risk: "Low",
  },
  {
    manufacturer: "Sun Pharmaceuticals Ltd.",
    location: "Ahmedabad Manufacturing Unit",
    licenseId: "LIC-MFG-CDSCO-2026-002",
    score: 78,
    status: "Observation",
    lastAudit: "4/25/2024",
    nextAudit: "7/25/2024",
    findings: 6,
    risk: "Medium",
  },
  {
    manufacturer: "Bharat Lifecare Manufacturing",
    location: "Hyderabad Unit II",
    licenseId: "LIC-MFG-CDSCO-2026-003",
    score: 64,
    status: "Action Required",
    lastAudit: "4/18/2024",
    nextAudit: "5/18/2024",
    findings: 11,
    risk: "High",
  },
];

const auditEvents = [
  {
    auditId: "AUD-MFG-0001",
    timestamp: "5/3/2024, 10:45 AM",
    actor: "Regulatory Admin",
    role: "CDSCO Officer",
    module: "Manufacturer Licensing",
    entity: "Cipla Limited",
    entityType: "Manufacturer",
    action: "License extension approved",
    auditType: "License Audit",
    severity: "Low",
    status: "Closed",
    region: "Maharashtra",
    ipAddress: "10.21.45.122",
    reference: "LIC-MFG-CDSCO-2026-001",
    remarks:
      "License validity reviewed with approved drug type mapping and active batch controls verified.",
  },
  {
    auditId: "AUD-BAT-0002",
    timestamp: "5/3/2024, 09:30 AM",
    actor: "State Drug Inspector",
    role: "State Authority",
    module: "Medicine Traceability",
    entity: "BATCH003",
    entityType: "Medicine Batch",
    action: "Batch ownership chain reviewed",
    auditType: "Traceability Audit",
    severity: "Medium",
    status: "Under Review",
    region: "Karnataka",
    ipAddress: "10.21.41.087",
    reference: "BATCH003",
    remarks:
      "Transfer history reviewed from manufacturer to pharmacy. Two downstream acknowledgements pending.",
  },
  {
    auditId: "AUD-REC-0003",
    timestamp: "5/2/2024, 04:12 PM",
    actor: "CDSCO Quality Desk",
    role: "Quality Reviewer",
    module: "Batch Recalls",
    entity: "RECALL-BATCH003",
    entityType: "Recall Notice",
    action: "Recall issued for contaminated batch",
    auditType: "Recall Audit",
    severity: "Critical",
    status: "Open",
    region: "Maharashtra",
    ipAddress: "10.21.42.011",
    reference: "RECALL-BATCH003",
    remarks:
      "Recall initiated due to contamination detected during quality audit. Stock quarantine verification required.",
  },
  {
    auditId: "AUD-PMJAY-0004",
    timestamp: "5/2/2024, 01:20 PM",
    actor: "PM-JAY Review Cell",
    role: "Claims Reviewer",
    module: "PM-JAY Claims",
    entity: "CLAIM-PMJAY-99999999",
    entityType: "Healthcare Claim",
    action: "Claim approved after manual verification",
    auditType: "Claim Audit",
    severity: "Low",
    status: "Closed",
    region: "Delhi",
    ipAddress: "10.21.49.220",
    reference: "CLAIM-PMJAY-99999999",
    remarks:
      "Beneficiary eligibility, pharmacy license and medicine dispense record verified before approval.",
  },
  {
    auditId: "AUD-CMP-0005",
    timestamp: "5/1/2024, 05:50 PM",
    actor: "Compliance Desk",
    role: "Regulatory Compliance",
    module: "Compliance Alerts",
    entity: "North India Pharma Distributors",
    entityType: "Distributor",
    action: "Suspicious transfer velocity flagged",
    auditType: "Distribution Audit",
    severity: "High",
    status: "Escalated",
    region: "Delhi",
    ipAddress: "10.21.44.077",
    reference: "ALRT-DIST-022",
    remarks:
      "Unusual transfer pattern detected between distributor and pharmacy. Supporting documents requested.",
  },
  {
    auditId: "AUD-MFG-0006",
    timestamp: "4/30/2024, 11:15 AM",
    actor: "Regulatory Admin",
    role: "CDSCO Officer",
    module: "Drug Registration",
    entity: "Atorvastatin 20mg",
    entityType: "Drug Type",
    action: "Drug type regulatory code updated",
    auditType: "Drug Registry Audit",
    severity: "Low",
    status: "Closed",
    region: "National",
    ipAddress: "10.21.45.122",
    reference: "CDSCO-ATV-020",
    remarks:
      "Regulatory metadata updated and linked manufacturer licenses revalidated.",
  },
  {
    auditId: "AUD-EXP-0007",
    timestamp: "4/29/2024, 03:35 PM",
    actor: "State Drug Inspector",
    role: "State Authority",
    module: "Compliance Alerts",
    entity: "BATCH005",
    entityType: "Medicine Unit",
    action: "Expired stock found in pharmacy inventory",
    auditType: "Expiry Audit",
    severity: "Critical",
    status: "Open",
    region: "Uttar Pradesh",
    ipAddress: "10.21.47.094",
    reference: "ALRT-EXP-008",
    remarks:
      "Expired medicine units still mapped to active pharmacy stock. Quarantine and inspection workflow required.",
  },
];

const auditChecklist = [
  {
    title: "Manufacturing license validity",
    description: "Verify active CDSCO/state license, expiry, renewal history and licensed drug type mapping.",
    completion: 94,
  },
  {
    title: "Batch creation controls",
    description: "Check batch number, lot number, expiry date, drug type approval and manufacturer authorization.",
    completion: 88,
  },
  {
    title: "Ownership transfer trail",
    description: "Confirm every movement has sender, receiver, timestamp, branch and authorized role validation.",
    completion: 82,
  },
  {
    title: "Recall response audit",
    description: "Validate recall issuance, pharmacy acknowledgement, stock freeze, quarantine and release closure.",
    completion: 76,
  },
  {
    title: "PM-JAY claim evidence",
    description: "Match claim with beneficiary, pharmacy license, medicine dispense record and scheme eligibility.",
    completion: 71,
  },
];

const monthlyAuditTrend = [
  { month: "Jan", audits: 180, findings: 24 },
  { month: "Feb", audits: 240, findings: 31 },
  { month: "Mar", audits: 310, findings: 42 },
  { month: "Apr", audits: 420, findings: 55 },
  { month: "May", audits: 332, findings: 34 },
];

const toneStyles = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
    glow: "bg-blue-500/20",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
    glow: "bg-emerald-500/20",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-100",
    glow: "bg-amber-500/20",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-100",
    glow: "bg-rose-500/20",
  },
};

export default function AuditTrail() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [auditTypeFilter, setAuditTypeFilter] = useState("All");

  const auditTypes = useMemo(() => {
    return ["All", ...new Set(auditEvents.map((event) => event.auditType))];
  }, []);

  const filteredAudits = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return auditEvents.filter((event) => {
      const matchesSeverity =
        severityFilter === "All" || event.severity === severityFilter;

      const matchesAuditType =
        auditTypeFilter === "All" || event.auditType === auditTypeFilter;

      const matchesQuery =
        !query ||
        event.auditId.toLowerCase().includes(query) ||
        event.actor.toLowerCase().includes(query) ||
        event.module.toLowerCase().includes(query) ||
        event.entity.toLowerCase().includes(query) ||
        event.region.toLowerCase().includes(query) ||
        event.reference.toLowerCase().includes(query) ||
        event.action.toLowerCase().includes(query);

      return matchesSeverity && matchesAuditType && matchesQuery;
    });
  }, [searchTerm, severityFilter, auditTypeFilter]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-1 py-2">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Activity className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                Audit Trail
              </h1>

              <p className="mt-2 max-w-4xl text-lg leading-7 text-slate-500">
                Continuous audit monitoring for manufacturers, medicine batches,
                licenses, transfers, recalls, PM-JAY claims and compliance actions.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            <Download className="h-4 w-4" />
            Export Audit Report
          </button>
        </div>

        {/* Gov purpose note */}
        <section className="mb-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                Regulatory Audit Control
              </p>
              <h2 className="mt-2 text-xl font-semibold text-blue-950">
                Manufacturer audit readiness and accountability monitoring
              </h2>
              <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-600">
                This audit page helps government officers review who performed
                each action, what entity was affected, when it happened, which
                manufacturer or batch was involved, and whether further
                regulatory action is required. It is useful for periodic
                manufacturer inspections, license reviews, recall verification,
                PM-JAY claim audits and compliance escalation.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
              Immutable log view
            </div>
          </div>
        </section>

        {/* Summary cards */}
        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {auditSummary.map((item) => (
            <SummaryCard key={item.label} item={item} />
          ))}
        </section>

        {/* Manufacturer scorecards */}
        <section className="mb-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-blue-950">
                Manufacturer Audit Scorecards
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Regular audit readiness view for licensed manufacturers.
              </p>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-3">
            {manufacturerAuditScorecards.map((manufacturer) => (
              <ManufacturerAuditCard
                key={manufacturer.licenseId}
                manufacturer={manufacturer}
              />
            ))}
          </div>
        </section>

        {/* Analytics */}
        <section className="mb-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <Panel title="Audit volume and findings trend" icon={RefreshCcw}>
            <AuditTrendChart data={monthlyAuditTrend} />
          </Panel>

          <Panel title="Manufacturer audit checklist" icon={ClipboardCheck}>
            <div className="space-y-4">
              {auditChecklist.map((item) => (
                <ChecklistRow key={item.title} item={item} />
              ))}
            </div>
          </Panel>
        </section>

        {/* Filters */}
        <section className="mb-5 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="w-full max-w-md">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by audit ID, actor, module, entity, region..."
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="mr-1 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                <Filter className="h-4 w-4" />
                Severity
              </div>

              {["All", "Critical", "High", "Medium", "Low"].map((severity) => (
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
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="mr-1 text-sm font-semibold text-slate-500">
              Audit Type
            </div>

            {auditTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setAuditTypeFilter(type)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  auditTypeFilter === type
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* Audit table */}
        <section className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1380px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100/80">
                  <TableHead>Audit ID</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Audit Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Action</TableHead>
                </tr>
              </thead>

              <tbody>
                {filteredAudits.map((event) => (
                  <tr
                    key={event.auditId}
                    className="border-b border-slate-300 align-top transition last:border-b-0 hover:bg-blue-50/35"
                  >
                    <td className="px-5 py-5">
                      <span className="font-mono text-sm text-slate-500">
                        {event.auditId}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-500">
                      {event.timestamp}
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-semibold text-slate-950">
                        {event.actor}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {event.role}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-semibold text-slate-950">
                        {event.module}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        IP: {event.ipAddress}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-semibold text-slate-950">
                        {event.entity}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {event.entityType}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-sm font-medium text-slate-600">
                      {event.auditType}
                    </td>

                    <td className="px-5 py-5">
                      <SeverityBadge severity={event.severity} />
                    </td>

                    <td className="px-5 py-5">
                      <StatusBadge status={event.status} />
                    </td>

                    <td className="px-5 py-5">
                      <div className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                        <MapPin className="h-4 w-4 text-blue-700" />
                        {event.region}
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredAudits.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-5 py-14 text-center text-slate-500"
                    >
                      No audit records found for “{searchTerm}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed audit records */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {filteredAudits.slice(0, 4).map((event) => (
            <AuditDetailCard key={event.auditId} event={event} />
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

function ManufacturerAuditCard({ manufacturer }) {
  const isHigh = manufacturer.risk === "High";
  const isMedium = manufacturer.risk === "Medium";

  const scoreColor =
    manufacturer.score >= 85
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : manufacturer.score >= 70
        ? "text-amber-700 bg-amber-50 border-amber-200"
        : "text-rose-700 bg-rose-50 border-rose-200";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-100 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Factory className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-950">
                {manufacturer.manufacturer}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                {manufacturer.location}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              isHigh
                ? "border-rose-300 bg-rose-100 text-rose-700"
                : isMedium
                  ? "border-amber-300 bg-amber-100 text-amber-700"
                  : "border-emerald-300 bg-emerald-100 text-emerald-700"
            }`}
          >
            {manufacturer.risk} Risk
          </span>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              Audit Score
            </p>
            <p className="mt-1 text-sm text-slate-500">{manufacturer.status}</p>
          </div>

          <div
            className={`rounded-2xl border px-4 py-2 text-2xl font-semibold ${scoreColor}`}
          >
            {manufacturer.score}%
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <AuditMeta label="License ID" value={manufacturer.licenseId} />
          <AuditMeta label="Last Audit" value={manufacturer.lastAudit} />
          <AuditMeta label="Next Audit" value={manufacturer.nextAudit} />
          <AuditMeta label="Open Findings" value={manufacturer.findings} />
        </div>
      </div>
    </div>
  );
}

function AuditMeta({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
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

function AuditTrendChart({ data }) {
  const max = Math.max(...data.flatMap((item) => [item.audits, item.findings]));

  return (
    <div>
      <div className="mb-5 flex items-center gap-5 text-xs font-semibold text-slate-500">
        <LegendDot color="bg-blue-600" label="Audit events" />
        <LegendDot color="bg-rose-500" label="Findings" />
      </div>

      <div className="flex h-72 items-end gap-4 rounded-3xl bg-slate-50 p-5">
        {data.map((item) => {
          const auditHeight = (item.audits / max) * 100;
          const findingHeight = (item.findings / max) * 100;

          return (
            <div key={item.month} className="flex flex-1 flex-col items-center">
              <div className="flex h-52 w-full items-end justify-center gap-1.5">
                <div
                  className="w-5 rounded-t-xl bg-gradient-to-t from-blue-700 to-blue-400"
                  style={{ height: `${auditHeight}%` }}
                />
                <div
                  className="w-5 rounded-t-xl bg-gradient-to-t from-rose-600 to-rose-300"
                  style={{ height: `${findingHeight}%` }}
                />
              </div>
              <p className="mt-3 text-xs font-semibold text-slate-500">
                {item.month}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChecklistRow({ item }) {
  const color =
    item.completion >= 85
      ? "bg-emerald-500"
      : item.completion >= 75
        ? "bg-blue-500"
        : "bg-amber-500";

  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-slate-900">{item.title}</h4>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {item.description}
          </p>
        </div>

        <span className="font-semibold text-blue-950">
          {item.completion}%
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-white">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${item.completion}%` }}
        />
      </div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const styles = {
    Critical: "bg-rose-100 text-rose-700 border-rose-300",
    High: "bg-orange-100 text-orange-700 border-orange-300",
    Medium: "bg-amber-100 text-amber-700 border-amber-300",
    Low: "bg-emerald-100 text-emerald-700 border-emerald-300",
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
    Closed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Open: "bg-rose-50 text-rose-700 border-rose-200",
    "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
    Escalated: "bg-orange-50 text-orange-700 border-orange-200",
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

function AuditDetailCard({ event }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-slate-500">{event.auditId}</p>
          <h3 className="mt-2 text-lg font-semibold text-blue-950">
            {event.action}
          </h3>
        </div>

        <SeverityBadge severity={event.severity} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <DetailBlock title="Reference" text={event.reference} />
        <DetailBlock title="Module" text={event.module} />
        <DetailBlock title="Actor" text={`${event.actor} · ${event.role}`} />
        <DetailBlock title="Region" text={event.region} />
      </div>

      <div className="mt-3">
        <DetailBlock title="Audit Remarks" text={event.remarks} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          Mark Verified
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          <FileCheck2 className="h-4 w-4" />
          Generate Report
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
          <UserCheck className="h-4 w-4" />
          Assign Officer
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

function LegendDot({ color, label }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function TableHead({ children }) {
  return (
    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
      {children}
    </th>
  );
}