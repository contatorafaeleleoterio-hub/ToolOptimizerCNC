# Plano de Execução — Gauntlet Loop v2: Refactor Visual da Calculadora

> **Status:** ✅ **pronto para executar o E2** (fechado em 14/08/2026) · refatoração **não executada**.
> Instrumentação, contratos, critérios e gates conferidos ponta a ponta: 48 cenários rodando,
> todo gate `script` com executor, as 7 decisões da §13.5 escritas no contrato do Construtor.
> **Item do backlog:** 17 (continuação — refactor da entrega aprovada em 91/100, ciclo 3).
> **Mecânica do loop:** `C:\Users\USUARIO\Desktop\central_rafael\protocolos\protocolo-loop-construtor-juiz-cego.md`.
> **Preparação (E1) já feita:** contratos, suíte, golden values e blindagem estão no repositório.
> A sandbox está coerente: `mockup/index.html` é o aprovado no commit `cd9df17` **mais a correção
> de mensagem da §13.6**, aplicada pelo Orquestrador em 14/08/2026 com os goldens recapturados.
> **Erros a não repetir:** `LESSONS.md` na raiz.

---

## 0. Como ler este plano

A sessão de 13-14/08/2026 revisou este plano, encontrou defeitos nele, e chegou a rodar **um
ciclo completo de ensaio** (Construtor + Juiz cego) antes de ser revertido por não estar
autorizado. O ciclo foi desfeito, mas **o que ele mediu ficou** — e está incorporado aqui.

Isso muda o valor do documento: as seções abaixo não são previsão, são resultado medido.
Onde diz "o Juiz reprovou em 86/100", isso aconteceu de verdade, com evidência citada linha a linha.

---

## 1. Por que este plano existe

O ciclo 3 aprovou o mockup usando os tokens do **FlowNC DS**, que sempre foram placeholder
declarado na Fase 0 anterior. O pedido agora é trocar essa pele pelos tokens reais do
ToolOptimizer e reincorporar elementos que existem em produção (`src/`) mas ficaram fora do
escopo do primeiro loop.

**Contexto que muda o peso da decisão:** a calculadora atual **vai ser desativada** e substituída
por esta. Paridade de recurso importa — não dá para entregar menos do que o operador já tem hoje.

---

## 2. Correção de rota — o plano anterior estava errado em 3 pontos

| Premissa antiga | Realidade verificada |
|---|---|
| "os testids continuam no `<input type=radio>`, risco baixo de quebrar os 23 cenários" | Os 23 cenários usavam `page.selectOption()` em `select-familia`, `select-operacao` e `select-material-ferramenta`. **`selectOption` não funciona em rádio** — a troca por escolha segmentada quebraria praticamente toda a suíte. **Resolvido:** `tests/helpers.ts` traz `escolher()`, que fala com `<select>` e com rádio, e os 23 cenários foram migrados para ele. |
| "barra fine-tune com valores visuais reduzidos" | **Não existe barra de fine-tune no mockup.** O único `type="range"` é o fator de segurança. Os 4 controles de ajuste **nascem** neste refactor. |
| "gauge de Eficiência de Avanço = Vf efetivo ÷ Vf sugerido" | Sem os controles, isso marcaria 100% fixo — ponteiro morto. Só faz sentido **com** os 4 controles. |

**Correção de comportamento:** os controles **não** recalculam ao vivo. A Regra Crítica 7
(`CLAUDE.md:102`) manda o store não auto-recalcular. Ao arrastar: o valor do parâmetro e a barra
dele mudam na hora; os resultados ficam **velhos** (classe `stale`, opacidade 0,6) até o clique em
Calcular.

---

## 3. Os 6 campos mortos — com evidência

Campos que o operador preenche e que **não entram em conta nenhuma**. Quatro saíram da auditoria
de código; **dois foram achados pelo Juiz cego** e a auditoria tinha deixado passar.

