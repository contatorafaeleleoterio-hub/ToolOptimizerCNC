import { test, expect } from '@playwright/test';
import { mockupPath } from './helpers';
import { aplicarCombinacao, lerSaidasEstruturais } from './combinacoes.mjs';
import * as goldens from './GOLDEN_VALUES.json';

// Trava da zona de resultado. As 99 combinações (33 entradas do catálogo × 3
// contextos) foram capturadas do mockup aprovado (ciclo 3, 91/100) ANTES de
// qualquer edição do refactor.
//
// Os números NÃO entram na comparação: o mockup é o documento canônico da tela
// e o motor definitivo entra depois, então o dígito de hoje é provisório
// (`mascararNumeros` em `combinacoes.mjs` troca cada número por `#`). O que
// reprova aqui é a tela perder uma saída, um rótulo, uma unidade, o texto de um
// alerta ou o formato de uma linha de fórmula.
//
// A zona de ENTRADA fica de fora de propósito: o contrato manda tirar 6 campos
// e converter seletor de opção única em texto fixo — travar campo visível
// reprovaria o Construtor por cumprir o que foi pedido.

const linhas = (goldens as any).default ?? goldens;

test('GOLDEN — as 99 combinações de referência mostram exatamente as mesmas saídas', async ({ page }) => {
  test.setTimeout(180_000);

  const divergencias: string[] = [];

  for (const linha of linhas) {
    await page.goto(mockupPath);
    await aplicarCombinacao(page, { id: linha.tipo, familia: linha.familia }, linha);
    const saidas = await lerSaidasEstruturais(page);

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

  expect(divergencias, `Zona de resultado alterada em ${divergencias.length} ponto(s):\n${divergencias.join('\n')}`)
    .toEqual([]);
});
