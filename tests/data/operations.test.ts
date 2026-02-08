import { describe, it, expect } from 'vitest';
import { OPERACOES } from '../../src/data/operations';
import { TipoUsinagem } from '../../src/types';

describe('OPERACOES', () => {
  it('should have 3 operation types', () => {
    expect(OPERACOES).toHaveLength(3);
  });

  it('should include all TipoUsinagem values', () => {
    const tipos = OPERACOES.map((o) => o.tipo);
    expect(tipos).toContain(TipoUsinagem.DESBASTE);
    expect(tipos).toContain(TipoUsinagem.SEMI_ACABAMENTO);
    expect(tipos).toContain(TipoUsinagem.ACABAMENTO);
  });

  it('should have correct ap max multipliers', () => {
    const desbaste = OPERACOES.find((o) => o.tipo === TipoUsinagem.DESBASTE);
    const semi = OPERACOES.find((o) => o.tipo === TipoUsinagem.SEMI_ACABAMENTO);
    const acabamento = OPERACOES.find((o) => o.tipo === TipoUsinagem.ACABAMENTO);

    expect(desbaste?.apMaxMult).toBe(1.0);
    expect(semi?.apMaxMult).toBe(0.5);
    expect(acabamento?.apMaxMult).toBe(0.3);
  });

  it('should have correct fz multipliers', () => {
    const desbaste = OPERACOES.find((o) => o.tipo === TipoUsinagem.DESBASTE);
    const semi = OPERACOES.find((o) => o.tipo === TipoUsinagem.SEMI_ACABAMENTO);
    const acabamento = OPERACOES.find((o) => o.tipo === TipoUsinagem.ACABAMENTO);

    expect(desbaste?.fzMult).toBe(1.0);
    expect(semi?.fzMult).toBe(0.7);
    expect(acabamento?.fzMult).toBe(0.5);
  });

  it('should have Portuguese names', () => {
    const nomes = OPERACOES.map((o) => o.nome);
    expect(nomes).toContain('Desbaste');
    expect(nomes).toContain('Semi-acabamento');
    expect(nomes).toContain('Acabamento');
  });

  it('should have descriptions for all operations', () => {
    for (const op of OPERACOES) {
      expect(op.descricao.length).toBeGreaterThan(0);
    }
  });
});
