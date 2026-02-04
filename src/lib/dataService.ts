/**
 * Data Service - HTTP-based JSON data fetching
 * Handles environment-based URL resolution and data loading
 * 
 * @version 1.0.0
 * @date February 4, 2026
 */

import { PlayerMetrics } from './types';
import fs from 'fs';
import path from 'path';

/**
 * Get the base URL for data fetching based on environment
 */
function getDataBaseUrl(): string {
  // In browser, check if we're on production domain
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'www.rcfpl.net' || hostname === 'rcfpl.net') {
      return 'https://www.rcfpl.net/data';
    }
    // For development in browser, use relative path
    return '/data';
  }
  
  // For server-side rendering (build time), return null to use filesystem
  return '';
}

/**
 * Fetch player metrics data from JSON endpoint or filesystem
 * @returns Promise resolving to player metrics array
 * @throws Error if fetch fails or data is invalid
 */
export async function fetchPlayerMetrics(): Promise<PlayerMetrics[]> {
  try {
    // During build time (server-side), read from filesystem
    if (typeof window === 'undefined') {
      const filePath = path.join(process.cwd(), 'public', 'data', 'player-metrics.json');
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`Player metrics file not found: ${filePath}`);
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContent);
      
      // Validate data structure
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: expected array');
      }
      
      return data as PlayerMetrics[];
    }
    
    // In browser, fetch via HTTP
    const baseUrl = getDataBaseUrl();
    const url = `${baseUrl}/player-metrics.json`;
    
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
