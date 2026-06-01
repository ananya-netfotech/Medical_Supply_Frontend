export default function Footer() {
  return (
    <footer className="bg-blue-950 py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 md:flex-row md:items-center">
        <div>
          <h3 className="text-2xl font-black">TraceCare Bharat</h3>
          <p className="mt-2 text-blue-200">
            National Pharmaceutical Traceability & Ayushman Bharat Enablement
            Platform
          </p>
        </div>

        <p className="text-sm text-blue-200">
          Designed for India-focused healthcare, pharmaceutical traceability and
          benefit governance workflows.
        </p>
      </div>
    </footer>
  );
}