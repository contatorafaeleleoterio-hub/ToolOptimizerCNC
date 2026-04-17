export type NodeCategory =
  | 'entry'
  | 'page'
  | 'component'
  | 'store'
  | 'engine'
  | 'data'
  | 'hook'
  | 'type'
  | 'util';

export type ArchGroupId =
  | 'entry'
  | 'pages'
  | 'components'
  | 'stores'
  | 'engine'
  | 'data'
  | 'hooks'
  | 'types';

export type ArchEdgeType = 'import' | 'data-flow' | 'state' | 'renders';

export interface ArchNode {
  id: string;
  label: string;
  labelPt: string;
  category: NodeCategory;
  filePath: string;
  lines: number;
  level: 2;
  group: ArchGroupId;
}

export interface ArchEdge {
  from: string;
  to: string;
  type: ArchEdgeType;
  label?: string;
  level: 1 | 2;
  animated?: boolean;
}

export interface ArchGroup {
  id: ArchGroupId;
  label: string;
  labelPt: string;
  category: NodeCategory;
  nodeIds: string[];
  position: { x: number; y: number };
  color: string;
}

export interface ArchGraph {
  nodes: ArchNode[];
  edges: ArchEdge[];
  groups: ArchGroup[];
  metadata: {
    version: string;
    totalFiles: number;
    totalLines: number;
    lastUpdated: string;
  };
}

export const CATEGORY_COLORS: Record<NodeCategory, string> = {
  entry: '#00D9FF',
  page: '#A855F7',
  component: '#00D9FF',
  store: '#39FF14',
  engine: '#F97316',
  data: '#F39C12',
  hook: '#A855F7',
  type: '#6B7280',
  util: '#94A3B8',
};

export const EDGE_COLORS: Record<ArchEdgeType, string> = {
  import: '#64748B',
  'data-flow': '#00D9FF',
  state: '#39FF14',
  renders: '#A855F7',
};

const FILE_LINES: Record<string, number> = {
  'src/App.tsx': 45,
  'src/main.tsx': 33,
  'src/components/bidirectional-slider.tsx': 223,
  'src/components/bug-report-button.tsx': 137,
  'src/components/config-panel.tsx': 183,
  'src/components/design-tokens.ts': 15,
  'src/components/disclaimer.tsx': 8,
  'src/components/export-buttons.tsx': 85,
  'src/components/fine-tune-panel.tsx': 171,
  'src/components/formula-card.tsx': 112,
  'src/components/gauge.tsx': 154,
  'src/components/mobile/mobile-config-section.tsx': 142,
  'src/components/mobile/mobile-fine-tune-section.tsx': 315,
  'src/components/mobile/mobile-header.tsx': 20,
  'src/components/mobile/mobile-results-section.tsx': 64,
  'src/components/parameter-health-bar.tsx': 344,
  'src/components/results-panel.tsx': 239,
  'src/components/seo-head.tsx': 61,
  'src/components/shared-result-parts.tsx': 129,
  'src/components/styled-slider.tsx': 108,
  'src/components/tool-summary-viewer.tsx': 42,
  'src/components/ui-helpers.tsx': 51,
  'src/components/viewport-redirect.tsx': 17,
  'src/components/architecture/arch-data-flow.tsx': 154,
  'src/components/architecture/arch-edge.tsx': 59,
  'src/components/architecture/arch-group.tsx': 82,
  'src/components/architecture/arch-legend.tsx': 60,
  'src/components/architecture/arch-node.tsx': 90,
  'src/components/architecture/arch-tooltip.tsx': 41,
  'src/components/architecture/architecture-map.tsx': 377,
  'src/components/architecture/mobile-architecture-view.tsx': 157,
  'src/components/architecture/mobile-arch-group-card.tsx': 76,
  'src/components/architecture/mobile-arch-node-list.tsx': 140,
  'src/components/architecture/mobile-arch-data-flow.tsx': 127,
  'src/data/index.ts': 3,
  'src/data/materials.ts': 138,
  'src/data/operations.ts': 35,
  'src/data/tools.ts': 39,
  'src/data/architecture-graph.ts': 379,
  'src/engine/chip-thinning.ts': 58,
  'src/engine/feed.ts': 28,
  'src/engine/index.ts': 9,
  'src/engine/power.ts': 70,
  'src/engine/recommendations.ts': 305,
  'src/engine/rpm.ts': 20,
  'src/engine/slider-bounds.ts': 143,
  'src/engine/validators.ts': 94,
  'src/hooks/use-is-mobile.ts': 20,
  'src/hooks/use-page-title.ts': 14,
  'src/hooks/use-plausible.ts': 38,
  'src/hooks/use-reset-feedback.ts': 57,
  'src/hooks/use-simulation-animation.ts': 36,
  'src/pages/history-page.tsx': 407,
  'src/pages/mobile-page.tsx': 58,
  'src/pages/settings-page.tsx': 1093,
  'src/pages/architecture-page.tsx': 57,
  'src/store/history-store.ts': 121,
  'src/store/index.ts': 2,
  'src/store/machining-store.ts': 469,
  'src/types/index.ts': 232,
  'src/utils/health-score.ts': 162,
  'src/admin/components/activity-feed.tsx': 145,
  'src/admin/components/admin-modal.tsx': 70,
  'src/admin/components/bug-report-card.tsx': 118,
  'src/admin/components/error-entry.tsx': 84,
  'src/admin/components/kpi-card.tsx': 71,
  'src/admin/components/mini-chart.tsx': 75,
  'src/admin/components/status-badge.tsx': 67,
  'src/admin/components/task-card.tsx': 97,
  'src/admin/data/changelog-data.ts': 251,
  'src/admin/hooks/use-error-tracker.ts': 64,
  'src/admin/hooks/use-feature-flag.ts': 16,
  'src/admin/layout/admin-header.tsx': 24,
  'src/admin/layout/admin-layout.tsx': 23,
  'src/admin/layout/admin-sidebar.tsx': 63,
  'src/admin/pages/admin-analytics-page.tsx': 466,
  'src/admin/pages/admin-changelog-page.tsx': 154,
  'src/admin/pages/admin-dashboard-page.tsx': 205,
  'src/admin/pages/admin-errors-page.tsx': 198,
  'src/admin/pages/admin-flags-page.tsx': 117,
  'src/admin/pages/admin-health-page.tsx': 241,
  'src/admin/pages/admin-inbox-page.tsx': 229,
  'src/admin/pages/admin-tasks-page.tsx': 461,
  'src/admin/pages/admin-usage-page.tsx': 138,
  'src/admin/store/admin-store.ts': 197,
  'src/admin/store/analytics-store.ts': 120,
  'src/admin/store/usage-store.ts': 71,
  'src/admin/types/admin-types.ts': 142,
  'src/admin/utils/cf-analytics-client.ts': 178,
  'src/admin/utils/format-admin.ts': 46,
  'src/admin/vite-plugin-admin-sync.ts': 63,
  'src/components/collapsible-section.tsx': 53,
  'src/components/half-moon-gauge.tsx': 174,
  'src/components/segmented-gradient-bar.tsx': 239,
  'src/components/sidebar-footer.tsx': 52,
  'src/components/slider-tokens.ts': 17,
  'src/vite-env.d.ts': 3,
};

