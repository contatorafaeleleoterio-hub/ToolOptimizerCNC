/**
 * Machining operation type definitions for ToolOptimizer CNC
 * Source: docs/specs/PRD_MASTER.md
 */

import { TipoUsinagem } from '../types';

interface OperacaoMetadata {
  tipo: TipoUsinagem;
  nome: string;
  apMaxMult: number;
  fzMult: number;
  descricao: string;
}

export const OPERACOES: readonly OperacaoMetadata[] = [
  {
    tipo: TipoUsinagem.DESBASTE,
    nome: 'Desbaste',
    apMaxMult: 1.0,
    fzMult: 1.0,
    descricao: 'Remoção de material',
  },
  {
    tipo: TipoUsinagem.SEMI_ACABAMENTO,
    nome: 'Semi-acabamento',
    apMaxMult: 0.5,
    fzMult: 0.7,
    descricao: 'Preparação superfície',
  },
  {
    tipo: TipoUsinagem.ACABAMENTO,
    nome: 'Acabamento',
    apMaxMult: 0.3,
    fzMult: 0.5,
    descricao: 'Acabamento final',
  },
] as const;
