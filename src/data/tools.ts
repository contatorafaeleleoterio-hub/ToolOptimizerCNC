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
export const DIAMETROS_COMPLETOS = [0.2, 0.5, 0.75, 0.8, 1, 1.5, 2, 3, 4, 6, 8, 10, 12, 14, 16] as const;
export const RAIOS_PONTA = [0.2, 0.5, 1.0] as const;
export const RAIOS_PADRAO = [0.5, 1.0] as const;

/** Flute count options for dropdown (Fase 3) */
export const ARESTAS_OPTIONS = [2, 3, 4, 6] as const;

/** Tool holder height options for dropdown in mm (Fase 3) */
export const ALTURAS_FIXACAO = [15, 20, 25, 30, 35, 40, 50, 60, 80, 100, 120, 150] as const;

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
