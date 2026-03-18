/**
 * AdminUsagePage — simulation usage statistics with bar charts
 * Shows top materials, operations, and tools used across all simulations
 */

import { useMemo } from 'react';
import { useUsageStore } from '../store/usage-store';
import { MiniChart } from '../components/mini-chart';
import type { UsageSummary } from '../types/admin-types';

const CHART_COLOR_MATERIAL = '#00D9FF'; // cyan neon
const CHART_COLOR_OPERACAO = '#39FF14'; // green neon
const CHART_COLOR_FERRAMENTA = '#a78bfa'; // purple

function topN(labels: string[], n: number): UsageSummary[] {
  const freq: Record<string, number> = {};
  for (const label of labels) freq[label] = (freq[label] ?? 0) + 1;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([label, count]) => ({ label, count }));
}

export default function AdminUsagePage() {
  // Select only stable primitives/references — avoids infinite loop from derived arrays
  const events = useUsageStore((s) => s.events);
  const clearUsage = useUsageStore((s) => s.clearUsage);

  const total = events.length;

  const today = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    return events.filter((e) => e.timestamp.startsWith(todayStr)).length;
  }, [events]);

  const topMaterials = useMemo(
    () => topN(events.map((e) => e.materialNome), 10),
    [events],
  );

  const topOperacoes = useMemo(
    () => topN(events.map((e) => e.tipoOperacao), 10),
    [events],
  );

  const topFerramentas = useMemo(
    () => topN(events.map((e) => `${e.ferramentaTipo} ∅${e.ferramentaDiametro}mm`), 10),
    [events],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Estatísticas de Uso</h1>
          <p className="text-sm text-gray-500 mt-1">Simulações realizadas pelos operadores</p>
        </div>
        {total > 0 && (
          <button
            onClick={clearUsage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 bg-white/5 border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-colors"
          >
            <span className="material-symbols-outlined text-base">delete_sweep</span>
            Limpar Histórico
          </button>
        )}
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-white/4 border border-white/8 p-4 flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-cyan-400">bar_chart</span>
          <div>
            <p className="text-2xl font-bold font-mono text-white">{total}</p>
            <p className="text-xs text-gray-500">Total de simulações</p>
          </div>
        </div>
        <div className="rounded-xl bg-white/4 border border-white/8 p-4 flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-green-400">today</span>
          <div>
            <p className="text-2xl font-bold font-mono text-white">{today}</p>
            <p className="text-xs text-gray-500">Simulações hoje</p>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {total === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
          <span className="material-symbols-outlined text-4xl text-gray-600">query_stats</span>
          <p className="text-gray-400 font-semibold">Nenhuma simulação registrada</p>
          <p className="text-sm text-gray-600">
            Os dados aparecem aqui após a primeira simulação no app.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* Top Materiais */}
          <section className="rounded-xl bg-white/4 border border-white/8 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-lg text-cyan-400">category</span>
              <h2 className="text-sm font-semibold text-gray-200">Top Materiais</h2>
              <span className="ml-auto text-xs text-gray-600">
                {topMaterials.length} material{topMaterials.length !== 1 ? 'is' : ''}
              </span>
            </div>
            <MiniChart data={topMaterials} color={CHART_COLOR_MATERIAL} />
          </section>

          {/* Top Operações */}
          <section className="rounded-xl bg-white/4 border border-white/8 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-lg text-green-400">settings</span>
              <h2 className="text-sm font-semibold text-gray-200">Top Operações</h2>
              <span className="ml-auto text-xs text-gray-600">
                {topOperacoes.length} operaç{topOperacoes.length !== 1 ? 'ões' : 'ão'}
              </span>
            </div>
            <MiniChart data={topOperacoes} color={CHART_COLOR_OPERACAO} />
          </section>

          {/* Top Ferramentas */}
          <section className="rounded-xl bg-white/4 border border-white/8 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-lg text-purple-400">hardware</span>
              <h2 className="text-sm font-semibold text-gray-200">Top Ferramentas</h2>
              <span className="ml-auto text-xs text-gray-600">
                {topFerramentas.length} configuração{topFerramentas.length !== 1 ? 'ões' : ''}
              </span>
            </div>
            <MiniChart data={topFerramentas} color={CHART_COLOR_FERRAMENTA} />
          </section>
        </div>
      )}
    </div>
  );
}
