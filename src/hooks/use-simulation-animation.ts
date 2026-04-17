import { useState, useEffect, useRef, useCallback } from 'react';
import { useMachiningStore } from '@/store';
import type { StatusSeguranca } from '@/types';

export function useSimulationAnimation() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcProgress, setCalcProgress] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [gaugeTarget, setGaugeTarget] = useState(0);
  const [gaugeAnimating, setGaugeAnimating] = useState(false);
  const [triggerPulse, setTriggerPulse] = useState(false);

  const safetyLevel = useMachiningStore((s) => s.resultado?.seguranca.nivel);
  const prevSafetyRef = useRef<StatusSeguranca['nivel']>();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isRunningRef = useRef(false);

  useEffect(() => {
    if (safetyLevel && safetyLevel !== prevSafetyRef.current) {
      setTriggerPulse(true);
      const timer = setTimeout(() => setTriggerPulse(false), 1500);
      prevSafetyRef.current = safetyLevel;
      return () => clearTimeout(timer);
    }
  }, [safetyLevel]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const addTimeout = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const runSimulation = useCallback(async (originalSimular: () => void) => {
    // Guard against double-click
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    // Clear any previous timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // t=0ms: Phase 2 — igniting
    setIsCalculating(true);
    setCalcProgress(0);

    // t=80ms: gauges start
    addTimeout(() => {
      setGaugeAnimating(true);
      setGaugeTarget(1);
    }, 80);

    // t=80ms→1500ms: progress climbs 0→98%
    const startTime = Date.now() + 80;
    addTimeout(() => {
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(98, Math.round((elapsed / 1420) * 98));
        setCalcProgress(pct);
        if (pct >= 98 && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, 30);
    }, 80);

    // t=1500ms: ⚡ real CNC calculation
    addTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCalcProgress(100);
      originalSimular();
    }, 1500);

    // t=1750ms: Phase 3 — revealing
    addTimeout(() => {
      setIsCalculating(false);
      setIsRevealing(true);
    }, 1750);

    // t=2300ms: sliders re-enabled, revealing ends
    addTimeout(() => {
      setIsRevealing(false);
    }, 2300);

    // t=2650ms: Phase 4 — back to idle
    addTimeout(() => {
      setGaugeTarget(0);
      setGaugeAnimating(false);
      setCalcProgress(0);
      isRunningRef.current = false;
    }, 2650);
  }, []);

  return {
    isCalculating,
    calcProgress,
    isRevealing,
    gaugeTarget,
    gaugeAnimating,
    triggerPulse,
    safetyLevel,
    runSimulation,
  };
}
