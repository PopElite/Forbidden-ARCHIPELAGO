export function buildProceduralAtlas(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  drawHero(g); g.generateTexture('hero-atlas', 192, 64); g.clear();
  drawEnemies(g); g.generateTexture('enemy-atlas', 192, 96); g.clear();
  drawWorld(g); g.generateTexture('world-atlas', 256, 128); g.destroy();
}
function drawHero(g) { const colors = [0xf5d0a4, 0x7c3f58, 0x23233a, 0x9ff3ff, 0xffcf5a, 0xff6b45]; for (let i = 0; i < 6; i++) { const x = i * 32; g.fillStyle(colors[2]); g.fillRect(x + 9, 8, 14, 8); g.fillStyle(colors[0]); g.fillRect(x + 10, 16 + (i % 2), 12, 12); g.fillStyle(colors[1]); g.fillRect(x + 7, 28, 18, 18); g.fillStyle(colors[3]); g.fillRect(x + 23, 10, 3, 8); g.fillStyle(colors[4]); g.fillTriangle(x + 28, 24, x + 31, 30, x + 23, 29); if (i >= 3) { g.fillStyle(colors[5]); g.fillRect(x + 25, 25, 8, 3); } } }
function drawEnemies(g) { for (let i = 0; i < 4; i++) { const x = i * 48; g.fillStyle(0xa71936); g.fillTriangle(x + 20, 4, x + 40, 52, x + 4, 52); g.fillStyle(0xff385c); g.fillRect(x + 14, 20, 20, 28); g.fillStyle(0xff9aa9); g.fillRect(x + 18, 13, 8, 6); } for (let i = 0; i < 4; i++) { const x = i * 40; g.fillStyle(0x8aa174); g.fillRect(x + 6, 62, 22, 30); g.fillStyle(0xd7e6bf); g.fillCircle(x + 14, 72, 3); g.fillStyle(0x2c2d2f); g.fillRect(x + 2, 86, 30, 6); } }
function drawWorld(g) { g.fillStyle(0x79d365); g.fillRect(0, 0, 64, 14); g.fillStyle(0x3e2b2f); g.fillRect(0, 14, 64, 28); g.fillStyle(0x94f5ff); g.fillTriangle(72, 36, 86, 4, 100, 36); g.fillStyle(0xffffff, .5); g.fillTriangle(82, 16, 86, 4, 90, 16); g.fillStyle(0x59c9e8); g.fillRect(112, 0, 30, 72); g.fillStyle(0xffffff, .25); g.fillRect(122, 0, 4, 72); g.fillStyle(0x24344e); g.fillCircle(190, 40, 26); g.fillStyle(0x79d365); g.fillEllipse(190, 34, 44, 18); }
