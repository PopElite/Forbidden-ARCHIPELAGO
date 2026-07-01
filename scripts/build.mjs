import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
cpSync('src', 'dist/src', { recursive: true });
const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/><meta name="theme-color" content="#18233d"/><title>Forbidden Archipelago</title></head><body><div id="root"></div><script type="module" src="/src/main.js"></script></body></html>`;
writeFileSync('dist/index.html', html);
console.log('Built dist/ static application.');
