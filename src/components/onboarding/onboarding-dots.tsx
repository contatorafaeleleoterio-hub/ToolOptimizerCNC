import { useOnboardingStore, OnboardingStepId } from '@/hooks/use-onboarding';

const STEP_ORDER: OnboardingStepId[] = [
  'config-base',
  'ferramenta',
  'ajuste-fino',
  'seguranca',
  'simular'
];

export function OnboardingDots() {
  const { currentStep, completed } = useOnboardingStore();

  if (completed || currentStep === 'welcome') return null;

  const currentIndex = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center gap-2 py-4" data-testid="onboarding-dots">
      {STEP_ORDER.map((step, index) => {
        const isActive = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div
            key={step}
            className={`transition-all duration-300 ${
              isActive ? 'bg-cyan-400' : 'bg-white/20'
            } ${
              isCurrent ? 'w-5 h-1.5 rounded-full' : 'w-1.5 h-1.5 rounded-full'
            }`}
          />
        );
      })}
    </div>
  );
}
