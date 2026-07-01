import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
const root = process.argv[2] || '.'; const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json' };
createServer((req, res) => { const url = new URL(req.url, 'http://localhost'); let path = normalize(join(root, url.pathname === '/' ? 'index.html' : url.pathname)); if (!path.startsWith(normalize(root))) path = join(root, 'index.html'); if (!existsSync(path) || statSync(path).isDirectory()) path = join(root, 'index.html'); res.setHeader('content-type', types[extname(path)] || 'application/octet-stream'); createReadStream(path).pipe(res); }).listen(5173, () => console.log('Forbidden Archipelago at http://localhost:5173'));
