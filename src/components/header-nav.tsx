import { NavLink } from 'react-router-dom';
import { useHistoryStore } from '@/store';
import { useFavoritesStore } from '@/store';

const LINK_BASE = 'flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-[13px] font-semibold transition-colors';
const LINK_ACTIVE = 'text-primary bg-primary/[0.08]';
const LINK_INACTIVE = 'text-white/60 hover:text-white/85 hover:bg-white/5';

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span data-testid="count-badge" className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/12 text-white/75 leading-none">
      {count}
    </span>
  );
}

/** Desktop header navigation: Calcular · Favoritos · Histórico · Config, com badges de contagem */
export function HeaderNav() {
  const favoriteCount = useFavoritesStore((s) => s.favorites.length);
  const historyCount = useHistoryStore((s) => s.entries.length);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${LINK_BASE} ${isActive ? LINK_ACTIVE : LINK_INACTIVE}`;

  return (
    <nav className="flex items-center gap-1" aria-label="Navegação principal">
      <NavLink to="/" end className={linkClass}>
        <span className="material-symbols-outlined text-[16px]">calculate</span>
        Calcular
      </NavLink>
      <NavLink to="/favoritos" className={linkClass}>
        <span className="material-symbols-outlined text-[16px]">star</span>
        Favoritos
        <CountBadge count={favoriteCount} />
      </NavLink>
      <NavLink to="/history" className={linkClass}>
        <span className="material-symbols-outlined text-[16px]">history</span>
        Histórico
        <CountBadge count={historyCount} />
      </NavLink>
      <NavLink to="/settings" className={linkClass}>
        <span className="material-symbols-outlined text-[16px]">settings</span>
        Config
      </NavLink>
    </nav>
  );
}
