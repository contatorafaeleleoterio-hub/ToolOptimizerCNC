/**
 * Auditoria da paleta — duas verificações, ambas contra o CSS de verdade.
 *
 * 1. **Contraste.** Régua WCAG 2.1 AA: 4,5:1 para texto normal, 3:1 para componente, borda
 *    funcional e elemento gráfico portador de informação. Cada token é medido contra a **pior**
 *    superfície em que aparece.
 * 2. **Sincronia com o design system.** O bloco `:root` da §3 do `DESIGN_SYSTEM_FENIX.md` é uma
 *    cópia deste CSS. A cópia é útil, mas foi ela que passou semanas descrevendo uma paleta que o
 *    produto não usava — então aqui ela é conferida token a token.
 *
 * Existe porque contraste e paleta afirmados em documento envelhecem em silêncio. Aqui o número é
 * medido no momento de rodar.
 *
 * Rodar: node Docs_inicial/construcao/prototipo/testes/test_contraste.js
 */

const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, '../css/prototipo.css'), 'utf-8');

/**
 * Tabela de tokens, com aliases resolvidos: um token pode apontar para outro
 * (`--st-info-bg: var(--surface-card-subtle)`), e a auditoria precisa do hex final.
 */
const T = (() => {
  const cru = Object.fromEntries(
    [...css.matchAll(/(--[\w-]+):\s*(#[0-9A-Fa-f]{6}|var\(--[\w-]+\));/g)].map((m) => [m[1], m[2]])
  );
  const resolve = (valor, saltos = 0) => {
    if (saltos > 10) throw new Error(`Alias circular em ${valor}`);
    const alias = valor.match(/^var\((--[\w-]+)\)$/);
    if (!alias) return valor;
    const destino = cru[alias[1]];
    if (!destino) throw new Error(`${valor} aponta para um token que não existe`);
    return resolve(destino, saltos + 1);
  };
  return Object.fromEntries(Object.entries(cru).map(([k, v]) => [k, resolve(v)]));
})();

function luminancia(hex) {
  const canais = hex
    .replace('#', '')
    .match(/../g)
    .map((x) => parseInt(x, 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * canais[0] + 0.7152 * canais[1] + 0.0722 * canais[2];
}

function razao(a, b) {
  const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (escuro + 0.05);
}

const fmt = (n) => n.toFixed(2).replace('.', ',');

/** As três superfícies que hospedam texto e controle. A pior delas é a que vale. */
const SUPERFICIES = ['--surface-card', '--bg-page', '--surface-card-subtle'].map((k) => T[k]);

const SOBRE_SUPERFICIE = [
  ['--tx-1', 4.5, 'número, título, valor'],
  ['--tx-2', 4.5, 'corpo, rótulo'],
  ['--tx-3', 4.5, 'unidade, legenda'],
  ['--border-control', 3.0, 'borda de controle interativo'],
  ['--select-ink', 3.0, 'seleção e foco'],
  ['--st-normal-accent', 3.0, 'faixa de estado normal'],
  ['--st-warn-accent', 3.0, 'faixa de estado atenção'],
  ['--st-crit-accent', 3.0, 'faixa de estado crítico'],
  ['--st-info-accent', 3.0, 'faixa de informação'],
  // Usado como TEXTO em botão pequeno e como borda de cartão em edição manual.
  ['--accent-blue', 4.5, 'texto de apoio e borda de edição manual'],
];

/** Tinta de estado sobre o próprio fundo de estado, além das três superfícies. */
const INK_DE_ESTADO = [
  ['--st-normal-ink', '--st-normal-bg'],
  ['--st-warn-ink', '--st-warn-bg'],
  ['--st-crit-ink', '--st-crit-bg'],
  ['--st-info-ink', '--st-info-bg'],
];

/** Tinta sobre superfície preenchida — marca, ação e aba ativa. */
const SOBRE_PREENCHIMENTO = [
  ['--tx-on-brand', '--brand-fill', 4.5],
  ['--tx-on-brand', '--brand-hover', 4.5],
  ['--tx-on-brand', '--action-fill', 4.5],
  ['--tx-on-brand', '--action-hover', 4.5],
  ['--tx-on-brand', '--action-active', 4.5],
  ['--nav-active-tx', '--nav-active-bg', 4.5],
  // O acento da marca só existe sobre o preenchimento da marca — é lá que ele tem de passar.
  ['--brand-accent', '--brand-fill', 3.0],
];

let falhas = 0;

/** Um token citado aqui e ausente do CSS é falha de auditoria, não exceção. */
function cor(token) {
  if (!(token in T)) {
    falhas++;
    console.log(`  [FALHA] ${token} é aferido aqui e não existe mais no CSS`);
    return null;
  }
  return T[token];
}

function afere(rotulo, medido, minimo) {
  if (medido === null) return;
  const passou = medido >= minimo;
  if (!passou) falhas++;
  const marca = passou ? '  [PASS]' : '  [FALHA]';
  console.log(`${marca} ${fmt(medido).padStart(6)}:1  (mínimo ${minimo})  ${rotulo}`);
}

console.log('\nAuditoria de contraste — paleta do protótipo\n');

for (const [token, minimo, uso] of SOBRE_SUPERFICIE) {
  const c = cor(token);
  const pior = c === null ? null : Math.min(...SUPERFICIES.map((s) => razao(c, s)));
  afere(`${token} sobre a pior superfície — ${uso}`, pior, minimo);
}

for (const [ink, bg] of INK_DE_ESTADO) {
  const c = cor(ink);
  const fundo = cor(bg);
  const pior = c === null || fundo === null ? null : Math.min(...[fundo, ...SUPERFICIES].map((s) => razao(c, s)));
  afere(`${ink} sobre o próprio fundo e as superfícies`, pior, 4.5);
}

for (const [tinta, fundo, minimo] of SOBRE_PREENCHIMENTO) {
  const a = cor(tinta);
  const b = cor(fundo);
  afere(`${tinta} sobre ${fundo}`, a === null || b === null ? null : razao(a, b), minimo);
}

// ---------------------------------------------------------------------------
// 2. Sincronia entre o CSS e o bloco `:root` da §3 do design system
// ---------------------------------------------------------------------------

console.log('\nSincronia com DESIGN_SYSTEM_FENIX.md §3\n');

const DS = path.join(__dirname, '../../DESIGN_SYSTEM_FENIX.md');
const doc = fs.readFileSync(DS, 'utf-8');
const blocoDoc = doc.slice(doc.indexOf('## 3. Bloco pronto'), doc.indexOf('## 4. Primitivos'));
const noDoc = Object.fromEntries(
  [...blocoDoc.matchAll(/(--[\w-]+):\s*([^;\n]+);/g)].map((m) => [m[1], m[2].trim()])
);

const noCss = Object.fromEntries(
  [...css.slice(css.indexOf(':root {'), css.indexOf('\n}')).matchAll(/(--[\w-]+):\s*([^;\n]+);/g)]
    .map((m) => [m[1], m[2].trim()])
);

const tokens = new Set([...Object.keys(noCss), ...Object.keys(noDoc)]);
let divergentes = 0;
for (const t of [...tokens].sort()) {
  if (noCss[t] === noDoc[t]) continue;
  divergentes++;
  falhas++;
  if (!(t in noDoc)) console.log(`  [FALHA] ${t} existe no CSS e falta na §3`);
  else if (!(t in noCss)) console.log(`  [FALHA] ${t} existe na §3 e falta no CSS`);
  else console.log(`  [FALHA] ${t} — CSS "${noCss[t]}" · §3 "${noDoc[t]}"`);
}
if (divergentes === 0) {
  console.log(`  [PASS] os ${tokens.size} tokens da §3 batem com o CSS`);
}

console.log('');
if (falhas === 0) {
  console.log('====================================================');
  console.log('PALETA APROVADA: CONTRASTE E SINCRONIA EM DIA!');
  console.log('====================================================');
} else {
  console.error(`${falhas} VERIFICAÇÃO(ÕES) FALHARAM.`);
  process.exitCode = 1;
}
