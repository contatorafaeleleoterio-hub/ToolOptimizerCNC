import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useAnalyticsStore } from '@/admin/store/analytics-store';

// ── Helpers ───────────────────────────────────────────────────────────────────

function resetStore() {
  useAnalyticsStore.setState({
    token: '',
    zoneId: '',
    dailyTraffic: [],
    webVitals: null,
    vitalsUnavailable: false,
    status: 'idle',
    error: null,
    fetchedAt: null,
  });
}

async function renderPage() {
  const { default: AdminAnalyticsPage } = await import('@/admin/pages/admin-analytics-page');
  return render(
    <MemoryRouter>
      <AdminAnalyticsPage />
    </MemoryRouter>,
  );
}

// ── analytics-store ───────────────────────────────────────────────────────────

describe('useAnalyticsStore — credentials', () => {
  beforeEach(() => resetStore());

  it('starts with empty credentials', () => {
    const { token, zoneId } = useAnalyticsStore.getState();
    expect(token).toBe('');
    expect(zoneId).toBe('');
  });

  it('setCredentials stores token and zoneId', () => {
    useAnalyticsStore.getState().setCredentials('tok_abc', 'zone123');
    const { token, zoneId } = useAnalyticsStore.getState();
    expect(token).toBe('tok_abc');
    expect(zoneId).toBe('zone123');
  });

  it('setCredentials resets status to idle and clears error', () => {
    useAnalyticsStore.setState({ status: 'error', error: 'old error' });
    useAnalyticsStore.getState().setCredentials('tok', 'zone');
    expect(useAnalyticsStore.getState().status).toBe('idle');
    expect(useAnalyticsStore.getState().error).toBeNull();
  });

  it('clearCredentials resets everything', () => {
    useAnalyticsStore.setState({
      token: 'tok',
      zoneId: 'zone',
      dailyTraffic: [{ date: '2026-03-18', pageViews: 100, uniques: 50 }],
      status: 'success',
      fetchedAt: new Date().toISOString(),
    });
    useAnalyticsStore.getState().clearCredentials();
    const s = useAnalyticsStore.getState();
    expect(s.token).toBe('');
    expect(s.zoneId).toBe('');
    expect(s.dailyTraffic).toHaveLength(0);
    expect(s.status).toBe('idle');
    expect(s.fetchedAt).toBeNull();
  });

  it('hasCredentials returns false when empty', () => {
    expect(useAnalyticsStore.getState().hasCredentials()).toBe(false);
  });

  it('hasCredentials returns true when both fields are set', () => {
    useAnalyticsStore.getState().setCredentials('tok', 'zone');
    expect(useAnalyticsStore.getState().hasCredentials()).toBe(true);
  });

  it('hasCredentials returns false when only token is set', () => {
    useAnalyticsStore.setState({ token: 'tok', zoneId: '' });
    expect(useAnalyticsStore.getState().hasCredentials()).toBe(false);
  });
});

describe('useAnalyticsStore — clearData', () => {
  beforeEach(() => resetStore());

  it('clears data but keeps credentials', () => {
    useAnalyticsStore.setState({
      token: 'tok',
      zoneId: 'zone',
      dailyTraffic: [{ date: '2026-03-18', pageViews: 50, uniques: 20 }],
      status: 'success',
      error: null,
      fetchedAt: new Date().toISOString(),
    });
    useAnalyticsStore.getState().clearData();
    const s = useAnalyticsStore.getState();
    expect(s.token).toBe('tok');
    expect(s.zoneId).toBe('zone');
    expect(s.dailyTraffic).toHaveLength(0);
    expect(s.status).toBe('idle');
    expect(s.fetchedAt).toBeNull();
  });
});

