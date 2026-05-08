import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  pageSize, 
  onPageChange, 
  onPageSizeChange,
  loading 
}) => {
  const [goToPage, setGoToPage] = useState('');

  const handleGoToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(goToPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setGoToPage('');
    }
  };

  const getPages = () => {
    const pages = [];
    const maxVisible = 3; // Reduced to make space
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = pageSize ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = pageSize && totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;

  const showAdvanced = totalItems !== undefined && pageSize !== undefined && onPageSizeChange !== undefined;

  return (
    <div className={`flex flex-col md:flex-row items-center w-full ${showAdvanced ? 'justify-between space-y-4 md:space-y-0' : 'justify-center'}`}>
      {/* Left: Info */}
      {showAdvanced && (
        <div className="text-[13px] text-gray-500 font-medium">
          Hiển thị <span className="text-gray-900 font-bold">{startItem}-{endItem}</span> trong tổng số <span className="text-gray-900 font-bold">{totalItems}</span> bản ghi
        </div>
      )}

      {/* Right: Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Page Size Selector */}
        {showAdvanced && (
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Số dòng:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-gray-50 border border-gray-200 text-gray-900 text-[13px] rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-1.5 font-bold"
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || loading}
            className="p-1.5 text-gray-500 hover:text-indigo-600 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-1">
            {getPages().map((p, i) => (
              <button
                key={i}
                onClick={() => typeof p === 'number' && onPageChange(p)}
                disabled={typeof p !== 'number' || loading}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  currentPage === p 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : typeof p === 'number'
                    ? 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                    : 'text-gray-300 cursor-default'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || loading}
            className="p-1.5 text-gray-500 hover:text-indigo-600 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Go To Page */}
        {showAdvanced && (
          <form onSubmit={handleGoToPage} className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Đến trang:</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={goToPage}
              onChange={(e) => setGoToPage(e.target.value)}
              className="w-12 bg-gray-50 border border-gray-200 text-gray-900 text-[13px] rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-1.5 text-center font-bold"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Pagination;
