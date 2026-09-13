# Reavaliação de Auditoria Independente — Fase 4, Ciclo 3 (React UI)

**Auditor:** Morfeu (verificação independente) · **Data:** 09/09/2026
**Alvo:** TASK-009 a TASK-013 · **Relatório anterior:** `VERIFICACAO_FASE4_CICLO3_MORFEU_2026-09-09.md` (75/100, REPROVADO)
**Threshold:** ≥ 85/100 e zero bloqueadores críticos.

---

## 1. Portão mecânico — comandos e exit codes

| # | Comando | Resultado observado | Exit |
|---|---|---|---|
| 1 | `npm run check` | `tsc --noEmit` limpo · **93/93 testes, 13 arquivos**, 15,0 s | **0** |
| 2 | `npm run build` | `vite v8.2.2` · 30 módulos · `index.js` 240,49 kB (gzip 73,05) · `index.css` 24,16 kB · 535 ms | **0** |
| 3 | `node .../testes/test_suite_dinamica.js` | **50/50** — "TODOS OS 50/50 TESTES FORAM EXECUTADOS COM SUCESSO" | **0** |
| 4 | `node .../testes/test_contraste.js` | **61 tokens** sincronizados com `DESIGN_SYSTEM_FENIX.md §3`, todos os pares ≥ 4,5:1 (ou ≥ 3:1 onde aplicável) | **0** |
| 5 | `node .../testes/test_suite.js` | 5 cenários da specification sheet verificados, inclusive `cenarioRoscar` e `cenarioMandrilar` | **0** |

**O portão mecânico está inteiramente verde.** Cinco de cinco. Nada abaixo contradiz isto — o que segue é o que a suíte não mede.

---

## 2. Situação dos seis achados da avaliação anterior

| # | Achado anterior | Situação | Evidência |
|---|---|---|---|
| 1 | **AC-005 (bloqueador)** — material do IndexedDB indisponível no cálculo | **SANADO** | `CalculatorContext.tsx:70-90` carrega `getAllMaterials()` no boot; `ConfigForm.tsx:55` itera `materials` do contexto, não `FACTORY_MATERIALS`; `SettingsView.tsx:66-72` grava e chama `refreshMaterials()`; teste em `integration.spec.tsx:24` |
| 2 | **Arquitetura (bloqueador)** — UI lendo Core direto | **SANADO no caminho de material/config; VIOLADO de forma nova no caminho de fórmula** | ver bloqueador **B3** |
| 3 | **AC-006 (parcial)** — margem não carregava no boot, sem aviso, sem teste | **SANADO** | `CalculatorContext.tsx:83-89` (`getConfig`), aviso em `ResultsPanel.tsx:55-72`, teste em `integration.spec.tsx:56` afere 85% escalando `n`/`vf` e **não** escalando `hm`/`hex`/`CTF`/`L/D`/`kc` |
| 4 | **R1 (silêncio)** — Roscar e Mandrilar habilitavam Calcular e devolviam `null` | **SANADO NA LETRA, ÀS CUSTAS DA REGRA NO-INVENTION** | ver bloqueadores **B2** e **B3** |
| 5 | **Lacunas de cobertura** | **SANADO** | 5 testes novos, todos com grandeza física real — o de AC-004 afere `Mc` invariante em 0,60 N·m enquanto `Pc`, `F` e `MRR` caem 5% |
| 6 | **Tipagem** — `any` no contrato e casamento por `.includes()` | **NÃO SANADO** | ver **F1** |

---

## 3. Bloqueadores críticos remanescentes

### B1 — A família **Furar** entrega número de máquina 8,8× errado e o rotula NORMAL

`CalculatorContext.selectMaterial` (linha 116) preenche `vc` com `mat.vcReference` **em qualquer família**. O `vcReference` é, pela documentação do próprio arquivo que o publica (`materials.ts:11-13`), velocidade de **fresa de metal duro**.

Sonda executada nesta auditoria (broca helicoidal Ø10, aço 1045, valores de partida do produto, sem intervenção do operador):

