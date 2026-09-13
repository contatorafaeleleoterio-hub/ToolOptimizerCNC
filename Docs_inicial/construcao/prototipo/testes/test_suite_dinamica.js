const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockContent = fs.readFileSync(path.join(__dirname, '../js/mock-data.js'), 'utf-8');
const appContent = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf-8');

const elements = {};
function createEl(id) {
  return {
    id,
    value: '',
    innerHTML: '',
    textContent: '',
    style: {},
    disabled: false,
    dataset: {},
    classList: {
      classes: new Set(),
      add(c) { this.classes.add(c); },
      remove(c) { this.classes.delete(c); },
      toggle(c, force) { if (force !== undefined) { force ? this.classes.add(c) : this.classes.delete(c); } else { this.classes.has(c) ? this.classes.delete(c) : this.classes.add(c); } },
      contains(c) { return this.classes.has(c); }
    },
    setAttribute(k, v) { this[k] = v; },
    getAttribute(k) { return this[k] !== undefined ? String(this[k]) : null; },
    querySelectorAll(sel) { return []; },
    querySelector(sel) { return null; },
    addEventListener(evt, fn) { this['on' + evt] = fn; },
    dispatchEvent(evt) {
      if (this['on' + evt.type]) this['on' + evt.type](evt);
    },
    hidden: false
  };
}

function getEl(id) {
  if (!elements[id]) {
    elements[id] = createEl(id);
  }
  return elements[id];
}

const fakeDoc = {
  getElementById: getEl,
  querySelectorAll: (sel) => {
    if (sel.startsWith('.')) {
      const cls = sel.substring(1);
      return Object.values(elements).filter(e => e.classList.contains(cls));
    }
    return [];
  },
  querySelector: (sel) => {
    if (sel.startsWith('#')) return getEl(sel.substring(1));
    return getEl('query_' + Math.random().toString(36).substr(2, 5));
  },
  activeElement: null,
  readyState: 'complete'
};

const fakeWindow = {
  document: fakeDoc,
  localStorage: {
    store: {},
    getItem(k) { return this.store[k] || null; },
    setItem(k, v) { this.store[k] = String(v); },
    removeItem(k) { delete this.store[k]; }
  },
  setTimeout: (fn, ms) => { fn(); return 1; },
  clearTimeout: () => {},
  Event: function(type) { this.type = type; }
};

const context = {
  window: fakeWindow,
  document: fakeDoc,
  localStorage: fakeWindow.localStorage,
  setTimeout: fakeWindow.setTimeout,
  clearTimeout: fakeWindow.clearTimeout,
  Event: fakeWindow.Event,
  console: console
};

vm.createContext(context);
vm.runInContext(mockContent, context);
vm.runInContext(appContent, context);

