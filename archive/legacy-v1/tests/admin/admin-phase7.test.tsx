import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useAdminStore } from '@/admin/store/admin-store';
import { CHANGELOG } from '@/admin/data/changelog-data';
import { useFeatureFlag } from '@/admin/hooks/use-feature-flag';
import { renderHook } from '@testing-library/react';

// ── Helpers ───────────────────────────────────────────────────────────────────

function resetFlags() {
  // Restore all default flags to enabled
  const flags = useAdminStore.getState().flags;
  flags.forEach((f) => useAdminStore.getState().setFlag(f.id, true));
}

async function renderFlags() {
  const { default: AdminFlagsPage } = await import('@/admin/pages/admin-flags-page');
  return render(<MemoryRouter><AdminFlagsPage /></MemoryRouter>);
}

async function renderChangelog() {
  const { default: AdminChangelogPage } = await import('@/admin/pages/admin-changelog-page');
  return render(<MemoryRouter><AdminChangelogPage /></MemoryRouter>);
}

async function renderHealth() {
  const { default: AdminHealthPage } = await import('@/admin/pages/admin-health-page');
  return render(<MemoryRouter><AdminHealthPage /></MemoryRouter>);
}

// ── changelog-data ────────────────────────────────────────────────────────────

describe('CHANGELOG data', () => {
  it('has at least 10 entries', () => {
    expect(CHANGELOG.length).toBeGreaterThanOrEqual(10);
  });

  it('newest entry is v0.7.1', () => {
    expect(CHANGELOG[0].version).toBe('0.7.1');
  });

  it('all entries have required fields', () => {
    for (const entry of CHANGELOG) {
      expect(entry.version).toBeTruthy();
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry.tag).toBeTruthy();
      expect(entry.title).toBeTruthy();
      expect(entry.items.length).toBeGreaterThan(0);
    }
  });

  it('entries are sorted newest first (by date desc)', () => {
    for (let i = 0; i < CHANGELOG.length - 1; i++) {
      expect(CHANGELOG[i].date >= CHANGELOG[i + 1].date).toBe(true);
    }
  });

  it('valid tag values only', () => {
    const validTags = new Set(['feat', 'fix', 'infra', 'docs', 'security', 'polish']);
    for (const entry of CHANGELOG) {
      expect(validTags.has(entry.tag)).toBe(true);
    }
  });
});

// ── useFeatureFlag hook ───────────────────────────────────────────────────────

describe('useFeatureFlag', () => {
  beforeEach(() => resetFlags());

  it('returns true for an enabled flag', () => {
    useAdminStore.getState().setFlag('admin_dashboard', true);
    const { result } = renderHook(() => useFeatureFlag('admin_dashboard'));
    expect(result.current).toBe(true);
  });

  it('returns false for a disabled flag', () => {
    useAdminStore.getState().setFlag('admin_dashboard', false);
    const { result } = renderHook(() => useFeatureFlag('admin_dashboard'));
    expect(result.current).toBe(false);
  });

  it('returns false for unknown flag id', () => {
    const { result } = renderHook(() => useFeatureFlag('nonexistent_flag'));
    expect(result.current).toBe(false);
  });
});

// ── admin-store: DEFAULT_FLAGS ────────────────────────────────────────────────

describe('AdminStore — DEFAULT_FLAGS (Phase 7 expansion)', () => {
  it('has bug_report_button flag', () => {
    const flag = useAdminStore.getState().flags.find((f) => f.id === 'bug_report_button');
    expect(flag).toBeDefined();
    expect(flag?.enabled).toBe(true);
  });

  it('has usage_tracking flag', () => {
    const flag = useAdminStore.getState().flags.find((f) => f.id === 'usage_tracking');
    expect(flag).toBeDefined();
  });

  it('has error_tracking flag', () => {
    const flag = useAdminStore.getState().flags.find((f) => f.id === 'error_tracking');
    expect(flag).toBeDefined();
  });

  it('has fine_tune_panel flag', () => {
    const flag = useAdminStore.getState().flags.find((f) => f.id === 'fine_tune_panel');
    expect(flag).toBeDefined();
  });

  it('has at least 5 flags total', () => {
    expect(useAdminStore.getState().flags.length).toBeGreaterThanOrEqual(5);
  });

  it('setFlag toggles any flag correctly', () => {
    useAdminStore.getState().setFlag('bug_report_button', false);
    expect(useAdminStore.getState().flags.find((f) => f.id === 'bug_report_button')?.enabled).toBe(false);
    useAdminStore.getState().setFlag('bug_report_button', true);
    expect(useAdminStore.getState().flags.find((f) => f.id === 'bug_report_button')?.enabled).toBe(true);
  });
});

// ── AdminFlagsPage ────────────────────────────────────────────────────────────

