# Especificação — Onboarding Guided Flow
## ToolOptimizer CNC (Fênix) | v0.10.0+

**Status:** Pronto para implementação  
**Data:** 01/04/2026  
**Destinatário:** Claude Code / Codex  
**Escopo:** Apenas dashboard principal — sem alteração no `/admin`

---

## 1. Contexto e Objetivo

### 1.1 Problema
O Fênix abre diretamente no dashboard completo com 4 gavetas colapsáveis (Config Base, Ferramenta, Ajuste Fino, Segurança) e o visor central mostrando zeros. Usuário novo não sabe por onde começar.

### 1.2 Activation Event (Momento AHA)
O usuário recebe **RPM + Avanço preenchidos** após clicar Simular. Esse é o primeiro valor real do produto.

### 1.3 Fluxo alvo
```
Config Base → Ferramenta → Ajuste Fino → Segurança → Simular
```
Cada gaveta pulsa/pisca indicando qual abrir. O visor central exibe mensagens no Letreiro Digital durante todo o processo.

---

## 2. Letreiro Digital (Display Ticker)

### 2.1 O que é
Uma faixa horizontal no **topo do visor central** que exibe mensagens rotativas estilo calculadora/display LCD. Tem dupla função:
- **Guia de onboarding** na primeira sessão
- **Canal de informação permanente** (alertas, avisos, atualizações) após onboarding concluído

### 2.2 Especificação visual

```
┌─────────────────────────────────────────────────────────────────┐
│  ▶  INSIRA OS PARÂMETROS PARA CALCULAR  ◀                       │
│     [mensagem rolando da direita para a esquerda]               │
└─────────────────────────────────────────────────────────────────┘
```

**Dimensões:** largura total do visor central, altura 36px  
**Background:** `rgba(0, 0, 0, 0.6)` com borda inferior `1px solid rgba(0, 217, 255, 0.3)`  
**Tipografia:** `JetBrains Mono`, 13px, `#00D9FF` (cyan), `letter-spacing: 0.12em`, `text-transform: uppercase`  
**Animação:** texto rola da direita para esquerda, velocidade 60px/s, loop contínuo  
**Separador entre mensagens:** `◆` (4 espaços antes e depois)

### 2.3 Mensagens por estado

#### Durante onboarding (prioridade máxima — sobrepõe mensagens normais):

| Step | Mensagem |
|------|----------|
| Bem-vindo | `BEM-VINDO AO FÊNIX ◆ CALCULADORA CNC PROFISSIONAL ◆ VAMOS CONFIGURAR SUA PRIMEIRA USINAGEM` |
| Step 1 | `SELECIONE O MATERIAL DA PEÇA ◆ ABRA A GAVETA CONFIGURAÇÃO BASE` |
| Step 2 | `AGORA CONFIGURE SUA FRESA ◆ ABRA A GAVETA FERRAMENTA` |
| Step 3 | `AJUSTE OS PARÂMETROS DE CORTE ◆ VEL. DE CORTE · AVANÇO · ENGAJAMENTOS` |
| Step 4 | `VERIFIQUE O FATOR DE SEGURANÇA ◆ RECOMENDADO 0.80` |
| Pré-simular | `TUDO PRONTO ◆ CLIQUE EM CALCULAR PARÂMETROS PARA VER RPM E AVANÇO` |
| AHA | `PARÂMETROS CALCULADOS ◆ RPM E AVANÇO PRONTOS PARA USO NA MÁQUINA` |

#### Após onboarding (modo normal — rotação automática a cada 8s):

```
FÊNIX v0.10.0 ◆ CALCULADORA CNC PROFISSIONAL
DICA: AJUSTE VC PARA OTIMIZAR VIDA DA FERRAMENTA
NOVO: HISTÓRICO DE SIMULAÇÕES DISPONÍVEL EM FAVORITOS
L/D > 4: REDUZA AP E AE EM 30% PARA EVITAR VIBRAÇÃO
MODELO KIENZLE: PRECISÃO ±15% EM RELAÇÃO AO CATÁLOGO
```

