/**
 * AdminDashboardPage — overview with 4 KPI cards + quick links
 */

import { Link } from 'react-router-dom';
import { useAdminStore } from '../store/admin-store';
import { KpiCard } from '../components/kpi-card';

interface QuickLink {
  path: string;
  label: string;
  icon: string;
  description: string;
}

const QUICK_LINKS: QuickLink[] = [
  { path: '/admin/tasks',     label: 'Tarefas',       icon: 'task_alt',       description: 'Gerir requisições e tarefas' },
  { path: '/admin/inbox',     label: 'Inbox',         icon: 'inbox',          description: 'Ver bug reports recebidos' },
  { path: '/admin/errors',    label: 'Erros',         icon: 'error',          description: 'Erros capturados automaticamente' },
  { path: '/admin/usage',     label: 'Uso',           icon: 'bar_chart',      description: 'Materiais e operações mais usados' },
  { path: '/admin/analytics', label: 'Analytics',     icon: 'analytics',      description: 'Visitantes via Cloudflare' },
  { path: '/admin/flags',     label: 'Feature Flags', icon: 'flag',           description: 'Ativar/desativar funcionalidades' },
  { path: '/admin/changelog', label: 'Changelog',     icon: 'history',        description: 'Histórico de versões' },
  { path: '/admin/health',    label: 'Saúde',         icon: 'monitor_heart',  description: 'Status do sistema' },
];

export default function AdminDashboardPage() {
  const getOpenTaskCount = useAdminStore((s) => s.getOpenTaskCount);
  const getNewBugCount = useAdminStore((s) => s.getNewBugCount);
  const getRecentErrorCount = useAdminStore((s) => s.getRecentErrorCount);
  const totalTasks = useAdminStore((s) => s.tasks.length);

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Visão geral do ToolOptimizer CNC</p>
      </div>

      {/* KPI Cards */}
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
          icon="analytics"
          value="—"
          label="Visitantes (7d)"
          color="green"
          description="Configurar token CF"
        />
      </div>

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
    </div>
  );
}
