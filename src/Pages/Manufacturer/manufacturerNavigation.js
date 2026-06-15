import {
  LayoutDashboard,
  FileCheck,
  Pill,
  Boxes,
  ArrowLeftRight,
  History,
  ShieldAlert,
  MessageSquareWarning,
  Building2,
} from "lucide-react";

export const manufacturerNavigation = [
  {
    id: "overview",
    label: "Dashboard Overview",
    description: "Active licenses, batches, inventory and compliance summary",
    icon: LayoutDashboard,
  },
  {
    id: "licenses",
    label: "Licenses & Approvals",
    description: "View CDSCO-issued manufacturing licenses",
    icon: FileCheck,
  },
  {
    id: "batches",
    label: "Medicine Batch Management",
    description: "Create and manage medicine batches and lot numbers",
    icon: Pill,
  },
  {
    id: "inventory",
    label: "Inventory Management",
    description: "Monitor manufactured and available medicine stock",
    icon: Boxes,
  },
  {
    id: "transfer-stock",
    label: "Stock Transfer",
    description: "Transfer stock to Pharmacy / Distributor",
    icon: ArrowLeftRight,
  },
  {
    id: "transfer-history",
    label: "Transfer History",
    description: "View batch movement and ownership transfer records",
    icon: History,
  },
  {
    id: "compliance",
    label: "Recall & Compliance Alerts",
    description: "Track recalls, rejected transfers and license alerts",
    icon: ShieldAlert,
  },
  {
    id: "complaints",
    label: "Citizen Complaints",
    description: "Review complaints raised by citizens",
    icon: MessageSquareWarning,
  },

];