interface NodeSeed {
  id: string;
  labelPt: string;
  category: NodeCategory;
  filePath: string;
  group: ArchGroupId;
}

const NODE_SEEDS: NodeSeed[] = [
  { id: 'main', labelPt: 'Entrada React com roteamento SPA', category: 'entry', filePath: 'src/main.tsx', group: 'entry' },
  { id: 'app', labelPt: 'Dashboard desktop principal', category: 'entry', filePath: 'src/App.tsx', group: 'entry' },

  { id: 'history-page', labelPt: 'Pagina do historico de simulacoes', category: 'page', filePath: 'src/pages/history-page.tsx', group: 'pages' },
  { id: 'mobile-page', labelPt: 'Pagina mobile principal', category: 'page', filePath: 'src/pages/mobile-page.tsx', group: 'pages' },
  { id: 'settings-page', labelPt: 'Pagina de configuracoes do sistema', category: 'page', filePath: 'src/pages/settings-page.tsx', group: 'pages' },
  { id: 'architecture-page', labelPt: 'Pagina do mapa interativo da arquitetura', category: 'page', filePath: 'src/pages/architecture-page.tsx', group: 'pages' },

  { id: 'bidirectional-slider', labelPt: 'Slider de ajuste bidirecional', category: 'component', filePath: 'src/components/bidirectional-slider.tsx', group: 'components' },
  { id: 'bug-report-button', labelPt: 'Acao de reportar bug', category: 'component', filePath: 'src/components/bug-report-button.tsx', group: 'components' },
  { id: 'config-panel', labelPt: 'Painel de entrada de parametros', category: 'component', filePath: 'src/components/config-panel.tsx', group: 'components' },
  { id: 'design-tokens', labelPt: 'Tokens visuais compartilhados', category: 'util', filePath: 'src/components/design-tokens.ts', group: 'components' },
  { id: 'disclaimer', labelPt: 'Aviso final da aplicacao', category: 'component', filePath: 'src/components/disclaimer.tsx', group: 'components' },
  { id: 'export-buttons', labelPt: 'Acoes de historico, mapa e configuracoes', category: 'component', filePath: 'src/components/export-buttons.tsx', group: 'components' },
  { id: 'fine-tune-panel', labelPt: 'Painel de ajuste fino dos parametros', category: 'component', filePath: 'src/components/fine-tune-panel.tsx', group: 'components' },
  { id: 'formula-card', labelPt: 'Card de formulas e calculos', category: 'component', filePath: 'src/components/formula-card.tsx', group: 'components' },
  { id: 'gauge', labelPt: 'Gauge SVG de indicadores', category: 'component', filePath: 'src/components/gauge.tsx', group: 'components' },
  { id: 'mobile-config-section', labelPt: 'Secao mobile de configuracao', category: 'component', filePath: 'src/components/mobile/mobile-config-section.tsx', group: 'components' },
  { id: 'mobile-fine-tune-section', labelPt: 'Secao mobile de ajuste fino', category: 'component', filePath: 'src/components/mobile/mobile-fine-tune-section.tsx', group: 'components' },
  { id: 'mobile-header', labelPt: 'Header mobile da aplicacao', category: 'component', filePath: 'src/components/mobile/mobile-header.tsx', group: 'components' },
  { id: 'mobile-results-section', labelPt: 'Secao mobile de resultados', category: 'component', filePath: 'src/components/mobile/mobile-results-section.tsx', group: 'components' },
  { id: 'parameter-health-bar', labelPt: 'Indicador de saude dos parametros', category: 'component', filePath: 'src/components/parameter-health-bar.tsx', group: 'components' },
  { id: 'results-panel', labelPt: 'Painel principal de resultados', category: 'component', filePath: 'src/components/results-panel.tsx', group: 'components' },
  { id: 'seo-head', labelPt: 'Metadados SEO das paginas', category: 'util', filePath: 'src/components/seo-head.tsx', group: 'components' },
  { id: 'shared-result-parts', labelPt: 'Blocos compartilhados de resultado', category: 'component', filePath: 'src/components/shared-result-parts.tsx', group: 'components' },
  { id: 'styled-slider', labelPt: 'Slider estilizado reutilizavel', category: 'component', filePath: 'src/components/styled-slider.tsx', group: 'components' },
  { id: 'tool-summary-viewer', labelPt: 'Resumo visual da ferramenta', category: 'component', filePath: 'src/components/tool-summary-viewer.tsx', group: 'components' },
  { id: 'ui-helpers', labelPt: 'Helpers de campos de interface', category: 'component', filePath: 'src/components/ui-helpers.tsx', group: 'components' },
  { id: 'viewport-redirect', labelPt: 'Redirecionamento entre desktop e mobile', category: 'util', filePath: 'src/components/viewport-redirect.tsx', group: 'components' },
  { id: 'arch-data-flow', labelPt: 'Overlay do fluxo de dados do calculo', category: 'component', filePath: 'src/components/architecture/arch-data-flow.tsx', group: 'components' },
  { id: 'arch-edge', labelPt: 'Aresta SVG entre elementos do mapa', category: 'component', filePath: 'src/components/architecture/arch-edge.tsx', group: 'components' },
  { id: 'arch-group', labelPt: 'Card de grupo do mapa arquitetural', category: 'component', filePath: 'src/components/architecture/arch-group.tsx', group: 'components' },
  { id: 'arch-legend', labelPt: 'Legenda fixa do mapa arquitetural', category: 'component', filePath: 'src/components/architecture/arch-legend.tsx', group: 'components' },
  { id: 'arch-node', labelPt: 'Node SVG de arquivo individual', category: 'component', filePath: 'src/components/architecture/arch-node.tsx', group: 'components' },
  { id: 'arch-tooltip', labelPt: 'Tooltip de node do mapa arquitetural', category: 'component', filePath: 'src/components/architecture/arch-tooltip.tsx', group: 'components' },
  { id: 'architecture-map', labelPt: 'Orquestrador visual do mapa de arquitetura', category: 'component', filePath: 'src/components/architecture/architecture-map.tsx', group: 'components' },
  { id: 'mobile-architecture-view', labelPt: 'Vista mobile do mapa arquitetural', category: 'component', filePath: 'src/components/architecture/mobile-architecture-view.tsx', group: 'components' },
  { id: 'mobile-arch-group-card', labelPt: 'Card de grupo para vista mobile', category: 'component', filePath: 'src/components/architecture/mobile-arch-group-card.tsx', group: 'components' },
  { id: 'mobile-arch-node-list', labelPt: 'Lista de nodes por grupo no mobile', category: 'component', filePath: 'src/components/architecture/mobile-arch-node-list.tsx', group: 'components' },
  { id: 'mobile-arch-data-flow', labelPt: 'Overlay do fluxo de dados para mobile', category: 'component', filePath: 'src/components/architecture/mobile-arch-data-flow.tsx', group: 'components' },

  { id: 'store-index', labelPt: 'Barrel das stores Zustand', category: 'store', filePath: 'src/store/index.ts', group: 'stores' },
  { id: 'history-store', labelPt: 'Store do historico de calculos', category: 'store', filePath: 'src/store/history-store.ts', group: 'stores' },
  { id: 'machining-store', labelPt: 'Store central com o pipeline calcular', category: 'store', filePath: 'src/store/machining-store.ts', group: 'stores' },

  { id: 'engine-index', labelPt: 'Barrel do motor de calculo', category: 'engine', filePath: 'src/engine/index.ts', group: 'engine' },
  { id: 'chip-thinning', labelPt: 'Correcao de chip thinning', category: 'engine', filePath: 'src/engine/chip-thinning.ts', group: 'engine' },
  { id: 'feed', labelPt: 'Calculo de avanco por dente', category: 'engine', filePath: 'src/engine/feed.ts', group: 'engine' },
  { id: 'power', labelPt: 'Calculos de potencia e torque', category: 'engine', filePath: 'src/engine/power.ts', group: 'engine' },
  { id: 'recommendations', labelPt: 'Recomendacoes automaticas por material', category: 'engine', filePath: 'src/engine/recommendations.ts', group: 'engine' },
  { id: 'rpm', labelPt: 'Calculo de rpm nominal', category: 'engine', filePath: 'src/engine/rpm.ts', group: 'engine' },
  { id: 'slider-bounds', labelPt: 'Limites dinamicos dos sliders', category: 'engine', filePath: 'src/engine/slider-bounds.ts', group: 'engine' },
  { id: 'validators', labelPt: 'Validacoes de entrada e limites', category: 'engine', filePath: 'src/engine/validators.ts', group: 'engine' },
  { id: 'health-score', labelPt: 'Score de saude e zonas de risco', category: 'util', filePath: 'src/utils/health-score.ts', group: 'engine' },

  { id: 'data-index', labelPt: 'Barrel dos dados estaticos', category: 'data', filePath: 'src/data/index.ts', group: 'data' },
  { id: 'materials', labelPt: 'Tabela base de materiais', category: 'data', filePath: 'src/data/materials.ts', group: 'data' },
  { id: 'operations', labelPt: 'Tabela de operacoes de usinagem', category: 'data', filePath: 'src/data/operations.ts', group: 'data' },
  { id: 'tools', labelPt: 'Tabela de geometrias e diametros', category: 'data', filePath: 'src/data/tools.ts', group: 'data' },
  { id: 'architecture-graph', labelPt: 'Fonte manual do grafo arquitetural', category: 'data', filePath: 'src/data/architecture-graph.ts', group: 'data' },

  { id: 'use-is-mobile', labelPt: 'Hook para detectar viewport mobile', category: 'hook', filePath: 'src/hooks/use-is-mobile.ts', group: 'hooks' },
  { id: 'use-page-title', labelPt: 'Hook para atualizar o titulo da pagina', category: 'hook', filePath: 'src/hooks/use-page-title.ts', group: 'hooks' },
  { id: 'use-plausible', labelPt: 'Hook de analytics Plausible', category: 'hook', filePath: 'src/hooks/use-plausible.ts', group: 'hooks' },
  { id: 'use-reset-feedback', labelPt: 'Hook de feedback visual de reset', category: 'hook', filePath: 'src/hooks/use-reset-feedback.ts', group: 'hooks' },
  { id: 'use-simulation-animation', labelPt: 'Hook de animacao da simulacao', category: 'hook', filePath: 'src/hooks/use-simulation-animation.ts', group: 'hooks' },

  { id: 'types-index', labelPt: 'Tipos compartilhados do dominio', category: 'type', filePath: 'src/types/index.ts', group: 'types' },
  { id: 'admin-activity-feed', labelPt: 'Admin activity feed', category: 'component', filePath: 'src/admin/components/activity-feed.tsx', group: 'components' },
  { id: 'admin-admin-modal', labelPt: 'Admin admin modal', category: 'component', filePath: 'src/admin/components/admin-modal.tsx', group: 'components' },
  { id: 'admin-bug-report-card', labelPt: 'Admin bug report card', category: 'component', filePath: 'src/admin/components/bug-report-card.tsx', group: 'components' },
  { id: 'admin-error-entry', labelPt: 'Admin error entry', category: 'component', filePath: 'src/admin/components/error-entry.tsx', group: 'components' },
  { id: 'admin-kpi-card', labelPt: 'Admin kpi card', category: 'component', filePath: 'src/admin/components/kpi-card.tsx', group: 'components' },
  { id: 'admin-mini-chart', labelPt: 'Admin mini chart', category: 'component', filePath: 'src/admin/components/mini-chart.tsx', group: 'components' },
  { id: 'admin-status-badge', labelPt: 'Admin status badge', category: 'component', filePath: 'src/admin/components/status-badge.tsx', group: 'components' },
  { id: 'admin-task-card', labelPt: 'Admin task card', category: 'component', filePath: 'src/admin/components/task-card.tsx', group: 'components' },
  { id: 'admin-changelog-data', labelPt: 'Admin changelog data', category: 'data', filePath: 'src/admin/data/changelog-data.ts', group: 'data' },
  { id: 'admin-use-error-tracker', labelPt: 'Admin use error tracker', category: 'hook', filePath: 'src/admin/hooks/use-error-tracker.ts', group: 'hooks' },
  { id: 'admin-use-feature-flag', labelPt: 'Admin use feature flag', category: 'hook', filePath: 'src/admin/hooks/use-feature-flag.ts', group: 'hooks' },
  { id: 'admin-admin-header', labelPt: 'Admin admin header', category: 'component', filePath: 'src/admin/layout/admin-header.tsx', group: 'components' },
  { id: 'admin-admin-layout', labelPt: 'Admin admin layout', category: 'component', filePath: 'src/admin/layout/admin-layout.tsx', group: 'components' },
  { id: 'admin-admin-sidebar', labelPt: 'Admin admin sidebar', category: 'component', filePath: 'src/admin/layout/admin-sidebar.tsx', group: 'components' },
  { id: 'admin-admin-analytics-page', labelPt: 'Admin admin analytics page', category: 'page', filePath: 'src/admin/pages/admin-analytics-page.tsx', group: 'pages' },
  { id: 'admin-admin-changelog-page', labelPt: 'Admin admin changelog page', category: 'page', filePath: 'src/admin/pages/admin-changelog-page.tsx', group: 'pages' },
  { id: 'admin-admin-dashboard-page', labelPt: 'Admin admin dashboard page', category: 'page', filePath: 'src/admin/pages/admin-dashboard-page.tsx', group: 'pages' },
  { id: 'admin-admin-errors-page', labelPt: 'Admin admin errors page', category: 'page', filePath: 'src/admin/pages/admin-errors-page.tsx', group: 'pages' },
  { id: 'admin-admin-flags-page', labelPt: 'Admin admin flags page', category: 'page', filePath: 'src/admin/pages/admin-flags-page.tsx', group: 'pages' },
  { id: 'admin-admin-health-page', labelPt: 'Admin admin health page', category: 'page', filePath: 'src/admin/pages/admin-health-page.tsx', group: 'pages' },
  { id: 'admin-admin-inbox-page', labelPt: 'Admin admin inbox page', category: 'page', filePath: 'src/admin/pages/admin-inbox-page.tsx', group: 'pages' },
  { id: 'admin-admin-tasks-page', labelPt: 'Admin admin tasks page', category: 'page', filePath: 'src/admin/pages/admin-tasks-page.tsx', group: 'pages' },
  { id: 'admin-admin-usage-page', labelPt: 'Admin admin usage page', category: 'page', filePath: 'src/admin/pages/admin-usage-page.tsx', group: 'pages' },
  { id: 'admin-admin-store', labelPt: 'Admin admin store', category: 'store', filePath: 'src/admin/store/admin-store.ts', group: 'stores' },
  { id: 'admin-analytics-store', labelPt: 'Admin analytics store', category: 'store', filePath: 'src/admin/store/analytics-store.ts', group: 'stores' },
  { id: 'admin-usage-store', labelPt: 'Admin usage store', category: 'store', filePath: 'src/admin/store/usage-store.ts', group: 'stores' },
  { id: 'admin-admin-types', labelPt: 'Admin admin types', category: 'type', filePath: 'src/admin/types/admin-types.ts', group: 'types' },
  { id: 'admin-cf-analytics-client', labelPt: 'Admin cf analytics client', category: 'util', filePath: 'src/admin/utils/cf-analytics-client.ts', group: 'components' },
  { id: 'admin-format-admin', labelPt: 'Admin format admin', category: 'util', filePath: 'src/admin/utils/format-admin.ts', group: 'components' },
  { id: 'admin-vite-plugin-admin-sync', labelPt: 'Admin vite plugin admin sync', category: 'util', filePath: 'src/admin/vite-plugin-admin-sync.ts', group: 'components' },
  { id: 'collapsible-section', labelPt: 'collapsible section', category: 'component', filePath: 'src/components/collapsible-section.tsx', group: 'components' },
  { id: 'half-moon-gauge', labelPt: 'half moon gauge', category: 'component', filePath: 'src/components/half-moon-gauge.tsx', group: 'components' },
  { id: 'segmented-gradient-bar', labelPt: 'segmented gradient bar', category: 'component', filePath: 'src/components/segmented-gradient-bar.tsx', group: 'components' },
  { id: 'sidebar-footer', labelPt: 'sidebar footer', category: 'component', filePath: 'src/components/sidebar-footer.tsx', group: 'components' },
  { id: 'slider-tokens', labelPt: 'slider tokens', category: 'util', filePath: 'src/components/slider-tokens.ts', group: 'components' },
  { id: 'vite-env.d', labelPt: 'vite env.d', category: 'type', filePath: 'src/vite-env.d.ts', group: 'types' },
];

