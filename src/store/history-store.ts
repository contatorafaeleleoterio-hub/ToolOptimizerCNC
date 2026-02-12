/**
 * History Store - Tracks calculation history with operator feedback
 * Persisted to localStorage via Zustand persist middleware
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HistoricoCalculo, FeedbackOperador } from '@/types/index';
import { TipoUsinagem, HISTORICO_MAX_ENTRIES } from '@/types/index';

interface HistoryFilters {
  materialNome: string;
  tipoOperacao: TipoUsinagem | 'todos';
  feedback: FeedbackOperador | 'todos';
}

interface HistoryState {
  entries: HistoricoCalculo[];
  filters: HistoryFilters;
}

interface HistoryActions {
  addEntry: (entry: Omit<HistoricoCalculo, 'id' | 'timestamp' | 'feedback' | 'notas'>) => void;
  removeEntry: (id: string) => void;
  clearHistory: () => void;
  setFeedback: (id: string, feedback: FeedbackOperador) => void;
  setNotas: (id: string, notas: string) => void;
  setFilters: (f: Partial<HistoryFilters>) => void;
  resetFilters: () => void;
  getFilteredEntries: () => HistoricoCalculo[];
  exportHistory: () => string;
  importHistory: (json: string) => boolean;
}

const DEFAULT_FILTERS: HistoryFilters = {
  materialNome: '',
  tipoOperacao: 'todos',
  feedback: 'todos',
};

/** Generate a short unique ID based on timestamp + random suffix */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useHistoryStore = create<HistoryState & HistoryActions>()(
  persist(
    (set, get) => ({
      entries: [],
      filters: { ...DEFAULT_FILTERS },

      addEntry: (entry) => {
        const newEntry: HistoricoCalculo = {
          ...entry,
          id: generateId(),
          timestamp: Date.now(),
          feedback: null,
          notas: '',
        };
        set((state) => {
          const updated = [newEntry, ...state.entries];
          // Circular buffer: keep only the latest N entries
          if (updated.length > HISTORICO_MAX_ENTRIES) {
            updated.length = HISTORICO_MAX_ENTRIES;
          }
          return { entries: updated };
        });
      },

      removeEntry: (id) => {
        set((state) => ({ entries: state.entries.filter((e) => e.id !== id) }));
      },

      clearHistory: () => {
        set({ entries: [] });
      },

      setFeedback: (id, feedback) => {
        set((state) => ({
          entries: state.entries.map((e) => e.id === id ? { ...e, feedback } : e),
        }));
      },

      setNotas: (id, notas) => {
        set((state) => ({
          entries: state.entries.map((e) => e.id === id ? { ...e, notas } : e),
        }));
      },

      setFilters: (f) => {
        set((state) => ({ filters: { ...state.filters, ...f } }));
      },

      resetFilters: () => {
        set({ filters: { ...DEFAULT_FILTERS } });
      },

      getFilteredEntries: () => {
        const { entries, filters } = get();
        return entries.filter((e) => {
          if (filters.materialNome && !e.materialNome.toLowerCase().includes(filters.materialNome.toLowerCase())) {
            return false;
          }
          if (filters.tipoOperacao !== 'todos' && e.tipoOperacao !== filters.tipoOperacao) {
            return false;
          }
          if (filters.feedback !== 'todos' && e.feedback !== filters.feedback) {
            return false;
          }
          return true;
        });
      },

      exportHistory: () => {
        return JSON.stringify({ version: 1, entries: get().entries }, null, 2);
      },

      importHistory: (json) => {
        try {
          const data = JSON.parse(json);
          if (!data || !Array.isArray(data.entries)) return false;
          set({ entries: data.entries.slice(0, HISTORICO_MAX_ENTRIES) });
          return true;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'tooloptimizer-cnc-history',
      version: 1,
    },
  ),
);
