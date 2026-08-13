# Gauntlet — Mockup Experimental da Calculadora CNC

Experimento isolado, **zero alteração em produção**. Ver plano completo em
`docs/plans/PLAN_GAUNTLET_CALCULADORA_CNC.md`.

## Como rodar

```bash
cd gauntlet-calculadora-cnc
npm install
npx playwright install chromium
npx playwright test
```

Abrir `mockup/index.html` direto no navegador (file://, sem servidor) para navegar à mão.

## Como ler os resultados

- `state/GAUNTLET_STATE.md` — ciclo atual, score, 3 prioridades pendentes
- `state/SCORE_HISTORY.md` — uma linha por ciclo
- `reports/FINAL_REPORT.md` — relatório final, só existe quando o loop termina (PASS ou stagnation)
- `criteria/JUDGE_CRITERIA.md` — matriz de 100 pts e os 7 gates (congelado)
- `tests/TEST_SCENARIOS.md` — os 13 cenários em português

## Estrutura

```
research/    Discovery e escopo dos cálculos (contrato do Builder)
criteria/    Critérios do Judge (congelado)
tests/       Cenários + spec Playwright
mockup/      index.html, styles.css, script.js
state/       Estado do loop
reports/     Relatório final
```

Score ≥ 90 **não autoriza** implementar em produção — exige aprovação explícita do Rafael.