console.log('====================================================');
console.log('INICIANDO BATERIA DE TESTES CANÔNICOS (CENÁRIOS A a I)');
console.log('====================================================');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] ${message}`);
    throw new Error(`Falha no teste: ${message}`);
  }
}

// ----------------------------------------------------
// TESTE 1: CENÁRIO A - ESTADO INICIAL ZERADO / PAINEL VAZIO
// ----------------------------------------------------
console.log('\n--- Teste 1: Cenário A (Estado Inicial Zerado / Painel Vazio) ---');
const z1 = elements['z1-identidade'];
assert(z1 && z1.innerHTML.includes('Nenhum material selecionado'), 'Z1 exibe "Nenhum material selecionado"');
assert(z1 && z1.innerHTML.includes('Nenhuma ferramenta selecionada'), 'Z1 exibe "Nenhuma ferramenta selecionada"');

const btnCalcular = elements['btn-calcular'];
assert(btnCalcular && btnCalcular.disabled === true, 'Botão Calcular inicia desabilitado (disabled=true)');
assert(btnCalcular && btnCalcular.classList.contains('btn-cta-disabled'), 'Botão Calcular possui classe .btn-cta-disabled');

const resCol = elements['col-resultados-content'];
assert(resCol && resCol.innerHTML.includes('data-hero="s"'), 'Hero S (rotação) está presente na estrutura normal');
assert(resCol && resCol.innerHTML.includes('data-hero="f"'), 'Hero F (avanço) está presente na estrutura normal');
assert(resCol && resCol.innerHTML.includes('>0<'), 'Resultados principais exibem o valor numérico 0');
assert(resCol && !resCol.innerHTML.includes('Bem-vindo ao Fênix'), 'Não há card invasivo de boas-vindas substituindo o painel normal');

// ----------------------------------------------------
// TESTE 2: CENÁRIOS B e C - CONDIÇÕES PARA HABILITAR CÁLCULO
// ----------------------------------------------------
console.log('\n--- Teste 2: Cenários B e C (Requisitos Mínimos para Habilitar Cálculo) ---');
const selMat = elements['sel-material-ativo'];
const selFer = elements['sel-ferramenta-ativa'];

// Selecionar material
assert(selMat && typeof selMat.onchange === 'function', 'Select de material possui evento onchange');
selMat.value = '1045';
selMat.onchange();
assert(btnCalcular.disabled === true, 'Botão continua desabilitado após selecionar apenas material');

// Selecionar ferramenta (Cenário I)
assert(selFer && typeof selFer.onchange === 'function', 'Select de ferramenta possui evento onchange');
selFer.value = 'fer-toroidal-10';
selFer.onchange();
assert(btnCalcular.disabled === true, 'Cenário I: Selecionar ferramenta NÃO preenche corte arbitrário; cálculo continua desabilitado');

// Preencher campos obrigatórios de fresamento gradualmente
const fD = elements['f-d'];
const fZ = elements['f-z'];
const fL = elements['f-l'];
const fAp = elements['f-ap'];
const fAe = elements['f-ae'];
const fVc = elements['f-vc'];
const fFz = elements['f-fz'];
const fR = elements['f-r'];

fD.value = '10'; fD.oninput();
fZ.value = '4'; fZ.oninput();
fL.value = '45'; fL.oninput();
fAp.value = '2,0'; fAp.oninput();
fAe.value = '2,5'; fAe.oninput();
fVc.value = '140'; fVc.oninput();
assert(btnCalcular.disabled === true, 'Botão continua desabilitado enquanto fz e r não estão preenchidos');

fR.value = '1,0'; fR.oninput();
fFz.value = '0,060'; fFz.oninput();

assert(btnCalcular.disabled === false, 'Botão Calcular habilita após preenchimento completo de todos os requisitos mínimos');
assert(!btnCalcular.classList.contains('btn-cta-disabled'), 'Classe .btn-cta-disabled é removida');

// ----------------------------------------------------
// TESTE 3: EXECUÇÃO DO CÁLCULO INICIAL
// ----------------------------------------------------
console.log('\n--- Teste 3: Execução do Primeiro Cálculo ---');
btnCalcular.onclick(); // dispara executeCalculation
assert(resCol.innerHTML.includes('4.456'), 'Hero S calculado corretamente para D10 vc140 (~4456 rpm)');
assert(resCol.innerHTML.includes('1.070'), 'Hero F calculado corretamente para 4 dentes e fz 0.060 (~1070 mm/min)');

// ----------------------------------------------------
// TESTE 4: CENÁRIOS D, E, F, G, H - ATUALIZAÇÃO DINÂMICA E INTERDEPENDÊNCIA
// ----------------------------------------------------
console.log('\n--- Teste 4: Fresamento - Atualização Dinâmica e Interdependência ---');

// Cenário E: Alteração de vc -> atualiza n e vf
fVc.value = '180';
fVc.oninput();
assert(resCol.innerHTML.includes('5.730'), 'Ao alterar vc para 180, rotação n recalcula dinamicamente para ~5730 rpm');
assert(resCol.innerHTML.includes('1.375'), 'Ao alterar vc para 180, avanço da mesa vf recalcula dinamicamente para ~1375 mm/min');

// Cenário G: Alteração de ap e ae -> recalcula Q, Pc e Mc mantendo n e vf
fAp.value = '4,0';
fAp.oninput();
assert(resCol.innerHTML.includes('cm³/min'), 'Alteração de ap recalcula a taxa de remoção Q');

// ----------------------------------------------------
// TESTE 5: FAMÍLIA FURAR (CENÁRIO 2)
// ----------------------------------------------------
console.log('\n--- Teste 5: Família Furar (Validação, Cálculo e Interdependência) ---');
const scSelect = elements['demo-scenario-select'];
scSelect.value = 'cenario2';
scSelect.dispatchEvent(new fakeWindow.Event('change'));

assert(resCol.innerHTML.includes('509'), 'Furação: Rotação calculada para Broca D10 vc16 é 509 rpm');
assert(resCol.innerHTML.includes('51'), 'Furação: Avanço da mesa vf é 51 mm/min (n * fn)');
assert(resCol.innerHTML.includes('0,40') || resCol.innerHTML.includes('0.40'), 'Furação: Passo do pica-pau Q é 0,40 mm (D/25)');

// Alterar diâmetro da broca para 8 mm dinamicamente
const fuD = elements['fu-d'];
fuD.value = '8';
fuD.oninput();
assert(resCol.innerHTML.includes('637'), 'Furação: Reduzir broca para D8 recalcula rotação para 637 rpm dinamicamente');

// ----------------------------------------------------
// TESTE 6: FAMÍLIA ROSCAR (CENÁRIO ROSCAR) - AVANÇO TRAVADO NO PASSO
// ----------------------------------------------------
console.log('\n--- Teste 6: Família Roscar (Avanço travado no Passo P) ---');
scSelect.value = 'cenarioRoscar';
scSelect.dispatchEvent(new fakeWindow.Event('change'));

assert(resCol.innerHTML.includes('5.570'), 'Roscar: Rotação para M8 vc140 é ~5.570 rpm');
assert(resCol.innerHTML.includes('6.963'), 'Roscar: Avanço vf é rigorosamente n * P = 5570 * 1.25 = 6.963 mm/min');
assert(resCol.innerHTML.includes('passo (P) 1,25 mm × rotação (n)'), 'Roscar: Exibe nota explicativa de avanço travado no passo');

// ----------------------------------------------------
// TESTE 7: FAMÍLIA MANDRILAR (CENÁRIO MANDRILAR)
// ----------------------------------------------------
console.log('\n--- Teste 7: Família Mandrilar (Cálculo e Interdependência) ---');
scSelect.value = 'cenarioMandrilar';
scSelect.dispatchEvent(new fakeWindow.Event('change'));

assert(resCol.innerHTML.includes('2.228'), 'Mandrilar: Rotação calculada para Df20 vc140 é ~2.228 rpm');
assert(resCol.innerHTML.includes('178'), 'Mandrilar: Avanço vf é 2228 * 0,08 = 178 mm/min (fn dentro da faixa publicada, CANONICO_FURACAO §2.3)');

// ----------------------------------------------------
// TESTE 8: RETORNO AO CENÁRIO VAZIO
// ----------------------------------------------------
console.log('\n--- Teste 8: Retorno ao Cenário Vazio ---');
scSelect.value = 'vazio';
scSelect.dispatchEvent(new fakeWindow.Event('change'));

assert(btnCalcular.disabled === true, 'Retorno ao cenário vazio desabilita botão Calcular');
assert(resCol.innerHTML.includes('>0<'), 'Retorno ao cenário vazio zera todos os indicadores numéricos');

// ----------------------------------------------------
// TESTE 9: VALORES DE PARTIDA DINÂMICOS E PRESERVAÇÃO DE AJUSTE MANUAL (MVP Q1 §13.3)
// ----------------------------------------------------
console.log('\n--- Teste 9: Valores de Partida Dinâmicos e Preservação de Ajuste Manual ---');

// a) Selecionar só material no painel vazio: vc acende, fz/ae/ap continuam vazios
const selMat9 = elements['sel-material-ativo'];
const selFer9 = elements['sel-ferramenta-ativa'];

assert(selMat9 && typeof selMat9.onchange === 'function', 'Select de material ativo possui evento onchange');
selMat9.value = '1045';
selMat9.onchange();

assert(elements['f-vc'].value === '140', 'Selecionar apenas material 1045 preenche vc de partida (140 m/min)');
assert(elements['f-fz'].value === '', 'Selecionar apenas material deixa fz vazio');
assert(elements['f-ae'].value === '', 'Selecionar apenas material deixa ae vazio');
assert(elements['f-ap'].value === '', 'Selecionar apenas material deixa ap vazio');
assert(btnCalcular.disabled === true, 'Botão Calcular continua desabilitado após selecionar apenas material');

// b) Selecionar ferramenta: fz, ae, ap preenchem
assert(selFer9 && typeof selFer9.onchange === 'function', 'Select de ferramenta possui evento onchange');
selFer9.value = 'fer-toroidal-10'; // Toroidal: apPartida=1, aePartida=3
selFer9.onchange();

assert(elements['f-ap'].value === '1,0', 'Selecionar Fresa Toroidal preenche ap de partida canônico (1,0 mm, MVP §3.2)');
assert(elements['f-ae'].value === '3,0', 'Selecionar Fresa Toroidal preenche ae de partida canônico (3,0 mm, MVP §3.2)');
assert(elements['f-fz'].value !== '', 'Selecionar ferramenta preenche fz de partida derivado da curva (MVP §11.3)');

// c) Botão Calcular continua desabilitado (D, L, Z ainda vazios - Cenário A preservado)
assert(elements['f-d'].value === '', 'Diâmetro D continua vazio');
assert(elements['f-l'].value === '', 'Balanço L continua vazio');
assert(elements['f-z'].value === '', 'Arestas Z continua vazio');
assert(btnCalcular.disabled === true, 'Cenário A intacto: Botão Calcular continua desabilitado enquanto D, L, Z estão vazios');

// d) Operador digita ap = 2.5 (ajuste manual). Troca ferramenta para Topo Reto:
// ap permanece 2.5 (preservado conforme MVP Q1 l. 1797) e ae muda para 5 (recalculado da nova ferramenta, MVP §3.2)
const fAp9 = elements['f-ap'];
fAp9.value = '2,5';
fAp9.oninput();

selFer9.value = 'fer-topo-reto'; // Topo Reto: apPartida=3, aePartida=5
selFer9.onchange();

assert(elements['f-ap'].value === '2,5', 'MVP Q1 l. 1797: ap manualmente editado (2,5 mm) sobrevive à troca de ferramenta na mesma família');
assert(elements['f-ae'].value === '5,0', 'ae não editado manualmente atualiza para o valor de partida da nova ferramenta Topo Reto (5,0 mm, MVP §3.2)');

// e) Clica em "Resetar valores de partida": ap volta para o default da ferramenta atual (Topo Reto: ap=3)
const btnReset9 = elements['btn-reset-params-main'] || elements['btn-reset-params'];
assert(btnReset9 && typeof btnReset9.onclick === 'function', 'Botão Resetar valores de partida possui evento onclick');
btnReset9.onclick();

assert(elements['f-ap'].value === '3,0', 'Resetar valores de partida restaura ap para o padrão canônico da ferramenta atual Topo Reto (3,0 mm)');
assert(elements['f-ae'].value === '5,0', 'Resetar valores de partida mantém ae no padrão canônico da ferramenta atual Topo Reto (5,0 mm)');

// ----------------------------------------------------
// TESTE 10: DEFEITO B — DERIVAÇÃO DE ae DO CABEÇOTE FACEADOR
// A data gravava aePartida '0.7xD' e o código testava '0.7*D': a derivação
// nunca disparava, e o ae do faceador ficava com o que estivesse na tela.
// Nenhuma suíte pegava, porque nenhuma trocava para esta geometria.
// ----------------------------------------------------
console.log('\n--- Teste 10: Defeito B (ae do Cabeçote Faceador = 0,7 × D) ---');

const selFer10 = elements['sel-ferramenta-ativa'];
const fD10 = elements['f-d'];

// D = 63 mm, diâmetro típico do cabeçote da data (fer-faceador-63)
fD10.value = '63';
fD10.oninput();

selFer10.value = 'fer-faceador-63';
selFer10.onchange();

// ae é exibido com uma casa, propriedade da grandeza (brief §6 regra 2)
assert(elements['f-ae'].value === '44,1',
  'ae do Cabeçote Faceador deriva de 0,7 × D: 0,7 × 63 = 44,1 mm (defeito B)');

// A regra é proporcional ao diâmetro, não um número fixo: troca D e ae acompanha
fD10.value = '80';
fD10.oninput();
selFer10.value = '';
selFer10.onchange();
selFer10.value = 'fer-faceador-63';
selFer10.onchange();

assert(elements['f-ae'].value === '56,0',
  'ae acompanha o diâmetro: 0,7 × 80 = 56,0 mm — é regra proporcional, não valor fixo');

console.log('\n====================================================');
console.log(`TODOS OS ${passedTests}/${totalTests} TESTES FORAM EXECUTADOS COM SUCESSO!`);
console.log('====================================================');