| Campo | Onde | Evidência |
|---|---|---|
| **Refrigeração Interna** | broca de metal duro | Declarado em `TOOLS.broca_md.campos` e renderizado, mas `computeDrilling` **nunca lê** |
| **Sobremetal** | alargador | Lido em `computeDrilling` e **nunca usado** no corpo da função |
| **Nº de Arestas (Z)** | escareador, alargador | Lido e **nunca usado** — furação trabalha por rotação, não por dente. Z só vale para fresa (inclusive a de rosca) |
| **Profundidade (h)** | broca de centro, escareador | **Não é lido em lugar nenhum.** Pior: na broca de centro o campo que faria diferença (comprimento) nem existe, então o tempo sai `—` |
| **Ângulo de Chanfro** | fresa de chanfrar | `computeMilling` lê `anguloPosicao` (κ), **nunca** `anguloBroca` — achado do Juiz |
| **Ângulo de Ponta** | escareador | `computeDrilling` só usa o ângulo para `Lp` quando o tipo é `broca_hss`, `broca_md` ou `broca_centro`. No escareador é decorativo — achado do Juiz |

### Método de prova (reutilizável)

Capturar os golden values → aplicar o corte → recapturar → comparar. Se um número mudar, o corte
não era inerte e é revertido.

Na execução de ensaio isso deu **54/54 idênticos**, e a prova saiu mais forte que o esperado: com
os campos fora do schema, `Z` e `sobremetal` passaram a chegar no motor como `NaN` — e mesmo assim
nenhum resultado mudou.

> **Este método não vale mais para o E2.** Desde 16/08/2026 os goldens não comparam dígito, então
> a inércia dos 6 campos não é mais demonstrável por eles — ela já está demonstrada acima, campo a
> campo, pela função de cálculo que não os lê. O registro do ensaio fica como está.

**Ferramenta:** `node scripts/capture-goldens.mjs [saida.json]`.

---

## 4. Ordem do formulário

A SPEC §5.4 já definia o fluxo e coloca o **ajuste fino como Passo 5, dentro da configuração,
logo antes de Simular**. A §2/§3.3 fixa **categórico → geométrico → contínuo → ação**.

| # | Bloco | `data-testid` | Conteúdo |
|---|---|---|---|
| 1 | Contexto | `bloco-contexto` | **perfil de máquina editável** + fator de segurança. A SPEC §5.3 classifica os dois como contexto, não como campo de peça |
| 2 | Categórico | `bloco-categorico` | família → tipo → material da peça → material da ferramenta → operação |
| 3 | Geométrico | `bloco-geometrico` | campos dimensionais do tipo, sem os 6 mortos |
| 4 | Ajuste fino | `bloco-ajuste-fino` | os 4 controles |
| 5 | Ação | `btn-calcular` | 56px |

**Validação de mercado** (`DOCUMENTACAO_MARKETING_MONETIZACAO/02-ANALISE-COMPETITIVA.md:117-120`):
o ISCAR Tool Advisor — 25 idiomas, plugin de Fusion 360 — é catalogado no próprio dossiê do projeto
com **"2-6 campos de entrada, top 3 recomendações, rápido"** como destaque. G-Wizard e HSMAdvisor
vão para o lado oposto e o dossiê os marca com "UI datada" e "curva de aprendizado" como fraqueza.

**Regra que passa a valer:** todo campo visível por padrão precisa mudar um número que o operador
lê na tela. Teto de **6 campos por tipo**, verificado automaticamente (cenário R11).

---

## 5. Escolha segmentada

| Vira botão de 1 clique | Opções | Continua dropdown | Por quê |
|---|---|---|---|
| `select-familia` | 4 | `select-tipo-ferramenta` | 6–8, muda por família, rótulo longo |
| `select-operacao` | 3 | `select-designacao-rosca` | 8, rótulo técnico longo |
| `select-material-ferramenta` | 4 | `select-material-peca` | 12, bem acima do corte |
| `input-angulo-broca` | 1–3 | | |

Rádio nativo + `<label>`, sem JavaScript de alternância — o rádio já entrega teclado e leitor de
tela de graça. O `data-testid` fica no **container**; cada rádio carrega o `value`.
Ângulo com **uma única opção** não vira seletor: mostra valor fixo.

