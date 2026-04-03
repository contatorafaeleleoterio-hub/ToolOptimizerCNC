import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OnboardingStepId = 
  | 'welcome' 
  | 'config-base' 
  | 'ferramenta' 
  | 'ajuste-fino' 
  | 'seguranca' 
  | 'simular' 
  | 'complete';

export interface OnboardingState {
  completed: boolean;
  currentStep: OnboardingStepId;
  skipped: boolean;
  startedAt: string;
  completedAt?: string;
  
  // Actions
  setStep: (step: OnboardingStepId) => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      completed: false,
      currentStep: 'welcome',
      skipped: false,
      startedAt: new Date().toISOString(),

      setStep: (step) => set({ currentStep: step }),
      
      completeOnboarding: () => set({ 
        completed: true, 
        currentStep: 'complete',
        completedAt: new Date().toISOString() 
      }),
      
      skipOnboarding: () => set({ 
        skipped: true, 
        completed: true,
        currentStep: 'config-base' 
      }),

      resetOnboarding: () => set({
        completed: false,
        currentStep: 'welcome',
        skipped: false,
        startedAt: new Date().toISOString(),
        completedAt: undefined
      }),
    }),
    {
      name: 'tooloptimizer:onboarding',
    }
  )
);

export const ONBOARDING_MESSAGES: Record<OnboardingStepId, string[]> = {
  'welcome': [
    'BEM-VINDO AO FÊNIX',
    'CALCULADORA CNC PROFISSIONAL',
    'VAMOS CONFIGURAR SUA PRIMEIRA USINAGEM'
  ],
  'config-base': [
    'SELECIONE O MATERIAL DA PEÇA',
    'ABRA A GAVETA CONFIGURAÇÃO BASE'
  ],
  'ferramenta': [
    'AGORA CONFIGURE SUA FRESA',
    'TIPO · DIÂMETRO · ARESTAS'
  ],
  'ajuste-fino': [
    'AJUSTE OS PARÂMETROS DE CORTE',
    'VEL. DE CORTE · AVANÇO · ENGAJAMENTOS'
  ],
  'seguranca': [
    'VERIFIQUE O FATOR DE SEGURANÇA',
    'RECOMENDADO 0.80 PARA MAIORIA DAS OPERAÇÕES'
  ],
  'simular': [
    'TUDO PRONTO',
    'CLIQUE EM CALCULAR PARÂMETROS PARA VER RPM E AVANÇO'
  ],
  'complete': [
    'PARÂMETROS CALCULADOS',
    'RPM E AVANÇO PRONTOS PARA USO NA MÁQUINA'
  ]
};

export const NORMAL_MESSAGES = [
  'FÊNIX v0.10.0 ◆ CALCULADORA CNC PROFISSIONAL',
  'DICA: AJUSTE VC PARA OTIMIZAR VIDA DA FERRAMENTA',
  'NOVO: HISTÓRICO DE SIMULAÇÕES DISPONÍVEL EM FAVORITOS',
  'L/D > 4: REDUZA AP E AE EM 30% PARA EVITAR VIBRAÇÃO',
  'MODELO KIENZLE: PRECISÃO ±15% EM RELAÇÃO AO CATÁLOGO'
];
