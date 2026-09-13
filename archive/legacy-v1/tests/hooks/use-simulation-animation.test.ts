import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSimulationAnimation } from '@/hooks/use-simulation-animation';

vi.mock('@/store', () => ({
  useMachiningStore: vi.fn(() => undefined),
}));

describe('useSimulationAnimation', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('calculates immediately and shows non-blocking confirmation', () => {
    const { result } = renderHook(() => useSimulationAnimation());
    const simular = vi.fn();

    act(() => result.current.runSimulation(simular));

    expect(simular).toHaveBeenCalledTimes(1);
    expect(result.current.isUpdated).toBe(true);
  });

  it('returns to its idle label after 300ms', () => {
    const { result } = renderHook(() => useSimulationAnimation());
    act(() => result.current.runSimulation(vi.fn()));
    act(() => vi.advanceTimersByTime(300));
    expect(result.current.isUpdated).toBe(false);
  });

  it('allows rapid consecutive simulations and restarts confirmation', () => {
    const { result } = renderHook(() => useSimulationAnimation());
    const simular = vi.fn();
    act(() => {
      result.current.runSimulation(simular);
      vi.advanceTimersByTime(200);
      result.current.runSimulation(simular);
    });
    expect(simular).toHaveBeenCalledTimes(2);
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.isUpdated).toBe(true);
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.isUpdated).toBe(false);
  });
});
