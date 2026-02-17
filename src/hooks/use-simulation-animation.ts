import { useState, useEffect, useRef } from 'react';
import { useMachiningStore } from '@/store';
import type { StatusSeguranca } from '@/types';

export function useSimulationAnimation() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [triggerPulse, setTriggerPulse] = useState(false);
  const [gaugeAnimating, setGaugeAnimating] = useState(false);

  const safetyLevel = useMachiningStore((s) => s.resultado?.seguranca.nivel);
  const prevSafetyRef = useRef<StatusSeguranca['nivel']>();

  // Subtle pulse on safety level changes
  useEffect(() => {
    if (safetyLevel && safetyLevel !== prevSafetyRef.current) {
      setTriggerPulse(true);
      const timer = setTimeout(() => setTriggerPulse(false), 1500); // 1000ms → 1500ms (+50%)
      prevSafetyRef.current = safetyLevel;
      return () => clearTimeout(timer);
    }
  }, [safetyLevel]);

  const runSimulation = async (originalSimular: () => void) => {
    setIsCalculating(true);
    setGaugeAnimating(true);

    // Brief loading state (200ms → 300ms, +50%)
    await new Promise((resolve) => setTimeout(resolve, 300));

    originalSimular();

    setIsCalculating(false);

    // Gauge animation completes (600ms → 900ms, +50%)
    setTimeout(() => setGaugeAnimating(false), 900);
  };

  return {
    isCalculating,
    triggerPulse,
    gaugeAnimating,
    safetyLevel,
    runSimulation,
  };
}
