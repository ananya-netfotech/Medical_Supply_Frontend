import {
  Gavel,
  IndianRupee,
  ClipboardCheck,
  Siren,
  Truck,
  Stethoscope,
  ShieldAlert,
} from "lucide-react";

export const complianceSummary = [
  {
    label: "Open Compliance Alerts",
    value: "37",
    change: "+8%",
    trend: "up",
    detail: "11 high priority",
    tone: "rose",
    icon: ShieldAlert,
  },
  {
    label: "License Exceptions",
    value: "14",
    change: "+2",
    trend: "up",
    detail: "6 expired / 8 renewal due",
    tone: "amber",
    icon: Gavel,
  },
  {
    label: "Recall Watch",
    value: "5",
    change: "-1",
    trend: "down",
    detail: "2 acknowledgement pending",
    tone: "blue",
    icon: Siren,
  },
  {
    label: "PM-JAY Claim Flags",
    value: "21",
    change: "+5",
    trend: "up",
    detail: "duplicate / unusual claims",
    tone: "indigo",
    icon: IndianRupee,
  },
];

export const complianceAlerts = [
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

export const complianceChecklist = [
  {
    label: "Drugs & Cosmetics Act / Rules",
    score: 91,
    status: "Strong",
    icon: Gavel,
    trend: "+3%",
  },
  {
    label: "License Validity Monitoring",
    score: 84,
    status: "Watch",
    icon: ClipboardCheck,
    trend: "-2%",
  },
  {
    label: "Recall & Rapid Alert Readiness",
    score: 78,
    status: "Watch",
    icon: Siren,
    trend: "+1%",
  },
  {
    label: "Good Distribution Practices",
    score: 73,
    status: "Watch",
    icon: Truck,
    trend: "-4%",
  },
  {
    label: "PM-JAY Anti-Fraud Controls",
    score: 68,
    status: "Risk",
    icon: IndianRupee,
    trend: "-6%",
  },
  {
    label: "Post-Marketing Safety / PvPI",
    score: 82,
    status: "Watch",
    icon: Stethoscope,
    trend: "+2%",
  },
];

export const stateRisk = [
  { state: "MH", critical: 2, high: 4, medium: 7, score: 72 },
  { state: "UP", critical: 3, high: 3, medium: 6, score: 65 },
  { state: "DL", critical: 1, high: 5, medium: 4, score: 78 },
  { state: "KA", critical: 1, high: 2, medium: 8, score: 82 },
  { state: "GJ", critical: 0, high: 3, medium: 7, score: 85 },
  { state: "TN", critical: 0, high: 2, medium: 5, score: 88 },
];

export const categoryBreakdown = [
  {
    label: "Drug Quality",
    value: 9,
    percent: 92,
    color: "from-rose-400 to-rose-300",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
  {
    label: "Licensing",
    value: 7,
    percent: 72,
    color: "from-amber-400 to-amber-300",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  {
    label: "Distribution",
    value: 6,
    percent: 64,
    color: "from-blue-400 to-blue-300",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    label: "PM-JAY Claims",
    value: 8,
    percent: 80,
    color: "from-indigo-400 to-indigo-300",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
  },
  {
    label: "Traceability",
    value: 5,
    percent: 52,
    color: "from-cyan-400 to-cyan-300",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
  },
  {
    label: "Pharmacovigilance",
    value: 2,
    percent: 28,
    color: "from-emerald-400 to-emerald-300",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
];

export const recentActions = [
  {
    action: "License suspension issued",
    entity: "Sunrise Pharma",
    officer: "Dr. Mehta",
    time: "15 min ago",
    status: "completed",
  },
  {
    action: "Batch recall order sent",
    entity: "Amoxicillin 500mg",
    officer: "CDSCO Desk",
    time: "1 hr ago",
    status: "pending",
  },
  {
    action: "Inspection scheduled",
    entity: "Delhi Distributor",
    officer: "State Drug Cell",
    time: "3 hrs ago",
    status: "completed",
  },
  {
    action: "Claim flagged for review",
    entity: "PM-JAY #8821",
    officer: "Claims Cell",
    time: "5 hrs ago",
    status: "review",
  },
];

export const toneStyles = {
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    glow: "bg-rose-500/10",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    glow: "bg-amber-500/10",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    glow: "bg-blue-500/10",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    glow: "bg-indigo-500/10",
  },
};