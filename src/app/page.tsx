import FPLViewer from '@/components/FPLViewer';
import playerMetricsData from '@/data/player-metrics.json';
import { PlayerMetrics } from '@/lib/types';

export default function Home() {
  const playerMetrics = playerMetricsData as PlayerMetrics[];

  return (
    <main 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1600px]"
      role="main"
      itemScope
      itemType="https://schema.org/DataCatalog"
    >
      {/* Header */}
      <header 
        className="text-center mb-8 sm:mb-12"
        role="banner"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          Return Consistency in FPL
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Identify reliable Fantasy Premier League players based on consistent 5+ point returns
        </p>
      </header>

      {/* Definition Section */}
      <section 
        id="definition"
        className="mb-8 bg-gradient-to-br from-slate-800 to-slate-800/80 border border-slate-700 rounded-xl overflow-hidden shadow-lg"
        itemScope
        itemType="https://schema.org/Article"
      >
        <details className="group" open>
          <summary className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors duration-200 cursor-pointer text-left list-none">
            <h2 
              className="text-lg sm:text-xl font-bold text-blue-300 group-hover:text-blue-200 transition-colors"
              itemProp="headline"
            >
              What is Return Consistency?
            </h2>
            <svg 
              className="w-6 h-6 text-blue-400 transform transition-transform duration-200 flex-shrink-0 ml-3 group-open:rotate-180"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-4" itemProp="articleBody">
            <p className="text-slate-300 leading-relaxed">
              <strong>Return Consistency</strong> in Fantasy Premier League (FPL) measures how reliably 
              a player delivers FPL points across matches. A <strong>return</strong> is defined as any 
              gameweek where a player scores <strong>5+ FPL points</strong>. This metric focuses on 
              <strong>frequency of returns</strong>, not just total points or rare explosive hauls. 
              Think of it as measuring a player's reliability as a fantasy asset.
            </p>
          </div>
        </details>
      </section>

      {/* Methodology Section */}
      <section 
        id="methodology"
        className="mb-8 bg-gradient-to-br from-slate-800 to-slate-800/80 border border-slate-700 rounded-xl overflow-hidden shadow-lg"
        itemScope
        itemType="https://schema.org/Article"
      >
        <details className="group">
          <summary className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors duration-200 cursor-pointer text-left list-none">
            <h2 
              className="text-lg sm:text-xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors"
              itemProp="headline"
            >
              Methodology
            </h2>
            <svg 
              className="w-6 h-6 text-cyan-400 transform transition-transform duration-200 flex-shrink-0 ml-3 group-open:rotate-180"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-4" itemProp="articleBody">
            <p className="text-slate-300 leading-relaxed">
              Return Consistency is calculated using official <strong>FPL match history data</strong>.
              A return is counted when a player scores <strong>5+ points</strong> in a gameweek.
              <strong> Consistency Score</strong> summarizes return frequency and points volatility.
              This tool analyzes past performance only and <strong>does not predict future returns</strong>.
            </p>
          </div>
        </details>
      </section>

      {/* Main FPL Viewer Component */}
      <FPLViewer initialData={playerMetrics} />

      {/* Footer */}
      <footer 
        className="mt-12 text-center px-4"
        role="contentinfo"
        itemScope
        itemType="https://schema.org/WPFooter"
      >
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-200 mb-3">About Return Consistency</h3>
          <div className="text-slate-400 text-sm leading-relaxed max-w-4xl mx-auto space-y-3 text-left sm:text-center">
            <p>
              <strong>What is Return Consistency?</strong> Return Consistency measures how reliably a player delivers FPL points, not just their ceiling. 
              A "return" is any match where a player scores <strong>5+ FPL points</strong> (the threshold used by this tool for meaningful fantasy contribution). 
              A "blank" is <strong>0-2 points</strong> (per Premier League glossary: "blanked" = failed to return more than appearance points). 
              A "haul" is <strong>10+ points</strong> (double-digit games, useful for upside measurement).
            </p>
            <p>
              <strong>How is the Consistency Score calculated?</strong> The score (0-100) is a percentile-based composite with three weighted components:
            </p>
            <ul className="text-left max-w-2xl mx-auto space-y-2 pl-4 list-disc list-inside">
              <li><strong>55%</strong> - Return Rate: % of appearances with 5+ points, using <em>plus-four smoothing</em> (x+2)/(n+4) to stabilize small-sample estimates (Agresti-Caffo method).</li>
              <li><strong>25%</strong> - Low Volatility: Inverse of points standard deviation (SD). Lower SD = more predictable scoring week-to-week.</li>
              <li><strong>20%</strong> - Low Blanks: Inverse of blank rate (0-2 point games). Lower blank rate = more reliable floor.</li>
            </ul>
            <p>
              Players with fewer than 6 appearances are excluded from percentile calculation and assigned a score of 0 (marked "Low sample").
              All metrics use <strong>appearances only</strong> (matches with minutes &gt; 0), not the full fixture list.
            </p>
          </div>
        </div>
        <div className="text-slate-500 text-xs">
          <p>✨ Data based on FPL match performance • Definitions: 5+ returns (tool threshold), blanks ≤2 (Premier League glossary), hauls 10+</p>
        </div>
        
        {/* Developer Credits */}
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="flex flex-col items-center gap-3 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">by</span>
              <span className="font-semibold text-blue-400">Mostafa Elbesh</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <a 
                href="https://github.com/mostafaALBASH" 
                target="_blank" 
                rel="noopener noreferrer author" 
                className="flex items-center gap-1.5 hover:text-blue-400 transition-colors duration-200"
                itemProp="url"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>mostafaALBASH</span>
              </a>
              <span className="text-slate-600">•</span>
              <a 
                href="mailto:mosteloy@gmail.com" 
                className="flex items-center gap-1.5 hover:text-blue-400 transition-colors duration-200"
                itemProp="email"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>mosteloy@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
