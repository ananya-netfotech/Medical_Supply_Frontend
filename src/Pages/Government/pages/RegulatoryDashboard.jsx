import { useState } from "react";
import { Menu, Bell, Search, User, Settings, LogOut, Shield } from "lucide-react";

import RegulatorySidebar from "../RegulatorySidebar";
import RegulatoryTopbar from "../RegulatoryTopbar";

import GovernmentDashboard from "../GovernmentDashboard";

import DrugRegistration from "./DrugRegistration";
import ManufacturerLicensing from "./ManufacturerLicensing";
import PharmacyRegistry from "./PharmacyRegistry";
import MedicineUnits from "./MedicineUnits";
import MedicineTraceability from "./MedicineTraceability";
import BatchRecalls from "./BatchRecalls";
import HealthcareSchemes from "./HealthcareSchemes";
import ComplianceAlerts from "./ComplianceAlerts";
import AuditTrail from "./AuditTrail";

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

  const ActiveComponent = moduleComponents[activeModule] || GovernmentDashboard;

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