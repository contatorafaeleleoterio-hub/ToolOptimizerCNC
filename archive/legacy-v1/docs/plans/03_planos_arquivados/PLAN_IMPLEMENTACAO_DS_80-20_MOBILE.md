# Plano — Implementação Design System + Redesign 80/20 + Mobile + Dívida Visual

> **Criado:** 05/08/2026 · **Status:** aprovado para execução (8 sessões) · **Versão alvo:** MINOR (0.11.0 → 0.12.0)
> **Absorve** o item "Redesign Calculadora 80/20" do backlog (S1-S3 viram Sessões 3-5 deste plano).

## Contexto

O Design System Canônico (`docs/_canonicos/DESIGN-SYSTEM.html`, 02/08/2026) catalogou 21 itens de dívida visual mas nenhuma correção foi aplicada ao código. Existe também o redesign 80/20 aprovado (`docs/plans/REDESIGN_DASHBOARD_80-20.md` v3 + mockup `docs/design/mockup-redesign-80-20.html`, commitado 01/08) que simplifica o painel de ~45-50 para ~15-18 elementos — nunca implementado. Este plano une os dois: implementa o design system no app real, adota o mockup de simplificação, **estende o redesign ao mobile** (o plano original era desktop-only; Rafael pediu prioridade mobile) e corrige os 21 itens de dívida.

**Decisões confirmadas pelo Rafael (05/08/2026):**
- Dívida visual: blocos 1+2+3 completos (inclui refactor de modais/acordeões).
- Mobile: MiniResultBar (indicadores lineares) também na aba Resultados (hoje só na aba Ajustar).
- Desktop: manter os **3 gauges** (Avanço, MRR, Saúde) do mockup — atende o mínimo de 2 pedido.
- Admin (`/admin`) fora de escopo (3 itens de dívida admin ficam; é ferramenta interna + território do Codex).

**Prioridade mobile:** honrada com 2 sessões dedicadas (6-7), indicadores novos na aba Resultados, 6 arquivos de teste novos para componentes mobile hoje sem cobertura, alvos ≥44px, estado vazio honesto e snap de escala. Mobile vem DEPOIS do desktop na ordem porque reusa os componentes base (acordeão/modal unificados) e as decisões do 80/20 já validadas — evita refatorar cada tela duas vezes.

**Baseline:** 1052 testes verdes, TS zero erros, v0.11.0. Verificação por sessão: `npx vitest run tests/` (NUNCA `npm test`) + `npx tsc --noEmit` + `npx vite build` → commit convencional → push (deploy Cloudflare automático).

## Sequência (por quê desta ordem)

Limpeza (B1) → componentes base Modal/Acordeão (B3 estrutural) → redesign desktop S1→S2→S3 → mobile → snap de escala (B2) → docs/bump.

- B1 primeiro: zero risco, remove código morto antes que gere retrabalho.
- Modal/Acordeão ANTES do redesign: S1 precisa de acordeão ("Ajuste avançado"), S2 também ("Detalhes ▾"), mobile-config idem. Criar depois = refatorar 3 telas duas vezes.
- Dívida que vive em `results-panel.tsx`/`mobile-results-section.tsx` (ciano duplicado, torque, `#0f1419`, alphas) é corrigida DENTRO da reescrita dessas telas — nunca antes.
- B2 (find/replace visual) por último: feito antes conflitaria linha a linha com o redesign.

---

## Sessão 1 — Dívida Bloco 1: limpeza zero-risco

Arquivos: `src/components/gauge.tsx` (deletar), `tests/components/gauge.test.tsx` (deletar), `src/data/architecture-graph.ts`, `src/index.css`, `src/components/parameter-health-bar.tsx` + teste, `src/main.tsx`, `src/pages/privacy-policy-page.tsx`, `src/components/modals/favorite-edit-modal.tsx`.

1. Deletar `gauge.tsx` + teste (teste roda contra código morto). Atualizar `architecture-graph.ts` em **duas listas**: o nó (`~210`) **e** a entrada do mapa de LOC (`'src/components/gauge.tsx': 154`, ~96) — `architecture-graph.test.ts:46` valida `existsSync` de todo `filePath`. Remover também as 3 arestas do nó.
2. Deletar 6 keyframes órfãos do `index.css` — **grep por nome antes de cada remoção** (ficam: `subtlePulse`, `fadeInUp`, `jackpotFlash`, `btnIdleGlow`, `spinIcon`, `miniGaugeFlash`, `tabSlideIn`, `dashFlow`).
3. Deletar `--shadow-neon-green`.
4. `parameter-health-bar.tsx`: deletar só o componente visual `ParameterHealthBar`; **manter as funções puras** (`computeVcByValue` etc. — importadas por `segmented-gradient-bar.tsx:10`). Podar teste correspondente. Corrigir a aresta obsoleta `fine-tune-panel → parameter-health-bar (renders)` (`architecture-graph.ts:369`) — hoje já é falsa: quem consome é `segmented-gradient-bar`. Trocar origem/tipo, não apenas apagar.
5. `#0f1419` → `var(--color-background-dark)`/`bg-background-dark` em `main.tsx`, `privacy-policy-page.tsx`, `favorite-edit-modal.tsx`, `index.css` (body + scrollbar). **NÃO tocar:** `src/app/main.js` (Electron), admin, `results-panel.tsx` e `mobile-results-section.tsx` (reescritos nas Sessões 4/7).
6. `design-tokens.ts`: manter — `MODAL_*` será adotado via import na Sessão 2. `CARD_GLASS`/`CARD_INNER` continuam mortos: adotar nos painéis reescritos (Sessões 3/4) ou deletar na Sessão 8 — decidir na Sessão 4, não deixar em aberto.

