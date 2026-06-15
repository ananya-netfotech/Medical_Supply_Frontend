import { useMemo, useState } from "react";
import { Box, Plus } from "lucide-react";
import AddMedicineUnitPopup from "../../../Components/Popups/Government/AddMedicineUnitPopup";
import { medicineUnits as initialUnits } from "../../../Components/Government/MedicineUnits/Constants";
import MedicineUnitSearch from "../../../Components/Government/MedicineUnits/MedicineUnitSearch";
import MedicineUnitTable from "../../../Components/Government/MedicineUnits/MedicineUnitTable";
import MedicineUnitPagination from "../../../Components/Government/MedicineUnits/MedicineUnitPagination";
import TransferHistoryModal from "../../../Components/Government/MedicineUnits/TransferHistoryModal";

export default function MedicineUnits() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [units, setUnits] = useState(initialUnits);
  const itemsPerPage = 10;

  const filteredUnits = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return units;

    return units.filter((unit) => {
      return (
        unit.unitId.toLowerCase().includes(query) ||
        unit.drugTypeId.toLowerCase().includes(query) ||
        unit.manufacturerId.toLowerCase().includes(query) ||
        unit.licenseId.toLowerCase().includes(query) ||
        unit.status.toLowerCase().includes(query) ||
        unit.createdAt.toLowerCase().includes(query) ||
        unit.currentOwner.id.toLowerCase().includes(query) ||
        unit.currentOwner.type.toLowerCase().includes(query) ||
        unit.currentOwner.name.toLowerCase().includes(query) ||
        unit.batch.toLowerCase().includes(query) ||
        unit.transferHistory.some((entry) => {
          return (
            entry.from.toLowerCase().includes(query) ||
            entry.to.toLowerCase().includes(query) ||
            entry.timestamp.toLowerCase().includes(query) ||
            entry.txnId.toLowerCase().includes(query)
          );
        })
      );
    });
  }, [units, searchTerm]);

  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUnits = filteredUnits.slice(startIndex, endIndex);

  const handleAddMedicineUnit = (newUnit) => {
    setUnits((prevUnits) => [newUnit, ...prevUnits]);
    console.log("New medicine unit added:", newUnit);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top spacer */}
      <div className="pt-16 lg:pt-20" />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-blue-200 pb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-50">
              <Box className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="whitespace-nowrap text-2xl font-semibold text-gray-900 lg:text-3xl">
                Medicine Unit Registry
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="inline-flex w-auto items-center justify-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="whitespace-nowrap">Add Medicine Unit</span>
          </button>
        </div>

        {/* Description */}
        <p className="mb-6 text-base text-gray-600">
          Monitor registered medicine units with manufacturing approval,
          ownership, batch, and movement visibility
        </p>

        <MedicineUnitSearch
          searchTerm={searchTerm}
          filteredCount={filteredUnits.length}
          onSearch={handleSearch}
        />

        <MedicineUnitTable
          currentUnits={currentUnits}
          filteredCount={filteredUnits.length}
          searchTerm={searchTerm}
          onViewHistory={setSelectedHistory}
        />

        <MedicineUnitPagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalCount={filteredUnits.length}
          onPageChange={setCurrentPage}
        />
      </div>

      <AddMedicineUnitPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccess={handleAddMedicineUnit}
      />

      {selectedHistory && (
        <TransferHistoryModal
          unit={selectedHistory}
          onClose={() => setSelectedHistory(null)}
        />
      )}
    </div>
  );
}