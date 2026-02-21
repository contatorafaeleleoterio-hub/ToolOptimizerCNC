import { useState, useRef, useCallback } from 'react';
import { useMachiningStore } from '@/store';
import { MATERIAIS } from '@/data';
import { ParameterHealthBar } from './parameter-health-bar';

const SLIDER_CONFIG = [
  { key: 'vc' as const, label: 'Vc', fullLabel: 'VEL. DE CORTE', unit: 'M/MIN', color: 'primary',
    rgb: '0,217,255',
    desc: 'Velocidade tangencial na aresta da ferramenta durante o corte.',
    aumentar: 'Usinagem mais rápida, mas desgaste prematuro e mais calor gerado.',
    diminuir: 'Ferramenta mais protegida, porém pode manchar o acabamento superficial.',
    equilibrio: 'Ajuste junto com fz — material mais duro exige Vc menor.',
    min: 1, max: 1200, step: 1 },
  { key: 'fz' as const, label: 'fz', fullLabel: 'AVANÇO/DENTE', unit: 'MM/DENTE', color: 'secondary',
    rgb: '57,255,20',
    desc: 'Espessura do cavaco por aresta de corte em cada passagem.',
    aumentar: 'Maior taxa de remoção (MRR), mas risco de vibração e quebra da ferramenta.',
    diminuir: 'Acabamento mais fino e menor esforço, porém reduz a produtividade.',
    equilibrio: 'Mantenha fz dentro da recomendação do fabricante da ferramenta.',
    min: 0.01, max: 1, step: 0.01 },
  { key: 'ae' as const, label: 'ae', fullLabel: 'ENGAJ. RADIAL', unit: 'MM', color: 'accent-purple',
    rgb: '168,85,247',
    desc: 'Largura radial de corte — quantos % do diâmetro da fresa está em contato.',
    aumentar: 'Remove mais material por passada, mas aumenta pressão lateral e deflexão.',
    diminuir: 'Menor força lateral — ideal para paredes finas ou ferramentas longas.',
    equilibrio: 'ae < 50% do diâmetro ativa o CTF — compensação automática de avanço.',
    min: 0.1, max: 50, step: 0.1 },
  { key: 'ap' as const, label: 'ap', fullLabel: 'PROF. AXIAL', unit: 'MM', color: 'accent-orange',
    rgb: '249,115,22',
    desc: 'Profundidade axial de corte — principal fator da taxa de remoção de material.',
    aumentar: 'MRR sobe proporcionalmente, mas eleva potência e torque exigidos da máquina.',
    diminuir: 'Operação mais leve — essencial quando a potência da máquina é o fator limitante.',
    equilibrio: 'Combine ap alto com ae baixo para operações de desbaste eficiente.',
    min: 0.05, max: 6, step: 0.05 },
] as const;

const BTN_CLS = 'w-6 h-6 rounded bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all text-xs font-bold flex items-center justify-center';

