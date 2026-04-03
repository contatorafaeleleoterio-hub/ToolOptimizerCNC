import { useEffect } from 'react';
import { useOnboardingStore } from '@/hooks/use-onboarding';
import { useMachiningStore } from '@/store';

export function OnboardingController() {
  const { currentStep, completed, skipped, setStep, completeOnboarding } = useOnboardingStore();
  
  const materialId = useMachiningStore(s => s.materialId);
  const tipoOperacao = useMachiningStore(s => s.tipoOperacao);
  const ferramenta = useMachiningStore(s => s.ferramenta);
  const resultado = useMachiningStore(s => s.resultado);

  useEffect(() => {
    if (completed || skipped || currentStep === 'welcome') return;

    if (currentStep === 'config-base') {
      if (materialId !== 0 && tipoOperacao) {
        setStep('ferramenta');
      }
    }

    if (currentStep === 'ferramenta') {
      if (ferramenta.tipo && ferramenta.diametro > 0) {
        setStep('ajuste-fino');
      }
    }

    // Adjustment and Safety steps advance on drawer interaction usually, 
    // but here we can wait for a bit or just look at state.
    // For now, let's keep them until user clicks Simular.
    
    if (currentStep === 'simular' || currentStep === 'seguranca' || currentStep === 'ajuste-fino') {
      if (resultado !== null) {
        completeOnboarding();
      }
    }
  }, [materialId, tipoOperacao, ferramenta, resultado, currentStep, completed, skipped, setStep, completeOnboarding]);

  return null;
}