describe('useAnalyticsStore — fetchData', () => {
  beforeEach(() => {
    resetStore();
    vi.restoreAllMocks();
  });

  it('sets status=error when no credentials', async () => {
    await useAnalyticsStore.getState().fetchData();
    expect(useAnalyticsStore.getState().status).toBe('error');
    expect(useAnalyticsStore.getState().error).toMatch(/obrigatórios/i);
  });

  it('sets status=loading then success on successful fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          data: {
            viewer: {
              zones: [
                {
                  httpRequests1dGroups: [
                    { dimensions: { date: '2026-03-11' }, sum: { pageViews: 120 }, uniq: { uniques: 60 } },
                    { dimensions: { date: '2026-03-12' }, sum: { pageViews: 200 }, uniq: { uniques: 95 } },
                  ],
                  rumPerformanceEventsAdaptiveGroups: [],
                },
              ],
            },
          },
        }),
        { headers: { 'Content-Type': 'application/json' } },
      ),
    );

    useAnalyticsStore.getState().setCredentials('token_test', 'zone_test');
    await useAnalyticsStore.getState().fetchData();

    const s = useAnalyticsStore.getState();
    expect(s.status).toBe('success');
    expect(s.dailyTraffic).toHaveLength(2);
    expect(s.dailyTraffic[0].pageViews).toBe(120);
    expect(s.dailyTraffic[1].uniques).toBe(95);
    expect(s.fetchedAt).not.toBeNull();
  });

  it('sets vitalsUnavailable=true when vitals returns empty', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          data: {
            viewer: {
              zones: [
                {
                  httpRequests1dGroups: [
                    { dimensions: { date: '2026-03-18' }, sum: { pageViews: 5 }, uniq: { uniques: 3 } },
                  ],
                  rumPerformanceEventsAdaptiveGroups: [],
                },
              ],
            },
          },
        }),
        { headers: { 'Content-Type': 'application/json' } },
      ),
    );

    useAnalyticsStore.getState().setCredentials('tok', 'zone');
    await useAnalyticsStore.getState().fetchData();

    expect(useAnalyticsStore.getState().vitalsUnavailable).toBe(true);
    expect(useAnalyticsStore.getState().webVitals).toBeNull();
  });

  it('sets status=error when fetch returns HTTP 401', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('Unauthorized', { status: 401 }),
    );

    useAnalyticsStore.getState().setCredentials('bad_token', 'zone');
    await useAnalyticsStore.getState().fetchData();

    expect(useAnalyticsStore.getState().status).toBe('error');
    expect(useAnalyticsStore.getState().error).toMatch(/401/);
  });

  it('sets status=error when GraphQL returns errors array', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({ errors: [{ message: 'Invalid zone tag' }] }),
        { headers: { 'Content-Type': 'application/json' } },
      ),
    );

    useAnalyticsStore.getState().setCredentials('tok', 'zone');
    await useAnalyticsStore.getState().fetchData();

    expect(useAnalyticsStore.getState().status).toBe('error');
    expect(useAnalyticsStore.getState().error).toMatch(/Invalid zone tag/);
  });
});

// ── AdminAnalyticsPage ────────────────────────────────────────────────────────

describe('AdminAnalyticsPage — setup form', () => {
  beforeEach(() => resetStore());

  it('renders setup form when no credentials', async () => {
    await renderPage();
    expect(screen.getByText('Analytics Cloudflare')).toBeInTheDocument();
    expect(screen.getByLabelText('API Token')).toBeInTheDocument();
    expect(screen.getByLabelText('Zone ID')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Conectar/i })).toBeInTheDocument();
  });

  it('shows validation error when Conectar clicked with empty fields', async () => {
    await renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Conectar/i }));
    expect(screen.getByText(/Preencha o API Token e o Zone ID/i)).toBeInTheDocument();
  });

  it('shows instructions on how to get credentials', async () => {
    await renderPage();
    expect(screen.getByText(/Zone: Analytics: Read/)).toBeInTheDocument();
  });
});

