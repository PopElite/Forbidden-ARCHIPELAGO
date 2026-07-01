export const mapConfig = {
  id: 'green-continent-01', name: 'Green Continent - First Rift', width: 2800, height: 900, spawn: { x: 160, y: 520 },
  background: { sky: ['#566fa9', '#ffc06b', '#2f6f7d'], parallax: [{ color: '#263a63', speed: 0.18, y: 230 }, { color: '#396f57', speed: 0.38, y: 390 }] },
  platforms: [
    { id: 'start', x: 0, y: 710, w: 760, h: 80, type: 'solid' }, { id: 'mid', x: 900, y: 610, w: 460, h: 48, type: 'oneWay' },
    { id: 'ice', x: 1460, y: 530, w: 420, h: 54, type: 'slippery' }, { id: 'boss', x: 2060, y: 700, w: 700, h: 90, type: 'solid' }
  ],
  decorations: [{ x: 580, y: 620, kind: 'crystal' }, { x: 1640, y: 450, kind: 'waterfall' }],
  enemies: [{ type: 'dragonMan', x: 2210, y: 590 }, { type: 'zombie', x: 2480, y: 610 }],
};
