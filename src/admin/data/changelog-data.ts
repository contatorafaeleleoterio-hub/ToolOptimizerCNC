/**
 * Changelog data — static version history for ToolOptimizer CNC
 * Displayed in AdminChangelogPage. Add newest entries at the top.
 */

export type ChangelogTag = 'feat' | 'fix' | 'infra' | 'docs' | 'security' | 'polish';

export interface ChangelogEntry {
  version: string;
  date: string; // YYYY-MM-DD
  tag: ChangelogTag;
  title: string;
  items: string[];
}

export const CHANGELOG: ChangelogEntry[] = [  {
    version: '0.7.1',
    date: '2026-03-29',
    tag: 'feat',
    title: 'Admin Analytics - Periodo, Auto-refresh e CSV',
    items: [
      'Periodo 7/30/90 dias com janela daysWindow no store',
      'Auto-refresh configuravel (off/5/15 min) na pagina',
      'Exportacao CSV do trafego diario',
      'Testes estabilizados com mocks de fetch por chamada',
      'Banner de erro permanece visivel ate nova acao',
    ],
  },
  {
    version: '0.7.0',
    date: '2026-03-18',
    tag: 'feat',
    title: 'Admin Dashboard — Versão Estável',
    items: [
      'Dashboard com KPIs em tempo real (tarefas, bugs, erros, simulações hoje)',
      'Feed de atividade recente unificado (bugs, tarefas, erros, simulações)',
      'Painel de analytics com sparkline de visitantes Cloudflare',
      'Sidebar com versão atualizada para v0.7.0',
    ],
  },
  {
    version: '0.7.0-alpha.7',
    date: '2026-03-18',
    tag: 'feat',
    title: 'Admin Dashboard Fase 7 — Flags, Changelog e Health',
    items: [
      'Feature flags com toggle em runtime + hook useFeatureFlag()',
      'Changelog visual com histórico completo v0.3.0 → v0.7.0',
      'Health check: localStorage, stores, bundle e navegador',
      'Persistência migrada para versão 2 com merge automático de novas flags',
    ],
  },
  {
    version: '0.7.0-alpha.6',
    date: '2026-03-18',
    tag: 'feat',
    title: 'Admin Dashboard Fase 6 — Analytics Cloudflare',
    items: [
      'Integração com Cloudflare GraphQL Analytics API',
      'Gráficos SVG de pageviews e visitantes únicos (7 dias)',
      'Web Vitals: LCP, INP e CLS com semáforo de qualidade',
      'Setup form com token + Zone ID persistidos no localStorage',
      '28 testes cobrindo store, fetchData e todos os estados da página',
    ],
  },
  {
    version: '0.7.0-alpha.5',
    date: '2026-03-18',
    tag: 'feat',
    title: 'Admin Dashboard Fase 5 — Estatísticas de Uso',
    items: [
      'usage-store com rastreamento por material, operação e ferramenta',
      'Hook trackUsage() integrado ao calcular() do machining-store',
      'Página com top 10 de cada categoria via MiniChart SVG',
      'MiniChart reutilizável (horizontal bar, cor configurável)',
      '16 testes cobrindo store e página',
    ],
  },
  {
    version: '0.7.0-alpha.4',
    date: '2026-03-17',
    tag: 'feat',
    title: 'Admin Dashboard Fase 4 — Error Tracking',
    items: [
      'installErrorTracker(): captura window.onerror e unhandledrejection',
      'Deduplicação de erros por mensagem + source (count++)',
      'Página AdminErrorsPage com stack trace colapsável',
      'ErrorEntry component com badge de severidade',
      '20 testes',
    ],
  },
  {
    version: '0.7.0-alpha.3',
    date: '2026-03-17',
    tag: 'feat',
    title: 'Admin Dashboard Fase 3 — Inbox de Bugs',
    items: [
      'BugReportButton agora salva no admin-store além do mailto',
      'AdminInboxPage com lista filtável por status',
      'BugReportCard com app state colapsável e gestão de status',
      '18 testes cobrindo fluxo completo',
    ],
  },
  {
    version: '0.7.0-alpha.2',
    date: '2026-03-17',
    tag: 'feat',
    title: 'Admin Dashboard Fase 2 — Tarefas + Auto-Sync',
    items: [
      'CRUD completo de tarefas/requisições com filtros por status e prioridade',
      'AdminModal reutilizável via createPortal',
      'vite-plugin-admin-sync: salva tarefas em docs/admin-requests.json no filesystem',
      'Claude lê o JSON automaticamente no início de cada sessão',
      'Fix HMR loop: docs/admin-requests.json em watch.ignored + unwatch()',
    ],
  },
  {
    version: '0.7.0-alpha.1',
    date: '2026-03-17',
    tag: 'feat',
    title: 'Admin Dashboard Fase 1 — Fundação',
    items: [
      'Layout completo: AdminLayout, AdminSidebar, AdminHeader',
      'AdminStore Zustand com persist (tasks, bugs, errors, flags)',
      '9 rotas lazy-loaded em /admin/*',
      'Dashboard com 4 KPI cards + quick links grid',
      'KpiCard e StatusBadge reutilizáveis',
      '17 testes cobrindo store e layout',
    ],
  },
  {
    version: '0.6.0',
    date: '2026-03-15',
    tag: 'infra',
    title: 'Reestruturação Documental',
    items: [
      'Phase 1: Archive de sessions, stories e planos concluídos',
      'Phase 2: Eliminação de duplicatas e update de referências',
      'Phase 3: Trim PROXIMA_SESSAO + limpeza de workflows',
      'Phase 4: Update refs + bump v0.6.0',
    ],
  },
  {
    version: '0.5.2',
    date: '2026-03-13',
    tag: 'polish',
    title: 'Favicon + Ícones PWA e Electron',
    items: [
      'Favicon para web (16×16 a 512×512) gerado com sharp',
      'Ícone .ico para o .exe Electron via png-to-ico',
      'Manifest PWA atualizado com todos os tamanhos',
    ],
  },
  {
    version: '0.5.1',
    date: '2026-03-13',
    tag: 'fix',
    title: 'Fix BugReportModal',
    items: [
      'Card do modal agora opaco (sem glassmorphism que ocultava conteúdo)',
      'maxLength 500 chars no textarea',
      'Ordem correta de onClose/mailto ao enviar',
    ],
  },
  {
    version: '0.5.0',
    date: '2026-03-11',
    tag: 'feat',
    title: '3 Gauges + Logo Real + BugReportButton',
    items: [
      'Feed Headroom Gauge (margem de avanço até o limite da máquina)',
      'MRR Gauge (taxa de remoção de material em cm³/min)',
      'Tool Health Gauge (saúde estimada da ferramenta por L/D e ae)',
      'Logo real substituindo placeholder',
      'BugReportButton com modal mailto + rastreamento Plausible',
    ],
  },
  {
    version: '0.4.3',
    date: '2026-03-09',
    tag: 'fix',
    title: 'Fix: Thumb slider double-translation Tailwind v4',
    items: [
      'Thumb do slider usava -translate-x-1/2 (CSS translate) + style.transform simultaneamente',
      'Tailwind v4 gera translate standalone incompatível com transform inline',
      'Solução: usar apenas style={{ transform }} em todos os 3 componentes de slider',
      'Track margin unificado em mx-[18px] para clearance simétrico',
    ],
  },
  {
    version: '0.4.2',
    date: '2026-03-08',
    tag: 'feat',
    title: 'Unificação de Indicadores de Ajuste Fino',
    items: [
      'ParameterHealthBar unificado: 4 indicadores unidirecionais (Vc, fz, ae, ap)',
      'Funções puras computeVc/Fz/Ae/ApByValue com bounds dinâmicos',
      'CTF badge em fz quando ctf > 1.0',
      'L/D > 6 → ap BLOQUEADO',
      'ZONE_RGB lookup estático — cores via style={} inline',
    ],
  },
  {
    version: '0.4.1',
    date: '2026-03-07',
    tag: 'feat',
    title: 'Slider Bounds Dinâmicos',
    items: [
      'calcularSliderBounds() por material/operação/ferramenta',
      'Fine-tune panel usa bounds reais em vez de hardcodados',
      'Bounds refletem Vc, fz, ae, ap recomendados para cada contexto',
    ],
  },
  {
    version: '0.4.0',
    date: '2026-03-05',
    tag: 'feat',
    title: 'Histórico de Simulações + Analytics',
    items: [
      'History store: últimas 50 simulações persistidas',
      'HistoryPanel com tabela, filtros e export CSV',
      'Analytics básico: contagem por material e operação',
      'S6 concluída',
    ],
  },
  {
    version: '0.3.4',
    date: '2026-03-03',
    tag: 'fix',
    title: 'Auditoria — Fix UX Ajuste Fino',
    items: [
      'ajustarParametros chama calcular() imediato sem zerar resultado',
      'Feedback visual de reset melhorado (use-reset-feedback hook)',
      'Animação subtlePulse nos resultados pós-simulação',
    ],
  },
  {
    version: '0.3.0',
    date: '2026-02-28',
    tag: 'feat',
    title: 'Deploy Cloudflare + CI/CD + SEO',
    items: [
      'Worker Cloudflare LIVE com SPA routing',
      'GitHub Actions: deploy automático ao push para main',
      'Domínios custom: tooloptimizercnc.com.br + app.tooloptimizercnc.com.br',
      'Meta tags SEO, Open Graph e sitemap.xml',
      'ADRs: S1 (Limpeza), S2 (Deploy CF), S3 (CI/CD), S4 (SEO)',
    ],
  },
];

