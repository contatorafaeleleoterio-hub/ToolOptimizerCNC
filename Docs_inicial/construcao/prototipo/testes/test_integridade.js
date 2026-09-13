/*
 * Guarda de integridade do protótipo.
 *
 * Por que existe: o defeito A da especificação estrutural era `markOutdated()`
 * chamada em dois pontos de `js/app.js` e definida em nenhum. Um `ReferenceError`
 * que quebrava a área Configurações em uso real, invisível para as três suítes
 * porque nenhuma delas alcançava aquele caminho — e o caminho não é alcançável
 * pelo DOM falso, porque o handler nasce de `innerHTML`.
 *
 * O que este arquivo faz: análise estática. Coleta tudo que `app.js` declara
 * (funções, const/let/var, parâmetros) e tudo que ele chama, e cobra que todo
 * nome chamado exista. Pega a classe inteira do defeito, não só aquela função.
 *
 * Roda com `node <caminho>` a partir de qualquer lugar.
 */
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf-8');

let passed = 0, total = 0;
function assert(cond, msg) {
  total++;
  if (cond) { console.log(`  [PASS] ${msg}`); passed++; }
  else { console.error(`  [FAIL] ${msg}`); throw new Error(`Falha: ${msg}`); }
}

// Reduz o arquivo ao que é código de verdade. Regex não dá conta: uma aspa
// dentro de template, um `\\B(` de regex literal ou um apóstrofo em prosa
// portuguesa dessincronizam a varredura e produzem falso positivo. Então um
// scanner de um passo, que sabe em que estado está.
function apenasCodigo(texto) {
  const fora = [];        // código
  const interpolacoes = []; // ${...} dos templates, que é código também
  let i = 0;
  const n = texto.length;

  // Decide se um `/` abre regex ou é divisão, olhando o último token útil
  function abreRegex() {
    for (let k = fora.length - 1; k >= 0; k--) {
      const c = fora[k];
      if (/\s/.test(c)) continue;
      return !/[\w$)\]]/.test(c);
    }
    return true;
  }

  while (i < n) {
    const c = texto[i];

    if (c === '/' && texto[i + 1] === '/') {            // linha de comentário
      while (i < n && texto[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && texto[i + 1] === '*') {            // bloco de comentário
      i += 2;
      while (i < n && !(texto[i] === '*' && texto[i + 1] === '/')) i++;
      i += 2;
      fora.push(' ');
      continue;
    }
    if (c === '/' && abreRegex()) {                     // regex literal
      i++;
      let classe = false;
      while (i < n) {
        if (texto[i] === '\\') { i += 2; continue; }
        if (texto[i] === '[') classe = true;
        else if (texto[i] === ']') classe = false;
        else if (texto[i] === '/' && !classe) { i++; break; }
        else if (texto[i] === '\n') break;
        i++;
      }
      while (i < n && /[gimsuyd]/.test(texto[i])) i++;  // flags
      fora.push(' ');
      continue;
    }
    if (c === "'" || c === '"') {                       // string
      const q = c; i++;
      while (i < n) {
        if (texto[i] === '\\') { i += 2; continue; }
        if (texto[i] === q) { i++; break; }
        if (texto[i] === '\n') break;
        i++;
      }
      fora.push(' ');
      continue;
    }
    if (c === '`') {                                    // template
      i++;
      let prof = 0;
      let buf = '';
      while (i < n) {
        if (texto[i] === '\\') { i += 2; continue; }
        if (prof === 0 && texto[i] === '`') { i++; break; }
        if (prof === 0 && texto[i] === '$' && texto[i + 1] === '{') {
          prof = 1; i += 2; buf = '';
          while (i < n && prof > 0) {
            if (texto[i] === '{') prof++;
            else if (texto[i] === '}') { prof--; if (prof === 0) { i++; break; } }
            buf += texto[i]; i++;
          }
          interpolacoes.push(buf);
          continue;
        }
        i++;
      }
      fora.push(' ');
      continue;
    }
    fora.push(c);
    i++;
  }

  // A interpolação é código, então passa pelo mesmo moedor — recursivo, e para
  // sozinho porque cada volta é estritamente menor.
  const dentro = interpolacoes.length
    ? interpolacoes.map(x => apenasCodigo(x)).join('\n')
    : '';
  return fora.join('') + '\n' + dentro;
}

// --- Auto-teste do detector ---
// Um guarda que não pega nada passa sempre. Antes de julgar o app.js, o detector
// é apontado para uma amostra que TEM o defeito e para uma que não tem.
function orfasDe(fonte) {
  const cod = apenasCodigo(fonte);
  const decl = new Set();
  for (const re of [/\bfunction\s+([A-Za-z_$][\w$]*)/g, /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)/g]) {
    let m; while ((m = re.exec(cod)) !== null) decl.add(m[1]);
  }
  const cham = new Set();
  let m; const re = /(^|[^\w$.])([A-Za-z_$][\w$]*)\s*\(/g;
  while ((m = re.exec(cod)) !== null) cham.add(m[2]);
  const amb = new Set(['if', 'for', 'while', 'return', 'switch', 'catch', 'typeof', 'function', 'console']);
  return [...cham].filter(n => !decl.has(n) && !amb.has(n));
}

const amostraDoente = `
  function bom() { return 1; }
  function chama() { bom(); naoExiste(); }   // <- o defeito A, em miniatura
  const prosa = 'Raio de canto (r)';         // string não é chamada
  const rx = /\\B(?=x)/;                       // regex não é chamada
  const tpl = \`<span>Penetração de trabalho (ae)</span>\`;
`;
const amostraSa = amostraDoente.replace('naoExiste();', 'bom();');

console.log('--- Auto-teste do detector ---');

const achou = orfasDe(amostraDoente);
assert(achou.includes('naoExiste'),
  `o detector acha a função inexistente na amostra doente (achou: ${achou.join(', ') || 'nada'})`);
assert(!achou.includes('canto') && !achou.includes('B') && !achou.includes('o'),
  `o detector não confunde prosa, regex nem template com chamada (achou: ${achou.join(', ') || 'nada'})`);
assert(orfasDe(amostraSa).length === 0,
  'o detector não acusa nada na amostra sã');

const codigo = apenasCodigo(src);

// --- o que o arquivo declara ---
const declarados = new Set();
for (const re of [
  /\bfunction\s+([A-Za-z_$][\w$]*)/g,          // function nome(
  /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)/g, // const nome =
  /\bcatch\s*\(\s*([A-Za-z_$][\w$]*)/g,        // catch (e)
]) {
  let m; while ((m = re.exec(codigo)) !== null) declarados.add(m[1]);
}
// desestruturação: const { a, b } = ... e const [a, b] = ...
let m1; const reDestr = /\b(?:const|let|var)\s*[{[]([^}\]]*)[}\]]/g;
while ((m1 = reDestr.exec(codigo)) !== null) {
  m1[1].split(',').forEach(p => {
    const nome = p.split(':').pop().split('=')[0].trim().replace(/^\.\.\./, '');
    if (/^[A-Za-z_$][\w$]*$/.test(nome)) declarados.add(nome);
  });
}
// parâmetros de função e de arrow
for (const re of [
  /\bfunction\s*[A-Za-z_$\w$]*\s*\(([^)]*)\)/g,
  /\(([^()]*)\)\s*=>/g,
  /(?:^|[^\w$.])([A-Za-z_$][\w$]*)\s*=>/g,
]) {
  let m; while ((m = re.exec(codigo)) !== null) {
    m[1].split(',').forEach(p => {
      const nome = p.split(/[:=]/)[0].trim().replace(/^\.\.\./, '').replace(/[{}[\]]/g, '');
      if (/^[A-Za-z_$][\w$]*$/.test(nome)) declarados.add(nome);
    });
  }
}

