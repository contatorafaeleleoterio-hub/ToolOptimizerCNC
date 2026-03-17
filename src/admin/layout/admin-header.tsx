/**
 * AdminHeader — top bar with logo, version, and "Voltar ao App" link
 */

import { Link } from 'react-router-dom';

export function AdminHeader() {
  return (
    <header className="h-12 shrink-0 flex items-center justify-between px-6 bg-white/3 border-b border-white/8">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-lg text-cyan-400">admin_panel_settings</span>
        <span className="text-sm font-semibold text-white">Central de Gestão</span>
      </div>

      <Link
        to="/"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/8 transition-all border border-white/8 hover:border-white/15"
      >
        <span className="material-symbols-outlined text-[14px]">arrow_back</span>
        Voltar ao App
      </Link>
    </header>
  );
}
