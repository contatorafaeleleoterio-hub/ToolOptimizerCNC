# Implementações Dashboard — Lista Consolidada

> **Versão:** v0.9.x (a definir por fase)
> **Data:** 2026-03-24
> **Status:** Especificação revisada (25/03/2026) — correções aplicadas pós-revisão formal
> **Revisão:** `docs/plans/REVISAO_PLANOS_v0.9.md`

---

## Visão Geral

Conjunto de 8 implementações para evolução do dashboard, cobrindo: experiência de input, favoritar simulações, redesign do visor de resultados, navegação da coluna esquerda, e simplificação das configurações.

---

## Implementações

---

### 1. Input Livre — Diâmetro, Raio da Ponta, Altura de Fixação

**O que muda:** Os campos Diâmetro, Raio da Ponta e Altura de Fixação deixam de ser dropdowns com valores pré-definidos e passam a ser campos de digitação livre.

**Comportamento esperado:**
- Ao abrir o app: campos aparecem **vazios** — o usuário digita o valor que deseja
- Valores aceitos com **ranges de validação**:
  - Diâmetro: 0.1 – 200 mm
  - Raio da Ponta: 0.05 – 50 mm (visível apenas para ferramenta toroidal)
  - Altura de Fixação: 5 – 300 mm
- Botão **Simular** fica desabilitado enquanto Diâmetro ou Altura estiverem vazios ou fora do range
- Ao carregar uma ferramenta salva: campos preenchem com os valores da ferramenta
- Ao resetar: campos voltam a ficar vazios
- `autoPopulateParams()` continua funcionando — para diâmetros fora dos pré-definidos, usa o range mais próximo

**Decisão pendente:** Destino dos arrays `DIAMETROS_COMPLETOS`, `RAIOS_PONTA`, `ALTURAS_FIXACAO` em `src/data/tools.ts` — opções: (a) deletar, (b) manter como sugestões via `<datalist>` HTML

**Testes necessários:**
- Campo vazio → Simular desabilitado
- D=0, D negativo, D > 200 → validação bloqueia
- Load de savedTool → campos preenchem corretamente

**Arquivos afetados:** `src/components/config-panel.tsx`, `src/store/machining-store.ts`, `src/data/tools.ts` (possível remoção de arrays)

---

### 2. Arestas (Z) — Dropdown → 4 Botões

**O que muda:** O dropdown de Arestas [2, 3, 4, 6] vira 4 botões selecionáveis, com o mesmo estilo visual dos botões de Tipo de Ferramenta (Topo / Toroidal / Esférica) e Tipo de Usinagem (Desbaste / Semi-Acab. / Acabamento).

**Comportamento esperado:**
- 4 botões lado a lado: `2` | `3` | `4` | `6`
- Botão selecionado: fundo cyan + texto preto (padrão do design system)
- Um botão sempre estará selecionado (padrão: 4)

**Sugestão (revisão):** Extrair toggle button group como componente reutilizável — padrão já usado por Tipo de Ferramenta e Tipo de Usinagem.

**Arquivos afetados:** `src/components/config-panel.tsx`

---

### 3. Botão Favoritar Simulação — Dashboard e Histórico

**O que muda:** Adicionar botão ⭐ para favoritar a simulação atual em dois lugares distintos, com **mecanismos diferentes**.

**3a. No painel de resultados (dashboard):**
- Botão ⭐ visível após uma simulação bem-sucedida
- O operador simula → vai testar na máquina → volta ao dashboard e clica ⭐ para marcar o que funcionou na prática
- Se já favoritada: botão fica amarelo/ativo; clicar novamente desfavorita
- **Mecanismo:** Chama `addValidatedSimulation()` já existente no store (snapshot completo)
- Posicionamento: definir junto com o redesign do visor (item 5)

**3b. No histórico (history-page):**
- Botão ⭐ em cada card de entrada do histórico
- Filtro "Apenas Favoritos" nos filtros da página
- Contador de favoritos no header da página
- **Mecanismo:** Novo campo `isFavorited: boolean` em `HistoricoCalculo` + `toggleFavorite(id)` no history-store
- **Migração necessária:** Zustand version bump para adicionar `isFavorited: false` a entries existentes no localStorage

