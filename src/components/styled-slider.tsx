import { useState, useRef, useCallback } from 'react';
import { getSliderRgb } from './slider-tokens';

export const BTN_CLS = 'w-6 h-6 rounded bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all text-xs font-bold flex items-center justify-center';

export interface StyledSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  color: string;
  label: string;
  recomendado?: number;
  onChange: (val: number) => void;
}

/** Custom styled slider with tick marks, ± buttons and mobile-style thumb (ring + inner dot + glow) */
export function StyledSlider({ value, min, max, step, color, label, recomendado, onChange }: StyledSliderProps) {
  const [pressed, setPressed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const rgb = getSliderRgb(color);
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

  const handleDecrement = () => onChange(Math.max(min, +(value - step).toFixed(4)));
  const handleIncrement = () => onChange(Math.min(max, +(value + step).toFixed(4)));

  // Tick marks at 0%, 25%, 50%, 75%, 100% of range
  const tickPositions = [0, 25, 50, 75, 100];

  return (
    <div className="space-y-1">
      {/* Slider row with ± buttons */}
      <div className="flex items-center gap-2">
        <button className={BTN_CLS} aria-label={`Decrease ${label}`} onClick={handleDecrement}>−</button>

        <div
          ref={trackRef}
          className="relative h-10 flex-1 mx-[18px] flex items-center cursor-pointer select-none"
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

          {/* Tick marks */}
          <div className="absolute inset-0 flex items-center pointer-events-none">
            {tickPositions.map((pos) => (
              <div
                key={pos}
                className="absolute"
                style={{ left: `${pos}%` }}
              >
                <div className={`w-[1px] ${pos === 0 || pos === 100 ? 'h-3 bg-white/20' : 'h-2 bg-white/10'}`} />
              </div>
            ))}
          </div>

          {/* Recommended value tick mark */}
          {recomendado !== undefined && recomendado >= min && recomendado <= max && (
            <div
              className="absolute w-0.5 h-2.5 rounded-full pointer-events-none"
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
            className="absolute left-0 h-1.5 rounded-full pointer-events-none"
            style={{
              width: `${pct}%`,
              background: `rgba(${rgb},1)`,
              boxShadow: `0 0 8px rgba(${rgb},0.6)`,
            }}
          />

          {/* Thumb */}
          <div
            className="absolute pointer-events-none transition-transform duration-100"
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
                className="rounded-full transition-all duration-150"
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

        <button className={BTN_CLS} aria-label={`Increase ${label}`} onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}
