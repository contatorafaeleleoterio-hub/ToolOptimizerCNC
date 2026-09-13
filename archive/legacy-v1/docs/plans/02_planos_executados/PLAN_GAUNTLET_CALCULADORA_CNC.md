# Plano — Gauntlet Loop: Mockup Experimental da Calculadora CNC

> **Criado em:** 12/08/2026
> **Tipo:** 🧪 Experimento isolado (mockup HTML) — **zero alteração em produção**
> **Status:** 📋 Planejado — aguardando execução
> **Item do backlog:** 16

---

## Contexto

A calculadora atual (`src/engine/` + `src/components/config-panel.tsx` + `results-panel.tsx`) resolve **uma família só**: fresa inteiriça de metal duro, 3 geometrias (topo/toroidal/esférica), 9 materiais, 3 operações. O tipo de fresa nem entra no cálculo — serve só para nomenclatura (`Ferramenta.tipo` é uma union de 3 strings em `src/types/index.ts:40`).

O produto precisa acomodar mais categorias de ferramenta de **fresadora**, e o eixo que ninguém modelou é o mais importante: **o material de que a ferramenta é feita** (aço rápido × metal duro) muda Vc em 3–5×. Hoje isso não existe no domínio.

Esta etapa **não implementa nada em produção**. Produz um mockup HTML isolado, validado por um loop Builder → Playwright → Judge, para decidir se a arquitetura proposta se sustenta antes de tocar no código real.

**Fontes de escopo já existentes no projeto:**
- `monetizaCNC/ativos/tooloptimizer/01-escopo-calculadora.md` — escopo canônico do produto, 10/08/2026
- `docs/ai/memory/PRODUCT_CONTEXT.md:93-104` — taxonomia atual e roadmap por classe de ferramenta
- `blueprint_calculadora_cnc.md` — motor matemático 80/20

---

## Escopo travado (decisão do Mestre, 12/08/2026)

Somente **máquinas fresadoras / centros de usinagem**. Torneamento e tornos não são citados em lugar nenhum.

| # | Família | Ferramentas |
|---|---------|-------------|
| 1 | **Fresar** | Fresa inteiriça metal duro (topo · toroidal · esférica) · Fresa inteiriça HSS · **Cabeçote/faceador com pastilhas de metal duro** |
| 2 | **Furar** | **Broca metal duro** · **Broca aço rápido (HSS/HSS-Co)** · **Broca com insertos (U-drill)** |
| 3 | **Roscar** | **Macho HSS** · **Macho metal duro** |
| 4 | **Mandrilar** | **Ferramenta de mandrilhar** (barra / cabeçote ajustável) |
| 5 | **Cálculo rápido** | **Agnóstico** — sem definir ferramenta, valores base da indústria, sugestão automática a partir de material + Ø + operação |

### Sugestões novas a validar no Discovery

Candidatas, decididas no Discovery com critério de frequência de uso × esforço:

| Candidata | Por que |
|---|---|
| **Macho formador (roll tap)** | Furo prévio é **maior** que no macho de corte — erro clássico de oficina. Custo quase zero, evita refugo. |
| **Alargador (reamer) HSS e metal duro** | Vc menor e avanço maior que broca; regra invertida que quem não sabe erra. |
| **Broca de centro / escareador / chanfrador** | Altíssima frequência diária, cálculo trivial. |
| **Fresa de rosca (thread mill)** | Fecha "Roscar" e tem correção de raio real (avanço no centro ≠ na periferia). |

**Fora (proposta):** fresa de disco (baixa frequência em centro de usinagem), trocoidal/HEM (é estratégia de percurso, não ferramenta), deflexão por elementos finitos.

### O eixo que estrutura tudo

```
Família de operação  →  Tipo de ferramenta  →  MATERIAL DA FERRAMENTA  →  Parâmetros  →  Resultado
                                                (HSS · HSS-Co · Metal duro · Metal duro c/ pastilha)
```

O material da ferramenta vira **multiplicador de Vc de primeira classe**, aplicado sobre a faixa do material da peça. Confirmado na pesquisa: metal duro roda 3–5× o Vc de HSS na mesma peça.

---

## Cálculos por família

Classificação preliminar — `CALCULATOR_SCOPE.md` fecha com entradas/saídas/unidades/dependências por item.

**Compartilhados (todas as famílias):** `n = Vc·1000/(π·D)` · `Vf = f·n` ou `fz·z·n` · potência Kienzle · torque · L/D · limites de máquina.

