import {
  AlertTriangle,
  BadgeIndianRupee,
  Boxes,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FileCheck2,
  FlaskConical,
  HeartHandshake,
  PackageSearch,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
  Siren,
  TrendingUp,
  UsersRound,
} from "lucide-react";

export const commandMetrics = [
  {
    label: "Drug Types",
    value: "128",
    subtext: "+12 registered this month",
    icon: FlaskConical,
    tone: "blue",
  },
  {
    label: "Active Licenses",
    value: "84",
    subtext: "6 expiring in 90 days",
    icon: FileCheck2,
    tone: "emerald",
  },
  {
    label: "Tracked Medicine Units",
    value: "42.6K",
    subtext: "96% complete ownership trail",
    icon: Boxes,
    tone: "indigo",
  },
  {
    label: "Open Alerts",
    value: "37",
    subtext: "11 high-priority cases",
    icon: ShieldAlert,
    tone: "rose",
  },
];

export const criticalQueue = [
  {
    title: "Recall acknowledgement pending",
    entity: "RECALL-0001 · UNIT-0008",
    severity: "Critical",
    owner: "CDSCO Quality Desk",
    time: "18 min ago",
    icon: Siren,
  },
  {
    title: "Expired medicine in active pharmacy inventory",
    entity: "UNIT-0001 · BATCH005",
    severity: "Critical",
    owner: "State Drug Inspector",
    time: "42 min ago",
    icon: AlertTriangle,
  },
  {
    title: "License expiry linked with active supply",
    entity: "LIC-SUN-AMX-001",
    severity: "High",
    owner: "Licensing Cell",
    time: "1 hr ago",
    icon: FileCheck2,
  },
  {
    title: "PM-JAY claim missing beneficiary linkage",
    entity: "CLAIM-PMJAY-99999999",
    severity: "Medium",
    owner: "Claims Review Cell",
    time: "3 hrs ago",
    icon: BadgeIndianRupee,
  },
];

export const supplyChainStages = [
  {
    label: "Drug Registered",
    value: 128,
    status: "Healthy",
    icon: FlaskConical,
  },
  {
    label: "Licensed Manufacturing",
    value: 84,
    status: "6 renewal due",
    icon: Factory,
  },
  {
    label: "Units Created",
    value: 42680,
    status: "Live tracking",
    icon: Boxes,
  },
  {
    label: "Distributor / Pharmacy",
    value: 246,
    status: "Participants",
    icon: Building2,
  },
  {
    label: "Claims / Benefits",
    value: 1890,
    status: "21 flagged",
    icon: BadgeIndianRupee,
  },
];

export const traceabilityTrend = [
  { month: "Jan", units: 18000, claims: 420, recalls: 2 },
  { month: "Feb", units: 24000, claims: 560, recalls: 4 },
  { month: "Mar", units: 31000, claims: 760, recalls: 3 },
  { month: "Apr", units: 38600, claims: 1180, recalls: 6 },
  { month: "May", units: 42680, claims: 1460, recalls: 5 },
  { month: "Jun", units: 45200, claims: 1890, recalls: 4 },
];

export const stateRisk = [
  { state: "MH", critical: 2, high: 4, medium: 7, score: 72 },
  { state: "UP", critical: 3, high: 3, medium: 6, score: 65 },
  { state: "DL", critical: 1, high: 5, medium: 4, score: 78 },
  { state: "KA", critical: 1, high: 2, medium: 8, score: 82 },
  { state: "GJ", critical: 0, high: 3, medium: 7, score: 85 },
  { state: "TN", critical: 0, high: 2, medium: 5, score: 88 },
  { state: "WB", critical: 1, high: 1, medium: 5, score: 81 },
  { state: "RJ", critical: 0, high: 2, medium: 4, score: 86 },
];

export const complianceControls = [
  {
    label: "Drug Quality / Recall",
    score: 91,
    openCases: 9,
    icon: ShieldCheck,
  },
  {
    label: "License Validity",
    score: 84,
    openCases: 7,
    icon: FileCheck2,
  },
  {
    label: "Distribution Traceability",
    score: 82,
    openCases: 5,
    icon: RefreshCcw,
  },
  {
    label: "PM-JAY Anti-Fraud",
    score: 68,
    openCases: 21,
    icon: BadgeIndianRupee,
  },
  {
    label: "Audit Readiness",
    score: 89,
    openCases: 4,
    icon: ClipboardCheck,
  },
];

export const schemeWatch = [
  {
    scheme: "Ayushman Bharat PM-JAY",
    coverage: "₹5,00,000",
    claims: 1240,
    pending: 21,
    flagged: 8,
    status: "Active",
  },
  {
    scheme: "CGHS",
    coverage: "₹2,00,000",
    claims: 650,
    pending: 6,
    flagged: 2,
    status: "Active",
  },
];

export const auditTimeline = [
  {
    title: "Cipla Limited audit scheduled",
    detail: "Manufacturing license and batch control review",
    date: "18 Jun 2026",
    status: "Scheduled",
    icon: Factory,
  },
  {
    title: "MedPlus Distributor verification",
    detail: "Transfer trail, expiry stock and branch ownership audit",
    date: "21 Jun 2026",
    status: "Pending",
    icon: Building2,
  },
  {
    title: "Recall reconciliation review",
    detail: "Stock freeze, pharmacy acknowledgement and release decision",
    date: "24 Jun 2026",
    status: "High Priority",
    icon: PackageSearch,
  },
  {
    title: "PM-JAY reimbursement audit",
    detail: "Beneficiary, pharmacy and dispense-record verification",
    date: "25 Jun 2026",
    status: "Scheduled",
    icon: BadgeIndianRupee,
  },
];

export const governanceScores = [
  {
    label: "Traceability Integrity",
    value: "96%",
    detail: "medicine units with complete ownership history",
    icon: CheckCircle2,
  },
  {
    label: "Recall Closure",
    value: "78%",
    detail: "cases reconciled with downstream holders",
    icon: Siren,
  },
  {
    label: "Audit Coverage",
    value: "89%",
    detail: "actions logged with actor and timestamp",
    icon: CalendarCheck,
  },
  {
    label: "Operational Momentum",
    value: "+18%",
    detail: "month-over-month verified unit movement",
    icon: TrendingUp,
  },
];

export const participantMix = [
  { label: "Manufacturers", value: 42 },
  { label: "Pharmacies", value: 138 },
  { label: "Distributors", value: 66 },
];

export const beneficiaryStats = {
  enrolled: "2.4M",
  activeClaims: "1,890",
  approvedClaims: "1,642",
  flaggedClaims: "21",
  totalCoverage: "₹186 Cr",
};