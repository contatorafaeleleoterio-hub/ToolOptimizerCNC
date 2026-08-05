/**
 * Presentation helpers shared by the desktop ResultsPanel and the mobile
 * MobileResultsSection. Both render the same LCD console, so the formatting
 * and the safety-to-color mapping live here rather than being duplicated.
 */

import type { Ferramenta, ResultadoUsinagem } from '@/types';
import { SEMAPHORE_HEX } from '@/components/design-tokens';

type NivelSeguranca = ResultadoUsinagem['seguranca']['nivel'];

/** Compact tool spec string: "Toroidal Ø6 R1.0 H25 F4" */
export function formatToolSpec(f: Ferramenta): string {
  const tipo = f.tipo === 'toroidal' ? 'Toroidal' : f.tipo === 'esferica' ? 'Esférica' : 'Topo Reto';
  const raio = f.tipo === 'toroidal' ? ` R${f.raioQuina ?? 1.0}` : f.tipo === 'esferica' ? ` R${f.diametro / 2}` : '';
  return `${tipo} Ø${f.diametro}${raio} H${f.balanco} F${f.numeroArestas}`;
}

/** L/D color based on the safety thresholds (≤3 safe, ≤4 alert, above critical) */
export function getLdColor(razaoLD: number): string {
  if (razaoLD <= 3) return SEMAPHORE_HEX.verde;
  if (razaoLD <= 4) return SEMAPHORE_HEX.amarelo;
  return SEMAPHORE_HEX.vermelho;
}

/** Format timestamp as "DD/MM/YYYY HH:mm" */
export function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Action recommendation line for the LCD display */
export function getActionText(nivel: NivelSeguranca, razaoLD: number, ctf: number): string {
  if (nivel === 'bloqueado') return 'REDUZIR BALANÇO OU AUMENTAR DIÂMETRO DA FERRAMENTA.';
  if (razaoLD > 4) return 'REDUZIR BALANÇO DA FERRAMENTA. VERIFICAR RELAÇÃO L/D.';
  if (ctf > 1.3) return 'AUMENTAR ae OU REDUZIR fz PARA COMPENSAR CTF ELEVADO.';
  if (nivel === 'vermelho') return 'REDUZIR ap E ae. VERIFICAR PARÂMETROS CRÍTICOS.';
  if (nivel === 'amarelo') return 'REDUZIR AVANÇO POR DENTE (fz). MONITORAR VIBRAÇÃO.';
  return '';
}

export interface LcdAlertLine {
  text: string;
  color: string;
  icon: string;
}

/**
 * Alert line shown on the LCD console.
 * `safeText` differs between desktop (long form) and mobile (compact).
 */
export function getLcdAlertLine(
  nivel: NivelSeguranca,
  avisos: string[],
  safeText: string,
): LcdAlertLine {
  if (nivel === 'bloqueado') return { text: 'L/D > 6 — OPERAÇÃO BLOQUEADA', color: SEMAPHORE_HEX.vermelho, icon: 'block' };
  if (nivel === 'vermelho') return { text: avisos[0] ?? 'PARÂMETROS CRÍTICOS DETECTADOS', color: SEMAPHORE_HEX.vermelho, icon: 'emergency_home' };
  if (nivel === 'amarelo') return { text: avisos[0] ?? 'ATENÇÃO: RISCO DE VIBRAÇÃO', color: SEMAPHORE_HEX.amarelo, icon: 'warning' };
  return { text: safeText, color: SEMAPHORE_HEX.verde, icon: 'check_circle' };
}
