/**
 * Data Service - JSON data fetching
 * @version 1.2.0
 * @date February 5, 2026
 */

import { PlayerMetrics } from './types';
// Import JSON for build-time SSG - will be tree-shaken in Workers bundle
import playerMetricsData from '@/../../public/data/player-metrics.json';

/**
 * Fetch player metrics data
 * @returns Promise resolving to player metrics array
 */
export async function fetchPlayerMetrics(): Promise<PlayerMetrics[]> {
  try {
    // During build/SSG, use imported data
    if (typeof window === 'undefined' && playerMetricsData) {
      return playerMetricsData as PlayerMetrics[];
    }
    
    // In browser or Workers runtime, fetch from assets
    const url = '/data/player-metrics.json';
    
    const response = await fetch(url, {
      // Enable caching for better performance
      cache: 'force-cache',
      // Add headers for better compatibility
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(
        `Failed to fetch player metrics: ${response.status} ${response.statusText}`
      );
    }
    
    const data = await response.json();
    
    // Validate data structure
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format: expected array');
    }
    
    if (data.length === 0) {
      console.warn('Player metrics data is empty');
    }
    
    // Basic validation of first item
    if (data.length > 0) {
      const first = data[0];
      if (!first.id || !first.web_name || !first.team) {
        throw new Error('Invalid player metrics format: missing required fields');
      }
    }
    
    return data as PlayerMetrics[];
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching player metrics:', error);
    
    // Re-throw with more context
    if (error instanceof Error) {
      throw new Error(`Data loading failed: ${error.message}`);
    }
    throw new Error('Data loading failed: Unknown error');
  }
}

/**
 * Fetch player metrics with retry logic
 * Useful for production environments with intermittent connectivity
 * 
 * @param maxRetries Maximum number of retry attempts (default: 2)
 * @param retryDelay Delay between retries in ms (default: 1000)
 * @returns Promise resolving to player metrics array
 */
export async function fetchPlayerMetricsWithRetry(
  maxRetries: number = 2,
  retryDelay: number = 1000
): Promise<PlayerMetrics[]> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fetchPlayerMetrics();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on last attempt
      if (attempt < maxRetries) {
        console.warn(`Fetch attempt ${attempt + 1} failed, retrying in ${retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }
  
  // All retries failed
  throw lastError || new Error('Failed to fetch player metrics after retries');
}

/**
 * Type guard to check if data is valid PlayerMetrics array
 */
export function isPlayerMetricsArray(data: unknown): data is PlayerMetrics[] {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return true; // Empty array is valid
  
  const first = data[0];
  return (
    typeof first === 'object' &&
    first !== null &&
    'id' in first &&
    'web_name' in first &&
    'team' in first &&
    'element_type' in first &&
    'consistency_score' in first
  );
}
