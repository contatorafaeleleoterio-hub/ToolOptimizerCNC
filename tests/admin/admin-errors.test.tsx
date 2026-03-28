import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useAdminStore } from '@/admin/store/admin-store';
import { installErrorTracker, _resetErrorTrackerGuard } from '@/admin/hooks/use-error-tracker';

// JSDOM does not define PromiseRejectionEvent — polyfill for tests
class PromiseRejectionEvent extends Event {
  reason: unknown;
  promise: Promise<unknown>;
  constructor(type: string, init: { promise: Promise<unknown>; reason: unknown }) {
    super(type, { cancelable: true, bubbles: false });
    this.promise = init.promise;
    this.reason = init.reason;
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function clearErrors() {
  useAdminStore.getState().clearErrors();
}

// ── use-error-tracker ──────────────────────────────────────────────────────

describe('installErrorTracker', () => {
  let cleanup: () => void;

  beforeEach(() => {
    clearErrors();
    _resetErrorTrackerGuard();
    cleanup = installErrorTracker();
  });

  afterEach(() => {
    cleanup();
    clearErrors();
  });

  it('captures window.onerror and adds to store', () => {
    const err = new ErrorEvent('error', {
      message: 'ReferenceError: foo is not defined',
      filename: 'app.js',
      lineno: 10,
      colno: 5,
      error: new Error('foo is not defined'),
    });
    window.dispatchEvent(err);

    const errors = useAdminStore.getState().errors;
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe('ReferenceError: foo is not defined');
    expect(errors[0].severity).toBe('error');
    expect(errors[0].source).toContain('app.js');
    expect(errors[0].count).toBe(1);
  });

  it('deduplicates repeated errors (increments count)', () => {
    const dispatchErr = () =>
      window.dispatchEvent(
        new ErrorEvent('error', {
          message: 'TypeError: cannot read property x',
          filename: 'bundle.js',
          lineno: 1,
          colno: 1,
          error: new Error('cannot read property x'),
        })
      );

    dispatchErr();
    dispatchErr();
    dispatchErr();

    const errors = useAdminStore.getState().errors;
    expect(errors).toHaveLength(1);
    expect(errors[0].count).toBe(3);
  });

  it('captures unhandledrejection and marks as fatal', () => {
    const reason = new Error('Promise blew up');
    const evt = new PromiseRejectionEvent('unhandledrejection', {
      promise: Promise.resolve(),
      reason,
    });
    window.dispatchEvent(evt);

    const errors = useAdminStore.getState().errors;
    expect(errors.length).toBeGreaterThanOrEqual(1);
    const found = errors.find((e) => e.message === 'Promise blew up');
    expect(found).toBeDefined();
    expect(found?.severity).toBe('fatal');
  });

  it('captures string rejection reason', () => {
    const evt = new PromiseRejectionEvent('unhandledrejection', {
      promise: Promise.resolve(),
      reason: 'network timeout',
    });
    window.dispatchEvent(evt);

    const errors = useAdminStore.getState().errors;
    const found = errors.find((e) => e.message === 'network timeout');
    expect(found).toBeDefined();
  });

  it('does not install twice (idempotent)', () => {
    // Already installed in beforeEach — calling again should be a no-op
    const cleanup2 = installErrorTracker();
    cleanup2(); // should not unregister the first handler

    const err = new ErrorEvent('error', {
      message: 'Only captured once',
      filename: 'x.js',
      lineno: 1,
      colno: 1,
      error: new Error('Only captured once'),
    });
    window.dispatchEvent(err);

    const errors = useAdminStore.getState().errors;
    expect(errors.filter((e) => e.message === 'Only captured once')).toHaveLength(1);
  });

  it('cleanup removes the handler', () => {
    cleanup(); // remove handler
    clearErrors();

    // Do NOT include 'error' property — jsdom rethrows it as unhandled
    const err = new ErrorEvent('error', {
      message: 'Should not be captured',
      filename: 'y.js',
      lineno: 1,
      colno: 1,
    });
    window.dispatchEvent(err);

    expect(useAdminStore.getState().errors).toHaveLength(0);

    // Re-install for afterEach cleanup
    _resetErrorTrackerGuard();
    cleanup = installErrorTracker();
  });
});

// ── ErrorEntry component ───────────────────────────────────────────────────

describe('ErrorEntry', () => {
  it('renders message, severity badge, source and delete button', async () => {
    const { ErrorEntry } = await import('@/admin/components/error-entry');
    const entry = {
      id: '1',
      message: 'Cannot read properties of null',
      source: 'app.js:10:5',
      severity: 'error' as const,
      count: 1,
      firstSeenAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
    };
    render(<ErrorEntry entry={entry} onDelete={() => {}} />);
    expect(screen.getByText('Cannot read properties of null')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('app.js:10:5')).toBeInTheDocument();
    expect(screen.getByLabelText('Remover erro')).toBeInTheDocument();
  });

  it('shows count badge when count > 1', async () => {
    const { ErrorEntry } = await import('@/admin/components/error-entry');
    const entry = {
      id: '2',
      message: 'Repeated error',
      severity: 'warning' as const,
      count: 5,
      firstSeenAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
    };
    render(<ErrorEntry entry={entry} onDelete={() => {}} />);
    expect(screen.getByText('5×')).toBeInTheDocument();
  });

  it('does not show count badge when count = 1', async () => {
    const { ErrorEntry } = await import('@/admin/components/error-entry');
    const entry = {
      id: '3',
      message: 'Single error',
      severity: 'fatal' as const,
      count: 1,
      firstSeenAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
    };
    render(<ErrorEntry entry={entry} onDelete={() => {}} />);
    expect(screen.queryByText('1×')).not.toBeInTheDocument();
  });

  it('calls onDelete with id when delete button clicked', async () => {
    const { ErrorEntry } = await import('@/admin/components/error-entry');
    const onDelete = vi.fn();
    const entry = {
      id: 'del-1',
      message: 'Delete this',
      severity: 'error' as const,
      count: 1,
      firstSeenAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
    };
    render(<ErrorEntry entry={entry} onDelete={onDelete} />);
    fireEvent.click(screen.getByLabelText('Remover erro'));
    expect(onDelete).toHaveBeenCalledWith('del-1');
  });

  it('toggles stack trace visibility', async () => {
    const { ErrorEntry } = await import('@/admin/components/error-entry');
    const entry = {
      id: '4',
      message: 'With stack',
      stack: 'Error: boom\n  at foo (app.js:5:10)',
      severity: 'fatal' as const,
      count: 1,
      firstSeenAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
    };
    render(<ErrorEntry entry={entry} onDelete={() => {}} />);

    // Stack hidden initially
    expect(screen.queryByText(/at foo/)).not.toBeInTheDocument();

    // Expand
    fireEvent.click(screen.getByLabelText('Ver stack trace'));
    expect(screen.getByText(/at foo/)).toBeInTheDocument();

    // Collapse
    fireEvent.click(screen.getByLabelText('Ocultar stack trace'));
    expect(screen.queryByText(/at foo/)).not.toBeInTheDocument();
  });

  it('does not render stack toggle when stack is absent', async () => {
    const { ErrorEntry } = await import('@/admin/components/error-entry');
    const entry = {
      id: '5',
      message: 'No stack',
      severity: 'warning' as const,
      count: 1,
      firstSeenAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
    };
    render(<ErrorEntry entry={entry} onDelete={() => {}} />);
    expect(screen.queryByText('Stack trace')).not.toBeInTheDocument();
  });
});

// ── AdminErrorsPage ────────────────────────────────────────────────────────

describe('AdminErrorsPage', () => {
  beforeEach(() => clearErrors());

  async function renderPage() {
    const { default: AdminErrorsPage } = await import('@/admin/pages/admin-errors-page');
    return render(
      <MemoryRouter>
        <AdminErrorsPage />
      </MemoryRouter>
    );
  }

  it('renders page title and empty state', async () => {
    await renderPage();
    expect(screen.getByText('Error Tracking')).toBeInTheDocument();
    expect(screen.getByText('Nenhum erro capturado')).toBeInTheDocument();
  });

  it('shows error cards when errors exist', async () => {
    useAdminStore.getState().addError({
      message: 'TypeError: foo is null',
      severity: 'error',
    });
    await renderPage();
    expect(screen.getByText('TypeError: foo is null')).toBeInTheDocument();
  });

  it('shows count badge in heading', async () => {
    useAdminStore.getState().addError({ message: 'Err 1', severity: 'error' });
    useAdminStore.getState().addError({ message: 'Err 2', severity: 'fatal' });
    await renderPage();
    const heading = screen.getByRole('heading', { name: /error tracking/i });
    expect(heading.textContent).toContain('2');
  });

  it('shows "Limpar Tudo" button only when errors exist', async () => {
    const { unmount: unmount1 } = await renderPage();
    expect(screen.queryByText('Limpar Tudo')).not.toBeInTheDocument();
    unmount1();

    useAdminStore.getState().addError({ message: 'Some error', severity: 'warning' });
    await renderPage();
    expect(screen.getByText('Limpar Tudo')).toBeInTheDocument();
  });

  it('"Limpar Tudo" clears all errors', async () => {
    useAdminStore.getState().addError({ message: 'Clear me', severity: 'error' });
    await renderPage();
    fireEvent.click(screen.getByText('Limpar Tudo'));
    expect(useAdminStore.getState().errors).toHaveLength(0);
  });

  it('filters errors by severity tab', async () => {
    useAdminStore.getState().addError({ message: 'Fatal error', severity: 'fatal' });
    useAdminStore.getState().addError({ message: 'Warning msg', severity: 'warning' });
    await renderPage();

    // Both visible by default
    expect(screen.getByText('Fatal error')).toBeInTheDocument();
    expect(screen.getByText('Warning msg')).toBeInTheDocument();

    // Filter to Fatal
    fireEvent.click(screen.getByRole('button', { name: /Fatal/ }));
    expect(screen.getByText('Fatal error')).toBeInTheDocument();
    expect(screen.queryByText('Warning msg')).not.toBeInTheDocument();
  });

  it('shows empty filter message when no errors match severity', async () => {
    useAdminStore.getState().addError({ message: 'Only warning', severity: 'warning' });
    await renderPage();

    fireEvent.click(screen.getByRole('button', { name: /Fatal/ }));
    expect(screen.getByText(/Nenhum erro com severidade/)).toBeInTheDocument();
  });

  it('removeError removes a single entry', async () => {
    useAdminStore.getState().addError({ message: 'Keep me', severity: 'error' });
    useAdminStore.getState().addError({ message: 'Remove me', severity: 'warning' });
    const toRemove = useAdminStore.getState().errors.find((e) => e.message === 'Remove me')!;
    useAdminStore.getState().removeError(toRemove.id);

    expect(useAdminStore.getState().errors.find((e) => e.message === 'Remove me')).toBeUndefined();
    expect(useAdminStore.getState().errors.find((e) => e.message === 'Keep me')).toBeDefined();
  });

  it('filters errors by search text', async () => {
    useAdminStore.getState().addError({ message: 'Timeout on Cloudflare API', severity: 'error' });
    useAdminStore.getState().addError({ message: 'RangeError in slider', severity: 'warning' });
    await renderPage();

    fireEvent.change(screen.getByPlaceholderText(/Buscar por/i), { target: { value: 'cloudflare' } });
    expect(screen.getByText('Timeout on Cloudflare API')).toBeInTheDocument();
    expect(screen.queryByText('RangeError in slider')).not.toBeInTheDocument();
  });

  it('removes only filtered errors in bulk action', async () => {
    clearErrors();
    useAdminStore.getState().addError({ message: 'Target error', severity: 'error' });
    useAdminStore.getState().addError({ message: 'Keep error', severity: 'warning' });
    await renderPage();

    fireEvent.change(screen.getByPlaceholderText(/Buscar por/i), { target: { value: 'target' } });
    fireEvent.click(screen.getByText('Remover filtrados'));

    const state = useAdminStore.getState().errors;
    expect(state.find((e) => e.message === 'Target error')).toBeUndefined();
    expect(state.find((e) => e.message === 'Keep error')).toBeDefined();
  });

  it('sorts by repeated count when "Mais repetidos" is selected', async () => {
    clearErrors();
    useAdminStore.getState().addError({ message: 'Repeated', severity: 'error' });
    useAdminStore.getState().addError({ message: 'Repeated', severity: 'error' });
    useAdminStore.getState().addError({ message: 'Single', severity: 'warning' });

    const view = await renderPage();
    fireEvent.change(screen.getByLabelText('Ordenar erros'), { target: { value: 'count_desc' } });

    const messages = Array.from(view.container.querySelectorAll('p.text-sm.text-gray-200.leading-relaxed.font-mono.break-all'));
    expect(messages[0]?.textContent).toBe('Repeated');
  });
});
