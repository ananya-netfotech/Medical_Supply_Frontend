import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";

import GovernmentDashboard from "./Pages/Government/GovernmentDashboard";
import RegulatoryDashboard from "./Pages/Government/pages/RegulatoryDashboard";

import ManufacturerDashboard from "./Pages/Manufacturer/pages/ManufacturerDashboard";
// import RegulatoryDashboard from "./pages/dashboards/RegulatoryDashboard";
// import ManufacturerDashboard from "./pages/dashboards/ManufacturerDashboard";
// import PharmacyDistributorDashboard from "./pages/dashboards/PharmacyDistributorDashboard";
// import HospitalDashboard from "./pages/dashboards/HospitalDashboard";
// import CitizenDashboard from "./pages/dashboards/CitizenDashboard";

// import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/Government" element={<GovernmentDashboard />} />
        <Route path="/RegulatoryDashboard" element={<RegulatoryDashboard />} />
        <Route path="/Manufacturer" element={<ManufacturerDashboard />} />


        {/* <Route */}
          {/* path="/dashboard/manufacturer" */}
          {/* element={<ManufacturerDashboard />} */}
        {/* /> */}

        {/* <Route */}
           {/* path="/dashboard/pharmacy-distributor" */}
          {/* element={<PharmacyDistributorDashboard />} */}
        {/* /> */}

        {/* <Route */}
          {/* path="/dashboard/hospital" */}
          {/* element={<HospitalDashboard />} */}
        {/* /> */}

        {/* <Route */}
          {/* path="/dashboard/citizen" */}
          {/* element={<CitizenDashboard />} */}
        {/* /> */}

        Optional redirect
        {/* <Route path="/dashboard" element={<Navigate to="/signin" replace />} /> */}

        {/* 404 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */} */
      </Routes>
    </BrowserRouter>
  );
}