const NODES: ArchNode[] = NODE_SEEDS.map((seed) => ({
  ...seed,
  label: seed.filePath.split('/').pop() ?? seed.id,
  lines: FILE_LINES[seed.filePath] ?? 0,
  level: 2,
}));

const GROUP_LAYOUT: Omit<ArchGroup, 'nodeIds'>[] = [
  { id: 'entry', label: 'Entry', labelPt: 'Entrada', category: 'entry', position: { x: 180, y: 90 }, color: '#00D9FF' },
  { id: 'pages', label: 'Pages', labelPt: 'Rotas', category: 'page', position: { x: 620, y: 90 }, color: '#A855F7' },
  { id: 'components', label: 'Components', labelPt: 'Componentes UI', category: 'component', position: { x: 80, y: 300 }, color: '#00D9FF' },
  { id: 'stores', label: 'Stores', labelPt: 'Estado', category: 'store', position: { x: 420, y: 300 }, color: '#39FF14' },
  { id: 'engine', label: 'Engine', labelPt: 'Calculo', category: 'engine', position: { x: 760, y: 300 }, color: '#F97316' },
  { id: 'hooks', label: 'Hooks', labelPt: 'Hooks', category: 'hook', position: { x: 80, y: 540 }, color: '#A855F7' },
  { id: 'data', label: 'Data', labelPt: 'Dados', category: 'data', position: { x: 420, y: 540 }, color: '#F39C12' },
  { id: 'types', label: 'Types', labelPt: 'Tipos', category: 'type', position: { x: 760, y: 540 }, color: '#6B7280' },
];

