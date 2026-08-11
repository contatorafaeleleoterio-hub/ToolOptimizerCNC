import { useState, useEffect, useRef, useCallback } from 'react';
import { useMachiningStore } from '@/store';
import type { StatusSeguranca } from '@/types';

/**
 * Provides brief, non-blocking feedback for an instantaneous local calculation.
 * The calculation itself is synchronous; this hook never delays it.
 */
export function useSimulationAnimation() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [triggerPulse, setTriggerPulse] = useState(false);
  const safetyLevel = useMachiningStore((s) => s.resultado?.seguranca.nivel);
  const prevSafetyRef = useRef<StatusSeguranca['nivel']>();
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (safetyLevel && safetyLevel !== prevSafetyRef.current) {
      setTriggerPulse(true);
      const timer = setTimeout(() => setTriggerPulse(false), 1500);
      prevSafetyRef.current = safetyLevel;
      return () => clearTimeout(timer);
    }
  }, [safetyLevel]);

  useEffect(() => () => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
  }, []);

  const runSimulation = useCallback((simular: () => void) => {
    simular();
    setIsUpdated(true);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => {
      setIsUpdated(false);
      feedbackTimeoutRef.current = null;
    }, 300);
  }, []);

  return { isUpdated, triggerPulse, safetyLevel, runSimulation };
}
