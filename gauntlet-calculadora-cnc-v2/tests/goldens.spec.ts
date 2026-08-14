import { test, expect } from '@playwright/test';
import { mockupPath } from './helpers';
import { aplicarCombinacao, lerSaidas } from './combinacoes.mjs';
import * as goldens from './GOLDEN_VALUES.json';

// Trava do motor. As 54 combinações foram capturadas do mockup aprovado
// (ciclo 3, 91/100) ANTES de qualquer edição do refactor. Se um único número,
// alerta ou linha de fórmula mudar, este cenário reprova.
//
// É o que impede o Builder de "melhorar" o resultado hardcodando os casos de
// teste visíveis: aqui há muito mais combinação do que a suíte de regressão
// mostra, e os valores não são escolhidos por ele.

const linhas = (goldens as any).default ?? goldens;

test('GOLDEN — as 54 combinações de referência produzem exatamente os mesmos valores', async ({ page }) => {
  test.setTimeout(180_000);

  const divergencias: string[] = [];

  for (const linha of linhas) {
    await page.goto(mockupPath);
    await aplicarCombinacao(page, { id: linha.tipo, familia: linha.familia }, linha);
    const saidas = await lerSaidas(page);

    for (const [campo, esperado] of Object.entries(linha.saidas)) {
      if (saidas[campo] !== esperado) {
        divergencias.push(
          `${linha.tipo} / ${linha.material} / ${campo}\n` +
            `    esperado: ${esperado}\n` +
            `    obtido:   ${saidas[campo]}`,
        );
      }
    }
  }

  expect(divergencias, `Motor alterado em ${divergencias.length} ponto(s):\n${divergencias.join('\n')}`)
    .toEqual([]);
});
