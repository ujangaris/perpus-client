import React from "react";

export const Pagination = () => {
  return (
    <div className="col-md-6 d-flex justify-content-end">
      <nav aria-label="pagination pagination-md justify-content-end">
        <ul className="pagination">
          <li className="page-item">
            <span className="page-link">&laquo;</span>
          </li>
          <li className="page-item">
            <span className="page-link">&lsaquo;</span>
          </li>
          <li className="page-item">
            <span className="page-link">1</span>
          </li>
          <li className="page-item">
            <span className="page-link">&rsaquo;</span>
          </li>
          <li className="page-item">
            <span className="page-link">&raquo;</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};
