/**
 * Confere o resultado da suíte com contagem EXATA por grupo.
 *
 *   node scripts/check-suites.mjs
 *
 * Lê `reports/test-results.json` (gerado pelo reporter json do Playwright) e
 * aplica as regras duras do loop:
 *
 *   - regressão (gauntlet.spec.ts): os 23 cenários aprovados, todos verdes;
 *   - invariantes (invariantes.spec.ts): 3 cenários, todos verdes — são os
 *     executores dos gates 2, 3 e 4 do Juiz;
 *   - zona de resultado (goldens.spec.ts): 1 cenário, verde;
 *   - alvos do refactor (refactor.spec.ts): 21 cenários; quantos estão verdes
 *     é o placar do ciclo, e o PASS exige todos.
 *
 * A contagem é EXATA de propósito: "0 falhas" também é o resultado de apagar
 * o teste. Aqui, apagar derruba o ciclo.
 */
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const ESPERADO = {
  'gauntlet.spec.ts': { total: 23, exigeTodosVerdes: true, rotulo: 'regressão' },
  'invariantes.spec.ts': { total: 3, exigeTodosVerdes: true, rotulo: 'invariantes (gates 2-4)' },
  'goldens.spec.ts': { total: 1, exigeTodosVerdes: true, rotulo: 'zona de resultado (golden values)' },
  'refactor.spec.ts': { total: 21, exigeTodosVerdes: false, rotulo: 'alvos do refactor' },
};

const TOKENS_PROIBIDOS = ['test.skip', 'test.only', 'test.fixme', '.skip(', '.only('];

// ── Nenhum cenário desligado ────────────────────────────────────────────────
const problemas = [];
const testsDir = path.join(root, 'tests');
for (const nome of fs.readdirSync(testsDir)) {
  if (!nome.endsWith('.ts') && !nome.endsWith('.mjs')) continue;
  const conteudo = fs.readFileSync(path.join(testsDir, nome), 'utf8');
  for (const token of TOKENS_PROIBIDOS) {
    if (conteudo.includes(token)) problemas.push(`${nome} contém "${token}" — cenário desligado`);
  }
}

// ── Contagem por grupo ──────────────────────────────────────────────────────
const reportPath = path.join(root, 'reports', 'test-results.json');
if (!fs.existsSync(reportPath)) {
  console.error('ERRO: reports/test-results.json não existe. Rode `npx playwright test` sem sobrepor o reporter.');
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const specs = [];
const percorrer = (s) => {
  (s.suites || []).forEach(percorrer);
  (s.specs || []).forEach((sp) => specs.push({ arquivo: path.basename(sp.file || s.file || ''), ok: sp.ok, titulo: sp.title }));
};
(report.suites || []).forEach(percorrer);

const placar = {};
for (const [arquivo, regra] of Object.entries(ESPERADO)) {
  const doGrupo = specs.filter((s) => s.arquivo === arquivo);
  const verdes = doGrupo.filter((s) => s.ok).length;
  placar[arquivo] = { total: doGrupo.length, verdes };

  if (doGrupo.length !== regra.total) {
    problemas.push(`${regra.rotulo}: ${doGrupo.length} cenários encontrados, ${regra.total} esperados — cenário adicionado ou removido`);
  }
  if (regra.exigeTodosVerdes && verdes !== doGrupo.length) {
    const falhas = doGrupo.filter((s) => !s.ok).map((s) => s.titulo.slice(0, 60));
    problemas.push(`${regra.rotulo}: REGRESSÃO — ${doGrupo.length - verdes} cenário(s) quebrado(s):\n    ${falhas.join('\n    ')}`);
  }
}

// ── Relatório ───────────────────────────────────────────────────────────────
console.log('');
for (const [arquivo, regra] of Object.entries(ESPERADO)) {
  const p = placar[arquivo];
  const marca = regra.exigeTodosVerdes ? (p.verdes === regra.total ? 'OK  ' : 'FALHA') : '    ';
  console.log(`  ${marca} ${regra.rotulo}: ${p.verdes}/${regra.total}`);
}
console.log('');

if (problemas.length) {
  console.error('SUÍTE REPROVADA:');
  for (const p of problemas) console.error(`  - ${p}`);
  process.exit(1);
}

const alvos = placar['refactor.spec.ts'];
if (alvos.verdes === alvos.total) {
  console.log('Todos os alvos do refactor atingidos — candidato a PASS, falta o Juiz.');
} else {
  console.log(`Faltam ${alvos.total - alvos.verdes} alvo(s) do refactor.`);
}
