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

/** Número exibido, tolerando separador de milhar. Só serve para inteiros (rpm, Vf). */
function inteiro(texto: string | null): number {
  return Number((texto ?? '').replace(/\D/g, ''));
}

async function preencherFresaTopo(page: Page) {
  await escolher(page, 'select-familia', 'fresar');
  await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'fresa_topo_md');
  await page.selectOption('[data-testid="select-material-peca"]', 'Aço 1045');
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

  test('R03 — recálculo híbrido: nada antes do 1º Calcular, painel vivo depois dele', async ({ page }) => {
    // Reescrito em 16/08/2026 (SPEC §6.6, contrato §5.2). A versão anterior exigia
    // "recálculo só no clique" e reprovaria a implementação correta.
    const rpm = page.locator('[data-testid="resultado-rpm"]');
    const slider = page.locator('[data-testid="slider-vc"]');

    await preencherFresaTopo(page);

    // ── Antes do 1º Calcular: mexer no controle NÃO produz resultado ──────────
    const max = Number(await slider.getAttribute('max'));
    await slider.fill(String(Math.round(max * 0.6)));

    await expect(page.locator('[data-testid="valor-vc"]'), 'o valor do parâmetro atualiza na hora').not.toHaveText('');
    await expect(rpm, 'antes do 1º Calcular o painel fica no estado vazio').toHaveText('—');
    await expect(rpm, 'stale vai no próprio elemento, não num container acima').toHaveClass(/stale/);

    // ── 1º Calcular: o resultado aparece e deixa de ser velho ─────────────────
    await calcular(page);
    await expect(rpm).not.toHaveText('—');
    await expect(rpm).not.toHaveClass(/stale/);
    const rpmAncorado = await rpm.textContent();

    // ── Depois do 1º Calcular: recalcula sozinho, sem clique ─────────────────
    await slider.fill(String(Math.round(max * 0.9)));
    await expect(rpm, 'depois do 1º Calcular o painel é vivo').not.toHaveText(rpmAncorado!);
    await expect(rpm, 'terminado o recálculo o resultado não fica velho').not.toHaveClass(/stale/);

    // O botão nunca some nem desabilita: é reancoragem, não gatilho único
    await expect(page.locator('[data-testid="btn-calcular"]')).toBeEnabled();
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

  test('R06 — ajuda é gaveta inline: várias abertas ao mesmo tempo, fecha por Esc e pelo gatilho', async ({ page }) => {
    // Reescrito em 16/08/2026 (SPEC §8.1, contrato §6). Caíram "uma por vez" e
    // "fecha ao clicar fora": conteúdo que some ao tocar no slider some justamente
    // quando o operador quer ler. Permanecem o Esc e o fechar pelo próprio gatilho.
    const ajudaVc = page.locator('[data-testid="ajuda-vc"]');
    const ajudaAp = page.locator('[data-testid="ajuda-ap"]');
    const gavetaVc = page.locator('[data-testid="popover-vc"]');
    const gavetaAp = page.locator('[data-testid="popover-ap"]');

    await preencherFresaTopo(page);

    await ajudaVc.click();
    await expect(gavetaVc).toBeVisible();

    await ajudaAp.click();
    await expect(gavetaAp).toBeVisible();
    await expect(gavetaVc, 'abrir uma gaveta não pode fechar a outra').toBeVisible();

    // clicar fora não fecha — o slider é justamente onde o operador vai mexer lendo
    await page.locator('[data-testid="slider-vc"]').click();
    await expect(gavetaVc, 'clicar fora não fecha a gaveta').toBeVisible();
    await expect(gavetaAp, 'clicar fora não fecha a gaveta').toBeVisible();

    // o próprio gatilho fecha a sua, e só a sua
    await ajudaVc.click();
    await expect(gavetaVc).toBeHidden();
    await expect(ajudaVc).toHaveAttribute('aria-expanded', 'false');
    await expect(gavetaAp).toBeVisible();

    // Esc fecha a que está com o foco
    await ajudaAp.focus();
    await page.keyboard.press('Escape');
    await expect(gavetaAp).toBeHidden();
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

  test('R10 — os 6 campos mortos não aparecem em nenhuma das 33 entradas do catálogo', async ({ page }) => {
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
        // Ângulo só entra na conta nas brocas, onde define o Lp da ponta. No
        // escareador `computeDrilling` ignora, e na fresa de chanfrar
        // `computeMilling` lê `anguloPosicao` (κ), nunca `anguloBroca`.
        // o id do catálogo é `{geometria}_{substrato}` — a comparação é por geometria
        if (tipo.startsWith('escareador_') || tipo.startsWith('fresa_chanfrar_')) {
          await expect(page.locator('[data-testid="input-angulo-broca"]'), `ângulo visível em ${tipo}`).toBeHidden();
        }
      }
    }
  });

  // Teto revalidado em 16/08/2026 contra as 33 entradas: o máximo real é 6, na
  // fresa toroidal (D · r · Z · L · ap · ae) — nenhum campo dela é dispensável.
  // A saída do material da ferramenta deu folga ao formulário inteiro, mas ela
  // era do bloco categórico; o teto aqui conta só o bloco geométrico e segue em 6.
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

  test('R13 — família, operação e ângulo são escolha de 1 clique', async ({ page }) => {
    // O material da ferramenta saiu da tela (SPEC §3.2): sobraram 3 controles.
    // A broca em HSS é a equivalente da antiga `broca_hss` e é a que mantém dois
    // ângulos de ponta (118°/135°) — em metal duro há um só, e 1 opção vira texto
    // fixo sem seletor (TESTID_CONTRACT).
    await escolher(page, 'select-familia', 'furar');
    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'broca_helicoidal_hss');

    for (const testid of ['select-familia', 'select-operacao', 'input-angulo-broca']) {
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

  // ─── Slider de agressividade (SPEC §6.3, contrato §5.0) ───────────────────

  test('R18 — o slider de agressividade move os 4 parâmetros juntos sem furar limite', async ({ page }) => {
    await preencherFresaTopo(page);
    await calcular(page);

    const agressividade = page.locator('[data-testid="slider-agressividade"]');
    const valor = page.locator('[data-testid="valor-agressividade"]');
    await expect(agressividade).toBeVisible();
    await expect(valor, 'nasce num ponto declarado do vetor, não em "misto"').not.toHaveText(/misto/i);

    const partida: Record<string, number> = {};
    for (const p of PARAMETROS) partida[p] = Number(await page.locator(`[data-testid="slider-${p}"]`).inputValue());

    const min = (await agressividade.getAttribute('min')) ?? '0';
    const max = (await agressividade.getAttribute('max')) ?? '100';

    // extremo produtivo: os 4 sobem, nenhum passa do próprio teto
    await agressividade.fill(max);
    for (const p of PARAMETROS) {
      const el = page.locator(`[data-testid="slider-${p}"]`);
      const v = Number(await el.inputValue());
      expect(v, `${p} não acompanhou o slider de agressividade`).toBeGreaterThan(partida[p]);
      expect(v, `${p} foi empurrado além do próprio teto`).toBeLessThanOrEqual(Number(await el.getAttribute('max')));
    }

    // extremo conservador: os 4 descem, nenhum passa do próprio piso
    await agressividade.fill(min);
    for (const p of PARAMETROS) {
      const el = page.locator(`[data-testid="slider-${p}"]`);
      const v = Number(await el.inputValue());
      expect(v, `${p} não acompanhou o slider de agressividade`).toBeLessThan(partida[p]);
      expect(v, `${p} foi empurrado abaixo do próprio piso`).toBeGreaterThanOrEqual(Number(await el.getAttribute('min')));
    }

    // mexer num controle individual depois não devolve o slider ao lugar: vira misto
    const ap = page.locator('[data-testid="slider-ap"]');
    await ap.fill(String(Number(await ap.getAttribute('max'))));
    await expect(valor, 'com um parâmetro fora do vetor, exibir um percentual seria mentira na tela').toHaveText(/misto/i);

    // só existe onde existem os 4 parâmetros — ou seja, na família fresar
    await escolher(page, 'select-familia', 'furar');
    await expect(agressividade, 'sem os 4 parâmetros vira um slider de Vc com nome errado').toBeHidden();
  });

  // ─── Edição reversa dos números-herói (contrato §5.2.1 e §5.2.2) ──────────

  test('R19 — editar RPM e Avanço inverte a conta e trava no limite da máquina', async ({ page }) => {
    await preencherFresaTopo(page);
    await calcular(page);

    const rpm = page.locator('[data-testid="resultado-rpm"]');
    const avanco = page.locator('[data-testid="resultado-avanco"]');
    const rpmPartida = inteiro(await rpm.textContent());
    const avancoPartida = inteiro(await avanco.textContent());
    expect(rpmPartida, 'sem resultado de partida não há o que inverter').toBeGreaterThan(0);

    // RPM editado → Vc invertido; com fz e Z constantes, o avanço acompanha na mesma razão
    const rpmAlvo = Math.round(rpmPartida * 1.2);
    await page.fill('[data-testid="input-resultado-rpm"]', String(rpmAlvo));
    await page.locator('[data-testid="input-resultado-rpm"]').blur();

    expect(Math.abs(inteiro(await rpm.textContent()) - rpmAlvo), 'a rotação digitada tem que valer').toBeLessThanOrEqual(1);
    const avancoEsperado = avancoPartida * 1.2;
    const avancoObtido = inteiro(await avanco.textContent());
    expect(Math.abs(avancoObtido - avancoEsperado) / avancoEsperado,
      `avanço não acompanhou a rotação editada: ${avancoPartida} → ${avancoObtido}, esperado ~${Math.round(avancoEsperado)}`)
      .toBeLessThan(0.02);

    // Avanço editado → fz invertido; a rotação NÃO se mexe
    const rpmAntesDoAvanco = inteiro(await rpm.textContent());
    const avancoAlvo = Math.round(avancoObtido * 0.8);
    await page.fill('[data-testid="input-resultado-avanco"]', String(avancoAlvo));
    await page.locator('[data-testid="input-resultado-avanco"]').blur();

    expect(inteiro(await avanco.textContent()), 'o avanço digitado tem que valer').toBe(avancoAlvo);
    expect(inteiro(await rpm.textContent()), 'editar o avanço mexe em fz, não na rotação').toBe(rpmAntesDoAvanco);

    // limite físico: para no teto do perfil de máquina, não passa em silêncio
    const maxRPM = Number(await page.locator('[data-testid="input-maquina-rpm"]').inputValue());
    await page.fill('[data-testid="input-resultado-rpm"]', String(maxRPM * 10));
    await page.locator('[data-testid="input-resultado-rpm"]').blur();
    expect(inteiro(await rpm.textContent()), `rotação passou de maxRPM (${maxRPM}) sem override`).toBeLessThanOrEqual(maxRPM);
  });

  // ─── Modo Rápido (SPEC §9.3) ──────────────────────────────────────────────

  test('R20 — Modo Rápido pede Z, e o avanço acompanha o número de arestas', async ({ page }) => {
    // Hoje o Modo Rápido assume Z=4: com uma fresa de 2 cortes o avanço sai o
    // dobro do correto. Vf = fz × Z × n — Z é fator direto, não conveniência.
    await page.click('[data-testid="toggle-modo-rapido"]');
    await page.selectOption('[data-testid="select-material-peca"]', 'Aço 1045');
    await escolher(page, 'select-operacao', 'desbaste');
    await page.fill('[data-testid="input-diametro"]', '10');

    await expect(page.locator('[data-testid="input-arestas"]'), 'Z é um dos 4 campos do Modo Rápido').toBeVisible();

    await page.fill('[data-testid="input-arestas"]', '2');
    await calcular(page);
    const rpmZ2 = inteiro(await page.locator('[data-testid="resultado-rpm"]').textContent());
    const avancoZ2 = inteiro(await page.locator('[data-testid="resultado-avanco"]').textContent());
    expect(avancoZ2, 'sem avanço não há o que comparar').toBeGreaterThan(0);

    await page.fill('[data-testid="input-arestas"]', '4');
    await calcular(page);
    const rpmZ4 = inteiro(await page.locator('[data-testid="resultado-rpm"]').textContent());
    const avancoZ4 = inteiro(await page.locator('[data-testid="resultado-avanco"]').textContent());

    expect(rpmZ4, 'Z não entra na rotação').toBe(rpmZ2);
    expect(avancoZ4 / avancoZ2, `dobrar Z tem que dobrar o avanço: ${avancoZ2} → ${avancoZ4}`).toBeCloseTo(2, 1);
  });

  // ─── Catálogo com substrato no nome (SPEC §3.2) ───────────────────────────

  test('R21 — o substrato da ferramenta escolhida aparece no resumo do resultado', async ({ page }) => {
    // O substrato saiu do formulário; se ele também não aparecer na leitura, o
    // operador perde a informação que decide o Vc.
    const resumo = page.locator('[data-testid="resumo-ferramenta"]');

    await preencherFresaTopo(page);
    await calcular(page);
    await expect(resumo).toContainText('MD');
    const comMD = (await resumo.textContent())!.trim();

    await page.selectOption('[data-testid="select-tipo-ferramenta"]', 'fresa_topo_hss');
    await calcular(page);
    await expect(resumo).toContainText('HSS');
    expect((await resumo.textContent())!.trim(), 'o resumo não distingue os substratos da mesma geometria').not.toBe(comMD);
  });

});