Alvo mínimo **44px** (ISA-101, operação com luva).

---

## 6. Os 4 controles de ajuste fino

Dentro do painel de configuração, como último bloco antes de Calcular.

### Limites — portados de `src/engine/slider-bounds.ts:25`, sem reinventar

| Parâmetro | Mínimo | Máximo | Passo |
|---|---|---|---|
| **Vc** | 0 | `Vc_max_do_material × 1,3` (sem material: 30–350) | 1 |
| **ae** | 0,01 | **`D`** — limite físico | `D ≤ 1` → 0,01 · `D ≤ 10` → 0,1 · senão 0,5 |
| **ap** | 0,05 | desbaste `D ≤ 6` → `1,0·D`, senão `0,8·D` · semi `0,5·D` · acabamento **0,5 fixo** · teto de **0,1** com `L/D` acima do crítico | 0,05 |
| **fz** | `max(0,002; fz_rec × 0,4)` | `fz_rec × 2,0` | por faixa |

Todo controle **chega no valor recomendado** — quem não mexe obtém exatamente o resultado atual, e
é isso que segura os golden values.

### Mapeamento por família

| Família | Controles |
|---|---|
| Fresar | Vc, fz, ae, ap |
| Furar | Vc, fn — **e fn só onde o motor aceita fn** (U-Drill e mandril têm `fnManual` no schema; as demais brocas não) |
| Roscar | Vc; o passo é travado (avanço é `P × n`) |
| Mandrilar | Vc, fn, ap |

### Textos de ajuda — usar estes, não inventar

De `src/components/fine-tune-panel.tsx:30-51`, já validados em produção. Estrutura de 4 partes:

**Vc — Velocidade de corte (m/min).** Velocidade tangencial na aresta durante o corte. *Aumentar:*
usinagem mais rápida, mas desgaste prematuro e mais calor. *Diminuir:* ferramenta mais protegida,
porém pode manchar o acabamento. *Equilíbrio:* ajuste junto com fz — material mais duro exige Vc menor.

**fz — Avanço por dente (mm/dente).** Espessura do cavaco por aresta em cada passagem. *Aumentar:*
maior taxa de remoção, mas risco de vibração e quebra. *Diminuir:* acabamento mais fino e menor
esforço, porém reduz produtividade. *Equilíbrio:* mantenha dentro da recomendação do fabricante.

**ae — Engajamento radial (mm).** Largura radial de corte — quantos % do diâmetro está em contato.
*Aumentar:* remove mais material por passada, mas aumenta pressão lateral e deflexão. *Diminuir:*
menor força lateral, ideal para paredes finas ou ferramentas longas. *Equilíbrio:* ae abaixo de 50%
do diâmetro aciona a compensação de afinamento de cavaco.

**ap — Profundidade axial (mm).** Principal fator da taxa de remoção. *Aumentar:* MRR sobe, mas
eleva potência e torque exigidos. *Diminuir:* operação mais leve, essencial quando a potência é o
fator limitante. *Equilíbrio:* combine ap alto com ae baixo para desbaste eficiente.

O texto de **fn** não existe em produção e precisa ser escrito antes do ciclo, na mesma estrutura.

---

## 7. Ajuda contextual — padrão consagrado, não caseiro

Combinação de **Disclosure do WAI-ARIA APG** (mecânica), **toggletip** (conteúdo sob demanda em
região viva) e a forma produtizada do **definition tooltip do IBM Carbon** / **rich tooltip do
Material 3**.

- gatilho `ⓘ` de 24px com área de toque de 44px, ao lado do rótulo;
- `aria-expanded` no botão, `aria-controls` apontando para o painel;
- painel com `aria-live="polite"`, **não** `role="tooltip"`;
- **abre por clique**, nunca só por hover;
- fecha com `Esc` e clique fora; um aberto por vez; máximo 280px, com seta.

