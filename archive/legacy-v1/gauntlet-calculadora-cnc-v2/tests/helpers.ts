import { Page } from '@playwright/test';
import * as path from 'path';

export const mockupPath = `file://${path.resolve(__dirname, '../mockup/index.html').replace(/\\/g, '/')}`;

/**
 * Seleciona um valor num controle que pode ser <select> OU grupo de rádios.
 *
 * A suíte de regressão tem que passar antes e depois da troca por escolha
 * segmentada — se ela só soubesse falar com <select>, trocar o widget
 * derrubaria os 23 cenários e a rede de segurança sumiria justamente no
 * ciclo em que ela é mais necessária.
 *
 * Contrato: o `data-testid` fica no CONTAINER do grupo; cada rádio dentro
 * dele carrega o `value`. Ver `TESTID_CONTRACT.md`.
 */
export async function escolher(page: Page, testid: string, value: string) {
  const el = page.locator(`[data-testid="${testid}"]`);
  const tag = await el.evaluate((n) => n.tagName.toLowerCase());

  if (tag === 'select') {
    await el.selectOption(value);
    return;
  }
  await el.locator(`input[type="radio"][value="${value}"]`).check();
}

/**
 * Dispara o cálculo. Obrigatório antes de ler qualquer resultado: o recálculo
 * automático ao digitar sai no refactor (Regra Crítica 7 — o store não
 * recalcula sozinho, o operador clica).
 */
export async function calcular(page: Page) {
  await page.click('[data-testid="btn-calcular"]');
}
