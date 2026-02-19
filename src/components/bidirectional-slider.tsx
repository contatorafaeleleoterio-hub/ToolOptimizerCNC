/**
 * BidirectionalSlider Component
 *
 * Slider that adjusts values from -150% to +150% of a base (calculated) value.
 * Center position (0%) = base value.
 * Used for manual RPM and Feed Rate adjustments.
 *
 * Visual design matches StyledSlider from fine-tune-panel:
 * ring + inner dot + glow on press + scale(1.15) animation.
 */

import { useState, useRef, useCallback } from 'react';

interface BidirectionalSliderProps {
  baseValue: number;
  currentPercent: number;
  onChange: (percent: number) => void;
  color: string;
  rgb: string;
  label: string;
  unit: string;
}

const BTN_CLS = 'w-6 h-6 rounded bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all text-xs font-bold flex items-center justify-center';

export function BidirectionalSlider({
  baseValue,
  currentPercent,
  onChange,
  color,
  rgb,
  label,
  unit,
}: BidirectionalSliderProps) {
  const [pressed, setPressed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Calculate actual value from percentage
  const actualValue = Math.round(baseValue * (1 + currentPercent / 100));

  // Clamp percentage to -150% to +150%
  const clampPercent = (p: number) => Math.max(-150, Math.min(150, p));

  // Convert currentPercent (-150 to +150) to slider position (0% to 100%)
  const progressPercent = ((currentPercent + 150) / 300) * 100;

  // Get percent from mouse X position on track
  const getPercentFromX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return currentPercent;
    const rect = track.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = Math.round(p * 300); // 0-300
    return clampPercent(rawValue - 150);  // -150 to +150
  }, [currentPercent]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setPressed(true);
    onChange(getPercentFromX(e.clientX));

    const onMove = (ev: MouseEvent) => onChange(getPercentFromX(ev.clientX));
    const onUp = () => {
      setPressed(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [onChange, getPercentFromX]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') onChange(clampPercent(currentPercent + 10));
    if (e.key === 'ArrowLeft') onChange(clampPercent(currentPercent - 10));
  };

  // Handle increment/decrement buttons (step = 10%)
  const handleIncrement = () => onChange(clampPercent(currentPercent + 10));
  const handleDecrement = () => onChange(clampPercent(currentPercent - 10));

  // Tick marks: -150%, -140%, ..., -10%, 0%, +10%, ..., +140%, +150%
  const ticks = [];
  for (let i = -150; i <= 150; i += 10) {
    ticks.push(i);
  }

  // Filled track style: bidirecional fill from center or edge
  const filledTrackStyle = (() => {
    if (currentPercent === 0) return { width: 0, left: '50%' };
    if (currentPercent < 0) {
      // Fill from thumb to center (left side)
      return {
        width: `${50 - progressPercent}%`,
        left: `${progressPercent}%`,
      };
    }
    // Fill from center to thumb (right side)
    return {
      width: `${progressPercent - 50}%`,
      left: '50%',
    };
  })();

  return (
    <div className="space-y-2">
      {/* Value display */}
      <div className="flex justify-between items-baseline">
        <div className="flex items-baseline gap-2">
          <span className={`text-xs font-bold font-mono text-${color}`}>{label}</span>
          <span className={`text-[9px] font-bold tracking-wider ${
            currentPercent === 0 ? 'text-gray-500' : currentPercent > 0 ? 'text-secondary' : 'text-seg-vermelho'
          }`}>
            {currentPercent > 0 ? '+' : ''}{currentPercent}%
          </span>
        </div>
        <div className="text-right">
          <span className={`font-mono text-lg font-bold text-${color}`}
            style={{ filter: `drop-shadow(0 0 8px rgba(${rgb},0.4))` }}>
            {actualValue.toLocaleString('en-US')}
          </span>
          <span className="text-[8px] text-gray-500 font-mono tracking-wider ml-1">{unit}</span>
        </div>
      </div>

      {/* Slider with buttons */}
      <div className="flex items-center gap-2">
        <button className={BTN_CLS} aria-label={`Decrease ${label}`} onClick={handleDecrement}>−</button>

        {/* Custom div-based slider track */}
        <div
          ref={trackRef}
          className="relative h-10 flex-1 flex items-center cursor-pointer select-none"
          onMouseDown={handleMouseDown}
          role="slider"
          aria-label={`${label} slider`}
          aria-valuenow={currentPercent}
          aria-valuemin={-150}
          aria-valuemax={150}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* Track background */}
          <div className="absolute left-0 right-0 h-1.5 bg-black/40 rounded-full" />

          {/* Filled track (bidirectional fill) */}
          {currentPercent !== 0 && (
            <div
              className="absolute h-1.5 rounded-full pointer-events-none"
              style={{
                left: filledTrackStyle.left,
                width: filledTrackStyle.width,
                background: `rgba(${rgb},1)`,
                boxShadow: `0 0 8px rgba(${rgb},0.6)`,
              }}
            />
          )}

          {/* Tick marks */}
          <div className="absolute inset-0 flex justify-between px-2 pointer-events-none">
            {ticks.map((tick) => {
              const isCenter = tick === 0;
              const isMajor = tick % 50 === 0;
              return (
                <div
                  key={tick}
                  className={`h-full flex items-center ${isCenter ? 'z-20' : 'z-0'}`}
                  style={{ width: '1px' }}
                >
                  <div
                    className={`${
                      isCenter ? 'h-4 w-[2px] bg-white/40' : isMajor ? 'h-3 w-[1px] bg-white/20' : 'h-2 w-[1px] bg-white/10'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Thumb — same as StyledSlider: ring + inner dot + glow */}
          <div
            className="absolute -translate-x-1/2 pointer-events-none transition-transform duration-100 z-30"
            style={{
              left: `${progressPercent}%`,
              transform: `translateX(-50%) scale(${pressed ? 1.15 : 1})`,
            }}
          >
            {/* Outer ring */}
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

      {/* Tick labels */}
      <div className="relative h-3 px-10">
        <div className="absolute inset-0 flex justify-between text-[8px] text-gray-600 font-mono">
          <span>-150%</span>
          <span className="text-white/40">0%</span>
          <span>+150%</span>
        </div>
      </div>
    </div>
  );
}
