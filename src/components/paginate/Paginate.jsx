import React, { useState } from "react";
import "./Paginate.css";

const Paginate = ({ filterOptions, setFilterOptions, countItem }) => {
  const { page, pageSize } = filterOptions;
  const totalPages = Math.ceil(countItem / pageSize);
  const [inputPage, setInputPage] = useState(page);

  const handlePageChange = (newPage) => {
    setFilterOptions((prev) => ({
      ...prev,
      page: newPage,
    }));
    setInputPage(newPage);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value !== "" && !isNaN(value) && value > 0 && value <= totalPages) {
      setInputPage(parseInt(value, 10));
    }
  };

  const handleInputSubmit = (event) => {
    if (event.key === "Enter") {
      handlePageChange(inputPage);
    }
  };

  const RenderPageNumbers = () => {
    let pageNumbers = [];
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);

    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} onClick={() => handlePageChange(1)}>
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === page ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
      pageNumbers.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="wrap-paginate">
      <div className="wrap-paginate__details">
        <span>
          current page {page} from {totalPages}
        </span>
      </div>
      <div>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          before
        </button>
        <input
          type="number"
          value={inputPage}
          onChange={handleInputChange}
          onKeyPress={handleInputSubmit}
          min="1"
          max={totalPages}
        />
        <RenderPageNumbers />
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Paginate;