### 2.4 Implementação (componente React)

**Arquivo:** `src/components/ticker-display.tsx`

```typescript
interface TickerDisplayProps {
  messages: string[];          // Array de mensagens
  speed?: number;              // px/s — default 60
  highlight?: boolean;         // borda cyan pulsante (modo onboarding)
}
```

**Estado interno:**
- Concatenar todas as mensagens com separador `◆`
- Animar via CSS `@keyframes marquee` com `translateX`
- Calcular duração dinamicamente: `duration = totalWidth / speed`

---

## 3. Gavetas Colapsáveis (Drawer System)

### 3.1 Comportamento geral
- Todas as 4 gavetas iniciam **fechadas** na primeira abertura
- Cada gaveta tem header clicável com ícone de seta rotacionável
- Animação de abertura: `max-height` transition 300ms `ease-out`
- Conteúdo interno usa `overflow: hidden` durante transição

### 3.2 Estrutura das gavetas

```
┌─ CONFIGURAÇÃO BASE ────────────────── [resumo: Aço 1045 | Desbaste] [▼] ─┐
│  Material: [dropdown]                                                       │
│  Operação: [radio buttons]                                                  │
└──────────────────────────────────────────────────────────────────────────────┘

┌─ FERRAMENTA ─────────────────── [resumo: Toroidal Ø6 | A4] [▼] ──────────┐
│  Tipo: [buttons]  Diâmetro: [input]  Raio: [input]  Arestas: [buttons]    │
│  Altura Fixação: [input]                                                    │
└──────────────────────────────────────────────────────────────────────────────┘

┌─ AJUSTE FINO ────────────────────────────────────────── [▼] ──────────────┐
│  Vc: [slider + valor + unidade]                                             │
│  fz: [slider + valor + unidade]                                             │
│  ae: [slider + valor + unidade]                                             │
│  ap: [slider + valor + unidade]                                             │
└──────────────────────────────────────────────────────────────────────────────┘

┌─ SEGURANÇA ──────────────────── [resumo: SF 0.80] [▼] ────────────────────┐
│  Fator de Segurança: [slider 0.50–1.00]                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Resumo no header (quando fechada)
Cada gaveta fechada mostra texto resumido à direita do título:

| Gaveta | Resumo quando fechada |
|--------|----------------------|
| Config Base | `Aço 1045 \| Desbaste` ou `[não configurado]` |
| Ferramenta | `Toroidal Ø6 \| A4` ou `[não configurado]` |
| Ajuste Fino | `Vc 180 · fz 0.10` |
| Segurança | `SF 0.80` |

### 3.4 Estado "piscando" (onboarding)
Quando uma gaveta é o **step atual** do onboarding:

```css
@keyframes drawer-pulse {
  0%, 100% { border-color: rgba(0, 217, 255, 0.3); }
  50%       { border-color: rgba(0, 217, 255, 0.9); 
              box-shadow: 0 0 12px rgba(0, 217, 255, 0.4); }
}
```

- Border da gaveta pulsa em cyan
- Seta do header fica em cyan `#00D9FF`
- Pequeno badge `↑ ABRA AQUI` aparece à direita do título (13px, cyan, pisca)

---

## 4. Welcome Modal

### 4.1 Aparência

```
┌────────────────────────────────────────────┐
│                                            │
│   ⚙  FÊNIX                                 │
│      ToolOptimizer CNC                     │
│                                            │
│   Parâmetros CNC em menos de 1 minuto      │
│                                            │
│   Configure material + fresa e calcule     │
│   RPM e Avanço com base em Kienzle e       │
│   dados validados de fabricantes.          │
│                                            │
│   ┌──────────────────┐  ┌───────────────┐ │
│   │  COMEÇAR AGORA   │  │     PULAR     │ │
│   └──────────────────┘  └───────────────┘ │
│                                            │
│   ○ ○ ○ ○ ○  (dots do progresso)          │
└────────────────────────────────────────────┘
```

