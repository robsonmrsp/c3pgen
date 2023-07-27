import React, { useState } from "react";

const range = (size, startAt = 0) => {
  return [...Array(size).keys()].map((i) => i + startAt);
};

const Pagination = ({
  actualPage = 1,
  pageSize = 10,
  totalRecords = 1,
  onChangePageNumber,
}) => {
  const totalPages = Math.ceil(totalRecords / pageSize);
  // create last and first
  const lastPage = actualPage + 5 <= totalPages ? actualPage + 5 : totalPages;
  const pageNumberToShow = range(
    5,
    actualPage >= 3 ? actualPage - 2 : actualPage
  );

  return (
    <div>
      {" "}
      <div className="join">
        <button
          className="join-item btn btn-md"
          onClick={() => {
            onChangePageNumber(actualPage - 1);
          }}
        >
          《
        </button>

        {pageNumberToShow?.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={
                pageNumber === actualPage
                  ? "join-item btn btn-md btn-neutral"
                  : "join-item btn btn-md "
              }
              onClick={() => {
                onChangePageNumber(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className="join-item btn btn-md"
          onClick={() => {
            onChangePageNumber(actualPage + 1);
          }}
        >
          》
        </button>
      </div>
    </div>
  );
};

export default Pagination;
