/**
 * FPL Return Consistency - Utility Functions
 * Reusable helper functions for data processing and formatting
 */

import { PlayerMetrics, PaginationResult } from './types';
import { APP_CONFIG, NUMERIC_COLUMNS, TABLE_COLUMN_STYLES } from './config';

// ============================================================================
// DATA FILTERING & SORTING
// ============================================================================

/**
 * Check if a player has a low sample size
 */
export function isLowSample(player: PlayerMetrics): boolean {
  return (player.matches_counted || 0) < APP_CONFIG.MIN_MATCHES_FOR_SCORE;
}

/**
 * Filter data based on search query, club, and position
 * All filters work together - they are combined, not exclusive
 */
export function filterData(
  data: PlayerMetrics[],
  searchQuery: string,
  selectedClub: string,
  selectedPosition: string
): PlayerMetrics[] {
  let filtered = [...data];

  // Apply search filter (by player name)
  if (searchQuery && searchQuery.length >= APP_CONFIG.MIN_SEARCH_CHARS) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(row => 
      (row.web_name || '').toLowerCase().includes(query)
    );
  }

  // Apply club filter (works with search)
  if (selectedClub) {
    filtered = filtered.filter(row => row.team === selectedClub);
  }

  // Apply position filter (works with search and club)
  if (selectedPosition) {
    filtered = filtered.filter(row => row.element_type === selectedPosition);
  }

  return filtered;
}

/**
 * Sort data by specified column and order
 */
export function sortData(
  data: PlayerMetrics[],
  sortBy: string,
  sortOrder: 'asc' | 'desc'
): PlayerMetrics[] {
  return [...data].sort((a, b) => {
    const aVal = a[sortBy as keyof PlayerMetrics];
    const bVal = b[sortBy as keyof PlayerMetrics];
    const aNum = parseFloat(String(aVal));
    const bNum = parseFloat(String(bVal));

    // Numeric sorting
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return sortOrder === 'desc' ? bNum - aNum : aNum - bNum;
    }

    // String sorting
    const aStr = String(aVal || '').toLowerCase();
    const bStr = String(bVal || '').toLowerCase();
    return sortOrder === 'desc' 
      ? bStr.localeCompare(aStr) 
      : aStr.localeCompare(bStr);
  });
}

/**
 * Get filtered and sorted data
 */
export function getProcessedData(
  allData: PlayerMetrics[],
  filters: {
    searchQuery: string;
    selectedClub: string;
    selectedPosition: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }
): PlayerMetrics[] {
  const { searchQuery, selectedClub, selectedPosition, sortBy, sortOrder } = filters;
  
  // Filter first
  const filtered = filterData(allData, searchQuery, selectedClub, selectedPosition);
  
  // Then sort
  return sortData(filtered, sortBy, sortOrder);
}

/**
 * Paginate data
 */
export function paginateData(
  data: PlayerMetrics[],
  page: number,
  pageSize: number
): PaginationResult {
  const totalPages = Math.ceil(data.length / pageSize) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIdx, startIdx + pageSize);

  return {
    data: paginatedData,
    currentPage,
    totalPages,
    totalItems: data.length
  };
}

// ============================================================================
// DATA EXTRACTION & VALIDATION
// ============================================================================

/**
 * Extract unique clubs from data
 */
export function extractClubs(data: PlayerMetrics[]): string[] {
  return [...new Set(data.map(row => row.team))]
    .filter(Boolean)
    .sort();
}

/**
 * Get headers from data object (excluding id) in custom display order
 */
export function getHeaders(data: PlayerMetrics[]): string[] {
  if (data.length === 0) return [];
  
  // Define the desired column order based on UX requirements
  const desiredOrder = [
    'web_name',           // Player
    'team',               // Team
    'element_type',       // Position
    'matches_counted',    // Matches
    'points_avg',         // Avg Points (moved after Matches)
    'returns_5plus_count', // 5+ Returns
    'return_rate_raw',    // Return Rate
    'return_rate_smooth', // Return Rate (Smoothed)
    'blanks_le2_count',   // Blanks (≤2)
    'blanks_rate',        // Blank Rate
    'hauls_10plus_count', // Hauls (10+)
    'points_sd',          // Points Volatility
    'consistency_score'   // Consistency Score (remains at end)
  ];
  
  // Get all available keys from data (excluding 'id')
  const availableKeys = Object.keys(data[0]).filter(h => h !== 'id');
  
  // Return keys in desired order, followed by any additional keys not in the order
  const orderedKeys = desiredOrder.filter(key => availableKeys.includes(key));
  const remainingKeys = availableKeys.filter(key => !desiredOrder.includes(key));
  
  return [...orderedKeys, ...remainingKeys];
}