const GROUPS: ArchGroup[] = GROUP_LAYOUT.map((group) => ({
  ...group,
  nodeIds: NODES.filter((node) => node.group === group.id).map((node) => node.id),
}));

const LEVEL1_EDGES: ArchEdge[] = [
  { from: 'entry', to: 'pages', type: 'renders', label: 'routes', level: 1 },
  { from: 'entry', to: 'components', type: 'renders', label: 'renders', level: 1 },
  { from: 'pages', to: 'components', type: 'renders', label: 'compose', level: 1 },
  { from: 'pages', to: 'hooks', type: 'import', label: 'hooks', level: 1 },
  { from: 'pages', to: 'stores', type: 'state', label: 'state', level: 1 },
  { from: 'components', to: 'stores', type: 'state', label: 'zustand', level: 1 },
  { from: 'components', to: 'hooks', type: 'import', label: 'hooks', level: 1 },
  { from: 'components', to: 'data', type: 'import', label: 'tables', level: 1 },
  { from: 'components', to: 'types', type: 'import', label: 'types', level: 1 },
  { from: 'stores', to: 'engine', type: 'import', label: 'calcular()', level: 1 },
  { from: 'stores', to: 'data', type: 'import', label: 'lookup', level: 1 },
  { from: 'stores', to: 'types', type: 'import', label: 'contracts', level: 1 },
  { from: 'engine', to: 'data', type: 'import', label: 'inputs', level: 1 },
  { from: 'engine', to: 'types', type: 'import', label: 'contracts', level: 1 },
  { from: 'data', to: 'types', type: 'import', label: 'contracts', level: 1 },
];

