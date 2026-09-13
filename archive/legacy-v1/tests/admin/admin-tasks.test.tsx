import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useAdminStore } from '@/admin/store/admin-store';

// Suppress fetch calls to /api/admin-sync in tests
vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));

function clearTasks() {
  const s = useAdminStore.getState();
  s.tasks.forEach((t) => s.removeTask(t.id));
}

// ── format-admin utils ─────────────────────────────────────────────────────

describe('format-admin — formatRelativeDate', () => {
  it('returns "agora mesmo" for dates < 1 min ago', async () => {
    const { formatRelativeDate } = await import('@/admin/utils/format-admin');
    const now = new Date().toISOString();
    expect(formatRelativeDate(now)).toBe('agora mesmo');
  });

  it('returns Xm atrás for minutes ago', async () => {
    const { formatRelativeDate } = await import('@/admin/utils/format-admin');
    const fiveMinAgo = new Date(Date.now() - 5 * 60_000).toISOString();
    expect(formatRelativeDate(fiveMinAgo)).toBe('5m atrás');
  });

  it('returns Xh atrás for hours ago', async () => {
    const { formatRelativeDate } = await import('@/admin/utils/format-admin');
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60_000).toISOString();
    expect(formatRelativeDate(twoHoursAgo)).toBe('2h atrás');
  });

  it('returns Xd atrás for days ago', async () => {
    const { formatRelativeDate } = await import('@/admin/utils/format-admin');
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60_000).toISOString();
    expect(formatRelativeDate(threeDaysAgo)).toBe('3d atrás');
  });
});

describe('format-admin — parseTags', () => {
  it('splits comma-separated tags and trims whitespace', async () => {
    const { parseTags } = await import('@/admin/utils/format-admin');
    expect(parseTags('admin , fase2, bug')).toEqual(['admin', 'fase2', 'bug']);
  });

  it('returns empty array for empty string', async () => {
    const { parseTags } = await import('@/admin/utils/format-admin');
    expect(parseTags('')).toEqual([]);
  });

  it('filters out blank entries', async () => {
    const { parseTags } = await import('@/admin/utils/format-admin');
    expect(parseTags('a,,b')).toEqual(['a', 'b']);
  });
});

// ── AdminModal ─────────────────────────────────────────────────────────────

