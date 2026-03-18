/**
 * AdminChangelogPage — visual version history
 * Shows all releases from newest to oldest with categorized change items.
 */

import { useState } from 'react';
import { CHANGELOG } from '../data/changelog-data';
import type { ChangelogTag } from '../data/changelog-data';

// ── Tag config ────────────────────────────────────────────────────────────────

const TAG_CONFIG: Record<ChangelogTag, { label: string; color: string; icon: string }> = {
  feat:     { label: 'Feature',   color: '#00D9FF', icon: 'star' },
  fix:      { label: 'Fix',       color: '#39FF14', icon: 'bug_report' },
  infra:    { label: 'Infra',     color: '#a78bfa', icon: 'construction' },
  docs:     { label: 'Docs',      color: '#f39c12', icon: 'description' },
  security: { label: 'Security',  color: '#e74c3c', icon: 'security' },
  polish:   { label: 'Polish',    color: '#f472b6', icon: 'auto_awesome' },
};

// ── Version card ──────────────────────────────────────────────────────────────

interface VersionCardProps {
  entry: (typeof CHANGELOG)[number];
  isLatest: boolean;
}

function VersionCard({ entry, isLatest }: VersionCardProps) {
  const tag = TAG_CONFIG[entry.tag];
  const formattedDate = new Date(entry.date + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center shrink-0" style={{ width: 32 }}>
        <div
          className="w-3 h-3 rounded-full shrink-0 mt-1"
          style={{ backgroundColor: tag.color, boxShadow: `0 0 8px ${tag.color}66` }}
        />
        <div className="w-px flex-1 mt-1" style={{ backgroundColor: '#ffffff12' }} />
      </div>
      <div className="flex-1 pb-6">
        <div className="rounded-xl bg-white/4 border border-white/8 p-5 space-y-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-base font-bold text-white">v{entry.version}</span>
              {isLatest && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  Atual
                </span>
              )}
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{ color: tag.color, backgroundColor: tag.color + '18' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>
                  {tag.icon}
                </span>
                {tag.label}
              </span>
            </div>
            <span className="text-xs text-gray-600 shrink-0">{formattedDate}</span>
          </div>
          <p className="text-sm font-semibold text-gray-200">{entry.title}</p>
          <ul className="space-y-1">
            {entry.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                <span
                  className="material-symbols-outlined shrink-0 mt-0.5"
                  style={{ fontSize: 12, color: tag.color + 'aa' }}
                >
                  chevron_right
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const ALL_TAGS: ChangelogTag[] = ['feat', 'fix', 'infra', 'docs', 'security', 'polish'];

export default function AdminChangelogPage() {
  const [activeTag, setActiveTag] = useState<ChangelogTag | 'all'>('all');

  const filtered = activeTag === 'all'
    ? CHANGELOG
    : CHANGELOG.filter((e) => e.tag === activeTag);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Changelog</h1>
        <p className="text-sm text-gray-500 mt-1">
          Histórico completo de versões — {CHANGELOG.length} releases.
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setActiveTag('all')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
            activeTag === 'all'
              ? 'bg-white/12 text-white border border-white/20'
              : 'text-gray-500 hover:text-gray-300 border border-transparent hover:border-white/10'
          }`}
        >
          Todos ({CHANGELOG.length})
        </button>
        {ALL_TAGS.map((tag) => {
          const cfg = TAG_CONFIG[tag];
          const count = CHANGELOG.filter((e) => e.tag === tag).length;
          if (count === 0) return null;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                activeTag === tag
                  ? 'border'
                  : 'text-gray-500 hover:text-gray-300 border border-transparent hover:border-white/10'
              }`}
              style={
                activeTag === tag
                  ? { color: cfg.color, backgroundColor: cfg.color + '15', borderColor: cfg.color + '40' }
                  : {}
              }
            >
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 gap-2 text-center">
          <p className="text-gray-500 text-sm">Nenhuma versão encontrada para este filtro.</p>
        </div>
      ) : (
        <div>
          {filtered.map((entry, i) => (
            <VersionCard key={entry.version} entry={entry} isLatest={i === 0 && activeTag === 'all'} />
          ))}
        </div>
      )}
    </div>
  );
}
