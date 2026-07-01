import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { getGameState, patchGameState, resetGameState } from './gameState.js';

const port = Number(process.env.PORT || 8787);
const frontendRoot = normalize(join(process.cwd(), 'frontend', 'dist'));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

function sendJson(res, status, payload) { res.writeHead(status, { 'content-type': 'application/json', 'access-control-allow-origin': '*' }); res.end(JSON.stringify(payload)); }
async function readBody(req) { const chunks = []; for await (const chunk of req) chunks.push(chunk); return chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}; }

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === 'OPTIONS') return sendJson(res, 204, {});
  if (url.pathname === '/api/health') return sendJson(res, 200, { ok: true, service: 'forbidden-archipelago-backend' });
  if (url.pathname === '/api/state' && req.method === 'GET') return sendJson(res, 200, getGameState());
  if (url.pathname === '/api/state' && req.method === 'PATCH') return sendJson(res, 200, patchGameState(await readBody(req)));
  if (url.pathname === '/api/state/reset' && req.method === 'POST') return sendJson(res, 200, resetGameState());

  const requested = normalize(join(frontendRoot, url.pathname === '/' ? 'index.html' : url.pathname));
  const safePath = requested.startsWith(frontendRoot) ? requested : join(frontendRoot, 'index.html');
  try { const data = readFileSync(safePath); res.writeHead(200, { 'content-type': types[extname(safePath)] || 'application/octet-stream' }); res.end(data); }
  catch { res.writeHead(404, { 'content-type': 'text/plain' }); res.end('Not found. Run npm run build first for frontend assets.'); }
}).listen(port, () => console.log(`Forbidden Archipelago backend listening on http://localhost:${port}`));
