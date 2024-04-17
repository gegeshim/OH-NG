import React, { useState } from 'react';

import styles from './Pagenation.module.css';

export default function Pagenation({
  totalCount,
  rowSize,
  paginationSize = 5,
  currentPage = 1,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalCount / rowSize);
  const startPage =
    Math.floor((currentPage - 1) / paginationSize) * paginationSize + 1;
  const endPage = Math.min(startPage + paginationSize - 1, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  const handlePageChange = (page) => {
    onPageChange(page);
  };
  return (
    <div className={styles.pagenationWrap}>
      <button
        type="button"
        className={styles['firstPage']}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        {'<<'}
      </button>
      <button
        type="button"
        className={styles.prevPage}
        onClick={() =>
          handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      >
        {'<'}
      </button>
      <div className={styles.pageList}>
        {pageNumbers.map((number) => (
          <button
            type="button"
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? styles['active'] : ''}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.lastPage}
        onClick={() =>
          handlePageChange(
            currentPage < totalPages ? currentPage + 1 : currentPage
          )
        }
        disabled={currentPage === totalPages || totalPages === 0}
      >
        {'>'}
      </button>
      <button
        type="button"
        className={styles.nextPage}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        {'>>'}
      </button>
    </div>
  );
}
