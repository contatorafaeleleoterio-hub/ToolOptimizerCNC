import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';

vi.mock('@/store', () => ({
  useMachiningStore: vi.fn(() => undefined),
}));

describe('useSimulationAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('transitions through phases: idle → calculating → revealing → idle', async () => {
    const { result } = renderHook(() => useSimulationAnimation());

    // Initial idle state
    expect(result.current.isCalculating).toBe(false);
    expect(result.current.calcProgress).toBe(0);
    expect(result.current.isRevealing).toBe(false);
    expect(result.current.gaugeAnimating).toBe(false);

    const mockSimular = vi.fn();

    // Start simulation — Phase 2: igniting
    act(() => {
      result.current.runSimulation(mockSimular);
    });

    expect(result.current.isCalculating).toBe(true);
    expect(result.current.calcProgress).toBe(0);

    // t=80ms: gauges start
    act(() => { vi.advanceTimersByTime(80); });
    expect(result.current.gaugeAnimating).toBe(true);
    expect(result.current.gaugeTarget).toBe(1);

    // t=1750ms: Phase 3 — revealing starts, isCalculating goes false
    act(() => { vi.advanceTimersByTime(1670); }); // total 1750ms
    expect(result.current.isCalculating).toBe(false);
    expect(result.current.isRevealing).toBe(true);

    // t=2300ms: revealing ends
    act(() => { vi.advanceTimersByTime(550); }); // total 2300ms
    expect(result.current.isRevealing).toBe(false);

    // t=2650ms: Phase 4 — back to full idle
    act(() => { vi.advanceTimersByTime(350); }); // total 2650ms
    expect(result.current.gaugeAnimating).toBe(false);
    expect(result.current.gaugeTarget).toBe(0);
    expect(result.current.calcProgress).toBe(0);
  });

  it('calls originalSimular exactly once at t=1500ms', async () => {
    const { result } = renderHook(() => useSimulationAnimation());
    const mockSimular = vi.fn();

    act(() => {
      result.current.runSimulation(mockSimular);
    });

    // Before t=1500ms — should not have been called
    act(() => { vi.advanceTimersByTime(1499); });
    expect(mockSimular).not.toHaveBeenCalled();

    // At t=1500ms — called exactly once
    act(() => { vi.advanceTimersByTime(1); });
    expect(mockSimular).toHaveBeenCalledTimes(1);

    // Advance to end of sequence — still exactly once
    act(() => { vi.advanceTimersByTime(1200); });
    expect(mockSimular).toHaveBeenCalledTimes(1);
  });
});
