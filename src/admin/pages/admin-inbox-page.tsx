/**
 * AdminInboxPage — Bug report inbox with status/severity filters
 */

import { useState } from 'react';
import { useAdminStore } from '../store/admin-store';
import type { BugSeverity, BugStatus } from '../types/admin-types';
import { BugReportCard } from '../components/bug-report-card';

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

  const filtered = bugs
    .filter((b) => statusFilter   === 'todos' || b.status   === statusFilter)
    .filter((b) => severityFilter === 'todas' || b.severity === severityFilter)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const countByStatus = (s: BugStatus | 'todos') =>
    s === 'todos' ? bugs.length : bugs.filter((b) => b.status === s).length;

  const newCount       = countByStatus('novo');
  const hasActiveFilters = statusFilter !== 'todos' || severityFilter !== 'todas';

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

        {hasActiveFilters && (
          <button
            onClick={() => { setStatusFilter('todos'); setSeverityFilter('todas'); }}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Limpar filtros
          </button>
        )}
      </div>

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
