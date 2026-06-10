import ManufacturerSidebar from "../ManufacturerSidebar";
import ManufacturerTopbar from "../ManufacturerTopbar";

export default function ManufacturerDashboard() {
  return (
    <div className="flex h-screen bg-slate-100">

      <ManufacturerSidebar />

      <div className="flex-1 flex flex-col">

        <ManufacturerTopbar />

        <main className="flex-1 overflow-y-auto p-8">

          <div className="grid md:grid-cols-4 gap-6">

            <DashboardCard
              title="Active Licenses"
              value="12"
            />

            <DashboardCard
              title="Medicine Batches"
              value="248"
            />

            <DashboardCard
              title="Inventory Units"
              value="1.2M"
            />

            <DashboardCard
              title="Compliance Alerts"
              value="3"
            />

          </div>

        </main>

      </div>

    </div>
  );
}

function DashboardCard({
  title,
  value,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>

    </div>
  );
}