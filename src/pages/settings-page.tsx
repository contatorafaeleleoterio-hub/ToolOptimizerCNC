import { useState, useRef, useCallback } from 'react';
import { useMachiningStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { MATERIAIS } from '@/data';
import { TipoUsinagem } from '@/types';
import type { Material, CustomMaterial, ClasseISO } from '@/types';
import { NumInput } from '@/components/ui-helpers';

type Section = 'maquina' | 'seguranca' | 'materiais' | 'ferramentas' | 'exibicao' | 'dados';

const SECTIONS: { id: Section; label: string; icon: string }[] = [
  { id: 'maquina', label: 'Máquina', icon: 'precision_manufacturing' },
  { id: 'seguranca', label: 'Segurança', icon: 'shield' },
  { id: 'materiais', label: 'Materiais', icon: 'category' },
  { id: 'ferramentas', label: 'Ferramentas', icon: 'build' },
  { id: 'exibicao', label: 'Exibição', icon: 'display_settings' },
  { id: 'dados', label: 'Dados', icon: 'database' },
];

const CARD = 'bg-card-dark rounded-xl p-4 sm:p-6 border border-white/5 shadow-inner-glow mb-4 sm:mb-6';
const LABEL = 'text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block';

export function SettingsPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [active, setActive] = useState<Section>('maquina');

  const handleBack = () => navigate(isMobile ? '/mobile' : '/');

  return (
    <div className="min-h-screen bg-background-dark p-3 sm:p-6 overflow-y-auto">
      {/* Header */}
      <header className="mb-4 sm:mb-6 flex items-center gap-3 py-3 px-4 sm:py-4 sm:px-6 rounded-2xl bg-surface-dark backdrop-blur-xl border border-white/5 shadow-glass">
        <button onClick={handleBack}
          className="min-h-[44px] px-3 sm:px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 active:bg-white/10 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 text-sm shrink-0">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span className="hidden sm:inline">Voltar</span>
        </button>
        <h1 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg sm:text-2xl">settings</span>
          Configurações
        </h1>
      </header>

      {/* Mobile: horizontal scroll nav / Desktop: sidebar + content */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-[1200px] mx-auto">

        {/* Nav — horizontal scroll on mobile, vertical sidebar on desktop */}
        <nav className="sm:w-56 sm:shrink-0 sm:sticky sm:top-6 sm:h-fit">
          {/* Mobile: scrollable pill row */}
          <div className="flex sm:flex-col gap-1 overflow-x-auto pb-1 sm:pb-0 sm:bg-surface-dark sm:backdrop-blur-xl sm:border sm:border-white/5 sm:rounded-2xl sm:p-3 sm:shadow-glass">
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all shrink-0 sm:w-full sm:mb-1
                  ${active === s.id
                    ? 'bg-primary/10 border border-primary/30 text-primary font-semibold'
                    : 'border border-white/10 sm:border-transparent text-gray-400 active:bg-white/10 hover:bg-white/5 hover:text-white'
                  }`}>
                <span className="material-symbols-outlined text-base sm:text-lg">{s.icon}</span>
                <span className="whitespace-nowrap">{s.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {active === 'maquina' && <MaquinaSection />}
          {active === 'seguranca' && <SegurancaSection />}
          {active === 'materiais' && <MateriaisSection />}
          {active === 'ferramentas' && <FerramentasSection />}
          {active === 'exibicao' && <ExibicaoSection />}
          {active === 'dados' && <DadosSection />}
        </div>
      </div>
    </div>
  );
}

/* ── Máquina ── */
function MaquinaSection() {
  const limites = useMachiningStore((s) => s.limitesMaquina);
  const setLimites = useMachiningStore((s) => s.setLimitesMaquina);
  const preferences = useMachiningStore((s) => s.preferences);
  const setPreferences = useMachiningStore((s) => s.setPreferences);

  return (
    <div>
      <SectionHeader icon="precision_manufacturing" title="Máquina" desc="Limites físicos e identificação da máquina CNC" />

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-primary rounded-full" />
          Identificação
        </h3>
        <label className={LABEL}>Nome / Modelo da Máquina</label>
        <input type="text" value={preferences.machineName}
          onChange={(e) => setPreferences({ machineName: e.target.value })}
          placeholder="Ex: Haas VF-2, Romi D800..."
          className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none placeholder:text-gray-600" />
      </div>

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-accent-orange rounded-full" />
          Limites da Máquina
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumInput label="RPM Máximo" value={limites.maxRPM} onChange={(v) => setLimites({ maxRPM: v })} min={100} max={40000} step={100} />
          <NumInput label="Potência Máxima (kW)" value={limites.maxPotencia} onChange={(v) => setLimites({ maxPotencia: v })} min={0.5} max={100} step={0.5} />
          <NumInput label="Torque Máximo (Nm)" value={limites.maxTorque} onChange={(v) => setLimites({ maxTorque: v })} min={1} max={500} step={1} />
          <NumInput label="Avanço Máximo (mm/min)" value={limites.maxAvanco} onChange={(v) => setLimites({ maxAvanco: v })} min={100} max={20000} step={100} />
        </div>
      </div>

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-secondary rounded-full" />
          Eficiência do Fuso
        </h3>
        <NumInput label="Eficiência (η)" value={limites.eficiencia} onChange={(v) => setLimites({ eficiencia: v })} min={0.5} max={1.0} step={0.01} />
        <p className="text-[10px] text-gray-500 mt-2">Relação entre potência entregue no fuso e potência consumida. Valor típico: 0.80–0.90</p>
      </div>
    </div>
  );
}

/* ── StyledSlider (same as fine-tune-panel) ── */
const BTN_CLS = 'w-6 h-6 rounded bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all text-xs font-bold flex items-center justify-center';

function StyledSlider({ value, min, max, step, color, rgb, label, onChange }: {
  value: number; min: number; max: number; step: number;
  color: string; rgb: string; label: string;
  onChange: (val: number) => void;
}) {
  const [pressed, setPressed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const pct = ((value - min) / (max - min)) * 100;

  const getValueFromX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return value;
    const rect = track.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const raw = min + p * (max - min);
    return Math.max(min, Math.min(max, Math.round(raw / step) * step));
  }, [min, max, step, value]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setPressed(true);
    onChange(getValueFromX(e.clientX));
    const onMove = (ev: MouseEvent) => onChange(getValueFromX(ev.clientX));
    const onUp = () => {
      setPressed(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [onChange, getValueFromX]);

  return (
    <div
      ref={trackRef}
      className="relative h-10 flex items-center cursor-pointer select-none"
      onMouseDown={handleMouseDown}
      role="slider"
      aria-label={`${label} slider`}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') onChange(Math.min(max, +(value + step).toFixed(4)));
        if (e.key === 'ArrowLeft') onChange(Math.max(min, +(value - step).toFixed(4)));
      }}
    >
      {/* Track background */}
      <div className="absolute left-0 right-0 h-1.5 bg-black/40 rounded-full" />
      {/* Filled track */}
      <div
        className="absolute left-0 h-1.5 rounded-full pointer-events-none"
        style={{ width: `${pct}%`, background: `rgba(${rgb},1)`, boxShadow: `0 0 8px rgba(${rgb},0.6)` }}
      />
      {/* Thumb */}
      <div
        className="absolute -translate-x-1/2 pointer-events-none transition-transform duration-100"
        style={{ left: `${pct}%`, transform: `translateX(-50%) scale(${pressed ? 1.15 : 1})` }}
      >
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 border-2 border-${color}`}
          style={{
            boxShadow: pressed
              ? `0 0 20px rgba(${rgb},0.9), 0 0 8px rgba(${rgb},0.5)`
              : `0 0 10px rgba(${rgb},0.4)`,
            background: 'rgba(15,20,25,0.9)',
          }}
        >
          <div
            className="rounded-full transition-all duration-150"
            style={{ width: pressed ? '10px' : '8px', height: pressed ? '10px' : '8px', background: `rgba(${rgb},1)`, boxShadow: `0 0 6px rgba(${rgb},0.8)` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Segurança ── */
function SegurancaSection() {
  const safetyFactor = useMachiningStore((s) => s.safetyFactor);
  const setSafetyFactor = useMachiningStore((s) => s.setSafetyFactor);
  const safetyRules = useMachiningStore((s) => s.safetyRules);
  const setSafetyRules = useMachiningStore((s) => s.setSafetyRules);

  return (
    <div>
      <SectionHeader icon="shield" title="Segurança" desc="Fator de segurança, limites L/D e multiplicadores ap" />

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-seg-verde rounded-full" />
          Fator de Segurança
        </h3>
        <div className="flex items-center gap-2">
          <button
            className={BTN_CLS}
            onClick={() => setSafetyFactor(Math.max(0.5, +(safetyFactor - 0.05).toFixed(2)))}
            aria-label="Diminuir fator de segurança"
          >−</button>
          <div className="flex-1">
            <StyledSlider
              value={safetyFactor}
              min={0.5}
              max={1.0}
              step={0.05}
              color="primary"
              rgb="0,217,255"
              label="Fator de Segurança"
              onChange={(v) => setSafetyFactor(+(v.toFixed(2)))}
            />
          </div>
          <button
            className={BTN_CLS}
            onClick={() => setSafetyFactor(Math.min(1.0, +(safetyFactor + 0.05).toFixed(2)))}
            aria-label="Aumentar fator de segurança"
          >+</button>
          <span className="text-lg font-mono font-bold text-primary w-14 text-right">{safetyFactor.toFixed(2)}</span>
        </div>
        <p className="text-[10px] text-gray-500 mt-2">Aplicado a Potência, Torque. Valores mais baixos = mais conservador.</p>
      </div>

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-seg-amarelo rounded-full" />
          Limites L/D (Balanço / Diâmetro)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={LABEL}>
              <span className="inline-block w-2 h-2 bg-seg-verde rounded-full mr-1" />
              Seguro (verde)
            </label>
            <input type="number" value={safetyRules.ld.seguro} min={1} max={10} step={0.5}
              onChange={(e) => setSafetyRules({ ld: { ...safetyRules.ld, seguro: Number(e.target.value) } })}
              className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-seg-verde outline-none" />
          </div>
          <div>
            <label className={LABEL}>
              <span className="inline-block w-2 h-2 bg-seg-amarelo rounded-full mr-1" />
              Alerta (amarelo)
            </label>
            <input type="number" value={safetyRules.ld.alerta} min={1} max={10} step={0.5}
              onChange={(e) => setSafetyRules({ ld: { ...safetyRules.ld, alerta: Number(e.target.value) } })}
              className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-seg-amarelo outline-none" />
          </div>
          <div>
            <label className={LABEL}>
              <span className="inline-block w-2 h-2 bg-seg-vermelho rounded-full mr-1" />
              Crítico (vermelho)
            </label>
            <input type="number" value={safetyRules.ld.critico} min={1} max={15} step={0.5}
              onChange={(e) => setSafetyRules({ ld: { ...safetyRules.ld, critico: Number(e.target.value) } })}
              className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-seg-vermelho outline-none" />
          </div>
        </div>
        <p className="text-[10px] text-gray-500 mt-3">L/D {'>'} Crítico = Bloqueado. Padrão: Seguro ≤3, Alerta {'<'}4, Crítico ≤6</p>
      </div>

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-accent-purple rounded-full" />
          Multiplicadores ap por Operação
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumInput label="Desbaste" value={safetyRules.apMaxMult[TipoUsinagem.DESBASTE]}
            onChange={(v) => setSafetyRules({ apMaxMult: { ...safetyRules.apMaxMult, [TipoUsinagem.DESBASTE]: v } })}
            min={0.1} max={2.0} step={0.1} />
          <NumInput label="Semi-Acabamento" value={safetyRules.apMaxMult[TipoUsinagem.SEMI_ACABAMENTO]}
            onChange={(v) => setSafetyRules({ apMaxMult: { ...safetyRules.apMaxMult, [TipoUsinagem.SEMI_ACABAMENTO]: v } })}
            min={0.1} max={2.0} step={0.1} />
          <NumInput label="Acabamento" value={safetyRules.apMaxMult[TipoUsinagem.ACABAMENTO]}
            onChange={(v) => setSafetyRules({ apMaxMult: { ...safetyRules.apMaxMult, [TipoUsinagem.ACABAMENTO]: v } })}
            min={0.1} max={2.0} step={0.1} />
        </div>
      </div>
    </div>
  );
}

/* ── Materiais ── */
function MateriaisSection() {
  const customMaterials = useMachiningStore((s) => s.customMaterials);
  const addCustomMaterial = useMachiningStore((s) => s.addCustomMaterial);
  const updateCustomMaterial = useMachiningStore((s) => s.updateCustomMaterial);
  const removeCustomMaterial = useMachiningStore((s) => s.removeCustomMaterial);
  const [showForm, setShowForm] = useState(false);
  // editingId: ID of the material being edited (base or custom)
  const [editingId, setEditingId] = useState<number | null>(null);

  // Returns the effective material to display: custom override takes precedence over base
  const getEffective = (baseId: number): Material | CustomMaterial => {
    const override = customMaterials.find((c) => c.id === baseId);
    return override ?? (MATERIAIS.find((m) => m.id === baseId) as Material);
  };

  // Custom materials that are NOT overrides of base materials (IDs > 9)
  const extraCustom = customMaterials.filter((c) => !MATERIAIS.some((m) => m.id === c.id));

  const handleSave = (m: CustomMaterial) => {
    const existingCustom = customMaterials.find((c) => c.id === m.id);
    if (existingCustom) {
      updateCustomMaterial(m.id, m);
    } else {
      addCustomMaterial(m);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleEditClick = (id: number) => {
    setShowForm(false);
    setEditingId(id);
  };

  const handleAddClick = () => {
    setEditingId(null);
    setShowForm((v) => !v);
  };

  const isOverride = (id: number) => customMaterials.some((c) => c.id === id);

  return (
    <div>
      <SectionHeader icon="category" title="Materiais" desc="Banco de materiais com edição personalizada" />

      <div className={CARD}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1 h-3 bg-primary rounded-full" />
            Todos os Materiais
          </h3>
          <button onClick={handleAddClick}
            className="min-h-[44px] px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-bold active:bg-primary/20 hover:bg-primary/20 transition-all flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">add</span>
            Adicionar
          </button>
        </div>

        {showForm && (
          <MaterialForm onSave={handleSave} onCancel={() => setShowForm(false)} />
        )}

        <div className="space-y-2">
          {/* Base materials (IDs 1-9) — show override if exists */}
          {MATERIAIS.map((base) => {
            const mat = getEffective(base.id);
            const custom = isOverride(base.id);
            if (editingId === base.id) {
              return (
                <div key={base.id}>
                  <MaterialForm
                    initialValues={{ ...mat, isCustom: true } as CustomMaterial}
                    onSave={handleSave}
                    onCancel={() => setEditingId(null)}
                  />
                </div>
              );
            }
            return (
              <div key={base.id} className={`flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg border ${custom ? 'bg-accent-orange/5 border-accent-orange/20' : 'bg-black/30 border-white/5'}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  {custom ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent-orange/20 text-accent-orange shrink-0">Custom</span>
                  ) : (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      mat.iso === 'P' ? 'bg-blue-500/20 text-blue-400' :
                      mat.iso === 'M' ? 'bg-yellow-500/20 text-yellow-400' :
                      mat.iso === 'N' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>ISO {mat.iso}</span>
                  )}
                  <span className="text-sm text-gray-200">{mat.nome}</span>
                  {mat.status === 'estimado' && !custom && <span className="text-[10px] text-seg-amarelo">⚠ Estimado</span>}
                  <span className="text-[10px] text-gray-500 font-mono hidden sm:inline">Kc={mat.kc1_1} | {mat.dureza}</span>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleEditClick(base.id)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  {custom && (
                    <button onClick={() => removeCustomMaterial(base.id)}
                      title="Restaurar padrão"
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-500 hover:text-seg-vermelho transition-colors">
                      <span className="material-symbols-outlined text-sm">restart_alt</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Extra custom materials (IDs > 9) */}
          {extraCustom.map((m) => {
            if (editingId === m.id) {
              return (
                <div key={m.id}>
                  <MaterialForm
                    initialValues={m}
                    onSave={handleSave}
                    onCancel={() => setEditingId(null)}
                  />
                </div>
              );
            }
            return (
              <div key={m.id} className="flex items-center justify-between px-3 py-2 bg-black/30 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary/20 text-secondary shrink-0">Custom</span>
                  <span className="text-sm text-gray-200">{m.nome}</span>
                  <span className="text-[10px] text-gray-500 font-mono hidden sm:inline">Kc={m.kc1_1} | ISO {m.iso}</span>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleEditClick(m.id)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button onClick={() => removeCustomMaterial(m.id)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-500 hover:text-seg-vermelho transition-colors">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MaterialForm({
  onSave,
  onCancel,
  initialValues,
}: {
  onSave: (m: CustomMaterial) => void;
  onCancel: () => void;
  initialValues?: CustomMaterial;
}) {
  const isEditing = !!initialValues;
  const [nome, setNome] = useState(initialValues?.nome ?? '');
  const [iso, setIso] = useState<ClasseISO>(initialValues?.iso ?? 'P');
  const [dureza, setDureza] = useState(initialValues?.dureza ?? '');
  const [kc, setKc] = useState(initialValues?.kc1_1 ?? 2000);
  const [mc, setMc] = useState(initialValues?.mc ?? 0.2);
  const [vcDes, setVcDes] = useState<[number, number]>(
    initialValues?.vcRanges[TipoUsinagem.DESBASTE] ?? [100, 200]
  );
  const [vcSemi, setVcSemi] = useState<[number, number]>(
    initialValues?.vcRanges[TipoUsinagem.SEMI_ACABAMENTO] ?? [120, 240]
  );
  const [vcAcab, setVcAcab] = useState<[number, number]>(
    initialValues?.vcRanges[TipoUsinagem.ACABAMENTO] ?? [150, 280]
  );

  const handleSubmit = () => {
    if (!nome.trim()) return;
    onSave({
      id: initialValues?.id ?? Date.now(),
      nome: nome.trim(),
      iso,
      dureza: dureza || 'N/A',
      kc1_1: kc,
      mc,
      vcRanges: {
        [TipoUsinagem.DESBASTE]: vcDes,
        [TipoUsinagem.SEMI_ACABAMENTO]: vcSemi,
        [TipoUsinagem.ACABAMENTO]: vcAcab,
      },
      status: 'estimado',
      isCustom: true,
    });
  };

  return (
    <div className={`bg-black/30 rounded-lg border p-4 mb-4 space-y-3 ${isEditing ? 'border-accent-orange/30' : 'border-primary/20'}`}>
      {isEditing && (
        <p className="text-[10px] font-semibold text-accent-orange uppercase tracking-wide flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">edit</span>
          Editando material
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={LABEL}>Nome do Material</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Aço 4140"
            className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className={LABEL}>Classe ISO</label>
          <select value={iso} onChange={(e) => setIso(e.target.value as ClasseISO)}
            className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none">
            <option value="P">P - Aço</option>
            <option value="M">M - Inox</option>
            <option value="N">N - Não Ferroso</option>
            <option value="H">H - Duro</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className={LABEL}>Dureza</label>
          <input type="text" value={dureza} onChange={(e) => setDureza(e.target.value)} placeholder="Ex: 200-250 HB"
            className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <NumInput label="Kc 1.1 (N/mm²)" value={kc} onChange={setKc} min={500} max={5000} step={50} />
        <NumInput label="mc (expoente)" value={mc} onChange={setMc} min={0.05} max={1.0} step={0.01} />
      </div>
      <div>
        <label className={LABEL}>Faixas de Vc (m/min): Desbaste / Semi / Acabamento</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] text-gray-600 mb-1 block">Desbaste</label>
            <div className="flex gap-1">
              <input type="number" value={vcDes[0]} onChange={(e) => setVcDes([Number(e.target.value), vcDes[1]])}
                className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none" />
              <input type="number" value={vcDes[1]} onChange={(e) => setVcDes([vcDes[0], Number(e.target.value)])}
                className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-gray-600 mb-1 block">Semi-Acab.</label>
            <div className="flex gap-1">
              <input type="number" value={vcSemi[0]} onChange={(e) => setVcSemi([Number(e.target.value), vcSemi[1]])}
                className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none" />
              <input type="number" value={vcSemi[1]} onChange={(e) => setVcSemi([vcSemi[0], Number(e.target.value)])}
                className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-gray-600 mb-1 block">Acabamento</label>
            <div className="flex gap-1">
              <input type="number" value={vcAcab[0]} onChange={(e) => setVcAcab([Number(e.target.value), vcAcab[1]])}
                className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none" />
              <input type="number" value={vcAcab[1]} onChange={(e) => setVcAcab([vcAcab[0], Number(e.target.value)])}
                className="w-full min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={handleSubmit}
          className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            isEditing
              ? 'bg-accent-orange/20 border border-accent-orange/40 text-accent-orange active:bg-accent-orange/30 hover:bg-accent-orange/30'
              : 'bg-primary/20 border border-primary/40 text-primary active:bg-primary/30 hover:bg-primary/30'
          }`}>
          {isEditing ? 'Salvar Alterações' : 'Salvar Material'}
        </button>
        <button onClick={onCancel}
          className="min-h-[44px] px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs active:bg-white/10 hover:bg-white/10 transition-all">
          Cancelar
        </button>
      </div>
    </div>
  );
}

/* ── Ferramentas ── */
function FerramentasSection() {
  const customToolConfig = useMachiningStore((s) => s.customToolConfig);
  const setCustomToolConfig = useMachiningStore((s) => s.setCustomToolConfig);
  const [newDiam, setNewDiam] = useState('');
  const [newRadius, setNewRadius] = useState('');

  const addDiameter = () => {
    const v = Number(newDiam);
    if (v > 0 && !customToolConfig.extraDiameters.includes(v)) {
      setCustomToolConfig({ extraDiameters: [...customToolConfig.extraDiameters, v].sort((a, b) => a - b) });
      setNewDiam('');
    }
  };

  const addRadius = () => {
    const v = Number(newRadius);
    if (v > 0 && !customToolConfig.extraRadii.includes(v)) {
      setCustomToolConfig({ extraRadii: [...customToolConfig.extraRadii, v].sort((a, b) => a - b) });
      setNewRadius('');
    }
  };

  return (
    <div>
      <SectionHeader icon="build" title="Ferramentas" desc="Diâmetros e raios de ponta disponíveis" />

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-primary rounded-full" />
          Diâmetros Padrão (mm)
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {[0.2, 0.5, 0.75, 0.8, 1, 1.5, 2, 3, 4, 6, 8, 10, 12, 14, 16].map((d) => (
            <span key={d} className="px-3 py-1.5 bg-black/30 border border-white/10 rounded-lg text-xs text-gray-300 font-mono">{d}</span>
          ))}
        </div>
        {customToolConfig.extraDiameters.length > 0 && (
          <>
            <label className={LABEL}>Diâmetros Customizados</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {customToolConfig.extraDiameters.map((d) => (
                <span key={d} className="px-3 py-1.5 bg-secondary/10 border border-secondary/30 rounded-lg text-xs text-secondary font-mono flex items-center gap-1">
                  {d}
                  <button onClick={() => setCustomToolConfig({ extraDiameters: customToolConfig.extraDiameters.filter((x) => x !== d) })}
                    className="text-gray-500 hover:text-seg-vermelho ml-1">×</button>
                </span>
              ))}
            </div>
          </>
        )}
        <div className="flex gap-2">
          <input type="number" value={newDiam} onChange={(e) => setNewDiam(e.target.value)}
            placeholder="Novo diâmetro (mm)" step={0.1} min={0.1}
            className="flex-1 min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none" />
          <button onClick={addDiameter}
            className="min-h-[44px] px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-bold active:bg-primary/20 hover:bg-primary/20 transition-all">
            Adicionar
          </button>
        </div>
      </div>

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-accent-orange rounded-full" />
          Raios de Ponta (mm)
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {[0.2, 0.5, 1.0].map((r) => (
            <span key={r} className="px-3 py-1.5 bg-black/30 border border-white/10 rounded-lg text-xs text-gray-300 font-mono">{r}</span>
          ))}
        </div>
        {customToolConfig.extraRadii.length > 0 && (
          <>
            <label className={LABEL}>Raios Customizados</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {customToolConfig.extraRadii.map((r) => (
                <span key={r} className="px-3 py-1.5 bg-accent-orange/10 border border-accent-orange/30 rounded-lg text-xs text-accent-orange font-mono flex items-center gap-1">
                  {r}
                  <button onClick={() => setCustomToolConfig({ extraRadii: customToolConfig.extraRadii.filter((x) => x !== r) })}
                    className="text-gray-500 hover:text-seg-vermelho ml-1">×</button>
                </span>
              ))}
            </div>
          </>
        )}
        <div className="flex gap-2">
          <input type="number" value={newRadius} onChange={(e) => setNewRadius(e.target.value)}
            placeholder="Novo raio (mm)" step={0.1} min={0.1}
            className="flex-1 min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none" />
          <button onClick={addRadius}
            className="min-h-[44px] px-4 py-2 rounded-lg bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-xs font-bold active:bg-accent-orange/20 hover:bg-accent-orange/20 transition-all">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Exibição ── */
function ExibicaoSection() {
  const preferences = useMachiningStore((s) => s.preferences);
  const setPreferences = useMachiningStore((s) => s.setPreferences);

  return (
    <div>
      <SectionHeader icon="display_settings" title="Exibição" desc="Preferências visuais e formato numérico" />

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-primary rounded-full" />
          Precisão Decimal
        </h3>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4].map((n) => (
            <button key={n} onClick={() => setPreferences({ decimals: n })}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-mono font-bold transition-all ${
                preferences.decimals === n
                  ? 'bg-primary/20 border border-primary/40 text-primary'
                  : 'bg-black/30 border border-white/10 text-gray-400 active:bg-white/5 hover:bg-white/5'
              }`}>
              {n === 0 ? '1234' : n === 1 ? '123.4' : n === 2 ? '12.34' : n === 3 ? '1.234' : '0.1234'}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-gray-500 mt-3">Número de casas decimais exibidas nos resultados. Padrão: 2</p>
      </div>
    </div>
  );
}

/* ── Dados ── */
function DadosSection() {
  const exportSettings = useMachiningStore((s) => s.exportSettings);
  const importSettings = useMachiningStore((s) => s.importSettings);
  const resetToDefaults = useMachiningStore((s) => s.resetToDefaults);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMsg, setImportMsg] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const handleExport = () => {
    const json = exportSettings();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tooloptimizer-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const ok = importSettings(ev.target?.result as string);
      setImportMsg(ok ? 'Configurações importadas com sucesso!' : 'Erro ao importar. Verifique o arquivo.');
      setTimeout(() => setImportMsg(''), 3000);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 5000);
      return;
    }
    resetToDefaults();
    setConfirmReset(false);
  };

  return (
    <div>
      <SectionHeader icon="database" title="Dados" desc="Exportar, importar e resetar configurações" />

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-primary rounded-full" />
          Gerenciamento de Dados
        </h3>
        <div className="space-y-3">
          <button onClick={handleExport}
            className="w-full min-h-[48px] flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 active:bg-white/10 hover:bg-white/10 hover:text-white transition-all text-sm">
            <span className="material-symbols-outlined text-primary">download</span>
            Exportar Configurações (JSON)
          </button>

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full min-h-[48px] flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 active:bg-white/10 hover:bg-white/10 hover:text-white transition-all text-sm">
            <span className="material-symbols-outlined text-secondary">upload</span>
            Importar Configurações (JSON)
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />

          {importMsg && (
            <p className={`text-xs px-3 py-2 rounded-lg ${importMsg.includes('sucesso') ? 'bg-seg-verde/10 text-seg-verde' : 'bg-seg-vermelho/10 text-seg-vermelho'}`}>
              {importMsg}
            </p>
          )}

          <div className="pt-3 border-t border-white/5">
            <button onClick={handleReset}
              className={`w-full min-h-[48px] flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                confirmReset
                  ? 'bg-seg-vermelho/10 border-seg-vermelho/40 text-seg-vermelho font-bold'
                  : 'bg-white/5 border-white/10 text-gray-400 active:bg-white/10 hover:bg-white/10 hover:text-white'
              }`}>
              <span className="material-symbols-outlined">restart_alt</span>
              {confirmReset ? 'Clique novamente para confirmar o reset' : 'Restaurar Padrões de Fábrica'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Shared ── */
function SectionHeader({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="mb-4 sm:mb-6">
      <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">{icon}</span>
        {title}
      </h2>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </div>
  );
}