**Disparador:** Primeira abertura — `tooloptimizer:onboarding.completed === false`  
**Background:** overlay `rgba(0, 0, 0, 0.75)` com backdrop-filter blur  
**Card:** `rgba(22, 27, 34, 0.95)`, border `rgba(0, 217, 255, 0.3)`, border-radius 16px  
**Botão principal:** gradiente cyan, texto "COMEÇAR AGORA" — `background: linear-gradient(to right, #0891b2, #00D9FF)`  
**Botão secundário:** ghost, texto "PULAR"

### 4.2 Microcopy do botão Simular

**Atual:** `▶ SIMULAR`  
**Proposto:** `▶ CALCULAR PARÂMETROS`

**Justificativa:** "Simular" é ambíguo (parece simulação virtual). "Calcular Parâmetros" é direto ao resultado esperado pelo operador. Alternativas validadas:
- `▶ CALCULAR PARÂMETROS` ← recomendado
- `▶ GERAR PARÂMETROS`
- `▶ CALCULAR RPM / AVANÇO`

---

## 5. Step Controller

### 5.1 Definição dos 5 passos

```json
{
  "steps": [
    {
      "id": "welcome",
      "type": "modal",
      "target": null,
      "tickerMessage": "BEM-VINDO AO FÊNIX ◆ CALCULADORA CNC PROFISSIONAL ◆ VAMOS CONFIGURAR SUA PRIMEIRA USINAGEM",
      "action": "click_button_comecar",
      "next": "config-base"
    },
    {
      "id": "config-base",
      "type": "drawer-highlight",
      "target": "drawer-config-base",
      "tickerMessage": "SELECIONE O MATERIAL DA PEÇA ◆ ABRA A GAVETA CONFIGURAÇÃO BASE",
      "badgeText": "↑ ABRA AQUI",
      "completionCondition": "material !== null && tipoOperacao !== null",
      "next": "ferramenta"
    },
    {
      "id": "ferramenta",
      "type": "drawer-highlight",
      "target": "drawer-ferramenta",
      "tickerMessage": "AGORA CONFIGURE SUA FRESA ◆ TIPO · DIÂMETRO · ARESTAS",
      "badgeText": "↑ CONFIGURE AQUI",
      "completionCondition": "ferramenta.tipo !== null && ferramenta.diametro > 0",
      "next": "ajuste-fino"
    },
    {
      "id": "ajuste-fino",
      "type": "drawer-highlight",
      "target": "drawer-ajuste-fino",
      "tickerMessage": "AJUSTE OS PARÂMETROS DE CORTE ◆ VEL. DE CORTE · AVANÇO · ENGAJAMENTOS",
      "badgeText": "↑ REVISE AQUI",
      "completionCondition": "drawer_opened === true",
      "note": "Basta abrir a gaveta — parâmetros já têm defaults. Não exigir edição.",
      "next": "seguranca"
    },
    {
      "id": "seguranca",
      "type": "drawer-highlight",
      "target": "drawer-seguranca",
      "tickerMessage": "VERIFIQUE O FATOR DE SEGURANÇA ◆ RECOMENDADO 0.80 PARA MAIORIA DAS OPERAÇÕES",
      "badgeText": "↑ VERIFIQUE AQUI",
      "completionCondition": "drawer_opened === true",
      "note": "Mesmo comportamento — abrir é suficiente.",
      "next": "simular"
    },
    {
      "id": "simular",
      "type": "button-highlight",
      "target": "btn-simular",
      "tickerMessage": "TUDO PRONTO ◆ CLIQUE EM CALCULAR PARÂMETROS PARA VER RPM E AVANÇO",
      "badgeText": "← CLIQUE AQUI",
      "completionCondition": "resultado !== null",
      "next": "complete"
    },
    {
      "id": "complete",
      "type": "celebration",
      "tickerMessage": "PARÂMETROS CALCULADOS ◆ RPM E AVANÇO PRONTOS PARA USO NA MÁQUINA",
      "action": "set_onboarding_completed",
      "next": null
    }
  ]
}
```

