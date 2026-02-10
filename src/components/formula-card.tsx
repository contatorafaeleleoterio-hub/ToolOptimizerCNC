/**
 * FormulaCard — Educational component showing CNC formulas with real values
 *
 * Each card is expandable and shows:
 * - The formula in symbolic form
 * - Real values substituted (highlighted)
 * - A context bar showing where the value sits in the range
 * - A practical tip for the operator
 */

import { useState } from 'react';

interface FormulaCardProps {
  title: string;
  icon: string;
  resultValue: string;
  resultUnit: string;
  formula: React.ReactNode;
  substitution: React.ReactNode;
  variables: { symbol: string; value: string; description: string }[];
  contextBar?: { value: number; min: number; max: number; label: string; color: string };
  tip: string;
}

export function FormulaCard({
  title, icon, resultValue, resultUnit, formula, substitution,
  variables, contextBar, tip,
}: FormulaCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden shadow-glass transition-all duration-300">
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
        aria-expanded={expanded}
        aria-label={`${expanded ? 'Recolher' : 'Expandir'} fórmula: ${title}`}
      >
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary text-sm">{icon}</span>
        </div>
        <div className="flex-1 text-left">
          <span className="text-xs font-bold text-white uppercase tracking-wider">{title}</span>
        </div>
        <div className="flex items-baseline gap-1 mr-3">
          <span className="text-lg font-mono font-bold text-white">{resultValue}</span>
          <span className="text-[10px] text-gray-400 font-bold">{resultUnit}</span>
        </div>
        <span className={`material-symbols-outlined text-gray-400 text-sm transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-white/5 px-4 py-4 space-y-4 animate-in">
          {/* Label */}
          <div className="flex items-center gap-2 text-[10px] text-primary/70 font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-xs">school</span>
            Como é Calculado
          </div>

          {/* Formula display */}
          <div className="bg-black/40 rounded-lg border border-white/5 px-4 py-3 font-mono text-sm text-center space-y-1">
            <div className="text-gray-300">{formula}</div>
            <div className="text-primary">{substitution}</div>
          </div>

          {/* Variables legend */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {variables.map((v) => (
              <div key={v.symbol} className="flex items-baseline gap-2 text-xs">
                <span className="font-mono font-bold text-primary">{v.symbol}</span>
                <span className="text-gray-500">=</span>
                <span className="font-mono text-white">{v.value}</span>
                <span className="text-gray-500 text-[10px] truncate">({v.description})</span>
              </div>
            ))}
          </div>

          {/* Context bar */}
          {contextBar && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>{contextBar.min}</span>
                <span>{contextBar.label}</span>
                <span>{contextBar.max.toLocaleString('en-US')}</span>
              </div>
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(Math.max(((contextBar.value - contextBar.min) / (contextBar.max - contextBar.min)) * 100, 0), 100)}%`,
                    backgroundColor: contextBar.color,
                    boxShadow: `0 0 8px ${contextBar.color}`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Practical tip */}
          <div className="flex items-start gap-2 bg-primary/5 border border-primary/10 rounded-lg px-3 py-2">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">lightbulb</span>
            <span className="text-xs text-gray-300 leading-relaxed">{tip}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Fraction renderer helper ─────────────────────────────────────────────────
export function Fraction({ num, den }: { num: React.ReactNode; den: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center mx-1 align-middle">
      <span className="border-b border-gray-500 px-1 leading-tight">{num}</span>
      <span className="px-1 leading-tight">{den}</span>
    </span>
  );
}
