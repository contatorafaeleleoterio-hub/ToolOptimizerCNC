/**
 * AdminHealthPage -- system health indicators
 * Checks localStorage, stores state, bundle info, and browser environment.
 */

import { useState, useEffect } from 'react';
import { useAdminStore } from '../store/admin-store';
import { useUsageStore } from '../store/usage-store';

// ── Health check types ────────────────────────────────────────────────────────

type HealthStatus = 'ok' | 'warn' | 'error' | 'checking';

interface HealthItem {
  id: string;
  label: string;
  description: string;
  status: HealthStatus;
  value?: string;
}

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<HealthStatus, { icon: string; color: string; label: string }> = {
  ok:       { icon: 'check_circle',      color: '#2ecc71', label: 'OK' },
  warn:     { icon: 'warning',           color: '#f39c12', label: 'Atenção' },
  error:    { icon: 'error',             color: '#e74c3c', label: 'Erro' },
  checking: { icon: 'progress_activity', color: '#6b7280', label: 'Verificando' },
};

// ── Check functions ───────────────────────────────────────────────────────────

function checkLocalStorage(): { status: HealthStatus; value: string } {
  try {
    const testKey = '__health_check__';
    localStorage.setItem(testKey, '1');
    const read = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    if (read !== '1') return { status: 'error', value: 'Leitura falhou' };
    let totalBytes = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) totalBytes += (localStorage.getItem(key) ?? '').length * 2;
    }
    const kb = Math.round(totalBytes / 1024);
    const warn = kb > 4000;
    return {
      status: warn ? 'warn' : 'ok',
      value: `${kb} KB usado${warn ? ' (perto do limite)' : ''}`,
    };
  } catch {
    return { status: 'error', value: 'Sem acesso ao localStorage' };
  }
}

function checkAdminStore(): { status: HealthStatus; value: string } {
  try {
    const s = useAdminStore.getState();
    const parts = [
      `${s.tasks.length} tarefa${s.tasks.length !== 1 ? 's' : ''}`,
      `${s.bugs.length} bug${s.bugs.length !== 1 ? 's' : ''}`,
      `${s.errors.length} erro${s.errors.length !== 1 ? 's' : ''}`,
      `${s.flags.length} flag${s.flags.length !== 1 ? 's' : ''}`,
    ];
    return { status: 'ok', value: parts.join(' · ') };
  } catch {
    return { status: 'error', value: 'Store inacessível' };
  }
}

function checkUsageStore(): { status: HealthStatus; value: string } {
  try {
    const events = useUsageStore.getState().events;
    return { status: 'ok', value: `${events.length} simulações registradas` };
  } catch {
    return { status: 'error', value: 'Store inacessível' };
  }
}

function checkBrowser(): { status: HealthStatus; value: string } {
  const ua = navigator.userAgent;
  const isEdge = /Edg\/(\d+)/.exec(ua);
  const isChrome = /Chrome\/(\d+)/.exec(ua);
  const isFirefox = /Firefox\/(\d+)/.exec(ua);
  const isSafari = /Safari\/(\d+)/.exec(ua) && !isChrome;
  if (isEdge) return { status: 'ok', value: `Edge ${isEdge[1]}` };
  if (isChrome) return { status: 'ok', value: `Chrome ${isChrome[1]}` };
  if (isFirefox) return { status: 'ok', value: `Firefox ${isFirefox[1]}` };
  if (isSafari) return { status: 'warn', value: 'Safari (layout não otimizado)' };
  return { status: 'warn', value: 'Navegador desconhecido' };
}

function checkScreenSize(): { status: HealthStatus; value: string } {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const value = `${w} × ${h} px`;
  if (w < 1360) return { status: 'warn', value: `${value} — abaixo do mínimo (1360px)` };
  return { status: 'ok', value };
}

// ── Health row ────────────────────────────────────────────────────────────────

