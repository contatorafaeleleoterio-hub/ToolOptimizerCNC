import type { ReactNode } from 'react';

export function SectionTitle({ color, label }: { color: string; label: string }) {
  return (
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
      <span className={`w-1 h-3 ${color} rounded-full`} />
      {label}
    </h3>
  );
}

export function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="group">
      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">{label}</label>
      {children}
    </div>
  );
}

export function NumInput({ label, value, onChange, min, max, step }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min} max={max} step={step}
        className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white font-mono focus:ring-1 focus:ring-primary outline-none"
      />
    </div>
  );
}
