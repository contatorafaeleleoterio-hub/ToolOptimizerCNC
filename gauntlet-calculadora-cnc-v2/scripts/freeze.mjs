/**
 * Congelamento de integridade — a trava anti-trapaça do loop.
 *
 *   node scripts/freeze.mjs --write   grava state/FREEZE.json (só o orquestrador roda)
 *   node scripts/freeze.mjs           confere; sai com código 1 se algo divergiu
 *
 * Congela:
 *   1. A região DADOS do mockup (materiais, fatores, roscas, máquina, schemas
 *      dos 18 tipos) — byte a byte. O Builder mexe na tela, nunca no domínio.
 *   2. Todo arquivo de `tests/`, `criteria/` e `scripts/` — inclusive os golden
 *      values, a matriz do Juiz e este próprio script. Teste que o avaliado pode
 *      reescrever não mede nada, e validador que ele pode editar mede menos ainda.
 *
 * O motor de cálculo NÃO é congelado por byte de propósito: os 4 controles de
 * ajuste fino precisam poder sobrepor Vc/fz/ae/ap. Quem prova que a matemática
 * não mudou é `goldens.spec.ts`, que compara 54 combinações contra valores
 * capturados antes de qualquer edição.
 */
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const freezePath = path.join(root, 'state', 'FREEZE.json');

const DADOS_INICIO = '/* ============================ DADOS ============================ */';
const DADOS_FIM = '/* ============================ DOM REFS ============================ */';

const sha = (texto) => crypto.createHash('sha256').update(texto, 'utf8').digest('hex');

function regiaoDados() {
  const html = fs.readFileSync(path.join(root, 'mockup', 'index.html'), 'utf8');
  const inicio = html.indexOf(DADOS_INICIO);
  const fim = html.indexOf(DADOS_FIM);
  if (inicio === -1 || fim === -1 || fim < inicio) {
    throw new Error('Marcadores da região DADOS não encontrados no mockup — não é possível conferir a integridade.');
  }
  return html.slice(inicio, fim);
}

function arquivosCongelados() {
  const out = {};
  for (const dir of ['tests', 'criteria', 'scripts', 'research']) {
    const base = path.join(root, dir);
    if (!fs.existsSync(base)) continue;
    for (const nome of fs.readdirSync(base).sort()) {
      const full = path.join(base, nome);
      if (fs.statSync(full).isFile()) out[`${dir}/${nome}`] = sha(fs.readFileSync(full, 'utf8'));
    }
  }
  return out;
}

const atual = { dados: sha(regiaoDados()), arquivos: arquivosCongelados() };

if (process.argv.includes('--write')) {
  fs.mkdirSync(path.dirname(freezePath), { recursive: true });
  fs.writeFileSync(freezePath, JSON.stringify({ congeladoEm: new Date().toISOString(), ...atual }, null, 2) + '\n', 'utf8');
  console.log(`Congelado: região DADOS + ${Object.keys(atual.arquivos).length} arquivos de tests/, criteria/ e scripts/.`);
  process.exit(0);
}

if (!fs.existsSync(freezePath)) {
  console.error('ERRO: state/FREEZE.json não existe. Rode com --write antes do primeiro ciclo.');
  process.exit(1);
}

const esperado = JSON.parse(fs.readFileSync(freezePath, 'utf8'));
const violacoes = [];

if (atual.dados !== esperado.dados) {
  violacoes.push('região DADOS do mockup foi alterada (materiais, fatores, roscas, máquina ou schemas dos 18 tipos)');
}

for (const [arquivo, hash] of Object.entries(esperado.arquivos)) {
  if (!(arquivo in atual.arquivos)) violacoes.push(`${arquivo} foi REMOVIDO`);
  else if (atual.arquivos[arquivo] !== hash) violacoes.push(`${arquivo} foi ALTERADO`);
}
for (const arquivo of Object.keys(atual.arquivos)) {
  if (!(arquivo in esperado.arquivos)) violacoes.push(`${arquivo} foi ADICIONADO`);
}

if (violacoes.length) {
  console.error('INTEGRIDADE VIOLADA:');
  for (const v of violacoes) console.error(`  - ${v}`);
  process.exit(1);
}

console.log('Integridade OK: região DADOS e arquivos de tests/, criteria/ e scripts/ intactos.');
