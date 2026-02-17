/**
 * BidirectionalSlider Component
 *
 * Slider that adjusts values from -150% to +150% of a base (calculated) value.
 * Center position (0%) = base value.
 * Used for manual RPM and Feed Rate adjustments.
 */

import { useState } from 'react';

interface BidirectionalSliderProps {
  baseValue: number;
  currentPercent: number;
  onChange: (percent: number) => void;
  color: string;
  rgb: string;
  label: string;
  unit: string;
}

const BTN_CLS = 'w-8 h-8 rounded-lg bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-bold flex items-center justify-center';

export function BidirectionalSlider({
  baseValue,
  currentPercent,
  onChange,
  color,
  rgb,
  label,
  unit,
}: BidirectionalSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Calculate actual value from percentage
  const actualValue = Math.round(baseValue * (1 + currentPercent / 100));

  // Clamp percentage to -150% to +150%
  const clampPercent = (p: number) => Math.max(-150, Math.min(150, p));

  // Handle slider change (range input is 0-300, we map to -150 to +150)
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = Number(e.target.value); // 0 to 300
    const percent = rawValue - 150; // -150 to +150
    onChange(clampPercent(percent));
  };

  // Handle increment/decrement buttons (step = 10%)
  const handleIncrement = () => onChange(clampPercent(currentPercent + 10));
  const handleDecrement = () => onChange(clampPercent(currentPercent - 10));

  // Convert currentPercent (-150 to +150) to slider value (0 to 300)
  const sliderValue = currentPercent + 150;

  // Calculate progress for visual gradient (0% to 100%)
  // Left side: -150% to 0% → fills from left
  // Right side: 0% to +150% → fills from center
  const progressPercent = ((sliderValue) / 300) * 100;

  // Tick marks: -150%, -140%, ..., -10%, 0%, +10%, ..., +140%, +150%
  const ticks = [];
  for (let i = -150; i <= 150; i += 10) {
    ticks.push(i);
  }

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

        <div className="relative h-8 flex-1 flex items-center">
          {/* Base value indicator (center line) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/20 -translate-x-1/2 z-10 pointer-events-none" />

          {/* Tick marks */}
          <div className="absolute inset-0 flex justify-between px-2">
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

          {/* Range input */}
          <input
            type="range"
            min={0}
            max={300}
            step={1}
            value={sliderValue}
            onChange={handleSliderChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="w-full h-2 rounded-full appearance-none cursor-pointer relative z-30"
            style={{
              background: currentPercent < 0
                ? `linear-gradient(to right, rgba(${rgb},0.3) 0%, rgba(${rgb},1) ${progressPercent}%, rgba(0,0,0,0.4) ${progressPercent}%, rgba(0,0,0,0.4) 100%)`
                : currentPercent > 0
                ? `linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 50%, rgba(${rgb},1) 50%, rgba(${rgb},1) ${progressPercent}%, rgba(0,0,0,0.4) ${progressPercent}%, rgba(0,0,0,0.4) 100%)`
                : `linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%)`,
              '--thumb-color': `rgba(${rgb},1)`,
              '--thumb-glow': isDragging ? `0 0 20px rgba(${rgb},1)` : `0 0 12px rgba(${rgb},0.6)`,
            } as React.CSSProperties}
            aria-label={`${label} slider`}
          />
        </div>

        <button className={BTN_CLS} aria-label={`Increase ${label}`} onClick={handleIncrement}>+</button>
      </div>

      {/* Tick labels (optional, only major ticks) */}
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
