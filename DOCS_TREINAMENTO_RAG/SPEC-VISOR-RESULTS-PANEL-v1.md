# Especificação Visual — Visor de Resultados (Results Panel)

**Documento:** SPEC-VISOR-RESULTS-PANEL-v1.md
**Projeto:** ToolOptimizer CNC
**Data:** 30/03/2026
**Autor:** Rafael (decisões de design) + Claude (documentação técnica)
**Finalidade:** Orientar implementação por IA ou desenvolvedor — documento autossuficiente

---

## 1. Contexto do Projeto

**ToolOptimizer CNC** é um sistema desktop (web) para cálculo e recomendação de parâmetros de corte CNC. O operador seleciona material, ferramenta e tipo de operação, clica em "Simular", e o sistema calcula RPM, Avanço, Potência, Torque e outros parâmetros derivados.

**Stack:** React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + Zustand
**Plataforma alvo:** Desktop (min-width: 1360px), com versão mobile responsiva
**Tema:** Dark theme com glassmorphism, fundo `#0F1419`

---

## 2. O Que Está Sendo Feito

**Refatoração completa do visor de resultados** (`results-panel.tsx`). O visor atual usa flexbox desalinhado, sem hierarquia visual clara — visualmente parece quebrado. Esta especificação define o novo layout, ordem dos dados, design visual e regras de contraste.

**Objetivo:** Criar um visor com estilo "planilha técnica estruturada" onde cada dado tem importância visual proporcional à sua relevância para o operador CNC.

---

## 3. Onde o Visor Fica no Sistema

**Localização na interface:**

```
┌─────────────────────────────────────────────────────────────┐
│                    BARRA SUPERIOR (Header)                   │
├────────────┬──────────────────────────┬─────────────────────┤
│            │                          │                     │
│  PAINEL    │    ████████████████      │   PAINEL            │
│  CONFIG    │    ████ VISOR ████      │   AJUSTE FINO       │
│  (esq.)   │    ████████████████      │   (dir.)            │
│            │    ████████████████      │                     │
│  Material  │                          │   Sliders Vc,       │
│  Ferram.   │   ESTE DOCUMENTO        │   fz, ap, ae        │
│  Operação  │   DEFINE ESTE PAINEL    │   + indicadores     │
│  Simular   │                          │                     │
│            │                          │                     │
├────────────┴──────────────────────────┴─────────────────────┤
│                    RODAPÉ (Footer)                            │
└─────────────────────────────────────────────────────────────┘
```

**Arquivo fonte:** `src/components/results-panel.tsx`
**Store de dados:** `src/store/machining-store.ts` (estado `resultado` após `calcular()`)
**Componente pai:** `src/App.tsx` → layout principal em 3 colunas

---

## 4. Dimensões e Posicionamento

| Propriedade | Valor |
|-------------|-------|
| Posição no layout | Coluna central do layout de 3 colunas |
| Largura | Flex-grow, ocupa espaço restante entre config (esq.) e fine-tune (dir.) |
| Largura estimada | ~500-600px em tela 1360px, até ~800px em tela 1920px |
| Altura | Conteúdo dinâmico, scroll interno se ultrapassar viewport |
| Padding interno | `p-4` (16px) no container geral |
| Estado vazio | Quando `resultado === null`, exibe placeholder "Clique em Simular" |
| Estado preenchido | Exibe todas as 5 linhas + cabeçalho conforme esta especificação |

---

## 5. Conceito de Design

**Estilo: "Planilha Técnica Estruturada"**

Cada dado é um par vertical composto por:
- **Label** (topo): tamanho `text-sm` (14px), peso `font-medium`, cor `rgba(255,255,255,0.70)` — legível sem competir com o valor
- **Caixa de valor** (abaixo): fundo `rgba(45,55,70,0.90)`, borda `rgba(255,255,255,0.15)`, cantos `rounded-md`, padding interno uniforme

**Regra de largura:** Caixas NÃO têm tamanho uniforme. Cada uma ocupa largura proporcional à importância e ao comprimento do dado. Campos com texto longo são mais largos; campos numéricos curtos são estreitos. Ritmo visual irregular intencional — aspecto de planilha técnica, não dashboard genérico com cards iguais.

**Tipografia dos valores:** `font-mono` (JetBrains Mono), cor branca ou temática conforme zona de segurança. Unidades exibidas inline ao lado do valor em `rgba(255,255,255,0.50)`.

---

## 6. Paleta de Contraste

