import { useState, useEffect, useRef } from 'react';
import { useMachiningStore } from '@/store';
import { MATERIAIS } from '@/data';
import { calcularSliderBounds } from '@/engine';
import type { ParametrosUsinagem } from '@/types';
import { ParameterHealthBar } from './parameter-health-bar';
import { StyledSlider, BTN_CLS } from './styled-slider';

/** Configuração visual (labels, cores, textos educacionais) — constante */
const SLIDER_VISUAL = [
  { key: 'vc' as const, label: 'Vc', fullLabel: 'VEL. DE CORTE', unit: 'M/MIN', color: 'primary',
    rgb: '0,217,255',
    desc: 'Velocidade tangencial na aresta da ferramenta durante o corte.',
    aumentar: 'Usinagem mais rápida, mas desgaste prematuro e mais calor gerado.',
    diminuir: 'Ferramenta mais protegida, porém pode manchar o acabamento superficial.',
    equilibrio: 'Ajuste junto com fz — material mais duro exige Vc menor.' },
  { key: 'fz' as const, label: 'fz', fullLabel: 'AVANÇO/DENTE', unit: 'MM/DENTE', color: 'secondary',
    rgb: '57,255,20',
    desc: 'Espessura do cavaco por aresta de corte em cada passagem.',
    aumentar: 'Maior taxa de remoção (MRR), mas risco de vibração e quebra da ferramenta.',
    diminuir: 'Acabamento mais fino e menor esforço, porém reduz a produtividade.',
    equilibrio: 'Mantenha fz dentro da recomendação do fabricante da ferramenta.' },
  { key: 'ae' as const, label: 'ae', fullLabel: 'ENGAJ. RADIAL', unit: 'MM', color: 'accent-purple',
    rgb: '168,85,247',
    desc: 'Largura radial de corte — quantos % do diâmetro da fresa está em contato.',
    aumentar: 'Remove mais material por passada, mas aumenta pressão lateral e deflexão.',
    diminuir: 'Menor força lateral — ideal para paredes finas ou ferramentas longas.',
    equilibrio: 'ae < 50% do diâmetro ativa o CTF — compensação automática de avanço.' },
  { key: 'ap' as const, label: 'ap', fullLabel: 'PROF. AXIAL', unit: 'MM', color: 'accent-orange',
    rgb: '249,115,22',
    desc: 'Profundidade axial de corte — principal fator da taxa de remoção de material.',
    aumentar: 'MRR sobe proporcionalmente, mas eleva potência e torque exigidos da máquina.',
    diminuir: 'Operação mais leve — essencial quando a potência da máquina é o fator limitante.',
    equilibrio: 'Combine ap alto com ae baixo para operações de desbaste eficiente.' },
];

export function FineTunePanel() {
  const parametros = useMachiningStore((s) => s.parametros);
  const ajustarParametros = useMachiningStore((s) => s.ajustarParametros);
  const materialId = useMachiningStore((s) => s.materialId);
  const resultado = useMachiningStore((s) => s.resultado);
  const ferramenta = useMachiningStore((s) => s.ferramenta);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);
  const material = MATERIAIS.find((m) => m.id === materialId);

  const [openKey, setOpenKey] = useState<string | null>(null);

  // Calcular bounds dinâmicos baseados no contexto atual
  const bounds = calcularSliderBounds(material ?? null, ferramenta, tipoOperacao);

  // Clamp automático: quando bounds mudam, corrigir valores fora do novo range
  const isFirstRender = useRef(true);
  useEffect(() => {
    // Pular o primeiro render para não interferir com a inicialização
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const clamped: Partial<ParametrosUsinagem> = {};
    if (parametros.vc > bounds.vc.max) clamped.vc = bounds.vc.max;
    if (parametros.vc < bounds.vc.min) clamped.vc = bounds.vc.min;
    if (parametros.ae > bounds.ae.max) clamped.ae = bounds.ae.max;
    if (parametros.ae < bounds.ae.min) clamped.ae = bounds.ae.min;
    if (parametros.ap > bounds.ap.max) clamped.ap = bounds.ap.max;
    if (parametros.ap < bounds.ap.min) clamped.ap = bounds.ap.min;
    if (parametros.fz > bounds.fz.max) clamped.fz = bounds.fz.max;
    if (parametros.fz < bounds.fz.min) clamped.fz = bounds.fz.min;
    if (Object.keys(clamped).length > 0) ajustarParametros(clamped);
  }, [bounds.vc.min, bounds.vc.max, bounds.ae.max, bounds.ap.max, bounds.fz.min, bounds.fz.max]);

  const toggleDrawer = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-glass h-full flex flex-col overflow-y-auto">
      <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-gray-300">
        <span className="material-symbols-outlined text-base">tune</span> Ajuste Fino
      </h2>

      <div className="flex-1 flex flex-col justify-between gap-3 px-1">
        {SLIDER_VISUAL.map(({ key, label, fullLabel, unit, color, rgb, desc, aumentar, diminuir, equilibrio }) => {
          const { min, max, step, recomendado } = bounds[key];
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
                      if (!isNaN(n) && n >= min && n <= max) ajustarParametros({ [key]: n });
                    }}
                    className={`w-20 bg-transparent border-none text-right font-mono text-xl font-bold text-${color} outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    style={{ filter: `drop-shadow(0 0 8px rgba(${rgb},0.4))` }}
                    aria-label={`valor de ${label}`} />
                  <div className="text-fine text-gray-500 font-mono tracking-wider">{unit}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button className={BTN_CLS} aria-label={`Diminuir ${label}`}
                  onClick={() => ajustarParametros({ [key]: Math.max(min, +(val - step).toFixed(4)) })}>−</button>
                <div className="flex-1">
                  <StyledSlider
                    value={val} min={min} max={max} step={step}
                    color={color} rgb={rgb} label={label}
                    recomendado={recomendado}
                    onChange={(v) => ajustarParametros({ [key]: v })}
                  />
                </div>
                <button className={BTN_CLS} aria-label={`Aumentar ${label}`}
                  onClick={() => ajustarParametros({ [key]: Math.min(max, +(val + step).toFixed(4)) })}>+</button>
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
                      <span className="text-fine font-bold text-green-400 w-16 shrink-0 pt-0.5 tracking-wide">▲ MAIS</span>
                      <span className="text-xs text-gray-400 leading-relaxed">{aumentar}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-fine font-bold text-red-400 w-16 shrink-0 pt-0.5 tracking-wide">▼ MENOS</span>
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
        {material && <p className="text-fine text-gray-600 mt-1">{material.nome} — {material.dureza}</p>}
      </div>
    </div>
  );
}
