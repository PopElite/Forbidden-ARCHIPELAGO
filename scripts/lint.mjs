import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['src'];
const files = [];
function walk(dir) { for (const name of readdirSync(dir)) { const path = join(dir, name); const stat = statSync(path); if (stat.isDirectory()) walk(path); else if (/\.(js|jsx)$/.test(name)) files.push(path); } }
roots.forEach(walk);
let errors = 0;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  if (/try\s*{\s*import\s/.test(text)) { console.error(`${file}: imports must not be wrapped in try/catch`); errors++; }
  if (text.includes('console.log(')) { console.error(`${file}: remove console.log before production`); errors++; }
}
console.log(`Checked ${files.length} source files.`);
process.exit(errors ? 1 : 0);
