/**
 * AdminDashboardPage — overview with real KPI data, analytics banner, and activity feed
 */

import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAdminStore } from '../store/admin-store';
import { useUsageStore } from '../store/usage-store';
import { useAnalyticsStore } from '../store/analytics-store';
import { KpiCard } from '../components/kpi-card';
import { ActivityFeed } from '../components/activity-feed';

interface QuickLink {
  path: string;
  label: string;
  icon: string;
  description: string;
}

const QUICK_LINKS: QuickLink[] = [
  { path: '/admin/tasks',     label: 'Tarefas',       icon: 'task_alt',      description: 'Gerir requisições e tarefas' },
  { path: '/admin/inbox',     label: 'Inbox',         icon: 'inbox',         description: 'Ver bug reports recebidos' },
  { path: '/admin/errors',    label: 'Erros',         icon: 'error',         description: 'Erros capturados automaticamente' },
  { path: '/admin/usage',     label: 'Uso',           icon: 'bar_chart',     description: 'Materiais e operações mais usados' },
  { path: '/admin/analytics', label: 'Analytics',     icon: 'analytics',     description: 'Visitantes via Cloudflare' },
  { path: '/admin/flags',     label: 'Feature Flags', icon: 'flag',          description: 'Ativar/desativar funcionalidades' },
  { path: '/admin/changelog', label: 'Changelog',     icon: 'history',       description: 'Histórico de versões' },
  { path: '/admin/health',    label: 'Saúde',         icon: 'monitor_heart', description: 'Status do sistema' },
];

/** Minimal SVG sparkline for daily visitor data */
function Sparkline({ data, color = '#00D9FF' }: { data: number[]; color?: string }) {
  if (data.length < 2) return null;
  const max = Math.max(...data, 1);
  const w = 96;
  const h = 32;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * (h - 4) - 2}`)
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" data-testid="sparkline">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
    </svg>
  );
}

export default function AdminDashboardPage() {
  // ── Admin store KPIs ──────────────────────────────────────────────────────
  const getOpenTaskCount    = useAdminStore((s) => s.getOpenTaskCount);
  const getNewBugCount      = useAdminStore((s) => s.getNewBugCount);
  const getRecentErrorCount = useAdminStore((s) => s.getRecentErrorCount);
  const totalTasks          = useAdminStore((s) => s.tasks.length);

  // ── Usage store KPIs ─────────────────────────────────────────────────────
  const usageEvents = useUsageStore((s) => s.events);
  const simulationsToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return usageEvents.filter((e) => e.timestamp.startsWith(today)).length;
  }, [usageEvents]);
  const totalSimulations = usageEvents.length;

  // ── Analytics store ───────────────────────────────────────────────────────
  const token           = useAnalyticsStore((s) => s.token);
  const zoneId          = useAnalyticsStore((s) => s.zoneId);
  const dailyTraffic    = useAnalyticsStore((s) => s.dailyTraffic);
  const analyticsStatus = useAnalyticsStore((s) => s.status);

  const hasAnalyticsCredentials = token.trim().length > 0 && zoneId.trim().length > 0;

  const { visitors7d, sparklineData } = useMemo(() => {
    if (!hasAnalyticsCredentials || dailyTraffic.length === 0) {
      return { visitors7d: null, sparklineData: [] as number[] };
    }
    const slice = dailyTraffic.slice(-7);
    return {
      visitors7d: slice.reduce((sum, d) => sum + d.uniques, 0),
      sparklineData: slice.map((d) => d.uniques),
    };
  }, [hasAnalyticsCredentials, dailyTraffic]);

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Visão geral do ToolOptimizer CNC</p>
      </div>

      {/* KPI Cards — real data from all stores */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          icon="task_alt"
          value={getOpenTaskCount()}
          label="Tarefas Abertas"
          color="cyan"
          description={`${totalTasks} total`}
        />
        <KpiCard
          icon="inbox"
          value={getNewBugCount()}
          label="Bugs Novos"
          color="yellow"
          description="Aguardando leitura"
        />
        <KpiCard
          icon="error"
          value={getRecentErrorCount()}
          label="Erros (24h)"
          color="red"
          description="Capturados automaticamente"
        />
        <KpiCard
          icon="play_circle"
          value={simulationsToday}
          label="Simulações Hoje"
          color="green"
          description={`${totalSimulations} total`}
        />
      </div>

      {/* Analytics banner */}
      {hasAnalyticsCredentials ? (
        <div className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white/3 border border-white/8">
          <span className="material-symbols-outlined text-xl text-cyan-400">analytics</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium">Visitantes únicos (7d)</p>
            {analyticsStatus === 'loading' ? (
              <p className="text-sm text-gray-500 mt-0.5">Carregando…</p>
            ) : visitors7d !== null ? (
              <p className="text-2xl font-bold font-mono text-cyan-300">
                {visitors7d.toLocaleString('pt-BR')}
              </p>
            ) : (
              <p className="text-sm text-gray-500 mt-0.5">
                {analyticsStatus === 'error' ? 'Erro ao buscar dados' : 'Dados não carregados — vá em Analytics para buscar'}
              </p>
            )}
          </div>
          {sparklineData.length >= 2 && <Sparkline data={sparklineData} color="#00D9FF" />}
          <Link
            to="/admin/analytics"
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
          >
            Ver Analytics →
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/3 border border-white/8">
          <span className="material-symbols-outlined text-base text-gray-500">analytics</span>
          <p className="text-sm text-gray-500 flex-1">
            Analytics Cloudflare não configurado.
          </p>
          <Link
            to="/admin/analytics"
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
          >
            Configurar →
          </Link>
        </div>
      )}

      {/* Quick Links */}
      <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-cyan-500 rounded-full" />
          Acesso Rápido
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {QUICK_LINKS.map(({ path, label, icon, description }) => (
            <Link
              key={path}
              to={path}
              className="flex flex-col gap-2 p-4 rounded-xl bg-white/3 border border-white/8 hover:bg-white/6 hover:border-white/15 transition-all group"
            >
              <span className="material-symbols-outlined text-xl text-gray-400 group-hover:text-cyan-400 transition-colors">
                {icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-200">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-green-500 rounded-full" />
          Atividade Recente
        </h2>
        <ActivityFeed />
      </div>
    </div>
  );
}
