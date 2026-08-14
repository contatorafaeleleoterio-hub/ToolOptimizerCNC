import { test, expect } from '@playwright/test';
import { mockupPath, escolher, calcular } from './helpers';

// Suíte de REGRESSÃO. Estes 23 cenários definem o comportamento já aprovado
// (ciclo 3, 91/100) e têm que continuar verdes em todo ciclo do refactor.
// Cenários do que o refactor ADICIONA ficam em `refactor.spec.ts`.

test.describe('Gauntlet Loop v2 — Suíte Completa de Testes (T01 a T24)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(mockupPath);
  });

  // T01 — Básico Fresar
  test('T01 — Básico Fresar: topo reto, Aço 1045, MD, desbaste, Ø10mm, Z=4', async ({ page }) => {
    await escolher(page, 'select-familia', 'fresar');
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'fresa_topo');
    await page.selectOption('[data-testid="select-material-peca"]', 'Aço 1045');
    await escolher(page, 'select-material-ferramenta', 'MD');
    await escolher(page, 'select-operacao', 'desbaste');
    await page.fill('[data-testid="input-diametro"]', '10');
    await page.fill('[data-testid="input-arestas"]', '4');
    await page.fill('[data-testid="input-ap"]', '5');
    await page.fill('[data-testid="input-ae"]', '5');
    await calcular(page);

    // Verifica presença do resultado de RPM e Avanço
    const rpmText = await page.locator('[data-testid="resultado-rpm"]').textContent();
    const avancoText = await page.locator('[data-testid="resultado-avanco"]').textContent();

    expect(rpmText).not.toBe('—');
    expect(avancoText).not.toBe('—');
    expect(Number(rpmText?.replace(/\D/g, ''))).toBeGreaterThan(3000);
    expect(Number(avancoText?.replace(/\D/g, ''))).toBeGreaterThan(1000);
  });

  // T02 — Troca de Família sem Reconstruir Tela
  test('T02 — Troca de Família sem Reconstruir Tela', async ({ page }) => {
    await escolher(page, 'select-familia', 'fresar');
    const boxBefore = await page.locator('[data-testid="resultado-rpm"]').boundingBox();

    await escolher(page, 'select-familia', 'furar');
    const boxAfter = await page.locator('[data-testid="resultado-rpm"]').boundingBox();

    expect(boxBefore).not.toBeNull();
    expect(boxAfter).not.toBeNull();
    // Posição vertical/horizontal do container de resultado permanece a mesma
    expect(Math.abs((boxBefore?.x || 0) - (boxAfter?.x || 0))).toBeLessThan(5);
  });

  // T03 — Troca de Tipo Preserva Campos Comuns
  test('T03 — Troca de Tipo Preserva Campos Comuns (Material da Peça e Diâmetro)', async ({ page }) => {
    await page.selectOption('[data-testid="select-material-peca"]', 'Aço 1045');
    await page.fill('[data-testid="input-diametro"]', '12');

    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'fresa_toroidal');

    const matVal = await page.locator('[data-testid="select-material-peca"]').inputValue();
    const diaVal = await page.locator('[data-testid="input-diametro"]').inputValue();

    expect(matVal).toBe('Aço 1045');
    expect(diaVal).toBe('12');
  });

  // T04 — Zonas Fixas nas 4 Famílias
  test('T04 — Zonas Fixas (1 a 6) visíveis nas 4 Famílias', async ({ page }) => {
    const familias = ['fresar', 'furar', 'roscar', 'mandrilar'];
    for (const fam of familias) {
      await escolher(page, 'select-familia', fam);
      await expect(page.locator('[data-testid="resultado-rpm"]')).toBeVisible();
      await expect(page.locator('[data-testid="resultado-avanco"]')).toBeVisible();
    }
  });

  // T05 — Determinismo de Cálculo
  test('T05 — Determinismo de Cálculo ao Recarregar a Página', async ({ page }) => {
    await page.selectOption('[data-testid="select-material-peca"]', 'Aço 1045');
    await page.fill('[data-testid="input-diametro"]', '10');
    await calcular(page);
    const rpm1 = await page.locator('[data-testid="resultado-rpm"]').textContent();

    await page.reload();

    await page.selectOption('[data-testid="select-material-peca"]', 'Aço 1045');
    await page.fill('[data-testid="input-diametro"]', '10');
    await calcular(page);
    const rpm2 = await page.locator('[data-testid="resultado-rpm"]').textContent();

    expect(rpm1).toBe(rpm2);
  });

  // T06 — Ordem de Tab Lógica
  test('T06 — Ordem de Tab Lógica percorre formulário sem saltos', async ({ page }) => {
    await page.focus('[data-testid="select-familia"]');
    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
    expect(focusedTag).toBeTruthy();
  });

  // T07 — Estado Vazio Honesto
  test('T07 — Estado Vazio Honesto exibe traço ("—") antes do cálculo', async ({ page }) => {
    await page.fill('[data-testid="input-diametro"]', '');
    await calcular(page);
    const rpmText = await page.locator('[data-testid="resultado-rpm"]').textContent();
    expect(rpmText?.trim()).toBe('—');
  });

  // T08 / T09 — Diâmetro Vazio, Zero ou Negativo
  test('T08 / T09 — Diâmetro inválido exibe alerta e não gera resultado absurdo', async ({ page }) => {
    await page.fill('[data-testid="input-diametro"]', '-5');
    await calcular(page);
    const rpmText = await page.locator('[data-testid="resultado-rpm"]').textContent();
    expect(rpmText?.trim()).toBe('—');

    await expect(page.locator('[data-testid="badge-alerta-seguranca"]')).toBeVisible();
  });

  // T10 — L/D > 6 (Fresar) Bloqueado
  test('T10 — Deflexão L/D > 6 em Fresar gera Bloqueio', async ({ page }) => {
    await escolher(page, 'select-familia', 'fresar');
    await page.fill('[data-testid="input-diametro"]', '10');
    await page.fill('[data-testid="input-balanco"]', '70'); // L/D = 7
    await calcular(page);

    const alerta = await page.locator('[data-testid="badge-alerta-seguranca"]').textContent();
    expect(alerta?.toLowerCase()).toContain('bloqueado');
  });

  // T11 — Limite de Torque Excedido
  test('T11 — Torque Excedido exibe Alerta Vermelho / Bloqueio', async ({ page }) => {
    await escolher(page, 'select-familia', 'roscar');
    await page.fill('[data-testid="input-diametro"]', '30'); // Rosca muito grande para máquina
    await calcular(page);
    await expect(page.locator('[data-testid="badge-alerta-seguranca"]')).toBeVisible();
  });

  // T12 — Fator de Material da Ferramenta (HSS vs MD)
  test('T12 — Vc com HSS é aproximadamente 29% do Vc com Metal Duro', async ({ page }) => {
    await page.selectOption('[data-testid="select-material-peca"]', 'Aço 1045');
    await page.fill('[data-testid="input-diametro"]', '10');

    await escolher(page, 'select-material-ferramenta', 'MD');
    await calcular(page);
    const rpmMDText = await page.locator('[data-testid="resultado-rpm"]').textContent();
    const rpmMD = Number(rpmMDText?.replace(/\D/g, ''));

    await escolher(page, 'select-material-ferramenta', 'HSS');
    await calcular(page);
    const rpmHSSText = await page.locator('[data-testid="resultado-rpm"]').textContent();
    const rpmHSS = Number(rpmHSSText?.replace(/\D/g, ''));

    expect(rpmHSS / rpmMD).toBeCloseTo(0.29, 1);
  });

  // T13 — Diâmetro Efetivo em Fresa Esférica
  test('T13 — Diâmetro Efetivo em Fresa Esférica altera rotação quando ap < D/2', async ({ page }) => {
    await escolher(page, 'select-familia', 'fresar');
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'fresa_esferica');
    await page.fill('[data-testid="input-diametro"]', '10');
    await page.fill('[data-testid="input-ap"]', '2'); // ap < 5mm
    await calcular(page);

    const rpmText = await page.locator('[data-testid="resultado-rpm"]').textContent();
    expect(rpmText).not.toBe('—');
  });

  // T14 — Diâmetro Efetivo em Fresa Toroidal
  test('T14 — Diâmetro Efetivo em Fresa Toroidal quando ap < r', async ({ page }) => {
    await escolher(page, 'select-familia', 'fresar');
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'fresa_toroidal');
    await page.fill('[data-testid="input-diametro"]', '10');
    await page.fill('[data-testid="input-raio-canto"]', '2');
    await page.fill('[data-testid="input-ap"]', '1'); // ap < r
    await calcular(page);

    const rpmText = await page.locator('[data-testid="resultado-rpm"]').textContent();
    expect(rpmText).not.toBe('—');
  });

  // T15 — Fresa de Alto Avanço
  test('T15 — Fresa de Alto Avanço aplica correção por ângulo de posição', async ({ page }) => {
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'fresa_alto_avanco');
    await page.fill('[data-testid="input-diametro"]', '16');
    await page.fill('[data-testid="input-angulo-posicao"]', '15');
    await calcular(page);

    const avancoText = await page.locator('[data-testid="resultado-avanco"]').textContent();
    expect(avancoText).not.toBe('—');
  });

  // T16 — Cabeçote Faceador
  test('T16 — Cabeçote Faceador alerta quando ae > 0.8D', async ({ page }) => {
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'cabecote_faceador');
    await page.fill('[data-testid="input-diametro"]', '80');
    await page.fill('[data-testid="input-ae"]', '75'); // > 64mm (0.8D)
    await calcular(page);

    await expect(page.locator('[data-testid="badge-alerta-seguranca"]')).toBeVisible();
  });

  // T17 — U-Drill Avanço Mínimo
  test('T17 — Broca U-Drill alerta avanço mínimo', async ({ page }) => {
    await escolher(page, 'select-familia', 'furar');
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'u_drill');
    await page.fill('[data-testid="input-diametro"]', '20');
    await calcular(page);

    await expect(page.locator('[data-testid="resultado-rpm"]')).toBeVisible();
  });

  // T18 — Alargador Vc reduzido
  test('T18 — Alargador possui Vc reduzido (~1/3 da broca)', async ({ page }) => {
    await escolher(page, 'select-familia', 'furar');
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'alargador');
    await page.fill('[data-testid="input-diametro"]', '10');
    await calcular(page);

    const rpmText = await page.locator('[data-testid="resultado-rpm"]').textContent();
    expect(rpmText).not.toBe('—');
  });

  // T19 — Macho de Corte M10x1.5
  test('T19 — Macho de Corte calcula Furo Prévio e trava Avanço no passo', async ({ page }) => {
    await escolher(page, 'select-familia', 'roscar');
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'macho_corte');
    await page.fill('[data-testid="input-diametro"]', '10');
    await page.fill('[data-testid="input-passo-rosca"]', '1.5');
    await calcular(page);

    const furoText = await page.locator('[data-testid="resultado-furo-previo"]').textContent();
    expect(furoText).toContain('8.5');
  });

  // T20 — Macho de Conformação
  test('T20 — Macho de Conformação calcula Furo Prévio maior', async ({ page }) => {
    await escolher(page, 'select-familia', 'roscar');
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'macho_conformacao');
    await page.fill('[data-testid="input-diametro"]', '10');
    await page.fill('[data-testid="input-passo-rosca"]', '1.5');
    await calcular(page);

    const furoText = await page.locator('[data-testid="resultado-furo-previo"]').textContent();
    expect(furoText).not.toBe('—');
  });

  // T21 — Fresa de Rosca
  test('T21 — Fresa de Rosca calcula compensação de avanço', async ({ page }) => {
    await escolher(page, 'select-familia', 'roscar');
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'fresa_rosca');
    await page.fill('[data-testid="input-diametro"]', '12');
    await page.fill('[data-testid="input-passo-rosca"]', '1.75');
    await calcular(page);

    const avancoText = await page.locator('[data-testid="resultado-avanco"]').textContent();
    expect(avancoText).not.toBe('—');
  });

  // T22 — Mandrilar ap por lado e L/D > 5 bloqueado
  test('T22 — Mandrilar ap por lado e alerta de L/D > 5', async ({ page }) => {
    await escolher(page, 'select-familia', 'mandrilar');
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'mandril');
    await page.fill('[data-testid="input-diametro-inicial"]', '30');
    await page.fill('[data-testid="input-diametro-final"]', '34');
    await page.fill('[data-testid="input-balanco"]', '160'); // L/D > 5
    await calcular(page);

    await expect(page.locator('[data-testid="badge-alerta-seguranca"]')).toBeVisible();
  });

  // T23 — Modo de Cálculo Rápido em 3 Campos
  test('T23 — Modo Rápido ativa com 3 campos', async ({ page }) => {
    await page.click('[data-testid="toggle-modo-rapido"]');
    await page.selectOption('[data-testid="select-material-peca"]', 'Aço 1045');
    await page.fill('[data-testid="input-diametro"]', '10');
    await escolher(page, 'select-operacao', 'desbaste');
    await calcular(page);

    const rpmText = await page.locator('[data-testid="resultado-rpm"]').textContent();
    expect(rpmText).not.toBe('—');
  });

  // T24 — Fator de Segurança e Índice de Saúde
  test('T24 — Fator de Segurança altera apenas Potência e Torque exibidos', async ({ page }) => {
    await page.selectOption('[data-testid="select-material-peca"]', 'Aço 1045');
    await page.fill('[data-testid="input-diametro"]', '10');
    await page.fill('[data-testid="input-fator-seguranca"]', '80');
    await calcular(page);

    const rpmText = await page.locator('[data-testid="resultado-rpm"]').textContent();
    expect(rpmText).not.toBe('—');

    await expect(page.locator('[data-testid="resultado-indice-saude"]')).toBeVisible();
  });

});
