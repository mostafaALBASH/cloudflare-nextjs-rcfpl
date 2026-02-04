/**
 * FPLViewer Component
 * Main application component for viewing and filtering FPL data
 */

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import PlayerCard from './PlayerCard';
import PlayerTable from './PlayerTable';
import FilterPanel from './FilterPanel';
import Pagination from './Pagination';
import StatsCards from './StatsCards';
import { PlayerMetrics, ViewMode, FilterState } from '@/lib/types';
import { APP_CONFIG, SORT_OPTIONS, MESSAGES, getSortLabelByKey } from '@/lib/config';
import {
  isLowSample,
  getProcessedData,
  paginateData,
  extractClubs,
  getHeaders,
  generateCSV,
  downloadCSV,
  getInitialViewMode,
  isMobile,
  isLargeScreen
} from '@/lib/utils';

interface FPLViewerProps {
  initialData: PlayerMetrics[];
}

export default function FPLViewer({ initialData }: FPLViewerProps) {
  // Data state
  const [allData] = useState<PlayerMetrics[]>(initialData);
  const [clubs] = useState<string[]>(extractClubs(initialData));
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(APP_CONFIG.DEFAULT_PAGE_SIZE);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Sort state
  const [currentSortBy, setCurrentSortBy] = useState(APP_CONFIG.DEFAULT_SORT_BY);
  const [currentSortOrder, setCurrentSortOrder] = useState<'asc' | 'desc'>(APP_CONFIG.DEFAULT_SORT_ORDER);
  
  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  
  // Notification state
  const [viewChangeMessage, setViewChangeMessage] = useState('');
  const [showViewChangeNotification, setShowViewChangeNotification] = useState(false);

  // Initialize view mode on client
  useEffect(() => {
    setViewMode(getInitialViewMode());
  }, []);

  // Computed data with memoization
  const processedData = useMemo(() => {
    return getProcessedData(allData, {
      searchQuery,
      selectedClub,
      selectedPosition,
      sortBy: currentSortBy,
      sortOrder: currentSortOrder
    });
  }, [allData, searchQuery, selectedClub, selectedPosition, currentSortBy, currentSortOrder]);

  const paginatedResult = useMemo(() => {
    return paginateData(processedData, currentPage, pageSize);
  }, [processedData, currentPage, pageSize]);

  const headers = useMemo(() => {
    return getHeaders(paginatedResult.data.length > 0 ? paginatedResult.data : allData);
  }, [paginatedResult.data, allData]);

  // Debounced search handler
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      setCurrentPage(1);
    }, APP_CONFIG.SEARCH_DEBOUNCE_DELAY);
    
    setSearchTimeout(timeout);
  };

  // Filter handlers
  const handleClubChange = (club: string) => {
    setSelectedClub(club);
    setCurrentPage(1);
  };

  const handlePositionChange = (position: string) => {
    setSelectedPosition(position);
    setCurrentPage(1);
  };

  // Sort handler
  const handleSort = (column: string) => {
    if (currentSortBy === column) {
      setCurrentSortOrder(currentSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setCurrentSortBy(column);
      setCurrentSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const handleSortByChange = (sortBy: string) => {
    setCurrentSortBy(sortBy);
    setCurrentPage(1);
  };

  // View toggle
  const toggleView = () => {
    const newViewMode: ViewMode = viewMode === 'card' ? 'table' : 'card';
    setViewMode(newViewMode);
    showViewNotification(
      newViewMode === 'card' ? MESSAGES.viewChange.card : MESSAGES.viewChange.table
    );
  };

  // Show view change notification
  const showViewNotification = (message: string) => {
    setViewChangeMessage(message);
    setShowViewChangeNotification(true);
    setTimeout(() => {
      setShowViewChangeNotification(false);
    }, APP_CONFIG.NOTIFICATION_DURATION);
  };

  // Clear filters
  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const clearClub = () => {
    setSelectedClub('');
    setCurrentPage(1);
  };

  const clearPosition = () => {
    setSelectedPosition('');
    setCurrentPage(1);
  };

  const resetSort = () => {
    setCurrentSortBy(APP_CONFIG.DEFAULT_SORT_BY);
    setCurrentSortOrder(APP_CONFIG.DEFAULT_SORT_ORDER);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedClub('');
    setSelectedPosition('');
    setCurrentSortBy(APP_CONFIG.DEFAULT_SORT_BY);
    setCurrentSortOrder(APP_CONFIG.DEFAULT_SORT_ORDER);
    setCurrentPage(1);
  };

  // Mobile filter panel handlers
  const openFilterPanel = () => {
    setFilterPanelOpen(true);
  };

  const closeFilterPanel = () => {
    setFilterPanelOpen(false);
  };

  const applyFiltersFromPanel = (filters: FilterState) => {
    setSearchQuery(filters.searchQuery);
    setSelectedClub(filters.selectedClub);
    setSelectedPosition(filters.selectedPosition);
    setCurrentSortBy(filters.sortBy);
    setCurrentSortOrder(filters.sortOrder);
    setCurrentPage(1);
  };

  // CSV export
  const handleDownload = () => {
    if (processedData.length === 0) {
      console.warn('No data to export');
      return;
    }
    const csv = generateCSV(processedData);
    downloadCSV(csv);
  };

  // Responsive view mode switching
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (isMobile() && viewMode === 'table') {
          setViewMode('card');
          showViewNotification(MESSAGES.viewChange.card);
        } else if (isLargeScreen() && viewMode === 'card') {
          setViewMode('table');
          showViewNotification(MESSAGES.viewChange.table);
        }
      }, APP_CONFIG.RESIZE_DEBOUNCE_DELAY);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [viewMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && filterPanelOpen) {
        closeFilterPanel();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filterPanelOpen]);

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedClub) count++;
    if (selectedPosition) count++;
    if (currentSortBy !== APP_CONFIG.DEFAULT_SORT_BY) count++;
    return count;
  };

  const hasActiveFilters = () => {
    return searchQuery || selectedClub || selectedPosition;
  };

  return (
    <>
      {/* Stats Cards */}
      <StatsCards
        totalPlayers={paginatedResult.totalItems}
        pageSize={pageSize}
        currentPage={paginatedResult.currentPage}
        totalPages={paginatedResult.totalPages}
      />

      {/* View Toggle & Active Filters */}
      <section className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Players
          </h2>
          
          {/* View Toggle (Desktop) */}
          <button
            onClick={toggleView}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 font-medium hover:bg-slate-600 active:scale-95 transition-all duration-200"
            title={`Switch to ${viewMode === 'card' ? 'table' : 'card'} view`}
          >
            <span className="text-lg">{viewMode === 'card' ? '📊' : '📱'}</span>
            <span>{viewMode === 'card' ? 'Table View' : 'Card View'}</span>
          </button>
        </div>

        {/* Active Filters Badges */}
        {hasActiveFilters() && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="filter-badge inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-sm font-medium transition-all bg-blue-600/20 border-blue-500/50 text-blue-300 hover:bg-blue-600/30"
              >
                <span>🔍 {searchQuery}</span>
                <span>×</span>
              </button>
            )}
            {selectedClub && (
              <button
                onClick={clearClub}
                className="filter-badge inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-sm font-medium transition-all bg-emerald-600/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-600/30"
              >
                <span>🏟️ {selectedClub}</span>
                <span>×</span>
              </button>
            )}
            {selectedPosition && (
              <button
                onClick={clearPosition}
                className="filter-badge inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-sm font-medium transition-all bg-purple-600/20 border-purple-500/50 text-purple-300 hover:bg-purple-600/30"
              >
                <span>⚽ {selectedPosition}</span>
                <span>×</span>
              </button>
            )}
            {currentSortBy !== APP_CONFIG.DEFAULT_SORT_BY && (
              <button
                onClick={resetSort}
                className="filter-badge inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-sm font-medium transition-all bg-cyan-600/20 border-cyan-500/50 text-cyan-300 hover:bg-cyan-600/30"
              >
                <span>📊 {getSortLabelByKey(currentSortBy)}</span>
                <span>×</span>
              </button>
            )}
            <button
              onClick={clearAllFilters}
              className="filter-badge inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-sm font-medium transition-all bg-red-600/20 border-red-500/50 text-red-300 hover:bg-red-600/30"
            >
              Clear All
            </button>
          </div>
        )}
      </section>

      {/* Desktop Controls */}
      <section className="hidden lg:block bg-gradient-to-br from-slate-800 to-slate-800/80 border border-slate-700 rounded-xl p-6 mb-8 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 controls-grid">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="group h-12 sm:h-12 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 sm:px-6 font-semibold text-white transition-all duration-200 hover:from-emerald-500 hover:to-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 flex items-center justify-center gap-2"
            title="Download filtered data as CSV"
          >
            <span className="text-lg">⬇️</span>
            <span className="text-sm">Export CSV</span>
          </button>

          {/* Search Input */}
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search player..."
              className="w-full h-12 bg-slate-700 border border-slate-600 rounded-lg px-4 pr-10 text-slate-100 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-slate-600 text-sm"
              title="Search by player name"
            />
            <span className="absolute right-3 top-3.5 text-slate-400 text-lg pointer-events-none">
              🔍
            </span>
          </div>

          {/* Sort Dropdown */}
          <select
            value={currentSortBy}
            onChange={(e) => handleSortByChange(e.target.value)}
            className="h-12 bg-slate-700 border border-slate-600 rounded-lg px-3 sm:px-4 text-slate-100 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-slate-600 cursor-pointer"
            title="Sort by metric"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.icon} {option.label}
              </option>
            ))}
          </select>

          {/* Club Filter */}
          <select
            value={selectedClub}
            onChange={(e) => handleClubChange(e.target.value)}
            className="h-12 bg-slate-700 border border-slate-600 rounded-lg px-3 sm:px-4 text-slate-100 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-slate-600 cursor-pointer"
            title="Filter by team"
          >
            <option value="">🏟️ All Teams</option>
            {clubs.map((club) => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
          </select>

          {/* Position Filter */}
          <select
            value={selectedPosition}
            onChange={(e) => handlePositionChange(e.target.value)}
            className="h-12 bg-slate-700 border border-slate-600 rounded-lg px-3 sm:px-4 text-slate-100 text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-slate-600 cursor-pointer"
            title="Filter by position"
          >
            <option value="">⚽ All Positions</option>
            <option value="GKP">🧤 Goalkeeper</option>
            <option value="DEF">🛡️ Defender</option>
            <option value="MID">⚡ Midfielder</option>
            <option value="FWD">🎯 Forward</option>
          </select>
        </div>
      </section>

      {/* Data Display */}
      <section>
        {paginatedResult.data.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">{MESSAGES.emptyState.icon}</div>
            <h3 className="text-2xl font-bold text-slate-300 mb-2">
              {MESSAGES.emptyState.title}
            </h3>
            <p className="text-slate-400">{MESSAGES.emptyState.subtitle}</p>
          </div>
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {paginatedResult.data.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                isLowSample={isLowSample(player)}
              />
            ))}
          </div>
        ) : (
          <PlayerTable
            data={paginatedResult.data}
            headers={headers}
            currentSortBy={currentSortBy}
            currentSortOrder={currentSortOrder}
            onSort={handleSort}
          />
        )}

        {/* Pagination */}
        {paginatedResult.totalPages > 1 && (
          <Pagination
            currentPage={paginatedResult.currentPage}
            totalPages={paginatedResult.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>

      {/* Mobile Filter FAB */}
      <button
        onClick={openFilterPanel}
        className="lg:hidden fixed bottom-6 right-6 z-40 fab w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl hover:from-blue-500 hover:to-blue-600 active:scale-95 transition-all duration-200"
        title="Open Filters & Sort"
        aria-label="Open filters and sort panel"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        {getActiveFilterCount() > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center">
            {getActiveFilterCount()}
          </span>
        )}
      </button>

      {/* Mobile Export FAB */}
      <button
        onClick={handleDownload}
        className="lg:hidden fixed bottom-6 right-24 z-40 w-14 h-14 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl hover:from-emerald-500 hover:to-emerald-600 active:scale-95 transition-all duration-200"
        title="Export CSV"
        aria-label="Export data as CSV"
      >
        <span className="text-lg">⬇️</span>
      </button>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={filterPanelOpen}
        onClose={closeFilterPanel}
        searchQuery={searchQuery}
        selectedClub={selectedClub}
        selectedPosition={selectedPosition}
        currentSortBy={currentSortBy}
        currentSortOrder={currentSortOrder}
        clubs={clubs}
        onApply={applyFiltersFromPanel}
      />

      {/* View Change Notification */}
      {showViewChangeNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-slate-800 border border-slate-700 rounded-lg px-6 py-3 shadow-2xl animate-fade-in">
          <p className="text-slate-100 font-medium">{viewChangeMessage}</p>
        </div>
      )}
    </>
  );
}
