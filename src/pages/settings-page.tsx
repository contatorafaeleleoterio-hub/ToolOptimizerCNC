import { useState, useRef } from 'react';
import { useMachiningStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { MATERIAIS } from '@/data';
import { TipoUsinagem } from '@/types';
import type { CustomMaterial, ClasseISO } from '@/types';
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

const CARD = 'bg-card-dark rounded-xl p-6 border border-white/5 shadow-inner-glow mb-6';
const LABEL = 'text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block';

export function SettingsPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState<Section>('maquina');

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
          <span className="material-symbols-outlined text-primary">settings</span>
          Configurações
        </h1>
      </header>

      {/* Sidebar + Content */}
      <div className="flex gap-6 max-w-[1200px] mx-auto">
        {/* Sidebar */}
        <nav className="w-64 shrink-0 bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-3 shadow-glass h-fit sticky top-6">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all mb-1 ${
                active === s.id
                  ? 'bg-primary/10 border border-primary/30 text-primary font-semibold'
                  : 'border border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
              }`}>
              <span className="material-symbols-outlined text-lg">{s.icon}</span>
              {s.label}
            </button>
          ))}
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
          className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none placeholder:text-gray-600" />
      </div>

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-accent-orange rounded-full" />
          Limites da Máquina
        </h3>
        <div className="grid grid-cols-2 gap-4">
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
        <div className="flex items-center gap-4">
          <input type="range" min={0.5} max={1.0} step={0.05} value={safetyFactor}
            onChange={(e) => setSafetyFactor(Number(e.target.value))}
            className="flex-1 accent-primary h-2" />
          <span className="text-lg font-mono font-bold text-primary w-16 text-right">{safetyFactor.toFixed(2)}</span>
        </div>
        <p className="text-[10px] text-gray-500 mt-2">Aplicado a Potência, Torque. Valores mais baixos = mais conservador.</p>
      </div>

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-seg-amarelo rounded-full" />
          Limites L/D (Balanço / Diâmetro)
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={LABEL}>
              <span className="inline-block w-2 h-2 bg-seg-verde rounded-full mr-1" />
              Seguro (verde)
            </label>
            <input type="number" value={safetyRules.ld.seguro} min={1} max={10} step={0.5}
              onChange={(e) => setSafetyRules({ ld: { ...safetyRules.ld, seguro: Number(e.target.value) } })}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-seg-verde outline-none" />
          </div>
          <div>
            <label className={LABEL}>
              <span className="inline-block w-2 h-2 bg-seg-amarelo rounded-full mr-1" />
              Alerta (amarelo)
            </label>
            <input type="number" value={safetyRules.ld.alerta} min={1} max={10} step={0.5}
              onChange={(e) => setSafetyRules({ ld: { ...safetyRules.ld, alerta: Number(e.target.value) } })}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-seg-amarelo outline-none" />
          </div>
          <div>
            <label className={LABEL}>
              <span className="inline-block w-2 h-2 bg-seg-vermelho rounded-full mr-1" />
              Crítico (vermelho)
            </label>
            <input type="number" value={safetyRules.ld.critico} min={1} max={15} step={0.5}
              onChange={(e) => setSafetyRules({ ld: { ...safetyRules.ld, critico: Number(e.target.value) } })}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-seg-vermelho outline-none" />
          </div>
        </div>
        <p className="text-[10px] text-gray-500 mt-3">L/D {'>'} Crítico = Bloqueado. Padrão: Seguro ≤3, Alerta {'<'}4, Crítico ≤6</p>
      </div>

      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-accent-purple rounded-full" />
          Multiplicadores ap por Operação
        </h3>
        <div className="grid grid-cols-3 gap-4">
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
  const removeCustomMaterial = useMachiningStore((s) => s.removeCustomMaterial);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (m: CustomMaterial) => {
    addCustomMaterial(m);
    setShowForm(false);
  };

  return (
    <div>
      <SectionHeader icon="category" title="Materiais" desc="Banco de materiais padrão e personalizados" />

      {/* Built-in materials */}
      <div className={CARD}>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1 h-3 bg-primary rounded-full" />
          Materiais Base (somente leitura)
        </h3>
        <div className="space-y-2">
          {MATERIAIS.map((m) => (
            <div key={m.id} className="flex items-center justify-between px-3 py-2 bg-black/30 rounded-lg border border-white/5">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  m.iso === 'P' ? 'bg-blue-500/20 text-blue-400' :
                  m.iso === 'M' ? 'bg-yellow-500/20 text-yellow-400' :
                  m.iso === 'N' ? 'bg-green-500/20 text-green-400' :
                  'bg-red-500/20 text-red-400'
                }`}>ISO {m.iso}</span>
                <span className="text-sm text-gray-200">{m.nome}</span>
                {m.status === 'estimado' && <span className="text-[10px] text-seg-amarelo">⚠ Estimado</span>}
              </div>
              <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono">
                <span>Kc={m.kc1_1}</span>
                <span>{m.dureza}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom materials */}
      <div className={CARD}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1 h-3 bg-secondary rounded-full" />
            Materiais Personalizados
          </h3>
          <button onClick={() => setShowForm(!showForm)}
            className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-bold hover:bg-primary/20 transition-all flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">add</span>
            Adicionar
          </button>
        </div>

        {showForm && <MaterialForm onSave={handleAdd} onCancel={() => setShowForm(false)} />}

        {customMaterials.length === 0 && !showForm && (
          <p className="text-sm text-gray-500 text-center py-4">Nenhum material personalizado adicionado</p>
        )}
        {customMaterials.map((m) => (
          <div key={m.id} className="flex items-center justify-between px-3 py-2 bg-black/30 rounded-lg border border-white/5 mb-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary/20 text-secondary">Custom</span>
              <span className="text-sm text-gray-200">{m.nome}</span>
            </div>
            <button onClick={() => removeCustomMaterial(m.id)}
              className="text-gray-500 hover:text-seg-vermelho transition-colors">
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MaterialForm({ onSave, onCancel }: { onSave: (m: CustomMaterial) => void; onCancel: () => void }) {
  const [nome, setNome] = useState('');
  const [iso, setIso] = useState<ClasseISO>('P');
  const [dureza, setDureza] = useState('');
  const [kc, setKc] = useState(2000);
  const [mc, setMc] = useState(0.2);
  const [vcDes, setVcDes] = useState<[number, number]>([100, 200]);
  const [vcSemi, setVcSemi] = useState<[number, number]>([120, 240]);
  const [vcAcab, setVcAcab] = useState<[number, number]>([150, 280]);

  const handleSubmit = () => {
    if (!nome.trim()) return;
    onSave({
      id: Date.now(),
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
    <div className="bg-black/30 rounded-lg border border-primary/20 p-4 mb-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LABEL}>Nome do Material</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Aço 4140"
            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className={LABEL}>Classe ISO</label>
          <select value={iso} onChange={(e) => setIso(e.target.value as ClasseISO)}
            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none">
            <option value="P">P - Aço</option>
            <option value="M">M - Inox</option>
            <option value="N">N - Não Ferroso</option>
            <option value="H">H - Duro</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={LABEL}>Dureza</label>
          <input type="text" value={dureza} onChange={(e) => setDureza(e.target.value)} placeholder="Ex: 200-250 HB"
            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <NumInput label="Kc 1.1 (N/mm²)" value={kc} onChange={setKc} min={500} max={5000} step={50} />
        <NumInput label="mc (expoente)" value={mc} onChange={setMc} min={0.05} max={1.0} step={0.01} />
      </div>
      <div>
        <label className={LABEL}>Faixas de Vc (m/min): Desbaste / Semi / Acabamento</label>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex gap-1">
            <input type="number" value={vcDes[0]} onChange={(e) => setVcDes([Number(e.target.value), vcDes[1]])}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none" />
            <input type="number" value={vcDes[1]} onChange={(e) => setVcDes([vcDes[0], Number(e.target.value)])}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none" />
          </div>
          <div className="flex gap-1">
            <input type="number" value={vcSemi[0]} onChange={(e) => setVcSemi([Number(e.target.value), vcSemi[1]])}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none" />
            <input type="number" value={vcSemi[1]} onChange={(e) => setVcSemi([vcSemi[0], Number(e.target.value)])}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none" />
          </div>
          <div className="flex gap-1">
            <input type="number" value={vcAcab[0]} onChange={(e) => setVcAcab([Number(e.target.value), vcAcab[1]])}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none" />
            <input type="number" value={vcAcab[1]} onChange={(e) => setVcAcab([vcAcab[0], Number(e.target.value)])}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono outline-none" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={handleSubmit}
          className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/40 text-primary text-xs font-bold hover:bg-primary/30 transition-all">
          Salvar Material
        </button>
        <button onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs hover:bg-white/10 transition-all">
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
                    className="text-gray-500 hover:text-seg-vermelho">×</button>
                </span>
              ))}
            </div>
          </>
        )}
        <div className="flex gap-2">
          <input type="number" value={newDiam} onChange={(e) => setNewDiam(e.target.value)}
            placeholder="Novo diâmetro (mm)" step={0.1} min={0.1}
            className="flex-1 bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none" />
          <button onClick={addDiameter}
            className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-bold hover:bg-primary/20 transition-all">
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
                    className="text-gray-500 hover:text-seg-vermelho">×</button>
                </span>
              ))}
            </div>
          </>
        )}
        <div className="flex gap-2">
          <input type="number" value={newRadius} onChange={(e) => setNewRadius(e.target.value)}
            placeholder="Novo raio (mm)" step={0.1} min={0.1}
            className="flex-1 bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none" />
          <button onClick={addRadius}
            className="px-4 py-2 rounded-lg bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-xs font-bold hover:bg-accent-orange/20 transition-all">
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
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((n) => (
            <button key={n} onClick={() => setPreferences({ decimals: n })}
              className={`px-5 py-3 rounded-xl text-sm font-mono font-bold transition-all ${
                preferences.decimals === n
                  ? 'bg-primary/20 border border-primary/40 text-primary'
                  : 'bg-black/30 border border-white/10 text-gray-400 hover:bg-white/5'
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm">
            <span className="material-symbols-outlined text-primary">download</span>
            Exportar Configurações (JSON)
          </button>

          <button onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm">
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                confirmReset
                  ? 'bg-seg-vermelho/10 border-seg-vermelho/40 text-seg-vermelho font-bold'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
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
    <div className="mb-6">
      <h2 className="text-lg font-bold text-white flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">{icon}</span>
        {title}
      </h2>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </div>
  );
}