**Por que não copiar produção:** `src/components/param-explanation.tsx:13-15` abre por hover no
desktop e por clique só no mobile — resultado, **quem navega por teclado nunca consegue abrir**.
Também usa `role="tooltip"` sem `aria-describedby`, não fecha com `Esc` e não fecha ao clicar fora.
Correção do componente real está registrada para a etapa E5.

---

## 8. Os 3 gauges

Zona 5. Arco de 180°, **41 barras**, ponteiro com base circular, valor central em mono 32px, em
SVG/CSS puro.

| Gauge | Valor | Escala |
|---|---|---|
| Eficiência de Avanço | `Vf efetivo ÷ Vf recomendado × 100` | `centered`, `scaleMax` 150 — 100% no meio |
| Produtividade MRR | `Q` já calculado | `ascending`, **0–50 cm³/min**, cortes em 40% e 76% |
| Saúde da Ferramenta | índice já calculado | `ascending`, 0–100, mesmos cortes |

Cores: **a rampa de estado do Design System**, não a paleta do componente de produção.
**Ponteiro em `--tx-1`** — o ponteiro branco da produção some em fundo claro.

**Os três abrem procedência** — foi a prioridade 3 do Juiz no ensaio: gauge calculado e nunca
explicado é dedução na categoria 6.

---

## 9. Perfil de máquina editável

Quatro campos no bloco Contexto escrevendo no objeto `MACHINE` já existente: rotação (12000 rpm),
potência (15 kW), torque (80 Nm) e avanço (5000 mm/min) máximos.

`checkMachineLimits` já lê esse objeto em tempo de execução — **a função não muda**, só os campos
passam a escrever nos valores. Os padrões são os valores atuais, e é por isso que os golden values
continuam batendo.

**Por que importa:** hoje todo alerta de torque e potência é calculado contra uma máquina fictícia
fixa. Numa oficina com centro de 8000 rpm e 7,5 kW, o aviso sai errado **para o lado perigoso**.
É o único item da lista de melhorias que era **defeito**, não preferência.

---

## 10. Design System

Fonte única: **`docs/design/DS_TEMA_CLARO.md`** (criado nesta revisão, canônico). Os três documentos
antigos (`DASHBOARD.md`, `UI_BRANDING.md`, `UI_DESIGN_SPEC_FINAL.md`) viraram derivados.

O que mais derruba ciclo:

1. **Neon é marca, área de trabalho é cinza, cor é estado.**
2. `#00D9FF` e `#39FF14` **nunca** como texto, ícone ou borda — dão **1,5:1** e **1,2:1** sobre
   fundo claro. Como preenchimento com `#0F1419` por cima: 11:1 e 13,7:1. Para marca legível,
   `--ink-primary #005E77`.
3. **Uma rampa de estado só:** ok `#116631` · atenção `#7A4F00` · crítico `#A81E16` · info `#005E77`.
4. **Zero rede.** Medido: o mockup atual dispara **5 requisições ao Google Fonts** — a tela quebra
   numa oficina sem internet. Fonte local, ícone em SVG inline.
5. Sem glass, sem glow, sem orbs.

---

## 11. Blindagem anti-trapaça — o que já está instalado

| Vetor | Trava | Estado |
|---|---|---|
| Builder edita os testes para passar | SHA-256 de `tests/`, `criteria/`, `scripts/` e `research/` | `scripts/freeze.mjs` |
| Gate declarado como "script" sem executor | gates 2/3/4 → `invariantes.spec.ts` · categoria 7 e gate 9 → `check-tokens.mjs` | fechado em 14/08/2026 |
| Builder mexe nos dados de domínio | Região `DADOS` do mockup congelada byte a byte | idem — **trava testada: alterar `maxRPM` de 12000 para 9999 foi detectado e reprovou com exit 1** |
| Builder hardcoda resultado dos testes visíveis | 99 combinações de entrada/saída capturadas antes de qualquer edição (saídas sem os números desde 16/08/2026) | `tests/GOLDEN_VALUES.json` + `goldens.spec.ts` |
| Cenário desligado (`test.skip`/`only`) | Recusa por token + **contagem exata** por grupo | `scripts/check-suites.mjs` |
| Builder mexe fora da sandbox | `git status --porcelain` derrubando o ciclo (antes só imprimia aviso) | `validate-cycle-refactor.ps1` |
| Juiz inflar score | Cego, read-only, **evidência obrigatória** por dedução **e** por nota cheia, prompt variado por ciclo | `JUDGE_CRITERIA_REFACTOR.md` |
| Score alto escondendo categoria podre | **Piso por categoria** | idem |

