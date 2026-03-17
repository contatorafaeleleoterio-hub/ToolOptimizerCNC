/**
 * TaskCard — displays a single AdminTask with actions
 */

import type { AdminTask } from '../types/admin-types';
import { StatusBadge } from './status-badge';
import { formatRelativeDate } from '../utils/format-admin';

interface Props {
  task: AdminTask;
  onEdit: (task: AdminTask) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: AdminTask['status']) => void;
}

const STATUS_NEXT: Record<AdminTask['status'], AdminTask['status'] | null> = {
  aberta: 'em_progresso',
  em_progresso: 'concluida',
  concluida: null,
  cancelada: null,
};

const STATUS_NEXT_LABEL: Record<AdminTask['status'], string> = {
  aberta: 'Iniciar',
  em_progresso: 'Concluir',
  concluida: '',
  cancelada: '',
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: Props) {
  const nextStatus = STATUS_NEXT[task.status];

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/7 transition-colors">
      {/* Top row: badges + actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge variant={task.status} />
          <StatusBadge variant={task.priority} />
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {nextStatus && (
            <button
              onClick={() => onStatusChange(task.id, nextStatus)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
              title={STATUS_NEXT_LABEL[task.status]}
            >
              <span className="material-symbols-outlined text-sm">
                {nextStatus === 'em_progresso' ? 'play_arrow' : 'check_circle'}
              </span>
              {STATUS_NEXT_LABEL[task.status]}
            </button>
          )}
          <button
            onClick={() => onEdit(task)}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Editar tarefa"
          >
            <span className="material-symbols-outlined text-base">edit</span>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            aria-label="Remover tarefa"
          >
            <span className="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </div>

      {/* Title + description */}
      <div>
        <p className="text-sm font-semibold text-white leading-snug">{task.title}</p>
        {task.description && (
          <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">{task.description}</p>
        )}
      </div>

      {/* Tags + date */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1 flex-wrap">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded bg-white/8 text-gray-400 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[11px] text-gray-600 shrink-0" title={task.createdAt}>
          {formatRelativeDate(task.updatedAt)}
        </span>
      </div>
    </div>
  );
}