| Elemento | Cor | Função | WCAG |
|----------|-----|--------|------|
| Background página | `#0F1419` | Base do sistema | — |
| Container visor | `rgba(35,45,58,0.95)` | Camada 1 — separa visor do fundo | — |
| Caixa de valor | `rgba(45,55,70,0.90)` | Camada 2 — destaca cada dado | — |
| Borda das caixas | `rgba(255,255,255,0.15)` | Delimita sem pesar | — |
| Label | `rgba(255,255,255,0.70)` | Descrição do dado | ~7:1 AA |
| Valor primário | `#FFFFFF` | Dados zona primária | ~12:1 AAA |
| Valor secundário | `rgba(255,255,255,0.85)` | Dados zona secundária | ~9:1 AAA |
| Unidade inline | `rgba(255,255,255,0.50)` | Sufixo (mm, kW, Nm) | ~5:1 AA |
| Semáforo verde | `#2ecc71` | Parâmetro seguro | — |
| Semáforo amarelo | `#f39c12` | Alerta de vibração | — |
| Semáforo vermelho | `#e74c3c` | Crítico | — |

---

## 7. Hierarquia de Relevância

| Nível | Itens # | Conteúdo | Tratamento visual |
|-------|---------|----------|-------------------|
| **PRIMÁRIO** | 1 a 10 | Contexto, ferramenta, RPM, avanço, parâmetros de entrada | Área nobre, caixas maiores, fontes `text-3xl`/`text-4xl`, padding maior |
| **SECUNDÁRIO** | 11 a 20 | Gauges, potência, torque, L/D, CTF | Área inferior, caixas menores, fontes `text-lg`/`text-xl`, padding reduzido |

---

## 8. Estrutura e Ordem dos Dados (20 itens)

### CABEÇALHO (barra horizontal compacta — contexto da simulação)

> **Nota:** Item #16 (badge de segurança) está no CABEÇALHO propositalmente, não na LINHA 5. A numeração 1-3, 16 é intencional — os itens 4-15 estão nas linhas do grid abaixo.

| # | Dado | Exemplo | Lado | Fonte de dados |
|---|------|---------|------|----------------|
| 1 | Data e hora | 29/03/2026 17:14 | Esquerdo | `new Date()` no momento do cálculo |
| 2 | Material | Aço 1045 | Esquerdo | `store.material.nome` |
| 3 | Tipo de operação | Desbaste | Esquerdo | `store.tipoOperacao` |
| 16 | Badge de segurança | CRÍTICO | Direito | `resultado.seguranca` (semáforo) |

**Botão favoritar (★):** Canto superior direito do visor, ao lado do badge. Posição fixa, sempre visível — padrão UI de ação contextual. Favorita o conjunto completo de resultados exibidos.

**Estilo do cabeçalho:** Sem caixas individuais. Texto corrido separado por `·` ou espaçamento. Fundo ligeiramente diferenciado ou borda inferior sutil para separar do conteúdo principal.

---

### ZONA PRIMÁRIA — Destaque máximo

**LINHA 1 — Ferramenta (caixa única, largura total)**

| # | Dado | Exemplo | Largura |
|---|------|---------|---------|
| 4 | Ferramenta completa | Toroidal Ø6 R1 H25 F4 | 100% |

**Formato fixo:** `[Tipo] Ø[Diâmetro] R[Raio] H[Fixação] F[Hélices]`

- Raio aparece somente se aplicável (ferramenta toroidal/bull nose)
- Fonte de dados: `store.ferramenta` (tipo, diametro, raio, alturaFixacao, numHelices)
- Nomenclatura hélices: sempre `F` + quantidade (ex: F4 = 4 hélices)
- Font-mono, tamanho grande (`text-2xl`), todos os dados na mesma caixa
- Esta é a caixa mais larga do visor — identifica "o que está cortando"

---

**LINHA 2 — RPM e Avanço (2 caixas grandes, destaque máximo)**

| # | Label | Dado | Unidade | Largura |
|---|-------|------|---------|---------|
| 5 | RPM | Rotação | — | 50% |
| 6 | Avanço | Avanço de mesa | mm/min | 50% |

- Fonte de dados: `resultado.rpm`, `resultado.avanco`
- **Caixas mais altas do visor.** Valor em `text-3xl` ou `text-4xl`, font-mono
- Cor conforme semáforo (verde/amarelo/vermelho baseado em limites da máquina)
- Padding vertical maior que todas as demais caixas
- São os dados que o operador precisa ler em < 1 segundo

---

**LINHA 3 — Parâmetros de entrada (4 caixas iguais)**

| # | Label | Dado | Unidade | Largura |
|---|-------|------|---------|---------|
| 7 | Vc | Velocidade de corte | m/min | 25% |
| 8 | fz | Avanço por dente | mm | 25% |
| 9 | ap | Profundidade axial | mm | 25% |
| 10 | ae | Profundidade radial | mm | 25% |

