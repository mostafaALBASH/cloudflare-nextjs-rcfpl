/**
 * FPL Return Consistency - TypeScript Interfaces
 * Type definitions for the RCFPL application
 * 
 * @version 1.0.0
 * @date February 4, 2026
 */

// ============================================================================
// PLAYER DATA INTERFACES
// ============================================================================

/**
 * Main player metrics interface
 * Represents a single player's return consistency metrics
 */
export interface PlayerMetrics {
  /** Unique identifier for the player */
  id: number;
  
  /** Player's display name (e.g., "Salah", "Haaland") */
  web_name: string;
  
  /** Club abbreviation (e.g., "LIV", "MCI", "ARS") */
  team: string;
  
  /** Player position: "GKP" | "DEF" | "MID" | "FWD" */
  element_type: PlayerPosition;
  
  /** Number of appearances (matches with minutes > 0) */
  matches_counted: number;
  
  /** Count of matches with 5+ FPL points */
  returns_5plus_count: number;
  
  /** Raw return rate percentage (returns / matches * 100) */
  return_rate_raw: number;
  
  /** Smoothed return rate using plus-four adjustment: (x+2)/(n+4) * 100 */
  return_rate_smooth: number;
  
  /** Count of matches with 0-2 FPL points (blanks) */
  blanks_le2_count: number;
  
  /** Blank rate percentage (blanks / matches * 100) */
  blanks_rate: number;
  
  /** Count of matches with 10+ FPL points (hauls) */
  hauls_10plus_count: number;
  
  /** Average FPL points per appearance */
  points_avg: number;
  
  /** Points standard deviation (volatility measure) */
  points_sd: number;
  
  /** 
   * Composite consistency score (0-100 percentile)
   * Weights: 55% return rate + 25% low volatility + 20% low blanks
   * Players with <6 matches get score of 0
   */
  consistency_score: number;
}

/**
 * Player position enum
 */
export type PlayerPosition = 'GKP' | 'DEF' | 'MID' | 'FWD';

/**
 * Position display configuration
 */
export interface PositionConfig {
  icon: string;
  label: string;
  fullName: string;
  display: string;
  color: {
    bg: string;
    text: string;
    border: string;
  };
}

// ============================================================================
// FILTER & SORT INTERFACES
// ============================================================================

/**
 * Filter state for player list
 */
export interface FilterState {
  /** Search query for player name */
  searchQuery: string;
  
  /** Selected club filter (empty string = all clubs) */
  selectedClub: string;
  
  /** Selected position filter (empty string = all positions) */
  selectedPosition: string;
  
  /** Current sort column */
  sortBy: string;
  
  /** Sort order: 'asc' or 'desc' */
  sortOrder: 'asc' | 'desc';
}

/**
 * Sort option configuration
 */
export interface SortOption {
  value: string;
  label: string;
  icon: string;
}

// ============================================================================
// PAGINATION INTERFACES
// ============================================================================

/**
 * Pagination result
 */
export interface PaginationResult {
  data: PlayerMetrics[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

// ============================================================================
// VIEW MODE
// ============================================================================

/**
 * View mode type
 */
export type ViewMode = 'card' | 'table';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Props for PlayerCard component
 */
export interface PlayerCardProps {
  player: PlayerMetrics;
  isLowSample: boolean;
}

/**
 * Props for PlayerTable component
 */
export interface PlayerTableProps {
  data: PlayerMetrics[];
  headers: string[];
  currentSortBy: string;
  currentSortOrder: 'asc' | 'desc';
  onSort: (column: string) => void;
}

/**
 * Props for Pagination component
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Props for StatsCards component
 */
export interface StatsCardsProps {
  totalPlayers: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

/**
 * Props for FilterPanel component (mobile)
 */
export interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  selectedClub: string;
  selectedPosition: string;
  currentSortBy: string;
  currentSortOrder: 'asc' | 'desc';
  clubs: string[];
  onApply: (filters: FilterState) => void;
}
