/**
 * ErrorEntry — displays a single captured JS error with collapsible stack trace
 */

import { useState } from 'react';
import type { ErrorEntry as ErrorEntryType } from '../types/admin-types';
import { StatusBadge } from './status-badge';
import { formatRelativeDate } from '../utils/format-admin';

interface Props {
  entry: ErrorEntryType;
  onDelete: (id: string) => void;
}

export function ErrorEntry({ entry, onDelete }: Props) {
  const [stackOpen, setStackOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/7 transition-colors">
      {/* Top row: severity badge + count + actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge variant={entry.severity} />
          {entry.count > 1 && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/8 text-gray-300 border border-white/10">
              <span className="material-symbols-outlined text-xs">repeat</span>
              {entry.count}×
            </span>
          )}
        </div>
        <button
          onClick={() => onDelete(entry.id)}
          className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
          aria-label="Remover erro"
        >
          <span className="material-symbols-outlined text-base">delete</span>
        </button>
      </div>

      {/* Error message */}
      <p className="text-sm text-gray-200 leading-relaxed font-mono break-all">
        {entry.message}
      </p>

      {/* Source */}
      {entry.source && (
        <p className="text-[11px] text-gray-500 font-mono break-all">{entry.source}</p>
      )}

      {/* Stack trace collapsible */}
      {entry.stack && (
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setStackOpen((o) => !o)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors w-fit"
            aria-label={stackOpen ? 'Ocultar stack trace' : 'Ver stack trace'}
          >
            <span className="material-symbols-outlined text-sm">
              {stackOpen ? 'expand_less' : 'expand_more'}
            </span>
            Stack trace
          </button>
          {stackOpen && (
            <pre className="text-[10px] text-gray-500 bg-black/30 rounded-lg p-3 overflow-x-auto max-h-48 leading-relaxed whitespace-pre-wrap">
              {entry.stack}
            </pre>
          )}
        </div>
      )}

      {/* Footer: first seen / last seen */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
        <span className="text-[11px] text-gray-600">
          1ª vez: <span title={entry.firstSeenAt}>{formatRelativeDate(entry.firstSeenAt)}</span>
        </span>
        {entry.count > 1 && (
          <span className="text-[11px] text-gray-600">
            última: <span title={entry.lastSeenAt}>{formatRelativeDate(entry.lastSeenAt)}</span>
          </span>
        )}
      </div>
    </div>
  );
}
