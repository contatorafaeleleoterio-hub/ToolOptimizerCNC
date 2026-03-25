interface PipelineStep {
  id: string;
  label: string;
  formula: string;
  phase: 'entrada' | 'processamento' | 'estado' | 'saida';
}

const PIPELINE_STEPS: PipelineStep[] = [
  { id: 'user-input', label: 'User Input', formula: 'material + ferramenta + parametros', phase: 'entrada' },
  { id: 'tool-corrections', label: 'Safety Factor', formula: 'SF aplicado em potência e avanço', phase: 'entrada' },
  { id: 'validate-inputs', label: 'validateInputs()', formula: 'D > 0, ap > 0, ae <= D', phase: 'entrada' },
  { id: 'calc-rpm', label: 'calculateRPM()', formula: 'RPM = (Vc * 1000) / (pi * D)', phase: 'processamento' },
  { id: 'calc-effective-fz', label: 'calculateEffectiveFz()', formula: 'CTF = 1 / sqrt(1 - ...)', phase: 'processamento' },
  { id: 'calc-feed', label: 'calculateFeedRate()', formula: 'F = fzEfetivo * Z * RPM', phase: 'processamento' },
  { id: 'manual-overrides', label: 'Manual Overrides', formula: 'rpm/feed percentuais ou fixos', phase: 'processamento' },
  { id: 'calc-mrr', label: 'calculateMRR()', formula: 'Q = (ap * ae * Vf) / 1000', phase: 'processamento' },
  { id: 'calc-power', label: 'calculatePower()', formula: 'Pc = (Q * Kc) / (60000 * eta)', phase: 'processamento' },
  { id: 'calc-torque', label: 'calculateTorque()', formula: 'M = (Pc * 9549) / RPM', phase: 'processamento' },
  { id: 'validate-limits', label: 'validateMachineLimits()', formula: 'rpm, potencia e avanco', phase: 'estado' },
  { id: 'validate-ld', label: 'validateLDRatio()', formula: 'seguro / alerta / critico / bloqueado', phase: 'estado' },
  { id: 'slider-bounds', label: 'calcularSliderBounds()', formula: 'ranges dinamicos por material', phase: 'estado' },
  { id: 'calc-health', label: 'calculateHealthScore()', formula: 'ap 40 + fz 30 + ae 20 + vc 10', phase: 'estado' },
  { id: 'store-result', label: 'set({ resultado })', formula: 'resultado pronto na machining-store', phase: 'saida' },
  { id: 'save-history', label: 'historyStore.addEntry()', formula: 'persistencia do historico', phase: 'saida' },
];

const PHASE_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  entrada: { label: 'Entrada', color: '#00D9FF', icon: 'input' },
  processamento: { label: 'Processamento', color: '#F97316', icon: 'precision_manufacturing' },
  estado: { label: 'Estado', color: '#39FF14', icon: 'inventory_2' },
  saida: { label: 'Saida', color: '#A855F7', icon: 'output' },
};

const PHASES = ['entrada', 'processamento', 'estado', 'saida'] as const;

export function MobileArchDataFlow() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-primary/15 bg-black/30 p-3">
        <h3 className="text-sm font-bold text-white">
          Fluxo de Dados do calcular()
        </h3>
        <p className="mt-1 text-[11px] text-gray-500">
          Pipeline de 16 etapas em{' '}
          <code className="text-primary">machining-store.ts</code>
        </p>
      </div>

      {PHASES.map((phase, phaseIndex) => {
        const phaseInfo = PHASE_LABELS[phase];
        const steps = PIPELINE_STEPS.filter((s) => s.phase === phase);

        return (
          <div key={phase}>
            {/* Phase Header */}
            <div
              className="mb-2 flex items-center gap-2 text-xs font-bold"
              style={{
                color: phaseInfo.color,
                animationDelay: `${phaseIndex * 80}ms`,
                animation: 'fadeInUp 0.3s ease-out both',
              }}
            >
              <span className="material-symbols-outlined text-base">
                {phaseInfo.icon}
              </span>
              <span className="uppercase tracking-wider">{phaseInfo.label}</span>
              <div className="h-px flex-1" style={{ backgroundColor: `${phaseInfo.color}33` }} />
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-2 pl-3">
              {steps.map((step, stepIndex) => (
                <div
                  key={step.id}
                  className="relative rounded-xl border border-white/5 bg-black/30 p-3"
                  style={{
                    animationDelay: `${phaseIndex * 80 + stepIndex * 50}ms`,
                    animation: 'fadeInUp 0.3s ease-out both',
                  }}
                >
                  {/* Connector line */}
                  {stepIndex < steps.length - 1 && (
                    <div
                      className="absolute -bottom-2 left-6 h-2 w-px"
                      style={{ backgroundColor: `${phaseInfo.color}44` }}
                    />
                  )}

                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                      style={{
                        backgroundColor: `${phaseInfo.color}22`,
                        color: phaseInfo.color,
                      }}
                    >
                      {PIPELINE_STEPS.indexOf(step) + 1}
                    </div>
                    <span className="text-xs font-bold text-white">
                      {step.label}
                    </span>
                  </div>
                  <p className="mt-1 pl-7 font-mono text-[10px] text-gray-500">
                    {step.formula}
                  </p>
                </div>
              ))}
            </div>

            {/* Phase connector arrow */}
            {phaseIndex < PHASES.length - 1 && (
              <div className="my-2 flex justify-center">
                <span
                  className="material-symbols-outlined text-lg"
                  style={{ color: `${phaseInfo.color}55` }}
                >
                  arrow_downward
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
