import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['frontend/src', 'backend/src', 'scripts'];
const files = [];
function walk(dir) { for (const name of readdirSync(dir)) { const path = join(dir, name); const stat = statSync(path); if (stat.isDirectory()) walk(path); else if (/\.(js|mjs)$/.test(name)) files.push(path); } }
roots.forEach(walk);
let errors = 0;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  if (text.includes('<<<<' + '<<<') || text.includes('====' + '===') || text.includes('>>>>' + '>>>')) { console.error(`${file}: unresolved merge conflict marker`); errors++; }
  if (/try\s*{\s*import\s/.test(text)) { console.error(`${file}: imports must not be wrapped in try/catch`); errors++; }
  if (text.includes('console.log(') && !file.includes('dev-server') && !file.includes('server') && !file.includes('build') && !file.includes('lint')) { console.error(`${file}: remove console.log before production`); errors++; }
}
console.log(`Checked ${files.length} source files.`);
process.exit(errors ? 1 : 0);
