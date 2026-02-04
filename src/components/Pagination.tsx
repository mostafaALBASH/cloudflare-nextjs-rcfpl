/**
 * Pagination Component
 * Handles page navigation controls
 */

import { PaginationProps } from '@/lib/types';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PaginationProps) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Page Info */}
      <div className="text-slate-300 text-sm">
        Page <span className="font-semibold text-blue-400">{currentPage}</span> of{' '}
        <span className="font-semibold text-blue-400">{totalPages}</span>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={!canGoPrev}
          className="px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 font-medium hover:bg-slate-600 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700"
          aria-label="Go to first page"
        >
          ⏮️
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrev}
          className="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 font-medium hover:bg-slate-600 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700"
          aria-label="Go to previous page"
        >
          ◀️ Previous
        </button>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 font-medium hover:bg-slate-600 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700"
          aria-label="Go to next page"
        >
          Next ▶️
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={!canGoNext}
          className="px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 font-medium hover:bg-slate-600 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700"
          aria-label="Go to last page"
        >
          ⏭️
        </button>
      </div>
    </div>
  );
}
