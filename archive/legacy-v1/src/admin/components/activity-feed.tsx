/**
 * ActivityFeed — recent activity aggregated from all admin stores
 * Shows up to MAX_ENTRIES events sorted by timestamp descending
 */

import { useMemo } from 'react';
import { useAdminStore } from '../store/admin-store';
import { useUsageStore } from '../store/usage-store';
import type { AdminTask, BugReport, ErrorEntry, UsageEvent } from '../types/admin-types';

export interface ActivityEntry {
  id: string;
  type: 'bug' | 'task' | 'error' | 'simulation';
  title: string;
  subtitle: string;
  timestamp: string; // ISO date
}

const TYPE_CONFIG: Record<ActivityEntry['type'], { icon: string; color: string }> = {
  bug:        { icon: 'bug_report',  color: '#f59e0b' },
  task:       { icon: 'task_alt',    color: '#00D9FF' },
  error:      { icon: 'error',       color: '#ef4444' },
  simulation: { icon: 'play_circle', color: '#39FF14' },
};

const OP_LABELS: Record<string, string> = {
  desbaste:   'Desbaste',
  semi:       'Semi-acabamento',
  acabamento: 'Acabamento',
};

export const MAX_FEED_ENTRIES = 10;

/** Returns relative time string from an ISO date (e.g. "há 5min", "há 2h", "há 3d") */
export function relativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'agora';
  if (mins < 60) return `há ${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `há ${days}d`;
}

/** Pure function — builds sorted, limited feed from store data */
export function buildFeed(
  bugs: BugReport[],
  tasks: AdminTask[],
  errors: ErrorEntry[],
  events: UsageEvent[],
): ActivityEntry[] {
  const entries: ActivityEntry[] = [
    ...bugs.map((b) => ({
      id: `bug-${b.id}`,
      type: 'bug' as const,
      title: 'Bug reportado',
      subtitle: b.description.length > 60 ? b.description.slice(0, 60) + '…' : b.description,
      timestamp: b.createdAt,
    })),
    ...tasks.map((t) => ({
      id: `task-${t.id}`,
      type: 'task' as const,
      title: t.title,
      subtitle: `Status: ${t.status} · ${t.priority}`,
      timestamp: t.updatedAt,
    })),
    ...errors.map((e) => ({
      id: `error-${e.id}`,
      type: 'error' as const,
      title: e.message.length > 60 ? e.message.slice(0, 60) + '…' : e.message,
      subtitle: `${e.count}× capturado`,
      timestamp: e.lastSeenAt,
    })),
    ...events.slice(0, 20).map((ev, i) => ({
      id: `sim-${i}-${ev.timestamp}`,
      type: 'simulation' as const,
      title: `Simulação — ${ev.materialNome}`,
      subtitle: `${OP_LABELS[ev.tipoOperacao] ?? ev.tipoOperacao} · ∅${ev.ferramentaDiametro}mm`,
      timestamp: ev.timestamp,
    })),
  ];

  return entries
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, MAX_FEED_ENTRIES);
}

export function ActivityFeed() {
  const bugs   = useAdminStore((s) => s.bugs);
  const tasks  = useAdminStore((s) => s.tasks);
  const errors = useAdminStore((s) => s.errors);
  const events = useUsageStore((s) => s.events);

  const feed = useMemo(
    () => buildFeed(bugs, tasks, errors, events),
    [bugs, tasks, errors, events],
  );

  if (feed.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 rounded-xl border border-white/8 bg-white/3">
        <p className="text-sm text-gray-600">Nenhuma atividade registrada ainda.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/8 bg-white/3 overflow-hidden">
      {feed.map((entry, i) => {
        const cfg = TYPE_CONFIG[entry.type];
        return (
          <div
            key={entry.id}
            className={`flex items-start gap-3 px-4 py-3${i < feed.length - 1 ? ' border-b border-white/5' : ''}`}
          >
            {/* Icon badge */}
            <div
              className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: cfg.color + '18' }}
            >
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ color: cfg.color }}
              >
                {cfg.icon}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200 truncate">{entry.title}</p>
              <p className="text-xs text-gray-500 truncate mt-0.5">{entry.subtitle}</p>
            </div>

            {/* Relative time */}
            <span className="text-xs text-gray-600 shrink-0 font-mono mt-0.5">
              {relativeTime(entry.timestamp)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