```
>>> FURAR vc de partida = 140      (canônico §2.1: HSS 16–30 m/min)
>>> FURAR nível/alerta   = NÍVEL DE SEGURANÇA: NORMAL — "Parâmetros dentro da zona
                           recomendada e estável de usinagem."
>>> FURAR S / F exibidos = 4.452 rpm | 445 mm/min
```

O caso verificador normativo do **AC-002** é `Ø10 / vc 16 → S 508 · F 50`. A casca entrega **4.452 rpm**, e a tarja diz NORMAL.

Por que nenhum alerta dispara: `analyzer.ts:114-117` documenta literalmente este falso negativo — *"a referência é a partida desta combinação material × ferramenta, não a do material, que vale para fresa de metal duro... comparar 16 m/min de broca de aço rápido contra 140 m/min de fresa é falso positivo"* — e por isso o gatilho 4 só roda com `vcStart` informado. O `CalculatorContext` (linhas 236-243) **nunca passa `vcStart`**. O core se protegeu; a casca contornou a proteção.

Agravante: `CalculatorContext.tsx:235` fixa `substrate = tool.substrates.includes('HSS-Co') ? 'HSS-Co' : 'MD'`. Como `broca-helicoidal` declara os dois substratos, **toda** broca helicoidal é calculada como aço rápido, com a aritmética de truncamento de oficina, sem o operador jamais escolher.

A própria nota de fonte do AC-002 nomeia o defeito: *"A velocidade de partida da combinação (16 m/min) vem de `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO §2.1`, **não da partida de fresa do material**."*

### B2 — A família **Roscar** reproduz o erro de fator ~8 que o canônico foi escrito para matar

```
>>> ROSCAR vc de partida = 140     (canônico §2.2: 10–18 m/min, partida ~14)
>>> ROSCAR nível/alerta   = CRÍTICO — [Gatilho 8] "Velocidade de corte (140 m/min)
                            excede o teto seguro para machos de corte (40 m/min)."
```

O `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO`, que **vence** nas famílias furar, roscar e mandrilar, abre a lista de precedência exatamente com isto (item 1): *"A velocidade de corte do macho obtida por fator de substrato sobre a velocidade de fresamento — o valor de ~140 m/min do sistema anterior, que é a velocidade de fresamento de metal duro rotulada como velocidade de macho. Erro de fator ~8."* O produto abre a aba Roscar já dentro do erro nomeado, e em CRÍTICO.

O teto de 40 m/min também está aplicado à família inteira. O canônico §1.8 separa: **40 para macho de corte, ~60 para macho de conformação**, e **fresa de rosca é fresamento** — usa a `vc` de fresamento, sem teto de macho. Consequências reproduzíveis: `macho-conformacao` a 45 m/min (que é o valor **tabelado** do canônico §2.2 para 1045) dispara CRÍTICO falso; `fresa-rosca` dispara CRÍTICO em qualquer velocidade normal de fresamento.

### B3 — Motor de Roscar e Mandrilar inventado dentro da camada de apresentação

`CalculatorContext.tsx:251-345` implementa Kienzle, potência, torque e taxa de remoção das duas famílias **dentro do arquivo de contexto React**. Três problemas somados:

**(a) Camada errada.** `CLAUDE.md` Fase 2 DESIGN: *"O core é TypeScript puro e síncrono... Nenhuma regra matemática deve depender do DOM ou da rede"*, e `design.md §1.2` fixa UI → Storage → Core. O bloqueador de arquitetura anterior foi corrigido no caminho do material e reaberto, maior, no caminho da fórmula. Nenhuma dessas fórmulas tem teste unitário em `src/core/__tests__/` — só passam de raspão pela renderização.

**(b) Duplicação com divergência.** `kc = kc1_1 · h^(−mc)` agora existe em quatro pontos (`calculator.ts:77`, `calculator.ts:129`, `CalculatorContext.tsx:264` e `:312`). Pior: o torque **diverge**. O core usa `Mc = kc·fn·D²/8000` (canônico §1.3, confiança "a mais alta da rodada"); a UI usa `Mc = Pc·9549/n`. Duas fórmulas de torque para a mesma família de ferramentas, em dois arquivos.

**(c) Números sem fonte, contra a regra No-Invention.** O canônico abre com ela: *"nenhuma fórmula, constante de cálculo ou limiar derivado de constante física entra sem fonte citada"*.

