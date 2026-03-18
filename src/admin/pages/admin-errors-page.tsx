/**
 * AdminErrorsPage — list of captured JS errors with filtering and deduplication
 */

import { useState } from 'react';
import { useAdminStore } from '../store/admin-store';
import { ErrorEntry } from '../components/error-entry';
import type { ErrorSeverity } from '../types/admin-types';

type FilterSeverity = 'todas' | ErrorSeverity;

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

  const filtered = filter === 'todas' ? errors : errors.filter((e) => e.severity === filter);

  const countBySeverity = (severity: ErrorSeverity) =>
    errors.filter((e) => e.severity === severity).length;

  function handleDelete(id: string) {
    removeError(id);
  }

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
