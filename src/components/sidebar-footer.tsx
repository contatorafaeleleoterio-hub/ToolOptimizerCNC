import { useNavigate } from 'react-router-dom';
import { useHistoryStore } from '@/store';
import { useFavoritesStore } from '@/store';

const APP_VERSION = __APP_VERSION__;

export function SidebarFooter() {
  const navigate = useNavigate();
  // Favorites count from dedicated store (separate from history flags)
  const favorites = useFavoritesStore((s) => s.favorites);
  const favoriteCount = favorites.length;
  const historyCount = useHistoryStore((s) => s.entries.length);

  return (
    <div className="border-t border-white/10 bg-surface-dark/80 backdrop-blur-md pt-2 pb-1 px-2 space-y-1">
      {/* Favoritos */}
      <button
        onClick={() => navigate('/favoritos')}
        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-yellow-400 hover:bg-white/5 transition-colors group"
      >
        <span className="material-symbols-outlined text-[18px] group-hover:text-yellow-400">star</span>
        <span className="flex-1 text-left">Favoritos</span>
        {favoriteCount > 0 && (
          <span className="text-xs font-mono text-yellow-400/70">{favoriteCount}</span>
        )}
      </button>

      {/* Histórico */}
      <button
        onClick={() => navigate('/history')}
        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors group"
      >
        <span className="material-symbols-outlined text-[18px]">history</span>
        <span className="flex-1 text-left">Histórico</span>
        {historyCount > 0 && (
          <span className="text-xs font-mono text-gray-500">{historyCount}</span>
        )}
      </button>

      {/* Divider + bottom row */}
      <div className="border-t border-white/5 pt-1 mt-1 flex items-center justify-between px-3">
        <span className="text-xs text-gray-600">v{APP_VERSION}</span>
        <button
          onClick={() => navigate('/settings')}
          aria-label="Configurações"
          className="p-1 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </button>
      </div>
    </div>
  );
}
