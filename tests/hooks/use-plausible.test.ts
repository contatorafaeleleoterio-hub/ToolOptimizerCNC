/**
 * Tests for use-plausible hook — Plausible Analytics typed wrapper
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePlausible } from '@/hooks/use-plausible';

describe('usePlausible', () => {
  beforeEach(() => {
    // Mock window.plausible before each test
    window.plausible = vi.fn();
  });

  afterEach(() => {
    // Clean up global mock
    delete window.plausible;
  });

  it('calls window.plausible with the event name', () => {
    const { result } = renderHook(() => usePlausible());
    result.current.track('Simulacao_Executada');
    expect(window.plausible).toHaveBeenCalledWith('Simulacao_Executada', undefined);
  });

  it('passes props to plausible when provided', () => {
    const { result } = renderHook(() => usePlausible());
    result.current.track('Simulacao_Executada', { material: 'Aço 1045', operacao: 'desbaste' });
    expect(window.plausible).toHaveBeenCalledWith('Simulacao_Executada', {
      props: { material: 'Aço 1045', operacao: 'desbaste' },
    });
  });

  it('does not throw when window.plausible is undefined (dev/test environment)', () => {
    delete window.plausible; // simulate dev/test env where script is not loaded
    const { result } = renderHook(() => usePlausible());
    // Must not throw
    expect(() => result.current.track('Historico_Acessado')).not.toThrow();
  });

  it('tracks events without props using undefined options', () => {
    const { result } = renderHook(() => usePlausible());
    result.current.track('Resultado_Copiado');
    // Called with undefined (no props object) when no props given
    expect(window.plausible).toHaveBeenCalledTimes(1);
    expect(window.plausible).toHaveBeenCalledWith('Resultado_Copiado', undefined);
  });
});
