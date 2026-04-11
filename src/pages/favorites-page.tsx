/**
 * Favorites Page — Dedicated page for listing, filtering and managing CNC favorites.
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '@/store';
import { useMachiningStore } from '@/store';
import { TipoUsinagem } from '@/types';
import type { FavoritoCompleto } from '@/types';
import { usePageTitle } from '@/hooks/use-page-title';
import { SeoHead } from '@/components/seo-head';
import { FavoriteEditModal } from '@/components/modals/favorite-edit-modal';

const CARD = 'bg-card-dark rounded-xl p-6 border border-white/5 shadow-inner-glow mb-6';
const LABEL = 'text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block';

const TIPO_LABELS: Record<TipoUsinagem, string> = {
  [TipoUsinagem.DESBASTE]: 'Desbaste',
  [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-Acab.',
  [TipoUsinagem.ACABAMENTO]: 'Acabamento',
};

const SEG_COLORS: Record<string, string> = {
  verde: 'bg-seg-verde/20 text-seg-verde border-seg-verde/30',
  amarelo: 'bg-seg-amarelo/20 text-seg-amarelo border-seg-amarelo/30',
  vermelho: 'bg-seg-vermelho/20 text-seg-vermelho border-seg-vermelho/30',
  bloqueado: 'bg-red-900/30 text-red-400 border-red-500/30',
};

const SEG_LABELS: Record<string, string> = {
  verde: 'SEGURO', amarelo: 'ALERTA', vermelho: 'CRÍTICO', bloqueado: 'BLOQUEADO',
};

const TOOL_NAMES: Record<string, string> = { topo: 'Topo', toroidal: 'Toroidal', esferica: 'Esférica' };

type SortOrder = 'recent' | 'oldest' | 'material';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString('pt-BR');
}

export function FavoritesPage() {
  usePageTitle('Favoritos — ToolOptimizer CNC');
  const navigate = useNavigate();

  const favorites = useFavoritesStore((s) => s.favorites);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  const setMaterial = useMachiningStore((s) => s.setMaterial);
  const setFerramenta = useMachiningStore((s) => s.setFerramenta);
  const setTipoOperacao = useMachiningStore((s) => s.setTipoOperacao);
  const setParametros = useMachiningStore((s) => s.setParametros);
  const setSafetyFactor = useMachiningStore((s) => s.setSafetyFactor);

  const [search, setSearch] = useState('');
  const [filterMaterial, setFilterMaterial] = useState('');
  const [filterOp, setFilterOp] = useState<TipoUsinagem | ''>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('recent');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Deduplicated material options from current favorites
  const materialOptions = useMemo(
    () => [...new Set(favorites.map((f) => f.materialNome))].sort(),
    [favorites],
  );

  const filtered = useMemo(() => {
    let list = [...favorites];

    // Text search: material name or tool type
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (f) =>
          f.materialNome.toLowerCase().includes(q) ||
          (TOOL_NAMES[f.ferramenta.tipo] ?? f.ferramenta.tipo).toLowerCase().includes(q),
      );
    }

    // Material dropdown
    if (filterMaterial) {
      list = list.filter((f) => f.materialNome === filterMaterial);
    }

    // Operation dropdown
    if (filterOp) {
      list = list.filter((f) => f.tipoOperacao === filterOp);
    }

    // Sort
    if (sortOrder === 'recent') {
      list = list.slice().reverse();
    } else if (sortOrder === 'oldest') {
      // already oldest-first
    } else if (sortOrder === 'material') {
      list = list.slice().sort((a, b) => a.materialNome.localeCompare(b.materialNome));
    }

    return list;
  }, [favorites, search, filterMaterial, filterOp, sortOrder]);

  const editingFavorite = editingId ? favorites.find((f) => f.id === editingId) ?? null : null;

  const handleUse = (fav: FavoritoCompleto) => {
    setMaterial(fav.materialId);
    setFerramenta(fav.ferramenta);
    setTipoOperacao(fav.tipoOperacao);
    setParametros(fav.parametros);
    setSafetyFactor(fav.safetyFactor);
    navigate('/');
  };

  const handleConfirmRemove = (id: string) => {
    removeFavorite(id);
    setConfirmingId(null);
    if (expandedId === id) setExpandedId(null);
  };

  const hasFilters = search.trim() !== '' || filterMaterial !== '' || filterOp !== '';

  return (
    <div className="min-h-screen bg-background-dark p-6 overflow-y-auto">
      <SeoHead title="Favoritos — ToolOptimizer CNC" />

      {/* Header */}
      <header className="mb-6 flex items-center gap-4 py-4 px-6 rounded-2xl bg-surface-dark backdrop-blur-xl border border-white/5 shadow-glass">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 text-sm"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Voltar
        </button>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          Favoritos
        </h1>
        <span className="text-xs text-gray-500 ml-auto font-mono">{favorites.length} favorito{favorites.length !== 1 ? 's' : ''}</span>
      </header>

      <div className="max-w-[1200px] mx-auto">
        {/* Filters */}
        <div className={CARD}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-3 bg-yellow-400 rounded-full" />
              Filtros
            </h3>
            {hasFilters && (
              <button
                onClick={() => { setSearch(''); setFilterMaterial(''); setFilterOp(''); }}
                className="text-[10px] text-gray-500 hover:text-primary transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">filter_alt_off</span>
                Limpar filtros
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-1">
              <label className={LABEL}>Buscar</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Material ou ferramenta..."
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none placeholder:text-gray-600"
              />
            </div>
            <div>
              <label className={LABEL}>Material</label>
              <select
                value={filterMaterial}
                onChange={(e) => setFilterMaterial(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none appearance-none select-chevron"
              >
                <option value="">Todos</option>
                {materialOptions.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL}>Operação</label>
              <select
                value={filterOp}
                onChange={(e) => setFilterOp(e.target.value as TipoUsinagem | '')}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none appearance-none select-chevron"
              >
                <option value="">Todas</option>
                {Object.values(TipoUsinagem).map((t) => (
                  <option key={t} value={t}>{TIPO_LABELS[t]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL}>Ordenar por</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none appearance-none select-chevron"
              >
                <option value="recent">Mais recente</option>
                <option value="oldest">Mais antigo</option>
                <option value="material">Por material</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty state — no favorites at all */}
        {favorites.length === 0 && (
          <div className="text-center py-16">
            <span
              className="material-symbols-outlined text-6xl text-gray-700 mb-4 block"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >star</span>
            <p className="text-gray-500 text-sm">Nenhum favorito salvo ainda.</p>
            <p className="text-gray-600 text-xs mt-1">
              Após simular, clique em <span className="text-yellow-400 font-bold">★</span> no painel de resultados para favoritar um setup.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-5 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-bold hover:bg-primary/20 transition-all"
            >
              Simular agora
            </button>
          </div>
        )}

        {/* Filtered empty state */}
        {favorites.length > 0 && filtered.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-5xl text-gray-700 mb-3 block">filter_alt_off</span>
            <p className="text-gray-500 text-sm">Nenhum favorito com os filtros atuais.</p>
          </div>
        )}

        {/* Favorites list */}
        <div className="space-y-3">
          {filtered.map((fav) => (
            <FavoriteCard
              key={fav.id}
              fav={fav}
              isExpanded={expandedId === fav.id}
              confirmingRemove={confirmingId === fav.id}
              onToggle={() => setExpandedId(expandedId === fav.id ? null : fav.id)}
              onEdit={() => setEditingId(fav.id)}
              onRequestRemove={() => setConfirmingId(fav.id)}
              onCancelRemove={() => setConfirmingId(null)}
              onConfirmRemove={() => handleConfirmRemove(fav.id)}
              onUse={() => handleUse(fav)}
            />
          ))}
        </div>
      </div>

      {/* Edit modal */}
      {editingFavorite && (
        <FavoriteEditModal
          favorite={editingFavorite}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  );
}

/* ── Favorite Card ── */
interface FavoriteCardProps {
  fav: FavoritoCompleto;
  isExpanded: boolean;
  confirmingRemove: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onRequestRemove: () => void;
  onCancelRemove: () => void;
  onConfirmRemove: () => void;
  onUse: () => void;
}

function FavoriteCard({
  fav,
  isExpanded,
  confirmingRemove,
  onToggle,
  onEdit,
  onRequestRemove,
  onCancelRemove,
  onConfirmRemove,
  onUse,
}: FavoriteCardProps) {
  const { resultado, ferramenta, parametros } = fav;
  const nivel = resultado.seguranca.nivel;

  return (
    <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-glass transition-all">
      {/* Summary row */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-all text-left"
      >
        {/* Timestamp */}
        <div className="shrink-0 min-w-0">
          <span className="text-[10px] text-gray-500 block whitespace-nowrap">{formatDate(fav.timestamp)}</span>
          {fav.editedAt && (
            <span className="text-[9px] text-yellow-500/60 block whitespace-nowrap">editado</span>
          )}
        </div>

        {/* Material + Operation */}
        <div className="flex-1 min-w-0">
          <span className="text-sm text-white font-medium truncate block">{fav.materialNome}</span>
          <span className="text-[10px] text-gray-500">
            {TIPO_LABELS[fav.tipoOperacao]} · {TOOL_NAMES[ferramenta.tipo] ?? ferramenta.tipo} Ø{ferramenta.diametro}
          </span>
        </div>

        {/* Key results */}
        <div className="hidden sm:flex items-center gap-6 text-right">
          <div>
            <span className="text-[10px] text-gray-500 block">RPM</span>
            <span className="text-sm font-mono text-primary font-bold">{fmt(resultado.rpm)}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block">Avanço</span>
            <span className="text-sm font-mono text-secondary font-bold">{fmt(resultado.avanco)}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block">Potência</span>
            <span className="text-sm font-mono text-accent-orange font-bold">{resultado.potenciaMotor.toFixed(2)}</span>
          </div>
        </div>

        {/* Safety badge */}
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${SEG_COLORS[nivel]}`}>
          {SEG_LABELS[nivel]}
        </span>

        {/* Star indicator */}
        <span
          className="material-symbols-outlined text-lg text-yellow-400"
          style={{ fontVariationSettings: "'FILL' 1", filter: 'drop-shadow(0 0 5px rgba(250,204,21,0.4))' }}
        >star</span>

        {/* Expand icon */}
        <span className={`material-symbols-outlined text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </div>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-4">
          {/* Params grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DetailCell label="Vc" value={`${parametros.vc} m/min`} />
            <DetailCell label="fz" value={`${parametros.fz} mm`} />
            <DetailCell label="ap" value={`${parametros.ap} mm`} />
            <DetailCell label="ae" value={`${parametros.ae} mm`} />
            <DetailCell label="RPM" value={fmt(resultado.rpm)} highlight="text-primary" />
            <DetailCell label="Avanço" value={`${fmt(resultado.avanco)} mm/min`} highlight="text-secondary" />
            <DetailCell label="Potência" value={`${resultado.potenciaMotor.toFixed(2)} kW`} highlight="text-accent-orange" />
            <DetailCell label="MRR" value={`${resultado.mrr.toFixed(1)} cm³/min`} />
            <DetailCell label="Torque" value={`${resultado.torque.toFixed(2)} Nm`} />
            <DetailCell label="Vc Real" value={`${resultado.vcReal.toFixed(0)} m/min`} />
            <DetailCell label="L/D" value={resultado.seguranca.razaoLD.toFixed(1)} />
            <DetailCell label="CTF" value={resultado.seguranca.ctf.toFixed(2)} />
          </div>

          {/* User note */}
          {fav.userNote && (
            <div className="bg-yellow-400/5 border border-yellow-400/15 rounded-lg p-3">
              <span className="text-[10px] text-yellow-400/70 font-bold uppercase tracking-wide block mb-1">Nota</span>
              <p className="text-xs text-gray-300">{fav.userNote}</p>
            </div>
          )}

          {/* Warnings */}
          {resultado.seguranca.avisos.length > 0 && (
            <div className="bg-seg-vermelho/5 border border-seg-vermelho/20 rounded-lg p-3">
              <span className="text-[10px] text-seg-vermelho font-bold uppercase tracking-wide block mb-1">Avisos</span>
              {resultado.seguranca.avisos.map((a, i) => (
                <p key={i} className="text-xs text-seg-vermelho/80">⚠ {a}</p>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {/* Usar */}
            <button
              onClick={onUse}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-bold hover:bg-primary/20 transition-all"
            >
              <span className="material-symbols-outlined text-sm">replay</span>
              Usar
            </button>

            {/* Editar */}
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs hover:bg-white/10 hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Editar
            </button>

            {/* Remover — inline confirmation */}
            {confirmingRemove ? (
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-seg-vermelho font-bold">Confirmar remoção?</span>
                <button
                  onClick={onConfirmRemove}
                  className="px-3 py-1.5 rounded-lg bg-seg-vermelho/10 border border-seg-vermelho/40 text-seg-vermelho text-xs font-bold hover:bg-seg-vermelho/20 transition-all"
                >
                  Sim
                </button>
                <button
                  onClick={onCancelRemove}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs hover:bg-white/10 transition-all"
                >
                  Não
                </button>
              </div>
            ) : (
              <button
                onClick={onRequestRemove}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-500 text-xs hover:bg-seg-vermelho/10 hover:text-seg-vermelho hover:border-seg-vermelho/30 transition-all ml-auto"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                Remover
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Small detail cell ── */
function DetailCell({ label, value, highlight }: { label: string; value: string; highlight?: string }) {
  return (
    <div className="bg-black/30 rounded-lg p-2 border border-white/5">
      <span className="text-[10px] text-gray-500 block">{label}</span>
      <span className={`text-sm font-mono font-bold ${highlight ?? 'text-white'}`}>{value}</span>
    </div>
  );
}
