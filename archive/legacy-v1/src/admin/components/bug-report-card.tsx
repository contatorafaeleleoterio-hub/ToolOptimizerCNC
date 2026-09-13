/**
 * BugReportCard — displays a single BugReport with status actions and collapsible app state
 */

import { useState } from 'react';
import type { BugReport, BugStatus } from '../types/admin-types';
import { StatusBadge } from './status-badge';
import { formatRelativeDate } from '../utils/format-admin';

interface Props {
  bug: BugReport;
  onStatusChange: (id: string, status: BugStatus) => void;
  onDelete: (id: string) => void;
}

const STATUS_NEXT: Record<BugStatus, BugStatus | null> = {
  novo: 'lido',
  lido: 'resolvido',
  resolvido: null,
  ignorado: null,
};

const STATUS_NEXT_LABEL: Record<BugStatus, string> = {
  novo: 'Marcar como Lido',
  lido: 'Resolver',
  resolvido: '',
  ignorado: '',
};

const STATUS_NEXT_ICON: Record<BugStatus, string> = {
  novo: 'mark_email_read',
  lido: 'check_circle',
  resolvido: '',
  ignorado: '',
};

export function BugReportCard({ bug, onStatusChange, onDelete }: Props) {
  const [appStateOpen, setAppStateOpen] = useState(false);
  const nextStatus = STATUS_NEXT[bug.status];
  const canIgnore = bug.status !== 'ignorado' && bug.status !== 'resolvido';

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/7 transition-colors">
      {/* Top row: badges + actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge variant={bug.status} />
          <StatusBadge variant={bug.severity} />
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {nextStatus && (
            <button
              onClick={() => onStatusChange(bug.id, nextStatus)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
              title={STATUS_NEXT_LABEL[bug.status]}
            >
              <span className="material-symbols-outlined text-sm">
                {STATUS_NEXT_ICON[bug.status]}
              </span>
              {STATUS_NEXT_LABEL[bug.status]}
            </button>
          )}
          {canIgnore && (
            <button
              onClick={() => onStatusChange(bug.id, 'ignorado')}
              className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors"
              aria-label="Ignorar bug"
              title="Ignorar"
            >
              <span className="material-symbols-outlined text-base">visibility_off</span>
            </button>
          )}
          <button
            onClick={() => onDelete(bug.id)}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            aria-label="Remover bug report"
          >
            <span className="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-200 leading-relaxed">
        {bug.description || '(sem descrição)'}
      </p>

      {/* App state collapsible */}
      {bug.appState && (
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setAppStateOpen((o) => !o)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors w-fit"
            aria-label={appStateOpen ? 'Ocultar estado da aplicação' : 'Ver estado da aplicação'}
          >
            <span className="material-symbols-outlined text-sm">
              {appStateOpen ? 'expand_less' : 'expand_more'}
            </span>
            Estado da aplicação
          </button>
          {appStateOpen && (
            <pre className="text-[10px] text-gray-500 bg-black/30 rounded-lg p-3 overflow-x-auto max-h-48 leading-relaxed">
              {bug.appState}
            </pre>
          )}
        </div>
      )}

      {/* Footer: version + date */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
        <span className="text-[10px] text-gray-600 font-mono">v{bug.version}</span>
        <span className="text-[11px] text-gray-600" title={bug.createdAt}>
          {formatRelativeDate(bug.createdAt)}
        </span>
      </div>
    </div>
  );
}