- Fonte de dados: `store.parametros` (vc, fz, ap, ae)
- 4 caixas de largura igual — mesmo tipo de dado, comprimento similar
- Estes são os valores que o operador INSERIU, não calculados

---

### ZONA SECUNDÁRIA — Informação de apoio

**LINHA 4 — Indicadores / Gauges (4 caixas iguais)**

| # | Label | Dado | Tipo | Largura |
|---|-------|------|------|---------|
| 11 | Fator de Correção | Valor numérico | Número | 25% |
| 12 | Eficiência de Avanço | Valor do gauge | Gauge/% | 25% |
| 13 | Produtividade MRR | Valor do gauge | Gauge/% | 25% |
| 14 | Saúde da Ferramenta | Valor do gauge | Gauge/% | 25% |

- Fonte de dados: cálculos derivados de `resultado` (funções em `src/components/gauges/`)
- Valores exibidos como número ou percentual
- Fontes menores que zona primária (`text-lg`)

---

**LINHA 5 — Dados calculados secundários (5 caixas, largura variável)**

| # | Label | Dado | Unidade | Largura |
|---|-------|------|---------|---------|
| 15 | Potência | Potência requerida | kW | 25% |
| 17 | Torque | Torque no eixo | Nm | 25% |
| 18 | Vc Real | Velocidade real calculada | m/min | 25% |
| 19 | L/D | Relação comprimento/diâmetro | — | 12.5% |
| 20 | CTF | Fator thin wall correction | — | 12.5% |

- Fonte de dados: `resultado.potencia`, `resultado.torque`, `resultado.vcReal`, `resultado.ldRatio`, `resultado.ctf`
- L/D e CTF são os dados menos relevantes — **caixas mais estreitas** do visor
- L/D exibe cor conforme faixa: ≤3 verde, 3-4 amarelo, 4-6 vermelho, >6 BLOQUEADO

---

## 9. Layout Visual Completo

```
┌──────────────────────────────────────────────────────────────────┐
│ 29/03/2026 17:14 · Aço 1045 · Desbaste          [CRÍTICO]  [★] │
├──────────────────────────────────────────────────────────────────┤
│ FERRAMENTA                                                       │
│ [ Toroidal Ø6 R1 H25 F4                                       ] │
├──────────────────────────────────────────────────────────────────┤
│ RPM                          │ AVANÇO                            │
│ [      9.337          ]      │ [    8.635 mm/min        ]        │
│  ████ GRANDE ████            │  ████ GRANDE ████                 │
├──────────────────────────────────────────────────────────────────┤
│ Vc           │ fz          │ ap          │ ae                    │
│ [ 176 m/min ]│ [ 0.14 mm ] │ [ 4.2 mm ] │ [ 2.2 mm ]           │
├──────────────────────────────────────────────────────────────────┤
│ Fat.Correção │ Efic.Avanço │ Prod. MRR  │ Saúde Ferram.         │
│ [   1.65   ] │ [  78%    ] │ [ 79.8   ] │ [  85%    ]           │
├──────────────────────────────────────────────────────────────────┤
│ Potência    │ Torque      │ Vc Real      │ L/D   │ CTF          │
│ [ 3.39 kW ] │ [ 3.46 Nm ] │ [ 176 m/min ]│ [ 4.2]│ [1.65]      │
└──────────────────────────────────────────────────────────────────┘
```

---

## 10. Regras Gerais

