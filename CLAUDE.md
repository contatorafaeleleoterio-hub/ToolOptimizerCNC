# ToolOptimizer CNC - Contexto do Projeto

## Stack
- **Framework:** React 18 + TypeScript (strict mode, zero `any`)
- **Build:** Vite 6
- **State:** Zustand
- **Styling:** Tailwind CSS v4 (dark theme, glassmorphism)
- **Testing:** Vitest + Testing Library
- **Storage:** localStorage (single-user, sem backend)
- **Platform:** Desktop only (min-width: 1360px)

## Objetivo
Sistema desktop para cálculo e recomendação de parâmetros de corte CNC.
Operadores calculam RPM, Avanço e Potência em < 2 segundos com segurança.

## Domínio CNC - Fórmulas Principais
- **RPM** = (Vc × 1000) / (π × D)
- **Avanço (F)** = fz × Z × RPM
- **Kienzle** = kc1.1 × h^(1-mc) × b
- **CTF** = 1/√(1-(1-2ae/D)²) quando ae < 50% de D, senão CTF = 1.0
- **L/D ratio**: ≤3 verde, 3-4 amarelo, 4-6 vermelho, >6 BLOQUEADO

## Validação de Segurança (Semáforo)
- Verde: parâmetros seguros
- Amarelo: alerta de vibração
- Vermelho: crítico, sugerir redução
- Bloqueado: L/D > 6 no MVP

## Limites de Máquina (Default)
- maxRPM: 12000
- maxPower: 15 kW
- maxTorque: 80 Nm
- maxFeed: 5000 mm/min
- efficiency: 0.85
- Safety factor: 0.7-0.8

## Estrutura de Pastas
```
src/              # Código fonte (React + TS)
tests/            # Testes (Vitest)
docs/specs/       # PRDs e especificações
docs/technical/   # Dados técnicos (Kienzle, Vc, test cases)
docs/design/      # UI specs, branding, dashboard prototype
docs/architecture/# ADRs e visão arquitetural
scripts/          # Scripts auxiliares
.claude/          # Context Engineering
```

## Convenções
- **Arquivos:** kebab-case (`cutting-force.ts`)
- **Componentes:** PascalCase (`ConfigPanel.tsx`)
- **Testes:** `*.test.ts` ou `*.test.tsx`
- **Commits:** conventional commits (`feat:`, `fix:`, `test:`, `docs:`, `refactor:`)
- **UI text:** Português (BR)
- **Code/comments:** English
- **Números no UI:** font-mono (JetBrains Mono)

## Design Tokens
- Primary: `#00D9FF` (cyan neon)
- Secondary: `#39FF14` (green neon)
- Background: `#0F1419` (dark)
- Verde: `#2ecc71`
- Amarelo: `#f39c12`
- Vermelho: `#e74c3c`

## Regras Críticas
1. NUNCA commit sem testes para funções de cálculo
2. SEMPRE validar inputs antes de calcular (ranges de D, ap, ae, fz, L/D)
3. L/D > 6 = BLOQUEADO no MVP
4. Safety factor 0.7-0.8 em todos os valores calculados
5. Materiais "Estimado" devem mostrar badge de warning
6. O sistema RECOMENDA, o operador DECIDE (disclaimer obrigatório)
7. **Store NÃO auto-recalcula:** `setMaterial/setFerramenta/setTipoOperacao/setParametros/setSafetyFactor` zerão `resultado=null` mas NÃO chamam `calcular()`. Usuário deve clicar em "Simular". Exceção: `setLimitesMaquina` ainda chama `calcular()`.
8. **Testes do store:** chamar `getState().calcular()` explicitamente após `setParametros/setFerramenta` nos testes — NÃO depender de auto-recalc.

## Estado Atual do Código (atualizado 17/02/2026)

### Componentes Implementados
- `bidirectional-slider.tsx` — Slider -150% a +150%, botões +/-, tick marks, RGB glow
- `results-panel.tsx` — Inclui sliders RPM/Feed via BigNumber + reset warning amarelo
- `fine-tune-panel.tsx` — Inclui BidirectionalSlider para Vc, fz, ae, ap
- `config-panel.tsx` — Botão Simular com spinner animado (450ms loading)

### Hooks Implementados
- `use-simulation-animation.ts` — Loading 450ms, Gauge 1350ms, Pulse 1500ms
- `use-reset-feedback.ts` — Detecta mudança de params, aciona aviso visual 800ms
- `use-is-mobile.ts` — Detecção de viewport mobile

### Animações CSS (`src/index.css`)
- `spinner` — rotação do ícone no botão Simular
- `fadeInUp` — entrada suave de elementos
- `subtlePulse` — pulse nos resultados pós-simulação
- `gaugeRoll` — gauge durante animação
- `fadeOut` — opacidade reduzida ao zerar painel

## Documentos de Referência
- PRD completo: `docs/specs/PRD_TOOLOPTIMIZER_CNC_MVP.md`
- PRD condensado: `docs/specs/PRD_MASTER.md`
- Validação: `docs/specs/DECISOES_VALIDACAO_PRD.md`
- Dados Kienzle: `docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md`
- Velocidades corte: `docs/technical/PRD_Velocidades_Corte_CNC.md`
- Casos teste: `docs/technical/CASOS_TESTE_REFERENCIA.md`
- Types TS: `docs/technical/srctypes.md`
- Dashboard UI: `docs/design/DASHBOARD.md`
- UI spec: `docs/design/UI_DESIGN_SPEC_FINAL.md`
- Branding: `docs/design/UI_BRANDING.md`


## Framework de Desenvolvimento: Synkra AIOS (Adaptado)

Este projeto segue princípios do Synkra AIOS Framework. Detalhes completos em `docs/AIOS_INTEGRATION.md`.

### Regras Obrigatórias
1. **Story-Driven:** Toda feature tem story em `docs/stories/`
2. **Architect-First:** Documentar antes de codar
3. **Quality Gates:** build + test + typecheck ANTES de commit
4. **No Invention:** Não inventar — pesquisar ou perguntar
5. **Map Before Modify:** Documentar estado atual antes de alterar
6. **Sem arquivos fora do projeto:** Tudo dentro de `INICIO_TOOLOPTIMIZERCNC/`

### ADRs (Architecture Decision Records)
Decisões arquiteturais documentadas em `docs/architecture/ADR-NNN-*.md`

### Referência AIOS Completa
- Repositório: `C:\Users\USUARIO\Desktop\Synkra_AIOS\aios-core\`
- Integração: `docs/AIOS_INTEGRATION.md`
- ADR de adoção: `docs/architecture/ADR-004-adocao-synkra-aios.md`
