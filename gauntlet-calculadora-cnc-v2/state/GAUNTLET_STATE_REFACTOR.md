# Estado do Loop de Refactor Visual — Gauntlet v2

> Registro por ciclo. **Quem escreve aqui é o Orquestrador** — o Construtor não lê `state/` e o
> Juiz é read-only. Um bloco por ciclo, sempre no mesmo formato, para a série ser comparável.
>
> Matriz e gates: `criteria/JUDGE_CRITERIA_REFACTOR.md` · Teto: **10 ciclos** ·
> PASS: **≥95/100 + 14/14 gates + nenhuma categoria abaixo do piso**.

## Placar

| Ciclo | Regressão | Invariantes | Motor | Alvos | Paleta | Validate | Score | Veredito |
|---|---|---|---|---|---|---|---|---|
| — (linha de base) | 23/23 | 3/3 | 1/1 | 2/17 | 34 irregulares | exit 1 | — | refactor não executado |

## Linha de base — 14/08/2026

Instrumentação de E1 completa e conferida, mockup ainda no estado aprovado do ciclo 3 (mais a
correção de mensagem da §13.6 do plano, aplicada pelo Orquestrador com os goldens recapturados:
0 números alterados, 6 textos de alerta melhorados).

- Suíte: **29 verdes de 44** — 23 regressão + 3 invariantes + 1 motor + `R11` + `R14`.
- 15 alvos vermelhos: é o estado esperado antes do Construtor entrar.
- `check-tokens.mjs`: 34 hex fora do Design System — a paleta FlowNC que o refactor substitui.
- `freeze.mjs`: integridade OK.

## Formato de cada ciclo

```
## Ciclo N — data

**Objetivo do ciclo:** (o que o contrato pediu que ainda faltava)

| | |
|---|---|
| Regressão | X/23 |
| Invariantes | X/3 |
| Motor (54 goldens) | verde/vermelho |
| Alvos do refactor | X/17 |
| Paleta (check-tokens) | N irregulares |
| validate-cycle-refactor | exit 0/1/2 |
| Score do Juiz | N/100 |
| Gates | X/14 |
| Categorias abaixo do piso | quais |

**Veredito:** APROVADO / REPROVADO
**As 3 prioridades apontadas pelo Juiz:** 1. … 2. … 3. …
**Decisão do Orquestrador:** seguir / reverter ao snapshot do ciclo M / parar por estagnação
**Snapshot:** `state/snapshots/index-refactor-ciclo-N.html`
```

## Regras de parada (plano §15, E3)

1. **PASS** — ≥95, 14/14 gates, nenhuma categoria abaixo do piso.
2. **Score piorou** em relação ao melhor ciclo → reverter ao melhor snapshot antes de seguir.
3. **Duas rodadas seguidas com as mesmas 3 prioridades** → estagnação: parar e reportar.
4. **Teto de 10 ciclos sem PASS** → entregar o **melhor** ciclo, nunca o último.

PASS no loop **não** é aprovação para produção. A aplicação em `src/` é a etapa E5, com plano próprio.
