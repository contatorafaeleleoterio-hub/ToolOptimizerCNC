/**
 * AdminTasksPage — CRUD de tarefas/requisições com filtros e auto-sync
 * Auto-sync: salva tasks em docs/admin-requests.json via Vite plugin (dev-only)
 */

import { useState, useEffect, useCallback } from 'react';
import { useAdminStore } from '../store/admin-store';
import type { AdminTask, TaskStatus, TaskPriority } from '../types/admin-types';
import { TaskCard } from '../components/task-card';
import { AdminModal } from '../components/admin-modal';
import { StatusBadge } from '../components/status-badge';
import { parseTags, formatTagsInput } from '../utils/format-admin';

type SortOption = 'updated_desc' | 'created_desc' | 'priority_desc';

const PRIORITY_RANK: Record<TaskPriority, number> = {
  critica: 4,
  alta: 3,
  media: 2,
  baixa: 1,
};

// ── Auto-sync ────────────────────────────────────────────────────────────────

async function syncTasksToFile(tasks: AdminTask[]): Promise<void> {
  try {
    await fetch('/api/admin-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // No volatile timestamp — the plugin compares content before writing,
      // so omitting updatedAt here avoids unnecessary file changes.
      body: JSON.stringify({ tasks }),
    });
  } catch {
    // Silently ignore — sync is dev-only, failures must not break the UI
  }
}

// ── Form state ───────────────────────────────────────────────────────────────

interface TaskForm {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  tagsInput: string;
}

const EMPTY_FORM: TaskForm = {
  title: '',
  description: '',
  status: 'aberta',
  priority: 'media',
  tagsInput: '',
};

function formFromTask(task: AdminTask): TaskForm {
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    tagsInput: formatTagsInput(task.tags),
  };
}

// ── Filter tabs ───────────────────────────────────────────────────────────────

const STATUS_FILTERS: { value: TaskStatus | 'todas'; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'aberta', label: 'Abertas' },
  { value: 'em_progresso', label: 'Em Progresso' },
  { value: 'concluida', label: 'Concluídas' },
  { value: 'cancelada', label: 'Canceladas' },
];