describe('AdminFlagsPage', () => {
  beforeEach(() => resetFlags());

  it('renders page title', async () => {
    await renderFlags();
    expect(screen.getByText('Feature Flags')).toBeInTheDocument();
  });

  it('renders all flags from store', async () => {
    await renderFlags();
    const flags = useAdminStore.getState().flags;
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(flags.length);
  });

  it('shows enabled count badge', async () => {
    await renderFlags();
    const flags = useAdminStore.getState().flags;
    const enabledCount = flags.filter((f) => f.enabled).length;
    expect(screen.getByText(String(enabledCount))).toBeInTheDocument();
  });

  it('renders toggle buttons with aria-label', async () => {
    await renderFlags();
    const toggles = screen.getAllByRole('button').filter((b) =>
      b.getAttribute('aria-label')?.startsWith('Desativar') ||
      b.getAttribute('aria-label')?.startsWith('Ativar')
    );
    expect(toggles.length).toBeGreaterThanOrEqual(1);
  });

  it('clicking toggle changes flag state', async () => {
    await renderFlags();
    const before = useAdminStore.getState().flags.find((f) => f.id === 'admin_dashboard')?.enabled;
    const toggle = screen.getByRole('button', { name: /Desativar Admin Dashboard|Ativar Admin Dashboard/i });
    await act(async () => {
      fireEvent.click(toggle);
    });
    const after = useAdminStore.getState().flags.find((f) => f.id === 'admin_dashboard')?.enabled;
    expect(after).toBe(!before);
    // Restore
    await act(async () => {
      useAdminStore.getState().setFlag('admin_dashboard', true);
    });
  });

  it('shows notice about localStorage', async () => {
    await renderFlags();
    expect(screen.getByText(/localStorage deste navegador/i)).toBeInTheDocument();
  });
});

// ── AdminChangelogPage ────────────────────────────────────────────────────────

describe('AdminChangelogPage', () => {
  it('renders page title', async () => {
    await renderChangelog();
    expect(screen.getByText('Changelog')).toBeInTheDocument();
  });

  it('renders the latest version entry', async () => {
    await renderChangelog();
    expect(screen.getAllByText(/v0\.7\.1\b/).length).toBeGreaterThan(0);
  });

  it('shows "Atual" badge on newest entry', async () => {
    await renderChangelog();
    expect(screen.getByText('Atual')).toBeInTheDocument();
  });

  it('renders filter buttons for tags present in changelog', async () => {
    await renderChangelog();
    expect(screen.getByRole('button', { name: /Todos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Feature/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fix/i })).toBeInTheDocument();
  });

  it('clicking Fix filter shows only fix entries', async () => {
    await renderChangelog();
    fireEvent.click(screen.getByRole('button', { name: /Fix/i }));
    // "Atual" badge should be gone (only present on all-filter latest entry)
    expect(screen.queryByText('Atual')).not.toBeInTheDocument();
    // Fix entries should contain fix-tagged titles
    const fixCount = CHANGELOG.filter((e) => e.tag === 'fix').length;
    expect(fixCount).toBeGreaterThan(0);
  });

  it('shows total release count in subtitle', async () => {
    await renderChangelog();
    expect(screen.getByText(new RegExp(`${CHANGELOG.length} releases`))).toBeInTheDocument();
  });
});

// ── AdminHealthPage ───────────────────────────────────────────────────────────

describe('AdminHealthPage', () => {
  it('renders page title', async () => {
    await renderHealth();
    expect(screen.getByText('Saúde do Sistema')).toBeInTheDocument();
  });

  it('renders Verificar Agora button', async () => {
    await renderHealth();
    expect(screen.getByRole('button', { name: /Verificar Agora/i })).toBeInTheDocument();
  });

  it('renders localStorage check row', async () => {
    await renderHealth();
    expect(screen.getByText('localStorage')).toBeInTheDocument();
  });

  it('renders Admin Store check row', async () => {
    await renderHealth();
    expect(screen.getByText('Admin Store')).toBeInTheDocument();
  });

  it('renders Navegador check row', async () => {
    await renderHealth();
    expect(screen.getByText('Navegador')).toBeInTheDocument();
  });

  it('renders app version info', async () => {
    await renderHealth();
    expect(screen.getByText('0.7.0')).toBeInTheDocument();
  });

  it('shows React version', async () => {
    await renderHealth();
    expect(screen.getByText('18.3')).toBeInTheDocument();
  });

  it('clicking Verificar Agora re-runs checks', async () => {
    await renderHealth();
    const btn = screen.getByRole('button', { name: /Verificar Agora/i });
    fireEvent.click(btn);
    // After re-check, localStorage row should still be present
    expect(screen.getByText('localStorage')).toBeInTheDocument();
  });
});
