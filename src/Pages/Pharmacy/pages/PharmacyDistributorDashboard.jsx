import { useState } from "react";

import PharmacyDistributorSidebar from "./PharmacyDistributorSidebar";
import PharmacyDistributorTopbar from "./PharmacyDistributorTopbar";

import PharmacyOverview from "./PharmacyOverview";
import PharmacyInventory from "./PharmacyInventory";
import PharmacyMedicineTraceability from "./PharmacyMedicineTraceability";
import PharmacyDispenseMedicine from "./PharmacyDispenseMedicine";
import PharmacyCitizenVerification from "./PharmacyCitizenVerification";
import PharmacyPMJAYClaims from "./PharmacyPMJAYClaims";
import PharmacyExpiryRecallAlerts from "./PharmacyExpiryRecallAlerts";
import PharmacyTransferHistory from "./PharmacyTransferHistory";

export default function PharmacyDistributorDashboard() {
  const [activeModule, setActiveModule] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case "overview":
        return <PharmacyOverview />;

      case "inventory":
        return <PharmacyInventory />;

      case "traceability":
        return <PharmacyMedicineTraceability />;

      case "dispense":
        return <PharmacyDispenseMedicine />;

      case "citizen-verification":
        return <PharmacyCitizenVerification />;

      case "pmjay-claims":
        return <PharmacyPMJAYClaims />;

      case "expiry-recall-alerts":
        return <PharmacyExpiryRecallAlerts />;

      case "transfer-history":
        return <PharmacyTransferHistory />;

      default:
        return <PharmacyOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PharmacyDistributorSidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <PharmacyDistributorTopbar
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