import React from "react";

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : "pagination-btn"}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export { Pagination };
