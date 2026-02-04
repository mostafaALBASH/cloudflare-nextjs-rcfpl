/**
 * PlayerCard Component
 * Card view for displaying player metrics (mobile-optimized)
 */

import { PlayerCardProps } from '@/lib/types';
import { POSITION_CONFIG, COLUMN_LABELS } from '@/lib/config';

export default function PlayerCard({ player, isLowSample }: PlayerCardProps) {
  const positionConfig = POSITION_CONFIG[player.element_type];
  
  const metrics = [
    { label: 'Matches', value: player.matches_counted, icon: '🏃' },
    { label: 'Avg Points', value: player.points_avg.toFixed(1), icon: '📊', highlight: true },
    { label: '5+ Returns', value: player.returns_5plus_count, icon: '✨', color: 'text-green-400' },
    { label: 'Return Rate', value: `${player.return_rate_smooth.toFixed(1)}%`, icon: '🎯' },
    { label: 'Blanks (≤2)', value: player.blanks_le2_count, icon: '📉', color: 'text-rose-400' },
    { label: 'Blank Rate', value: `${player.blanks_rate.toFixed(1)}%`, icon: '⚠️' },
    { label: 'Hauls (10+)', value: player.hauls_10plus_count, icon: '🚀' },
    { label: 'Volatility', value: player.points_sd.toFixed(1), icon: '📈' },
  ];

  return (
    <div className="player-card bg-gradient-to-br from-slate-800 to-slate-800/80 border border-slate-700 rounded-xl p-5 hover:border-blue-500/50 transition-colors duration-200 shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-300 mb-1">
            {player.web_name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-slate-700 text-slate-300">
              {player.team}
            </span>
            <span 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium whitespace-nowrap ${positionConfig.color.bg} ${positionConfig.color.text}`}
            >
              {positionConfig.display}
            </span>
          </div>
        </div>
      </div>

      {/* Consistency Score */}
      <div className="mb-4 p-4 bg-gradient-to-r from-slate-700/50 to-slate-700/30 rounded-lg border border-slate-600">
        <div className="text-sm text-slate-400 mb-1">⭐ {COLUMN_LABELS.consistency_score}</div>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {isLowSample ? '0' : player.consistency_score}
          </div>
          {isLowSample && (
            <span className="text-xs bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded">
              Low sample
            </span>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-slate-700/30 rounded-lg p-3 border border-slate-700/50"
          >
            <div className="text-xs text-slate-400 mb-1">
              {metric.icon} {metric.label}
            </div>
            <div 
              className={`text-lg font-semibold ${
                metric.highlight 
                  ? 'text-emerald-400' 
                  : metric.color || 'text-slate-200'
              }`}
            >
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
