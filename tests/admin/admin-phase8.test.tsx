import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useAdminStore } from '@/admin/store/admin-store';
import { useUsageStore } from '@/admin/store/usage-store';
import { buildFeed, relativeTime, MAX_FEED_ENTRIES } from '@/admin/components/activity-feed';
import type { BugReport, AdminTask, ErrorEntry, UsageEvent } from '@/admin/types/admin-types';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeIso(offsetMs: number): string {
  return new Date(Date.now() - offsetMs).toISOString();
}

const ONE_MIN  = 60_000;
const ONE_HOUR = 60 * ONE_MIN;
const ONE_DAY  = 24 * ONE_HOUR;

function makeBug(overrides: Partial<BugReport> = {}): BugReport {
  return {
    id: 'b1',
    description: 'Test bug description',
    severity: 'media',
    status: 'novo',
    version: '0.7.0',
    createdAt: makeIso(ONE_HOUR),
    ...overrides,
  };
}

function makeTask(overrides: Partial<AdminTask> = {}): AdminTask {
  return {
    id: 't1',
    title: 'Test task',
    description: 'desc',
    status: 'aberta',
    priority: 'media',
    tags: [],
    createdAt: makeIso(2 * ONE_HOUR),
    updatedAt: makeIso(2 * ONE_HOUR),
    ...overrides,
  };
}

function makeError(overrides: Partial<ErrorEntry> = {}): ErrorEntry {
  return {
    id: 'e1',
    message: 'Test error message',
    severity: 'error',
    count: 1,
    firstSeenAt: makeIso(3 * ONE_HOUR),
    lastSeenAt: makeIso(3 * ONE_HOUR),
    ...overrides,
  };
}

function makeEvent(overrides: Partial<UsageEvent> = {}): UsageEvent {
  return {
    materialNome: 'Aço ABNT 1020',
    tipoOperacao: 'desbaste',
    ferramentaTipo: 'Fresa',
    ferramentaDiametro: 12,
    timestamp: makeIso(4 * ONE_HOUR),
    ...overrides,
  };
}

function resetStores() {
  useAdminStore.setState({ tasks: [], bugs: [], errors: [] });
  useUsageStore.setState({ events: [] });
}

async function renderDashboard() {
  const { default: AdminDashboardPage } = await import('@/admin/pages/admin-dashboard-page');
  return render(<MemoryRouter><AdminDashboardPage /></MemoryRouter>);
}

async function renderFeed() {
  const { ActivityFeed } = await import('@/admin/components/activity-feed');
  return render(<MemoryRouter><ActivityFeed /></MemoryRouter>);
}

// ── relativeTime ─────────────────────────────────────────────────────────────

describe('relativeTime', () => {
  it('returns "agora" for timestamps within 1 minute', () => {
    expect(relativeTime(makeIso(30_000))).toBe('agora');
  });

  it('returns minutes for timestamps 1-59 minutes ago', () => {
    expect(relativeTime(makeIso(5 * ONE_MIN))).toBe('há 5min');
    expect(relativeTime(makeIso(59 * ONE_MIN))).toBe('há 59min');
  });

  it('returns hours for timestamps 1-23 hours ago', () => {
    expect(relativeTime(makeIso(2 * ONE_HOUR))).toBe('há 2h');
    expect(relativeTime(makeIso(23 * ONE_HOUR))).toBe('há 23h');
  });

  it('returns days for timestamps >= 24 hours ago', () => {
    expect(relativeTime(makeIso(3 * ONE_DAY))).toBe('há 3d');
  });
});

// ── buildFeed ─────────────────────────────────────────────────────────────────

describe('buildFeed', () => {
  it('returns empty array when all inputs are empty', () => {
    expect(buildFeed([], [], [], [])).toHaveLength(0);
  });

  it('includes bug entries with correct type', () => {
    const feed = buildFeed([makeBug()], [], [], []);
    expect(feed).toHaveLength(1);
    expect(feed[0].type).toBe('bug');
    expect(feed[0].title).toBe('Bug reportado');
  });

  it('includes task entries with correct type and title', () => {
    const feed = buildFeed([], [makeTask({ title: 'Minha tarefa' })], [], []);
    expect(feed).toHaveLength(1);
    expect(feed[0].type).toBe('task');
    expect(feed[0].title).toBe('Minha tarefa');
  });

  it('includes error entries with correct type', () => {
    const feed = buildFeed([], [], [makeError()], []);
    expect(feed).toHaveLength(1);
    expect(feed[0].type).toBe('error');
  });

  it('includes simulation entries with correct type', () => {
    const feed = buildFeed([], [], [], [makeEvent()]);
    expect(feed).toHaveLength(1);
    expect(feed[0].type).toBe('simulation');
    expect(feed[0].title).toContain('Simulação');
    expect(feed[0].title).toContain('Aço ABNT 1020');
  });

  it('sorts entries newest first', () => {
    const oldTs  = makeIso(5 * ONE_HOUR);
    const newTs  = makeIso(ONE_MIN);
    const bug1   = makeBug({ id: 'b1', createdAt: oldTs });
    const bug2   = makeBug({ id: 'b2', createdAt: newTs });
    const feed   = buildFeed([bug1, bug2], [], [], []);
    expect(feed[0].id).toBe('bug-b2');
    expect(feed[1].id).toBe('bug-b1');
  });

  it('limits result to MAX_FEED_ENTRIES', () => {
    const manyBugs = Array.from({ length: 20 }, (_, i) =>
      makeBug({ id: `b${i}`, createdAt: makeIso(i * ONE_MIN) })
    );
    const feed = buildFeed(manyBugs, [], [], []);
    expect(feed).toHaveLength(MAX_FEED_ENTRIES);
  });

  it('truncates long bug description to 60 chars + ellipsis', () => {
    const longDesc = 'x'.repeat(80);
    const feed = buildFeed([makeBug({ description: longDesc })], [], [], []);
    expect(feed[0].subtitle.length).toBeLessThanOrEqual(63); // 60 + '…' (3 bytes but 1 char)
    expect(feed[0].subtitle).toContain('…');
  });

  it('does not truncate short bug description', () => {
    const short = 'Short description';
    const feed = buildFeed([makeBug({ description: short })], [], [], []);
    expect(feed[0].subtitle).toBe(short);
  });

  it('simulation subtitle includes operação label', () => {
    const feed = buildFeed([], [], [], [makeEvent({ tipoOperacao: 'acabamento' })]);
    expect(feed[0].subtitle).toContain('Acabamento');
  });

  it('simulation subtitle includes diameter', () => {
    const feed = buildFeed([], [], [], [makeEvent({ ferramentaDiametro: 20 })]);
    expect(feed[0].subtitle).toContain('∅20mm');
  });
});

