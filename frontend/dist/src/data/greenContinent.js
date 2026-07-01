export const greenContinent = {
  id: 'green-continent', name: 'Green Continent', width: 3200, height: 900,
  palette: { skyTop: 0x21375f, skyLow: 0xf6a35d, mist: 0x9fd5dc, foliage: 0x75cf68, shadow: 0x141827 },
  spawn: { x: 160, y: 520 },
  zones: [{ id: 'arrival', x: 0, y: 0, w: 1100, h: 900 }, { id: 'falls', x: 1100, y: 0, w: 980, h: 900 }, { id: 'rift', x: 2080, y: 0, w: 1120, h: 900 }],
  platforms: [
    { x: 0, y: 700, w: 760, h: 80, kind: 'moss' }, { x: 860, y: 620, w: 430, h: 54, kind: 'moss' },
    { x: 1420, y: 545, w: 420, h: 54, kind: 'wet' }, { x: 2060, y: 705, w: 840, h: 90, kind: 'moss' }
  ],
  interactives: [{ x: 590, y: 634, kind: 'crystal' }, { x: 1640, y: 468, kind: 'waterfall' }, { x: 2300, y: 650, kind: 'rift-lantern' }],
  enemies: [{ archetype: 'dragonMan', x: 2260, y: 580 }, { archetype: 'zombie', x: 2520, y: 630 }]
};
