import { test, expect, type Page } from '@playwright/test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const MOCKUP_URL = pathToFileURL(path.resolve(__dirname, '../mockup/index.html')).toString();

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  return errors;
}

async function goto(page: Page) {
  const errors = trackErrors(page);
  await page.goto(MOCKUP_URL);
  return errors;
}

function num(text: string): number {
  const m = text.replace(/\./g, '').replace(',', '.').match(/-?\d+(\.\d+)?/);
  // resultado usa toFixed com ponto decimal (locale en), então não troca vírgula/ponto de fato
  const m2 = text.match(/-?\d+(\.\d+)?/);
  return m2 ? parseFloat(m2[0]) : NaN;
}

test('T01 — fluxo básico', async ({ page }) => {
  const errors = await goto(page);
  await page.selectOption('[data-testid="operacao"]', 'fresar');
  await page.selectOption('[data-testid="tipo-ferramenta"]', 'topo');
  await page.selectOption('[data-testid="material-peca"]', '1');
  await page.fill('[data-testid="diametro"]', '10');
  await page.click('[data-testid="btn-calcular"]');

  const rpm = await page.textContent('[data-testid="resultado-rpm"]');
  const vf = await page.textContent('[data-testid="resultado-avanco"]');
  expect(rpm).not.toBe('—');
  expect(vf).not.toBe('—');
  expect(num(rpm!)).toBeGreaterThan(0);
  expect(num(vf!)).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test('T02 — troca de ferramenta não recarrega e troca campos', async ({ page }) => {
  const errors = await goto(page);
  await page.selectOption('[data-testid="operacao"]', 'fresar');
  await page.selectOption('[data-testid="tipo-ferramenta"]', 'cabecote');
  await page.click('[data-testid="btn-calcular"]');
  await expect(page.locator('[data-testid="param-kappa"]')).toBeVisible();
  await expect(page.locator('[data-testid="param-ae"]')).toBeVisible();

  await page.selectOption('[data-testid="operacao"]', 'roscar');

  await expect(page.locator('[data-testid="param-kappa"]')).toHaveCount(0);
  const aeWrap = page.locator('[data-field-wrap="ae"]');
  await expect(aeWrap).toBeHidden();
  await expect(page.locator('[data-testid="param-passo"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test('T03 — alteração de parâmetros muda RPM', async ({ page }) => {
  const errors = await goto(page);
  await page.selectOption('[data-testid="operacao"]', 'fresar');
  await page.selectOption('[data-testid="tipo-ferramenta"]', 'topo');
  await page.fill('[data-testid="diametro"]', '10');
  await page.click('[data-testid="btn-calcular"]');
  const rpm10 = num((await page.textContent('[data-testid="resultado-rpm"]'))!);

  await page.fill('[data-testid="diametro"]', '12');
  await page.click('[data-testid="btn-calcular"]');
  const rpm12 = num((await page.textContent('[data-testid="resultado-rpm"]'))!);

  expect(rpm12).toBeLessThan(rpm10);
  const esperado = rpm10 * (10 / 12);
  expect(Math.abs(rpm12 - esperado) / esperado).toBeLessThan(0.15);
  expect(errors).toEqual([]);
});

test('T04 — campo Ø obrigatório', async ({ page }) => {
  const errors = await goto(page);
  await page.selectOption('[data-testid="operacao"]', 'fresar');
  await page.fill('[data-testid="diametro"]', '');
  await page.click('[data-testid="btn-calcular"]');

  const rpm = await page.textContent('[data-testid="resultado-rpm"]');
  expect(rpm).toBe('—');
  expect(rpm).not.toContain('NaN');
  await expect(page.locator('[data-testid="aviso-item"]')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('T05 — valor de Ø inválido (negativo)', async ({ page }) => {
  const errors = await goto(page);
  await page.selectOption('[data-testid="operacao"]', 'fresar');
  await page.fill('[data-testid="diametro"]', '-5');
  await page.click('[data-testid="btn-calcular"]');

  const rpm = await page.textContent('[data-testid="resultado-rpm"]');
  expect(rpm).toBe('—');
  expect(rpm).not.toContain('NaN');
  await expect(page.locator('[data-testid="aviso-item"]').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('T06 — valores extremos disparam L/D bloqueado', async ({ page }) => {
  const errors = await goto(page);
  await page.selectOption('[data-testid="operacao"]', 'fresar');
  await page.selectOption('[data-testid="tipo-ferramenta"]', 'topo');
  await page.fill('[data-testid="diametro"]', '200');
  await page.fill('[data-testid="param-balanco"]', '1300');
  await page.click('[data-testid="btn-calcular"]');

  const ld = page.locator('[data-testid="resultado-ld-nivel"]');
  await expect(ld).toHaveAttribute('data-nivel', 'bloqueado');
  const rpm = await page.textContent('[data-testid="resultado-rpm"]');
  expect(rpm).toBe('—');
  expect(errors).toEqual([]);
});

test('T07 — repetição é determinística', async ({ page }) => {
  const errors = await goto(page);
  await page.selectOption('[data-testid="operacao"]', 'fresar');
  await page.selectOption('[data-testid="tipo-ferramenta"]', 'topo');
  await page.fill('[data-testid="diametro"]', '10');
  await page.click('[data-testid="btn-calcular"]');
  const rpm1 = await page.textContent('[data-testid="resultado-rpm"]');

  await page.click('[data-testid="btn-calcular"]');
  const rpm2 = await page.textContent('[data-testid="resultado-rpm"]');

  expect(rpm1).toBe(rpm2);
  expect(errors).toEqual([]);
});

test('T08 — navegação por Tab segue ordem lógica', async ({ page }) => {
  const errors = await goto(page);
  await page.locator('[data-testid="operacao"]').focus();
  const ordem: string[] = [];
  for (let i = 0; i < 5; i++) {
    const id = await page.evaluate(() => document.activeElement?.id || '');
    ordem.push(id);
    await page.keyboard.press('Tab');
  }
  expect(ordem[0]).toBe('operacao');
  expect(ordem).toContain('tipo-ferramenta');
  expect(ordem).toContain('material-ferramenta');
  expect(errors).toEqual([]);
});

test('T09 — RPM e Avanço sempre na mesma região da tela', async ({ page }) => {
  const errors = await goto(page);
  await page.selectOption('[data-testid="operacao"]', 'fresar');
  const boxFresar = await page.locator('[data-testid="resultado-rpm"]').boundingBox();

  await page.selectOption('[data-testid="operacao"]', 'furar');
  const boxFurar = await page.locator('[data-testid="resultado-rpm"]').boundingBox();

  await page.selectOption('[data-testid="operacao"]', 'roscar');
  const boxRoscar = await page.locator('[data-testid="resultado-rpm"]').boundingBox();

  expect(boxFresar).not.toBeNull();
  expect(boxFurar).not.toBeNull();
  expect(boxRoscar).not.toBeNull();
  expect(Math.abs(boxFresar!.x - boxFurar!.x)).toBeLessThan(2);
  expect(Math.abs(boxFresar!.y - boxFurar!.y)).toBeLessThan(2);
  expect(Math.abs(boxFresar!.x - boxRoscar!.x)).toBeLessThan(2);
  expect(Math.abs(boxFresar!.y - boxRoscar!.y)).toBeLessThan(2);
  expect(errors).toEqual([]);
});

test('T10 — troca de material da ferramenta muda Vc/RPM na proporção certa', async ({ page }) => {
  const errors = await goto(page);
  await page.selectOption('[data-testid="operacao"]', 'furar');
  await page.selectOption('[data-testid="tipo-ferramenta"]', 'broca');
  await page.fill('[data-testid="diametro"]', '10');

  await page.selectOption('[data-testid="material-ferramenta"]', 'hss');
  await page.click('[data-testid="btn-calcular"]');
  const rpmHss = num((await page.textContent('[data-testid="resultado-rpm"]'))!);

  await page.selectOption('[data-testid="material-ferramenta"]', 'metal-duro');
  await page.click('[data-testid="btn-calcular"]');
  const rpmMd = num((await page.textContent('[data-testid="resultado-rpm"]'))!);

  const fatorEsperado = 1.0 / 0.29; // ≈ 3.448
  const fatorObservado = rpmMd / rpmHss;
  expect(Math.abs(fatorObservado - fatorEsperado) / fatorEsperado).toBeLessThan(0.1);
  expect(errors).toEqual([]);
});

test('T11 — campos específicos trocam e contexto persiste', async ({ page }) => {
  const errors = await goto(page);
  await page.selectOption('[data-testid="operacao"]', 'fresar');
  await page.selectOption('[data-testid="tipo-ferramenta"]', 'cabecote');
  await page.fill('[data-testid="diametro"]', '15');
  await page.selectOption('[data-testid="material-peca"]', '3');
  await page.click('[data-testid="btn-calcular"]');
  await expect(page.locator('[data-testid="param-kappa"]')).toBeVisible();

  await page.selectOption('[data-testid="operacao"]', 'roscar');

  await expect(page.locator('[data-testid="tipo-ferramenta"]')).toHaveValue('macho');
  await expect(page.locator('[data-testid="param-passo"]')).toBeVisible();
  await expect(page.locator('[data-testid="param-kappa"]')).toHaveCount(0);
  await expect(page.locator('[data-testid="diametro"]')).toHaveValue('15');
  await expect(page.locator('[data-testid="material-peca"]')).toHaveValue('3');
  expect(errors).toEqual([]);
});

test('T12 — modo rápido entrega resultado com 3 campos', async ({ page }) => {
  const errors = await goto(page);
  await page.selectOption('[data-testid="operacao"]', 'fresar');
  await page.selectOption('[data-testid="material-peca"]', '1');
  await page.fill('[data-testid="diametro"]', '10');
  await page.click('[data-testid="toggle-modo"]');
  await page.click('[data-testid="btn-calcular"]');

  const rpm = await page.textContent('[data-testid="resultado-rpm"]');
  const vf = await page.textContent('[data-testid="resultado-avanco"]');
  expect(rpm).not.toBe('—');
  expect(vf).not.toBe('—');
  expect(errors).toEqual([]);
});

test('T13 — furo de macho M10×1,5 = Ø8,5', async ({ page }) => {
  const errors = await goto(page);
  await page.selectOption('[data-testid="operacao"]', 'roscar');
  await page.selectOption('[data-testid="tabela-rosca"]', 'M10');
  await page.click('[data-testid="btn-calcular"]');

  const furo = await page.textContent('[data-testid="resultado-furo-macho"]');
  expect(num(furo!)).toBeCloseTo(8.5, 1);
  expect(errors).toEqual([]);
});
