# Gauntlet Loop v2 — Calculadora CNC Multi-Ferramenta (Sandbox)

> **Criada em:** 13/08/2026 · **Item do backlog:** 17
> **Plano vigente:** [PLAN_GAUNTLET_V2_REFACTOR.md](../docs/plans/PLAN_GAUNTLET_V2_REFACTOR.md)
> **Mecânica do loop:** `central_rafael/protocolos/protocolo-loop-construtor-juiz-cego.md`
> **Estado:** construção aprovada (91/100, ciclo 3). Refactor visual instrumentado e **não executado**.

Experimento isolado: **nada aqui toca `src/`**. O mockup é campo de prova dos tokens do tema claro
antes de qualquer linha ir para produção.

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `research/` | `BUILD_CONTRACT_REFACTOR.md` (contrato do Construtor) e `HMI_RULES.md` |
| `criteria/` | `JUDGE_CRITERIA_REFACTOR.md` — matriz de 95, 14 gates, pisos por categoria |
| `tests/` | 44 cenários Playwright, golden values e o contrato de `data-testid` |
| `mockup/` | `index.html` — o artefato que o Construtor edita |
| `state/` | `FREEZE.json` (integridade), histórico de ciclos e snapshots de rollback |
| `reports/` | relatório final da rodada |
| `scripts/` | validação de ciclo, congelamento, contagem de suíte e conferência de paleta |

## A suíte — 44 cenários em 4 grupos

| Arquivo | Grupo | Regra |
|---|---|---|
| `gauntlet.spec.ts` | 23 de regressão | verdes em todo ciclo |
| `invariantes.spec.ts` | 3 invariantes | verdes em todo ciclo — executores dos gates 2, 3 e 4 |
| `goldens.spec.ts` | 54 combinações do motor | verde em todo ciclo |
| `refactor.spec.ts` | 17 alvos do refactor | vermelhos até o ciclo que passa |

## Comandos

```bash
npx playwright test                       # a suíte inteira (~5 min)
node scripts/check-suites.mjs             # contagem exata por grupo, cenário desligado
node scripts/check-tokens.mjs             # paleta contra DS_TEMA_CLARO.md
node scripts/freeze.mjs                   # confere integridade (--write só o Orquestrador)
node scripts/capture-goldens.mjs          # recaptura os golden values (só o Orquestrador)
```

Validação completa de um ciclo, em 6 etapas — exit `0` libera o Juiz, `1` reprova, `2` alvos pendentes:

```powershell
.\scripts\validate-cycle-refactor.ps1 -CycleNumber N
```
