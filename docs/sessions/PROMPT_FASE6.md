# Prompt para Nova Sessão — Fase 6: UI Components

Copie e cole isso na próxima sessão do Claude Code:

---

```
# MISSÃO: Fase 6 - UI Components (ToolOptimizer CNC)

## CONTEXTO
O projeto ToolOptimizer CNC tem Fases 1-5 concluídas:
- Fase 1: Git, estrutura de pastas, 12 docs, Context Engineering
- Fase 2: Toolchain configurado (Vite 6, React 18, TS strict, Zustand, Tailwind v4, Vitest)
- Fase 3: Calculation Engine com TDD (56 testes passando)
  - src/engine/ (rpm, chip-thinning, feed, power, validators + barrel export)
- Fase 4: Dados Estáticos (89 testes passando)
  - src/data/ (materials, tools, operations + barrel exports)
- Fase 5: Zustand Store (120 testes passando)
  - src/store/machining-store.ts — store central com 7 actions + auto-recalculation
  - src/store/index.ts — barrel export
  - tests/store/machining-store.test.ts — 31 testes de integração
- Branch: main, npm run typecheck OK, npm run test OK (120 tests)

Diretório: C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC

## LEITURA OBRIGATÓRIA ANTES DE EXECUTAR
1. Ler CLAUDE.md (convenções, design tokens, regras críticas)
2. Ler .claude/agent.md (regras do agente, quality gates, fim de sessão)
3. Ler docs/design/UI_DESIGN_SPEC_FINAL.md (paleta, tipografia, layout)
4. Ler docs/design/UI_BRANDING.md (tokens visuais)
5. Ler docs/design/DASHBOARD.md (protótipo HTML — abrir no navegador para referência)
6. Ler src/store/machining-store.ts (entender o state e actions disponíveis)
7. Ler src/types/index.ts (interfaces completas)

## O QUE FAZER

### Passo 1: App Shell (src/App.tsx)
Layout principal do dashboard:
- Background: #0F1419 (dark), min-height: 100vh
- Header com logo "ToolOptimizer CNC" + ícone precision_manufacturing
- Grid 3 colunas: 3/12 | 6/12 | 3/12
- max-w-[1500px] centralizado
- overflow hidden (aspecto app nativo)
- Importar e renderizar os 3 painéis

### Passo 2: Coluna 1 — ConfigPanel (src/components/config-panel.tsx)
Painel de configuração (inputs):
- **Material select:** dropdown com os 9 materiais (de MATERIAIS)
  - Mostrar badge "Estimado" para status='estimado'
- **Tipo de operação:** radio group (DESBASTE, SEMI, ACABAMENTO)
- **Ferramenta:** selects para tipo, diâmetro, Z (arestas), balanço
- **Parâmetros:** inputs numéricos para ap, ae, fz, Vc
  - Mostrar ranges sugeridos baseado no material/operação selecionados
- **Limites de máquina:** inputs para maxRPM, maxPotencia, maxTorque, maxAvanco
- **Safety factor:** slider 0.5-1.0 (step 0.05)
- **Botão "Simular":** chama calcular() do store
  - Gradiente cyan-600→cyan-500, shadow neon
- Conectar tudo ao Zustand store via useMachiningStore

### Passo 3: Coluna 2 — ResultsPanel (src/components/results-panel.tsx)
Painel central de resultados:
- **Big numbers:** RPM (cyan, text-7xl), Feed Rate (green, text-7xl)
- **Overview cards (grid 2x2):**
  - RPM com ícone speed
  - Feed Rate (mm/min) com ícone
  - ap (mm) em laranja
  - ae (mm) em roxo
- **Progress bars:** Potência, MRR, Surface Speed
  - Barras com glow colorido e labels
- **Gauge SVG:** eficiência do avanço (opcional, pode ser fase posterior)
- **Semáforo visual:** ícone + cor baseado em resultado.seguranca.nivel
  - verde=#2ecc71, amarelo=#f39c12, vermelho=#e74c3c, bloqueado=cinza
- **Avisos:** lista de resultado.seguranca.avisos
- Todos os números com font-mono (JetBrains Mono)
- Se resultado === null, mostrar placeholder "Configure e clique Simular"

### Passo 4: Coluna 3 — FineTunePanel (src/components/fine-tune-panel.tsx)
Painel de ajuste fino:
- **Sliders** para ap, ae, fz, Vc:
  - Thumb redondo com cor específica por variável
  - Label com valor atual em font-mono
  - Texto técnico abaixo de cada slider (impacto físico)
- Sliders atualizam o store em tempo real (setParametros)
- Ranges baseados no material/operação

### Passo 5: Disclaimer Component (src/components/disclaimer.tsx)
- Texto fixo no footer: "O sistema RECOMENDA, o operador DECIDE"
- Estilo discreto mas sempre visível

### Passo 6: Tailwind Configuration
- Verificar que Tailwind v4 está configurado com os design tokens
- Importar fontes Inter + JetBrains Mono
- Configurar glassmorphism utilities se necessário
- Scrollbar customizada (6px, thumb cinza)

### Passo 7: Testes de Componentes
- tests/components/config-panel.test.tsx
- tests/components/results-panel.test.tsx
- Testar renders, interações básicas, integração com store

### Passo 8: Validar tudo
- npm run typecheck (deve passar, zero any)
- npm run test (TODOS os testes passando - 120 anteriores + novos)
- npm run dev (deve abrir o dashboard funcional)
- Verificar que nenhum arquivo excede 200 linhas

### Passo 9: Atualizar Context Engineering (FIM DE SESSÃO)
- .claude/agent.md: estado → "Fase 6 concluída"
- .claude/fixplan.md: marcar itens da Fase 6 como [x]
- Criar docs/sessions/PROMPT_FASE7.md (próxima fase: polishing, responsividade, export PDF)

### Passo 10: Commit
git add [arquivos específicos - nunca git add .]
git commit -m "feat: add dashboard UI components with 3-column layout"

## REFERÊNCIA RÁPIDA DE DESIGN

### Cores
- Background: #0F1419
- Surface: rgba(22, 27, 34, 0.7)
- Card: rgba(30, 35, 45, 0.6)
- Primary/Cyan: #00D9FF (RPM)
- Secondary/Green: #39FF14 (Feed)
- Orange: #F97316 (ap)
- Purple: #A855F7 (ae)
- Segurança: verde=#2ecc71, amarelo=#f39c12, vermelho=#e74c3c

### Fontes
- Geral: Inter
- Números: JetBrains Mono
- Labels: text-[11px], font-bold, uppercase, tracking-widest

### Efeitos
- Glassmorphism: backdrop-blur-xl, border-white/5
- Neon glow: box-shadow com rgba do cyan/green
- Transições: transition-all duration-500

### Store (src/store/)
- useMachiningStore() — hook principal
- State: materialId, ferramenta, tipoOperacao, parametros, limitesMaquina, resultado, safetyFactor
- Actions: setMaterial, setFerramenta, setTipoOperacao, setParametros, setLimitesMaquina, setSafetyFactor, calcular, reset
- resultado: ResultadoUsinagem | null (rpm, avanco, potenciaCorte, potenciaMotor, torque, mrr, vcReal, fzEfetivo, forcaCorte, seguranca)

## RESULTADO ESPERADO
- App.tsx + 4 components (config-panel, results-panel, fine-tune-panel, disclaimer)
- Dashboard funcional conectado ao Zustand store
- Cálculos em tempo real ao clicar "Simular"
- Visual dark/glassmorphism/neon fiel ao protótipo
- npm run typecheck: passa
- npm run test: todos passando (120 + novos)
- npm run dev: dashboard renderiza corretamente
- Zero `any`, zero warnings
- Context Engineering atualizado
- Prompt da Fase 7 criado
```
