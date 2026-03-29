/**
 * AdminAnalyticsPage - Cloudflare Analytics integration
 * Shows period-based traffic (pageviews + visitors) and RUM Web Vitals.
 */

import { useState, useMemo, useEffect } from 'react';
import { useAnalyticsStore } from '../store/analytics-store';
import { MiniChart } from '../components/mini-chart';
import type { UsageSummary, VitalRating, WebVitalsResult } from '../types/admin-types';

type DaysWindow = 7 | 30 | 90;
type AutoRefreshMinutes = 0 | 5 | 15;

function lcpRating(ms: number): VitalRating {
  if (ms <= 2500) return 'good';
  if (ms <= 4000) return 'needs-improvement';
  return 'poor';
}

function inpRating(ms: number): VitalRating {
  if (ms <= 200) return 'good';
  if (ms <= 500) return 'needs-improvement';
  return 'poor';
}

function clsRating(val: number): VitalRating {
  if (val <= 0.1) return 'good';
  if (val <= 0.25) return 'needs-improvement';
  return 'poor';
}

const RATING_COLOR: Record<VitalRating, string> = {
  good: '#2ecc71',
  'needs-improvement': '#f39c12',
  poor: '#e74c3c',
};

const RATING_LABEL: Record<VitalRating, string> = {
  good: 'Bom',
  'needs-improvement': 'Melhorar',
  poor: 'Ruim',
};

interface VitalCardProps {
  name: string;
  icon: string;
  value: number | null;
  unit: string;
  rating: VitalRating | null;
  thresholds: string;
}

function VitalCard({ name, icon, value, unit, rating, thresholds }: VitalCardProps) {
  const color = rating ? RATING_COLOR[rating] : '#6b7280';
  const label = rating ? RATING_LABEL[rating] : '-';

  return (
    <div className="rounded-xl bg-white/4 border border-white/8 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-base" style={{ color }}>
          {icon}
        </span>
        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">{name}</span>
        {rating && (
          <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color, backgroundColor: color + '22' }}>
            {label}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-1">
        {value !== null ? (
          <>
            <span className="text-2xl font-bold font-mono text-white">
              {unit === 'ms' ? Math.round(value) : value.toFixed(3)}
            </span>
            <span className="text-sm text-gray-500">{unit}</span>
          </>
        ) : (
          <span className="text-sm text-gray-600">Sem dados</span>
        )}
      </div>

      <p className="text-xs text-gray-600">{thresholds}</p>
    </div>
  );
}