Risco: teste de arquitetura com contagem exata de nós/arestas — rodar vitest logo após o passo 1.

## Sessão 2 — Componentes base: Modal e Acordeão unificados (Bloco 3 estrutural)

Arquivos: novo `src/components/ui/modal.tsx` + teste, `bug-report-button.tsx`, `modals/favorite-edit-modal.tsx`, `modals/tool-edit-modal.tsx`, `collapsible-section.tsx`, `formula-card.tsx`, `half-moon-gauge.tsx`, `design-tokens.ts`.

1. `Modal` base: portal + `role="dialog"` + `aria-modal` + Escape + focus trap (tolerante a jsdom) + backdrop. Importa `MODAL_PANEL/MODAL_BACKDROP/MODAL_HANDLE` de `design-tokens.ts` (deixa de ser morto).
2. Migrar os 3 modais divergentes para o base.
3. Estender `collapsible-section.tsx` (props `variant`/`renderHeader`/`onToggle` para haptics) e migrar `formula-card.tsx` para usá-lo (preservar visual e testids). `AccordionSection` inline do mobile-config migra na Sessão 6.
4. `formula-card.tsx`: trocar `animate-in` morto por keyframe próprio (`fadeInUp`).
5. `half-moon-gauge.tsx`: remover prop `palette` morta (nunca desestruturada) + call sites.
6. Definir escala canônica dos botões ± (28 compacto / 40 padrão / 44-48 touch, seção 07 do DS) como constantes exportadas.

Risco: focus trap quebrar testes jsdom dos modais — trap tolerante, sem bloquear tab em teste.

## Sessão 3 — Desktop S1: Config Panel enxuto (mockup)

Arquivos: `config-panel.tsx`, `fine-tune-panel.tsx`, `App.tsx` (grid `340px|1fr`), testes de ambos.

1. 5 inputs visíveis: Material · Operação · Tipo de fresa · Diâmetro + Z (steppers ≥40px) · Balanço. Dropdown "Usar ferramenta salva" com ações editar/remover **sempre visíveis** (remover hover-only).
2. Acordeão "⚙ Ajuste avançado" fechado por default, estado em localStorage (estado de UI local, NÃO Zustand): 4 sliders do FineTune + Raio da Ponta (só toroidal) + safetyFactor.
3. Simular sticky no **rodapé** da coluna (mantém progresso + Reset).
4. Preservar: "set* zera resultado, usuário clica Simular", tracking, alvos ≥40px.

Risco: `config-panel.test.tsx` (16.5K) — abrir o toggle avançado no setup dos testes que buscam sliders.

## Sessão 4 — Desktop S2: Results Panel 8→4 zonas (maior sessão)

Arquivos: `results-panel.tsx`, teste, possivelmente `shared-result-parts.tsx`.

1. **Herói:** RPM + Avanço `text-6xl+ font-mono` com glow, semáforo em pill, `BidirectionalSlider` sob cada número (reusar/estender `BigNumber`).
2. **LCD "AÇÃO:"** mantido; borda `rgba(0,229,255,…)` → derivada de `#00D9FF` (quita ciano duplicado desktop).
3. **Indicadores:** 3 `HalfMoonGauge` (Avanço, MRR, Saúde) + chips L/D (cor por faixa), CTF, SF (só quando ≠ 0.80).
4. **"Detalhes e fórmulas ▾"** (acordeão unificado, fechado): Vc/fz/ap/ae + Potência + Vc Real + MRR (badge âmbar "manual" quando divergir de `recommendations.ts`) + 4 FormulaCards (RPM, Avanço, MRR, Potência).
5. **Torque removido da UI** (`maxTorque` fica só no engine).
6. **Estado vazio honesto:** `resultado === null` → "— / —" + CTA, sem zeros falsos, sem `formatTimestamp(Date.now())`.
7. Preservar: `data-testid="tool-summary"`, favoritos, `jackpotFlash`/`useSimulationAnimation`; `#0f1419` → token.

Risco: volume — se estourar, dividir em 4a (zonas) e 4b (vazio + torque + testes).

## Sessão 5 — Desktop S3: nav no header + acessibilidade

Arquivos: `App.tsx`, `sidebar-footer.tsx` (remover/esvaziar), `bidirectional-slider.tsx`, `styled-slider.tsx`, `index.css`, testes.