function HealthRow({ item }: { item: HealthItem }) {
  const cfg = STATUS_CONFIG[item.status];
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/4 border border-white/8">
      <span
        className={`material-symbols-outlined text-xl shrink-0${item.status === 'checking' ? ' animate-spin' : ''}`}
        style={{ color: cfg.color }}
      >
        {cfg.icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-white">{item.label}</span>
          <span
            className="text-xs font-semibold px-1.5 py-0.5 rounded"
            style={{ color: cfg.color, backgroundColor: cfg.color + '18' }}
          >
            {cfg.label}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
        {item.value && (
          <p className="text-xs font-mono mt-1" style={{ color: cfg.color + 'cc' }}>
            {item.value}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const APP_VERSION = '0.7.0';
const BUILD_JS_GZIP = '~99 KB';
const BUILD_CSS_GZIP = '~14 KB';

const INITIAL_CHECKS: HealthItem[] = [
  { id: 'ls',      label: 'localStorage',     description: 'Leitura, escrita e uso estimado', status: 'checking' },
  { id: 'admin',   label: 'Admin Store',       description: 'Estado do store administrativo', status: 'checking' },
  { id: 'usage',   label: 'Usage Store',       description: 'Store de estatísticas de uso',   status: 'checking' },
  { id: 'browser', label: 'Navegador',         description: 'Compatibilidade do browser',      status: 'checking' },
  { id: 'screen',  label: 'Resolução de Tela', description: 'Mínimo recomendado: 1360px',      status: 'checking' },
];

export default function AdminHealthPage() {
  const [checks, setChecks] = useState<HealthItem[]>(INITIAL_CHECKS);
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  function runChecks() {
    setChecks([
      { id: 'ls',      label: 'localStorage',     description: 'Leitura, escrita e uso estimado', ...checkLocalStorage() },
      { id: 'admin',   label: 'Admin Store',       description: 'Estado do store administrativo', ...checkAdminStore() },
      { id: 'usage',   label: 'Usage Store',       description: 'Store de estatísticas de uso',   ...checkUsageStore() },
      { id: 'browser', label: 'Navegador',         description: 'Compatibilidade do browser',      ...checkBrowser() },
      { id: 'screen',  label: 'Resolução de Tela', description: 'Mínimo recomendado: 1360px',      ...checkScreenSize() },
    ]);
    setLastChecked(new Date().toLocaleTimeString('pt-BR'));
  }

  useEffect(() => { runChecks(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const errorCount = checks.filter((c) => c.status === 'error').length;
  const warnCount  = checks.filter((c) => c.status === 'warn').length;
  const okCount    = checks.filter((c) => c.status === 'ok').length;

  const overallStatus: HealthStatus =
    errorCount > 0 ? 'error' : warnCount > 0 ? 'warn' : 'ok';
  const overallCfg = STATUS_CONFIG[overallStatus];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">Saúde do Sistema</h1>
          <p className="text-sm text-gray-500 mt-1">
            Diagnóstico de armazenamento, stores e ambiente.
            {lastChecked && <span className="ml-1 text-gray-600">Verificado às {lastChecked}.</span>}
          </p>
        </div>
        <button
          onClick={runChecks}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
          aria-label="Verificar Agora"
        >
          <span className="material-symbols-outlined text-base">refresh</span>
          Verificar Agora
        </button>
      </div>

      <div
        className="rounded-xl p-4 flex items-center gap-3 border"
        style={{ backgroundColor: overallCfg.color + '10', borderColor: overallCfg.color + '30' }}
      >
        <span className="material-symbols-outlined text-2xl" style={{ color: overallCfg.color }}>
          {overallCfg.icon}
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: overallCfg.color }}>
            {overallStatus === 'ok' && 'Sistema saudável'}
            {overallStatus === 'warn' && `${warnCount} atenção${warnCount > 1 ? 'ões' : ''} — verifique os itens abaixo`}
            {overallStatus === 'error' && `${errorCount} erro${errorCount > 1 ? 's' : ''} detectado${errorCount > 1 ? 's' : ''}`}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {okCount} ok · {warnCount} atenção · {errorCount} erro
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {checks.map((item) => (
          <HealthRow key={item.id} item={item} />
        ))}
      </div>

      <section className="rounded-xl bg-white/4 border border-white/8 p-5 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-lg text-purple-400">info</span>
          <h2 className="text-sm font-semibold text-gray-200">Informações do App</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              { label: 'Versão',     value: APP_VERSION },
              { label: 'JS (gzip)', value: BUILD_JS_GZIP },
              { label: 'CSS (gzip)', value: BUILD_CSS_GZIP },
              { label: 'React',      value: '18.3' },
            ] as const
          ).map(({ label, value }) => (
            <div key={label} className="space-y-0.5">
              <p className="text-xs text-gray-600">{label}</p>
              <p className="text-sm font-mono font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
