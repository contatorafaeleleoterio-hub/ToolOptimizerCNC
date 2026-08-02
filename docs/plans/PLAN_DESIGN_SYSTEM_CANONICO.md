# PLANO — Design System Canônico (HTML único)

> **Criado:** 02/08/2026
> **Tipo:** 📄 Documentação / Design Audit — **ZERO alterações em `src/`**
> **Entregável:** `docs/_canonicos/DESIGN-SYSTEM.html`
> **Status:** 🔶 Em andamento — sessão 2/4 concluída

---

## Contexto

O ToolOptimizer não tem fonte única de verdade visual. Os tokens vivem só no `@theme` do `src/index.css` (10 cores, 2 fontes, 4 sombras); todo o resto — escala de espaçamento, raios, timings, estados de botão, variantes de slider — existe apenas como convenção implícita espalhada por ~90 arquivos `.tsx`.

**Mapeamento feito na sessão de 02/08/2026 encontrou:**

- **3 paletas concorrentes** de verde/amarelo/vermelho: tokens `seg-*` (`#2ecc71/#f39c12/#e74c3c`), gauges (`#00E676/#FFA500/#FF4D4D`), `gauge.tsx` (`#39FF14/#FFD700/#E74C3C`)
- **2 cianos**: `#00D9FF` (token) e `#00E5FF` (LCD, via `rgba(0,229,255,…)`)
- **5 estilos de modal**, **4 sliders**, **3 barras de saúde**, **5 tamanhos de botão ±**
- `#0f1419` escrito à mão ~20× apesar de existir `bg-background-dark`
- `text-2xs`(10px) e `text-fine`(11px) existem como token mas perdem 86:22 e 22:1 para `text-[10px]`/`text-[11px]`
- `src/admin/` usa paleta Tailwind pura (`cyan-500`, `green-500`, `bg-white/3`), zero sobreposição com os tokens do app
- 6 keyframes órfãos, `--shadow-neon-green` nunca usado, 6 componentes órfãos (`gauge.tsx`, `parameter-health-bar.tsx`, `design-tokens.ts`, `tool-summary-viewer.tsx`, `MetricCell`, `ProgressCard`, `SafetyBadge`)
- Zero `prefers-reduced-motion` em 15 animações
- 14 degraus de alpha sem sistema (`/3 /4 /5 /8 /10 /12 /15 /20 /30 /35 /40 /50 /70 /85`)

`docs/design/UI_DESIGN_SPEC_FINAL.md` prescreve layout de 3 colunas (3/6/3) e `max-w-[1500px]` — o código entrega 2 colunas (3/9) sem max-width. A documentação existente está desatualizada e fragmentada em 7 arquivos.

**Objetivo:** produzir um HTML canônico único, navegável e com demos vivos, que seja a norma visual do sistema — cobrindo o que existe, canonizando o que diverge, e registrando um banco de componentes propostos para futuras atualizações.

### Documento de referência (molde estrutural apenas)

`docs/_canonicos/Design_system_referencia/03-DESIGN-SYSTEM.html` é o design system **de outro projeto**, fornecido pelo Rafael como molde de estrutura e ordem: sidebar numerada, seções, blocos `canon`/`hint`/`lead`, swatches com contraste, scale rows, demos vivos, changelog.

> **REGRA INEGOCIÁVEL:** nenhum valor visual, nome, fonte, cor, texto ou conceito do documento de referência pode aparecer no resultado. O arquivo final deve conter **zero vestígios** do outro sistema. Verificação obrigatória na sessão 6.

---

## Decisões fechadas (Rafael, 02/08/2026)

| Ponto | Decisão |
|---|---|
| Escopo | App desktop + mobile + páginas + **admin** |
| Divergências | Canonizar uma versão oficial + seção final de **Dívida Visual** |
| Formato | HTML único auto-contido e interativo |
| Tema | Dark canônico + **tema claro PROPOSTO** (derivado, marcado como não implementado) |
| Admin | **Unificar** nos tokens do app; mapeamento de migração documentado |
| Destino | `docs/_canonicos/DESIGN-SYSTEM.html` (novo); referência preservada intacta |

