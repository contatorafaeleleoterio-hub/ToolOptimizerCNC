# RELATÓRIO DE VERIFICAÇÃO INDEPENDENTE — FASE 4 (CICLO 3: REACT UI)

**Verificador:** Morfeu · **Data:** 2026-09-09 · **Contexto de avaliação:** isolado (entregável + `spec.md` + `design.md` + `tasks.md` + suítes).
**Objeto:** `src/ui/` (TASK-009 a TASK-013), casca React sobre o Core/Storage já homologados.

---

## 1. Comandos Executados e Evidências do Terminal

| Comando | Exit | Saída resumida | Critério | Resultado |
|---|---|---|---|---|
| `npm run check` | **0** | `tsc --noEmit` limpo; Vitest `Test Files 12 passed (12)`, `Tests 88 passed (88)`, duração 11,47s | 0 erros de tipo, 88/88 | **OK** |
| `npm run build` | **0** | `vite v8.2.2`, `30 modules transformed`, `dist/index.html 0.41 kB`, `dist/assets/index-*.css 24.16 kB`, `dist/assets/index-*.js 238.30 kB (gzip 72.37 kB)`, `built in 433ms` | bundle sem dependência externa faltante | **OK** |
| `node Docs_inicial/construcao/prototipo/testes/test_suite_dinamica.js` | **0** | `TODOS OS 50/50 TESTES FORAM EXECUTADOS COM SUCESSO!` | 50/50, regressão zero | **OK** |
| `node Docs_inicial/construcao/prototipo/testes/test_contraste.js` | **0** | 7 pares aferidos ≥ mínimo WCAG AA; `os 61 tokens da §3 batem com o CSS`; `PALETA APROVADA` | 100% WCAG AA + sincronia | **OK** |
| `node Docs_inicial/construcao/prototipo/testes/test_suite.js` | **0** | `Cenário cenario1..cenarioMandrilar: verificado e validado`; `TODOS OS TESTES PASSARAM` | 5/5 cenários | **OK** |

**Decomposição dos 88 testes** (verificada por contagem de arquivos):
Core `adjust 18 · analyzer 11 · drilling 9 · milling 10 · storage 6 · tools 6` = **60** (intacto).
Harness `harness 11` = **11** (intacto).
UI `App 2 · inputs 3 · results 4 · settings 3 · store 5` = **17** (novo).
Total **88**. Bate com o declarado no `ESTADO.md`.

**Portão mecânico: 5/5 verde.** Nenhuma regressão. O motor não repete o pecado do Ciclo 1 — não há constante literal fingindo cálculo nem teste anotado como *"simplified for harness"*; as asserções de `results.spec.tsx` e `store.spec.tsx` cravam grandezas físicas reais (`n=4456`, `vf=1070`, `hm=0,029`, `Pc=0,28`, `Mc=0,60`) derivadas da cadeia canônica.

---

## 2. Avaliação por Dimensão

### A. Especificação e Cenários Contratuais — **Nota 6,5/10**

**Atende:**
- **Cenário A** — `ResultsPanel` abre em "Painel Inicial Zerado"; `ConfigForm` com selects vazios; botão Calcular `disabled` até `canCalculate`. Coberto (`inputs.spec.tsx`, `store.spec.tsx`).
- **Cenários B e C** — `canCalculate` (memo em `CalculatorContext.tsx:139`) só libera com material + ferramenta + requisitos mínimos da família (toroidal ainda exige `r`). Coberto.
- **Cenários D a H (live calculation)** — `nominalResults` recalcula a cada mudança de input; `store.spec.tsx` prova `vc 140→180` recalculando `n 4456→5730` sem novo clique. OK.
- **AC-003 / Cenário 3 (ae > D)** — nível CRÍTICO com alerta "remoção fora da aresta física", **sem bloquear R1**: o `try/catch` em `nominalResults` não engole o resultado válido e `ResultsPanel` renderiza os hero numbers. Coberto (`results.spec.tsx`).
- **AC-004 (±5%)** — `adjustRPM(-5)` entra como `nOverride` na cadeia direta; `fz` não se move (asserção explícita em `store.spec.tsx`). O passo é de 5% (`sSteps * 5`).

