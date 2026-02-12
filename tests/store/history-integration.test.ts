import { describe, it, expect, beforeEach } from 'vitest';
import { useMachiningStore } from '@/store/machining-store';
import { useHistoryStore } from '@/store/history-store';

describe('History Integration (simular → history)', () => {
  beforeEach(() => {
    useMachiningStore.getState().reset();
    useHistoryStore.getState().clearHistory();
  });

  it('simular() saves entry to history', () => {
    const s = useMachiningStore.getState();
    s.setFerramenta({ diametro: 10, balanco: 20 });
    s.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
    s.simular();

    const entries = useHistoryStore.getState().entries;
    expect(entries).toHaveLength(1);
    expect(entries[0].resultado.rpm).toBeGreaterThan(0);
    expect(entries[0].materialNome).toBeTruthy();
    expect(entries[0].tipoOperacao).toBe('desbaste');
  });

  it('calcular() does NOT save to history', () => {
    const s = useMachiningStore.getState();
    s.setFerramenta({ diametro: 10, balanco: 20 });
    s.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
    s.calcular();

    const entries = useHistoryStore.getState().entries;
    expect(entries).toHaveLength(0);
  });

  it('multiple simular() calls create multiple entries', () => {
    const s = useMachiningStore.getState();
    s.setFerramenta({ diametro: 10, balanco: 20 });
    s.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
    s.simular();
    s.simular();
    s.simular();

    expect(useHistoryStore.getState().entries).toHaveLength(3);
  });

  it('simular() with invalid params does not save to history', () => {
    const s = useMachiningStore.getState();
    s.setFerramenta({ diametro: 0 }); // Invalid
    s.simular();

    expect(useHistoryStore.getState().entries).toHaveLength(0);
  });

  it('history entry contains correct ferramenta snapshot', () => {
    const s = useMachiningStore.getState();
    s.setFerramenta({ diametro: 10, tipo: 'toroidal', numeroArestas: 4, balanco: 25 });
    s.setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
    s.simular();

    const entry = useHistoryStore.getState().entries[0];
    expect(entry.ferramenta.diametro).toBe(10);
    expect(entry.ferramenta.tipo).toBe('toroidal');
    expect(entry.ferramenta.numeroArestas).toBe(4);
  });
});