---

## Arquitetura do documento

**Chrome do doc** (identidade ToolOptimizer: fundo `#0F1419`, accent `#00D9FF`, Inter + JetBrains Mono via Google Fonts CDN, glassmorphism):

- Sidebar fixa com grupos e seções numeradas
- Barra de topo com toggle **Dark (canônico) / Claro (proposto)** via `[data-theme]`
- Blocos reutilizáveis: `.lead`, `.hint`, `.canon` (regra inegociável), `.proposto` (selo amarelo), `.divida` (selo vermelho), `.do` / `.dont`
- JS mínimo: troca de tema, clique-para-copiar hex, cálculo de contraste WCAG nos swatches, scrollspy da nav
- Demos vivos em HTML/CSS puro (sem React, sem build) espelhando as classes Tailwind reais
- Logo embutido como `data:` URI base64 (evita dependência de caminho relativo)

### Sumário — 20 seções

| Grupo | # | Seção |
|---|---|---|
| Marca | 00 | Apresentação e princípios |
| | 01 | Logomarca, favicon, tagline, usos proibidos |
| Fundamentos | 02 | Cores e temas |
| | 03 | Tipografia e ícones |
| | 04 | Espaçamento, raio, elevação e glow |
| | 05 | Grid e layout |
| | 06 | Motion e timings |
| Componentes | 07 | Botões e ações |
| | 08 | Campos e controles |
| | 09 | Sliders |
| | 10 | Painéis, cards e seções recolhíveis |
| | 11 | Visores de dados |
| | 12 | Feedback e status |
| | 13 | Navegação |
| | 14 | Overlays |
| | 15 | Mobile |
| | 16 | Admin |
| Regras | 17 | Componentes propostos (banco de opções) |
| | 18 | Dívida visual |
| | 19 | Changelog |

---

## Canonizações (as decisões que o documento fixa)

1. **Semáforo** — `seg-verde #2ecc71` / `seg-amarelo #f39c12` / `seg-vermelho #e74c3c` é a paleta oficial de **estado discreto**. As cores de gauge (`#00E676/#FFA500/#FF4D4D`) viram tokens **separados e nomeados** (`--color-gauge-*`), legítimos por servirem a outro propósito (leitura de faixa contínua). `COLOR_PALETTES` do `gauge.tsx` órfão vira dívida a remover.
2. **Ciano único** — `#00D9FF`. `rgba(0,229,255,…)` do LCD vira dívida.
3. **Escala de alpha** — 6 degraus canônicos: `/5 /10 /20 /30 /50 /70`. Bordas: `white/10` padrão, `white/5` sutil.
4. **Escala tipográfica** — 8 degraus nomeados (9/10/11/12/14/16/20/32px) mapeados a `text-[9px]` → `text-2xs` → `text-fine` → `text-xs` → `text-sm` → `text-base` → `text-xl` → `fontSize:2rem`. Regra: número = `font-mono`.
5. **Espaçamento** — `4 · 8 · 12 · 16 · 24 · 32` (gap-1/2/3/4/6/8). Elimina gap-2.5/5 e px-2.5.
6. **Raio** — `4 (rounded) · 8 (lg) · 12 (xl) · 16 (2xl) · full`. `rounded-md` e `rounded-3xl` viram dívida.
7. **Modal único** — painel `bg-[#0F1419] border-white/10 rounded-2xl shadow-glass`, backdrop `bg-black/60 backdrop-blur-sm`. As 5 variantes atuais viram dívida; `design-tokens.ts` (hoje órfão) passa a ser a fonte.
8. **Slider** — 4 variantes oficiais por contexto: `default` (thumb 28px), `compact` (20px), `touch` (36px, mobile), `bidirectional`. Track `mx-[18px]`, `mx-[12px]` no compact.
9. **Botão ±** — 3 tamanhos: `sm 20px` · `md 24px` · `lg 44px` (touch). Fundo `bg-black/40`, borda `border-white/10`.
10. **Focus ring** — um só: `focus-visible:ring-1 focus-visible:ring-primary`. Substitui os 3 padrões conflitantes.
11. **Admin** — mapeamento `cyan-500 → primary` · `green-500 → seg-verde` · `yellow-500 → seg-amarelo` · `red-500 → seg-vermelho` · `bg-white/3|4 → bg-white/5` · `border-white/8 → border-white/10`.

