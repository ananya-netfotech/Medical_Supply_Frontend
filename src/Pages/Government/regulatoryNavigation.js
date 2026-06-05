import {
  Activity,
  AlertTriangle,
  Building2,
  ClipboardCheck,
  FileCheck2,
  LayoutDashboard,
  Pill,
  RefreshCcw,
  ShieldAlert,
  UserRoundCheck,
  Stethoscope,
  HeartPlus,
} from "lucide-react";

export const regulatoryNavigation = [
  {
    id: "overview",
    label: "Overview",
    description: "National platform summary",
    icon: LayoutDashboard,
  },
  {
    id: "drug-registration",
    label: "Drug Registration",
    description: "Add and manage drug types",
    icon: Pill,
  },
  {
    id: "licensing",
    label: "Licensing",
    description: "Issue, revoke, prolong licenses",
    icon: FileCheck2,
  },
  {
    id: "pharmacy-registry",
    label: "Participants",
    description: "Monitor pharmacies/distributors",
    icon: Building2,
  },
  {
    id: "medicine-units",
    label: "Medicine Units",
    description: "Monitor Medicine whereabouts and history",
    icon: Building2,
  },
  {
    id: "traceability",
    label: "Traceability",
    description: "Track batches and ownership",
    icon: RefreshCcw,
  },
  {
    id: "recalls",
    label: "Batch Recalls",
    description: "Recall or suspend batches",
    icon: ShieldAlert,
  },
 {
  id: "healthcare-schemes",
  label: "Healthcare Schemes",
  description: "Manage PM-JAY, CGHS and schemes",
  icon: HeartPlus,
},
//   {
//     id: "beneficiaries",
//     label: "Beneficiaries",
//     description: "Registered citizens/beneficiaries",
//     icon: UserRoundCheck,
//   },
//   {
//     id: "pmjay-claims",
//     label: "PM-JAY Claims",
//     description: "Monitor claim lifecycle",
//     icon: ClipboardCheck,
//   },
  {
    id: "compliance",
    label: "Compliance",
    description: "Expired, revoked, suspicious alerts",
    icon: AlertTriangle,
  },
  {
    id: "audit-trail",
    label: "Audit Trail",
    description: "Platform activity logs",
    icon: Activity,
  },
];