| Onde | O que está no código | O que o canônico manda |
|---|---|---|
| `:267` Q de roscar | `Q = π·D²·vf/4000` — a fórmula de **furação**, que enche o furo inteiro | O canônico **não publica** MRR de roscamento. O número exibido é invenção |
| `:265` Pc de roscar | `Pc = kc·P·D·vc/240000` — a fórmula de furação com `fn → P` | Sem fonte para a adaptação |
| `:313` Q de mandrilar | `Q = π·D·ap·vf/1000` | §1.12: `Q = π·(D_final² − D_inicial²)·fn·n/4000`. Falta exatamente o termo `(1 − ap/Dc)` que a §1.11 chama de *"o único termo que não existe no torneamento"*. Erro de `D/(D−ap)`: +5% no caso do teste, **+20% num Ø40→Ø60**, que é o caso que a §1.13 usa para explicar o termo |
| `ConfigForm.tsx:253-267` | campo `ap` **digitado** para mandrilar | Precedência item 7, nominal: *"A profundidade de corte de mandrilamento digitada diretamente — é grandeza derivada dos dois diâmetros; digitada, entra com erro de fator 2"*. §1.11: `ap = (D_final − D_inicial)/2`, entrada pelos **dois diâmetros**. A própria `tools.ts:55` declara `extraFields: initialD, finalD, re, fn` — a ferramenta pede os dois diâmetros e o formulário pede `ap` |
| `:255-256`, `:304-305`, `:416` | `inp.pitch` ou 1.25 · `inp.L` ou 30 · `inp.ap` ou 1.0 · `Number(currentInputs.D)` ou 10 | Fallbacks mudos. Em Roscar, sem `L` digitado o painel exibe `L/D` calculado sobre um balanço de 30 mm que ninguém informou |

**Observação de escopo, em favor da entrega:** motor de Roscar e Mandrilar **não estava no Ciclo 3**. `tasks.md` TASK-009 a TASK-013 não o pedem, e TASK-004 declara os gatilhos 8 e 9 *"fora do escopo desta tarefa, por falta de família implementada"*. O achado R1 anterior podia ser fechado de forma cirúrgica — desabilitar Calcular nas famílias sem motor canônico, com o motivo na tela. O caminho escolhido trocou silêncio por número inventado, que é o modo de falha mais caro dos dois.

---

## 4. Achados não bloqueantes

**F1 — Tipagem: o que foi declarado sanado não foi.** `CalculatorInputs` **não existe** em nenhum arquivo do repositório (`grep -rn "CalculatorInputs" src/` → zero ocorrências); os inputs seguem `Record<string, InputValue>`. O `any` segue em `CalculatorContext.tsx:171` (`const num = (v: any) => ...`). O casamento por `.includes()` foi eliminado só na **busca** da ferramenta (`:131`, ID exato ✓); a **classificação de geometria** continua por substring em `:177`, `:208`, `:209`, `:362`, `:363` e `ConfigForm.tsx:33-34` — o `ToolGeometry` não carrega campo de geometria, então a string do `id` segue sendo o discriminante.

**F2 — O teste de Roscar mascara o defeito B2.** `integration.spec.tsx:168` digita `updateField('vc', 20)`, sobrescrevendo a partida de 140. O caminho que o operador realmente percorre — selecionar material e olhar a tela — não é exercido por teste nenhum. Nenhum teste cobre valor de partida por família.

**F3 — AC-005, 3ª cláusula.** O teste de integração não afere *"nenhuma requisição de rede deve ocorrer"*. A verificação estática confirma zero `fetch` e zero URL em `src/` e `index.html`, e o bundle é autocontido — mas a cláusula não tem teste que a defenda contra regressão.

**F4 — §1.10 não implementado.** Teto de hardware de rotação em roscamento (~2.500–2.700 rpm, `CONSENSO` entre territórios) não existe no código. Lacuna, não defeito.

---

## 5. Avaliação por dimensão

