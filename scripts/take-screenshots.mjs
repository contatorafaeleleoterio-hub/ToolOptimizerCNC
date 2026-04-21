/**
 * APP-3 — Captura screenshots 1080×1920 para Play Store listing.
 * Pré-requisito: dev server rodando em http://localhost:5173
 * Uso: node scripts/take-screenshots.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../docs/screenshots');
mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:5173';
const W = 1080;
const H = 1920;

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: W, height: H } });
const page = await context.newPage();

async function shot(name, url, waitMs = 2000, extraFn) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(waitMs);
  if (extraFn) await extraFn(page);
  const path = `${OUT}/${name}`;
  await page.screenshot({ path, fullPage: false });
  console.log(`✅  ${name}`);
}

// 1 — Landing page (bloco CTA)
await shot('01-landing.png', BASE, 1000);

// Dismiss landing to reach the app
await page.goto(BASE);
await page.waitForTimeout(800);
const uswBtn = page.locator('text=Usar na Web');
if (await uswBtn.count()) await uswBtn.click();
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/02-calculadora-desktop.png` });
console.log('✅  02-calculadora-desktop.png');

// 3 — Mobile HMI Visor
await page.goto(`${BASE}/mobile`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/03-hmi-visor.png` });
console.log('✅  03-hmi-visor.png');

// 4 — Histórico
await page.goto(`${BASE}/history`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/04-historico.png` });
console.log('✅  04-historico.png');

// 5 — Favoritos
await page.goto(`${BASE}/favoritos`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/05-favoritos.png` });
console.log('✅  05-favoritos.png');

// 6 — Privacy policy
await shot('06-privacidade.png', `${BASE}/privacidade`, 500);

await browser.close();
console.log(`\nScreenshots salvas em: ${OUT}`);