### 5.2 Lógica de progressão

- Step avança **automaticamente** quando `completionCondition` é satisfeita (via Zustand subscription)
- Exceção: step `welcome` avança apenas por clique explícito
- Step `simular` avança quando `resultado !== null` (após simular retornar dados)

---

## 6. Progress System (Dots)

### 6.1 Visual
5 dots exibidos no rodapé do visor central durante onboarding:

```
● ○ ○ ○ ○   → Config Base
● ● ○ ○ ○   → Ferramenta
● ● ● ○ ○   → Ajuste Fino
● ● ● ● ○   → Segurança
● ● ● ● ●   → Pronto para calcular
```

**Dot ativo:** `background: #00D9FF`, `width: 20px` (pill shape)  
**Dot inativo:** `background: rgba(255, 255, 255, 0.2)`, `width: 8px`, `border-radius: 50%`  
**Transição:** `width 300ms ease`, `background 300ms ease`  
**Posição:** centralizado abaixo dos gauges, acima do rodapé de avisos

---

## 7. Persistência

### 7.1 Chave localStorage
```
tooloptimizer:onboarding
```

### 7.2 Estrutura do objeto
```typescript
interface OnboardingState {
  completed: boolean;      // true = nunca mais mostrar
  currentStep: string;     // id do step atual (ex: "ferramenta")
  skipped: boolean;        // true = usuário pulou em algum momento
  startedAt: string;       // ISO 8601 — para métricas futuras
  completedAt?: string;    // ISO 8601 — quando concluiu (se concluiu)
}
```

### 7.3 Comportamento do Skip

**Se o usuário clicar "PULAR" no Welcome Modal:**
- Salva `skipped: true` e `currentStep: "config-base"` 
- Fecha o modal
- **NÃO** mostra destaques nas gavetas
- Letreiro Digital passa para modo normal (mensagens informativas)
- Na próxima abertura: onboarding **não** é exibido novamente
- `completed` é marcado como `true` para não reiniciar

**Rationale:** Skip = intenção explícita de não ser guiado. Não persistir step parcial para retomar — usuário experiente que pulou não quer ser lembrado.

---

## 8. Celebration (AHA Moment)

Quando `resultado !== null` e onboarding estava ativo:

1. Letreiro Digital muda para mensagem de conclusão (ver 5.1)
2. RPM e Avanço no visor pulsam em cyan por 1.5s:
   ```css
   @keyframes aha-pulse {
     0%   { filter: drop-shadow(0 0 0px rgba(0, 217, 255, 0)); }
     50%  { filter: drop-shadow(0 0 20px rgba(0, 217, 255, 0.8)); }
     100% { filter: drop-shadow(0 0 0px rgba(0, 217, 255, 0)); }
   }
   ```
3. Dots desaparecem com fade-out 500ms
4. Salva `completed: true` e `completedAt: new Date().toISOString()` no localStorage
5. Após 2s, letreiro passa para modo normal rotativo

---

## 9. Integração com Admin Dashboard

### 9.1 Métricas via `usage-store` (já existente)

**Fora do MVP** — não implementar na primeira versão. O `usage-store.ts` já existe e pode ser estendido futuramente com:

```typescript
// Adicionar ao trackUsage() quando pronto:
trackOnboardingEvent({
  event: 'step_completed' | 'skipped' | 'aha_reached',
  step: string,
  sessionDurationMs: number
});
```

### 9.2 O que fazer agora (MVP)
Apenas salvar o estado no localStorage. Nenhuma integração com `/admin` necessária na primeira versão.

---

## 10. Componentes a criar/modificar

