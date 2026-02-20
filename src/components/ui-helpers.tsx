import type { ReactNode } from 'react';

export function SectionTitle({ color, label }: { color: string; label: string }) {
  return (
    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
      <span className={`w-1 h-3 ${color} rounded-full`} />
      {label}
    </h3>
  );
}

export function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="group">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">{label}</label>
      {children}
    </div>
  );
}

export function NumInput({ label, value, onChange, min, max, step }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number;
}) {
  const increment = () => {
    const next = Math.round((value + step) * 1000) / 1000;
    onChange(Math.min(max, next));
  };
  const decrement = () => {
    const next = Math.round((value - step) * 1000) / 1000;
    onChange(Math.max(min, next));
  };
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">{label}</label>
      <div className="flex gap-1">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min} max={max} step={step}
          aria-label={label}
          className="flex-1 min-w-0 min-h-[44px] bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-base text-white font-mono focus:ring-1 focus:ring-primary outline-none"
        />
        <div className="flex flex-col gap-0.5">
          <button onClick={increment} aria-label={`Increase ${label}`}
            className="w-9 flex-1 rounded bg-black/40 border border-white/10 text-gray-400 active:bg-white/10 hover:text-white hover:bg-white/10 transition-all text-[10px] font-bold flex items-center justify-center">&#9650;</button>
          <button onClick={decrement} aria-label={`Decrease ${label}`}
            className="w-9 flex-1 rounded bg-black/40 border border-white/10 text-gray-400 active:bg-white/10 hover:text-white hover:bg-white/10 transition-all text-[10px] font-bold flex items-center justify-center">&#9660;</button>
        </div>
      </div>
    </div>
  );
}