**Não atende / parcial:**
- **AC-005, 2ª cláusula ("deve estar disponível no painel de cálculo imediatamente") — FALHA.** `SettingsView` grava o material customizado no IndexedDB via `saveMaterial`, mas `ConfigForm.tsx:3,55` e `CalculatorContext.tsx:80` leem **só `FACTORY_MATERIALS`**, nunca `getAllMaterials()`. Material cadastrado pelo operador **não aparece no seletor de cálculo e não pode ser selecionado**. `storage.ts:getAllMaterials()` já entrega fábrica+custom mesclados — a função existe e não é chamada no caminho de cálculo.
- **AC-006 — PARCIAL.** `applySafetyMargin` (core) está correto e é aplicado como último passo. Mas: (1) a margem persistida no IndexedDB **não é carregada no boot** do `CalculatorContext` — só passa a valer depois que o operador reabre Configurações e salva de novo na mesma sessão; ao recarregar a página, os 85% persistidos são ignorados; (2) **não há aviso visual de "margem ativa"** no `ResultsPanel` (regra 8 do `MVP §4.9`); `isSafetyMarginVisible` é exportado e nunca usado na UI.
- **R1 / "nunca pelo silêncio" — FALHA em Roscar e Mandrilar.** `FamilyNav` mostra as 4 abas e `ConfigForm` renderiza os campos de roscar/mandrilar; `canCalculate` libera o botão para essas famílias (`CalculatorContext.tsx:160-166`). Mas `nominalResults` só trata `fresar` e `furar` — clicar Calcular em Roscar/Mandrilar devolve `null` e a tela volta a "Painel Inicial Zerado", sem alerta. O protótipo Golden Master trata as 4 famílias; a casca regrediu para um beco sem saída silencioso.

### B. Código e Integração — **Nota 6,5/10**

**Atende:**
- **Sem duplicação de equação.** Kienzle/afinamento/Taylor só no Core; a UI importa `calculateMilling`, `calculateDrilling`, `steppedValue`, `deduceFz`, `deduceFn`, `applySafetyMargin`, `formatNumber` e consome. `display.ts` é reusado para formatação pt-BR (R3).
- **Sem mock/stub indevido em produção.** `FACTORY_MATERIALS`/`FACTORY_TOOLS` são dados de fábrica legítimos (transcrição de canônicos), não stubs. Nenhum `TODO`/`simplified`/valor hardcoded de resultado.
- **Persistência isolada e offline-first** em `storage.ts` (via `idb`, `fake-indexeddb` nos testes) — assincronia contida fora do Core.
- **L01 resolvido de fato:** `manuallyEditedRef` (useRef) estabiliza as assinaturas de `selectMaterial`/`selectTool`/`updateField`, quebrando o loop de re-render no jsdom.

**Não atende / parcial:**
- **Regra de dependência `UI → Storage → Core` (`design.md §1.2`) violada no caminho principal.** `ConfigForm` e `CalculatorContext` vão direto a `core/materials` e `core/tools`, pulando a camada Storage. Só `SettingsView` respeita `UI → Storage`. É a causa-raiz da falha do AC-005.
- **Tipagem fraca no contrato de estado.** `currentInputs: Record<string, any>` e `updateField(field: string, value: any)` — o `any` anula a checagem de tipo justamente na fronteira UI↔motor, enfraquecendo a alegação de "aplicação React tipada". Compila sob `strict` porque `any` é explícito.
- **Casamento de ID de ferramenta frágil:** `FACTORY_TOOLS.find(t => ... || t.id.includes(normalizedId))` (`CalculatorContext.tsx:103`) — `includes` pode casar mais de uma geometria; funciona hoje pelos IDs atuais, quebra silenciosamente ao adicionar geometria com prefixo comum.

### C. Testes e Robustez — **Nota 7/10**

**Atende:**
- Asserções reais sobre comportamento e grandeza física, não sobre implementação. Linhagem verificada por mutação nos ciclos anteriores (alterar fórmula quebra a suíte).
- `settings.spec.tsx` usa `fake-indexeddb/auto` e afere persistência real (`getConfig`, `getAllMaterials`) após `fireEvent`.
- Nenhum teste artificial/frágil detectado; nenhum teste marcado `skip`/`todo`.

**Não atende:**
- **Cobertura ausente para US-006 / AC-006** — nenhum teste toca `safetyMargin` no fluxo de cálculo.
- **Cobertura ausente para a 2ª cláusula do AC-005** — `settings.spec.tsx` prova a gravação, mas não que o material aparece no `ConfigForm`. O teste passa exatamente onde a implementação falha.
- **AC-004 coberto pela metade** — `store.spec.tsx` valida a queda de `n` e `fz` fixo, mas não a invariância de `Mc` em 0,60 N·m nem a queda de 5% de `F`/MRR/`Pc` (cláusulas explícitas do `spec.md §4`).
- Roscar/Mandrilar sem nenhum teste de UI (coerente com o beco sem saída não detectado).

