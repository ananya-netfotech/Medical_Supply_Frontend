import {
  BadgeIndianRupee,
  Boxes,
  History,
  LayoutDashboard,
  Pill,
  QrCode,
  ShieldAlert,
  UserCheck,
} from "lucide-react";

export const pharmacyDistributorNavigation = [
  {
    id: "overview",
    label: "Dashboard Overview",
    description: "Inventory, dispensing, claims and alerts summary",
    icon: LayoutDashboard,
  },
  {
    id: "inventory",
    label: "Inventory",
    description: "View received stock and available medicine batches",
    icon: Boxes,
  },
  {
    id: "traceability",
    label: "Medicine Traceability",
    description: "Track batch origin, ownership and movement history",
    icon: QrCode,
  },
  {
    id: "dispense",
    label: "Dispense Medicine",
    description: "Transfer medicine ownership to citizen",
    icon: Pill,
  },
  {
    id: "citizen-verification",
    label: "Citizen Verification",
    description: "Verify PM-JAY beneficiary and citizen identity",
    icon: UserCheck,
  },
  {
    id: "pmjay-claims",
    label: "PM-JAY Claims",
    description: "Submit and track Ayushman Bharat claim status",
    icon: BadgeIndianRupee,
  },
  {
    id: "expiry-recall-alerts",
    label: "Expiry / Recall Alerts",
    description: "Monitor expired, near-expiry and recalled stock",
    icon: ShieldAlert,
  },
  {
    id: "transfer-history",
    label: "Transfer History",
    description: "View received and dispensed stock movement records",
    icon: History,
  },
];