describe('AdminAnalyticsPage — connected state', () => {
  beforeEach(() => resetStore());

  it('renders page title and KPI cards when data is loaded', async () => {
    useAnalyticsStore.setState({
      token: 'tok',
      zoneId: 'zone',
      dailyTraffic: [
        { date: '2026-03-17', pageViews: 150, uniques: 80 },
        { date: '2026-03-18', pageViews: 200, uniques: 100 },
      ],
      status: 'success',
      fetchedAt: new Date().toISOString(),
    });
    await renderPage();
    expect(screen.getByText('Analytics Cloudflare')).toBeInTheDocument();
    // Total pageviews = 350
    expect(screen.getByText('350')).toBeInTheDocument();
    // Total visitors = 180
    expect(screen.getByText('180')).toBeInTheDocument();
  });

  it('renders Desconectar button when credentials are set', async () => {
    useAnalyticsStore.setState({
      token: 'tok',
      zoneId: 'zone',
      dailyTraffic: [{ date: '2026-03-18', pageViews: 10, uniques: 5 }],
      status: 'success',
      fetchedAt: new Date().toISOString(),
    });
    await renderPage();
    expect(screen.getByRole('button', { name: /Desconectar/i })).toBeInTheDocument();
  });

  it('Desconectar clears credentials and returns to setup form', async () => {
    useAnalyticsStore.setState({
      token: 'tok',
      zoneId: 'zone',
      dailyTraffic: [{ date: '2026-03-18', pageViews: 10, uniques: 5 }],
      status: 'success',
      fetchedAt: new Date().toISOString(),
    });
    await renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Desconectar/i }));
    expect(useAnalyticsStore.getState().token).toBe('');
    expect(useAnalyticsStore.getState().zoneId).toBe('');
  });

  it('shows vitals unavailable message when vitalsUnavailable=true', async () => {
    useAnalyticsStore.setState({
      token: 'tok',
      zoneId: 'zone',
      dailyTraffic: [{ date: '2026-03-18', pageViews: 10, uniques: 5 }],
      webVitals: null,
      vitalsUnavailable: true,
      status: 'success',
      fetchedAt: new Date().toISOString(),
    });
    await renderPage();
    expect(screen.getByText(/Web Vitals não disponíveis/i)).toBeInTheDocument();
  });

  it('renders Web Vitals cards when vitals data is present', async () => {
    useAnalyticsStore.setState({
      token: 'tok',
      zoneId: 'zone',
      dailyTraffic: [{ date: '2026-03-18', pageViews: 10, uniques: 5 }],
      webVitals: { lcpMs: 1800, inpMs: 150, cls: 0.05, count: 500 },
      vitalsUnavailable: false,
      status: 'success',
      fetchedAt: new Date().toISOString(),
    });
    await renderPage();
    expect(screen.getByText('LCP')).toBeInTheDocument();
    expect(screen.getByText('INP')).toBeInTheDocument();
    expect(screen.getByText('CLS')).toBeInTheDocument();
  });

  it('shows error banner when status=error', async () => {
    useAnalyticsStore.setState({
      token: 'tok',
      zoneId: 'zone',
      status: 'error',
      error: 'HTTP 403: Forbidden',
      dailyTraffic: [],
    });
    await renderPage();
    expect(screen.getByText(/Erro ao buscar dados/i)).toBeInTheDocument();
    expect(screen.getByText(/HTTP 403/)).toBeInTheDocument();
  });

  it('shows empty state when fetch succeeds but no data', async () => {
    useAnalyticsStore.setState({
      token: 'tok',
      zoneId: 'zone',
      dailyTraffic: [],
      status: 'success',
      fetchedAt: new Date().toISOString(),
    });
    await renderPage();
    expect(screen.getByText(/Nenhum dado encontrado/i)).toBeInTheDocument();
  });

  it('renders Atualizar button when connected', async () => {
    useAnalyticsStore.setState({
      token: 'tok',
      zoneId: 'zone',
      dailyTraffic: [{ date: '2026-03-18', pageViews: 10, uniques: 5 }],
      status: 'success',
      fetchedAt: new Date().toISOString(),
    });
    await renderPage();
    expect(screen.getByRole('button', { name: /Atualizar/i })).toBeInTheDocument();
  });
});

describe('AdminAnalyticsPage — Web Vitals ratings', () => {
  beforeEach(() => resetStore());

  async function renderWithVitals(lcpMs: number, inpMs: number, cls: number) {
    useAnalyticsStore.setState({
      token: 'tok',
      zoneId: 'zone',
      dailyTraffic: [{ date: '2026-03-18', pageViews: 10, uniques: 5 }],
      webVitals: { lcpMs, inpMs, cls, count: 100 },
      vitalsUnavailable: false,
      status: 'success',
      fetchedAt: new Date().toISOString(),
    });
    await renderPage();
  }

  it('shows Bom badge for good LCP (≤2500ms)', async () => {
    await renderWithVitals(1200, 100, 0.05);
    const goodBadges = screen.getAllByText('Bom');
    expect(goodBadges.length).toBeGreaterThanOrEqual(1);
  });

  it('shows Ruim badge for poor LCP (>4000ms)', async () => {
    await renderWithVitals(5000, 100, 0.05);
    expect(screen.getByText('Ruim')).toBeInTheDocument();
  });

  it('shows Melhorar badge for needs-improvement INP (200-500ms)', async () => {
    await renderWithVitals(1000, 350, 0.05);
    expect(screen.getByText('Melhorar')).toBeInTheDocument();
  });
});

// ── Vital rating helpers (inline re-test for regression) ─────────────────────

describe('Web Vital rating thresholds', () => {
  // These are tested indirectly via the page — no direct import needed
  // Covered by the AdminAnalyticsPage — Web Vitals ratings suite above

  it('fixture: good vitals all show Bom badges', async () => {
    resetStore();
    useAnalyticsStore.setState({
      token: 'tok',
      zoneId: 'zone',
      dailyTraffic: [{ date: '2026-03-18', pageViews: 1, uniques: 1 }],
      webVitals: { lcpMs: 1000, inpMs: 100, cls: 0.05, count: 50 },
      vitalsUnavailable: false,
      status: 'success',
      fetchedAt: new Date().toISOString(),
    });
    await renderPage();
    const goodBadges = screen.getAllByText('Bom');
    expect(goodBadges).toHaveLength(3);
  });
});