function SetupForm() {
  const setCredentials = useAnalyticsStore((s) => s.setCredentials);
  const fetchData = useAnalyticsStore((s) => s.fetchData);

  const [token, setToken] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [localError, setLocalError] = useState('');

  async function handleConnect() {
    if (!token.trim() || !zoneId.trim()) {
      setLocalError('Preencha o API Token e o Zone ID.');
      return;
    }

    setLocalError('');
    setConnecting(true);
    setCredentials(token.trim(), zoneId.trim());
    await fetchData(7);
    setConnecting(false);
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics Cloudflare</h1>
        <p className="text-sm text-gray-500 mt-1">Configure as credenciais para ver trafego e Web Vitals em tempo real.</p>
      </div>

      <div className="rounded-xl bg-white/4 border border-white/8 p-5 space-y-3">
        <p className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-cyan-400">info</span>
          Como obter as credenciais
        </p>
        <ol className="text-xs text-gray-500 space-y-1.5 list-decimal list-inside">
          <li>Acesse <span className="text-cyan-400 font-mono">dash.cloudflare.com</span> → My Profile → API Tokens</li>
          <li>Crie um token com permissao <span className="font-mono text-gray-300">Zone: Analytics: Read</span></li>
          <li>O <span className="font-mono text-gray-300">Zone ID</span> fica em Overview do dominio.</li>
        </ol>
      </div>

      <div className="rounded-xl bg-white/4 border border-white/8 p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400" htmlFor="cf-token">API Token</label>
          <input
            id="cf-token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Bearer token..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400" htmlFor="cf-zone">Zone ID</label>
          <input
            id="cf-zone"
            type="text"
            value={zoneId}
            onChange={(e) => setZoneId(e.target.value)}
            placeholder="32-character hex string..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 font-mono"
          />
        </div>

        {localError && <p className="text-xs text-red-400">{localError}</p>}

        <button
          onClick={handleConnect}
          disabled={connecting}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors disabled:opacity-50"
        >
          {connecting ? (
            <>
              <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
              Conectando...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">link</span>
              Conectar
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function formatDateLabel(iso: string): string {
  const [, month, day] = iso.split('-');
  return `${day}/${month}`;
}

function buildVitalsCards(vitals: WebVitalsResult) {
  return [
    {
      name: 'LCP',
      icon: 'timer',
      value: vitals.lcpMs,
      unit: 'ms',
      rating: vitals.lcpMs !== null ? lcpRating(vitals.lcpMs) : null,
      thresholds: 'Bom <= 2500 ms · Ruim > 4000 ms',
    },
    {
      name: 'INP',
      icon: 'touch_app',
      value: vitals.inpMs,
      unit: 'ms',
      rating: vitals.inpMs !== null ? inpRating(vitals.inpMs) : null,
      thresholds: 'Bom <= 200 ms · Ruim > 500 ms',
    },
    {
      name: 'CLS',
      icon: 'view_in_ar',
      value: vitals.cls,
      unit: '',
      rating: vitals.cls !== null ? clsRating(vitals.cls) : null,
      thresholds: 'Bom <= 0.1 · Ruim > 0.25',
    },
  ] as const;
}

function buildTrafficCsv(rows: { date: string; pageViews: number; uniques: number }[]): string {
  const header = 'date,pageviews,visitors';
  const body = rows.map((r) => `${r.date},${r.pageViews},${r.uniques}`).join('\n');
  return `${header}\n${body}`;
}

export default function AdminAnalyticsPage() {
  const token = useAnalyticsStore((s) => s.token);
  const zoneId = useAnalyticsStore((s) => s.zoneId);
  const daysWindow = useAnalyticsStore((s) => s.daysWindow);
  const dailyTraffic = useAnalyticsStore((s) => s.dailyTraffic);
  const webVitals = useAnalyticsStore((s) => s.webVitals);
  const vitalsUnavailable = useAnalyticsStore((s) => s.vitalsUnavailable);
  const status = useAnalyticsStore((s) => s.status);
  const error = useAnalyticsStore((s) => s.error);
  const fetchedAt = useAnalyticsStore((s) => s.fetchedAt);
  const fetchData = useAnalyticsStore((s) => s.fetchData);
  const clearCredentials = useAnalyticsStore((s) => s.clearCredentials);

  const [selectedDays, setSelectedDays] = useState<DaysWindow>(() => {
    if (daysWindow === 30 || daysWindow === 90) return daysWindow;
    return 7;
  });
  const [autoRefreshMinutes, setAutoRefreshMinutes] = useState<AutoRefreshMinutes>(0);

  const hasCredentials = token.trim().length > 0 && zoneId.trim().length > 0;

  const pageViewsData: UsageSummary[] = useMemo(
    () => dailyTraffic.map((d) => ({ label: formatDateLabel(d.date), count: d.pageViews })),
    [dailyTraffic],
  );

  const visitorsData: UsageSummary[] = useMemo(
    () => dailyTraffic.map((d) => ({ label: formatDateLabel(d.date), count: d.uniques })),
    [dailyTraffic],
  );

  const totalPageViews = useMemo(
    () => dailyTraffic.reduce((sum, d) => sum + d.pageViews, 0),
    [dailyTraffic],
  );

  const totalVisitors = useMemo(
    () => dailyTraffic.reduce((sum, d) => sum + d.uniques, 0),
    [dailyTraffic],
  );

  const fetchedAgo = useMemo(() => {
    if (!fetchedAt) return null;
    const diff = Math.floor((Date.now() - new Date(fetchedAt).getTime()) / 60000);
    if (diff < 1) return 'agora mesmo';
    if (diff === 1) return '1 min atras';
    return `${diff} min atras`;
  }, [fetchedAt]);

  const vitalsCards = webVitals ? buildVitalsCards(webVitals) : null;

  useEffect(() => {
    if (!hasCredentials) return;
    if (status === 'loading' || status === 'error') return;
    if (status === 'success' && daysWindow === selectedDays) return;
    void fetchData(selectedDays);
  }, [hasCredentials, selectedDays, fetchData, status, daysWindow]);

  useEffect(() => {
    if (!hasCredentials || autoRefreshMinutes === 0) return;
    const intervalMs = autoRefreshMinutes * 60 * 1000;
    const timer = window.setInterval(() => {
      void fetchData(selectedDays);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [hasCredentials, autoRefreshMinutes, selectedDays, fetchData]);

  const exportCsv = () => {
    if (dailyTraffic.length === 0) return;
    const csv = buildTrafficCsv(dailyTraffic);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `analytics-${selectedDays}d.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  if (!hasCredentials) return <SetupForm />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Cloudflare</h1>
          <p className="text-sm text-gray-500 mt-1">
            Ultimos {selectedDays} dias ·{' '}
            {fetchedAgo ? (
              <span className="text-gray-600">Atualizado {fetchedAgo}</span>
            ) : (
              <span className="text-gray-600">Nenhuma busca ainda</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            aria-label="Período analytics"
            value={selectedDays}
            onChange={(e) => setSelectedDays(Number(e.target.value) as DaysWindow)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-cyan-500/40"
          >
            <option value={7} className="bg-[#0F1419]">7 dias</option>
            <option value={30} className="bg-[#0F1419]">30 dias</option>
            <option value={90} className="bg-[#0F1419]">90 dias</option>
          </select>

          <select
            aria-label="Auto refresh analytics"
            value={autoRefreshMinutes}
            onChange={(e) => setAutoRefreshMinutes(Number(e.target.value) as AutoRefreshMinutes)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-cyan-500/40"
          >
            <option value={0} className="bg-[#0F1419]">Auto-refresh: off</option>
            <option value={5} className="bg-[#0F1419]">Auto-refresh: 5 min</option>
            <option value={15} className="bg-[#0F1419]">Auto-refresh: 15 min</option>
          </select>

          <button
            onClick={() => void fetchData(selectedDays)}
            disabled={status === 'loading'}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-base ${status === 'loading' ? 'animate-spin' : ''}`}>
              {status === 'loading' ? 'progress_activity' : 'refresh'}
            </span>
            {status === 'loading' ? 'Buscando...' : 'Atualizar'}
          </button>

          <button
            onClick={exportCsv}
            disabled={dailyTraffic.length === 0}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Exportar CSV
          </button>

          <button
            onClick={clearCredentials}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 bg-white/5 border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-colors"
            aria-label="Desconectar"
          >
            <span className="material-symbols-outlined text-base">link_off</span>
            Desconectar
          </button>
        </div>
      </div>

      {status === 'error' && error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-start gap-3">
          <span className="material-symbols-outlined text-base text-red-400 shrink-0 mt-0.5">error</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-red-400">Erro ao buscar dados</p>
            <p className="text-xs text-red-400/70 mt-0.5 break-words">{error}</p>
          </div>
          <button onClick={() => void fetchData(selectedDays)} className="text-xs text-red-400 underline shrink-0">
            Tentar novamente
          </button>
        </div>
      )}

      {status === 'loading' && dailyTraffic.length === 0 && (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <span className="material-symbols-outlined text-4xl text-cyan-400 animate-spin">progress_activity</span>
          <p className="text-sm text-gray-500">Buscando dados da Cloudflare...</p>
        </div>
      )}

      {dailyTraffic.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-white/4 border border-white/8 p-4 flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl text-cyan-400">visibility</span>
              <div>
                <p className="text-2xl font-bold font-mono text-white">{totalPageViews.toLocaleString('pt-BR')}</p>
                <p className="text-xs text-gray-500">Pageviews ({selectedDays} dias)</p>
              </div>
            </div>
            <div className="rounded-xl bg-white/4 border border-white/8 p-4 flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl text-green-400">group</span>
              <div>
                <p className="text-2xl font-bold font-mono text-white">{totalVisitors.toLocaleString('pt-BR')}</p>
                <p className="text-xs text-gray-500">Visitantes unicos ({selectedDays} dias)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <section className="rounded-xl bg-white/4 border border-white/8 p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-lg text-cyan-400">bar_chart</span>
                <h2 className="text-sm font-semibold text-gray-200">Pageviews por dia</h2>
              </div>
              <MiniChart data={pageViewsData} color="#00D9FF" emptyMessage={`Nenhum pageview nos ultimos ${selectedDays} dias`} />
            </section>

            <section className="rounded-xl bg-white/4 border border-white/8 p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-lg text-green-400">person</span>
                <h2 className="text-sm font-semibold text-gray-200">Visitantes unicos por dia</h2>
              </div>
              <MiniChart data={visitorsData} color="#39FF14" emptyMessage={`Nenhum visitante nos ultimos ${selectedDays} dias`} />
            </section>
          </div>

          <section className="rounded-xl bg-white/4 border border-white/8 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-lg text-purple-400">speed</span>
              <h2 className="text-sm font-semibold text-gray-200">Web Vitals</h2>
              <span className="text-xs text-gray-600 ml-1">{webVitals ? `(${webVitals.count.toLocaleString('pt-BR')} amostras)` : ''}</span>
            </div>

            {vitalsUnavailable ? (
              <p className="text-sm text-gray-600">
                Dados de Web Vitals nao disponiveis para esta zona. Verifique se o <span className="font-mono text-gray-400">Web Analytics</span> esta ativo no painel Cloudflare.
              </p>
            ) : vitalsCards ? (
              <div className="grid grid-cols-3 gap-4">
                {vitalsCards.map((v) => (
                  <VitalCard key={v.name} {...v} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">Atualize para carregar Web Vitals.</p>
            )}
          </section>
        </>
      )}

      {status === 'success' && dailyTraffic.length === 0 && (
        <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
          <span className="material-symbols-outlined text-4xl text-gray-600">analytics</span>
          <p className="text-gray-400 font-semibold">Nenhum dado encontrado</p>
          <p className="text-sm text-gray-600">Verifique se o Zone ID esta correto e se ha trafego nos ultimos {selectedDays} dias.</p>
        </div>
      )}
    </div>
  );
}


