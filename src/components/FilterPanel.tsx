/**
 * FilterPanel Component
 * Mobile bottom sheet for filters and sorting
 */

'use client';

import { useState, useEffect } from 'react';
import { FilterPanelProps } from '@/lib/types';
import { SORT_OPTIONS, POSITION_CONFIG } from '@/lib/config';

export default function FilterPanel({
  isOpen,
  onClose,
  searchQuery,
  selectedClub,
  selectedPosition,
  currentSortBy,
  currentSortOrder,
  clubs,
  onApply
}: FilterPanelProps) {
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);
  const [tempClub, setTempClub] = useState(selectedClub);
  const [tempPosition, setTempPosition] = useState(selectedPosition);
  const [tempSortBy, setTempSortBy] = useState(currentSortBy);
  const [tempSortOrder, setTempSortOrder] = useState<'asc' | 'desc'>(currentSortOrder);

  // Update temp values when panel opens
  useEffect(() => {
    if (isOpen) {
      setTempSearchQuery(searchQuery);
      setTempClub(selectedClub);
      setTempPosition(selectedPosition);
      setTempSortBy(currentSortBy);
      setTempSortOrder(currentSortOrder);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, searchQuery, selectedClub, selectedPosition, currentSortBy, currentSortOrder]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleApply = () => {
    onApply({
      searchQuery: tempSearchQuery,
      selectedClub: tempClub,
      selectedPosition: tempPosition,
      sortBy: tempSortBy,
      sortOrder: tempSortOrder
    });
    onClose();
  };

  const handleClearAll = () => {
    setTempSearchQuery('');
    setTempClub('');
    setTempPosition('');
    setTempSortBy('points_avg');
    setTempSortOrder('desc');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (tempSearchQuery) count++;
    if (tempClub) count++;
    if (tempPosition) count++;
    if (tempSortBy !== 'points_avg') count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Filter Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col animate-slide-up">
        {/* Panel Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div>
            <h3 className="text-xl font-bold text-slate-100">Filters & Sort</h3>
            {getActiveFilterCount() > 0 && (
              <p className="text-xs text-slate-400 mt-0.5">
                {getActiveFilterCount()} active
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 transition-colors"
            aria-label="Close filter panel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Panel Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto filter-content p-5 space-y-5">
          {/* Search Section */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              🔍 Search Player
            </label>
            <div className="relative">
              <input
                type="search"
                value={tempSearchQuery}
                onChange={(e) => setTempSearchQuery(e.target.value)}
                placeholder="Type player name..."
                className="w-full h-12 bg-slate-700 border border-slate-600 rounded-lg px-4 pr-10 text-slate-100 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-base"
              />
              <span className="absolute right-3 top-3.5 text-slate-400 text-lg pointer-events-none">
                🔍
              </span>
            </div>
          </div>

          {/* Sort Section */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              📊 Sort By
            </label>
            <select
              value={tempSortBy}
              onChange={(e) => setTempSortBy(e.target.value)}
              className="w-full h-12 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 text-base transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>

            {/* Sort Order Toggle */}
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setTempSortOrder('desc')}
                className={`flex-1 h-11 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm ${
                  tempSortOrder === 'desc'
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-700 border-slate-600 text-slate-300'
                }`}
              >
                <span className="text-lg">↓</span>
                <span>High to Low</span>
              </button>
              <button
                onClick={() => setTempSortOrder('asc')}
                className={`flex-1 h-11 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm ${
                  tempSortOrder === 'asc'
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-700 border-slate-600 text-slate-300'
                }`}
              >
                <span className="text-lg">↑</span>
                <span>Low to High</span>
              </button>
            </div>
          </div>

          {/* Team Filter Section */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              🏟️ Filter by Team
            </label>
            <select
              value={tempClub}
              onChange={(e) => setTempClub(e.target.value)}
              className="w-full h-12 bg-slate-700 border border-slate-600 rounded-lg px-4 text-slate-100 text-base transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
            >
              <option value="">All Teams</option>
              {clubs.map((club) => (
                <option key={club} value={club}>
                  {club}
                </option>
              ))}
            </select>
          </div>

          {/* Position Filter Section */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              ⚽ Filter by Position
            </label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(POSITION_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setTempPosition(tempPosition === key ? '' : key)}
                  className={`h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
                    tempPosition === key
                      ? `${config.color.bg.replace('/30', '')} ${config.color.border} text-white`
                      : 'bg-slate-700 border-slate-600 text-slate-300'
                  }`}
                >
                  <span>{config.icon}</span>
                  <span>{config.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Footer */}
        <div className="p-5 border-t border-slate-700 space-y-3">
          <button
            onClick={handleClearAll}
            className="w-full h-12 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 font-medium hover:bg-slate-600 active:scale-95 transition-all duration-200"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold transition-all duration-200 hover:from-blue-500 hover:to-blue-600 active:scale-95"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