/** Custom styled slider with mobile-style thumb (ring + inner dot + glow) */
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
        style={{
          width: `${pct}%`,
          background: `rgba(${rgb},1)`,
          boxShadow: `0 0 8px rgba(${rgb},0.6)`,
        }}
      />

      {/* Thumb */}
      <div
        className="absolute -translate-x-1/2 pointer-events-none transition-transform duration-100"
        style={{ left: `${pct}%`, transform: `translateX(-50%) scale(${pressed ? 1.15 : 1})` }}
      >
        {/* Outer ring (glow on press) */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 border-2 border-${color}`}
          style={{
            boxShadow: pressed
              ? `0 0 20px rgba(${rgb},0.9), 0 0 8px rgba(${rgb},0.5)`
              : `0 0 10px rgba(${rgb},0.4)`,
            background: 'rgba(15,20,25,0.9)',
          }}
        >
          {/* Inner dot */}
          <div
            className={`rounded-full transition-all duration-150`}
            style={{
              width: pressed ? '10px' : '8px',
              height: pressed ? '10px' : '8px',
              background: `rgba(${rgb},1)`,
              boxShadow: `0 0 6px rgba(${rgb},0.8)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function FineTunePanel() {
  const parametros = useMachiningStore((s) => s.parametros);
  const setParametros = useMachiningStore((s) => s.setParametros);
  const materialId = useMachiningStore((s) => s.materialId);
  const resultado = useMachiningStore((s) => s.resultado);
  const material = MATERIAIS.find((m) => m.id === materialId);

  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggleDrawer = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-glass h-full flex flex-col overflow-y-auto">
      <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-gray-300">
        <span className="material-symbols-outlined text-base">tune</span> Ajuste Fino
      </h2>

      <div className="flex-1 flex flex-col justify-between gap-3 px-1">
        {SLIDER_CONFIG.map(({ key, label, fullLabel, unit, color, rgb, min, max, step, desc, aumentar, diminuir, equilibrio }) => {
          const val = parametros[key];
          const display = key === 'fz' || key === 'ap' ? val.toFixed(2) : key === 'ae' ? val.toFixed(1) : val.toFixed(0);
          const isOpen = openKey === key;

          return (
            <div key={key} className="flex flex-col gap-1 group relative">
              <div className="flex justify-between items-end">
                <div className="flex items-baseline gap-1.5">
                  {/* Clicable label — opens/closes drawer */}
                  <button
                    onClick={() => toggleDrawer(key)}
                    className="flex items-center gap-1.5 cursor-pointer"
                    aria-expanded={isOpen}
                    aria-label={`Informações sobre ${fullLabel}`}
                  >
                    <span className={`text-sm font-bold font-mono text-${color}`}>{label}</span>
                    <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">{fullLabel}</span>
                    <span
                      className="material-symbols-outlined text-gray-600 transition-transform duration-300"
                      style={{ fontSize: '14px', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      expand_more
                    </span>
                  </button>
                </div>
                <div className="text-right">
                  <input type="number" value={display} step={step} min={min} max={max}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      if (!isNaN(n) && n >= min && n <= max) setParametros({ [key]: n });
                    }}
                    className={`w-20 bg-transparent border-none text-right font-mono text-xl font-bold text-${color} outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    style={{ filter: `drop-shadow(0 0 8px rgba(${rgb},0.4))` }}
                    aria-label={`valor de ${label}`} />
                  <div className="text-[11px] text-gray-500 font-mono tracking-wider">{unit}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button className={BTN_CLS} aria-label={`Diminuir ${label}`}
                  onClick={() => setParametros({ [key]: Math.max(min, +(val - step).toFixed(4)) })}>−</button>
                <div className="flex-1">
                  <StyledSlider
                    value={val} min={min} max={max} step={step}
                    color={color} rgb={rgb} label={label}
                    onChange={(v) => setParametros({ [key]: v })}
                  />
                </div>
                <button className={BTN_CLS} aria-label={`Aumentar ${label}`}
                  onClick={() => setParametros({ [key]: Math.min(max, +(val + step).toFixed(4)) })}>+</button>
              </div>

              {/* Parameter health bar — always visible below slider */}
              <ParameterHealthBar paramKey={key} />

              {/* Educational drawer */}
              {isOpen && (
                <div
                  className="mt-1 rounded-xl border bg-black/30 p-3 animate-[fadeInUp_0.25s_ease-out]"
                  style={{ borderColor: `rgba(${rgb},0.18)` }}
                >
                  <p className="text-xs text-gray-400 leading-relaxed mb-2.5">{desc}</p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <span className="text-[11px] font-bold text-green-400 w-16 shrink-0 pt-0.5 tracking-wide">▲ MAIS</span>
                      <span className="text-xs text-gray-400 leading-relaxed">{aumentar}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[11px] font-bold text-red-400 w-16 shrink-0 pt-0.5 tracking-wide">▼ MENOS</span>
                      <span className="text-xs text-gray-400 leading-relaxed">{diminuir}</span>
                    </div>
                    <div className="flex items-start gap-2 pt-1.5 mt-1 border-t border-white/5">
                      <span className="material-symbols-outlined text-yellow-500 shrink-0 leading-none" style={{ fontSize: '14px' }}>balance</span>
                      <span className="text-xs text-gray-500 italic leading-relaxed">{equilibrio}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-${color}/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left overflow-clip`} />
            </div>
          );
        })}
      </div>

      {/* MRR summary */}
      <div className="mt-4 pt-3 border-t border-white/5">
        <div className="bg-black/30 p-3 rounded-xl flex items-center justify-between border border-white/5 shadow-inner-glow">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-600 text-sm">delete_sweep</span>
            <span className="text-xs text-gray-400">MRR</span>
          </div>
          <span className="font-mono text-base font-bold text-white">
            {resultado ? resultado.mrr.toFixed(1) : '—'} <span className="text-xs text-gray-600">cm³/min</span>
          </span>
        </div>
        {material && <p className="text-[11px] text-gray-600 mt-1">{material.nome} — {material.dureza}</p>}
      </div>
    </div>
  );
}
