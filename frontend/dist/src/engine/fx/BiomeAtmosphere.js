export class BiomeAtmosphere {
  constructor(scene, level) { this.scene = scene; this.level = level; this.layers = []; this.createSky(); this.createParticles(); }
  createSky() { const { width } = this.level; for (let i = 0; i < 5; i++) { const layer = this.scene.add.tileSprite(0, 40 + i * 72, width, 160, 'world-atlas').setOrigin(0).setScrollFactor(0.08 + i * 0.12).setAlpha(0.08 + i * 0.06).setTint(i % 2 ? 0x9fd5dc : 0x24344e); this.layers.push(layer); } }
  createParticles() { this.dust = this.scene.add.particles(0, 0, 'world-atlas', { x: { min: 0, max: this.level.width }, y: { min: 80, max: 720 }, lifespan: 5000, speedX: { min: -8, max: 18 }, speedY: { min: -4, max: 2 }, alpha: { start: 0.18, end: 0 }, scale: { start: 0.12, end: 0.02 }, frequency: 140, quantity: 1, tint: 0xffe2a7 }).setDepth(120); }
  update(camera) { this.layers.forEach((layer, index) => { layer.tilePositionX = camera.scrollX * (0.08 + index * 0.05); }); }
}