// ── ActivityFeed component ────────────────────────────────────────────────────

describe('ActivityFeed', () => {
  beforeEach(() => resetStores());

  it('renders empty state when no data', async () => {
    await renderFeed();
    expect(screen.getByText(/Nenhuma atividade registrada ainda/i)).toBeInTheDocument();
  });

  it('renders bug entry from store', async () => {
    useAdminStore.getState().addBugReport({
      description: 'Crash on save',
      severity: 'alta',
      version: '0.7.0',
    });
    await renderFeed();
    expect(screen.getByText('Bug reportado')).toBeInTheDocument();
    expect(screen.getByText(/Crash on save/i)).toBeInTheDocument();
  });

  it('renders task entry from store', async () => {
    useAdminStore.getState().addTask({
      title: 'Implementar feature X',
      description: 'desc',
      status: 'aberta',
      priority: 'alta',
      tags: [],
    });
    await renderFeed();
    expect(screen.getByText('Implementar feature X')).toBeInTheDocument();
  });

  it('renders simulation entry from usage store', async () => {
    useUsageStore.getState().trackUsage({
      materialNome: 'Alumínio 6061',
      tipoOperacao: 'semi',
      ferramentaTipo: 'Fresa',
      ferramentaDiametro: 8,
    });
    await renderFeed();
    expect(screen.getByText(/Simulação — Alumínio 6061/)).toBeInTheDocument();
  });
});

// ── AdminDashboardPage ────────────────────────────────────────────────────────

describe('AdminDashboardPage (Phase 8)', () => {
  beforeEach(() => resetStores());

  it('renders page title', async () => {
    await renderDashboard();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders "Simulações Hoje" KPI card', async () => {
    await renderDashboard();
    expect(screen.getByText('Simulações Hoje')).toBeInTheDocument();
  });

  it('shows simulations today count from usage store', async () => {
    useUsageStore.getState().trackUsage({
      materialNome: 'Aço',
      tipoOperacao: 'desbaste',
      ferramentaTipo: 'Fresa',
      ferramentaDiametro: 10,
    });
    await renderDashboard();
    // "1" should appear as the KPI value for simulations today
    const kpiValues = screen.getAllByText('1');
    expect(kpiValues.length).toBeGreaterThan(0);
  });

  it('renders "Atividade Recente" section heading', async () => {
    await renderDashboard();
    expect(screen.getByText('Atividade Recente')).toBeInTheDocument();
  });

  it('renders "Acesso Rápido" section heading', async () => {
    await renderDashboard();
    expect(screen.getByText('Acesso Rápido')).toBeInTheDocument();
  });

  it('shows analytics setup prompt when no credentials', async () => {
    await renderDashboard();
    expect(screen.getByText(/Analytics Cloudflare não configurado/i)).toBeInTheDocument();
  });

  it('renders all 8 quick links', async () => {
    await renderDashboard();
    expect(screen.getByText('Tarefas')).toBeInTheDocument();
    expect(screen.getByText('Inbox')).toBeInTheDocument();
    expect(screen.getByText('Erros')).toBeInTheDocument();
    expect(screen.getByText('Uso')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Feature Flags')).toBeInTheDocument();
    expect(screen.getByText('Changelog')).toBeInTheDocument();
    expect(screen.getByText('Saúde')).toBeInTheDocument();
  });
});

// ── CHANGELOG (v0.7.0) ────────────────────────────────────────────────────────

describe('CHANGELOG (Phase 8 entry)', () => {
  it('newest entry is v0.7.0', async () => {
    const { CHANGELOG } = await import('@/admin/data/changelog-data');
    expect(CHANGELOG[0].version).toBe('0.7.0');
  });

  it('v0.7.0 entry has expected items', async () => {
    const { CHANGELOG } = await import('@/admin/data/changelog-data');
    const entry = CHANGELOG[0];
    expect(entry.items.length).toBeGreaterThanOrEqual(3);
    expect(entry.tag).toBe('feat');
  });
});