1. **Labels em todo o visor:** `text-sm` (14px), `font-medium`, `rgba(255,255,255,0.70)` — sempre legíveis, nunca minúsculos
2. **Cores dos valores:** Semáforo em RPM, Avanço, Potência, L/D e badges
3. **Zona primária:** `text-3xl`/`text-4xl`, padding `p-4`, contraste AAA
4. **Zona secundária:** `text-lg`/`text-xl`, padding `p-3`, contraste AA mínimo
5. **Favoritar:** Canto superior direito, ícone estrela, toggle on/off
6. **Estado vazio:** Quando `resultado === null`, visor exibe placeholder centralizado
7. **Animação:** Valores entram com `fadeInUp` após simulação (já existe no sistema)
8. **Responsividade:** Este documento cobre versão desktop. Mobile será especificado separadamente (item #11 da lista de implementações)

---

## 11. Próximas Sessões

**Item #1 — APROVADO ✅**
- Especificação completa do design do visor de resultados (este documento)

**Item #2 — PRÓXIMA SESSÃO**
- ATUALIZAÇÃO 1.2: Adicionar Botão "Editar Ferramenta" + Modal ToolEditModal
- Estrutura do modal, campos editáveis, validações, integração com store

---

## 12. Mapeamento Técnico do Codebase

### Componentes Envolvidos

| Componente | Arquivo | Linhas | Props/Interface |
|------------|---------|--------|-----------------|
| `ResultsPanel` | `src/components/results-panel.tsx` | 1-267 | Sem props (lê do store) |
| `BigNumber` | `src/components/shared-result-parts.tsx` | 51-92 | `BigNumberProps` (label, value, unit, pct, color, glow, barGlow, icon, useBidirectionalSlider?, baseValue?, currentPercent?, onPercentChange?) |
| `ProgressCard` | `src/components/shared-result-parts.tsx` | 94-109 | `{ label, value, unit, pct, barColor, barShadow, compact? }` |
| `SafetyBadge` | `src/components/shared-result-parts.tsx` | 111-121 | `{ nivel: StatusSeguranca['nivel'], avisosCount: number }` |
| `WarningsSection` | `src/components/shared-result-parts.tsx` | 123-139 | `{ avisos: string[] }` |
| `MetricCell` | `src/components/shared-result-parts.tsx` | 25-37 | `{ label, value, unit, unitColor }` |
| `HalfMoonGauge` | `src/components/half-moon-gauge.tsx` | 56-185 | `{ value, maxValue, label?, palette?, badge?, size?: 'sm'\|'md' }` — **Palettes aceitas:** `'avanco' \| 'power' \| 'health' \| 'mrr'` (type `ColorPalette`, L6) |
| `ToolSummaryViewer` | `src/components/tool-summary-viewer.tsx` | — | Sem props (lê do store) |
| `FormulaCard` / `Fraction` | `src/components/formula-card.tsx` | — | Fórmulas educacionais |
| `fmt()` | `src/components/shared-result-parts.tsx` | 5 | `(n: number) => string` — `Math.round(n).toLocaleString('pt-BR')` |

### Estado Atual do Código (`results-panel.tsx`)

**Store selectors consumidos (linhas 33-46):**
```ts
const storeResultado = useMachiningStore((s) => s.resultado);      // ResultadoUsinagem | null
const limites = useMachiningStore((s) => s.limitesMaquina);         // LimitesMaquina
const parametros = useMachiningStore((s) => s.parametros);          // ParametrosUsinagem
const ferramenta = useMachiningStore((s) => s.ferramenta);          // Ferramenta
const safetyFactor = useMachiningStore((s) => s.safetyFactor);      // number
const baseRPM = useMachiningStore((s) => s.baseRPM);                // number
const baseFeed = useMachiningStore((s) => s.baseFeed);              // number
const manualOverrides = useMachiningStore((s) => s.manualOverrides); // ManualOverrides
const tipoOperacao = useMachiningStore((s) => s.tipoOperacao);      // TipoUsinagem
const historyEntries = useHistoryStore((s) => s.entries);           // HistoricoCalculo[]
const toggleFavorite = useHistoryStore((s) => s.toggleFavorite);    // (id: string) => void
```

**Estrutura atual (5 zonas — linhas 72-264):**
```
ZONA 1 (L75-99):  SafetyBadge + Botão ★ favoritar (useHistoryStore)
ZONA 2 (L101-114): 2× BigNumber (RPM + Avanço) com BidirectionalSlider
ZONA 3 (L117-126): 4× ProgressCard (Potência, Vc Real, Torque, MRR)
ZONA 4 (L129-150): 3× HalfMoonGauge (Eficiência Avanço, MRR, Saúde Ferramenta)
ZONA 5 (L152-263): Reset message + WarningsSection + 5× FormulaCard educacional
```

**Constantes relevantes:**
```ts
const MRR_BENCHMARKS: Record<TipoUsinagem, number> = {
  DESBASTE: 50, SEMI_ACABAMENTO: 20, ACABAMENTO: 5,
};
const EMPTY_RESULTADO: ResultadoUsinagem = { rpm: 0, avanco: 0, ... }; // fallback quando null
```

**Botão favoritar atual (linhas 80-98):**
- Conectado a `useHistoryStore.toggleFavorite(latestEntry.id)`
- Usa `latestEntry = historyEntries[0]` — o mais recente do histórico
- Ícone: Material Symbols `star` com `fontVariationSettings: "'FILL' 1"` quando favoritado
- Cor: `#facc15` (yellow-400) com drop-shadow quando ativo

### Interfaces/Types Relevantes

```ts
// src/types/index.ts:113-125
interface ResultadoUsinagem {
  rpm: number; avanco: number; potenciaCorte: number; potenciaMotor: number;
  torque: number; mrr: number; vcReal: number; fzEfetivo: number;
  seguranca: StatusSeguranca; powerHeadroom: number; healthScore: number;
}

// src/types/index.ts:39-46
interface Ferramenta {
  tipo: 'toroidal' | 'esferica' | 'topo'; diametro: number;
  numeroArestas: number; balanco: number; raioQuina?: number;
  paramRanges?: ToolParamRanges;
}

// src/types/index.ts:103-108
interface StatusSeguranca {
  nivel: 'verde' | 'amarelo' | 'vermelho' | 'bloqueado';
  avisos: string[]; razaoLD: number; ctf: number;
}

// src/types/index.ts:82-87
interface ParametrosUsinagem { ap: number; ae: number; fz: number; vc: number; }
```

---

## 13. Plano de Implementação

### Arquivos a Criar / Modificar

| Arquivo | Ação | Linhas afetadas |
|---------|------|-----------------|
| `src/components/results-panel.tsx` | Refatorar — substituir layout flex atual por grid estruturado (5 linhas spec) | L72-264 (todo o JSX) |
| `src/components/shared-result-parts.tsx` | Possível: novo componente `ValueBox` para célula do grid | Adicionar após L37 |

### Sequência de Execução

1. **Criar grid container principal** — substituir `<div className="flex flex-col gap-3">` (L72) por grid com 5 linhas
2. **Implementar CABEÇALHO** — nova barra horizontal com:
   - Data/hora: `new Date().toLocaleString('pt-BR')` (salvar no momento do cálculo)
   - Material: `MATERIAIS.find(m => m.id === materialId)?.nome`
   - Operação: `tipoOperacao` (mapeado para label PT-BR)
   - SafetyBadge (existente, L78)
   - Botão ★ (existente, L80-98) — manter conectado a `useHistoryStore` por ora (ITEM-10 migrará para `useFavoritesStore`)
3. **LINHA 1 — Ferramenta** — caixa full-width com formato `[Tipo] Ø[D] R[R] H[H] F[Z]`:
   - Fonte: `ferramenta.tipo`, `.diametro`, `.raioQuina`, `.balanco`, `.numeroArestas`
   - Reutilizar lógica de `ToolSummaryViewer` ou inline novo formato
4. **LINHA 2 — RPM + Avanço** — 2× `BigNumber` existentes (L102-113), mover para grid 50/50
5. **LINHA 3 — Vc, fz, ap, ae** — 4 caixas iguais com dados de `parametros` (input do usuário, não calculados)
   - Usar novo componente `ValueBox` ou `MetricCell` adaptado
6. **LINHA 4 — Indicadores** — Fator Correção (`safetyFactor`), 3× `HalfMoonGauge` existentes (L130-149)
7. **LINHA 5 — Dados secundários** — Potência, Torque, Vc Real (3× `ProgressCard` existentes), + L/D (`seguranca.razaoLD`), CTF (`seguranca.ctf`)
8. **Estado vazio** — placeholder centralizado quando `resultado === null` (substituir lógica atual L69/153-163)
9. **Animação fadeInUp** — aplicar `animate-[fadeInUp_0.4s_ease-out]` no container ao receber resultado
10. **Remover FormulaCards da zona 5** — mover para seção colapsável separada ou manter abaixo do grid

### Dependências

- **Depende de:** nenhum item (é o primeiro da sequência)
- **Bloqueia:** ITEM-8 (mobile replica), ITEM-9 (cassino — precisa da estrutura final)

### Edge Cases e Riscos

| Risco | Mitigação |
|-------|-----------|
| Botão ★ conectado a `useHistoryStore` — ITEM-10 cria `useFavoritesStore` separado | Manter conexão atual; ITEM-10 migrará depois |
| `ToolSummaryViewer` já renderiza ferramenta — remoção pode quebrar outros consumidores | **Antes de remover, executar:** `grep -r "ToolSummaryViewer" src/ --include="*.tsx"` — se só aparecer em `results-panel.tsx` → remover com segurança. Se aparecer em outros → manter arquivo, apenas remover do grid |
| FormulaCards ocupam ~100 linhas — decidir se ficam no grid ou fora | Manter fora do grid principal, em seção colapsável abaixo |
| Tailwind dinâmico (`text-${color}`) — não funciona em purge | Usar `style={{ color }}` inline ou mapa estático (padrão existente `SEG_COLORS`) |
| `EMPTY_RESULTADO` como fallback quando null — visor deve mostrar placeholder, não zeros | Verificar: usar `storeResultado !== null` para condicional, não `resultado` (que nunca é null) |

### Critérios de Aceitação

- Layout em grid com 5 zonas distintas (cabeçalho + 4 linhas)
- Tipografia hierárquica: zona primária `text-3xl`/`text-4xl`, zona secundária `text-lg`/`text-xl`
- Paleta de contraste conforme seção 6 (WCAG AA mínimo)
- Caixas com largura proporcional à importância (estilo planilha técnica)
- Cores de semáforo em RPM, Avanço, Potência, L/D
- Todos os 20 dados da spec exibidos na ordem correta
- Estado vazio com placeholder centralizado (não zeros)

### Testes

| Teste | Descrição |
|-------|-----------|
| `renders empty state when resultado is null` | Placeholder "Clique em Simular" visível |
| `renders all 20 data items with complete resultado` | Todos os 20 dados presentes no DOM |
| `safety badge colors match semaforo rules` | verde/amarelo/vermelho/bloqueado com classes corretas |
| `primary zone uses large typography` | RPM/Avanço com `text-3xl` ou maior |
| `secondary zone uses smaller typography` | Potência/Torque com `text-lg` ou menor |
| `favorite button toggles state` | Clicar ★ chama `toggleFavorite`, visual muda |
| `ferramenta line shows correct format` | `[Tipo] Ø[D] R[R] H[H] F[Z]` |
| `L/D ratio shows correct zone color` | ≤3 verde, 3-4 amarelo, 4-6 vermelho, >6 BLOQUEADO |

---

## 14. Estimativa de Complexidade

| Ação | Peso |
|------|------|
| Refatorar grid container (5 zonas) | 4 |
| Implementar cabeçalho (data, material, operação) | 2 |
| Linhas 1-3 zona primária | 3 |
| Linhas 4-5 zona secundária | 3 |
| Estado vazio + animação | 1 |
| Testes (8 casos) | 3 |
| **Total** | **16 pontos (~2 sessões)** |

---

## 15. Checklist de Verificação

```bash
npm run typecheck   # Zero erros TypeScript
npm run test -- --run   # Todos os testes passando
npm run build       # Build sem erros, bundle size < 110KB gzip
```

---

## 16. REFINAMENTO FINAL (31/03/2026)

### Decisões Resolvidas

| Decisão | Resolução |
|---------|-----------|
| Timestamp — fonte de dados | `useState<string>` + `useEffect` que captura `new Date()` quando `storeResultado` muda de `null` → valor |
| Material — label | `MATERIAIS.find(m => m.id === materialId)?.nome ?? 'Material'` — importar `MATERIAIS` de `@/data` |
| Operação — label | Mapa estático `TIPO_LABEL` no componente (`desbaste` → `'Desbaste'`, etc.) |
| FormulaCards | Permanecem abaixo do grid, sem alteração (seção colapsável existente mantida) |
| `ToolSummaryViewer` | **Remover** do results-panel (L73) — ferramenta agora exibida na LINHA 1 do grid |
| L/D e CTF | Novo componente inline `ValueCell` (2 linhas, sem arquivo separado) para exibir valor com cor condicional |
| Estado vazio | Condicional em `storeResultado === null` — retorna JSX de placeholder sem afetar FormulaCards |
| Botão ★ | Manter conexão com `useHistoryStore` por ora — ITEM-10 migrará depois |

### Imports Adicionais em `results-panel.tsx`

```ts
import { useState, useEffect } from 'react';           // para timestamp
import { MATERIAIS } from '@/data';                    // para material.nome
// já existentes: useMachiningStore, useHistoryStore, TipoUsinagem, ResultadoUsinagem
// já existentes: HalfMoonGauge, fmt, SafetyBadge, BigNumber, ProgressCard, WarningsSection
// FormulaCard e Fraction: NÃO remover do import — componentes permanecem
// abaixo do grid (seção colapsável existente), apenas saem da ZONA PRIMÁRIA do grid.
// O import continua necessário.
// REMOVER: ToolSummaryViewer (substituído pela LINHA 1)
```

### Código Proposto — Estrutura Principal (Depois)

```tsx
export function ResultsPanel() {
  // — selectors existentes (L33-46) mantidos —
  const materialId = useMachiningStore((s) => s.materialId);      // NOVO

  // Timestamp capturado no momento da simulação
  const [calcTimestamp, setCalcTimestamp] = useState('');
  useEffect(() => {
    if (storeResultado !== null) {
      setCalcTimestamp(
        new Date().toLocaleString('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
        })
      );
    }
  }, [storeResultado]);

  // Labels
  const material = MATERIAIS.find((m) => m.id === materialId);
  const TIPO_LABEL: Record<TipoUsinagem, string> = {
    [TipoUsinagem.DESBASTE]: 'Desbaste',
    [TipoUsinagem.SEMI_ACABAMENTO]: 'Semi-acabamento',
    [TipoUsinagem.ACABAMENTO]: 'Acabamento',
  };
  const ferramentaLabel = [
    ferramenta.tipo.charAt(0).toUpperCase() + ferramenta.tipo.slice(1),
    `Ø${ferramenta.diametro}`,
    ferramenta.raioQuina != null ? `R${ferramenta.raioQuina}` : null,
    `H${ferramenta.balanco}`,
    `F${ferramenta.numeroArestas}`,
  ].filter(Boolean).join(' ');

  // Estado vazio
  if (storeResultado === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-500 p-8">
        <span className="material-symbols-outlined text-5xl opacity-30">precision_manufacturing</span>
        <p className="text-sm text-center leading-relaxed">
          Configure os parâmetros e clique em{' '}
          <strong className="text-primary">SIMULAR</strong> para ver os resultados
        </p>
      </div>
    );
  }

  const resultado = storeResultado;
  const { rpm, avanco, potenciaMotor, torque, mrr, vcReal, seguranca } = resultado;

  // MRR percentual (MRR_BENCHMARKS já existe no arquivo)
  const mrrPct = Math.min((mrr / MRR_BENCHMARKS[tipoOperacao]) * 100, 100);

  // Variáveis derivadas
  const latestEntry = historyEntries[0] ?? null;
  const isFavorited = latestEntry?.favorited ?? false;
  const pulseClass = triggerPulse ? 'animate-[subtlePulse_0.5s_ease-in-out]' : '';

  // Percentuais para progress bars
  const rpmPct    = Math.min((rpm / limites.maxRPM) * 100, 100);
  const feedPct   = Math.min((avanco / limites.maxFeed) * 100, 100);
  const powerPct  = Math.min((potenciaMotor / limites.maxPower) * 100, 100);
  const torquePct = Math.min((torque / limites.maxTorque) * 100, 100);

  // Selectors adicionais (RPM/Feed manual override)
  const setManualRPMPercent  = useMachiningStore((s) => s.setManualRPMPercent);
  const setManualFeedPercent = useMachiningStore((s) => s.setManualFeedPercent);

  return (
    <div className="flex flex-col gap-3 animate-[fadeInUp_0.4s_ease-out]">

      {/* ══ CABEÇALHO ══ */}
      <div className="flex items-center justify-between px-3 py-1.5
                      bg-white/[0.03] rounded-xl border border-white/8">
        <span className="text-xs text-gray-400 font-mono truncate">
          {calcTimestamp} · {material?.nome ?? 'Material'} · {TIPO_LABEL[tipoOperacao]}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <div className={pulseClass}>
            <SafetyBadge nivel={seguranca.nivel} avisosCount={seguranca.avisos.length} />
          </div>
          {latestEntry && (
            <button
              aria-label={isFavorited ? 'Remover dos favoritos' : 'Favoritar simulação'}
              onClick={() => toggleFavorite(latestEntry.id)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/30
                         border border-white/10 hover:bg-white/5 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base transition-all"
                style={{
                  fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0",
                  color: isFavorited ? '#facc15' : undefined,
                  filter: isFavorited ? 'drop-shadow(0 0 6px rgba(250,204,21,0.5))' : undefined,
                }}>star</span>
            </button>
          )}
        </div>
      </div>

      {/* ══ LINHA 1 — Ferramenta (full-width) ══ */}
      <div className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-3">
        <div className="text-xs text-white/70 font-medium mb-0.5 uppercase tracking-wider">Ferramenta</div>
        <div className="font-mono text-2xl text-white">{ferramentaLabel}</div>
      </div>

      {/* ══ LINHA 2 — RPM + Avanço (2 caixas grandes) ══ */}
      <div className="grid grid-cols-2 gap-3">
        <BigNumber label="Rotação (RPM)" value={fmt(rpm)} unit="RPM" pct={rpmPct}
          color="primary" glow="rgba(0,217,255,0.4)" barGlow="rgba(0,217,255,1)" icon="speed"
          useBidirectionalSlider baseValue={baseRPM}
          currentPercent={manualOverrides.rpmPercent ?? 0}
          onPercentChange={setManualRPMPercent} />
        <BigNumber label="Avanço (mm/min)" value={fmt(avanco)} unit="mm/min" pct={feedPct}
          color="secondary" glow="rgba(57,255,20,0.4)" barGlow="rgba(57,255,20,1)" icon="moving"
          useBidirectionalSlider baseValue={baseFeed}
          currentPercent={manualOverrides.feedPercent ?? 0}
          onPercentChange={setManualFeedPercent} />
      </div>

      {/* ══ LINHA 3 — Parâmetros de entrada (4 caixas iguais) ══ */}
      <div className="grid grid-cols-4 gap-2">
        {([
          { key: 'vc', label: 'Vc',  unit: 'm/min',    val: parametros.vc.toFixed(0)  },
          { key: 'fz', label: 'fz',  unit: 'mm/dente', val: parametros.fz.toFixed(3)  },
          { key: 'ap', label: 'ap',  unit: 'mm',       val: parametros.ap.toFixed(2)  },
          { key: 'ae', label: 'ae',  unit: 'mm',       val: parametros.ae.toFixed(1)  },
        ] as const).map(({ key, label, unit, val }) => (
          <div key={key} className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-2">
            <div className="text-xs text-white/70 font-medium mb-0.5">{label}</div>
            <div className="font-mono text-lg text-white/85 leading-tight">
              {val} <span className="text-xs text-white/50">{unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ══ LINHA 4 — Indicadores (Fat. Correção + 3 Gauges) ══ */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-3
                        flex flex-col justify-center">
          <div className="text-xs text-white/70 font-medium mb-1">Fat. Correção</div>
          <div className="font-mono text-lg text-white/85">
            {Math.round(safetyFactor * 100)}%
          </div>
        </div>
        <HalfMoonGauge value={avanco} maxValue={limites.maxFeed}
          label="Eficiência de Avanço" palette="avanco" />
        <HalfMoonGauge value={mrrPct} maxValue={100}
          label="Produtividade MRR" palette="mrr"
          badge={`${mrr.toFixed(1)} cm³/min`} />
        <HalfMoonGauge value={resultado.healthScore} maxValue={100}
          label="Saúde da Ferramenta" palette="health" />
      </div>

      {/* ══ LINHA 5 — Dados secundários (5 colunas, L/D e CTF mais estreitos) ══ */}
      <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr 1fr 0.55fr 0.55fr' }}>
        <ProgressCard label="Potência Est." value={potenciaMotor.toFixed(2)} unit="kW"
          pct={powerPct} barColor="bg-accent-orange" barShadow="rgba(249,115,22,0.5)" compact />
        <ProgressCard label="Torque" value={resultado.torque.toFixed(2)} unit="Nm"
          pct={torquePct} barColor="bg-purple-500" barShadow="rgba(168,85,247,0.5)" compact />
        <ProgressCard label="Vc Real" value={vcReal.toFixed(0)} unit="m/min"
          pct={Math.min(vcReal / 500 * 100, 100)}
          barColor="bg-blue-500" barShadow="rgba(59,130,246,0.5)" compact />
        {/* ValueCell — componente inline para L/D e CTF */}
        <LdCell razao={seguranca.razaoLD} />
        <div className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-2">
          <div className="text-xs text-white/70 font-medium mb-0.5">CTF</div>
          <div className="font-mono text-base text-white/85">{seguranca.ctf.toFixed(2)}</div>
        </div>
      </div>

      <WarningsSection avisos={seguranca.avisos} />

      {/* Fórmulas educacionais — mantidas abaixo do grid (sem alteração) */}
      <div className="bg-surface-dark ...">
        {/* FormulaCards existentes — sem mudança */}
      </div>
    </div>
  );
}

/** Célula L/D com cor condicional por faixa */
function LdCell({ razao }: { razao: number }) {
  const color =
    razao <= 3 ? '#2ecc71' :
    razao <= 4 ? '#f39c12' :
    razao <= 6 ? '#e74c3c' : '#e74c3c';
  const label = razao > 6 ? 'BLOQ.' : razao.toFixed(1);
  return (
    <div className="bg-[rgba(45,55,70,0.90)] border border-white/15 rounded-md p-2">
      <div className="text-xs text-white/70 font-medium mb-0.5">L/D</div>
      <div className="font-mono text-base font-bold" style={{ color }}>{label}</div>
    </div>
  );
}
```

### Testes — Nomes Exatos (describe/it)

```ts
describe('ResultsPanel', () => {
  it('renders placeholder when resultado is null', ...)
  it('renders all 5 grid zones with complete resultado', ...)
  it('cabeçalho shows material name, operação and timestamp', ...)
  it('linha 1 shows ferramenta label in format [Tipo] Ø[D] R[R] H[H] F[Z]', ...)
  it('linha 2 RPM and Avanço use large BigNumber components', ...)
  it('linha 3 shows input parametros (vc fz ap ae) not calculated values', ...)
  it('linha 4 shows safetyFactor as percentage', ...)
  it('linha 5 L/D shows green for razao <= 3', ...)
  it('linha 5 L/D shows yellow for razao 3-4', ...)
  it('linha 5 L/D shows red and BLOQ. for razao > 6', ...)
  it('safety badge reflects seguranca nivel', ...)
  it('favorite button calls toggleFavorite on click', ...)
  it('favorite button shows filled star when isFavorited', ...)
  it('timestamp updates when new resultado arrives', ...)
})
```
