/**
 * History Page - Shows calculation history with filters and operator feedback
 */

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHistoryStore } from '@/store';
import { useMachiningStore } from '@/store';
import { TipoUsinagem } from '@/types';
import type { FeedbackOperador, HistoricoCalculo } from '@/types';

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

const FEEDBACK_OPTIONS: { value: FeedbackOperador; label: string; icon: string; color: string }[] = [
  { value: 'sucesso', label: 'Sucesso', icon: 'check_circle', color: 'text-seg-verde' },
  { value: 'quebra', label: 'Quebra', icon: 'dangerous', color: 'text-seg-vermelho' },
  { value: 'acabamento_ruim', label: 'Acabamento Ruim', icon: 'warning', color: 'text-seg-amarelo' },
];

const TOOL_NAMES: Record<string, string> = { topo: 'Topo', toroidal: 'Toroidal', esferica: 'Esférica' };

function formatDate(ts: number): string {
  const d = new Date(ts);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

export function HistoryPage() {
  const navigate = useNavigate();
  const entries = useHistoryStore((s) => s.entries);
  const filters = useHistoryStore((s) => s.filters);
  const setFilters = useHistoryStore((s) => s.setFilters);
  const resetFilters = useHistoryStore((s) => s.resetFilters);
  const getFilteredEntries = useHistoryStore((s) => s.getFilteredEntries);
  const removeEntry = useHistoryStore((s) => s.removeEntry);
  const clearHistory = useHistoryStore((s) => s.clearHistory);
  const setFeedback = useHistoryStore((s) => s.setFeedback);
  const setNotas = useHistoryStore((s) => s.setNotas);
  const exportHistory = useHistoryStore((s) => s.exportHistory);
  const importHistory = useHistoryStore((s) => s.importHistory);

  const setMaterial = useMachiningStore((s) => s.setMaterial);
  const setFerramenta = useMachiningStore((s) => s.setFerramenta);
  const setTipoOperacao = useMachiningStore((s) => s.setTipoOperacao);
  const setParametros = useMachiningStore((s) => s.setParametros);

  const [confirmClear, setConfirmClear] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [importMsg, setImportMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = getFilteredEntries();
  const hasFilters = filters.materialNome !== '' || filters.tipoOperacao !== 'todos' || filters.feedback !== 'todos';

  const handleRestore = (entry: HistoricoCalculo) => {
    setMaterial(entry.materialId);
    setFerramenta(entry.ferramenta);
    setTipoOperacao(entry.tipoOperacao);
    setParametros(entry.parametros);
    navigate('/');
  };

  const handleClearHistory = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 5000);
      return;
    }
    clearHistory();
    setConfirmClear(false);
  };

  const handleExport = () => {
    const json = exportHistory();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tooloptimizer-historico.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const ok = importHistory(ev.target?.result as string);
      setImportMsg(ok ? 'Histórico importado com sucesso!' : 'Erro ao importar. Verifique o arquivo.');
      setTimeout(() => setImportMsg(''), 3000);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-background-dark p-6 overflow-y-auto">
      {/* Header */}
      <header className="mb-6 flex items-center gap-4 py-4 px-6 rounded-2xl bg-surface-dark backdrop-blur-xl border border-white/5 shadow-glass">
        <button onClick={() => navigate('/')}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Voltar
        </button>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">history</span>
          Histórico de Cálculos
        </h1>
        <span className="text-xs text-gray-500 ml-auto font-mono">{entries.length} registros</span>
      </header>

      <div className="max-w-[1200px] mx-auto">
        {/* Filters + Actions */}
        <div className={CARD}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-3 bg-primary rounded-full" />
              Filtros
            </h3>
            {hasFilters && (
              <button onClick={resetFilters}
                className="text-[10px] text-gray-500 hover:text-primary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">filter_alt_off</span>
                Limpar filtros
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={LABEL}>Material</label>
              <input type="text" value={filters.materialNome} onChange={(e) => setFilters({ materialNome: e.target.value })}
                placeholder="Buscar material..."
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none placeholder:text-gray-600" />
            </div>
            <div>
              <label className={LABEL}>Operação</label>
              <select value={filters.tipoOperacao} onChange={(e) => setFilters({ tipoOperacao: e.target.value as TipoUsinagem | 'todos' })}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none appearance-none select-chevron">
                <option value="todos">Todas</option>
                {Object.values(TipoUsinagem).map((t) => (
                  <option key={t} value={t}>{TIPO_LABELS[t]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL}>Feedback</label>
              <select value={filters.feedback ?? 'todos'} onChange={(e) => setFilters({ feedback: e.target.value === 'todos' ? 'todos' : e.target.value as FeedbackOperador })}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none appearance-none select-chevron">
                <option value="todos">Todos</option>
                <option value="sucesso">Sucesso</option>
                <option value="quebra">Quebra</option>
                <option value="acabamento_ruim">Acabamento Ruim</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex gap-3 mb-6">
          <button onClick={handleExport} disabled={entries.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all text-xs disabled:opacity-30 disabled:cursor-not-allowed">
            <span className="material-symbols-outlined text-sm text-primary">download</span>
            Exportar
          </button>
          <button onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all text-xs">
            <span className="material-symbols-outlined text-sm text-secondary">upload</span>
            Importar
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          {importMsg && (
            <span className={`text-xs self-center px-3 py-1 rounded-lg ${importMsg.includes('sucesso') ? 'bg-seg-verde/10 text-seg-verde' : 'bg-seg-vermelho/10 text-seg-vermelho'}`}>
              {importMsg}
            </span>
          )}
          <div className="ml-auto">
            <button onClick={handleClearHistory} disabled={entries.length === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                confirmClear
                  ? 'bg-seg-vermelho/10 border-seg-vermelho/40 text-seg-vermelho font-bold'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}>
              <span className="material-symbols-outlined text-sm">delete_sweep</span>
              {confirmClear ? 'Confirmar exclusão' : 'Limpar tudo'}
            </button>
          </div>
        </div>

        {/* Empty state */}
        {entries.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-gray-700 mb-4 block">inbox</span>
            <p className="text-gray-500 text-sm">Nenhum cálculo registrado ainda.</p>
            <p className="text-gray-600 text-xs mt-1">Clique em <span className="text-primary font-bold">Simular</span> no dashboard para gerar seu primeiro registro.</p>
          </div>
        )}

        {/* Filtered empty state */}
        {entries.length > 0 && filtered.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-5xl text-gray-700 mb-3 block">filter_alt_off</span>
            <p className="text-gray-500 text-sm">Nenhum resultado com os filtros atuais.</p>
          </div>
        )}

        {/* History entries */}
        <div className="space-y-3">
          {filtered.map((entry) => (
            <HistoryEntryCard
              key={entry.id}
              entry={entry}
              isExpanded={expandedId === entry.id}
              onToggle={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              onRestore={() => handleRestore(entry)}
              onRemove={() => removeEntry(entry.id)}
              onFeedback={(fb) => setFeedback(entry.id, fb)}
              onNotas={(n) => setNotas(entry.id, n)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Entry Card ── */
interface EntryCardProps {
  entry: HistoricoCalculo;
  isExpanded: boolean;
  onToggle: () => void;
  onRestore: () => void;
  onRemove: () => void;
  onFeedback: (fb: FeedbackOperador) => void;
  onNotas: (n: string) => void;
}

function HistoryEntryCard({ entry, isExpanded, onToggle, onRestore, onRemove, onFeedback, onNotas }: EntryCardProps) {
  const { resultado, ferramenta, parametros } = entry;
  const nivel = resultado.seguranca.nivel;

  return (
    <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-glass transition-all">
      {/* Summary row */}
      <button onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-all text-left">
        {/* Timestamp */}
        <div className="w-36 shrink-0">
          <span className="text-[10px] text-gray-500 block">{formatDate(entry.timestamp)}</span>
        </div>

        {/* Material + Operation */}
        <div className="flex-1 min-w-0">
          <span className="text-sm text-white font-medium truncate block">{entry.materialNome}</span>
          <span className="text-[10px] text-gray-500">{TIPO_LABELS[entry.tipoOperacao]} · {TOOL_NAMES[ferramenta.tipo] ?? ferramenta.tipo} Ø{ferramenta.diametro}</span>
        </div>

        {/* Key results */}
        <div className="flex items-center gap-6 text-right">
          <div>
            <span className="text-[10px] text-gray-500 block">RPM</span>
            <span className="text-sm font-mono text-primary font-bold">{fmt(resultado.rpm)}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block">Feed</span>
            <span className="text-sm font-mono text-secondary font-bold">{fmt(resultado.avanco)}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block">Power</span>
            <span className="text-sm font-mono text-accent-orange font-bold">{resultado.potenciaMotor.toFixed(2)}</span>
          </div>
        </div>

        {/* Safety badge */}
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${SEG_COLORS[nivel]}`}>
          {SEG_LABELS[nivel]}
        </span>

        {/* Feedback indicator */}
        {entry.feedback && (
          <span className={`material-symbols-outlined text-lg ${
            entry.feedback === 'sucesso' ? 'text-seg-verde' :
            entry.feedback === 'quebra' ? 'text-seg-vermelho' : 'text-seg-amarelo'
          }`}>
            {entry.feedback === 'sucesso' ? 'check_circle' : entry.feedback === 'quebra' ? 'dangerous' : 'warning'}
          </span>
        )}

        {/* Expand icon */}
        <span className={`material-symbols-outlined text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-4">
          {/* Full params grid */}
          <div className="grid grid-cols-4 gap-4">
            <DetailCell label="Vc" value={`${parametros.vc} m/min`} />
            <DetailCell label="fz" value={`${parametros.fz} mm`} />
            <DetailCell label="ap" value={`${parametros.ap} mm`} />
            <DetailCell label="ae" value={`${parametros.ae} mm`} />
            <DetailCell label="RPM" value={fmt(resultado.rpm)} highlight="text-primary" />
            <DetailCell label="Feed" value={`${fmt(resultado.avanco)} mm/min`} highlight="text-secondary" />
            <DetailCell label="Potência" value={`${resultado.potenciaMotor.toFixed(2)} kW`} highlight="text-accent-orange" />
            <DetailCell label="MRR" value={`${resultado.mrr.toFixed(1)} cm³/min`} />
            <DetailCell label="Torque" value={`${resultado.torque.toFixed(2)} Nm`} />
            <DetailCell label="Vc Real" value={`${resultado.vcReal.toFixed(0)} m/min`} />
            <DetailCell label="L/D" value={resultado.seguranca.razaoLD.toFixed(1)} />
            <DetailCell label="CTF" value={resultado.seguranca.ctf.toFixed(2)} />
          </div>

          {/* Warnings */}
          {resultado.seguranca.avisos.length > 0 && (
            <div className="bg-seg-vermelho/5 border border-seg-vermelho/20 rounded-lg p-3">
              <span className="text-[10px] text-seg-vermelho font-bold uppercase tracking-wide block mb-1">Avisos</span>
              {resultado.seguranca.avisos.map((a, i) => (
                <p key={i} className="text-xs text-seg-vermelho/80">⚠ {a}</p>
              ))}
            </div>
          )}

          {/* Feedback buttons */}
          <div>
            <span className={LABEL}>Feedback do Operador</span>
            <div className="flex gap-2">
              {FEEDBACK_OPTIONS.map((opt) => (
                <button key={opt.value} onClick={() => onFeedback(entry.feedback === opt.value ? null : opt.value)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs transition-all ${
                    entry.feedback === opt.value
                      ? `${opt.color} bg-white/10 border-current font-bold`
                      : 'text-gray-500 border-white/10 bg-black/30 hover:bg-white/5 hover:text-white'
                  }`}>
                  <span className="material-symbols-outlined text-sm">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <span className={LABEL}>Notas</span>
            <input type="text" value={entry.notas} onChange={(e) => onNotas(e.target.value)}
              placeholder="Observações sobre este cálculo..."
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none placeholder:text-gray-600" />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button onClick={onRestore}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-bold hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined text-sm">restore</span>
              Restaurar Parâmetros
            </button>
            <button onClick={onRemove}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-500 text-xs hover:bg-seg-vermelho/10 hover:text-seg-vermelho hover:border-seg-vermelho/30 transition-all">
              <span className="material-symbols-outlined text-sm">delete</span>
              Remover
            </button>
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
