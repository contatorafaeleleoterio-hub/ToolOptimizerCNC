# PROXIMA SESSAO — ToolOptimizer CNC

> **Ponto de entrada da sessão:** `docs/ROADMAP_SESSAO_ATUAL.md` — ler este primeiro!

---

## ESCOPO POR AMBIENTE (REGRA OBRIGATORIA)

- Codex (OpenAI): trabalha somente no Admin Dashboard (`/admin`).
- Gemini/Cloud Code: ambiente autorizado para evoluções do dashboard de cálculos e produto final.

---

## 📄 Sessão de execução — Implementação DS + 80/20 + Mobile, Sessões 4-5/8 (06/08/2026)

Execução do `PLAN_IMPLEMENTACAO_DS_80-20_MOBILE.md` — commits `4254bfb`, `8e11250` (pushados).

- **Achado inicial (resolvido antes de codar):** reorganização de arquivos do Gemini CLI (23/04/2026) achada sem commit há ~4 meses — 135 arquivos, `.interface-design/system.md` deletado sem destino real, `.aiox-core`/`.antigravity`/`.codex` marcados como "removidos" no relatório mas ainda no disco. Descartada via `git restore` por decisão do Rafael — o framework AIOX segue em uso ativo, "remoção por redundância" não fazia sentido.
- **Sessão 4** (Desktop S2 — Results Panel 8→4 zonas): `results-panel.tsx` reescrito seguindo `docs/design/DASHBOARD_80-20_MOCKUP.html` — herói RPM/Avanço `text-6xl` via `BigNumber` compartilhado com o mobile, 3 gauges + chips L/D/CTF, torque removido de toda a UI (só engine), "Detalhes e Fórmulas" colapsável com badge "manual" por parâmetro (Vc/fz/ap/ae) vs `getRecommendedParams()`, estado vazio honesto (herói mostra "—", sem timestamp fake), chip "SF X%" quando safety factor ≠ 0.80, ciano duplicado unificado no token primary. `CARD_INNER` adotado; decisão sobre `CARD_GLASS` adiada para Sessão 8.
- **Sessão 5** (Desktop S3 — nav + acessibilidade): `SidebarFooter` deletado, substituído por `HeaderNav` (Calcular/Favoritos/Histórico/Config com badges, `NavLink` nativo). Linha de fluxo "Material→Ferramenta→Simular" acima do Config Panel. `focus-visible` ring nos 3 sliders (teclado já funcionava), `prefers-reduced-motion` global, 1 fix de contraste. `architecture-graph.ts` ajustado (node sidebar-footer→header-nav, obrigatório para o teste de integridade do grafo não quebrar).
- Achados fora de escopo (sinalizados, não corrigidos): os mesmos 8 testes pré-existentes de mobile seguem inalterados; contraste `white/30` em arquivos mobile (`hmi-visor.tsx` etc.) fica para as Sessões 6-7, que já vão reescrever esses arquivos.
- Verificação de cada sessão: `tsc` 0 erros, build ok, suíte verde exceto as 8 falhas pré-existentes de sempre. Sem verificação visual em navegador — nenhuma ferramenta de browser disponível nestas sessões.
- Próximo passo: Sessão 6 — Mobile: Config 80/20 + alvos de toque + testes base.

---

## 📄 Sessão de execução — Implementação DS + 80/20 + Mobile, Sessões 1-3/8 (05/08/2026)

Execução do `PLAN_IMPLEMENTACAO_DS_80-20_MOBILE.md` — commits `895ba05`, `abe7588`, `7845488` (pushados).

- **Sessão 1** (dívida bloco 1): deletado `gauge.tsx` morto + teste; 6 keyframes órfãos e `--shadow-neon-green` removidos do `index.css`; `ParameterHealthBar` reduzido às 4 funções puras (componente visual morto removido); `#0f1419` → `bg-background-dark` em `main.tsx`/`privacy-policy-page.tsx`/`favorite-edit-modal.tsx`.
- **Sessão 2** (Modal/Acordeão base): criado `src/components/ui/modal.tsx` (portal, Escape, backdrop-to-close, focus trap) migrando os 3 modais divergentes; `collapsible-section.tsx` ganhou `variant`/`renderHeader`/`onToggle`, `formula-card.tsx` migrado; prop `palette` morta removida de `half-moon-gauge.tsx`; escala canônica dos botões ± (20/24/44px — DS seção 07) exportada em `design-tokens.ts`.
- **Sessão 3** (Desktop S1 — Config Panel): reduzido a 5 campos sempre visíveis + 1 acordeão "⚙ Ajuste avançado" (fechado, persistido em `localStorage`) com FineTune + Raio da Ponta + Segurança; Simular+Reset viraram sticky no rodapé; `App.tsx` com grid fixo `340px|1fr`; Arestas (Z) virou stepper ± sobre o catálogo fixo `[2,3,4,6]`.
- Achados fora de escopo (sinalizados, não corrigidos): 8 testes pré-existentes falhando em `mobile-results-section`/`mobile-page` (não causados por estas sessões) + template `.aiox-core` com import quebrado; gaps maiores no `architecture-graph.ts` (nó `favorites-page` ausente, aresta `app→fine-tune-panel` obsoleta).
- Verificação de cada sessão: `tsc` 0 erros, build ok, suíte verde exceto as 8 falhas pré-existentes acima.
- Próximo passo: Sessão 4 — Desktop S2: Results Panel 8→4 zonas (maior sessão do plano).