1. Header: nav Calcular · Favoritos · Histórico · Config com badges de contagem (selectors Zustand primitivos — `s.entries.length`, nunca array novo).
2. Linha de fluxo "✓1 Material → ✓2 Ferramenta → 3 Simular".
3. Teclado nos sliders: `role="slider"` + `aria-valuenow/min/max` + setas ←→; `focus-visible` ring. **Thumb: só `style transform`, nunca classe translate** (regra do projeto).
4. Contraste WCAG AA (texto informativo `white/30` → `white/60+`).
5. `prefers-reduced-motion` global no `index.css`.

Risco: keydown × lógica de pointer do BidirectionalSlider — adicionar sem tocar no pointer.

## Sessão 6 — Mobile: Config 80/20 + alvos de toque + testes base

Arquivos: `mobile/mobile-config-section.tsx`, `mobile-header.tsx`, `mobile-tab-bar.tsx`, `mobile-simulate-button.tsx`, testes (1 ajuste + 3 novos).

1. Mesma lógica 80/20 no mobile-config: 5 inputs essenciais; safetyFactor → acordeão "⚙ Ajuste avançado" (unificado da S2, haptics via `onToggle`, localStorage chave própria); ferramentas salvas com ações visíveis; substituir `AccordionSection` inline (linha ~64).
2. Alvos ≥44px formalizados em todos os controles tocados.
3. Snap de escala nos arquivos tocados (`border-white/12`→`/10`, `gap-2.5`→degrau).
4. Testes novos: `mobile-tab-bar` (3 abas, badge, aria), `mobile-simulate-button`, `mobile-header`.

## Sessão 7 — Mobile: Resultados com indicadores + vazio honesto + torque fora

Arquivos: `mobile/mobile-results-section.tsx`, `hmi-visor.tsx`, `mobile-adjust-section.tsx`, `mobile-mini-result-bar.tsx`, `pages/mobile-page.tsx`, novo `mobile/mobile-indicators-block.tsx`, testes (1 ajuste + 3 novos).

1. **Extrair bloco de indicadores** (3 MiniResultBar Avanço/MRR/Saúde + benchmarks) de `mobile-adjust-section` para `mobile-indicators-block.tsx`; renderizar na aba Resultados (no `HmiVisor` entre readouts e dados secundários, e na visão Educacional após os BigNumbers). Aba Ajustar continua com ele sticky — fonte única, sem duplicação.
2. Estado vazio honesto (sem timestamp fake, "—" em vez de zeros; onboarding 1-2-3 mantido).
3. Torque fora da visão Educacional (célula + FormulaCard) — espelha Sessão 4.
4. Dívida nos arquivos tocados: ciano `#00E5FF` (linha ~177) → `#00D9FF`; `#0f1419` → token; `animate-in` mortos em `mobile-page.tsx` e `hmi-visor.tsx` → keyframes próprios; snaps de gap/alpha.
5. Testes novos: `hmi-visor`, `mobile-mini-result-bar`, `mobile-adjust-section`.

## Sessão 8 — Dívida Bloco 2 (varredura final) + docs + bump

1. Grep sistemático fora de `src/admin/`: `gap-2.5|gap-5|px-2.5`, `border-white/(8|12|15)`, `rounded-(md|3xl)`, `text-[13px]/[18px]` → degrau canônico; conferência visual dos casos sensíveis.
2. `focus-visible` onde restou; confirmar `prefers-reduced-motion` cobre animações mobile.
3. Atualizar changelog do DS (seção 19: 21 itens quitados, admin registrado como fora de escopo), `REDESIGN_DASHBOARD_80-20.md` (executado), `docs/plans/BACKLOG_IMPLEMENTACAO.md` + `docs/ROADMAP_SESSAO_ATUAL.md`.
4. Bump MINOR (`0.11.0` → `0.12.0`) em `package.json` **E em `src/data/architecture-graph.ts` → `metadata.version`** — `architecture-graph.test.ts:90` exige igualdade; bumpar só o `package.json` deixa a suíte vermelha.
5. Verificação final completa; commit + push.

---

## Verificação (todas as sessões)

```bash
npx vitest run tests/
npx tsc --noEmit
npx vite build
```

Além dos gates: validação manual no `npm run dev` — desktop (fluxo config→simular, estado vazio, modais com Escape, teclado nos sliders) e mobile via device emulation ≤768px (3 abas, indicadores na aba Resultados, acordeão persistindo). Sessão vermelha não abre a próxima. Ao final: grep dos padrões proibidos retorna zero fora do admin; suíte ≥1052 + ~9 arquivos de teste novos; deploy Cloudflare verificado.

## Salvaguardas globais

- **Nunca tocar no engine** (`recommendations.ts`, cálculos, `maxTorque` permanece).
- Regra "store não auto-recalcula" preservada; toggles avançados são estado de UI local.
- Tailwind dinâmico proibido — lookup estático ou `style={{}}`.
- Selectors Zustand primitivos.
- Commit convencional + push por sessão verde.
