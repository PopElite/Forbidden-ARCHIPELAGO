import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const frontendRoot = 'frontend';
const distRoot = join(frontendRoot, 'dist');
rmSync(distRoot, { recursive: true, force: true });
mkdirSync(distRoot, { recursive: true });
cpSync(join(frontendRoot, 'src'), join(distRoot, 'src'), { recursive: true });
const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/><meta name="theme-color" content="#18233d"/><title>Forbidden Archipelago</title><link rel="stylesheet" href="/src/styles.css"></head><body><div id="root"></div><script type="module" src="/src/main.js"></script></body></html>`;
writeFileSync(join(distRoot, 'index.html'), html);
console.log('Built frontend/dist static application.');
