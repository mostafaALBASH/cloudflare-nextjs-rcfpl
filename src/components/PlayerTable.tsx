/**
 * PlayerTable Component
 * Table view for displaying player metrics (desktop-optimized)
 */

'use client';

import { useEffect, useRef } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { PlayerTableProps } from '@/lib/types';
import { COLUMN_LABELS, COLUMN_TOOLTIPS, POSITION_CONFIG } from '@/lib/config';
import { 
  getTableColumnClasses, 
  shouldShowLowSampleWarning, 
  formatCellValue 
} from '@/lib/utils';

export default function PlayerTable({
  data,
  headers,
  currentSortBy,
  currentSortOrder,
  onSort
}: PlayerTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  const getSortIndicator = (header: string) => {
    if (currentSortBy === header) {
      return currentSortOrder === 'desc' ? ' ↓' : ' ↑';
    }
    return '';
  };

  const getColumnLabel = (header: string): string => {
    return COLUMN_LABELS[header] || header.charAt(0).toUpperCase() + header.slice(1).replace(/_/g, ' ');
  };

  return (
    <div className="view-transition">
      <div 
        ref={tableRef}
        className="overflow-x-auto scrollbar-thin rounded-xl border border-slate-700"
      >
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 sticky top-0 z-10">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={header}
                  onClick={() => onSort(header)}
                  className={getTableColumnClasses(header, index, true)}
                  data-header={header}
                >
                  {COLUMN_TOOLTIPS[header] ? (
                    <Tippy
                      content={COLUMN_TOOLTIPS[header]}
                      theme="dark"
                      placement="top"
                      arrow={false}
                    >
                      <span className="cursor-pointer">
                        {getColumnLabel(header)}{getSortIndicator(header)}
                      </span>
                    </Tippy>
                  ) : (
                    <span className="cursor-pointer">
                      {getColumnLabel(header)}{getSortIndicator(header)}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((player, rowIndex) => (
              <tr
                key={player.id}
                className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors duration-150"
              >
                {headers.map((header, colIndex) => {
                  const value = player[header as keyof typeof player];
                  const positionConfig = header === 'element_type' 
                    ? POSITION_CONFIG[player.element_type] 
                    : null;
                  
                  // Format numeric values
                  let displayValue: string | number = value;
                  if (typeof value === 'number' && header !== 'id' && header !== 'matches_counted') {
                    if (header.includes('rate') || header === 'consistency_score') {
                      displayValue = value.toFixed(1);
                    } else if (header === 'points_avg' || header === 'points_sd') {
                      displayValue = value.toFixed(1);
                    }
                  }

                  return (
                    <td
                      key={`${player.id}-${header}`}
                      className={getTableColumnClasses(header, colIndex, false)}
                    >
                      {header === 'element_type' && positionConfig ? (
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium whitespace-nowrap ${positionConfig.color.bg} ${positionConfig.color.text}`}
                        >
                          {positionConfig.display}
                        </span>
                      ) : header === 'team' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-slate-700 text-slate-300">
                          {displayValue}
                        </span>
                      ) : header === 'consistency_score' && shouldShowLowSampleWarning(header, player) ? (
                        <span className="flex items-center justify-end gap-2">
                          <span className="text-slate-500">{displayValue}</span>
                          <span className="text-xs bg-yellow-900/30 text-yellow-400 px-2 py-0.5 rounded whitespace-nowrap">
                            Low sample
                          </span>
                        </span>
                      ) : (
                        displayValue
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
