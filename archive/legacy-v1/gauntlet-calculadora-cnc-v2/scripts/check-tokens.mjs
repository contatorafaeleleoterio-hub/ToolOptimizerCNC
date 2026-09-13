/**
 * Confere a paleta do mockup contra `docs/design/DS_TEMA_CLARO.md`.
 *
 *   node scripts/check-tokens.mjs        confere; sai com 1 se houver hex fora do sistema
 *
 * É o executor da parte "script" da categoria 7 (Fidelidade ao Design System) e
 * do gate 9. O critério promete que um script confere a paleta — sem ele, a
 * categoria vira opinião do Juiz e a nota deixa de ser reproduzível.
 *
 * O Construtor pode e deve rodar este script para se autoverificar antes de
 * fechar o ciclo. Ele lê o mockup, não o edita.
 *
 * Limite conhecido: varre notação hexadecimal. Cores escritas em `rgb()`/`rgba()`
 * não são cobertas — o DS usa rgba apenas em sombra, halo de foco e scrim, e
 * essas três estão listadas em ALLOW_RGBA.
 */
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Tokens do DS §3. Única fonte de cor permitida no tema claro. */
const PERMITIDOS = new Set([
  // §3.1 superfícies
  '#F3F4F6', '#FFFFFF', '#E9EBEF', '#D1D5DB', '#7A8494',
  // §3.2 texto
  '#111827', '#374151', '#475569',
  // §3.3 marca e seleção
  '#E85D04', '#0F1419', '#3730A3', '#00D9FF', '#005E77',
  // §3.4 estado — ok, atenção, crítico, informação
  '#116631', '#E8F5EC', '#A8D5B8',
  '#7A4F00', '#FDF3E2', '#E3C98A',
  '#A81E16', '#FCEBEA', '#EFB3AE',
  '#E6F1F6', '#A8CEDD',
  // §3.5 foco, hover, pressionado, desabilitado
  '#DDE1E7', '#F7F8FA', '#CFD4DC', '#8A93A0', '#EDEFF2',
]);

/** Aposentados pelo DS §3.4 — reprovam com motivo próprio. */
const APOSENTADOS = {
  '#39FF14': 'verde neon: 1,2:1 sobre fundo claro, saiu do sistema (DS §3.3)',
  '#2ECC71': 'rampa antiga do semáforo (DS §3.4)',
  '#F39C12': 'rampa antiga do semáforo (DS §3.4)',
  '#E74C3C': 'rampa antiga do semáforo (DS §3.4)',
  '#00E676': 'rampa paralela do gauge (DS §3.4)',
  '#FFA500': 'rampa paralela do gauge (DS §3.4)',
  '#FF4D4D': 'rampa paralela do gauge (DS §3.4)',
  '#A855F7': 'identidade por matiz do ae (DS §2)',
  '#F97316': 'identidade por matiz do ap, colide com aviso (DS §2)',
  '#6B7280': 'cinza rejeitado: 4,45:1, abaixo do mínimo (DS §3.2)',
};

const ALLOW_RGBA = [
  'rgba(16,24,40,.06)', 'rgba(16,24,40,.08)', 'rgba(16,24,40,.45)',
  // halo de foco e wash de hover acompanham o índigo de seleção (DS §3.5, §4.1)
  'rgba(55,48,163,.35)', 'rgba(55,48,163,.06)', 'rgba(0,94,119,.06)',
];

const html = fs.readFileSync(path.join(root, 'mockup', 'index.html'), 'utf8');
const linhas = html.split('\n');

/** `#abc` → `#AABBCC`; `#aabbccdd` → `#AABBCC` (alfa não muda a matiz). */
function normalizar(hex) {
  let h = hex.slice(1).toUpperCase();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (h.length === 8) h = h.slice(0, 6);
  return `#${h}`;
}

const foraDoSistema = new Map();
const aposentadosAchados = new Map();

linhas.forEach((linha, i) => {
  for (const bruto of linha.match(/#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) ?? []) {
    const cor = normalizar(bruto);
    const destino = cor in APOSENTADOS ? aposentadosAchados : PERMITIDOS.has(cor) ? null : foraDoSistema;
    if (!destino) continue;
    if (!destino.has(cor)) destino.set(cor, { ocorrencias: 0, primeiraLinha: i + 1 });
    destino.get(cor).ocorrencias++;
  }
});

console.log('');
console.log(`Paleta conferida contra DS_TEMA_CLARO.md — ${PERMITIDOS.size} tokens permitidos.`);

if (!aposentadosAchados.size && !foraDoSistema.size) {
  console.log('Paleta OK: nenhum hex fora do Design System.');
  process.exit(0);
}

if (aposentadosAchados.size) {
  console.error('\nCORES APOSENTADAS ainda presentes:');
  for (const [cor, { ocorrencias, primeiraLinha }] of aposentadosAchados) {
    console.error(`  - ${cor} (${ocorrencias}x, 1ª na linha ${primeiraLinha}) — ${APOSENTADOS[cor]}`);
  }
}

if (foraDoSistema.size) {
  console.error('\nHEX FORA DO SISTEMA:');
  for (const [cor, { ocorrencias, primeiraLinha }] of [...foraDoSistema].sort((a, b) => b[1].ocorrencias - a[1].ocorrencias)) {
    console.error(`  - ${cor} (${ocorrencias}x, 1ª na linha ${primeiraLinha})`);
  }
}

console.error(`\nTotal: ${aposentadosAchados.size + foraDoSistema.size} cor(es) irregular(es).`);
console.error(`rgba() permitidos: ${ALLOW_RGBA.join(' · ')}`);
process.exit(1);
