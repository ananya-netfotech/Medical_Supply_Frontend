import { useState } from "react";

import ManufacturerSidebar from "../ManufacturerSidebar";
import ManufacturerTopbar from "../ManufacturerTopbar";

import ManufacturerOverview from "./ManufacturerOverview";
import ManufacturerLicenses from "./ManufacturerLicenses";
import ManufacturerBatchManagement from "./ManufacturerBatchManagement";
import ManufacturerInventoryManagement from "./ManufacturerInventoryManagement";
import ManufacturerStockTransfer from "./ManufacturerStockTransfer";
import ManufacturerTransferHistory from "./ManufacturerTransferHistory";
import ManufacturerRecallCompliance from "./ManufacturerRecallCompliance";
import ManufacturerCitizenComplaints from "./ManufacturerCitizenComplaints";

export default function ManufacturerDashboard() {
  const [activeModule, setActiveModule] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case "overview":
        return <ManufacturerOverview />;

      case "licenses":
        return <ManufacturerLicenses />;

      case "batches":
        return <ManufacturerBatchManagement />;

      case "inventory":
        return <ManufacturerInventoryManagement />;

      case "transfer-stock":
        return <ManufacturerStockTransfer />;

      case "transfer-history":
        return <ManufacturerTransferHistory />;

      case "compliance":
        return <ManufacturerRecallCompliance />;

      case "complaints":
        return <ManufacturerCitizenComplaints />;

      default:
        return <ManufacturerOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ManufacturerSidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <ManufacturerTopbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeModule={activeModule}
      />

      <main className="pt-20 lg:pl-[310px]">
        <div className="p-4 lg:p-6">{renderActiveModule()}</div>
      </main>
    </div>
  );
}