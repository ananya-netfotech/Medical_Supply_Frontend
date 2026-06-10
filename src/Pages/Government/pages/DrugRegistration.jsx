import { useMemo, useState } from "react";
import { Edit3, FlaskConical, Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import DrugRegistrationPopup from "../../../Components/Popups/Government/DrugRegistrationPopup";
import DrugEditPopup from "../../../Components/Popups/Government/DrugEditPopup"; // Create this component

const drugTypes = [
  {
    drugTypeId: "DRUG-AMX-500",
    name: "Amoxicillin 500mg",
    description: "Broad-spectrum penicillin antibiotic for bacterial infections",
    category: "Antibiotic",
    regulatoryCode: "CDSCO-AMX-500",
    status: "Active",
    created: "1/10/2024",
    createdBy: "CDSCO Drug Registry Admin",
  },
  {
    drugTypeId: "DRUG-MET-500",
    name: "Metformin 500mg",
    description: "First-line medication for type 2 diabetes management",
    category: "Antidiabetic",
    regulatoryCode: "CDSCO-MET-500",
    status: "Active",
    created: "1/10/2024",
    createdBy: "CDSCO Drug Registry Admin",
  },
  {
    drugTypeId: "DRUG-ATV-020",
    name: "Atorvastatin 20mg",
    description: "Statin medication for lowering cholesterol levels",
    category: "Cardiovascular",
    regulatoryCode: "CDSCO-ATV-020",
    status: "Active",
    created: "1/10/2024",
    createdBy: "CDSCO West Zone Officer",
  },
  {
    drugTypeId: "DRUG-PCM-500",
    name: "Paracetamol 500mg",
    description: "Analgesic and antipyretic for pain and fever relief",
    category: "Analgesic",
    regulatoryCode: "CDSCO-PCM-500",
    status: "Active",
    created: "1/10/2024",
    createdBy: "State Drug Control Admin",
  },
];

export default function DrugRegistration() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [drugs, setDrugs] = useState(drugTypes);
  const itemsPerPage = 10;

  const filteredDrugs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return drugs;

    return drugs.filter((drug) => {
      return (
        drug.drugTypeId.toLowerCase().includes(query) ||
        drug.name.toLowerCase().includes(query) ||
        drug.category.toLowerCase().includes(query) ||
        drug.regulatoryCode.toLowerCase().includes(query) ||
        drug.description.toLowerCase().includes(query) ||
        drug.createdBy.toLowerCase().includes(query)
      );
    });
  }, [drugs, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredDrugs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDrugs = filteredDrugs.slice(startIndex, endIndex);

  const handleDrugRegistration = (newDrug) => {
    setDrugs(prevDrugs => [newDrug, ...prevDrugs]);
    console.log("New drug registered successfully:", newDrug);
  };

  const handleEditClick = (drug) => {
    setSelectedDrug(drug);
    setIsEditPopupOpen(true);
  };

  const handleDrugUpdate = (updatedDrug) => {
    setDrugs(prevDrugs => 
      prevDrugs.map(drug => 
        drug.drugTypeId === updatedDrug.drugTypeId ? updatedDrug : drug
      )
    );
    console.log("Drug updated successfully:", updatedDrug);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top spacer */}
      <div className="h-16 lg:h-20" />
      
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-blue-200 pb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-50">
              <FlaskConical className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="whitespace-nowrap text-2xl font-semibold text-gray-900 lg:text-3xl">
                Medicine Registration Registry
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="inline-flex w-auto items-center justify-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="whitespace-nowrap">Register Medicine</span>
          </button>
        </div>

        {/* Description */}
        <p className="mb-6 text-base text-gray-600">
          Manage approved medicines, therapeutic categories, and regulatory approval records
        </p>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by registration no., medicine name, approval code, category, or registrar..."
              className="h-10 w-full rounded border border-blue-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Drug Registration No.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Medicine Name
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Therapeutic Use
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Drug Category
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Regulatory Approval Code
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Approval Status
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Registered On
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Registered By
                  </th>
                  <th className="border-b border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100 bg-white">
                {currentDrugs.map((drug, index) => (
                  <tr 
                    key={drug.drugTypeId} 
                    className="transition-colors hover:bg-blue-50/40"
                  >
                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm font-medium text-blue-700">
                        {drug.drugTypeId}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {drug.name}
                      </p>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {drug.description}
                      </p>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="inline-flex rounded-md bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                        {drug.category}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm text-gray-600">
                        {drug.regulatoryCode}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                        <span className="inline-flex rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                          {drug.status}
                        </span>
                      </div>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {drug.created}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="text-sm text-gray-700 whitespace-normal block">
                        {drug.createdBy}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleEditClick(drug)}
                        className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredDrugs.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-gray-300" />
                        <p>No drug types found for "<span className="font-medium text-gray-700">{searchTerm}</span>"</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer stats and pagination */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to{' '}
            <span className="font-medium text-gray-900">{Math.min(endIndex, filteredDrugs.length)}</span> of{' '}
            <span className="font-medium text-gray-900">{filteredDrugs.length}</span> entries
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`min-w-[32px] px-2 py-1.5 text-sm font-medium rounded border transition-colors ${
                      currentPage === pageNum
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="inline-flex items-center gap-1 rounded border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Registration Popup */}
      <DrugRegistrationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccess={handleDrugRegistration}
      />

      {/* Edit Popup */}
      <DrugEditPopup
        isOpen={isEditPopupOpen}
        onClose={() => {
          setIsEditPopupOpen(false);
          setSelectedDrug(null);
        }}
        drug={selectedDrug}
        onUpdate={handleDrugUpdate}
      />
    </div>
  );
}