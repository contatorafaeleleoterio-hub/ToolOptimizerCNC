import { test, expect, Page } from '@playwright/test';
import { mockupPath, escolher, calcular } from './helpers';

// Cenários-ALVO do refactor. Ficam VERMELHOS até o Builder entregar — é assim
// que definem o alvo em vez de descrevê-lo em prosa.
//
// A suíte de regressão (`gauntlet.spec.ts`) e a trava do motor (`goldens.spec.ts`)
// têm que estar verdes em TODO ciclo. Estes aqui só precisam ficar verdes no
// ciclo que passa.

const PARAMETROS = ['vc', 'fz', 'ae', 'ap'] as const;

/** Luminância relativa WCAG de uma cor `rgb(...)`/`rgba(...)`. */
function luminancia(cor: string): number | null {
  const m = cor.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b] = m[1].split(',').slice(0, 3).map((v) => Number(v.trim()) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function razaoContraste(frente: string, fundo: string): number | null {
  const l1 = luminancia(frente);
  const l2 = luminancia(fundo);
  if (l1 === null || l2 === null) return null;
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/** Cor de texto + fundo efetivo (sobe a árvore até achar fundo opaco). */
async function coresEfetivas(page: Page, seletor: string) {
  return page.locator(seletor).first().evaluate((el) => {
    const cor = getComputedStyle(el).color;
    let node: HTMLElement | null = el as HTMLElement;
    while (node) {
      const bg = getComputedStyle(node).backgroundColor;
      const m = bg.match(/rgba?\(([^)]+)\)/);
      const alpha = m && m[1].split(',')[3] !== undefined ? Number(m[1].split(',')[3]) : 1;
      if (bg && bg !== 'transparent' && alpha > 0) return { cor, fundo: bg };
      node = node.parentElement;
    }
    return { cor, fundo: 'rgb(255, 255, 255)' };
  });
}

async function preencherFresaTopo(page: Page) {
  await escolher(page, 'select-familia', 'fresar');
  await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'fresa_topo');
  await page.selectOption('[data-testid="select-material-peca"]', 'Aço 1045');
  await escolher(page, 'select-material-ferramenta', 'MD');
  await escolher(page, 'select-operacao', 'desbaste');
  await page.fill('[data-testid="input-diametro"]', '10');
  await page.fill('[data-testid="input-arestas"]', '4');
  await page.fill('[data-testid="input-ap"]', '2');
  await page.fill('[data-testid="input-ae"]', '5');
}

