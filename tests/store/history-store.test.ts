import { describe, it, expect, beforeEach } from 'vitest';
import { useHistoryStore } from '@/store/history-store';
import { TipoUsinagem } from '@/types';
import type { ResultadoUsinagem, Ferramenta, ParametrosUsinagem } from '@/types';

const MOCK_FERRAMENTA: Ferramenta = {
  tipo: 'toroidal',
  diametro: 10,
  numeroArestas: 4,
  balanco: 30,
  raioQuina: 1.0,
};

const MOCK_PARAMETROS: ParametrosUsinagem = { ap: 2, ae: 5, fz: 0.1, vc: 100 };

const MOCK_RESULTADO: ResultadoUsinagem = {
  rpm: 3183,
  avanco: 1273,
  potenciaCorte: 0.85,
  potenciaMotor: 0.68,
  torque: 2.04,
  mrr: 12.7,
  vcReal: 100,
  fzEfetivo: 0.1,
  forcaCorte: 2000,
  seguranca: { nivel: 'verde', avisos: [], razaoLD: 3.0, ctf: 1 },
};

function makeEntry(overrides?: Partial<{ materialNome: string; tipoOperacao: TipoUsinagem }>) {
  return {
    materialNome: overrides?.materialNome ?? 'Aço 1045',
    materialId: 2,
    ferramenta: { ...MOCK_FERRAMENTA },
    tipoOperacao: overrides?.tipoOperacao ?? TipoUsinagem.DESBASTE,
    parametros: { ...MOCK_PARAMETROS },
    resultado: { ...MOCK_RESULTADO },
  };
}

