import { useRef, useCallback } from 'react';
import { useMachiningStore } from '@/store';
import { MATERIAIS } from '@/data';
import { SectionTitle } from '../ui-helpers';

const SLIDER_CONFIG = [
  { key: 'vc' as const, label: 'Vc', fullLabel: 'Velocidade Corte', unit: 'm/min', color: 'primary',
    rgb: '0,217,255', min: 1, max: 1200, step: 1 },
  { key: 'fz' as const, label: 'fz', fullLabel: 'Avanço/Dente', unit: 'mm', color: 'secondary',
    rgb: '57,255,20', min: 0.01, max: 1, step: 0.01 },
  { key: 'ae' as const, label: 'ae', fullLabel: 'Eng. Radial', unit: 'mm', color: 'accent-purple',
    rgb: '168,85,247', min: 0.1, max: 50, step: 0.1 },
  { key: 'ap' as const, label: 'ap', fullLabel: 'Prof. Axial', unit: 'mm', color: 'accent-orange',
    rgb: '249,115,22', min: 0.1, max: 50, step: 0.1 },
] as const;

const BTN_CLS = 'w-10 h-10 rounded-lg bg-black/40 border border-white/10 text-gray-400 active:bg-white/10 transition-all text-sm font-bold flex items-center justify-center';

type ParamKey = typeof SLIDER_CONFIG[number]['key'];

/**
 * Touch-friendly custom slider.
 * Uses touch events directly (not <input type="range">) to avoid
 * the tiny hit-area problem on mobile browsers.
 * - touch-none: prevents page scroll while dragging
 * - 44px hit area: meets mobile accessibility guidelines
 * - Thumb: 28px visible, centered on value
 */
function TouchSlider({ value, min, max, step, color, rgb, onChange, label }: {
  value: number; min: number; max: number; step: number;
  color: string; rgb: string; label: string;
  onChange: (val: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    const touch = e.touches[0];
    onChange(getValueFromX(touch.clientX));
  }, [onChange, getValueFromX]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault(); // Prevent page scroll while dragging
    const touch = e.touches[0];
    onChange(getValueFromX(touch.clientX));
  }, [onChange, getValueFromX]);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    onChange(getValueFromX(e.clientX));
  }, [onChange, getValueFromX]);

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={trackRef}
      className="relative h-11 flex items-center cursor-pointer touch-none select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      role="slider"
      aria-label={`${label} slider`}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      tabIndex={0}
    >
      {/* Track background */}
      <div className="absolute left-0 right-0 h-2 bg-black/40 rounded-full" />
      {/* Filled track */}
      <div
        className={`absolute left-0 h-2 bg-${color} rounded-full pointer-events-none`}
        style={{ width: `${pct}%`, boxShadow: `0 0 8px rgba(${rgb},0.6)` }}
      />
      {/* Thumb */}
      <div
        className="absolute -translate-x-1/2 pointer-events-none"
        style={{ left: `${pct}%` }}
      >
        <div
          className={`w-7 h-7 bg-background-dark border-2 border-${color} rounded-full flex items-center justify-center`}
          style={{ boxShadow: `0 0 12px rgba(${rgb},0.8)` }}
        >
          <div className={`w-2.5 h-2.5 bg-${color} rounded-full`} />
        </div>
      </div>
    </div>
  );
}

export function MobileFineTuneSection() {
  const parametros = useMachiningStore((s) => s.parametros);
  const setParametros = useMachiningStore((s) => s.setParametros);
  const materialId = useMachiningStore((s) => s.materialId);
  const resultado = useMachiningStore((s) => s.resultado);
  const material = MATERIAIS.find((m) => m.id === materialId);

  const handleChange = useCallback((key: ParamKey, val: number) => {
    setParametros({ [key]: val });
  }, [setParametros]);

  return (
    <section className="flex flex-col gap-4 px-4">
      <div className="bg-card-dark rounded-xl p-4 border border-white/5">
        <SectionTitle color="bg-primary" label="Fine Tune" />
        <div className="flex flex-col gap-5">
          {SLIDER_CONFIG.map(({ key, label, fullLabel, unit, color, rgb, min, max, step }) => {
            const val = parametros[key];
            const display = key === 'fz' ? val.toFixed(2) : key === 'ae' || key === 'ap' ? val.toFixed(1) : val.toFixed(0);

            return (
              <div key={key} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-sm font-bold font-mono text-${color}`}>{label}</span>
                    <span className="text-[10px] text-gray-500 uppercase">{fullLabel}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <input type="number" value={display} step={step} min={min} max={max}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        if (!isNaN(n) && n >= min && n <= max) setParametros({ [key]: n });
                      }}
                      className={`w-16 bg-transparent border-none text-right font-mono text-lg font-bold text-${color} outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      style={{ filter: `drop-shadow(0 0 6px rgba(${rgb},0.4))` }}
                      aria-label={`${label} value`} />
                    <span className="text-[9px] text-gray-500 font-mono">{unit}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className={BTN_CLS} aria-label={`Decrease ${label}`}
                    onClick={() => setParametros({ [key]: Math.max(min, +(val - step).toFixed(4)) })}>−</button>
                  <div className="flex-1">
                    <TouchSlider
                      value={val} min={min} max={max} step={step}
                      color={color} rgb={rgb} label={label}
                      onChange={(v) => handleChange(key, v)}
                    />
                  </div>
                  <button className={BTN_CLS} aria-label={`Increase ${label}`}
                    onClick={() => setParametros({ [key]: Math.min(max, +(val + step).toFixed(4)) })}>+</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MRR summary */}
      <div className="bg-card-dark rounded-xl p-4 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] uppercase tracking-wider text-gray-500">Material Removal</span>
          {resultado && <span className="material-symbols-outlined text-xs text-secondary animate-pulse">trending_up</span>}
        </div>
        <div className="bg-black/30 p-4 rounded-xl flex items-center justify-between border border-white/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-600 text-lg">delete_sweep</span>
            <span className="text-xs text-gray-400">MRR</span>
          </div>
          <span className="font-mono text-lg font-bold text-white">
            {resultado ? resultado.mrr.toFixed(1) : '—'} <span className="text-xs text-gray-600">cm³/min</span>
          </span>
        </div>
        {material && <p className="text-[10px] text-gray-600 mt-2">{material.nome} — {material.dureza}</p>}
      </div>
    </section>
  );
}
