/**
 * Standard tool definitions for ToolOptimizer CNC
 * Source: docs/specs/PRD_MASTER.md
 */

import type { Ferramenta } from '../types';

interface FerramentaPadrao {
  tipo: Ferramenta['tipo'];
  descricao: string;
  zPadrao: number;
  diametros: readonly number[];
  raioQuina: number | null;
}

export const DIAMETROS_PADRAO = [6, 8, 10, 12, 16, 20] as const;

export const FERRAMENTAS_PADRAO: readonly FerramentaPadrao[] = [
  {
    tipo: 'toroidal',
    descricao: 'Toroidal (Bullnose)',
    zPadrao: 4,
    diametros: DIAMETROS_PADRAO,
    raioQuina: 1,
  },
  {
    tipo: 'esferica',
    descricao: 'Esférica (Ball End)',
    zPadrao: 4,
    diametros: DIAMETROS_PADRAO,
    raioQuina: null,
  },
  {
    tipo: 'topo',
    descricao: 'Topo Reto (Flat End)',
    zPadrao: 4,
    diametros: DIAMETROS_PADRAO,
    raioQuina: null,
  },
] as const;
