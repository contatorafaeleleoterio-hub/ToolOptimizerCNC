/**
 * AdminErrorsPage — list of captured JS errors with filtering and deduplication
 */

import { useState } from 'react';
import { useAdminStore } from '../store/admin-store';
import { ErrorEntry } from '../components/error-entry';
import type { ErrorSeverity } from '../types/admin-types';

type FilterSeverity = 'todas' | ErrorSeverity;
type SortOption = 'latest' | 'oldest' | 'count_desc' | 'severity_desc';

const SEVERITY_RANK: Record<ErrorSeverity, number> = {
  fatal: 3,
  error: 2,
  warning: 1,
};

const SEVERITY_TABS: { key: FilterSeverity; label: string }[] = [
  { key: 'todas',   label: 'Todas'   },
  { key: 'fatal',   label: 'Fatal'   },
  { key: 'error',   label: 'Error'   },
  { key: 'warning', label: 'Warning' },
];

export default function AdminErrorsPage() {
  const errors = useAdminStore((s) => s.errors);
  const clearErrors = useAdminStore((s) => s.clearErrors);
  const removeError = useAdminStore((s) => s.removeError);

  const [filter, setFilter] = useState<FilterSeverity>('todas');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  const filtered = errors
    .filter((e) => filter === 'todas' || e.severity === filter)
    .filter((e) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return e.message.toLowerCase().includes(q) || (e.source?.toLowerCase().includes(q) ?? false);
    })
    .sort((a, b) => {
      if (sortBy === 'oldest') return a.lastSeenAt.localeCompare(b.lastSeenAt);
      if (sortBy === 'count_desc') {
        const byCount = b.count - a.count;
        if (byCount !== 0) return byCount;
      }
      if (sortBy === 'severity_desc') {
        const bySeverity = SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity];
        if (bySeverity !== 0) return bySeverity;
      }
      return b.lastSeenAt.localeCompare(a.lastSeenAt);
    });

  const countBySeverity = (severity: ErrorSeverity) =>
    errors.filter((e) => e.severity === severity).length;

  function handleDelete(id: string) {
    removeError(id);
  }

  function removeFiltered() {
    filtered.forEach((entry) => removeError(entry.id));
  }

  const hasActiveFilters = filter !== 'todas' || Boolean(search.trim());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Error Tracking
            {errors.length > 0 && (
              <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                {errors.length}
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Erros JavaScript capturados automaticamente</p>
        </div>
        {errors.length > 0 && (
          <button
            onClick={clearErrors}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 bg-white/5 border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-colors"
          >
            <span className="material-symbols-outlined text-base">delete_sweep</span>
            Limpar Tudo
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-56">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base text-gray-600 pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar por mensagem ou source..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-cyan-500/40"
          />
        </div>

        <select
          aria-label="Ordenar erros"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-cyan-500/40"
        >
          <option value="latest" className="bg-[#0F1419]">Mais recentes</option>
          <option value="oldest" className="bg-[#0F1419]">Mais antigos</option>
          <option value="count_desc" className="bg-[#0F1419]">Mais repetidos</option>
          <option value="severity_desc" className="bg-[#0F1419]">Maior severidade</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={() => { setFilter('todas'); setSearch(''); }}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Severity filter tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/3 border border-white/8 w-fit">
        {SEVERITY_TABS.map(({ key, label }) => {
          const count = key === 'todas' ? errors.length : countBySeverity(key);
          const active = filter === key;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                active
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {label}
              <span
                className={`inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[10px] font-bold ${
                  active ? 'bg-white/15 text-white' : 'bg-white/6 text-gray-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length > 0 && (
        <div className="flex items-center justify-between gap-3 flex-wrap rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2">
          <p className="text-xs text-gray-400">
            Exibindo {filtered.length} de {errors.length} erros.
          </p>
          <button
            onClick={removeFiltered}
            className="text-xs px-2.5 py-1 rounded-md border border-rose-500/30 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 transition-colors"
          >
            Remover filtrados
          </button>
        </div>
      )}

      {/* Error list */}
      {errors.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
          <span className="material-symbols-outlined text-4xl text-green-500/50">check_circle</span>
          <p className="text-gray-400 font-semibold">Nenhum erro capturado</p>
          <p className="text-sm text-gray-600">Os erros JavaScript aparecem aqui automaticamente.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 gap-2 text-center">
          <p className="text-gray-500 text-sm">Nenhum erro com severidade "{filter}".</p>
          <button
            onClick={() => setFilter('todas')}
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Ver todos
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((entry) => (
            <ErrorEntry key={entry.id} entry={entry} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
