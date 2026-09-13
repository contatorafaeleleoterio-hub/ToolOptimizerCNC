/**
 * AdminFlagsPage — feature flags management
 * Toggle features on/off at runtime without code changes.
 */

import { useAdminStore } from '../store/admin-store';
import type { FeatureFlag } from '../types/admin-types';

// ── Flag row ──────────────────────────────────────────────────────────────────

interface FlagRowProps {
  flag: FeatureFlag;
  onToggle: (id: string, enabled: boolean) => void;
}

function FlagRow({ flag, onToggle }: FlagRowProps) {
  const updatedDate = new Date(flag.updatedAt).toLocaleDateString('pt-BR');

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/4 border border-white/8 hover:bg-white/6 transition-colors">
      {/* Icon */}
      <span
        className="material-symbols-outlined text-xl shrink-0"
        style={{ color: flag.enabled ? '#00D9FF' : '#4b5563' }}
      >
        {flag.enabled ? 'toggle_on' : 'toggle_off'}
      </span>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-white">{flag.name}</span>
          <span className="text-xs font-mono text-gray-600 truncate">{flag.id}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{flag.description}</p>
      </div>

      {/* Last updated */}
      <span className="text-xs text-gray-600 shrink-0 hidden sm:block">
        {updatedDate}
      </span>

      {/* Toggle button */}
      <button
        onClick={() => onToggle(flag.id, !flag.enabled)}
        aria-label={flag.enabled ? `Desativar ${flag.name}` : `Ativar ${flag.name}`}
        className={`
          relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none
          ${flag.enabled ? 'bg-cyan-500/30 border border-cyan-500/50' : 'bg-white/8 border border-white/15'}
        `}
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full transition-transform duration-200"
          style={{
            backgroundColor: flag.enabled ? '#00D9FF' : '#4b5563',
            transform: flag.enabled ? 'translateX(22px)' : 'translateX(2px)',
          }}
        />
      </button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AdminFlagsPage() {
  const flags = useAdminStore((s) => s.flags);
  const setFlag = useAdminStore((s) => s.setFlag);

  const enabledCount = flags.filter((f) => f.enabled).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">Feature Flags</h1>
          <p className="text-sm text-gray-500 mt-1">
            Ative ou desative funcionalidades em tempo real sem redeploy.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/4 border border-white/8">
          <span className="material-symbols-outlined text-base text-cyan-400">check_circle</span>
          <span className="text-sm font-mono text-white">{enabledCount}</span>
          <span className="text-xs text-gray-500">/ {flags.length} ativas</span>
        </div>
      </div>

      {/* Notice */}
      <div className="rounded-xl bg-yellow-500/8 border border-yellow-500/20 p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-base text-yellow-400 shrink-0 mt-0.5">
          info
        </span>
        <p className="text-xs text-yellow-300/80">
          As flags são salvas no localStorage deste navegador. Alterações não afetam outros
          usuários nem o ambiente de produção. Flags como{' '}
          <span className="font-mono">error_tracking</span> e{' '}
          <span className="font-mono">usage_tracking</span> exigem reload para surtir efeito.
        </p>
      </div>

      {/* Flag list */}
      {flags.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
          <span className="material-symbols-outlined text-4xl text-gray-600">flag</span>
          <p className="text-gray-400 font-semibold">Nenhuma flag configurada</p>
        </div>
      ) : (
        <div className="space-y-2">
          {flags.map((flag) => (
            <FlagRow key={flag.id} flag={flag} onToggle={setFlag} />
          ))}
        </div>
      )}
    </div>
  );
}