**Diferença semântica (clarificada na revisão):**
- **Dashboard ⭐ = validatedSimulation**: snapshot completo salvo separadamente para reuso rápido
- **Histórico ⭐ = flag na entry**: marca destaque na timeline, sem duplicar dados
- **Salvar ferramenta**: salva apenas a configuração física da ferramenta (tipo, diâmetro, etc.)

**Referência:** Worktree `amazing-lichterman` tem implementação parcial do history-store com `isFavorited` + `toggleFavorite()` — investigar para reutilizar

**Testes necessários:**
- Toggle favoritar/desfavoritar no histórico
- Filtro "Apenas Favoritos" funciona
- Persistência após reload
- Dashboard ⭐ cria validatedSimulation corretamente

**Arquivos afetados:** `src/components/results-panel.tsx`, `src/pages/history-page.tsx`, `src/store/machining-store.ts`, `src/store/history-store.ts`, `src/types/index.ts`

---

### 4. ~~Lista de Favoritos como Painel Separado~~

Incorporado ao Item 8 (Rodapé da Coluna Esquerda). O acesso às simulações favoritas é feito pelo botão no rodapé.

---

### 5. Redesign do Visor de Resultados — Padrão Industrial HMI

**O que muda:** O painel de resultados (coluna direita) é reorganizado seguindo o padrão de HMI industrial (Human-Machine Interface), adotado por softwares como Siemens Sinumerik, Heidenhain iTNC e Sandvik CoroGuide. Hierarquia clara do mais para o menos importante.

**Nova estrutura de zonas:**

```
┌─────────────────────────────────────────────────────────────┐
│  ZONA 1 — VALORES PRINCIPAIS                                │
│                                                             │
│  🟢 VERDE — Parâmetros Seguros          ← Safety Badge     │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐         │
│  │    14.000           │  │    1.120             │         │
│  │    RPM              │  │    mm/min            │         │
│  │  ████████░░░        │  │  █████████████░░░    │         │
│  └─────────────────────┘  └─────────────────────┘         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ZONA 2 — MÉTRICAS SECUNDÁRIAS (compactas, 4 colunas)      │
│                                                             │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────────────┐   │
│  │ 3.2 kW │  │150 m/  │  │ 18 Nm  │  │  12.5 cm³/min  │   │
│  │Potência│  │min Vc  │  │Torque  │  │      MRR       │   │
│  └────────┘  └────────┘  └────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ZONA 3 — INDICADORES DE SAÚDE (gauges compactos)          │
│                                                             │
│  [Feed Efficiency]    [Prod. MRR]    [Tool Health]         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ZONA 4 — ALERTAS E AVISOS (zona dedicada)                 │
│                                                             │
│  ⚠ Vibração detectada: L/D = 3.8 — Reduzir ap             │
│  ⚠ Potência próxima do limite da máquina                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ZONA 5 — FÓRMULAS (recolhidas por padrão)                 │
│                                                             │
│  ▶ Entenda os Cálculos                                     │
└─────────────────────────────────────────────────────────────┘
```

**Princípios de design aplicados:**
- Operador lê RPM e Avanço em menos de 1 segundo — são os valores que ele configura na máquina
- Safety Badge (semáforo) sobe para o topo da Zona 1, próximo aos valores principais
- Métricas secundárias visíveis mas sem competir visualmente
- Alertas sempre em zona dedicada, nunca misturados com métricas
- Fórmulas educacionais recolhidas por padrão (não são usadas no dia a dia de produção)

**Inclui (item 6):** Banner "Parâmetros Alterados" e todos os avisos de segurança ficam na Zona 4 — nunca entre gauges ou cards de métricas.

