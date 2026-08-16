/**
 * Captura os golden values do mockup — a prova de que a zona de resultado não
 * perdeu nada na refatoração da tela.
 *
 * Uso:  node scripts/capture-goldens.mjs [saida.json]
 * Padrão de saída: tests/GOLDEN_VALUES.json
 *
 * Roda todas as combinações de tipo de ferramenta × contexto, com valores de
 * entrada fixos, e grava cada saída visível na tela **com os números
 * mascarados** (ver `mascararNumeros` em `tests/combinacoes.mjs`). O mockup é o
 * documento canônico da tela; o motor definitivo entra depois, então o dígito
 * de hoje é provisório e não é comparado. O que fica travado é a saída existir,
 * com rótulo, unidade, texto de alerta e formato de fórmula — em 99
 * combinações, muito mais do que a suíte de regressão mostra.
 *
 * A lógica de acionamento vem de `tests/combinacoes.mjs`, compartilhada com a
 * verificação, para captura e conferência nunca divergirem.
 */
import { chromium } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { CONTEXTS, enumerarTipos, aplicarCombinacao, lerSaidasEstruturais } from '../tests/combinacoes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mockupUrl = 'file://' + path.join(root, 'mockup', 'index.html').replace(/\\/g, '/');
const outPath = path.resolve(root, process.argv[2] ?? 'tests/GOLDEN_VALUES.json');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(mockupUrl);

const tipos = await enumerarTipos(page);
const rows = [];

for (const tipo of tipos) {
  for (const ctx of CONTEXTS) {
    await page.goto(mockupUrl); // estado limpo: nenhum valor vaza entre combinações
    await aplicarCombinacao(page, tipo, ctx);
    rows.push({ tipo: tipo.id, familia: tipo.familia, ...ctx, saidas: await lerSaidasEstruturais(page) });
  }
}

await browser.close();

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(rows, null, 2) + '\n', 'utf8');
console.log(`${rows.length} combinações gravadas em ${path.relative(root, outPath)}`);
