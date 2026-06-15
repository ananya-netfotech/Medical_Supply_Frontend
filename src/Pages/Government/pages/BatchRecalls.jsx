import { useMemo, useState } from "react";
import IssueRecallPopup from "../../../Components/Popups/Government/IssueRecallPopup";

import { recalls } from "../../../Components/Government/BatchRecalls/constants";
import RecallsHeader from "../../../Components/Government/BatchRecalls/RecallsHeader";
import RecallsSearchBar from "../../../Components/Government/BatchRecalls/RecallsSearchBar";
import RecallsTable from "../../../Components/Government/BatchRecalls/RecallsTable";
import TablePagination from "../../../Components/Government/BatchRecalls/TablePagination";

export default function BatchRecalls() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [recallsList, setRecallsList] = useState(recalls);
  const itemsPerPage = 10;

  const filteredRecalls = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return recallsList;

    return recallsList.filter((recall) => {
      return (
        recall.drugTypeId.toLowerCase().includes(query) ||
        recall.licenseId.toLowerCase().includes(query) ||
        recall.manufacturerId.toLowerCase().includes(query) ||
        recall.unitId.toLowerCase().includes(query) ||
        recall.recallId.toLowerCase().includes(query) ||
        recall.reason.toLowerCase().includes(query) ||
        recall.status.toLowerCase().includes(query) ||
        recall.timestamp.toLowerCase().includes(query)
      );
    });
  }, [recallsList, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredRecalls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecalls = filteredRecalls.slice(startIndex, endIndex);

  const handleIssueRecall = (newRecall) => {
    setRecallsList((prev) => [newRecall, ...prev]);
    console.log("New recall issued:", newRecall);
  };

  const handleReleaseRecall = (recallId) => {
    setRecallsList((prev) =>
      prev.map((recall) =>
        recall.recallId === recallId
          ? { ...recall, status: "Released" }
          : recall
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top spacer */}
      <div className="pt-16 lg:pt-20" />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RecallsHeader onIssueRecall={() => setIsPopupOpen(true)} />

        {/* Description */}
        <p className="mb-6 text-base text-gray-600">
          Issue, monitor, and release medicine recall actions for
          regulatory safety and pharmacy compliance
        </p>

        {/* Search */}
        <RecallsSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
        />

        {/* Table */}
        <RecallsTable
          currentRecalls={currentRecalls}
          filteredRecalls={filteredRecalls}
          searchTerm={searchTerm}
          onReleaseRecall={handleReleaseRecall}
        />

        {/* Footer stats and pagination */}
        <TablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          filteredCount={filteredRecalls.length}
        />
      </div>

      {/* Issue Recall Popup */}
      <IssueRecallPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccess={handleIssueRecall}
      />
    </div>
  );
}