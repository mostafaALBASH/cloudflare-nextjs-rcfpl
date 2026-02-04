/**
 * StatsCards Component
 * Displays statistics about the current data view
 */

import { StatsCardsProps } from '@/lib/types';

export default function StatsCards({ 
  totalPlayers, 
  pageSize, 
  currentPage, 
  totalPages 
}: StatsCardsProps) {
  const stats = [
    { label: 'Total Players', value: totalPlayers, icon: '👥' },
    { label: 'Per Page', value: pageSize, icon: '📄' },
    { label: 'Current Page', value: currentPage, icon: '📍' },
    { label: 'Total Pages', value: totalPages, icon: '📚' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-gradient-to-br from-slate-800 to-slate-800/80 border border-slate-700 rounded-xl p-5 text-center hover:border-blue-500/50 transition-colors duration-200"
        >
          <div className="text-3xl mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {stat.value}
          </div>
          <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