// --- o que o ambiente oferece ---
const ambiente = new Set([
  // do navegador e do dado global do protótipo
  'document', 'window', 'localStorage', 'setTimeout', 'clearTimeout', 'console',
  'Event', 'FENIX_MOCK_DATA', 'requestAnimationFrame', 'alert', 'confirm',
  // embutidos da linguagem
  'Number', 'String', 'Boolean', 'Array', 'Object', 'Math', 'JSON', 'Date',
  'Set', 'Map', 'RegExp', 'Error', 'Promise', 'Symbol', 'BigInt',
  'parseFloat', 'parseInt', 'isNaN', 'isFinite', 'encodeURIComponent',
  'decodeURIComponent', 'structuredClone',
  // palavras-chave que a varredura pode confundir com chamada
  'if', 'for', 'while', 'switch', 'catch', 'return', 'typeof', 'function',
  'else', 'do', 'new', 'delete', 'void', 'in', 'of', 'await', 'yield', 'case',
]);

// --- o que o arquivo chama ---
// `nome(` com o caractere anterior não sendo ponto (exclui método) nem parte de nome
const chamados = new Set();
let m2; const reCall = /(^|[^\w$.])([A-Za-z_$][\w$]*)\s*\(/g;
while ((m2 = reCall.exec(codigo)) !== null) chamados.add(m2[2]);

const orfas = [...chamados].filter(n => !declarados.has(n) && !ambiente.has(n)).sort();

console.log('====================================================');
console.log('GUARDA DE INTEGRIDADE — js/app.js');
console.log('====================================================\n');

console.log(`--- Varredura: ${declarados.size} nomes declarados, ${chamados.size} nomes chamados ---`);

assert(
  orfas.length === 0,
  orfas.length === 0
    ? 'toda função chamada em app.js está definida — nenhum ReferenceError latente'
    : `funções chamadas e nunca definidas: ${orfas.join(', ')}`
);

// A função do defeito A, nomeada, para que a regressão apareça com nome próprio
assert(/\bfunction\s+markOutdated\s*\(/.test(codigo),
  'markOutdated() está definida (defeito A da especificação estrutural)');

// O estado desatualizado precisa ser alcançável: alguém liga, alguém desliga
assert(/state\.isOutdated\s*=\s*true/.test(codigo),
  'algum caminho liga state.isOutdated — o estado desatualizado é alcançável');
assert(/state\.isOutdated\s*=\s*false/.test(codigo),
  'algum caminho desliga state.isOutdated — o estado sai quando o cálculo sincroniza');

// Defeito B: sentinela de dado que o código não reconhece.
// A data gravava '0.7xD' e o código testava '0.7*D', então a derivação da
// penetração de trabalho do cabeçote faceador nunca disparava — silenciosa,
// porque o `else if (typeof ... === 'number')` simplesmente não pegava a string.
const mock = fs.readFileSync(path.join(__dirname, '../js/mock-data.js'), 'utf-8');
const sentinelasNaData = [...mock.matchAll(/aePartida:\s*'([^']+)'/g)].map(m => m[1]);
// contra `src`, não contra `codigo`: o scanner tira string literal, e o sentinela
// que se quer comparar É uma string literal
const sentinelasNoCodigo = [...src.matchAll(/aePartida\s*===\s*'([^']+)'/g)].map(m => m[1]);

console.log(`\n--- Sentinelas de aePartida: data ${JSON.stringify(sentinelasNaData)}, código ${JSON.stringify([...new Set(sentinelasNoCodigo)])} ---`);

const orfaos = sentinelasNaData.filter(x => !sentinelasNoCodigo.includes(x));
assert(orfaos.length === 0,
  orfaos.length === 0
    ? 'todo sentinela de aePartida gravado na data é reconhecido pelo código (defeito B)'
    : `sentinelas na data que o código não reconhece: ${orfaos.join(', ')}`);

// R7: o alerta nunca esmaece junto com os números
const css = fs.readFileSync(path.join(__dirname, '../css/prototipo.css'), 'utf-8');
assert(/\.state-outdated\s+\.u20:not\(\.is-alert\)/.test(css),
  'R7: o valor em ATENÇÃO fica fora do esmaecimento de desatualizado');

// Defeito D: a simulação de viewport tem de casar com o que a barra anuncia,
// e tem de espelhar os limiares reais — a consulta de mídia olha a janela, a
// simulação encolhe só o contêiner.
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');

console.log('\n--- Simulação de viewport contra os limiares reais ---');

for (const [vp, rotulo] of [['tablet', 'Tablet'], ['mobile', 'Celular']]) {
  const anunciado = html.match(new RegExp(`data-vp="${vp}"[^>]*>[^(]*\\((\\d+)px\\)`));
  const entregue = css.match(new RegExp(`\\.viewport-${vp}\\s*\\{[^}]*max-width:\\s*(\\d+)px`));
  assert(anunciado && entregue && anunciado[1] === entregue[1],
    anunciado && entregue
      ? `${rotulo}: a barra anuncia ${anunciado[1]}px e o CSS entrega ${entregue[1]}px (defeito D)`
      : `${rotulo}: não achei o par anunciado/entregue`);
}

// O limiar de 1.080px empilha as colunas E libera o teto de largura. As duas
// simulações são mais estreitas que isso, então as duas precisam do espelho.
for (const vp of ['tablet', 'mobile']) {
  assert(new RegExp(`\\.viewport-${vp}\\s+\\.main-layout`).test(css),
    `${vp}: a simulação empilha as colunas, como o limiar de 1.080px (defeito D)`);
  assert(new RegExp(`\\.viewport-${vp}\\s+\\.col-config`).test(css),
    `${vp}: a simulação libera o teto de largura da coluna de configuração (defeito D)`);
}

// Defeito E: CSS órfão e markup sem CSS, nos dois sentidos.
// Não vale varrer o CSS inteiro — pseudo-classe, estado e variante de tema não
// aparecem no markup. Então a checagem é nominal, sobre as classes que a
// especificação encontrou dos dois lados.
console.log('\n--- Classes: CSS sem gerador, markup sem CSS ---');

const fonteMarkup = src + html;

// tinham regra e nada as gerava — restos de função revogada e variantes mortas
for (const c of ['faixa-d', 'faixa-linha', 'refline', 'fval', 'fplace',
                 'raddr-sm', 'zidrule', 'tag-crit', 'outdated-marker']) {
  assert(!new RegExp(`\\.${c}\\s*[,{]`).test(css),
    `.${c} não voltou ao CSS sem alguém gerá-la (defeito E)`);
}

// nasciam do markup e não tinham regra — sobreviviam de estilo inline
for (const c of ['btn-link-cfg', 'tipo-ferramenta-grupo', 'estado-vazio']) {
  assert(new RegExp(`\\.${c}\\s*[,{]`).test(css), `.${c} tem regra no CSS (defeito E)`);
  assert(fonteMarkup.includes(c), `.${c} é gerada pelo markup — não é órfã`);
}

// o atalho para Configurações não volta a carregar estilo inline
assert(!/class="btn-link-cfg"[^>]*style=/.test(src),
  'o atalho para Configurações vive da classe, não de estilo inline (defeito E)');

// Divergência G: o passo do ± vive em três lugares — a constante do código, o
// Cenário 4 da Specification Sheet e o número que ele espera. Os três têm de
// contar a mesma história. A Spec Sheet dizia 10% e S_novo 4.010 depois de a
// emenda do Mestre de 07/09/2026 já ter fixado 5%.
const spec = fs.readFileSync(
  path.join(__dirname, '../../../../docs/fase1/03_SPECIFICATION_SHEET.md'), 'utf-8');

const passoNoCodigo = Number((src.match(/STEP_PERCENT\s*=\s*(\d+)/) || [])[1]);
const passoNaSpec = Number((spec.match(/Passo ±(\d+)%/) || [])[1]);

console.log(`\n--- Passo do ±: código ${passoNoCodigo}%, Specification Sheet ${passoNaSpec}% ---`);

assert(passoNoCodigo === 5, `STEP_PERCENT no código é 5 (achei ${passoNoCodigo})`);
assert(passoNaSpec === passoNoCodigo,
  `o Cenário 4 da Specification Sheet usa o mesmo passo do código (divergência G)`);

// e o número esperado tem de ser aritmética desse passo, não um valor herdado
const base = 4456;
const esperadoNaSpec = (spec.match(/S_novo\s*=\s*([\d.]+)\s*rpm/) || [])[1];
const calculado = Math.round(base * (1 - passoNoCodigo / 100));
const calculadoBr = calculado.toLocaleString('pt-BR');
assert(esperadoNaSpec === calculadoBr,
  `S_novo da Spec Sheet (${esperadoNaSpec}) é ${base} menos ${passoNoCodigo}% = ${calculadoBr} (divergência G)`);

console.log(`\n====================================================`);
console.log(`INTEGRIDADE EM DIA: ${passed}/${total} VERIFICAÇÕES`);
console.log('====================================================');
