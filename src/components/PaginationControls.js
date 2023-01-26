import React from "react";

export default function PaginationControls({
  currentPage,
  totalPages,
  handlePageChange,
  handleLimitChange,
}) {
  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
      <select onChange={(e) => handleLimitChange(e.target.value)}>
      <option value={6}>6 per page</option>
        <option value={12}>12 per page</option>
        <option value={24}>24 per page</option>
        <option value={48}>48 per page</option>
      </select>
    </div>
  );
}
