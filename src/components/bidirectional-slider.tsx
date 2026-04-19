/**
 * BidirectionalSlider Component
 *
 * Slider that adjusts values from -150% to +150% of a base (calculated) value.
 * Center position (0%) = base value.
 * Used for manual RPM and Feed Rate adjustments.
 *
 * Visual design matches StyledSlider from fine-tune-panel:
 * ring + inner dot + glow on press + scale(1.15) animation.
 *
 * compact=true: reduced height/size for embedding in RPM/Feed cards.
 *   - Thumb 20×20px (vs 28×28px)
 *   - Track height h-8 32px (vs h-10 40px)
 *   - Track margin mx-[12px] (vs mx-[18px])
 *   - Only center tick mark (vs 31 ticks)
 *   - Value display hidden (parent card shows the value)
 */

import { useState, useRef, useCallback } from 'react';
import { getSliderRgb } from './slider-tokens';
import { haptics } from '@/utils/haptics';

interface BidirectionalSliderProps {
  baseValue: number;
  currentPercent: number;
  onChange: (percent: number) => void;
  color: string;
  label: string;
  unit: string;
  compact?: boolean;
}

const BTN_CLS = 'w-6 h-6 rounded bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all text-xs font-bold flex items-center justify-center';
const BTN_CLS_COMPACT = 'w-5 h-5 rounded bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all text-[11px] font-bold flex items-center justify-center';