| Família | ESSENCIAL | IMPORTANTE |
|---|---|---|
| **Fresar — inteiriça** | RPM · Vf · MRR · potência/torque · CTF radial (`fz/√(ae/D)`) · L/D | Ø efetivo esférica `Def=2√(ap(D−ap))` e toroidal · cavaco axial · altura de crista `h=ae²/(8R)` |
| **Fresar — cabeçote c/ pastilha** | RPM · Vf com **nº de insertos** · **correção por ângulo de posição κ: `hm = fz·sin κ`** · potência | ap máx por pastilha · largura de passe vs Ø do cabeçote · posicionamento fora de centro |
| **Furar — broca inteiriça** | RPM · `Vf = f·n` (avanço por **rotação**, não por dente) · tempo de furo com ponta `Lp = (D/2)·tan(90−θ/2)` | Potência e torque de furação · pica-pau (incremento e alívio) |
| **Furar — U-drill** | RPM · `Vf = f·n` · **avanço mínimo** (inserto central rubbing se o avanço for tímido) · potência | Alerta de rigidez / runout · relação L/D da broca |
| **Roscar — macho** | **Furo de macho `Ø = D − P`** · **`Vf = n · P`** (sincronizado) · Vc por material da ferramenta | % de engajamento da crista · tabela M/MF/UNC/UNF · macho formador (Ø prévio maior) |
| **Mandrilar** | RPM por Ø real da barra · `Vf = f·n` · **L/D da barra (crítico)** · ap por lado | Ra teórico por raio de ponta · alerta de vibração/contrapeso |
| **Cálculo rápido** | Sugerir Vc e fz a partir de material + Ø + operação (+ material da ferramenta opcional) → RPM e Vf | Faixa de confiança e origem do valor sugerido |

---

## Arquitetura da interface

O risco óbvio é virar formulário gigante com dezenas de campos condicionais. A regra que evita isso:

> **Trocar de ferramenta não reconstrói a tela.** RPM e Avanço ficam sempre no mesmo pixel. Só o miolo de parâmetros específicos muda.

**Três zonas fixas:**

1. **Trilho de contexto** (topo, uma linha, sempre visível)
   `Operação → Ferramenta → Material da ferramenta → Material da peça → Ø`
   É o único lugar onde se troca de categoria. Estado sempre legível de relance.

2. **Parâmetros** (coluna esquerda, ~400px — mesma largura de hoje)
   - Bloco **comum** (posição fixa): Ø, nº de arestas/insertos, avanço, profundidade, balanço
   - Bloco **específico** (marcado visualmente, aparece/some): κ, passo, ângulo de ponta, raio de quina, Ø do furo prévio
   - Toggle **Rápido × Avançado**: Rápido = 3 campos até o resultado; Avançado abre potência, cavaco, limites

3. **Resultados** (coluna direita, persistente)
   RPM e Avanço em destaque, ancorados. Secundários (MRR, potência, torque, tempo) numa faixa. Alertas no visor LCD com **a correção escrita** — nunca travando a tela.

**Inexperiente × experiente:** tudo vem pré-preenchido com valor sugerido e a origem visível ("faixa Sandvik P, metal duro revestido"). O experiente sobrescreve qualquer campo; o campo sobrescrito ganha marca `manual`. Ninguém é obrigado a preencher nada para ver um resultado.

**Design:** reaproveitar os tokens reais de `src/index.css` (`--color-primary #00D9FF`, `--color-secondary #39FF14`, `--color-background-dark #0F1419`, glass `rgba(22,27,34,.7)` + `blur(24px)`, `shadow-glass`, Inter + JetBrains Mono, todo número em mono). Não replicar o que já é dívida reconhecida (segundo ciano do LCD, paleta de gauge separada do semáforo — ver `docs/_canonicos/DESIGN-SYSTEM.html` seção 18).

---

## Estrutura de arquivos

Tudo em `gauntlet-calculadora-cnc/` na raiz do projeto — auto-contida.

```
gauntlet-calculadora-cnc/
  README.md                     como rodar e como ler os resultados
  package.json                  isolado: só @playwright/test
  playwright.config.ts
  .gitignore                    node_modules/, test-results/, playwright-report/
  state/GAUNTLET_STATE.md       ciclo, score, 3 prioridades, próxima ação (curto)
  state/SCORE_HISTORY.md        uma linha por ciclo
  criteria/JUDGE_CRITERIA.md    matriz 100 pts + 7 gates — CONGELADO após Discovery
  tests/TEST_SCENARIOS.md       os cenários em português
  tests/gauntlet.spec.ts        os mesmos cenários em Playwright
  research/DISCOVERY.md         só conclusões
  research/CALCULATOR_SCOPE.md  tabela de cálculos classificados
  mockup/index.html
  mockup/styles.css
  mockup/script.js
  reports/FINAL_REPORT.md
```

**Decisão técnica:** `script.js` clássico (IIFE, sem `type="module"`) para que `file://` funcione sem servidor. Playwright navega direto no arquivo.

---

## Infra de teste

Playwright **isolado dentro da pasta gauntlet** — `package.json` próprio, `node_modules` local. O `package.json`, o `node_modules` e o `vitest.config.ts` do projeto **não são tocados**.

```bash
cd gauntlet-calculadora-cnc && npm init -y && npm i -D @playwright/test && npx playwright install chromium
```

O Judge usa Playwright para clicar, digitar, ler o DOM, capturar erros de console e tirar screenshot — é o que sustenta os Gates 3, 4 e 5. Screenshots vão para `test-results/` (gitignored).

