/**
 * Lógica compartilhada entre a CAPTURA dos golden values
 * (`scripts/capture-goldens.mjs`) e a VERIFICAÇÃO deles (`goldens.spec.ts`).
 *
 * Mora num módulo só de propósito: se captura e verificação preenchessem a
 * tela de formas diferentes, o golden compararia coisas diferentes e não
 * provaria nada.
 */

/** Valor fixo por campo. Determinismo importa mais que realismo. */
export const FIELD_VALUES = {
  diametro: '10',
  diametroMenor: '6',
  raioCanto: '2',
  diametroInicial: '20',
  diametroFinal: '24',
  balanco: '30',
  arestas: '4',
  ap: '2',
  ae: '5',
  anguloPosicao: '15',
  passoRosca: '1.5',
  sobremetal: '0.2',
  profundidadeH: '3',
  fnManual: '0.1',
};
// passoRosca é preenchido explicitamente: os machos não expõem o seletor de
// designação da rosca, então o preenchimento automático não os alcança.
// furoExecutado não entra: é opcional por definição.

/**
 * Contextos: cobrem 3 grupos ISO (dado verificado e estimado) × as 3 operações.
 *
 * O eixo `ferramenta` saiu em 15/08/2026: o substrato deixou de ser um campo da
 * tela e virou parte da própria entrada do catálogo (SPEC §3.2). A cobertura de
 * substrato passa a vir das 33 entradas enumeradas por `enumerarTipos` — repeti-la
 * aqui multiplicaria combinações sem cobrir nada novo. 33 × 3 = 99 goldens.
 */
export const CONTEXTS = [
  { material: 'Aço 1045', operacao: 'desbaste' },
  { material: 'Alumínio 6061-T6', operacao: 'acabamento' },
  { material: 'Ferro Fundido GG25', operacao: 'semi' },
];

export const OUTPUT_TESTIDS = [
  'resultado-rpm',
  'resultado-avanco',
  'resultado-indice-saude',
  'resultado-mrr',
  'resultado-potencia',
  'resultado-torque',
  'texto-fonte-vc',
  'resultado-furo-previo',
  'resultado-tempo-furo',
  'badge-alerta-seguranca',
  'cartao-formula',
];

/** Seleciona valor em controle que pode ser <select> ou grupo de rádios. */
async function escolher(page, testid, value) {
  const el = page.locator(`[data-testid="${testid}"]`);
  const tag = await el.evaluate((n) => n.tagName.toLowerCase());
  if (tag === 'select') {
    await el.selectOption(value);
    return;
  }
  await el.locator(`input[type="radio"][value="${value}"]`).check();
}

/** Enumera família → tipos pelo DOM (o script do mockup roda dentro de IIFE). */
export async function enumerarTipos(page) {
  const familias = await page.$$eval('[data-testid="select-familia"] option, [data-testid="select-familia"] input[type="radio"]',
    (els) => els.map((e) => e.value));

  const tipos = [];
  for (const familia of familias) {
    await escolher(page, 'select-familia', familia);
    const ids = await page.$$eval('[data-testid="select-tipo-ferramenta"] option', (opts) =>
      opts.map((o) => o.value),
    );
    for (const id of ids) tipos.push({ id, familia });
  }
  return tipos;
}

/** Aplica uma combinação completa na tela e dispara o cálculo. */
export async function aplicarCombinacao(page, tipo, ctx) {
  await escolher(page, 'select-familia', tipo.familia);
  await page.selectOption('[data-testid="select-tipo-ferramenta"]', tipo.id);
  await page.selectOption('[data-testid="select-material-peca"]', ctx.material);
  await escolher(page, 'select-operacao', ctx.operacao);

  for (const [key, value] of Object.entries(FIELD_VALUES)) {
    const field = page.locator(`#fld-${key}`);
    if (await field.isVisible()) await field.fill(value);
  }

  // Depois dos campos: selecionar a designação sincroniza o passo por cima do
  // valor fixo. M16 mantém a fresa de rosca (Ø10) abaixo do diâmetro da rosca,
  // que é o que a mantém fora do bloqueio. Os machos não expõem este seletor e
  // ficam com o passo 1,5 preenchido acima — coerente com o Ø10 deles.
  const rosca = page.locator('[data-testid="select-designacao-rosca"]');
  if (await rosca.isVisible()) await rosca.selectOption('M16');

  await page.click('[data-testid="btn-calcular"]');
}

/** Lê todas as saídas visíveis, normalizando espaço em branco. */
export async function lerSaidas(page) {
  return page.evaluate((testids) => {
    const out = {};
    for (const id of testids) {
      const el = document.querySelector(`[data-testid="${id}"]`);
      out[id] = el ? el.textContent.replace(/\s+/g, ' ').trim() : null;
    }
    return out;
  }, OUTPUT_TESTIDS);
}