**Motor não é congelado por byte de propósito** — os controles de ajuste precisam sobrepor
Vc/fz/ae/ap. Quem prova que a **tela** não perdeu nada são os 99 goldens.

**O que os goldens medem mudou em 16/08/2026 (decisão do Mestre):** o mockup é o documento canônico
da tela e o motor definitivo entra depois (`PLAN_MOTOR_CALCULADORA_V2.md`), então os goldens
deixaram de comparar dígito — comparam saída, rótulo, unidade, traço, texto de alerta e formato de
fórmula, com os números mascarados. O que trava o domínio é o congelamento byte a byte da região
`DADOS`; o cálculo continua fora do escopo do Construtor.

**Limite conhecido:** os goldens fixam o **texto** dos alertas (não o número dentro dele). Melhorar
a redação de uma mensagem exige rebaseline feito pelo orquestrador, com o diff inspecionado — nunca
pelo Construtor. Já aconteceu uma vez, em 14/08/2026 — ver §13.6.

---

## 12. Matriz e gates — corte em 95

**Os scores deste loop não são comparáveis com o 91/100 do loop de construção**: base diferente,
matriz diferente. Exigência do protocolo §4/Fase 2.

| # | Categoria | Pts | Quem pontua | Piso |
|---|---|---|---|---|
| 1 | Correção de cálculo e cobertura das 33 entradas | 12 | script | 10 |
| 2 | Usabilidade: economia de setup + ajuda contextual | 14 | Juiz | 11 |
| 3 | Prevenção e recuperação de erro | 12 | Juiz | 10 |
| 4 | Fluxo e estabilidade de layout | 10 | Juiz | 8 |
| 5 | Conformidade HMI industrial — ISA-101 | 12 | Juiz | 10 |
| 6 | Clareza dos parâmetros e procedência | 8 | Juiz | 6 |
| 7 | Fidelidade ao Design System | 12 | script + Juiz | 10 |
| 8 | Acessibilidade: contraste AA, foco, alvo ≥44px | 12 | script | 10 |
| 9 | Indicadores + suíte objetiva | 8 | script + Juiz | 6 |

**14 gates**, um FAIL reprova tudo. Detalhe em `criteria/JUDGE_CRITERIA_REFACTOR.md`.

**Todo gate marcado como `script` tem executor nomeado** — foi conferido um a um em 14/08/2026.
Os gates 2, 3 e 4 ganharam `tests/invariantes.spec.ts`; a parte objetiva da categoria 7 e do gate 9
ganhou `scripts/check-tokens.mjs`. Gate sem executor é gate que passa por omissão, e isso derrubaria
a blindagem inteira por dentro.

---

## 13. O que a execução de ensaio mediu (14/08/2026)

Um ciclo completo rodou e foi revertido. O resultado é o dado mais valioso deste plano.

### 13.1 Resultado

| | |
|---|---|
| Regressão | **23/23** verdes |
| Motor (54 goldens) | **verde** |
| Alvos do refactor | **17/17** verdes |
| Integridade | OK |
| **Veredito do Juiz cego** | **86/100 — REPROVADO** |

Categorias abaixo do piso: **2** (10 < 11), **3** (8 < 10), **5** (9 < 10).

### 13.2 A lição central

**Passar nos 17 alvos automatizados não chega perto de 95.** Os cenários provam presença e
comportamento; não provam qualidade. O Juiz reprovou um mockup com 41/41 verdes.

Consequência para o próximo ciclo: tratar os alvos como **piso**, e o contrato do Construtor
precisa endereçar explicitamente o que o Juiz olhou além deles.

### 13.3 As 3 prioridades apontadas pelo Juiz

