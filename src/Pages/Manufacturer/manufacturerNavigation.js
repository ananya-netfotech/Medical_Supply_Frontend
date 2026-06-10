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

const manufacturerNavigation = [
  {
    title: "Dashboard Overview",
    icon: LayoutDashboard,
    path: "/dashboard/manufacturer",
  },

  {
    title: "Licenses & Approvals",
    icon: FileCheck,
    path: "/dashboard/manufacturer/licenses",
  },

  {
    title: "Medicine Batch Management",
    icon: Pill,
    path: "/dashboard/manufacturer/batches",
  },

  {
    title: "Inventory Management",
    icon: Boxes,
    path: "/dashboard/manufacturer/inventory",
  },

  {
    title: "Stock Transfer",
    icon: ArrowLeftRight,
    path: "/dashboard/manufacturer/transfer-stock",
  },

  {
    title: "Transfer History",
    icon: History,
    path: "/dashboard/manufacturer/transfer-history",
  },

  {
    title: "Recall & Compliance Alerts",
    icon: ShieldAlert,
    path: "/dashboard/manufacturer/compliance",
  },

  {
    title: "Citizen Complaints",
    icon: MessageSquareWarning,
    path: "/dashboard/manufacturer/complaints",
  },

  {
    title: "Manufacturer Profile",
    icon: Building2,
    path: "/dashboard/manufacturer/profile",
  },
];

export default manufacturerNavigation;