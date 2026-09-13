import { test, expect, Page } from '@playwright/test';
import { mockupPath } from './helpers';
import { enumerarTipos, aplicarCombinacao, CONTEXTS } from './combinacoes.mjs';

// Invariantes da tela. Diferente de `refactor.spec.ts`, estes NÃO são alvos:
// já valem no mockup aprovado e têm que continuar valendo em todo ciclo, como
// a regressão. Existem porque os gates 2, 3 e 4 do Juiz são declarados como
// `script` — gate sem executor é gate que passa por omissão.

const CTX = CONTEXTS[0];

/**
 * Coleta erro de JS e erro de console durante a vida da página.
 *
 * Falha de carregamento de recurso fica de fora de propósito: hoje o mockup
 * busca webfont remota e o 404 só aparece quando a máquina está sem rede — o
 * cenário viraria moeda girando. Requisição externa tem dono: é o `R16`, que é
 * alvo do refactor. Aqui interessa só erro vindo do próprio código.
 */
function vigiar(page: Page) {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    if (/Failed to load resource/i.test(m.text())) return;
    erros.push(`console.error: ${m.text()}`);
  });
  return erros;
}

test('I01 — as 33 entradas do catálogo renderizam seus campos e calculam sem erro de JS', async ({ page }) => {
  test.setTimeout(180_000);
  const erros = vigiar(page);

  await page.goto(mockupPath);
  const tipos = await enumerarTipos(page);
  expect(tipos.length, 'o mockup precisa expor as 33 entradas do catálogo').toBe(33);

  const vazios: string[] = [];
  for (const tipo of tipos) {
    await aplicarCombinacao(page, tipo, CTX);

    const campos = await page.locator('[data-testid="bloco-geometrico"] .row:not(.hidden)').count();
    const legado = await page.locator('.row:not(.hidden)').count();
    if (campos === 0 && legado === 0) vazios.push(tipo.id);

    const rpm = await page.locator('[data-testid="resultado-rpm"]').textContent();
    if (!rpm || !rpm.trim()) vazios.push(`${tipo.id} (sem rotação)`);
  }

  expect(vazios, `tipos que não renderizaram campo ou resultado: ${vazios.join(', ')}`).toEqual([]);
  expect(erros, `erros de JS durante as 33 entradas:\n${erros.join('\n')}`).toEqual([]);
});

test('I02 — nenhum NaN, undefined ou Infinity aparece na tela em nenhuma das 33 entradas', async ({ page }) => {
  test.setTimeout(180_000);
  await page.goto(mockupPath);
  const tipos = await enumerarTipos(page);

  const sujeira: string[] = [];
  for (const tipo of tipos) {
    await aplicarCombinacao(page, tipo, CTX);

    const texto = await page.evaluate(() => document.body.innerText);
    for (const proibido of ['NaN', 'undefined', 'Infinity']) {
      if (texto.includes(proibido)) {
        const linha = texto.split('\n').find((l) => l.includes(proibido)) ?? '';
        sujeira.push(`${tipo.id}: "${proibido}" em "${linha.trim().slice(0, 80)}"`);
      }
    }
  }

  expect(sujeira, `valor não finito visível ao operador:\n${sujeira.join('\n')}`).toEqual([]);
});

test('I03 — console limpo num fluxo completo das 4 famílias', async ({ page }) => {
  const erros = vigiar(page);

  await page.goto(mockupPath);
  const tipos = await enumerarTipos(page);
  const umPorFamilia = ['fresar', 'furar', 'roscar', 'mandrilar'].map(
    (f) => tipos.find((t: { id: string; familia: string }) => t.familia === f)!,
  );

  for (const tipo of umPorFamilia) await aplicarCombinacao(page, tipo, CTX);

  expect(erros, `console sujo:\n${erros.join('\n')}`).toEqual([]);
});