### 10.1 Novos componentes

| Arquivo | Descrição |
|---------|-----------|
| `src/components/ticker-display.tsx` | Letreiro Digital rotativo |
| `src/components/onboarding/welcome-modal.tsx` | Modal de boas-vindas |
| `src/components/onboarding/onboarding-controller.tsx` | Orquestra todos os steps |
| `src/components/onboarding/drawer-highlight.tsx` | Wrapper de highlight/pulse nas gavetas |
| `src/hooks/use-onboarding.ts` | Hook de estado do onboarding |

### 10.2 Componentes a modificar

| Arquivo | O que muda |
|---------|------------|
| `src/components/config-panel.tsx` | Adicionar estrutura de gavetas colapsáveis + data-testid |
| `src/components/results-panel.tsx` | Adicionar TickerDisplay no topo + dots de progresso |
| `src/components/collapsible-section.tsx` | Adicionar prop `pulsing?: boolean` para highlight |
| `src/store/machining-store.ts` | Nenhuma mudança — apenas leitura de estado existente |

### 10.3 data-testid necessários

```
data-testid="drawer-config-base"
data-testid="drawer-ferramenta"
data-testid="drawer-ajuste-fino"
data-testid="drawer-seguranca"
data-testid="btn-simular"
data-testid="ticker-display"
data-testid="onboarding-dots"
data-testid="welcome-modal"
data-testid="btn-comecar"
data-testid="btn-pular"
```

---

## 11. Hook `use-onboarding.ts`

```typescript
interface UseOnboardingReturn {
  isActive: boolean;
  currentStep: OnboardingStep | null;
  currentStepId: string;
  progress: number;          // 0.0 a 1.0
  advanceStep: () => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;  // para dev/debug
}

const STEP_ORDER = [
  'config-base',
  'ferramenta', 
  'ajuste-fino',
  'seguranca',
  'simular'
] as const;

// Leitura do store Zustand para verificar completionCondition:
// - material: useMachiningStore(s => s.materialSelecionado)
// - tipoOperacao: useMachiningStore(s => s.tipoUsinagem)
// - ferramenta: useMachiningStore(s => s.ferramentaSelecionada)
// - resultado: useMachiningStore(s => s.resultado)
```

---

## 12. Testes necessários

```
tests/onboarding/
  use-onboarding.test.ts          — lógica de steps, persistência, skip
  ticker-display.test.tsx         — render, rotação de mensagens
  welcome-modal.test.tsx          — render, botões, actions
  onboarding-controller.test.tsx  — fluxo completo E2E
```

**Casos de teste críticos:**
- Onboarding não aparece se `completed: true`
- Step avança automaticamente quando condição é satisfeita
- Skip salva estado e não reinicia na próxima sessão
- AHA celebration dispara apenas uma vez
- Letreiro exibe mensagem correta por step

---

## 13. Ordem de implementação recomendada

1. `CollapsibleSection` — adicionar prop `pulsing` + dados de resumo no header
2. `TickerDisplay` — componente isolado, sem dependências externas
3. `use-onboarding` hook — estado puro, sem UI
4. `WelcomeModal` — modal simples
5. `OnboardingController` — orquestra tudo
6. Integrar em `App.tsx` ou `results-panel.tsx`
7. Testes

---

## 14. Decisões de produto (registradas)

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| Skip salva ou retoma? | Finaliza onboarding | Usuário que pula não quer ser guiado |
| Checklist pós-onboarding? | Não no MVP | Adicionar complejidade desnecessária na v1 |
| Métricas no MVP? | Não | usage-store existe mas integração é pós-lançamento |
| Texto do botão Simular | "CALCULAR PARÂMETROS" | Mais direto ao resultado esperado |
| Letreiro permanente? | Sim | Canal de informação após onboarding = valor permanente |

---

*Documento gerado em 01/04/2026 | ToolOptimizer CNC v0.10.0+ | Para implementação via Claude Code*