const LEVEL2_EDGES: ArchEdge[] = [
  { from: 'main', to: 'app', type: 'renders', level: 2 },
  { from: 'main', to: 'viewport-redirect', type: 'renders', level: 2 },
  { from: 'main', to: 'history-page', type: 'renders', level: 2 },
  { from: 'main', to: 'mobile-page', type: 'renders', level: 2 },
  { from: 'main', to: 'settings-page', type: 'renders', level: 2 },
  { from: 'main', to: 'architecture-page', type: 'renders', level: 2 },

  { from: 'app', to: 'config-panel', type: 'renders', level: 2 },
  { from: 'app', to: 'results-panel', type: 'renders', level: 2 },
  { from: 'app', to: 'fine-tune-panel', type: 'renders', level: 2 },
  { from: 'app', to: 'export-buttons', type: 'renders', level: 2 },
  { from: 'app', to: 'disclaimer', type: 'renders', level: 2 },
  { from: 'app', to: 'seo-head', type: 'renders', level: 2 },
  { from: 'app', to: 'use-page-title', type: 'import', level: 2 },

  { from: 'export-buttons', to: 'bug-report-button', type: 'renders', level: 2 },
  { from: 'bug-report-button', to: 'export-buttons', type: 'import', level: 2 },
  { from: 'bug-report-button', to: 'use-plausible', type: 'import', level: 2 },
  { from: 'bug-report-button', to: 'store-index', type: 'state', level: 2 },

  { from: 'config-panel', to: 'ui-helpers', type: 'renders', level: 2 },
  { from: 'config-panel', to: 'data-index', type: 'import', level: 2 },
  { from: 'config-panel', to: 'store-index', type: 'state', level: 2 },
  { from: 'config-panel', to: 'use-plausible', type: 'import', level: 2 },
  { from: 'config-panel', to: 'use-simulation-animation', type: 'import', level: 2 },
  { from: 'config-panel', to: 'types-index', type: 'import', level: 2 },

  { from: 'fine-tune-panel', to: 'parameter-health-bar', type: 'renders', level: 2 },
  { from: 'fine-tune-panel', to: 'styled-slider', type: 'renders', level: 2 },
  { from: 'fine-tune-panel', to: 'data-index', type: 'import', level: 2 },
  { from: 'fine-tune-panel', to: 'engine-index', type: 'import', level: 2 },
  { from: 'fine-tune-panel', to: 'store-index', type: 'state', level: 2 },
  { from: 'fine-tune-panel', to: 'types-index', type: 'import', level: 2 },

  { from: 'results-panel', to: 'formula-card', type: 'renders', level: 2 },
  { from: 'results-panel', to: 'gauge', type: 'renders', level: 2 },
  { from: 'results-panel', to: 'shared-result-parts', type: 'renders', level: 2 },
  { from: 'results-panel', to: 'tool-summary-viewer', type: 'renders', level: 2 },
  { from: 'results-panel', to: 'use-simulation-animation', type: 'import', level: 2 },
  { from: 'results-panel', to: 'store-index', type: 'state', level: 2 },
  { from: 'results-panel', to: 'types-index', type: 'import', level: 2 },

  { from: 'shared-result-parts', to: 'bidirectional-slider', type: 'renders', level: 2 },
  { from: 'shared-result-parts', to: 'types-index', type: 'import', level: 2 },
  { from: 'tool-summary-viewer', to: 'store-index', type: 'state', level: 2 },
  { from: 'tool-summary-viewer', to: 'types-index', type: 'import', level: 2 },
  { from: 'gauge', to: 'use-simulation-animation', type: 'import', level: 2 },
  { from: 'parameter-health-bar', to: 'data-index', type: 'import', level: 2 },
  { from: 'parameter-health-bar', to: 'engine-index', type: 'import', level: 2 },
  { from: 'parameter-health-bar', to: 'store-index', type: 'state', level: 2 },
  { from: 'viewport-redirect', to: 'use-is-mobile', type: 'import', level: 2 },

  { from: 'mobile-page', to: 'mobile-header', type: 'renders', level: 2 },
  { from: 'mobile-page', to: 'mobile-config-section', type: 'renders', level: 2 },
  { from: 'mobile-page', to: 'mobile-results-section', type: 'renders', level: 2 },
  { from: 'mobile-page', to: 'mobile-fine-tune-section', type: 'renders', level: 2 },
  { from: 'mobile-page', to: 'disclaimer', type: 'renders', level: 2 },
  { from: 'mobile-page', to: 'seo-head', type: 'renders', level: 2 },
  { from: 'mobile-page', to: 'store-index', type: 'state', level: 2 },
  { from: 'mobile-page', to: 'use-page-title', type: 'import', level: 2 },
  { from: 'mobile-page', to: 'use-simulation-animation', type: 'import', level: 2 },

  { from: 'mobile-header', to: 'bug-report-button', type: 'renders', level: 2 },
  { from: 'mobile-config-section', to: 'ui-helpers', type: 'renders', level: 2 },
  { from: 'mobile-config-section', to: 'data-index', type: 'import', level: 2 },
  { from: 'mobile-config-section', to: 'store-index', type: 'state', level: 2 },
  { from: 'mobile-config-section', to: 'types-index', type: 'import', level: 2 },
  { from: 'mobile-results-section', to: 'gauge', type: 'renders', level: 2 },
  { from: 'mobile-results-section', to: 'shared-result-parts', type: 'renders', level: 2 },
  { from: 'mobile-results-section', to: 'tool-summary-viewer', type: 'renders', level: 2 },
  { from: 'mobile-results-section', to: 'store-index', type: 'state', level: 2 },
  { from: 'mobile-fine-tune-section', to: 'parameter-health-bar', type: 'renders', level: 2 },
  { from: 'mobile-fine-tune-section', to: 'ui-helpers', type: 'renders', level: 2 },
  { from: 'mobile-fine-tune-section', to: 'data-index', type: 'import', level: 2 },
  { from: 'mobile-fine-tune-section', to: 'engine-index', type: 'import', level: 2 },
  { from: 'mobile-fine-tune-section', to: 'store-index', type: 'state', level: 2 },
  { from: 'mobile-fine-tune-section', to: 'types-index', type: 'import', level: 2 },

  { from: 'history-page', to: 'seo-head', type: 'renders', level: 2 },
  { from: 'history-page', to: 'use-page-title', type: 'import', level: 2 },
  { from: 'history-page', to: 'use-plausible', type: 'import', level: 2 },
  { from: 'history-page', to: 'store-index', type: 'state', level: 2 },
  { from: 'history-page', to: 'types-index', type: 'import', level: 2 },

  { from: 'settings-page', to: 'seo-head', type: 'renders', level: 2 },
  { from: 'settings-page', to: 'styled-slider', type: 'renders', level: 2 },
  { from: 'settings-page', to: 'ui-helpers', type: 'renders', level: 2 },
  { from: 'settings-page', to: 'data-index', type: 'import', level: 2 },
  { from: 'settings-page', to: 'use-is-mobile', type: 'import', level: 2 },
  { from: 'settings-page', to: 'use-page-title', type: 'import', level: 2 },
  { from: 'settings-page', to: 'use-plausible', type: 'import', level: 2 },
  { from: 'settings-page', to: 'store-index', type: 'state', level: 2 },
  { from: 'settings-page', to: 'types-index', type: 'import', level: 2 },

  { from: 'architecture-page', to: 'seo-head', type: 'renders', level: 2 },
  { from: 'architecture-page', to: 'use-is-mobile', type: 'import', level: 2 },
  { from: 'architecture-page', to: 'use-page-title', type: 'import', level: 2 },
  { from: 'architecture-page', to: 'architecture-map', type: 'renders', level: 2 },
  { from: 'architecture-page', to: 'mobile-architecture-view', type: 'renders', level: 2 },

  { from: 'mobile-architecture-view', to: 'architecture-graph', type: 'import', level: 2 },
  { from: 'mobile-architecture-view', to: 'mobile-arch-group-card', type: 'renders', level: 2 },
  { from: 'mobile-architecture-view', to: 'mobile-arch-node-list', type: 'renders', level: 2 },
  { from: 'mobile-architecture-view', to: 'mobile-arch-data-flow', type: 'renders', level: 2 },
  { from: 'mobile-arch-group-card', to: 'architecture-graph', type: 'import', level: 2 },
  { from: 'mobile-arch-node-list', to: 'architecture-graph', type: 'import', level: 2 },

  { from: 'architecture-map', to: 'architecture-graph', type: 'import', level: 2 },
  { from: 'architecture-map', to: 'arch-data-flow', type: 'renders', level: 2 },
  { from: 'architecture-map', to: 'arch-edge', type: 'renders', level: 2 },
  { from: 'architecture-map', to: 'arch-group', type: 'renders', level: 2 },
  { from: 'architecture-map', to: 'arch-legend', type: 'renders', level: 2 },
  { from: 'architecture-map', to: 'arch-node', type: 'renders', level: 2 },
  { from: 'architecture-map', to: 'arch-tooltip', type: 'renders', level: 2 },
  { from: 'arch-group', to: 'architecture-graph', type: 'import', level: 2 },
  { from: 'arch-legend', to: 'architecture-graph', type: 'import', level: 2 },
  { from: 'arch-node', to: 'architecture-graph', type: 'import', level: 2 },
  { from: 'arch-edge', to: 'architecture-graph', type: 'import', level: 2 },
  { from: 'arch-tooltip', to: 'architecture-graph', type: 'import', level: 2 },

  { from: 'store-index', to: 'history-store', type: 'import', level: 2 },
  { from: 'store-index', to: 'machining-store', type: 'import', level: 2 },
  { from: 'history-store', to: 'types-index', type: 'import', level: 2 },
  { from: 'machining-store', to: 'data-index', type: 'import', level: 2 },
  { from: 'machining-store', to: 'engine-index', type: 'import', level: 2 },
  { from: 'machining-store', to: 'recommendations', type: 'import', level: 2 },
  { from: 'machining-store', to: 'history-store', type: 'state', level: 2 },
  { from: 'machining-store', to: 'types-index', type: 'import', level: 2 },
  { from: 'machining-store', to: 'health-score', type: 'import', level: 2 },

  { from: 'engine-index', to: 'chip-thinning', type: 'import', level: 2 },
  { from: 'engine-index', to: 'feed', type: 'import', level: 2 },
  { from: 'engine-index', to: 'power', type: 'import', level: 2 },
  { from: 'engine-index', to: 'recommendations', type: 'import', level: 2 },
  { from: 'engine-index', to: 'rpm', type: 'import', level: 2 },
  { from: 'engine-index', to: 'slider-bounds', type: 'import', level: 2 },
  { from: 'engine-index', to: 'validators', type: 'import', level: 2 },
  { from: 'slider-bounds', to: 'recommendations', type: 'import', level: 2 },
  { from: 'slider-bounds', to: 'types-index', type: 'import', level: 2 },
  { from: 'recommendations', to: 'types-index', type: 'import', level: 2 },
  { from: 'validators', to: 'types-index', type: 'import', level: 2 },

  { from: 'data-index', to: 'materials', type: 'import', level: 2 },
  { from: 'data-index', to: 'operations', type: 'import', level: 2 },
  { from: 'data-index', to: 'tools', type: 'import', level: 2 },
  { from: 'materials', to: 'types-index', type: 'import', level: 2 },
  { from: 'operations', to: 'types-index', type: 'import', level: 2 },
  { from: 'tools', to: 'types-index', type: 'import', level: 2 },

  { from: 'use-reset-feedback', to: 'store-index', type: 'state', level: 2 },
  { from: 'use-simulation-animation', to: 'store-index', type: 'state', level: 2 },
  { from: 'use-simulation-animation', to: 'types-index', type: 'import', level: 2 },
];

const totalLines = Object.values(FILE_LINES).reduce((sum, value) => sum + value, 0);

export const ARCHITECTURE_GRAPH: ArchGraph = {
  nodes: NODES,
  edges: [...LEVEL1_EDGES, ...LEVEL2_EDGES],
  groups: GROUPS,
  metadata: {
    version: '0.11.0',
    totalFiles: Object.keys(FILE_LINES).length,
    totalLines,
    lastUpdated: '2026-04-06',
  },
};