**Decisões técnicas (identificadas na revisão):**
- **BidirectionalSliders:** MANTER nos BigNumbers da Zona 1 — são feature crítica de ajuste interativo RPM/Avanço (usam `manualOverrides.rpmPercent` / `feedPercent` no store)
- **MRR:** Aparece APENAS na Zona 2 como métrica numérica. Gauge "Prod. MRR" na Zona 3 mostra eficiência relativa (percentual), não o valor absoluto — sem duplicação
- **ToolSummaryViewer:** Manter como header acima da Zona 1 (resumo da configuração atual)
- **Zona 2 formato:** Reutilizar `MetricCell` existente de `shared-result-parts.tsx` — não criar componente novo
- **Botão Favoritar (item 3):** Posicionar na Zona 1, ao lado do Safety Badge

**Testes necessários:**
- Render test para cada zona
- BidirectionalSliders funcionam após reorganização
- Animações (gaugeRoll, subtlePulse) funcionam na nova posição

**Arquivos afetados:** `src/components/results-panel.tsx`, `src/components/shared-result-parts.tsx`

---

### 6. Alertas/Banners — Zona Dedicada

Incorporado ao Item 5. Todos os alertas e banners ficam exclusivamente na Zona 4 do visor redesenhado.

**Alertas unificados na Zona 4:**
- Banner "Parâmetros Alterados — Clique em Simular"
- Avisos de segurança (L/D crítico, vibração, potência)
- Safety Badge sobe para Zona 1 (topo, junto aos valores principais)

---

### 7. Slider Fator de Segurança no Dashboard Desktop

**O que muda:** O slider de Fator de Segurança está atualmente apenas na página de Configurações e no mobile. Passa a ter presença direta na coluna esquerda do dashboard desktop.

**Comportamento esperado:**
- Nova seção colapsável no ConfigPanel: "Fator de Segurança" (4ª `CollapsibleSection`)
- Slider horizontal **unidirecional** com botões − / + (NÃO BidirectionalSlider que vai de -150% a +150%)
- Escala da esquerda para a direita: `0.50 (Conservador) ←→ 1.00 (Agressivo)`
- Labels descritivos sugeridos: `0.50 Conservador | 0.70 Recomendado | 1.00 Agressivo`
- Valor atual exibido em fonte mono em destaque
- Aplica-se ao resultado de forma geral — multiplicador global sobre RPM, Avanço e Potência
- Reutiliza `setSafetyFactor()` do store (já implementado — `machining-store.ts:206-209`)

**Nota (revisão):** O slider na página de Configurações (`settings-page.tsx:131-157`) continua existindo. Ambos usam `setSafetyFactor()` do mesmo store — sincronia automática. Após item 9, avaliar se o do settings pode ser simplificado.

**Arquivos afetados:** `src/components/config-panel.tsx`

---

### 8. Rodapé Fixo da Coluna Esquerda — Estilo Claude App

**O que muda:** A parte inferior da coluna de inputs (atualmente vazia) recebe um rodapé fixo com navegação e identidade — inspirado no design do Claude app.

**Layout do rodapé:**

```
┌────────────────────────────────────────────────┐
│                                                │
│  ⭐  Favoritos          (3 salvas)             │  ← Abre lista de simulações favoritas
│  🕐  Histórico                                 │  ← Navega para /history
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│  👤  Operador              ⚙                  │  ← Perfil (provisório) + Config
│      v0.8.x                                   │  ← Versão do app
│                                                │
└────────────────────────────────────────────────┘
```

**Detalhes de cada elemento:**

- **Favoritos**: abre **modal overlay** com a lista de `validatedSimulations`; cada item exibe ferramenta, material, RPM e Avanço; ações de carregar e excluir
- **Histórico**: navega para `/history`
- **Configurações (⚙)**: navega para `/settings` — atalho rápido sem sair da tela
- **Versão**: exibe a versão atual do app discretamente (via `__APP_VERSION__` define plugin do Vite)
- **Sem "Mapa do Sistema"**: não aparece para operador; exclusivo para o admin (acessível apenas via `/admin`)

**Removido (revisão):** "Operador (provisório)" — placeholder sem funcionalidade não agrega valor. Será adicionado quando o sistema de login for implementado.

**Pré-requisito (revisão):** Verificar e documentar mecanismo de navegação entre páginas (dashboard/history/settings) antes de implementar. `App.tsx` atual é single-page sem React Router — navegação pode requerer ajuste.