describe('AdminModal', () => {
  it('renders title and children when open', async () => {
    const { AdminModal } = await import('@/admin/components/admin-modal');
    render(
      <AdminModal isOpen title="Meu Modal" onClose={() => {}}>
        <p>Conteúdo do modal</p>
      </AdminModal>
    );
    expect(screen.getByText('Meu Modal')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument();
  });

  it('does not render when closed', async () => {
    const { AdminModal } = await import('@/admin/components/admin-modal');
    render(
      <AdminModal isOpen={false} title="Oculto" onClose={() => {}}>
        <p>Não deve aparecer</p>
      </AdminModal>
    );
    expect(screen.queryByText('Oculto')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const { AdminModal } = await import('@/admin/components/admin-modal');
    const onClose = vi.fn();
    render(
      <AdminModal isOpen title="Fechar" onClose={onClose}>
        <p>body</p>
      </AdminModal>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', async () => {
    const { AdminModal } = await import('@/admin/components/admin-modal');
    const onClose = vi.fn();
    const { container } = render(
      <AdminModal isOpen title="Overlay" onClose={onClose}>
        <p>body</p>
      </AdminModal>
    );
    // The overlay is the second child of the portal div (first is the backdrop)
    const overlay = container.ownerDocument.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeTruthy();
    fireEvent.click(overlay!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

// ── TaskCard ───────────────────────────────────────────────────────────────

describe('TaskCard', () => {
  it('renders task title, description and badges', async () => {
    const { TaskCard } = await import('@/admin/components/task-card');
    const task = {
      id: '1',
      title: 'Implementar rota',
      description: 'Criar endpoint de sync',
      status: 'aberta' as const,
      priority: 'alta' as const,
      tags: ['backend'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    render(
      <TaskCard task={task} onEdit={() => {}} onDelete={() => {}} onStatusChange={() => {}} />
    );
    expect(screen.getByText('Implementar rota')).toBeInTheDocument();
    expect(screen.getByText('Criar endpoint de sync')).toBeInTheDocument();
    expect(screen.getByText('backend')).toBeInTheDocument();
    // StatusBadge renders "Aberta" and "Alta"
    expect(screen.getByText('Aberta')).toBeInTheDocument();
    expect(screen.getByText('Alta')).toBeInTheDocument();
  });

  it('calls onDelete with task id when delete button clicked', async () => {
    const { TaskCard } = await import('@/admin/components/task-card');
    const onDelete = vi.fn();
    const task = {
      id: 'abc',
      title: 'Deletar',
      description: '',
      status: 'aberta' as const,
      priority: 'baixa' as const,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    render(
      <TaskCard task={task} onEdit={() => {}} onDelete={onDelete} onStatusChange={() => {}} />
    );
    fireEvent.click(screen.getByLabelText('Remover tarefa'));
    expect(onDelete).toHaveBeenCalledWith('abc');
  });

  it('calls onEdit when edit button clicked', async () => {
    const { TaskCard } = await import('@/admin/components/task-card');
    const onEdit = vi.fn();
    const task = {
      id: 'xyz',
      title: 'Editar',
      description: '',
      status: 'aberta' as const,
      priority: 'media' as const,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    render(
      <TaskCard task={task} onEdit={onEdit} onDelete={() => {}} onStatusChange={() => {}} />
    );
    fireEvent.click(screen.getByLabelText('Editar tarefa'));
    expect(onEdit).toHaveBeenCalledWith(task);
  });

  it('shows Iniciar button for aberta tasks', async () => {
    const { TaskCard } = await import('@/admin/components/task-card');
    const task = {
      id: '2',
      title: 'Tarefa aberta',
      description: '',
      status: 'aberta' as const,
      priority: 'media' as const,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    render(
      <TaskCard task={task} onEdit={() => {}} onDelete={() => {}} onStatusChange={() => {}} />
    );
    expect(screen.getByTitle('Iniciar')).toBeInTheDocument();
  });

  it('hides next-status button for concluida tasks', async () => {
    const { TaskCard } = await import('@/admin/components/task-card');
    const task = {
      id: '3',
      title: 'Concluída',
      description: '',
      status: 'concluida' as const,
      priority: 'media' as const,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    render(
      <TaskCard task={task} onEdit={() => {}} onDelete={() => {}} onStatusChange={() => {}} />
    );
    expect(screen.queryByTitle('Iniciar')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Concluir')).not.toBeInTheDocument();
  });
});

// ── AdminTasksPage ─────────────────────────────────────────────────────────

describe('AdminTasksPage', () => {
  beforeEach(() => clearTasks());

  async function renderPage() {
    const { default: AdminTasksPage } = await import('@/admin/pages/admin-tasks-page');
    return render(
      <MemoryRouter>
        <AdminTasksPage />
      </MemoryRouter>
    );
  }

  it('renders page title and empty state', async () => {
    await renderPage();
    expect(screen.getByText('Tarefas')).toBeInTheDocument();
    expect(screen.getByText('Nenhuma tarefa criada ainda.')).toBeInTheDocument();
  });

  it('opens modal when "Nova Requisição" is clicked', async () => {
    await renderPage();
    fireEvent.click(screen.getByText('Nova Requisição'));
    expect(screen.getByText('Nova Requisição', { selector: 'h2' })).toBeInTheDocument();
  });

  it('creates a task via the modal form', async () => {
    clearTasks();
    await renderPage();

    // Open modal
    fireEvent.click(screen.getByText('Nova Requisição'));

    // Fill title
    const titleInput = screen.getByPlaceholderText('Ex: Implementar validação de ranges');
    fireEvent.change(titleInput, { target: { value: 'Minha nova tarefa' } });

    // Submit
    fireEvent.click(screen.getByText('Criar'));

    // Task should appear
    expect(screen.getByText('Minha nova tarefa')).toBeInTheDocument();
    expect(useAdminStore.getState().tasks).toHaveLength(1);
  });

  it('shows validation error when title is empty', async () => {
    await renderPage();
    fireEvent.click(screen.getByText('Nova Requisição'));
    fireEvent.click(screen.getByText('Criar'));
    expect(screen.getByText('Título é obrigatório.')).toBeInTheDocument();
  });

  it('filters tasks by status tab', async () => {
    clearTasks();
    useAdminStore.getState().addTask({ title: 'Aberta', description: '', status: 'aberta', priority: 'media', tags: [] });
    useAdminStore.getState().addTask({ title: 'Concluída', description: '', status: 'concluida', priority: 'media', tags: [] });

    await renderPage();

    // Both visible initially
    expect(screen.getByText('Aberta', { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText('Concluída', { selector: 'p' })).toBeInTheDocument();

    // Filter to concluidas
    fireEvent.click(screen.getByText('Concluídas'));
    expect(screen.queryByText('Aberta', { selector: 'p' })).not.toBeInTheDocument();
    expect(screen.getByText('Concluída', { selector: 'p' })).toBeInTheDocument();
  });

  it('filters tasks by search text', async () => {
    clearTasks();
    useAdminStore.getState().addTask({ title: 'Fix slider bug', description: '', status: 'aberta', priority: 'alta', tags: [] });
    useAdminStore.getState().addTask({ title: 'Add dark mode', description: '', status: 'aberta', priority: 'media', tags: [] });

    await renderPage();

    const searchInput = screen.getByPlaceholderText('Buscar por título ou descrição...');
    fireEvent.change(searchInput, { target: { value: 'slider' } });

    expect(screen.getByText('Fix slider bug')).toBeInTheDocument();
    expect(screen.queryByText('Add dark mode')).not.toBeInTheDocument();
  });

  it('applies bulk conclude action to filtered tasks', async () => {
    clearTasks();
    useAdminStore.getState().addTask({ title: 'Task A', description: '', status: 'aberta', priority: 'alta', tags: [] });
    useAdminStore.getState().addTask({ title: 'Task B', description: '', status: 'aberta', priority: 'media', tags: [] });

    await renderPage();
    fireEvent.change(screen.getByPlaceholderText(/Buscar por/i), { target: { value: 'Task A' } });
    fireEvent.click(screen.getByText('Concluir filtradas'));

    const state = useAdminStore.getState().tasks;
    const taskA = state.find((t) => t.title === 'Task A');
    const taskB = state.find((t) => t.title === 'Task B');
    expect(taskA?.status).toBe('concluida');
    expect(taskB?.status).toBe('aberta');
  });

  it('sorts tasks by priority when selected', async () => {
    clearTasks();
    useAdminStore.getState().addTask({ title: 'Baixa', description: '', status: 'aberta', priority: 'baixa', tags: [] });
    useAdminStore.getState().addTask({ title: 'Crítica', description: '', status: 'aberta', priority: 'critica', tags: [] });

    const view = await renderPage();
    fireEvent.change(screen.getByLabelText('Ordenar tarefas'), { target: { value: 'priority_desc' } });

    const titles = Array.from(view.container.querySelectorAll('p.text-sm.font-semibold.text-white.leading-snug'));
    expect(titles[0]?.textContent).toContain('Crítica');
  });
});