const PRIORITY_OPTIONS: { value: TaskPriority | 'todas'; label: string }[] = [
  { value: 'todas', label: 'Qualquer prioridade' },
  { value: 'critica', label: 'Crítica' },
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdminTasksPage() {
  const { tasks, addTask, updateTask, removeTask } = useAdminStore();

  // Filters
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'todas'>('todas');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'todas'>('todas');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('updated_desc');

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<AdminTask | null>(null);
  const [form, setForm] = useState<TaskForm>(EMPTY_FORM);
  const [formError, setFormError] = useState('');

  // Auto-sync to file (dev-only)
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    syncTasksToFile(tasks);
  }, [tasks]);

  // Filtered + sorted tasks
  const filtered = tasks
    .filter((t) => statusFilter === 'todas' || t.status === statusFilter)
    .filter((t) => priorityFilter === 'todas' || t.priority === priorityFilter)
    .filter((t) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortBy === 'priority_desc') {
        const byPriority = PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority];
        if (byPriority !== 0) return byPriority;
      }
      if (sortBy === 'created_desc') {
        return b.createdAt.localeCompare(a.createdAt);
      }
      return b.updatedAt.localeCompare(a.updatedAt);
    });

  // Open modal for new task
  const openNew = useCallback(() => {
    setEditingTask(null);
    setForm(EMPTY_FORM);
    setFormError('');
    setModalOpen(true);
  }, []);

  // Open modal for editing
  const openEdit = useCallback((task: AdminTask) => {
    setEditingTask(task);
    setForm(formFromTask(task));
    setFormError('');
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingTask(null);
    setFormError('');
  }, []);

  // Save (create or update)
  const handleSave = () => {
    if (!form.title.trim()) {
      setFormError('Título é obrigatório.');
      return;
    }
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      tags: parseTags(form.tagsInput),
    };
    if (editingTask) {
      updateTask(editingTask.id, payload);
    } else {
      addTask(payload);
    }
    closeModal();
  };

  // Status change from card
  const handleStatusChange = (id: string, status: TaskStatus) => {
    const updates: Partial<AdminTask> = { status };
    if (status === 'concluida') updates.completedAt = new Date().toISOString();
    updateTask(id, updates);
  };

  // Counts per status for tabs
  const countByStatus = (s: TaskStatus | 'todas') =>
    s === 'todas' ? tasks.length : tasks.filter((t) => t.status === s).length;

  const hasActiveFilters = statusFilter !== 'todas' || priorityFilter !== 'todas' || Boolean(search.trim());

  const concludeFiltered = useCallback(() => {
    const nowIso = new Date().toISOString();
    filtered.forEach((task) => {
      if (task.status === 'concluida' || task.status === 'cancelada') return;
      updateTask(task.id, { status: 'concluida', completedAt: nowIso });
    });
  }, [filtered, updateTask]);

  const cancelFiltered = useCallback(() => {
    filtered.forEach((task) => {
      if (task.status === 'concluida' || task.status === 'cancelada') return;
      updateTask(task.id, { status: 'cancelada' });
    });
  }, [filtered, updateTask]);

  const reopenFiltered = useCallback(() => {
    filtered.forEach((task) => {
      if (task.status !== 'concluida' && task.status !== 'cancelada') return;
      updateTask(task.id, { status: 'aberta', completedAt: undefined });
    });
  }, [filtered, updateTask]);

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Tarefas</h1>
          <p className="text-sm text-gray-500 mt-0.5">Requisições e atividades do projeto</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-sm font-semibold hover:bg-cyan-500/25 transition-colors"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Nova Requisição
        </button>
      </div>

      {/* Status filter tabs */}
      <div className="flex items-center gap-1 flex-wrap">
        {STATUS_FILTERS.map(({ value, label }) => {
          const count = countByStatus(value);
          const active = statusFilter === value;
          return (
            <button
              key={value}
              onClick={() => setStatusFilter(value)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
                ${active
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/8 hover:bg-white/8 hover:text-gray-300'
                }
              `}
            >
              {label}
              <span className={`
                inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold
                ${active ? 'bg-cyan-500/30 text-cyan-200' : 'bg-white/10 text-gray-500'}
              `}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary filters: priority + search */}
      <div className="flex items-center gap-3 flex-wrap">
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | 'todas')}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-cyan-500/40"
        >
          {PRIORITY_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value} className="bg-[#0F1419]">{label}</option>
          ))}
        </select>

        <div className="relative flex-1 min-w-48">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base text-gray-600 pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar por título ou descrição..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-cyan-500/40"
          />
        </div>

        <select
          aria-label="Ordenar tarefas"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-cyan-500/40"
        >
          <option value="updated_desc" className="bg-[#0F1419]">Mais recentes (atualização)</option>
          <option value="created_desc" className="bg-[#0F1419]">Mais recentes (criação)</option>
          <option value="priority_desc" className="bg-[#0F1419]">Maior prioridade primeiro</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={() => { setStatusFilter('todas'); setPriorityFilter('todas'); setSearch(''); }}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {filtered.length > 0 && (
        <div className="flex items-center justify-between gap-3 flex-wrap rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2">
          <p className="text-xs text-gray-400">
            Exibindo {filtered.length} de {tasks.length} tarefas.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={concludeFiltered}
              className="text-xs px-2.5 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition-colors"
            >
              Concluir filtradas
            </button>
            <button
              onClick={cancelFiltered}
              className="text-xs px-2.5 py-1 rounded-md border border-rose-500/30 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 transition-colors"
            >
              Cancelar filtradas
            </button>
            <button
              onClick={reopenFiltered}
              className="text-xs px-2.5 py-1 rounded-md border border-white/15 bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
            >
              Reabrir filtradas
            </button>
          </div>
        </div>
      )}

      {/* Task list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <span className="material-symbols-outlined text-4xl text-gray-700">task_alt</span>
          <p className="text-gray-500 text-sm font-medium">
            {tasks.length === 0 ? 'Nenhuma tarefa criada ainda.' : 'Nenhuma tarefa encontrada.'}
          </p>
          {tasks.length === 0 && (
            <button
              onClick={openNew}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Criar primeira tarefa →
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEdit}
              onDelete={removeTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* Create / Edit modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingTask ? 'Editar Tarefa' : 'Nova Requisição'}
      >
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Título <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Ex: Implementar validação de ranges"
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40"
              autoFocus
            />
            {formError && <p className="text-xs text-red-400">{formError}</p>}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Descrição</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Contexto, referências, critérios de aceitação..."
              rows={3}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 resize-none"
            />
          </div>

          {/* Status + Priority row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as TaskStatus }))}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/40"
              >
                <option value="aberta" className="bg-[#0F1419]">Aberta</option>
                <option value="em_progresso" className="bg-[#0F1419]">Em Progresso</option>
                <option value="concluida" className="bg-[#0F1419]">Concluída</option>
                <option value="cancelada" className="bg-[#0F1419]">Cancelada</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Prioridade</label>
              <select
                value={form.priority}
                onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as TaskPriority }))}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/40"
              >
                <option value="baixa" className="bg-[#0F1419]">Baixa</option>
                <option value="media" className="bg-[#0F1419]">Média</option>
                <option value="alta" className="bg-[#0F1419]">Alta</option>
                <option value="critica" className="bg-[#0F1419]">Crítica</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Tags <span className="text-gray-600 font-normal normal-case">(separadas por vírgula)</span>
            </label>
            <input
              type="text"
              value={form.tagsInput}
              onChange={(e) => setForm((f) => ({ ...f, tagsInput: e.target.value }))}
              placeholder="Ex: admin, fase2, bug"
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40"
            />
          </div>

          {/* Preview current badge state */}
          <div className="flex items-center gap-2 pt-1">
            <StatusBadge variant={form.status} size="md" />
            <StatusBadge variant={form.priority} size="md" />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/8">
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/8 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
            >
              {editingTask ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