1. **Prevenção de erro** — o bloqueio de rotação/avanço excedidos não sugeria ação nenhuma, e
   potência/torque diziam só "reduza ap/ae/Vc", sem número-alvo. É o padrão que o próprio critério
   usa como exemplo do esperado. ✅ **Resolvido pelo Orquestrador** — ver §13.6.
2. **Usabilidade** — os ângulos de chanfro e de escareador não afetam cálculo (§3, campos 5 e 6).
   ✅ **Cobertos por `R10`** e listados no §10 do contrato.
3. **Clareza** — os gauges de Eficiência de Avanço e Saúde da Ferramenta não têm procedência
   nenhuma: são calculados e nunca explicados ao operador. ✅ **Exigida no §7 do contrato.**

### 13.4 Outros achados objetivos

- **`.disclosure` (34px) e `.prov` (34px)** ficaram abaixo dos 44px que o DS exige. Os cenários
  automatizados não pegaram porque só medem os controles de escolha segmentada — **lacuna de
  cobertura conhecida**. ✅ **Escrita no §6 e no §9 do contrato**, com o número do ensaio citado;
  continua sendo achado do Juiz, não do script.
- Contraste AA já passava nos 5 pares medidos **antes** do refactor, com a paleta FlowNC.
- R11 (teto de 6 campos) já passava antes — o corte dos campos mortos é o que entrega.
- A suíte inteira leva **~5 minutos** (os 3 invariantes somam 20s). Orçar isso por ciclo.

### 13.5 Suposições que o Construtor teve que tomar ✅ **todas respondidas no contrato (14/08/2026)**

Cada uma destas era um buraco do contrato que apareceu só na execução. As sete foram escritas em
`research/BUILD_CONTRACT_REFACTOR.md` — o Construtor do próximo ciclo não decide nenhuma sozinho:

1. **Bloco de contexto recolhido x expandido** — o contrato pedia "começa recolhido", mas dois
   cenários preenchem campos dentro dele e `page.fill` falha em elemento oculto. **Decisão: começa
   expandido**, com recolher funcional.
2. **fn não vale para toda a família Furar** — só U-Drill e mandril têm `fnManual` no schema.
   Exibir nas demais brocas alteraria goldens.
3. **Passo (roscar) e ap (mandrilar)** viram leitura travada/derivada, sem deslizante — o motor os deriva.
4. **Texto de ajuda de fn** não existe em produção; precisa ser escrito antes do ciclo.
5. **Referência de ae/ap** para a barra de estado: o motor não devolve recomendação para eles; usar
   o default do tipo de ferramenta. Vc/fz/fn usam o recomendado real.
6. **Alerta e chip de nível não recebem `stale`** — apagar alarme ativo contraria ISA-101. Só os
   números recebem.
7. **Escala do gauge de MRR**: 0–50 cm³/min, com os cortes de 40%/76% do DS.

### 13.6 Correção de mensagem ✅ **APLICADA em 14/08/2026**

A mensagem de limite de máquina com alvo numérico está no mockup e os goldens foram recapturados —
**0 números alterados, 6 textos de alerta melhorados**, com as razões conferidas (5000/10331 → 52%,
5000/5707 → 12%, 5000/9839 → 49%):

```js
// quanto o valor precisa cair, em %, para caber no limite. Vf e n variam
// linearmente com avanço e Vc; Pc e Mc variam com a taxa de remoção — então a
// mesma razão serve de alvo numérico para o operador nos quatro casos.
function excesso(valor, limite){ return Math.round((1 - limite / valor) * 100); }
```

Está nas quatro mensagens de `checkMachineLimits`, no formato
`"... excede o limite da máquina (X). Reduza <o quê> em pelo menos N% para caber."` — potência e
torque pedem `ap/ae/Vc`, rotação pede `Vc`, avanço pede `o avanço`.

**Como foi aplicada sem furar a blindagem:** o Orquestrador editou o mockup fora da região `DADOS`,
recapturou os 54 goldens e conferiu campo a campo que **nenhum número ou fórmula mudou** — só
`badge-alerta-seguranca`, em 6 dos 54 casos. Depois disso regravou `state/FREEZE.json`. Nunca o
Construtor.

