# Relatório final — Gauntlet Loop: Mockup Experimental da Calculadora CNC

> Data: 12/08/2026 · Plano: `docs/plans/PLAN_GAUNTLET_CALCULADORA_CNC.md`
> **Score final: 92/100 · 7/7 gates PASS · Veredito: PASS · Loop encerrado no ciclo 2 de 5 máximos**

---

## Resultado

| Ciclo | Score | Gates falhos | Testes Playwright |
|---|---|---|---|
| 1 | 88/100 | Gate 1 (Score ≥ 90) | 13/13 PASS |
| 2 | 92/100 | nenhum | 13/13 PASS |

O loop terminou por **PASS**, não por esgotar os 5 ciclos nem por estagnação. Duas iterações: Builder monta (ciclo 1) → Judge cego aponta 3 prioridades → Builder corrige cirurgicamente (ciclo 2) → Judge cego aprova.

---

## Decisões de arquitetura validadas

1. **Trilho de contexto fixo** (Operação → Tipo de ferramenta → Material da ferramenta → Material da peça → Ø) como único ponto de troca de categoria — confirmado pelo Judge nos dois ciclos: RPM e Avanço nunca mudam de posição ao trocar ferramenta (T09, T11).
2. **Material da ferramenta como multiplicador de Vc de primeira classe** (HSS 0,29 · HSS-Co 0,37 · Metal duro 1,00 · MD c/ pastilha 1,25) — validado numericamente pelo T10 (proporção HSS↔metal duro correta, tolerância 10%).
3. **Bloco comum em posição fixa + bloco específico dinâmico** — campos irrelevantes à operação atual somem (`display:none`) sem reposicionar o container, testado em T02/T11.
4. **Toggle Rápido × Avançado** — 3 campos até o resultado (T12), sem depender da família "Cálculo rápido agnóstico" do dropdown Operação (que continua existindo como 5ª família válida, agora com rótulo diferenciado para não ser confundida com o toggle).
5. **Semáforo único** para L/D, avisos e limites de máquina — sem segunda paleta de "gauge" duplicando o significado (evita a dívida catalogada no §18 do DS canônico).

---

## O que mudou entre ciclo 1 e ciclo 2

O Judge do ciclo 1 (88/100, único gate falho foi o de score) apontou 3 prioridades, corrigidas cirurgicamente sem tocar em nenhum `data-testid` nem quebrar os 13 testes:

1. **Usabilidade** — rótulo da opção "Cálculo rápido" do dropdown Operação passou a "Cálculo rápido (agnóstico de ferramenta)", reduzindo a confusão com o toggle Rápido/Avançado.
2. **Fluxo** — label do botão de modo passou a refletir a variável `quick` (que já governava o layout real) em vez da variável `modo` isolada, eliminando o caso em que o botão dizia "Avançado" com a tela já em layout reduzido.
3. **Clareza** — aviso de material "estimado" ganhou um badge âmbar sempre visível ao lado do campo Material da peça, além do texto que já existia na linha de origem da sugestão.

**Nota operacional:** o subagente Builder do ciclo 2 caiu por limite de gasto mensal da API antes de tocar em qualquer arquivo. As 3 correções foram aplicadas diretamente pelo Orchestrator, com o mesmo escopo cirúrgico que teria sido pedido ao Builder, e reverificadas com `npx playwright test` (13/13 PASS) antes de acionar o Judge do ciclo 2.

---

## Limitações declaradas (fora do escopo deste ciclo)

Do `CALCULATOR_SCOPE.md`, itens ESSENCIAL não totalmente cobertos:
- Cabeçote/faceador: só `hm = fz·sinκ` direto — falta a correção inversa "fz a partir de hm alvo".
- Furação: comprimento de ponta (`Lp`) e tempo de furo calculados mas não expostos (sem `resultado-*` no contrato de testes).
- Mandrilar: `ap` é campo direto, não derivado de Ø inicial/Ø final.

Assunções não documentadas em nenhuma fonte de catálogo consultada (sinalizar se erradas):
1. Vc de macho ≈ 30% do Vc de fresamento do mesmo material.
2. Mandrilar usa um único campo Ø tanto para RPM quanto para L/D (assume barra ≈ Ø do furo).
3. Roscar não expõe MRR/Potência/Torque (não listados como saída na seção específica de Roscar do escopo).
4. `hm` de furação ≈ `f/2`; MRR/`hm` de mandrilar seguem fórmula padrão de torneamento — aproximações de literatura, não explicitadas no `CALCULATOR_SCOPE.md`.

Observações de polimento remanescentes, não bloqueantes (citadas pelo Judge do ciclo 2 como "não é bloqueio"):
1. Ajuste manual de um campo do bloco comum é descartado silenciosamente ao trocar operação/tipo de ferramenta (sem aviso).
2. Os dois conceitos de "rápido" (família de Operação vs. toggle de Modo) ainda coexistem — mitigado, não eliminado.
3. Formato de unidade nos labels diverge levemente entre trilho de contexto e bloco comum.

Itens declarados **fora do escopo do mockup** desde o Discovery: torneamento/tornos, custo/orçamento/PDF, catálogo de pastilhas de fabricante, simulação 3D, G-code, vida de ferramenta (Taylor), fresa de disco, fresa de rosca, broca de centro e escareador.

---

## Verificação

- `cd gauntlet-calculadora-cnc && npx playwright test` → 13/13 PASS (T01–T13).
- `git status` na raiz do projeto → nenhuma alteração fora de `gauntlet-calculadora-cnc/`.
- Nenhum arquivo de produção (`src/`, `package.json` raiz, `node_modules/`, `vite.config.ts`, `vitest.config.ts`, `wrangler.jsonc`) tocado.

---

## Próximo passo

**Este relatório não autoriza implementação em produção.** Score ≥ 90 é critério de qualidade do mockup experimental, não aprovação de escopo de produto. Decisão de levar (ou não, ou em parte) esta arquitetura para `src/engine/` e os componentes reais é do Rafael.