export function BidirectionalSlider({
  baseValue,
  currentPercent,
  onChange,
  color,
  label,
  unit,
  compact = false,
}: BidirectionalSliderProps) {
  const rgb = getSliderRgb(color);
  const [pressed, setPressed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Calculate actual value from percentage
  const actualValue = Math.round(baseValue * (1 + currentPercent / 100));

  // Clamp percentage to -150% to +150%
  const clampPercent = (p: number) => Math.max(-150, Math.min(150, p));

  // Convert currentPercent (-150 to +150) to slider position (0% to 100%)
  const progressPercent = ((currentPercent + 150) / 300) * 100;

  // Get percent from mouse/touch X position on track
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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setPressed(true);
    onChange(getPercentFromX(e.touches[0].clientX));
  }, [onChange, getPercentFromX]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Prevent scrolling while adjusting
    if (e.cancelable) e.preventDefault();
    onChange(getPercentFromX(e.touches[0].clientX));
  }, [onChange, getPercentFromX]);

  const handleTouchEnd = useCallback(() => {
    setPressed(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') onChange(clampPercent(currentPercent + 10));
    if (e.key === 'ArrowLeft') onChange(clampPercent(currentPercent - 10));
  };

  const handleIncrement = () => {
    onChange(clampPercent(currentPercent + 10));
    haptics.impactLight();
  };
  const handleDecrement = () => {
    onChange(clampPercent(currentPercent - 10));
    haptics.impactLight();
  };

  // Filled track style: bidirectional fill from center or edge
  const filledTrackStyle = (() => {
    if (currentPercent === 0) return { width: 0, left: '50%' };
    if (currentPercent < 0) {
      return {
        width: `${50 - progressPercent}%`,
        left: `${progressPercent}%`,
      };
    }
    return {
      width: `${progressPercent - 50}%`,
      left: '50%',
    };
  })();

  // ── COMPACT MODE ─────────────────────────────────────────────────────────────
  if (compact) {
    return (
      <div className="space-y-0.5">
        {/* Slider row */}
        <div className="flex items-center gap-1">
          <button className={BTN_CLS_COMPACT} aria-label={`Decrease ${label}`} onClick={handleDecrement}>−</button>

          <div
            ref={trackRef}
            className="relative h-8 flex-1 mx-[12px] flex items-center cursor-pointer select-none touch-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="slider"
            aria-label={`${label} slider`}
            aria-valuenow={currentPercent}
            aria-valuemin={-150}
            aria-valuemax={150}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            {/* Track background */}
            <div className="absolute left-0 right-0 h-1 bg-black/40 rounded-full" />

            {/* Filled track */}
            {currentPercent !== 0 && (
              <div
                className="absolute h-1 rounded-full pointer-events-none"
                style={{
                  left: filledTrackStyle.left,
                  width: filledTrackStyle.width,
                  background: `rgba(${rgb},1)`,
                  boxShadow: `0 0 6px rgba(${rgb},0.6)`,
                }}
              />
            )}

            {/* Center tick only */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="h-3 w-[2px] bg-white/30" />
            </div>

            {/* Thumb — 20×20px */}
            <div
              className="absolute pointer-events-none transition-transform duration-100 z-30"
              style={{
                left: `${progressPercent}%`,
                transform: `translateX(-50%) scale(${pressed ? 1.15 : 1})`,
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all duration-150"
                style={{
                  borderColor: `rgba(${rgb},1)`,
                  boxShadow: pressed
                    ? `0 0 16px rgba(${rgb},0.9), 0 0 6px rgba(${rgb},0.5)`
                    : `0 0 8px rgba(${rgb},0.4)`,
                  background: 'rgba(15,20,25,0.9)',
                }}
              >
                <div
                  className="rounded-full transition-all duration-150"
                  style={{
                    width: pressed ? '7px' : '6px',
                    height: pressed ? '7px' : '6px',
                    background: `rgba(${rgb},1)`,
                    boxShadow: `0 0 4px rgba(${rgb},0.8)`,
                  }}
                />
              </div>
            </div>
          </div>

          <button className={BTN_CLS_COMPACT} aria-label={`Increase ${label}`} onClick={handleIncrement}>+</button>
        </div>

        {/* Tick labels row */}
        <div className="flex justify-between items-center px-6">
          <span className="font-mono text-[10px] text-white/25">-150%</span>
          <span className={`font-mono text-xs font-bold ${
            currentPercent === 0 ? 'text-white/40' : currentPercent > 0 ? 'text-secondary' : 'text-seg-vermelho'
          }`}>
            {currentPercent > 0 ? '+' : ''}{currentPercent}%
          </span>
          <span className="font-mono text-[10px] text-white/25">+150%</span>
        </div>
      </div>
    );
  }

  // ── FULL MODE ─────────────────────────────────────────────────────────────────
  // Tick marks: -150%, -140%, ..., 0%, ..., +150%
  const ticks = [];
  for (let i = -150; i <= 150; i += 10) {
    ticks.push(i);
  }

  return (
    <div className="space-y-2">
      {/* Value display */}
      <div className="flex justify-between items-baseline">
        <div className="flex items-baseline gap-2">
          <span className={`text-sm font-bold font-mono text-${color}`}>{label}</span>
          <span className={`text-xs font-bold tracking-wider ${
            currentPercent === 0 ? 'text-gray-500' : currentPercent > 0 ? 'text-secondary' : 'text-seg-vermelho'
          }`}>
            {currentPercent > 0 ? '+' : ''}{currentPercent}%
          </span>
        </div>
        <div className="text-right">
          <span className={`font-mono text-xl font-bold text-${color}`}
            style={{ filter: `drop-shadow(0 0 8px rgba(${rgb},0.4))` }}>
            {actualValue.toLocaleString('en-US')}
          </span>
          <span className="text-xs text-gray-500 font-mono tracking-wider ml-1">{unit}</span>
        </div>
      </div>

      {/* Slider with buttons */}
      <div className="flex items-center gap-2">
        <button className={BTN_CLS} aria-label={`Decrease ${label}`} onClick={handleDecrement}>−</button>

        {/* Custom div-based slider track */}
        <div
          ref={trackRef}
          className="relative h-10 flex-1 mx-[18px] flex items-center cursor-pointer select-none touch-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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

          {/* Thumb — ring + inner dot + glow */}
          <div
            className="absolute pointer-events-none transition-transform duration-100 z-30"
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
        <div className="absolute inset-0 flex justify-between text-xs text-gray-600 font-mono">
          <span>-150%</span>
          <span className="text-white/40">0%</span>
          <span>+150%</span>
        </div>
      </div>
    </div>
  );
}
