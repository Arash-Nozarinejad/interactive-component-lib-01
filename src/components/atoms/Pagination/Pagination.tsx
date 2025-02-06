import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

/** Types and Interfaces **/

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Current page number (1-based)
   */
  page: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Number of pages to show around current page
   */
  siblingCount?: number;
  /**
   * Whether to show first/last page buttons
   */
  showFirstLast?: boolean;
  /**
   * Whether to show previous/next buttons
   */
  showPrevNext?: boolean;
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Size of pagination buttons
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Shape of pagination buttons
   */
  shape?: 'square' | 'rounded' | 'pill';
  /**
   * Whether to show page size selector
   */
  showPageSize?: boolean;
  /**
   * Available page sizes
   */
  pageSizeOptions?: number[];
  /**
   * Current page size
   */
  pageSize?: number;
  /**
   * Callback when page size changes
   */
  onPageSizeChange?: (pageSize: number) => void;
}

/** Utility function: generate array of pages */
function generatePages(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | 'dots')[] {
  const pages: (number | 'dots')[] = [];
  const totalNumbers = siblingCount * 2 + 3; // current + left siblings + right siblings

  // Case 1: Show all pages if total pages <= totalNumbers
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Calculate left & right sibling indexes
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  // Case 2: Only right dots
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'dots', totalPages];
  }

  // Case 3: Only left dots
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, 'dots', ...rightRange];
  }

  // Case 4: Both left and right dots
  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );

  return [1, 'dots', ...middleRange, 'dots', totalPages];
}

/** Style Maps for Size and Shape */
const sizeStyles = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg'
};

const shapeStyles = {
  square: 'rounded-none',
  rounded: 'rounded-md',
  pill: 'rounded-full'
};

/** Main Pagination Component */
export function Pagination({
  page,
  totalPages,
  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  onPageChange,
  size = 'md',
  shape = 'rounded',
  showPageSize = false,
  pageSizeOptions = [10, 20, 50, 100],
  pageSize = 10,
  onPageSizeChange,
  className,
  ...props
}: PaginationProps) {
  const pages = generatePages(page, totalPages, siblingCount);

  /** Handle page size dropdown change */
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange?.(Number(event.target.value));
  };

  /** Reusable button component */
  const PageButton = ({
    children,
    onClick,
    disabled,
    active,
    ariaLabel
  }: {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
    ariaLabel?: string;
  }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-current={active ? 'page' : undefined}
        className={[
          'flex items-center justify-center border border-gray-300 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          active
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-white text-gray-700 hover:bg-gray-50',
          sizeStyles[size],
          shapeStyles[shape]
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </button>
    );
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={['flex items-center gap-2', className].filter(Boolean).join(' ')}
      {...props}
    >
      {/** Optional Page Size Selector */}
      {showPageSize && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Items per page:</label>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className={[
              'rounded-md border border-gray-300 bg-white px-2 py-1',
              'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            ].join(' ')}
          >
            {pageSizeOptions.map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center gap-1">
        {showFirstLast && (
          <PageButton
            onClick={() => onPageChange(1)}
            disabled={page === 1}
            ariaLabel="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </PageButton>
        )}

        {showPrevNext && (
          <PageButton
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            ariaLabel="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </PageButton>
        )}

        {pages.map((pageNumber, index) =>
          pageNumber === 'dots' ? (
            <span
              key={`dots-${index}`}
              className="flex items-center justify-center px-1 text-gray-500"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <PageButton
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              active={page === pageNumber}
              ariaLabel={`Go to page ${pageNumber}`}
            >
              {pageNumber}
            </PageButton>
          )
        )}

        {showPrevNext && (
          <PageButton
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            ariaLabel="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </PageButton>
        )}

        {showFirstLast && (
          <PageButton
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages}
            ariaLabel="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </PageButton>
        )}
      </div>
    </nav>
  );
}