**Layout CSS:** `flex flex-col h-full` no config-panel + `mt-auto` no rodapé para fixar na base.

**Arquivos afetados:** `src/components/config-panel.tsx`, `src/App.tsx`

---

### 9. Revisão do Painel de Configurações — Ferramentas e Fatores

**O que muda:** Com os inputs passando a ser livres (item 1) e os fatores de correção sendo simplificados, a seção Ferramentas das Configurações é reformulada.

**9a. O que sai da UI do settings:**
- Lista de "Diâmetros Padrão" (`settings-page.tsx:641-673`) — sem uso com inputs livres
- Lista de "Raios de Ponta" customizáveis (`settings-page.tsx:676-709`) — sem uso com inputs livres
- Tabela de Fatores de Correção Kc por tipo/diâmetro (`settings-page.tsx:711-786`) — UI removida
- `customToolConfig` do store (diâmetros e raios customizados) — também removido

**9a-bis. O que sai do store/cálculo (decisão necessária):**
- **`toolCorrectionFactors`** está **aplicado no `calcular()`** (`machining-store.ts:366-372`): multiplica Vc e fz pelo fator
- **Opções:**
  - (a) Remover apenas da UI — fator default 1.0 continua no cálculo (seguro, sem breaking change)
  - (b) Remover da UI + do cálculo — breaking change para quem customizou fatores (requer migração)
  - (c) Opção (b) + migração que avisa o usuário que fatores foram resetados
- **Recomendação (revisão):** Opção (a) primeiro, opção (c) depois em versão futura

**9b. O que entra:**
- Gestão de **Ferramentas Favoritas**: lista das ferramentas salvas (`savedTools` do store, as mesmas do dropdown no ConfigPanel)
- Cada item exibe: nome gerado automaticamente (ex: "Topo Ø10 - H25 - A4"), data de criação
- Ação disponível: excluir (via `removeSavedTool(id)` já implementado)

**9c. O que permanece como único fator de ajuste:**
- O **Fator de Segurança** (slider do item 7) é o único ajuste de cálculo — atua como multiplicador global sobre o resultado final

**Testes necessários:**
- Cálculo sem fatores de correção produz resultados corretos
- Remoção de `customToolConfig` não quebra store
- Gestão de ferramentas favoritas: listar, excluir, persistência

**Arquivos afetados:** `src/pages/settings-page.tsx`, `src/store/machining-store.ts`, `src/types/index.ts` (remover `ToolCorrectionFactor` e `CustomToolConfig`)

---

## Resumo

| # | Item | Complexidade |
|---|------|-------------|
| 1 | Input livre (D, R, H) | Média |
| 2 | Arestas (Z) → 4 botões | Baixa |
| 3 | Botão ⭐ favoritar — dashboard + histórico | Média |
| 5 | Redesign visor central — hierarquia industrial (inclui item 6) | Alta |
| 7 | Slider Fator de Segurança no dashboard desktop | Baixa |
| 8 | Rodapé coluna esquerda — favoritos, histórico, config, versão | Média |
| 9 | Config: remover Kc e listas, adicionar gestão de ferramentas favoritas | Média |

**8 itens efetivos** (itens 4 e 6 incorporados aos itens 8 e 5 respectivamente)

---

## Decisões Pendentes (Requer Input do Rafael)

| # | Decisão | Opções |
|---|---------|--------|
| D1 | Destino dos arrays de dropdown (DIAMETROS_COMPLETOS, etc.) | (a) Deletar, (b) Manter como datalist/autocomplete |
| D2 | Remover toolCorrectionFactors do cálculo | (a) Só da UI, (b) UI + cálculo com migração |
| D3 | Navegação entre páginas | Verificar mecanismo atual antes de implementar rodapé |

---

## Próximo Passo

Criar o plano técnico detalhado, dividindo os 7 itens efetivos em **fases de implementação** sequenciais (A→D), com arquivos, testes e critérios de conclusão para cada fase. Revisão formal aplicada — ver `docs/plans/REVISAO_PLANOS_v0.9.md`.
