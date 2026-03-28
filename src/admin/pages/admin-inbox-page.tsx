/**
 * AdminInboxPage — Bug report inbox with status/severity filters
 */

import { useState } from 'react';
import { useAdminStore } from '../store/admin-store';
import type { BugSeverity, BugStatus } from '../types/admin-types';
import { BugReportCard } from '../components/bug-report-card';

type SortOption = 'newest' | 'oldest' | 'severity_desc';

const SEVERITY_RANK: Record<BugSeverity, number> = {
  critica: 4,
  alta: 3,
  media: 2,
  baixa: 1,
};

const STATUS_FILTERS: { value: BugStatus | 'todos'; label: string }[] = [
  { value: 'todos',     label: 'Todos' },
  { value: 'novo',      label: 'Novos' },
  { value: 'lido',      label: 'Lidos' },
  { value: 'resolvido', label: 'Resolvidos' },
  { value: 'ignorado',  label: 'Ignorados' },
];

const SEVERITY_OPTIONS: { value: BugSeverity | 'todas'; label: string }[] = [
  { value: 'todas',   label: 'Qualquer severidade' },
  { value: 'critica', label: 'Crítica' },
  { value: 'alta',    label: 'Alta' },
  { value: 'media',   label: 'Média' },
  { value: 'baixa',   label: 'Baixa' },
];

export default function AdminInboxPage() {
  const { bugs, updateBugStatus, removeBugReport } = useAdminStore();

  const [statusFilter, setStatusFilter]     = useState<BugStatus | 'todos'>('todos');
  const [severityFilter, setSeverityFilter] = useState<BugSeverity | 'todas'>('todas');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filtered = bugs
    .filter((b) => statusFilter   === 'todos' || b.status   === statusFilter)
    .filter((b) => severityFilter === 'todas' || b.severity === severityFilter)
    .filter((b) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return b.description.toLowerCase().includes(q) || b.version.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortBy === 'oldest') return a.createdAt.localeCompare(b.createdAt);
      if (sortBy === 'severity_desc') {
        const bySeverity = SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity];
        if (bySeverity !== 0) return bySeverity;
      }
      return b.createdAt.localeCompare(a.createdAt);
    });

  const countByStatus = (s: BugStatus | 'todos') =>
    s === 'todos' ? bugs.length : bugs.filter((b) => b.status === s).length;

  const newCount       = countByStatus('novo');
  const hasActiveFilters = statusFilter !== 'todos' || severityFilter !== 'todas' || Boolean(search.trim());

  const markFilteredAsRead = () => {
    filtered.forEach((bug) => {
      if (bug.status !== 'novo') return;
      updateBugStatus(bug.id, 'lido');
    });
  };

  const resolveFiltered = () => {
    filtered.forEach((bug) => {
      if (bug.status === 'resolvido' || bug.status === 'ignorado') return;
      updateBugStatus(bug.id, 'resolvido');
    });
  };

  const ignoreFiltered = () => {
    filtered.forEach((bug) => {
      if (bug.status === 'ignorado') return;
      updateBugStatus(bug.id, 'ignorado');
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          Inbox de Bugs
          {newCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
              {newCount}
            </span>
          )}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">Bug reports enviados pelos usuários</p>
      </div>

      {/* Status filter tabs */}
      <div className="flex items-center gap-1 flex-wrap">
        {STATUS_FILTERS.map(({ value, label }) => {
          const count  = countByStatus(value);
          const active = statusFilter === value;
          return (
            <button
              key={value}
              onClick={() => setStatusFilter(value)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
                ${active
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/8 hover:bg-white/8 hover:text-gray-300'
                }
              `}
            >
              {label}
              <span className={`
                inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold
                ${active ? 'bg-cyan-500/30 text-cyan-200' : 'bg-white/10 text-gray-500'}
              `}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Severity filter + clear */}
      <div className="flex items-center gap-3 flex-wrap">
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value as BugSeverity | 'todas')}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-cyan-500/40"
        >
          {SEVERITY_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value} className="bg-[#0F1419]">{label}</option>
          ))}
        </select>

        <div className="relative flex-1 min-w-48">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base text-gray-600 pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar por descrição ou versão..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-cyan-500/40"
          />
        </div>

        <select
          aria-label="Ordenar bugs"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-cyan-500/40"
        >
          <option value="newest" className="bg-[#0F1419]">Mais recentes</option>
          <option value="oldest" className="bg-[#0F1419]">Mais antigos</option>
          <option value="severity_desc" className="bg-[#0F1419]">Maior severidade</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={() => { setStatusFilter('todos'); setSeverityFilter('todas'); setSearch(''); }}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {filtered.length > 0 && (
        <div className="flex items-center justify-between gap-3 flex-wrap rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2">
          <p className="text-xs text-gray-400">
            Exibindo {filtered.length} de {bugs.length} bugs.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={markFilteredAsRead}
              className="text-xs px-2.5 py-1 rounded-md border border-cyan-500/30 bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 transition-colors"
            >
              Marcar filtrados como lido
            </button>
            <button
              onClick={resolveFiltered}
              className="text-xs px-2.5 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition-colors"
            >
              Resolver filtrados
            </button>
            <button
              onClick={ignoreFiltered}
              className="text-xs px-2.5 py-1 rounded-md border border-amber-500/30 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 transition-colors"
            >
              Ignorar filtrados
            </button>
          </div>
        </div>
      )}

      {/* Bug list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <span className="material-symbols-outlined text-4xl text-gray-700">inbox</span>
          <p className="text-gray-500 text-sm font-medium">
            {bugs.length === 0
              ? 'Nenhum bug report recebido ainda.'
              : 'Nenhum bug encontrado com estes filtros.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((bug) => (
            <BugReportCard
              key={bug.id}
              bug={bug}
              onStatusChange={updateBugStatus}
              onDelete={removeBugReport}
            />
          ))}
        </div>
      )}
    </div>
  );
}