describe('HistoryStore', () => {
  beforeEach(() => {
    useHistoryStore.getState().clearHistory();
    useHistoryStore.getState().resetFilters();
  });

  it('starts with empty entries', () => {
    expect(useHistoryStore.getState().entries).toHaveLength(0);
  });

  it('adds an entry with generated id and timestamp', () => {
    useHistoryStore.getState().addEntry(makeEntry());
    const entries = useHistoryStore.getState().entries;
    expect(entries).toHaveLength(1);
    expect(entries[0].id).toBeTruthy();
    expect(entries[0].timestamp).toBeGreaterThan(0);
    expect(entries[0].materialNome).toBe('Aço 1045');
    expect(entries[0].feedback).toBeNull();
    expect(entries[0].notas).toBe('');
  });

  it('adds newest entries first', () => {
    useHistoryStore.getState().addEntry(makeEntry({ materialNome: 'First' }));
    useHistoryStore.getState().addEntry(makeEntry({ materialNome: 'Second' }));
    const entries = useHistoryStore.getState().entries;
    expect(entries[0].materialNome).toBe('Second');
    expect(entries[1].materialNome).toBe('First');
  });

  it('limits entries to 50 (circular buffer)', () => {
    for (let i = 0; i < 55; i++) {
      useHistoryStore.getState().addEntry(makeEntry({ materialNome: `Material ${i}` }));
    }
    expect(useHistoryStore.getState().entries).toHaveLength(50);
    // Most recent should be Material 54
    expect(useHistoryStore.getState().entries[0].materialNome).toBe('Material 54');
  });

  it('removes an entry by id', () => {
    useHistoryStore.getState().addEntry(makeEntry());
    const id = useHistoryStore.getState().entries[0].id;
    useHistoryStore.getState().removeEntry(id);
    expect(useHistoryStore.getState().entries).toHaveLength(0);
  });

  it('clears all history', () => {
    useHistoryStore.getState().addEntry(makeEntry());
    useHistoryStore.getState().addEntry(makeEntry());
    useHistoryStore.getState().clearHistory();
    expect(useHistoryStore.getState().entries).toHaveLength(0);
  });

  it('sets feedback on an entry', () => {
    useHistoryStore.getState().addEntry(makeEntry());
    const id = useHistoryStore.getState().entries[0].id;
    useHistoryStore.getState().setFeedback(id, 'sucesso');
    expect(useHistoryStore.getState().entries[0].feedback).toBe('sucesso');
  });

  it('toggles feedback off (back to null)', () => {
    useHistoryStore.getState().addEntry(makeEntry());
    const id = useHistoryStore.getState().entries[0].id;
    useHistoryStore.getState().setFeedback(id, 'quebra');
    useHistoryStore.getState().setFeedback(id, null);
    expect(useHistoryStore.getState().entries[0].feedback).toBeNull();
  });

  it('sets notas on an entry', () => {
    useHistoryStore.getState().addEntry(makeEntry());
    const id = useHistoryStore.getState().entries[0].id;
    useHistoryStore.getState().setNotas(id, 'Funcionou bem');
    expect(useHistoryStore.getState().entries[0].notas).toBe('Funcionou bem');
  });

  describe('filtering', () => {
    beforeEach(() => {
      useHistoryStore.getState().addEntry(makeEntry({ materialNome: 'Aço 1045', tipoOperacao: TipoUsinagem.DESBASTE }));
      useHistoryStore.getState().addEntry(makeEntry({ materialNome: 'Alumínio 6061', tipoOperacao: TipoUsinagem.ACABAMENTO }));
      useHistoryStore.getState().addEntry(makeEntry({ materialNome: 'Aço Inox 304', tipoOperacao: TipoUsinagem.SEMI_ACABAMENTO }));
      // Set feedback on first (Inox, index 0 = newest)
      const inoxId = useHistoryStore.getState().entries[0].id;
      useHistoryStore.getState().setFeedback(inoxId, 'quebra');
    });

    it('filters by material name', () => {
      useHistoryStore.getState().setFilters({ materialNome: 'Aço' });
      const filtered = useHistoryStore.getState().getFilteredEntries();
      expect(filtered).toHaveLength(2); // Aço 1045 + Aço Inox 304
    });

    it('filters by operation type', () => {
      useHistoryStore.getState().setFilters({ tipoOperacao: TipoUsinagem.ACABAMENTO });
      const filtered = useHistoryStore.getState().getFilteredEntries();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].materialNome).toBe('Alumínio 6061');
    });

    it('filters by feedback', () => {
      useHistoryStore.getState().setFilters({ feedback: 'quebra' });
      const filtered = useHistoryStore.getState().getFilteredEntries();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].materialNome).toBe('Aço Inox 304');
    });

    it('combines filters', () => {
      useHistoryStore.getState().setFilters({ materialNome: 'Aço', feedback: 'quebra' });
      const filtered = useHistoryStore.getState().getFilteredEntries();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].materialNome).toBe('Aço Inox 304');
    });

    it('resets filters', () => {
      useHistoryStore.getState().setFilters({ materialNome: 'xyz' });
      expect(useHistoryStore.getState().getFilteredEntries()).toHaveLength(0);
      useHistoryStore.getState().resetFilters();
      expect(useHistoryStore.getState().getFilteredEntries()).toHaveLength(3);
    });
  });

  describe('export/import', () => {
    it('exports history as JSON', () => {
      useHistoryStore.getState().addEntry(makeEntry());
      const json = useHistoryStore.getState().exportHistory();
      const parsed = JSON.parse(json);
      expect(parsed.version).toBe(1);
      expect(parsed.entries).toHaveLength(1);
    });

    it('imports history from JSON', () => {
      useHistoryStore.getState().addEntry(makeEntry());
      const json = useHistoryStore.getState().exportHistory();
      useHistoryStore.getState().clearHistory();
      expect(useHistoryStore.getState().entries).toHaveLength(0);
      const ok = useHistoryStore.getState().importHistory(json);
      expect(ok).toBe(true);
      expect(useHistoryStore.getState().entries).toHaveLength(1);
    });

    it('rejects invalid JSON', () => {
      const ok = useHistoryStore.getState().importHistory('not json');
      expect(ok).toBe(false);
    });

    it('rejects missing entries array', () => {
      const ok = useHistoryStore.getState().importHistory('{"version":1}');
      expect(ok).toBe(false);
    });
  });
});