### D. Regressão e Integridade — **Nota 10/10**

- Core: **60/60** intactos (contagem por arquivo confirma; nenhuma spec removida ou afrouxada).
- Harness: **11/11** intactos.
- Suíte dinâmica de usinagem: **50/50**, zero regressão.
- Suíte da Specification Sheet: **5/5**. Contraste/paleta: aprovado.
- `tsc --noEmit` limpo sob `strict + noUncheckedIndexedAccess + exactOptionalPropertyTypes`.

### E. Segurança e Arquitetura — **Nota 7/10**

**Atende:**
- **Zero rede.** Nenhum `fetch`/`XHR`/`WebSocket`/CDN no código de UI. Build gera bundle estático autocontido; `react`, `react-dom`, `idb` são dependências autorizadas e empacotadas localmente. `index.html` sem `<script>` ou `<link>` externo.
- **Core puro preservado** — nenhuma importação de `window`/`document`/`fetch`/`IndexedDB` no Core; `environment: 'node'` mantido como padrão inviolável, `// @vitest-environment jsdom` só por arquivo de UI (L02).
- **`LESSONS.md`** registra incidentes reais e específicos (L01 loop de re-render por callback instável; L02 incompatibilidade de ambiente Vitest v5), com causa-raiz e regra de prevenção — não é decorativo.

**Não atende:**
- **`UI → Storage → Core` quebrado** no caminho de cálculo (ver B). É violação de decisão arquitetural registrada, não preferência de estilo.
- A "direção anti-vibração" (`MVP §7.4`) foi reimplementada no `ResultsPanel` como texto condicional a `LD > 4.0`, **não no `analyzer.ts`** — coerente com a nota do `ESTADO.md` de que o motor não gera direção, mas mantém regra de produto na camada visual, que o `design.md §1.1` diz não poder acontecer ("Nenhuma regra de negócio deve estar num componente visual"). Menor, porque é texto de orientação e não cálculo, mas é dívida de altitude.

---

## 3. Score Final e Diagnóstico

**Score: 75/100** (média das cinco dimensões: 6,5 · 6,5 · 7 · 10 · 7). **Threshold de aprovação: ≥ 85.**

**Bloqueadores Críticos:**
1. **AC-005 não cumprido** — material customizado persistido não fica disponível no painel de cálculo (`ConfigForm`/`CalculatorContext` leem `FACTORY_MATERIALS`, nunca `getAllMaterials()`). Rastreabilidade `TASK-013 → AC-005` rompida.
2. **Violação da regra de dependência `design.md §1.2` (`UI → Storage → Core`)** no fluxo principal — causa-raiz de (1).

**Não bloqueadores, mas exigem correção antes do próximo ciclo:**
3. AC-006 parcial: margem persistida não carrega no boot; sem aviso de margem ativa na tela; zero cobertura de teste.
4. R1 "silêncio": abas Roscar/Mandrilar habilitam Calcular e não produzem resultado nem alerta.
5. Lacunas de cobertura: AC-006 (total), AC-005 2ª cláusula, AC-004 (invariância de `Mc` e queda de `F`/MRR/`Pc`).
6. `any` no contrato de estado; casamento de ID de ferramenta por `includes`.

**O que está sólido:** portão mecânico 5/5 verde, zero regressão em Core/Harness/dinâmica, motor honesto (sem o fingimento do Ciclo 1), testes de UI com asserção física real, zero rede confirmada, `LESSONS.md` substantivo.

---

## 4. Veredito Final

# REPROVADO

Score 75 < 85, com dois bloqueadores críticos. A reprovação é **estreita e cirúrgica**: não há defeito de cálculo, não há regressão, não há dependência não autorizada, e o portão mecânico está inteiramente verde. O que falta é a fiação da camada Storage no caminho de cálculo — sem ela o AC-005 fica por cumprir e a arquitetura de `design.md §1.2` fica violada. Corrigidos os itens 1 e 2 (e idealmente 3 e 4), a entrega passa.

**Caminho de aprovação (mínimo):**
- `ConfigForm` e `CalculatorContext` passam a consumir materiais/ferramentas via a camada Storage (`getAllMaterials` / equivalente para tools), com fallback a fábrica.
- Teste novo: material cadastrado em `SettingsView` aparece e é selecionável no `ConfigForm` (fecha AC-005).
- Carregar `getConfig().safetyMargin` no boot do `CalculatorContext` + aviso de margem ativa no `ResultsPanel` + teste de AC-006.
- Roscar/Mandrilar: ou desabilitar as abas com nota "em construção", ou emitir alerta explícito no lugar do silêncio.
