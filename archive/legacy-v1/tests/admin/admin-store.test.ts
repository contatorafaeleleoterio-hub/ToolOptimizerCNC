import { describe, it, expect, beforeEach } from 'vitest';
import { useAdminStore } from '@/admin/store/admin-store';

describe('AdminStore — Tasks', () => {
  beforeEach(() => {
    const s = useAdminStore.getState();
    // Clear state between tests
    s.tasks.forEach((t) => s.removeTask(t.id));
    s.bugs.forEach((b) => s.removeBugReport(b.id));
    useAdminStore.getState().clearErrors();
  });

  it('starts with empty tasks', () => {
    expect(useAdminStore.getState().tasks).toHaveLength(0);
  });

  it('adds a task with generated id and timestamps', () => {
    useAdminStore.getState().addTask({
      title: 'Implementar Fase 2',
      description: 'Tarefas + Auto-Sync',
      status: 'aberta',
      priority: 'alta',
      tags: ['admin'],
    });
    const { tasks } = useAdminStore.getState();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].id).toBeTruthy();
    expect(tasks[0].createdAt).toBeTruthy();
    expect(tasks[0].updatedAt).toBeTruthy();
    expect(tasks[0].title).toBe('Implementar Fase 2');
  });

  it('updates a task status', () => {
    useAdminStore.getState().addTask({
      title: 'Task A',
      description: '',
      status: 'aberta',
      priority: 'media',
      tags: [],
    });
    const id = useAdminStore.getState().tasks[0].id;
    useAdminStore.getState().updateTask(id, { status: 'concluida' });
    expect(useAdminStore.getState().tasks[0].status).toBe('concluida');
  });

  it('removes a task', () => {
    useAdminStore.getState().addTask({
      title: 'Task B',
      description: '',
      status: 'aberta',
      priority: 'baixa',
      tags: [],
    });
    const id = useAdminStore.getState().tasks[0].id;
    useAdminStore.getState().removeTask(id);
    expect(useAdminStore.getState().tasks).toHaveLength(0);
  });

  it('getOpenTaskCount counts aberta + em_progresso', () => {
    useAdminStore.getState().addTask({ title: 'A', description: '', status: 'aberta',      priority: 'media', tags: [] });
    useAdminStore.getState().addTask({ title: 'B', description: '', status: 'em_progresso', priority: 'media', tags: [] });
    useAdminStore.getState().addTask({ title: 'C', description: '', status: 'concluida',    priority: 'media', tags: [] });
    expect(useAdminStore.getState().getOpenTaskCount()).toBe(2);
  });
});

describe('AdminStore — Bug Reports', () => {
  beforeEach(() => {
    const s = useAdminStore.getState();
    s.bugs.forEach((b) => s.removeBugReport(b.id));
  });

  it('adds a bug report with status novo', () => {
    useAdminStore.getState().addBugReport({
      description: 'Slider não responde no Edge',
      severity: 'media',
      version: '0.6.0',
    });
    const { bugs } = useAdminStore.getState();
    expect(bugs).toHaveLength(1);
    expect(bugs[0].status).toBe('novo');
    expect(bugs[0].id).toBeTruthy();
  });

  it('updates bug status', () => {
    useAdminStore.getState().addBugReport({ description: 'Bug X', severity: 'baixa', version: '0.6.0' });
    const id = useAdminStore.getState().bugs[0].id;
    useAdminStore.getState().updateBugStatus(id, 'resolvido');
    expect(useAdminStore.getState().bugs[0].status).toBe('resolvido');
    expect(useAdminStore.getState().bugs[0].resolvedAt).toBeTruthy();
  });

  it('getNewBugCount counts only novo status', () => {
    useAdminStore.getState().addBugReport({ description: 'Bug A', severity: 'media', version: '0.6.0' });
    useAdminStore.getState().addBugReport({ description: 'Bug B', severity: 'alta',  version: '0.6.0' });
    const idB = useAdminStore.getState().bugs[0].id;
    useAdminStore.getState().updateBugStatus(idB, 'lido');
    expect(useAdminStore.getState().getNewBugCount()).toBe(1);
  });
});

describe('AdminStore — Errors', () => {
  beforeEach(() => {
    useAdminStore.getState().clearErrors();
  });

  it('adds an error entry', () => {
    useAdminStore.getState().addError({
      message: 'TypeError: Cannot read properties of undefined',
      severity: 'error',
    });
    expect(useAdminStore.getState().errors).toHaveLength(1);
    expect(useAdminStore.getState().errors[0].count).toBe(1);
  });

  it('deduplicates errors by message + source', () => {
    const err = { message: 'SyntaxError', source: 'main.tsx', severity: 'error' as const };
    useAdminStore.getState().addError(err);
    useAdminStore.getState().addError(err);
    const { errors } = useAdminStore.getState();
    expect(errors).toHaveLength(1);
    expect(errors[0].count).toBe(2);
  });

  it('clears all errors', () => {
    useAdminStore.getState().addError({ message: 'Err A', severity: 'warning' });
    useAdminStore.getState().clearErrors();
    expect(useAdminStore.getState().errors).toHaveLength(0);
  });
});

describe('AdminStore — Feature Flags', () => {
  it('has default admin_dashboard flag enabled', () => {
    const flag = useAdminStore.getState().flags.find((f) => f.id === 'admin_dashboard');
    expect(flag).toBeDefined();
    expect(flag?.enabled).toBe(true);
  });

  it('toggles a flag', () => {
    useAdminStore.getState().setFlag('admin_dashboard', false);
    const flag = useAdminStore.getState().flags.find((f) => f.id === 'admin_dashboard');
    expect(flag?.enabled).toBe(false);
    // restore
    useAdminStore.getState().setFlag('admin_dashboard', true);
  });
});
