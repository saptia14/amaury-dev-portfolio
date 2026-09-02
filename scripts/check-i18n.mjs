#!/usr/bin/env node
/**
 * Gate de paridad i18n. Corre en `prebuild`, así que el build local y el de
 * Vercel fallan ante cualquier deriva entre inglés y español.
 *
 * Comprueba:
 *   1. Que ambos locales tengan exactamente el mismo conjunto de claves.
 *   2. Que ninguna hoja esté vacía.
 *   3. Que todo id referenciado desde src/data/ resuelva en AMBOS idiomas.
 *   4. (aviso) Valores en español idénticos byte a byte al inglés.
 *
 * El punto 3 es el que hace que valga la pena haber pasado los arrays a
 * objetos con id: una diferencia que antes renderizaba en silencio dos
 * currículos distintos ahora rompe el build.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'));

const en = read('src/locales/en/translation.json');
const es = read('src/locales/es/translation.json');
const projects = read('src/data/projects.json');

/** Aplana a rutas con punto. Los arrays se indexan por posición. */
function flatten(node, prefix = '', out = {}) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, out);
    }
  } else {
    out[prefix] = node;
  }
  return out;
}

const flatEn = flatten(en);
const flatEs = flatten(es);
const errors = [];
const warnings = [];

// 1. Paridad de claves
const keysEn = new Set(Object.keys(flatEn));
const keysEs = new Set(Object.keys(flatEs));
for (const k of keysEn) if (!keysEs.has(k)) errors.push(`falta en es: ${k}`);
for (const k of keysEs) if (!keysEn.has(k)) errors.push(`falta en en: ${k}`);

// 2. Hojas vacías
for (const [locale, flat] of [['en', flatEn], ['es', flatEs]]) {
  for (const [k, v] of Object.entries(flat)) {
    if (typeof v === 'string' && v.trim() === '') errors.push(`${locale}: valor vacío en ${k}`);
  }
}

// 3. Ids de datos que deben resolver en ambos idiomas.
//    Los módulos de datos son ESM con exports simples: se leen con regex para
//    no arrastrar un bundler a un script de build.
const readBlock = (file, exportName) => {
  const src = readFileSync(resolve(ROOT, file), 'utf8');
  const after = src.split(`export const ${exportName}`)[1] ?? '';
  // Acotar al siguiente export: si no, se arrastran los ids del bloque siguiente.
  return after.split(/\nexport const /)[0];
};

const readIds = (file, exportName) =>
  [...readBlock(file, exportName).matchAll(/\bid:\s*'([^']+)'/g)].map((m) => m[1]);

const experienceIds = readIds('src/data/resume.js', 'EXPERIENCES');
const educationIds = readIds('src/data/resume.js', 'EDUCATION');
const languageIds = readIds('src/data/resume.js', 'LANGUAGES');
const categoryIds = readIds('src/data/skills.js', 'SKILL_CATEGORIES');

const required = [];
for (const id of experienceIds) {
  required.push(`resume.experiences.${id}.title`, `resume.experiences.${id}.period`);
}
for (const id of educationIds) {
  required.push(`resume.education.${id}.degree`, `resume.education.${id}.period`);
}
for (const id of languageIds) {
  required.push(`languages.items.${id}.name`, `languages.items.${id}.fluency`);
}
for (const id of categoryIds) required.push(`techStack.categories.${id}`);
for (const p of projects) {
  required.push(
    `projects.items.${p.id}.title`,
    `projects.items.${p.id}.desc`,
    `projects.items.${p.id}.role`,
  );
  required.push(`projects.filter_${p.category}`);
  for (const m of p.metrics ?? []) required.push(`projects.metrics.${m.id}`);
}

for (const key of new Set(required)) {
  if (!keysEn.has(key)) errors.push(`clave referenciada por datos, ausente en en: ${key}`);
  if (!keysEs.has(key)) errors.push(`clave referenciada por datos, ausente en es: ${key}`);
}

// Cada bullet declarado en resume.js debe existir en ambos idiomas
const expBlock = readBlock('src/data/resume.js', 'EXPERIENCES');
for (const m of expBlock.matchAll(/id:\s*'([^']+)',[\s\S]*?bullets:\s*\[([^\]]*)\]/g)) {
  const expId = m[1];
  for (const b of m[2].matchAll(/'([^']+)'/g)) {
    for (const [locale, keys] of [['en', keysEn], ['es', keysEs]]) {
      for (const field of ['label', 'text']) {
        const key = `resume.experiences.${expId}.bullets.${b[1]}.${field}`;
        if (!keys.has(key)) errors.push(`bullet ausente en ${locale}: ${key}`);
      }
    }
  }
}

// 4. Aviso: español idéntico al inglés (copiado y olvidado).
//    Se permiten nombres propios, comandos de shell y claves compartidas.
const ALLOW_IDENTICAL = [
  /^nav\.(skills|projects)$/,
  /^home\.terminal\.(whoami|status)$/,
  /^home\.roles\[0\]$/,
  /^projects\.filter_(backend|frontend|cloud)$/,
  /^techStack\.(subtitle_1|categories\.(frontend|aws))$/,
  /^projects\.metrics\.(endpoints|commits|flavors|mvne)$/,
  /^seo\.(title|og_title)$/,
];
for (const [k, v] of Object.entries(flatEs)) {
  if (typeof v !== 'string' || v.length < 4) continue;
  if (flatEn[k] === v && !ALLOW_IDENTICAL.some((re) => re.test(k))) {
    warnings.push(`es idéntico a en: ${k}`);
  }
}

for (const w of warnings) console.warn(`  aviso  ${w}`);

if (errors.length) {
  console.error(`\ncheck-i18n: ${errors.length} error(es)\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error('');
  process.exit(1);
}

console.log(
  `check-i18n ok — ${keysEn.size} claves en paridad, ` +
  `${new Set(required).size} referencias de datos resueltas` +
  (warnings.length ? `, ${warnings.length} aviso(s)` : ''),
);
