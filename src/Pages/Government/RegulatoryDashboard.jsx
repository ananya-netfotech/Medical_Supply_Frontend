import { useState } from "react";
import { Menu, Bell, Search, User, Settings, LogOut, Shield } from "lucide-react";

import RegulatorySidebar from "./RegulatorySidebar";
import RegulatoryTopbar from "./RegulatoryTopbar";

import GovernmentDashboard from "./GovernmentDashboard";
import DrugRegistration from "./pages/DrugRegistration";  
import ManufacturerLicensing from "./pages/ManufacturerLicensing";
import PharmacyRegistry from "./pages/PharmacyRegistry";
import MedicineUnits from "./pages/MedicineUnits";
import MedicineTraceability from "./pages/MedicineTraceability";
import BatchRecalls from "./pages/BatchRecalls";
import HealthcareSchemes from "./pages/HealthcareSchemes";
import ComplianceAlerts from "./pages/ComplianceAlerts";
import AuditTrail from "./pages/AuditTrail";



const moduleComponents = {
  overview: GovernmentDashboard,
  "drug-registration": DrugRegistration,
  licensing: ManufacturerLicensing,
  "pharmacy-registry": PharmacyRegistry,
  "medicine-units": MedicineUnits,
  traceability: MedicineTraceability,
  recalls: BatchRecalls,
  "healthcare-schemes": HealthcareSchemes,
  compliance: ComplianceAlerts,
  "audit-trail": AuditTrail,
};

export default function RegulatoryDashboard() {
  const [activeModule, setActiveModule] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ActiveComponent = moduleComponents[activeModule] || "GovernmentDashboard";

  return (
    <div className="min-h-screen bg-[#eef3f8]">
      {/* Sidebar */}
      <RegulatorySidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main content area */}
      <div className="min-h-screen lg:pl-[310px]">
        {/* Fixed Topbar */}
        <RegulatoryTopbar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeModule={activeModule}
        />

        {/* Main content with padding for fixed topbar */}
        <main className="pt-20 p-4 lg:p-5">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}