// ============================================================================
// FORMATTING HELPERS
// ============================================================================

/**
 * Format consistency score with low sample indication
 */
export function formatConsistencyScore(score: number | string, player: PlayerMetrics): string {
  if (isLowSample(player)) {
    return '0';
  }
  return String(score || '0');
}

/**
 * Format value for display in table cells
 */
export function formatCellValue(header: string, value: any, row: PlayerMetrics): string | number {
  if (header === 'consistency_score' && isLowSample(row)) {
    return value === 0 || value === '0' ? 0 : value;
  }
  return value;
}

/**
 * Check if a player has low sample size for display purposes
 */
export function shouldShowLowSampleWarning(header: string, player: PlayerMetrics): boolean {
  return header === 'consistency_score' && isLowSample(player) && 
         (player.consistency_score === 0 || player.consistency_score === null);
}

// ============================================================================
// CSS CLASS HELPERS
// ============================================================================

/**
 * Check if a column is numeric
 */
export function isNumericColumn(header: string): boolean {
  return NUMERIC_COLUMNS.includes(header);
}

/**
 * Get table column CSS classes
 */
export function getTableColumnClasses(
  header: string,
  index: number,
  isHeaderRow: boolean = false
): string {
  const classes: string[] = ['px-3 sm:px-5 py-3 sm:py-4'];
  const config = TABLE_COLUMN_STYLES[header] || {};

  // First column (sticky)
  if (index === 0) {
    classes.push('sticky left-0 z-10 bg-slate-800 border-r border-slate-700/50');
    if (isHeaderRow) {
      classes.push('z-20 bg-gradient-to-r from-slate-800 to-slate-700');
    }
  }

  // Add min-width if specified
  if (config.minWidth) {
    classes.push(config.minWidth);
  }

  // Add color if specified
  if (config.color) {
    classes.push(config.color);
  }

  // Add font weight if specified
  if (config.fontWeight) {
    classes.push(config.fontWeight);
  }

  // Add alignment
  if (config.align) {
    classes.push(config.align);
  } else if (index > 0 && isNumericColumn(header)) {
    classes.push('text-right');
  } else {
    classes.push('text-left');
  }

  // Add tabular-nums for numeric columns in body rows
  if (!isHeaderRow && isNumericColumn(header)) {
    classes.push('tabular-nums');
  }

  // Add whitespace handling
  if (isHeaderRow) {
    classes.push('whitespace-nowrap');
  }

  // Header specific styles
  if (isHeaderRow) {
    classes.push('font-semibold text-slate-200 cursor-pointer hover:bg-slate-700 transition-all duration-200');
  } else {
    classes.push('text-slate-100');
    if (index === 0) {
      classes.push('font-semibold text-blue-300');
    }
  }

  return classes.join(' ');
}

// ============================================================================
// CSV EXPORT
// ============================================================================

/**
 * Generate CSV from data
 */
export function generateCSV(data: PlayerMetrics[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  let csv = headers.join(',') + '\r\n';
  
  data.forEach(row => {
    const values = headers.map(h => {
      const val = row[h as keyof PlayerMetrics];
      // Escape values with commas or quotes
      if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    });
    csv += values.join(',') + '\r\n';
  });

  return csv;
}

/**
 * Download CSV file
 */
export function downloadCSV(csvContent: string, filename: string = 'fpl_return_consistency.csv'): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

// ============================================================================
// VIEW MODE DETECTION
// ============================================================================

/**
 * Get initial view mode based on screen size
 */
export function getInitialViewMode(): 'card' | 'table' {
  if (typeof window === 'undefined') return 'table'; // SSR default
  return window.innerWidth < APP_CONFIG.MOBILE_BREAKPOINT ? 'card' : 'table';
}

/**
 * Check if current screen is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < APP_CONFIG.MOBILE_BREAKPOINT;
}

/**
 * Check if current screen is large
 */
export function isLargeScreen(): boolean {
  if (typeof window === 'undefined') return true;
  return window.innerWidth >= APP_CONFIG.LARGE_SCREEN_BREAKPOINT;
}
