import { describe, it, expect, beforeEach } from 'vitest';
import { useUsageStore } from '@/admin/store/usage-store';

// ── Helpers ─────────────────────────────────────────────────────────────────

function clearUsage() {
  useUsageStore.getState().clearUsage();
}

interface TrackOverrides {
  materialNome?: string;
  tipoOperacao?: string;
  ferramentaTipo?: string;
  ferramentaDiametro?: number;
}

function track(overrides: TrackOverrides = {}) {
  useUsageStore.getState().trackUsage({
    materialNome: 'Aço 1045',
    tipoOperacao: 'desbaste',
    ferramentaTipo: 'toroidal',
    ferramentaDiametro: 6,
    ...overrides,
  });
}

// ── usage-store ──────────────────────────────────────────────────────────────

describe('useUsageStore — trackUsage', () => {
  beforeEach(() => clearUsage());

  it('starts empty', () => {
    expect(useUsageStore.getState().getTotalSimulations()).toBe(0);
  });

  it('records a usage event', () => {
    track();
    expect(useUsageStore.getState().getTotalSimulations()).toBe(1);
  });

  it('stores timestamp in ISO format', () => {
    track();
    const { events } = useUsageStore.getState();
    expect(events[0].timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('stores event fields correctly', () => {
    track({ materialNome: 'Alumínio 6061', tipoOperacao: 'acabamento', ferramentaTipo: 'esférica', ferramentaDiametro: 8 });
    const event = useUsageStore.getState().events[0];
    expect(event.materialNome).toBe('Alumínio 6061');
    expect(event.tipoOperacao).toBe('acabamento');
    expect(event.ferramentaTipo).toBe('esférica');
    expect(event.ferramentaDiametro).toBe(8);
  });

  it('accumulates multiple events', () => {
    track({ materialNome: 'Aço 1045' });
    track({ materialNome: 'Aço Inox 304' });
    track({ materialNome: 'Aço 1045' });
    expect(useUsageStore.getState().getTotalSimulations()).toBe(3);
  });

  it('inserts newest events at the front', () => {
    track({ materialNome: 'A' });
    track({ materialNome: 'B' });
    const { events } = useUsageStore.getState();
    expect(events[0].materialNome).toBe('B');
    expect(events[1].materialNome).toBe('A');
  });

  it('clearUsage resets to empty', () => {
    track();
    track();
    clearUsage();
    expect(useUsageStore.getState().getTotalSimulations()).toBe(0);
    expect(useUsageStore.getState().events).toHaveLength(0);
  });
});

describe('useUsageStore — getTodayCount', () => {
  beforeEach(() => clearUsage());

  it('returns 0 when no events', () => {
    expect(useUsageStore.getState().getTodayCount()).toBe(0);
  });

  it('counts events with today\'s date', () => {
    track();
    track();
    expect(useUsageStore.getState().getTodayCount()).toBe(2);
  });

  it('does not count events from a past date', () => {
    // Manually inject an event from yesterday
    const yesterday = new Date(Date.now() - 86400000).toISOString();
    useUsageStore.setState((s) => ({
      events: [
        { materialNome: 'Old', tipoOperacao: 'desbaste', ferramentaTipo: 'toroidal', ferramentaDiametro: 6, timestamp: yesterday },
        ...s.events,
      ],
    }));
    expect(useUsageStore.getState().getTodayCount()).toBe(0);
  });
});

describe('useUsageStore — getTopMaterials', () => {
  beforeEach(() => clearUsage());

  it('returns empty array when no events', () => {
    expect(useUsageStore.getState().getTopMaterials()).toHaveLength(0);
  });

  it('returns materials sorted by count descending', () => {
    track({ materialNome: 'A' });
    track({ materialNome: 'B' });
    track({ materialNome: 'B' });
    track({ materialNome: 'C' });
    track({ materialNome: 'C' });
    track({ materialNome: 'C' });
    const top = useUsageStore.getState().getTopMaterials();
    expect(top[0]).toEqual({ label: 'C', count: 3 });
    expect(top[1]).toEqual({ label: 'B', count: 2 });
    expect(top[2]).toEqual({ label: 'A', count: 1 });
  });

  it('respects n limit', () => {
    track({ materialNome: 'A' });
    track({ materialNome: 'B' });
    track({ materialNome: 'C' });
    expect(useUsageStore.getState().getTopMaterials(2)).toHaveLength(2);
  });
});

describe('useUsageStore — getTopOperacoes', () => {
  beforeEach(() => clearUsage());

  it('aggregates by tipoOperacao', () => {
    track({ tipoOperacao: 'desbaste' });
    track({ tipoOperacao: 'desbaste' });
    track({ tipoOperacao: 'acabamento' });
    const top = useUsageStore.getState().getTopOperacoes();
    expect(top[0]).toEqual({ label: 'desbaste', count: 2 });
    expect(top[1]).toEqual({ label: 'acabamento', count: 1 });
  });
});

describe('useUsageStore — getTopFerramentas', () => {
  beforeEach(() => clearUsage());

  it('labels ferramenta as "tipo ∅Dmm"', () => {
    track({ ferramentaTipo: 'toroidal', ferramentaDiametro: 6 });
    track({ ferramentaTipo: 'toroidal', ferramentaDiametro: 6 });
    const top = useUsageStore.getState().getTopFerramentas();
    expect(top[0].label).toBe('toroidal ∅6mm');
    expect(top[0].count).toBe(2);
  });

  it('distinguishes different diameters of same type', () => {
    track({ ferramentaTipo: 'toroidal', ferramentaDiametro: 6 });
    track({ ferramentaTipo: 'toroidal', ferramentaDiametro: 10 });
    const top = useUsageStore.getState().getTopFerramentas();
    expect(top).toHaveLength(2);
  });
});
