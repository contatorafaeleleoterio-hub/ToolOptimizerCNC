/**
 * Usage Store — tracks simulation events for admin usage stats
 * Persisted to localStorage under key 'tooloptimizer-usage'
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UsageEvent, UsageSummary } from '../types/admin-types';

const MAX_EVENTS = 1000;

interface UsageState {
  events: UsageEvent[];
}

interface UsageActions {
  trackUsage: (event: Omit<UsageEvent, 'timestamp'>) => void;
  clearUsage: () => void;
  getTotalSimulations: () => number;
  getTodayCount: () => number;
  getTopMaterials: (n?: number) => UsageSummary[];
  getTopOperacoes: (n?: number) => UsageSummary[];
  getTopFerramentas: (n?: number) => UsageSummary[];
}

function topN(labels: string[], n: number): UsageSummary[] {
  const freq: Record<string, number> = {};
  for (const label of labels) freq[label] = (freq[label] ?? 0) + 1;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([label, count]) => ({ label, count }));
}

export const useUsageStore = create<UsageState & UsageActions>()(
  persist(
    (set, get) => ({
      events: [],

      trackUsage: (event) => {
        const entry: UsageEvent = { ...event, timestamp: new Date().toISOString() };
        set((s) => ({ events: [entry, ...s.events].slice(0, MAX_EVENTS) }));
      },

      clearUsage: () => set({ events: [] }),

      getTotalSimulations: () => get().events.length,

      getTodayCount: () => {
        const today = new Date().toISOString().slice(0, 10);
        return get().events.filter((e) => e.timestamp.startsWith(today)).length;
      },

      getTopMaterials: (n = 10) =>
        topN(get().events.map((e) => e.materialNome), n),

      getTopOperacoes: (n = 10) =>
        topN(get().events.map((e) => e.tipoOperacao), n),

      getTopFerramentas: (n = 10) =>
        topN(
          get().events.map((e) => `${e.ferramentaTipo} ∅${e.ferramentaDiametro}mm`),
          n,
        ),
    }),
    {
      name: 'tooloptimizer-usage',
      version: 1,
    },
  ),
);
