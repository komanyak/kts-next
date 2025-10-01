import classNames from 'classnames';
import ArrowLeftIcon from '@icons/ArrowLeftIcon';
import ArrowRightIcon from '@icons/ArrowRightIcon';
import React from 'react';

import styles from './Pagination.module.scss';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= 4) {
      const pages: number[] = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const result: (number | string)[] = [];

    if (currentPage <= 2) {
      result.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 1) {
      result.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      result.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return result;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={classNames(styles.pagination, className)}>
      <button
        className={styles.paginationButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowLeftIcon />
      </button>

      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'string' ? (
            <span className={styles.paginationDots}>{page}</span>
          ) : (
            <button
              className={classNames(styles.paginationButton, {
                [styles.paginationButtonActive]: page === currentPage,
              })}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        className={styles.paginationButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
