import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useAdminStore } from '@/admin/store/admin-store';
import type { BugReport } from '@/admin/types/admin-types';

// ── Helpers ────────────────────────────────────────────────────────────────

function clearBugs() {
  const s = useAdminStore.getState();
  s.bugs.forEach((b) => s.removeBugReport(b.id));
}

function makeBug(overrides: Partial<Omit<BugReport, 'id' | 'createdAt'>> = {}): Omit<BugReport, 'id' | 'createdAt' | 'status'> {
  return {
    description: 'Slider não responde no Edge',
    severity: 'media',
    version: '0.6.0',
    ...overrides,
  };
}

// ── BugReportCard ──────────────────────────────────────────────────────────

describe('BugReportCard', () => {
  it('renders description, version, badges', async () => {
    const { BugReportCard } = await import('@/admin/components/bug-report-card');
    const bug: BugReport = {
      id: '1',
      description: 'RPM calculou errado',
      severity: 'alta',
      status: 'novo',
      version: '0.6.0',
      createdAt: new Date().toISOString(),
    };
    render(<BugReportCard bug={bug} onStatusChange={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('RPM calculou errado')).toBeInTheDocument();
    expect(screen.getByText('Novo')).toBeInTheDocument();
    expect(screen.getByText('Alta')).toBeInTheDocument();
    expect(screen.getByText(/v0\.6\.0/)).toBeInTheDocument();
  });

  it('shows "(sem descrição)" when description is empty', async () => {
    const { BugReportCard } = await import('@/admin/components/bug-report-card');
    const bug: BugReport = {
      id: '2',
      description: '',
      severity: 'baixa',
      status: 'lido',
      version: '0.6.0',
      createdAt: new Date().toISOString(),
    };
    render(<BugReportCard bug={bug} onStatusChange={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('(sem descrição)')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const { BugReportCard } = await import('@/admin/components/bug-report-card');
    const onDelete = vi.fn();
    const bug: BugReport = {
      id: 'del-1',
      description: 'Delete me',
      severity: 'baixa',
      status: 'novo',
      version: '0.6.0',
      createdAt: new Date().toISOString(),
    };
    render(<BugReportCard bug={bug} onStatusChange={() => {}} onDelete={onDelete} />);
    fireEvent.click(screen.getByLabelText('Remover bug report'));
    expect(onDelete).toHaveBeenCalledWith('del-1');
  });

  it('shows "Marcar como Lido" button for novo bugs and triggers onStatusChange', async () => {
    const { BugReportCard } = await import('@/admin/components/bug-report-card');
    const onStatusChange = vi.fn();
    const bug: BugReport = {
      id: 'sc-1',
      description: 'Novo bug',
      severity: 'media',
      status: 'novo',
      version: '0.6.0',
      createdAt: new Date().toISOString(),
    };
    render(<BugReportCard bug={bug} onStatusChange={onStatusChange} onDelete={() => {}} />);
    fireEvent.click(screen.getByTitle('Marcar como Lido'));
    expect(onStatusChange).toHaveBeenCalledWith('sc-1', 'lido');
  });

  it('shows "Resolver" button for lido bugs', async () => {
    const { BugReportCard } = await import('@/admin/components/bug-report-card');
    const onStatusChange = vi.fn();
    const bug: BugReport = {
      id: 'sc-2',
      description: 'Lido bug',
      severity: 'media',
      status: 'lido',
      version: '0.6.0',
      createdAt: new Date().toISOString(),
    };
    render(<BugReportCard bug={bug} onStatusChange={onStatusChange} onDelete={() => {}} />);
    fireEvent.click(screen.getByTitle('Resolver'));
    expect(onStatusChange).toHaveBeenCalledWith('sc-2', 'resolvido');
  });

  it('hides next-status and ignore buttons for resolvido bugs', async () => {
    const { BugReportCard } = await import('@/admin/components/bug-report-card');
    const bug: BugReport = {
      id: 'sc-3',
      description: 'Resolvido',
      severity: 'baixa',
      status: 'resolvido',
      version: '0.6.0',
      createdAt: new Date().toISOString(),
    };
    render(<BugReportCard bug={bug} onStatusChange={() => {}} onDelete={() => {}} />);
    expect(screen.queryByTitle('Marcar como Lido')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Resolver')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Ignorar bug')).not.toBeInTheDocument();
  });

  it('calls onStatusChange with "ignorado" when ignore button clicked', async () => {
    const { BugReportCard } = await import('@/admin/components/bug-report-card');
    const onStatusChange = vi.fn();
    const bug: BugReport = {
      id: 'ign-1',
      description: 'Ignorar este',
      severity: 'baixa',
      status: 'novo',
      version: '0.6.0',
      createdAt: new Date().toISOString(),
    };
    render(<BugReportCard bug={bug} onStatusChange={onStatusChange} onDelete={() => {}} />);
    fireEvent.click(screen.getByLabelText('Ignorar bug'));
    expect(onStatusChange).toHaveBeenCalledWith('ign-1', 'ignorado');
  });

  it('toggles app state visibility when button clicked', async () => {
    const { BugReportCard } = await import('@/admin/components/bug-report-card');
    const bug: BugReport = {
      id: 'app-1',
      description: 'Com estado',
      severity: 'media',
      status: 'novo',
      appState: 'RPM: 3000\nFeed: 1200',
      version: '0.6.0',
      createdAt: new Date().toISOString(),
    };
    render(<BugReportCard bug={bug} onStatusChange={() => {}} onDelete={() => {}} />);

    // App state should not be visible initially
    expect(screen.queryByText('RPM: 3000')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByLabelText('Ver estado da aplicação'));
    expect(screen.getByText(/RPM: 3000/)).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByLabelText('Ocultar estado da aplicação'));
    expect(screen.queryByText('RPM: 3000')).not.toBeInTheDocument();
  });

  it('does not render app state toggle when appState is absent', async () => {
    const { BugReportCard } = await import('@/admin/components/bug-report-card');
    const bug: BugReport = {
      id: 'app-2',
      description: 'Sem estado',
      severity: 'baixa',
      status: 'lido',
      version: '0.6.0',
      createdAt: new Date().toISOString(),
    };
    render(<BugReportCard bug={bug} onStatusChange={() => {}} onDelete={() => {}} />);
    expect(screen.queryByText('Estado da aplicação')).not.toBeInTheDocument();
  });
});

// ── AdminInboxPage ─────────────────────────────────────────────────────────

describe('AdminInboxPage', () => {
  beforeEach(() => clearBugs());

  async function renderPage() {
    const { default: AdminInboxPage } = await import('@/admin/pages/admin-inbox-page');
    return render(
      <MemoryRouter>
        <AdminInboxPage />
      </MemoryRouter>
    );
  }

  it('renders page title and empty state', async () => {
    await renderPage();
    expect(screen.getByText('Inbox de Bugs')).toBeInTheDocument();
    expect(screen.getByText('Nenhum bug report recebido ainda.')).toBeInTheDocument();
  });

  it('shows badge with count of novo bugs when > 0', async () => {
    useAdminStore.getState().addBugReport(makeBug({ status: undefined }));
    await renderPage();
    // The badge is a <span> inside the <h1> — find the heading then check for the count within it
    const heading = screen.getByRole('heading', { name: /inbox de bugs/i });
    expect(heading.textContent).toContain('1');
  });

  it('renders bug cards when bugs exist', async () => {
    useAdminStore.getState().addBugReport(makeBug({ description: 'Bug do slider' }));
    await renderPage();
    expect(screen.getByText('Bug do slider')).toBeInTheDocument();
  });

  it('filters bugs by status tab', async () => {
    useAdminStore.getState().addBugReport(makeBug({ description: 'Bug Novo' }));
    useAdminStore.getState().addBugReport(makeBug({ description: 'Bug Lido' }));
    // Mark second bug as lido
    const bugs = useAdminStore.getState().bugs;
    useAdminStore.getState().updateBugStatus(bugs[0].id, 'lido');

    await renderPage();

    // Both visible initially
    expect(screen.getByText('Bug Novo')).toBeInTheDocument();
    expect(screen.getByText('Bug Lido')).toBeInTheDocument();

    // Filter to Novos
    fireEvent.click(screen.getByText('Novos'));
    expect(screen.getByText('Bug Novo')).toBeInTheDocument();
    expect(screen.queryByText('Bug Lido')).not.toBeInTheDocument();
  });

  it('shows "Nenhum bug encontrado" when filters match nothing', async () => {
    useAdminStore.getState().addBugReport(makeBug({ description: 'Único bug' }));
    await renderPage();

    // Filter to Resolvidos (empty)
    fireEvent.click(screen.getByText('Resolvidos'));
    expect(screen.getByText('Nenhum bug encontrado com estes filtros.')).toBeInTheDocument();
  });

  it('shows and hides "Limpar filtros" button', async () => {
    await renderPage();

    // No active filter — button hidden
    expect(screen.queryByText('Limpar filtros')).not.toBeInTheDocument();

    // Activate filter
    fireEvent.click(screen.getByText('Novos'));
    expect(screen.getByText('Limpar filtros')).toBeInTheDocument();

    // Clear — button disappears
    fireEvent.click(screen.getByText('Limpar filtros'));
    expect(screen.queryByText('Limpar filtros')).not.toBeInTheDocument();
  });

  it('status tabs show correct counts', async () => {
    clearBugs();
    useAdminStore.getState().addBugReport(makeBug());
    useAdminStore.getState().addBugReport(makeBug());
    const bugs = useAdminStore.getState().bugs;
    useAdminStore.getState().updateBugStatus(bugs[0].id, 'resolvido');

    await renderPage();

    // "Todos" tab should show 2 — find it via its container button
    const todosBtn = screen.getByRole('button', { name: /Todos/ });
    expect(todosBtn).toHaveTextContent('2');

    const resolvidosBtn = screen.getByRole('button', { name: /Resolvidos/ });
    expect(resolvidosBtn).toHaveTextContent('1');
  });
});

// ── BugReportButton → saves to adminStore ─────────────────────────────────

describe('BugReportButton — saves to admin store on send', () => {
  beforeEach(() => {
    clearBugs();
    // Use fake timers so the mailto setTimeout never fires into a torn-down env
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('saves bug report to admin store when Enviar is clicked', async () => {
    const { BugReportButton } = await import('@/components/bug-report-button');

    render(
      <MemoryRouter>
        <BugReportButton />
      </MemoryRouter>
    );

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));

    // Type description
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Teste de integração' } });

    // Send
    fireEvent.click(screen.getByText('Enviar por E-mail'));

    // Admin store should have the bug
    const bugs = useAdminStore.getState().bugs;
    expect(bugs).toHaveLength(1);
    expect(bugs[0].description).toBe('Teste de integração');
    expect(bugs[0].severity).toBe('media');
    expect(bugs[0].status).toBe('novo');
    expect(bugs[0].version).toBe('0.6.0');
  });

  it('saves "(sem descrição)" when description is empty', async () => {
    const { BugReportButton } = await import('@/components/bug-report-button');

    render(
      <MemoryRouter>
        <BugReportButton />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /reportar bug/i }));
    fireEvent.click(screen.getByText('Enviar por E-mail'));

    const bugs = useAdminStore.getState().bugs;
    expect(bugs[0].description).toBe('(sem descrição)');
  });
});