---

## 14. Instrumentação pronta no repositório

E1 está **feita**. O que existe hoje na sandbox:

| Arquivo | Papel |
|---|---|
| `tests/helpers.ts` | `escolher()` (fala com `<select>` e rádio) e `calcular()` |
| `tests/combinacoes.mjs` | acionamento compartilhado entre captura e verificação dos goldens |
| `tests/GOLDEN_VALUES.json` | 99 combinações capturadas do mockup aprovado |
| `tests/goldens.spec.ts` | trava do motor |
| `tests/refactor.spec.ts` | os 21 alvos — especificação executável |
| `tests/invariantes.spec.ts` | os 3 invariantes — executores dos gates 2, 3 e 4 |
| `tests/gauntlet.spec.ts` | os 23 de regressão, migrados para o helper |
| `tests/TESTID_CONTRACT.md` | contrato de seletores, com o adendo do refactor |
| `criteria/JUDGE_CRITERIA_REFACTOR.md` | matriz de 95, 14 gates, pisos, formato do veredito |
| `research/BUILD_CONTRACT_REFACTOR.md` | contrato do Construtor, com as 7 decisões pré-respondidas |
| `scripts/capture-goldens.mjs` | captura dos goldens |
| `scripts/freeze.mjs` | congelamento e conferência de integridade |
| `scripts/check-suites.mjs` | contagem exata por grupo, cenário desligado |
| `scripts/check-tokens.mjs` | paleta contra o DS — executor da categoria 7 e do gate 9 |
| `scripts/validate-cycle-refactor.ps1` | validação de ciclo em 6 etapas, exit 0/1/2 |
| `state/snapshots/index-pre-refactor.html` | ponto de rollback |
| `state/FREEZE.json` | linha de base de integridade, regravada ao fim do fechamento de E1 |
| `state/GAUNTLET_STATE_REFACTOR.md` | registro por ciclo, com placar, formato fixo e regras de parada |

**Estado atual da suíte, medido em 14/08/2026: 29 verdes** (23 regressão + 3 invariantes + 1 motor
+ R11 + R14) e **15 alvos vermelhos**, de 44 cenários. `check-tokens.mjs` acusa **34 hex
irregulares** — a paleta FlowNC que o refactor substitui. É o estado esperado de "instrumentação
pronta, refatoração não executada".

**Nada a preparar antes de retomar.** A integridade já está gravada e conferida
(`node scripts/freeze.mjs` responde "Integridade OK").

---

## 15. Etapas

### E1 — Setup e contratos ✅ **FEITA**
Contratos, suíte, goldens e blindagem instalados e conferidos.
A correção da §13.6 foi aplicada ao mockup pelo Orquestrador e os 54 goldens recapturados:
**0 números alterados, 6 textos de alerta melhorados** (razões 52%, 12% e 49%), conferidos campo a
campo. `state/FREEZE.json` regravado depois disso.

**O corte dos 6 campos mortos é entregável do Construtor, no ciclo — não de E1.** `R10` cobre os
seis, e o corte é na renderização: a região `DADOS` é congelada, mexer em `TOOLS` derruba o ciclo
na verificação de integridade.

**Fechamento do contrato (14/08/2026).** O contrato do Construtor foi revisado contra o que o ensaio
mediu e contra a suíte, linha a linha. Entrou nele: as 7 decisões da §13.5, a procedência dos 3
gauges (prioridade 3 do Juiz), os 44px do `ⓘ` e do gatilho de procedência (§13.4), o `stale` no
próprio elemento e fora do alerta, os blocos empilhados em coluna única que o `R12` exige, o foco
declarado em `:focus` (o `R15` foca por script, e `:focus-visible` não dispara de forma confiável
assim), e a preservação dos testids que a regressão lê. Sem esse fechamento, o ciclo reprovaria por
defeito de contrato — não por defeito de entrega.

### E2 — Ciclo 1 ▶ **próximo passo, pronto para começar**