| Dimensão | Nota | Fundamento |
|---|---|---|
| **A — Especificação e cenários** | **5/10** | AC-001, AC-003, AC-004, AC-005 (as duas cláusulas), AC-006, R2 e R3 de pé e testados. Contra: a nota de fonte do AC-002 violada na casca (B1), e três itens **nominais** da lista de precedência do canônico que vence nessas famílias — itens 1 (B2), 4 e 7 (B3) |
| **B — Código e arquitetura** | **4/10** | Bloqueador anterior sanado no caminho de material/config. Reaberto maior no caminho de fórmula: motor de duas famílias na camada React, `kc` em quatro pontos, torque divergindo do core, quatro fallbacks mudos, `any` e `.includes()` sobrevivendo ao que foi declarado corrigido |
| **C — Testes e robustez** | **7/10** | 93/93 reais; os 5 novos aferem grandeza física de verdade (invariância de `Mc`, não-escala de `hm`/`hex`/`CTF`/`kc`). Contra: zero teste de core para roscar/mandrilar, zero teste de valor de partida por família — que é onde mora o defeito — e o teste de roscar sobrescreve o default que falha |
| **D — Regressão e integridade** | **10/10** | `src/core` e `src/harness` intocados. 50/50 dinâmico, 61 tokens WCAG, suíte original e 5 cenários da specification sheet, todos verdes. Zero regressão |
| **E — Segurança e offline-first** | **10/10** | Zero rede, zero CDN, bundle autocontido de 240 kB. Dependências novas (react, react-dom, vite, @vitejs/plugin-react, jsdom, @testing-library/*, @types/*) todas justificadas por TASK-009. Nenhuma não autorizada |

**Score final: (5 + 4 + 7 + 10 + 10) / 5 = 7,2 → 72/100**

---

## 6. Veredicto

# REPROVADO

**Score 72/100 < 85, com três bloqueadores críticos ativos (B1, B2, B3).**

Os dois bloqueadores da rodada anterior foram **efetivamente corrigidos** — a fiação Storage está certa, o AC-006 está inteiro, e os cinco testes novos são de verdade, não decorativos. A reprovação não é por eles.

É por isto: a rodada anterior mediu a fiação e concluiu *"não há defeito de cálculo"*. Havia — o caminho do **valor de partida por família** não tinha sido sondado. Uma broca de aço rápido Ø10 em aço 1045 sai da tela a **4.452 rpm** com a tarja verde escrita NORMAL, e um macho de corte abre a aba já nos 140 m/min que o canônico documenta como o erro de fator ~8 do sistema anterior. É o modo de falha exato contra o qual este projeto escreveu um canônico inteiro.

**Correção mínima para nova submissão:**

1. **B1/B2** — `vc` de partida por **combinação família × ferramenta × material**, nunca `material.vcReference` fora de fresar; passar `vcStart` a `calculateDrilling` para o gatilho 4 voltar a rodar; substrato escolhido pelo operador quando a ferramenta suporta os dois.
2. **B2** — teto de macho por tipo: 40 (corte), ~60 (conformação), nenhum para fresa de rosca (§1.8).
3. **B3** — mover roscar e mandrilar de `CalculatorContext.tsx` para `src/core/`, com `Q` de mandrilamento na forma do anel exato (§1.12), a correção `(1 − ap/Dc)` na potência **uma única vez** (§1.13), `ap` derivado dos dois diâmetros (§1.11) e teste de core por fórmula. **Ou** — e é a saída legítima, já que nada disso estava no escopo do Ciclo 3 — remover as duas famílias do caminho de cálculo, mantendo o motivo na tela, e devolvê-las ao roteiro como tarefa própria com o canônico na mão.
4. **F1** — tipar os inputs de verdade e mover a geometria para campo de `ToolGeometry`, encerrando o `.includes()`.
5. **F2** — teste que afere o valor de partida de cada família contra o canônico, sem sobrescrever.

Corrigidos B1, B2 e B3, e reexecutado o portão de cinco comandos, a entrega passa.

---

*Verificação isolada conduzida por Morfeu. Evidência de execução: os cinco comandos do §1, mais uma sonda de renderização temporária sobre o `CalculatorProvider` — criada, executada e removida, sem deixar artefato em `src/`. Nenhum arquivo de produção foi alterado nesta auditoria.*
