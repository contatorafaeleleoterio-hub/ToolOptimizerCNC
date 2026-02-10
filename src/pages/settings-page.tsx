import { useMachiningStore } from '@/store';
import { useNavigate } from 'react-router-dom';

export function SettingsPage() {
  const navigate = useNavigate();
  const limites = useMachiningStore((s) => s.limitesMaquina);
  const setLimites = useMachiningStore((s) => s.setLimitesMaquina);
  const safetyFactor = useMachiningStore((s) => s.safetyFactor);
  const setSafetyFactor = useMachiningStore((s) => s.setSafetyFactor);

  return (
    <div className="min-h-screen p-6 bg-background-dark">
      <header className="mb-8 flex items-center gap-4">
        <button onClick={() => navigate('/')}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-gray-300 transition-all">
          ← Voltar
        </button>
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
      </header>

      <section className="mb-8 bg-surface-dark p-6 rounded-xl border border-white/5">
        <h2 className="text-lg font-bold text-white mb-4">Limites de Máquina</h2>
        <div className="grid grid-cols-2 gap-4">
          <SettingsInput label="RPM Máximo" value={limites.maxRPM}
            onChange={(v) => setLimites({ maxRPM: v })} min={100} max={40000} step={100} />
          <SettingsInput label="Potência Máxima (kW)" value={limites.maxPotencia}
            onChange={(v) => setLimites({ maxPotencia: v })} min={0.5} max={100} step={0.5} />
          <SettingsInput label="Torque Máximo (Nm)" value={limites.maxTorque}
            onChange={(v) => setLimites({ maxTorque: v })} min={1} max={500} step={1} />
          <SettingsInput label="Avanço Máximo (mm/min)" value={limites.maxAvanco}
            onChange={(v) => setLimites({ maxAvanco: v })} min={100} max={20000} step={100} />
        </div>
      </section>

      <section className="bg-surface-dark p-6 rounded-xl border border-white/5">
        <h2 className="text-lg font-bold text-white mb-4">Fator de Segurança Padrão</h2>
        <input type="number" value={safetyFactor}
          onChange={(e) => setSafetyFactor(Number(e.target.value))}
          min={0.5} max={1.0} step={0.05}
          className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-white font-mono" />
      </section>
    </div>
  );
}

function SettingsInput({ label, value, onChange, min, max, step }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number;
}) {
  return (
    <div>
      <label className="text-sm text-gray-400 block mb-1">{label}</label>
      <input type="number" value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min} max={max} step={step}
        className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-white font-mono" />
    </div>
  );
}
