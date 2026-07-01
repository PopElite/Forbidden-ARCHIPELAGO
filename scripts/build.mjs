import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const frontendRoot = 'frontend';
const distRoot = join(frontendRoot, 'dist');
rmSync(distRoot, { recursive: true, force: true });
mkdirSync(distRoot, { recursive: true });
cpSync(join(frontendRoot, 'src'), join(distRoot, 'src'), { recursive: true });
cpSync(join(frontendRoot, 'index.html'), join(distRoot, 'index.html'));
console.log('Built frontend/dist static application.');