---

## 📄 Sessão de planejamento — Implementação DS + 80/20 + Mobile (05/08/2026)

Sessão só de planejamento — **zero alterações em `src/`**.

- Criado `docs/plans/PLAN_IMPLEMENTACAO_DS_80-20_MOBILE.md` (8 sessões, v0.12.0 alvo): implementa o Design System no código, adota o mockup 80/20 (`docs/design/mockup-redesign-80-20.html`), estende ao mobile e quita os 21 itens de dívida visual (blocos 1+2+3).
- Decisões do Rafael: blocos 1+2+3 completos · MiniResultBar na aba Resultados mobile · manter 3 gauges desktop · admin fora de escopo.
- Absorve o item "Redesign Calculadora 80/20" do backlog (agora Sessões 3-5 do novo plano).
- Próximo passo: executar Sessão 1 (dívida bloco 1, limpeza zero-risco).

---

## 📄 Sessão paralela — Design System Canônico (02/08/2026)

Sessão de documentação/design audit, independente da linha mobile/Android abaixo. **Zero alterações em `src/`.**

- Plano `docs/plans/PLAN_DESIGN_SYSTEM_CANONICO.md` executado do zero ao fim — 4 sessões (replanejado de 6), commits `5aadb9b`→`d471895`.
- Entregável: `docs/_canonicos/DESIGN-SYSTEM.html` — 1575 linhas, 20 seções (Marca, Fundamentos, Componentes, Regras), fonte única de verdade visual do app (desktop + mobile + admin).
- Seção 18 do documento cataloga 21 itens de dívida visual; recomendação passada ao Rafael: resolver em 3 blocos por risco (limpeza de código órfão zero-risco → snap de escala mecânico → refactor de componente com plano próprio). Nenhuma correção de código feita ainda — fica para plano futuro.
- Pendente: validação visual em navegador real (sem ferramenta de browser disponível nas sessões de execução).
- Detalhes completos: `docs/plans/BACKLOG_IMPLEMENTACAO.md` item 14.

---

## ⚡ RESUMO DA ÚLTIMA SESSÃO (19/04/2026)

**Fases 2 e 3 do Master Plan v2.0 CONCLUÍDAS ✅**

**O que foi feito:**
- ✅ **Bridge Mobile:** Instalados plugins `@capacitor/device`, `haptics`, `preferences` e `status-bar`.
- ✅ **ViewportGuard:** Refatoração do redirecionador automático para garantir rota `/mobile` em dispositivos móveis.
- ✅ **UI Industrial (HMI):** Criado o `HmiVisor.tsx` com interface de alto contraste e números grandes para chão de fábrica.
- ✅ **Haptics:** Implementado utilitário de feedback tátil e integrado a sliders, abas e botões.
- ✅ **Persistência Híbrida:** Criado `StorageService` que utiliza `@capacitor/preferences` em ambientes nativos e `localStorage` na Web.
- ✅ **Offline First:** Configurado `vite-plugin-pwa` para suporte completo offline + banner de notificação de conexão na `MobilePage`.
- ✅ **Build CI/CD:** Criado workflow `.github/workflows/build-android.yml` para geração automática de APKs.

**Estado ao encerrar:**
- TypeScript zero erros ✅
- Build limpo (com suporte PWA) ✅
- Persistência migrada para modelo híbrido assíncrono ✅

---

## 🚀 CONTINUAR AQUI — Próxima Sessão (Fase 4)

A próxima etapa é a **Fase 4: Validação de Campo e Refinamento Nativo**.

**Ações recomendadas:**
1. **Validar APK:** Baixar o APK gerado pelo GitHub Actions e testar em dispositivo físico.
2. **Teste de Persistência:** Confirmar se o histórico e favoritos sobrevivem ao fechamento total do app (kill process).
3. **Refinamento HMI:** Ajustar sensibilidade dos sliders e haptics baseado no uso real na oficina.
4. **Splash Screen & Icons:** Personalizar a inicialização nativa (atualmente usando assets padrão do Capacitor).

---

## Estado do Projeto

| Item | Valor |
|------|-------|
| **Branch** | `main` |
| **Versão** | `0.11.0` (Capacitor + PWA) |
| **Persistência** | Híbrida (Capacitor Preferences / LocalStorage) |
| **Mobile** | Rota `/mobile` (HMI Visor + Haptics) |
| **Offline** | ✅ Ativo via PWA |
| **CI/CD** | ✅ GitHub Actions (Android Build) |

```bash
# Comandos úteis para a próxima sessão
npm run build && npx cap sync android
npm run typecheck
```