---

## Matriz e gates

| Critério | Peso |
|---|---|
| Usabilidade operacional | 20 |
| Clareza dos parâmetros | 15 |
| Fluxo de cálculo | 15 |
| Prevenção de erros | 15 |
| Organização da informação | 10 |
| UI / Design | 10 |
| Legibilidade / densidade | 5 |
| Consistência visual | 5 |
| Testes funcionais | 5 |
| **TOTAL** | **100** |

Congelada ao fim do Discovery. **Um ajuste, e só ele:** dentro de **Organização da informação (10)**, sub-item explícito de **extensibilidade percebida** — trocar de família/ferramenta preserva os campos comuns e não reposiciona os resultados. É o objetivo declarado da etapa, precisava ser avaliável. Nenhum peso muda.

**7 gates** (todos obrigatórios; FAIL em qualquer um = FAIL, mesmo com score ≥ 90):
1. Score ≥ 90 · 2. Nenhuma falha funcional crítica · 3. Todos os fluxos principais funcionam · 4. Nenhum erro JavaScript crítico · 5. Entradas inválidas tratadas · 6. Fluxo principal compreensível · 7. Judge considera adequada para uso diário

---

## Cenários de teste

Os 9 do briefing (fluxo básico · troca de ferramenta · alteração de parâmetros · campos obrigatórios · valores inválidos · valores extremos · repetição · navegação · interface), mais 4 que a arquitetura descoberta exige:

- **T10 — Troca de material da ferramenta:** mesma broca Ø10 em HSS × metal duro → Vc e RPM têm que mudar na proporção certa.
- **T11 — Campos específicos:** ir de fresa para macho → passo aparece, κ some, Ø e material da peça persistem.
- **T12 — Modo rápido:** material + Ø + operação → resultado sem preencher mais nada.
- **T13 — Furo de macho:** M10×1,5 → broca Ø8,5. Valor conferível contra tabela.

---

## O loop

```
DISCOVERY → CRITÉRIOS (congela) → TESTES → BUILD ciclo 1
   ↓
TEST (Playwright) → JUDGE (cego: só mockup + criteria + tests) → PASS?
   ├── não → 3 prioridades → BUILDER → volta ao TEST     (máx. 5 ciclos)
   └── sim → PARA
```

- **Agentes:** Orchestrator + 1 Builder + 1 Judge. Sem fan-out.
- **Judge cego:** recebe caminho do mockup, critérios e cenários. Nunca recebe justificativa do Builder nem histórico de decisões.
- **Parada antecipada:** dois ciclos com score parado e mesmos problemas → `GAUNTLET STAGNATION DETECTED`, para e reporta causa provável.
- **Prioridade de correção:** funcional → usabilidade → fluxo → clareza → organização → visual → cosmético.
- Reporte de ~5 linhas ao fim de cada ciclo (ciclo, score, gates, 3 prioridades).

---

## Verificação

1. `cd gauntlet-calculadora-cnc && npx playwright test` — todos os cenários passam.
2. Abrir `gauntlet-calculadora-cnc/mockup/index.html` no navegador e navegar à mão: trocar família, trocar material da ferramenta, calcular, sobrescrever um campo, forçar erro.
3. Ler `reports/FINAL_REPORT.md` — score, evolução, gates, decisões de arquitetura, limitações.
4. `git status` no projeto — nada modificado fora de `gauntlet-calculadora-cnc/`.

---

## Fronteiras — o que não é tocado

`src/**` · `docs/**` (exceto este plano e o backlog) · `package.json` · `node_modules/` · `vite.config.ts` · `vitest.config.ts` · `wrangler.jsonc` · `.gitignore` da raiz · qualquer deploy. Nenhuma dependência é instalada no projeto.

Ao fim: **para e espera aprovação explícita do Mestre.** Score ≥ 90 não autoriza implementar em produção.

---

## Fontes da pesquisa (12/08/2026)

- [Sandvik Coromant — Entering angle and chip thickness in milling](https://www.sandvik.coromant.com/en-us/knowledge/milling/entering-angle-and-chip-thickness)
- [Mitsubishi Materials — Formula for Face Milling](https://www.mmc-carbide.com/us/technical_information/formula/tec_milling_formula)
- [AIMS Industrial — Cutting Speeds & Feeds: Drilling, Milling, Tapping](https://aimsindustrial.com.au/blogs/product-guides/cutting-speeds-feeds-reference)
- [AIMS Industrial — Drill Speed Chart: HSS, Cobalt & Carbide](https://aimsindustrial.com.au/blogs/product-guides/cutting-speeds-feeds-chart)
- [CNCCookbook — Indexable Drills: Speeds and Feeds](https://www.cnccookbook.com/unlocking-the-potential-of-insert-drills/)
- [AccurateCut — Feed Rate Setup for Indexable Drills](https://www.accuratecut.com/feed-rate-setup-indexable-drills/)
