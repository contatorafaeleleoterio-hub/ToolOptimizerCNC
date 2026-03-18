/**
 * AdminSidebar — vertical navigation with 9 admin routes
 */

import { NavLink } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/admin',            label: 'Dashboard',      icon: 'dashboard' },
  { path: '/admin/tasks',      label: 'Tarefas',        icon: 'task_alt' },
  { path: '/admin/inbox',      label: 'Inbox de Bugs',  icon: 'inbox' },
  { path: '/admin/errors',     label: 'Erros',          icon: 'error' },
  { path: '/admin/usage',      label: 'Uso',            icon: 'bar_chart' },
  { path: '/admin/analytics',  label: 'Analytics',      icon: 'analytics' },
  { path: '/admin/flags',      label: 'Feature Flags',  icon: 'flag' },
  { path: '/admin/changelog',  label: 'Changelog',      icon: 'history' },
  { path: '/admin/health',     label: 'Saúde',          icon: 'monitor_heart' },
];

export function AdminSidebar() {
  return (
    <aside className="w-56 shrink-0 flex flex-col bg-white/3 border-r border-white/8 min-h-screen">
      {/* Logo area */}
      <div className="px-4 py-5 border-b border-white/8">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          ToolOptimizer
        </p>
        <p className="text-xs font-semibold text-cyan-400 tracking-wide">Admin</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3">
        {NAV_ITEMS.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/20'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`
            }
          >
            <span className="material-symbols-outlined text-[18px] shrink-0">{icon}</span>
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/8">
        <p className="text-[10px] text-gray-600 font-mono">v0.7.0</p>
      </div>
    </aside>
  );
}
