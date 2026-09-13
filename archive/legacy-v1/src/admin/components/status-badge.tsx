/**
 * StatusBadge — reusable badge for task/bug/error status and severity
 */

import type { TaskStatus, TaskPriority, BugSeverity, BugStatus, ErrorSeverity } from '../types/admin-types';

type BadgeVariant = TaskStatus | TaskPriority | BugSeverity | BugStatus | ErrorSeverity;

interface Props {
  variant: BadgeVariant;
  size?: 'sm' | 'md';
}

const BADGE_STYLES: Record<string, string> = {
  // Task status
  aberta: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
  em_progresso: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  concluida: 'bg-green-500/15 text-green-300 border border-green-500/30',
  cancelada: 'bg-gray-500/15 text-gray-400 border border-gray-500/30',

  // Priority / severity (shared between tasks and bugs)
  baixa: 'bg-gray-500/15 text-gray-400 border border-gray-500/30',
  media: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30',
  alta: 'bg-orange-500/15 text-orange-300 border border-orange-500/30',
  critica: 'bg-red-500/15 text-red-300 border border-red-500/30',

  // Bug status
  novo: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
  lido: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  resolvido: 'bg-green-500/15 text-green-300 border border-green-500/30',
  ignorado: 'bg-gray-500/15 text-gray-400 border border-gray-500/30',

  // Error severity
  warning: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30',
  error: 'bg-orange-500/15 text-orange-300 border border-orange-500/30',
  fatal: 'bg-red-500/15 text-red-300 border border-red-500/30',
};

const BADGE_LABELS: Record<string, string> = {
  aberta: 'Aberta',
  em_progresso: 'Em Progresso',
  concluida: 'Concluída',
  cancelada: 'Cancelada',
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
  critica: 'Crítica',
  novo: 'Novo',
  lido: 'Lido',
  resolvido: 'Resolvido',
  ignorado: 'Ignorado',
  warning: 'Warning',
  error: 'Error',
  fatal: 'Fatal',
};

export function StatusBadge({ variant, size = 'sm' }: Props) {
  const styles = BADGE_STYLES[variant] ?? 'bg-gray-500/15 text-gray-400 border border-gray-500/30';
  const label = BADGE_LABELS[variant] ?? variant;
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center rounded-full font-semibold uppercase tracking-wide ${sizeClass} ${styles}`}>
      {label}
    </span>
  );
}