test.describe('Refactor v2 — alvos novos', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(mockupPath);
  });

  // ─── Ajuste fino ──────────────────────────────────────────────────────────

  test('R01 — os 4 controles de ajuste fino existem dentro do painel de configuração', async ({ page }) => {
    await preencherFresaTopo(page);
    for (const p of PARAMETROS) {
      await expect(page.locator(`[data-testid="slider-${p}"]`)).toBeVisible();
    }
    // Bloco de ajuste fino vem depois do geométrico e antes do botão de ação
    const yAjuste = (await page.locator('[data-testid="bloco-ajuste-fino"]').boundingBox())!.y;
    const yGeometrico = (await page.locator('[data-testid="bloco-geometrico"]').boundingBox())!.y;
    const yAcao = (await page.locator('[data-testid="btn-calcular"]').boundingBox())!.y;
    expect(yGeometrico).toBeLessThan(yAjuste);
    expect(yAjuste).toBeLessThan(yAcao);
  });

  test('R02 — cada controle de ajuste fino chega no valor recomendado', async ({ page }) => {
    await preencherFresaTopo(page);
    await calcular(page);
    for (const p of PARAMETROS) {
      const valor = await page.locator(`[data-testid="slider-${p}"]`).inputValue();
      expect(Number(valor), `slider ${p} sem valor recomendado`).toBeGreaterThan(0);
    }
  });

  test('R03 — mexer no controle não recalcula: resultado fica velho até clicar em Calcular', async ({ page }) => {
    await preencherFresaTopo(page);
    await calcular(page);
    const rpmAntes = await page.locator('[data-testid="resultado-rpm"]').textContent();

    const slider = page.locator('[data-testid="slider-vc"]');
    const max = await slider.getAttribute('max');
    await slider.fill(String(Math.round(Number(max) * 0.6)));

    // valor do parâmetro atualiza na hora
    await expect(page.locator('[data-testid="valor-vc"]')).not.toHaveText('');
    // resultado NÃO
    expect(await page.locator('[data-testid="resultado-rpm"]').textContent()).toBe(rpmAntes);
    await expect(page.locator('[data-testid="resultado-rpm"]')).toHaveClass(/stale/);

    await calcular(page);
    expect(await page.locator('[data-testid="resultado-rpm"]').textContent()).not.toBe(rpmAntes);
  });

  test('R04 — cada parâmetro tem barra de estado própria', async ({ page }) => {
    await preencherFresaTopo(page);
    await calcular(page);
    for (const p of PARAMETROS) {
      await expect(page.locator(`[data-testid="barra-estado-${p}"]`)).toBeVisible();
    }
  });

  // ─── Ajuda contextual ─────────────────────────────────────────────────────

  test('R05 — ajuda abre por clique, não por hover, e informa aria-expanded', async ({ page }) => {
    await preencherFresaTopo(page);
    const botao = page.locator('[data-testid="ajuda-vc"]');
    const painel = page.locator('[data-testid="popover-vc"]');

    await expect(botao).toHaveAttribute('aria-expanded', 'false');
    await expect(painel).toBeHidden();

    await botao.hover();
    await expect(painel, 'hover não pode abrir — quebra em toque').toBeHidden();

    await botao.click();
    await expect(botao).toHaveAttribute('aria-expanded', 'true');
    await expect(painel).toBeVisible();
    expect((await painel.textContent())!.length).toBeGreaterThan(40);
  });

  test('R06 — ajuda fecha com Esc e só uma fica aberta por vez', async ({ page }) => {
    await preencherFresaTopo(page);
    await page.locator('[data-testid="ajuda-vc"]').click();
    await expect(page.locator('[data-testid="popover-vc"]')).toBeVisible();

    await page.locator('[data-testid="ajuda-ap"]').click();
    await expect(page.locator('[data-testid="popover-ap"]')).toBeVisible();
    await expect(page.locator('[data-testid="popover-vc"]'), 'só um popover aberto por vez').toBeHidden();

    await page.keyboard.press('Escape');
    await expect(page.locator('[data-testid="popover-ap"]')).toBeHidden();
  });

  test('R07 — ajuda é alcançável e acionável só pelo teclado', async ({ page }) => {
    await preencherFresaTopo(page);
    await page.locator('[data-testid="ajuda-vc"]').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-testid="popover-vc"]')).toBeVisible();
  });

  // ─── Indicadores ──────────────────────────────────────────────────────────

  test('R08 — os 3 gauges existem e respondem ao cálculo', async ({ page }) => {
    await preencherFresaTopo(page);
    await calcular(page);
    for (const g of ['gauge-eficiencia-avanco', 'gauge-mrr', 'gauge-saude']) {
      await expect(page.locator(`[data-testid="${g}"]`)).toBeVisible();
      await expect(page.locator(`[data-testid="${g}-valor"]`)).not.toHaveText('—');
    }
  });

  // ─── Perfil de máquina ────────────────────────────────────────────────────

  test('R09 — o perfil de máquina manda no resultado', async ({ page }) => {
    await preencherFresaTopo(page);
    await page.fill('[data-testid="input-maquina-potencia"]', '15');
    await calcular(page);
    const alertaFolgado = await page.locator('[data-testid="badge-alerta-seguranca"]').textContent();

    await page.fill('[data-testid="input-maquina-potencia"]', '0.5');
    await calcular(page);
    const alertaApertado = await page.locator('[data-testid="badge-alerta-seguranca"]').textContent();

    expect(alertaApertado, 'baixar a potência da máquina tem que mudar o alerta').not.toBe(alertaFolgado);
  });

  // ─── Formulário enxuto ────────────────────────────────────────────────────

  test('R10 — os 4 campos mortos não aparecem em nenhum dos 18 tipos', async ({ page }) => {
    const mortos = ['chk-refrig-interna', 'input-sobremetal', 'input-profundidade-h'];
    const familias = ['fresar', 'furar', 'roscar', 'mandrilar'];

    for (const familia of familias) {
      await escolher(page, 'select-familia', familia);
      const tipos = await page.$$eval('[data-testid="select-tipo-ferramenta"] option', (o) => o.map((x) => x.value));
      for (const tipo of tipos) {
        await page.selectOption('[data-testid="select-tipo-ferramenta"]', tipo);
        for (const m of mortos) {
          await expect(page.locator(`[data-testid="${m}"]`), `${m} visível em ${tipo}`).toBeHidden();
        }
        // Z é avanço por dente: vale para fresa (inclusive a de rosca), nunca
        // para furação nem mandrilamento, que trabalham por rotação.
        if (familia === 'furar' || familia === 'mandrilar') {
          await expect(page.locator('[data-testid="input-arestas"]'), `Z visível em ${tipo}`).toBeHidden();
        }
      }
    }
  });

  test('R11 — nenhum tipo pede mais de 6 campos no fluxo padrão', async ({ page }) => {
    const familias = ['fresar', 'furar', 'roscar', 'mandrilar'];
    const excedentes: string[] = [];

    for (const familia of familias) {
      await escolher(page, 'select-familia', familia);
      const tipos = await page.$$eval('[data-testid="select-tipo-ferramenta"] option', (o) => o.map((x) => x.value));
      for (const tipo of tipos) {
        await page.selectOption('[data-testid="select-tipo-ferramenta"]', tipo);
        const visiveis = await page.locator('[data-testid="bloco-geometrico"] .row:not(.hidden)').count();
        if (visiveis > 6) excedentes.push(`${tipo}: ${visiveis} campos`);
      }
    }
    expect(excedentes, `tipos acima do teto de 6 campos:\n${excedentes.join('\n')}`).toEqual([]);
  });

  test('R12 — a ordem dos blocos é contexto → categórico → geométrico → ajuste fino → ação', async ({ page }) => {
    const blocos = ['bloco-contexto', 'bloco-categorico', 'bloco-geometrico', 'bloco-ajuste-fino'];
    const ys: number[] = [];
    for (const b of blocos) ys.push((await page.locator(`[data-testid="${b}"]`).boundingBox())!.y);
    ys.push((await page.locator('[data-testid="btn-calcular"]').boundingBox())!.y);

    for (let i = 1; i < ys.length; i++) {
      expect(ys[i], `bloco ${i} fora de ordem`).toBeGreaterThan(ys[i - 1]);
    }
  });

  test('R13 — família, operação, material da ferramenta e ângulo são escolha de 1 clique', async ({ page }) => {
    await escolher(page, 'select-familia', 'furar');
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'broca_hss');

    for (const testid of ['select-familia', 'select-operacao', 'select-material-ferramenta', 'input-angulo-broca']) {
      const container = page.locator(`[data-testid="${testid}"]`);
      const tag = await container.evaluate((n) => n.tagName.toLowerCase());
      expect(tag, `${testid} continua dropdown`).not.toBe('select');

      const radios = container.locator('input[type="radio"]');
      const n = await radios.count();
      expect(n, `${testid} sem opções`).toBeGreaterThan(0);

      // alvo de toque ISA-101
      const alvo = container.locator('label').first();
      const box = await alvo.boundingBox();
      expect(box!.height, `${testid} com alvo abaixo de 44px`).toBeGreaterThanOrEqual(44);
    }
  });

  // ─── Acessibilidade e design system ───────────────────────────────────────

  test('R14 — contraste AA nos pares de texto principais', async ({ page }) => {
    await preencherFresaTopo(page);
    await calcular(page);

    const alvos = [
      '[data-testid="resultado-rpm"]',
      '[data-testid="resultado-avanco"]',
      '[data-testid="texto-fonte-vc"]',
      '[data-testid="badge-alerta-seguranca"]',
      '[data-testid="input-diametro"]',
    ];
    const falhas: string[] = [];

    for (const alvo of alvos) {
      const { cor, fundo } = await coresEfetivas(page, alvo);
      const razao = razaoContraste(cor, fundo);
      if (razao !== null && razao < 4.5) falhas.push(`${alvo}: ${razao.toFixed(2)}:1 (${cor} sobre ${fundo})`);
    }
    expect(falhas, `contraste abaixo de 4,5:1:\n${falhas.join('\n')}`).toEqual([]);
  });

  test('R15 — foco visível em todo elemento alcançável por teclado', async ({ page }) => {
    const semFoco = await page.evaluate(() => {
      const focaveis = Array.from(
        document.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.offsetParent !== null);

      const falhas: string[] = [];
      for (const el of focaveis) {
        el.focus();
        const s = getComputedStyle(el);
        const temAnel = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none';
        if (!temAnel) falhas.push(el.getAttribute('data-testid') || el.id || el.tagName);
      }
      return falhas;
    });
    expect(semFoco, `elementos sem foco visível: ${semFoco.join(', ')}`).toEqual([]);
  });

  test('R16 — a página não faz nenhuma requisição de rede', async ({ page }) => {
    const externas: string[] = [];
    await page.route('**/*', (route) => {
      const url = route.request().url();
      if (!url.startsWith('file://') && !url.startsWith('data:') && !url.startsWith('blob:')) externas.push(url);
      route.continue();
    });

    await page.goto(mockupPath);
    await preencherFresaTopo(page);
    await calcular(page);

    expect(externas, `requisições externas detectadas:\n${externas.join('\n')}`).toEqual([]);
  });

  test('R17 — todo número exibido alcança a fórmula e a fonte que o geraram', async ({ page }) => {
    await preencherFresaTopo(page);
    await calcular(page);

    const cartao = page.locator('[data-testid="cartao-formula"]');
    await expect(cartao).toBeVisible();

    // Cada resultado principal tem procedência alcançável
    for (const r of ['rpm', 'avanco', 'potencia', 'torque']) {
      await expect(
        page.locator(`[data-testid="procedencia-${r}"]`),
        `resultado ${r} sem procedência`,
      ).toHaveCount(1);
    }
    await expect(page.locator('[data-testid="texto-fonte-vc"]')).not.toHaveText('');
  });

});
