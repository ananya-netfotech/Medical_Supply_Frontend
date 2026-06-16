import { useMemo, useState } from "react";

import { transfers, manufacturerTraceability } from "../../../Components/Government/Traceability/Constants";
import TraceabilityHeader from "../../../Components/Government/Traceability/Traceabilityheader";
import ManufacturerTraceCard from "../../../Components/Government/Traceability/Manufacturertracecard";
import TransferSearchBar from "../../../Components/Government/Traceability/Transfersearchbar";
import TransferTable from "../../../Components/Government/Traceability/Transfertable";
import TablePagination from "../../../Components/Government/Traceability/Tablepagination";

export default function MedicineTraceability() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransfers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return transfers;

    return transfers.filter((transfer) => {
      return (
        transfer.unitId.toLowerCase().includes(query) ||
        transfer.from.name.toLowerCase().includes(query) ||
        transfer.from.type.toLowerCase().includes(query) ||
        transfer.from.location.toLowerCase().includes(query) ||
        transfer.to.name.toLowerCase().includes(query) ||
        transfer.to.type.toLowerCase().includes(query) ||
        transfer.to.location.toLowerCase().includes(query) ||
        transfer.status.toLowerCase().includes(query) ||
        transfer.remarks.toLowerCase().includes(query) ||
        transfer.timestamp.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransfers = filteredTransfers.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top spacer */}
      <div className="pt-16 lg:pt-20" />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <TraceabilityHeader />

        {/* Description */}
        <p className="mb-6 text-base text-gray-600">
          Monitor medicine unit movement from manufacturer release to
          pharmacy holding and citizen dispensing
        </p>

        {/* Manufacturer traceability summary */}
        <div className="mb-8 grid gap-5 lg:grid-cols-3">
          {manufacturerTraceability.map((item) => (
            <ManufacturerTraceCard key={item.manufacturer} item={item} />
          ))}
        </div>

        {/* Search */}
        <TransferSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
        />

        {/* Transfer table */}
        <TransferTable
          currentTransfers={currentTransfers}
          filteredTransfers={filteredTransfers}
          searchTerm={searchTerm}
        />

        {/* Footer stats and pagination */}
        <TablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          filteredCount={filteredTransfers.length}
        />
      </div>
    </div>
  );
}