---

## Fontes de verdade para a extração

| O que | Onde |
|---|---|
| Tokens `@theme`, keyframes, scrollbar, mobile overrides | `src/index.css` |
| Layout desktop, orbs, header, grid 3/9 | `src/App.tsx` |
| Zonas 1–8 do visor, LCD, BigNumber, jackpotFlash | `src/components/results-panel.tsx` |
| Botão Simular, spinner, DiameterSymbol | `src/components/config-panel.tsx` |
| Sliders e thumbs | `src/components/styled-slider.tsx`, `bidirectional-slider.tsx`, `slider-tokens.ts` |
| Gauges e barras | `src/components/half-moon-gauge.tsx`, `segmented-gradient-bar.tsx`, `parameter-health-bar.tsx` |
| Semáforo, MetricCell, contadores | `src/components/shared-result-parts.tsx` |
| Tokens de modal não usados | `src/components/design-tokens.ts` |
| Mobile | `src/components/mobile/*` (`hmi-visor`, `mobile-tab-bar`, `mobile-header`, `mobile-simulate-button`, `touch-slider`) |
| Admin | `src/admin/layout/*`, `src/admin/components/*` |
| Marca | `src/assets/logo-tooloptimizer.png`, `public/favicon*`, `src/components/disclaimer.tsx` |
| Fontes e meta | `index.html` |
| Timings | `src/hooks/use-simulation-animation.ts`, `use-reset-feedback.ts` |

---

## Execução — 4 sessões (re-planejado 02/08/2026, executor Sonnet 1M)

> Dimensionamento por **volume de HTML produzido** (gargalo = output, não leitura).
> **Teto: ~1000 linhas de HTML/CSS novo por sessão**, escritas append-only (1–2 escritas grandes, sem releitura do arquivo em construção). Régua: referência tem ~80 linhas por seção leve e 200–250 por seção com demos densos.
>
> Densidade estimada por seção: 00 LEVE(60) · 01 LEVE(80) · 02 PESADA(250) · 03 MÉDIA(120) · 04 MÉDIA(120) · 05 LEVE(80) · 06 MÉDIA(120) · 07 PESADA(200) · 08 MÉDIA(150) · 09 PESADA(220) · 10 MÉDIA(130) · 11 PESADA(250) · 12 MÉDIA(120) · 13 LEVE(90) · 14 MÉDIA(120) · 15 MÉDIA(150) · 16 MÉDIA(130) · 17 MÉDIA(150) · 18 MÉDIA(120) · 19 LEVE(40). Nenhuma seção sozinha estoura o teto — nenhuma divisão necessária.
>
> Dependências de escrita: chrome + CSS de demos compartilhados (btn, swatch, scalerow, pill, slider-demo, panel-glass) nascem na S1 e são reaproveitados; seção 15 (touch-slider) reaproveita o CSS de slider da S2; seção 16 reaproveita pills/panels; 17–19 são só texto/tabela.

| # | Sessão | Seções | Linhas HTML estimadas | Status |
|---|--------|--------|-----------------------|--------|
| 0 | Registro do plano | — | — | ✅ Concluído (02/08/2026) |
| 1 | Esqueleto + Marca + Cores | Chrome do doc (sidebar, toggle tema, JS copiar/contraste/scrollspy) + **00–02** | 592 linhas | ✅ Concluído (02/08/2026) |
| 2 | Fundamentos + Componentes I | **03–09** (tipografia, espaçamento, grid, motion, botões, campos, sliders — CSS de slider criado aqui) | ~1010 | ✅ Concluído (02/08/2026) |
| 3 | Componentes II + III | **10–16** (painéis, visores, feedback, navegação, overlays, mobile, admin) | ~990 | ⬜ |
| 4 | Regras + verificação | **17–19** + varredura anti-vestígio + validação no navegador | ~310 | ⬜ |

