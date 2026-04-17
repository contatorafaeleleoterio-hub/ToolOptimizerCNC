import { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import { useMachiningStore } from '@/store';
import { useFavoritesStore } from '@/store/favorites-store';
import { MATERIAIS } from '@/data';
import { calcularSliderBounds } from '@/engine';
import type { ParametrosUsinagem, SliderBounds, FavoritoCompleto } from '@/types';
import { SectionTitle } from '../ui-helpers';
import { SegmentedGradientBar } from '../segmented-gradient-bar';
import { getSliderRgb } from '../slider-tokens';
import { ParamExplanation } from '../param-explanation';

/** Compute ideal zone [0-1] for a parameter based on the most recent favorite. */
function computeIdealRange(
  paramKey: 'vc' | 'fz' | 'ae' | 'ap',
  favorito: FavoritoCompleto | undefined,
  bounds: SliderBounds,
): { start: number; end: number } | undefined {
  if (!favorito) return undefined;
  const val = favorito.parametros[paramKey];
  const { min, max } = bounds[paramKey];
  const range = max - min;
  if (range <= 0) return undefined;
  return {
    start: Math.max(0.05, (val * 0.9 - min) / range),
    end:   Math.min(0.95, (val * 1.1 - min) / range),
  };
}

/** Fine-tune value input with raw/blur pattern — allows free typing */
function FineTuneValueInput({ display, step, min, max, color, label, unit, onChange }: {
  display: string; step: number; min: number; max: number;
  color: string; label: string; unit: string;
  onChange: (v: number) => void;
}) {
  const [raw, setRaw] = useState(display);
  const [focused, setFocused] = useState(false);
  const rgb = getSliderRgb(color);

  const parsed = Number(raw);
  const invalid = raw.trim() === '' || isNaN(parsed) || parsed < min || parsed > max;
  const displayValue = focused ? raw : display;

  return (
    <div className="flex items-baseline gap-1">
      <input type="number" value={displayValue} step={step} min={min} max={max}
        inputMode="decimal"
        onChange={(e) => {
          setRaw(e.target.value);
          const n = Number(e.target.value);
          if (!isNaN(n) && n >= min && n <= max) onChange(n);
        }}
        onFocus={() => { setFocused(true); setRaw(display); }}
        onBlur={() => { setFocused(false); if (invalid) setRaw(display); }}
        className={`w-16 bg-transparent border-none text-right font-mono text-lg font-bold text-${color} outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        style={{ filter: `drop-shadow(0 0 6px rgba(${rgb},0.4))` }}
        aria-label={`${label} value`} />
      <span className="text-2xs text-gray-500 font-mono">{unit}</span>
    </div>
  );
}

/** Configuração visual (labels, cores, textos educacionais) — constante */
const SLIDER_VISUAL = [
  { key: 'vc' as const, label: 'Vc', fullLabel: 'Velocidade Corte', unit: 'm/min', color: 'primary',
    desc: 'Velocidade tangencial na aresta da ferramenta durante o corte.',
    aumentar: 'Usinagem mais rápida, mas desgaste prematuro e mais calor gerado.',
    diminuir: 'Ferramenta mais protegida, porém pode manchar o acabamento superficial.',
    equilibrio: 'Ajuste junto com fz — material mais duro exige Vc menor.' },
  { key: 'fz' as const, label: 'fz', fullLabel: 'Avanço/Dente', unit: 'mm', color: 'secondary',
    desc: 'Espessura do cavaco por aresta de corte em cada passagem.',
    aumentar: 'Maior taxa de remoção (MRR), mas risco de vibração e quebra da ferramenta.',
    diminuir: 'Acabamento mais fino e menor esforço, porém reduz a produtividade.',
    equilibrio: 'Mantenha fz dentro da recomendação do fabricante da ferramenta.' },
  { key: 'ae' as const, label: 'ae', fullLabel: 'Eng. Radial', unit: 'mm', color: 'accent-purple',
    desc: 'Largura radial de corte — quantos % do diâmetro da fresa está em contato.',
    aumentar: 'Remove mais material por passada, mas aumenta pressão lateral e deflexão.',
    diminuir: 'Menor força lateral — ideal para paredes finas ou ferramentas longas.',
    equilibrio: 'ae < 50% do diâmetro ativa o CTF — compensação automática de avanço.' },
  { key: 'ap' as const, label: 'ap', fullLabel: 'Prof. Axial', unit: 'mm', color: 'accent-orange',
    desc: 'Profundidade axial de corte — principal fator da taxa de remoção de material.',
    aumentar: 'MRR sobe proporcionalmente, mas eleva potência e torque exigidos da máquina.',
    diminuir: 'Operação mais leve — essencial quando a potência da máquina é o fator limitante.',
    equilibrio: 'Combine ap alto com ae baixo para operações de desbaste eficiente.' },
];

const BTN_CLS = 'w-10 h-10 rounded-lg bg-black/30 border border-white/12 text-gray-400 active:bg-white/10 transition-all text-sm font-bold flex items-center justify-center';

/** Maximum number of visible tick marks on the slider track */
const MAX_TICKS = 20;

type ParamKey = typeof SLIDER_VISUAL[number]['key'];

/**
 * Touch-friendly custom slider with immediate drag response.
 * Snaps to discrete step values with visible tick marks.
 * Uses touch-none CSS to prevent scroll conflicts.
 */
function TouchSlider({ value, min, max, step, color, onChange, label, recomendado }: {
  value: number; min: number; max: number; step: number;
  color: string; label: string;
  recomendado?: number;
  onChange: (val: number) => void;
}) {
  const rgb = getSliderRgb(color);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const totalSteps = Math.round((max - min) / step);
  const tickInterval = totalSteps <= MAX_TICKS ? 1 : Math.ceil(totalSteps / MAX_TICKS);
  const ticks: number[] = [];
  for (let i = 0; i <= totalSteps; i += tickInterval) {
    ticks.push(i / totalSteps * 100);
  }
  if (ticks[ticks.length - 1] !== 100) ticks.push(100);

  const clampToStep = useCallback((raw: number) => {
    const clamped = Math.max(min, Math.min(max, raw));
    return Math.round(clamped / step) * step;
  }, [min, max, step]);

  const getValueFromX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return value;
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return clampToStep(min + pct * (max - min));
  }, [min, max, value, clampToStep]);

  const handleTouchStart = useCallback(() => {
    setDragging(true);
    // Don't change value on initial touch — only on drag (handled by handleTouchMove)
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    onChange(getValueFromX(touch.clientX));
  }, [onChange, getValueFromX]);

  const handleTouchEnd = useCallback(() => {
    setDragging(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        onChange(clampToStep(value + step));
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        onChange(clampToStep(value - step));
        break;
      case 'Home':
        e.preventDefault();
        onChange(min);
        break;
      case 'End':
        e.preventDefault();
        onChange(max);
        break;
    }
  }, [value, step, min, max, onChange, clampToStep]);

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={trackRef}
      className="relative h-12 mx-[18px] flex items-center cursor-pointer select-none"
      role="slider"
      aria-label={`${label} slider`}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Track background */}
      <div className="absolute left-0 right-0 h-2 bg-black/40 rounded-full" />

      {/* Tick marks */}
      {ticks.map((t, i) => (
        <div
          key={i}
          className="absolute w-px h-3 bg-white/15 pointer-events-none"
          style={{ left: `${t}%`, top: '50%', transform: 'translateY(-50%)' }}
        />
      ))}

      {/* Recommended value tick mark */}
      {recomendado !== undefined && recomendado >= min && recomendado <= max && (
        <div
          className="absolute w-0.5 h-3 rounded-full pointer-events-none"
          style={{
            left: `${((recomendado - min) / (max - min)) * 100}%`,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: `rgba(${rgb},0.4)`,
          }}
          title={`Recomendado: ${recomendado}`}
        />
      )}

      {/* Filled track */}
      <div
        className="absolute left-0 h-2 rounded-full pointer-events-none transition-all duration-75"
        style={{ width: `${pct}%`, backgroundColor: `rgba(${rgb},1)`, boxShadow: `0 0 8px rgba(${rgb},0.6)` }}
      />

      {/* Thumb with invisible hit zone (60×60px) */}
      <div
        className="absolute"
        style={{
          left: `${pct}%`,
          transform: 'translate(-50%, -50%)',
          top: '50%',
          width: '60px',
          height: '60px',
          touchAction: 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Invisible hit zone */}
        <div className="absolute inset-0" />
        {/* Visual thumb (centered inside hit zone) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-transparent transition-all duration-150"
            style={dragging ? { borderColor: `rgba(${rgb},1)`, boxShadow: `0 0 20px rgba(${rgb},0.9)`, transform: 'scale(1.15)' } : undefined}
          >
            <div
              className="w-7 h-7 bg-background-dark border-2 rounded-full flex items-center justify-center"
              style={{ borderColor: `rgba(${rgb},1)`, boxShadow: `0 0 12px rgba(${rgb},0.8)` }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `rgba(${rgb},1)` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileFineTuneSection() {
  const parametros = useMachiningStore((s) => s.parametros);
  const ajustarParametros = useMachiningStore((s) => s.ajustarParametros);
  const materialId = useMachiningStore((s) => s.materialId);
  const ferramenta = useMachiningStore((s) => s.ferramenta);
  const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);
  const material = MATERIAIS.find((m) => m.id === materialId);

  // Calcular bounds dinâmicos baseados no contexto atual
  const bounds = calcularSliderBounds(material ?? null, ferramenta, tipoOperacao);

  // Lookup most recent favorite for current combo — MUST select stable array (anti-infinite-loop rule)
  const favorites = useFavoritesStore((s) => s.favorites);
  const ferramentaTipo = ferramenta.tipo;
  const favorito = useMemo(
    () => favorites
      .filter((f) =>
        f.materialId === materialId &&
        f.tipoOperacao === tipoOperacao &&
        f.ferramenta.tipo === ferramentaTipo,
      )
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0],
    [favorites, materialId, tipoOperacao, ferramentaTipo],
  );

  // Clamp automático: quando bounds mudam, corrigir valores fora do novo range
  const isFirstRender = useRef(true);
  useEffect(() => {
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

  const handleChange = useCallback((key: ParamKey, val: number) => {
    ajustarParametros({ [key]: val });
  }, [ajustarParametros]);

  return (
    <section className="flex flex-col gap-4 px-4">
      <div className="bg-[rgba(30,38,50,0.95)] rounded-xl p-4 border border-white/12">
        <SectionTitle color="bg-primary" label="Fine Tune" />
        <p className="text-[9px] text-gray-500 mb-3">Arraste os controles para ajustar os parâmetros</p>
        <div className="flex flex-col gap-5">
          {SLIDER_VISUAL.map(({ key, label, fullLabel, unit, color, desc }) => {
            const { min, max, step, recomendado } = bounds[key];
            const val = parametros[key];
            const display = key === 'fz' || key === 'ap' ? val.toFixed(2) : key === 'ae' ? val.toFixed(1) : val.toFixed(0);

            const idealRangeProp = computeIdealRange(key, favorito, bounds);

            return (
              <div key={key} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 min-h-[44px]">
                    <span className={`text-sm font-bold font-mono text-${color}`}>{label}</span>
                    <span className="text-2xs text-gray-500 uppercase">{fullLabel}</span>
                  </div>
                  <FineTuneValueInput
                    display={display} step={step} min={min} max={max}
                    color={color} label={label} unit={unit}
                    onChange={(n) => ajustarParametros({ [key]: n })}
                  />
                </div>

                {/* Parameter health bar — above slider */}
                <SegmentedGradientBar paramKey={key} segments={30} idealRange={idealRangeProp} />

                <div className="flex items-center gap-2">
                  <button className={BTN_CLS} aria-label={`Decrease ${label}`}
                    onClick={() => ajustarParametros({ [key]: Math.max(min, +(val - step).toFixed(4)) })}>−</button>
                  <div className="flex-1">
                    <TouchSlider
                      value={val} min={min} max={max} step={step}
                      color={color} label={label}
                      recomendado={recomendado}
                      onChange={(v) => handleChange(key, v)}
                    />
                  </div>
                  <button className={BTN_CLS} aria-label={`Increase ${label}`}
                    onClick={() => ajustarParametros({ [key]: Math.min(max, +(val + step).toFixed(4)) })}>+</button>
                </div>

                <ParamExplanation fullLabel={fullLabel} explanationText={desc} />
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
