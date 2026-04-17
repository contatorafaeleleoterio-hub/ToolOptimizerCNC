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

  it('initial state: all flags false, calcProgress 0, gaugeTarget 0', () => {
    const { result } = renderHook(() => useSimulationAnimation());
    expect(result.current.isCalculating).toBe(false);
    expect(result.current.isRevealing).toBe(false);
    expect(result.current.gaugeAnimating).toBe(false);
    expect(result.current.calcProgress).toBe(0);
    expect(result.current.gaugeTarget).toBe(0);
  });

  it('isRevealing is false at t=1749ms and true at t=1750ms', () => {
    const { result } = renderHook(() => useSimulationAnimation());
    act(() => { result.current.runSimulation(vi.fn()); });

    act(() => { vi.advanceTimersByTime(1749); });
    expect(result.current.isRevealing).toBe(false);

    act(() => { vi.advanceTimersByTime(1); }); // total 1750ms
    expect(result.current.isRevealing).toBe(true);
  });

  it('gaugeAnimating becomes true at t=80ms', () => {
    const { result } = renderHook(() => useSimulationAnimation());
    act(() => { result.current.runSimulation(vi.fn()); });

    act(() => { vi.advanceTimersByTime(79); });
    expect(result.current.gaugeAnimating).toBe(false);

    act(() => { vi.advanceTimersByTime(1); }); // total 80ms
    expect(result.current.gaugeAnimating).toBe(true);
  });

  it('gaugeTarget resets to 0 after full sequence', () => {
    const { result } = renderHook(() => useSimulationAnimation());
    act(() => { result.current.runSimulation(vi.fn()); });

    // gaugeTarget = 1 at t=80ms
    act(() => { vi.advanceTimersByTime(80); });
    expect(result.current.gaugeTarget).toBe(1);

    // after t=2650ms gaugeTarget returns to 0
    act(() => { vi.advanceTimersByTime(2600); }); // total 2680ms > 2650ms
    expect(result.current.gaugeTarget).toBe(0);
  });

  it('runSimulation while active sequence is a no-op (guard)', () => {
    const { result } = renderHook(() => useSimulationAnimation());
    const first = vi.fn();
    const second = vi.fn();

    act(() => { result.current.runSimulation(first); });
    act(() => { vi.advanceTimersByTime(500); }); // still running

    act(() => { result.current.runSimulation(second); });
    expect(result.current.isCalculating).toBe(true); // still in original sequence

    // Advance to end — second simular should never be called
    act(() => { vi.advanceTimersByTime(2200); });
    expect(second).not.toHaveBeenCalled();
    expect(first).toHaveBeenCalledTimes(1);
  });

  it('isCalculating goes false at t=1750ms when revealing starts', () => {
    const { result } = renderHook(() => useSimulationAnimation());
    act(() => { result.current.runSimulation(vi.fn()); });

    act(() => { vi.advanceTimersByTime(1749); });
    expect(result.current.isCalculating).toBe(true);

    act(() => { vi.advanceTimersByTime(1); }); // t=1750ms
    expect(result.current.isCalculating).toBe(false);
    expect(result.current.isRevealing).toBe(true);
  });
});
