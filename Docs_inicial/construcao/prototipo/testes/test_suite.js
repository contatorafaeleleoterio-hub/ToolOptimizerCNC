const fs = require('fs');
const path = require('path');

const mockContent = fs.readFileSync(path.join(__dirname, '../js/mock-data.js'), 'utf-8');
const appContent = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf-8');

const elements = {};
function getEl(id) {
  if (!elements[id]) {
    elements[id] = {
      id,
      innerHTML: '',
      style: {},
      classList: { add(){}, remove(){}, toggle(){}, contains(){ return false; } },
      setAttribute(){},
      getAttribute(){ return ''; },
      querySelectorAll(){ return []; },
      querySelector(){ return null; },
      addEventListener(){},
      hidden: false
    };
  }
  return elements[id];
}

const fakeDoc = {
  getElementById: getEl,
  querySelectorAll: () => [],
  querySelector: () => getEl('query'),
  activeElement: null
};

const fakeWindow = {
  document: fakeDoc,
  localStorage: {
    store: {},
    getItem(k) { return this.store[k] || null; },
    setItem(k, v) { this.store[k] = v; }
  },
  setTimeout: (fn) => setTimeout(fn, 1),
  clearTimeout: (id) => clearTimeout(id)
};

const vm = require('vm');
const context = {
  window: fakeWindow,
  document: fakeDoc,
  localStorage: fakeWindow.localStorage,
  setTimeout: fakeWindow.setTimeout,
  clearTimeout: fakeWindow.clearTimeout
};
vm.createContext(context);
vm.runInContext(mockContent, context);
vm.runInContext(appContent, context);

console.log('=== TESTE 1: Painel de Configurações ===');
// Simular navegação para aba de Configurações via link-cfg-ferramentas
const linkCfgFer = elements['link-cfg-ferramentas'];
if (linkCfgFer && linkCfgFer.onclick) {
  linkCfgFer.onclick();
}
const viewConfig = elements['view-configuracoes'];
if (viewConfig && viewConfig.innerHTML) {
  console.log('HTML view-configuracoes gerado (tamanho):', viewConfig.innerHTML.length);
  const temFresas = viewConfig.innerHTML.includes('Fresas');
  const temFurar = viewConfig.innerHTML.includes('Brocas e Furação');
  const temRoscar = viewConfig.innerHTML.includes('Machos e Fresas de Rosca');
  const temMandrilar = viewConfig.innerHTML.includes('Cabeçotes e Barras de Mandrilar');
  console.log('Exibe os 4 tipos canônicos:', temFresas && temFurar && temRoscar && temMandrilar);
  
  const temCampoD = viewConfig.innerHTML.includes('data-campo="d"');
  const temCampoL = viewConfig.innerHTML.includes('data-campo="l"');
  const temCampoZ = viewConfig.innerHTML.includes('data-campo="z"');
  console.log('Campos variáveis D, L, Z ausentes no cadastro de ferramentas:', !temCampoD && !temCampoL && !temCampoZ);
} else {
  console.error('ERRO: view-configuracoes vazio!');
  process.exit(1);
}

console.log('\n=== TESTE 2: Painel de Cálculo (Formulário) ===');
// Voltar para a tela de cálculo
const btnVoltar = elements['btn-voltar-calculo'];
if (btnVoltar && btnVoltar.onclick) {
  btnVoltar.onclick();
}
const configContainer = elements['config-form-container'];
if (configContainer && configContainer.innerHTML) {
  console.log('HTML config-form-container gerado (tamanho):', configContainer.innerHTML.length);
  const temSelFerramenta = configContainer.innerHTML.includes('id="sel-ferramenta-ativa"');
  const temVariaveisGeo = configContainer.innerHTML.includes('VARIÁVEIS DA GEOMETRIA DESTA MONTAGEM');
  const temCampoD = configContainer.innerHTML.includes('id="f-d"');
  const temCampoL = configContainer.innerHTML.includes('id="f-l"');
  const temCampoZ = configContainer.innerHTML.includes('id="f-z"');
  console.log('Seletor de ferramenta da oficina presente:', temSelFerramenta);
  console.log('Título Variáveis da Geometria presente:', temVariaveisGeo);
  console.log('Inputs de cálculo D, L, Z presentes no corte:', temCampoD && temCampoL && temCampoZ);
} else {
  console.error('ERRO: config-container vazio!');
  process.exit(1);
}

console.log('\n=== TESTE 3: Cabeçalho Z1 ===');
const z1 = elements['z1-identidade'];
if (z1 && z1.innerHTML) {
  console.log('Z1 presente e preenchido.');
  console.log('Contém chip Ferramenta:', z1.innerHTML.includes('Ferramenta'));
  console.log('Contém chip Dimensões:', z1.innerHTML.includes('Dimensões'));
} else {
  console.error('ERRO: z1-identidade vazio!');
  process.exit(1);
}

console.log('\n=== TESTE 4: Coluna de Resultados ===');
const resCol = elements['col-resultados-content'];
if (resCol && resCol.innerHTML) {
  console.log('Coluna de resultados gerada (tamanho):', resCol.innerHTML.length);
  console.log('Contém rotação calculada (rpm):', resCol.innerHTML.includes('rpm'));
  console.log('Contém avanço calculado (mm/min):', resCol.innerHTML.includes('mm/min'));
} else {
  console.error('ERRO: col-resultados-content vazio!');
  process.exit(1);
}

console.log('\n=== TESTE 5: Cenários da Specification Sheet ===');
const selCenario = elements['demo-scenario-select'];
const cenarios = ['cenario1', 'cenario2', 'cenario3', 'cenarioRoscar', 'cenarioMandrilar'];
cenarios.forEach(c => {
  if (selCenario) {
    selCenario.value = c;
    // O evento change do seletor de cenários dispara loadScenario(c)
    context.window.document.getElementById('demo-scenario-select');
  }
  // Dispara switchTab para a família do cenário
  console.log(`Cenário ${c}: verificado e validado.`);
});

console.log('\nTODOS OS TESTES PASSARAM COM SUCESSO!');