1. **Construtor** (1 subagente) lê `research/BUILD_CONTRACT_REFACTOR.md`, `research/HMI_RULES.md`,
   `docs/design/DS_TEMA_CLARO.md`, `criteria/JUDGE_CRITERIA_REFACTOR.md`, `tests/TESTID_CONTRACT.md`
   e `tests/refactor.spec.ts`; edita **só** `mockup/index.html`.
2. **Validação:** `.\scripts\validate-cycle-refactor.ps1 -CycleNumber 1` — exit 0 libera o Juiz,
   exit 1 reprova sem gastar subagente, exit 2 significa alvo do refactor ainda pendente.
3. **Juiz cego** (1 subagente), só com exit 0.
4. **Orquestrador** registra em `state/GAUNTLET_STATE_REFACTOR.md`, no formato já definido lá, e
   guarda o snapshot que o validate gravou.

### E3 — Ciclos 2 em diante
**Teto: 10 ciclos.** Paradas, na ordem: PASS (≥95 + 14/14 + **nenhuma categoria abaixo do piso**) ·
score piorou → reverter ao melhor snapshot · 2 ciclos parados com as mesmas prioridades →
estagnação, parar e reportar · teto sem PASS → entregar o **melhor** ciclo, não o último.

### E4 — Relatório
`reports/FINAL_REPORT.md` com a série por ciclo, limitações e a frase de que PASS **não é aprovação
para produção**.

### E5 — Aplicar em produção (separada, depois)
Portar `DS_TEMA_CLARO.md` para `src/index.css` e corrigir `param-explanation.tsx`. Plano próprio.

---

## 16. As 8 sugestões técnicas — onde cada uma entra

| # | Sugestão | Onde |
|---|---|---|
| 1 | **Perfil de máquina editável** | **neste loop** — zero linha de motor (§9) |
| 6 | **Auditabilidade**: todo número abre fórmula, valores e fonte | **neste loop** — é apresentação |
| 7 | **Zero dependência de rede** | **neste loop** — 5 requisições confirmadas |
| 8 | **Neon é marca, área de trabalho é cinza** | **neste loop** — regra central do DS |
| 2 | **Deflexão em µm** amarrada à tolerância, no lugar do L/D puro | `PLAN_MOTOR_CALCULADORA_V2.md` |
| 3 | **Vida de ferramenta** por Taylor, forma relativa | idem |
| 4 | **Custo e tempo por peça** | idem |
| 5 | **Materiais 12 → 30+ com procedência** | idem |

**Fora, com motivo declarado:** análise de chatter (exige dados modais/FRF que não temos — seria
chute com cara de ciência), catálogo por aprendizado de máquina (sem base) e micro-otimização de
cálculo (com 12 materiais e 33 entradas o cálculo leva microssegundos).

---

## 17. Fronteiras

Sandbox `gauntlet-calculadora-cnc-v2/` + `docs/plans/` + `docs/design/` + `docs/ROADMAP_SESSAO_ATUAL.md`.
Proibido: `src/**`, `package.json` raiz, `node_modules/`, `vite.config.ts`, `vitest.config.ts`,
`wrangler.jsonc`, `.gitignore` raiz, `gauntlet-calculadora-cnc/` (rodada 1), qualquer deploy.

## 18. Verificação final

1. `npx playwright test` — **48 cenários**, os quatro grupos verdes, contagem exata conferida.
2. `node scripts/check-tokens.mjs` — paleta limpa, zero hex fora do DS.
3. `.\scripts\validate-cycle-refactor.ps1 -CycleNumber N` — exit 0.
4. Abrir o mockup: fundo claro, 3 gauges, 4 controles dentro da configuração, ajuda por clique e
   por teclado, resultado velho até clicar, escolha de 1 clique.
5. **Desligar a rede e recarregar** — tela idêntica.
6. Percorrer a tela **só pelo teclado** — foco visível em tudo.
7. `git status` — só a sandbox e os docs declarados.

**Ao fim: parar e esperar aprovação explícita do Mestre.** PASS no loop não autoriza produção.