**Sessão 2 — notas de execução (02/08/2026):** arquivo passou de 592 → 1053 linhas (+461). Todos os valores citados (hex/px/ms/classe) confirmados por Grep direto nas fontes antes de escrever — nenhum copiado cego da tabela-resumo de canonizações. Achados relevantes: timings reais de `use-simulation-animation.ts` divergem dos citados em `.claude/CLAUDE.md` (código real: 80/1500/1750/2300/2650ms, não 450/1350/1500ms — documentação do projeto está desatualizada, não corrigida nesta sessão por estar fora de escopo); variante "touch" do slider não é um arquivo próprio (`touch-slider.tsx` não existe) — é o componente `TouchSlider` definido inline em `mobile-fine-tune-section.tsx:98-248`; botão ± tem 5 tamanhos reais (20/24/28/40/48px), não 3 — canonizados 2 (20/24) + 1 proposto (44px touch) + 3 marcados como dívida. Verificação de tags balanceadas (div/table/tr/svg/style/script/main/html) e grep anti-vestígio (zero ocorrências) — ambos limpos.

Cada sessão fecha as tags abertas (`</main></body></html>` reposicionadas via única Edit no fim) — arquivo sempre válido e abrível. Commit ao fim de cada sessão (`docs:`), sem push.

**Desvio registrado na sessão 1:** CSS de `btn` e `slider-demo` listados como infraestrutura compartilhada da S1 foram **adiados para a S2** — construí-los agora exigiria valores de `config-panel.tsx`/`styled-slider.tsx`/`bidirectional-slider.tsx` que a S1 não lê, e o plano exige fidelidade por Grep na sessão que escreve a seção correspondente (07 Botões, 09 Sliders, ambas na S2). CSS efetivamente criado na S1: chrome completo (sidebar, topbar, tema, scrollspy) + blocos de anotação (`lead/hint/canon/proposto/divida`) + `swatch`/`swatch-grid`/`pill`/`panel-glass`. A S2 deve orçar CSS+HTML juntos para as seções 07 e 09 (o teto de ~1010 linhas já tem folga para isso).

### Prompt de retomada

```
continuar plano Design System Canônico — docs/plans/PLAN_DESIGN_SYSTEM_CANONICO.md, sessão N
```

---

## Verificação

**Anti-vestígio (obrigatório, sessão 6):**

```bash
grep -inE "flownc|ibm plex|E85D04|2E6BE6|F26511|0A0E1A|sidepanel|gavetas|editor 2d|chips de lote|g-code|marquee" docs/_canonicos/DESIGN-SYSTEM.html
```

Resultado esperado: **zero linhas**. Qualquer ocorrência é vestígio do documento de referência e deve ser removida.

**Fidelidade dos valores:** para cada hex, px, ms e classe citada, confirmar origem no `src/` com Grep. Nenhum valor pode ser inventado — se não existe no código, entra na seção 17 (Propostos) com selo, nunca no corpo canônico.

**Renderização:** abrir `docs/_canonicos/DESIGN-SYSTEM.html` no navegador e conferir:

- as duas fontes carregam (Inter no texto, JetBrains Mono nos números) e Material Symbols renderiza os ícones
- toggle Dark/Claro alterna todas as seções sem quebrar contraste
- clique em swatch copia o hex; contraste WCAG aparece em cada um
- sidebar navega para todas as 20 seções e o scrollspy acompanha
- nenhum erro no console; nenhuma requisição além das fontes do Google

**Comparação lado a lado:** `npm run dev`, abrir o dashboard e o documento em duas janelas, conferir botão Simular, visor LCD, gauges, sliders e badges de semáforo.

**Sem regressão:** nenhum arquivo de `src/` é tocado nesta entrega — o documento apenas descreve. As correções da seção Dívida Visual ficam para um plano posterior.
