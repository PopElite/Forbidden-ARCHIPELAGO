import { Entity } from './Entity.js';

export class Enemy extends Entity {
  constructor(config) { super({ x: config.x, y: config.y, w: config.type === 'dragonMan' ? 86 : 64, h: config.type === 'dragonMan' ? 128 : 86, faction: 'enemy' }); this.type = config.type; this.health = config.type === 'dragonMan' ? 160 : 80; this.patrolOrigin = config.x; this.damageCooldown = 0; }
  update(player, dt) {
    const distance = player.x - this.x; this.flip = Math.sign(distance) || this.flip;
    if (Math.abs(distance) < 420) this.vx = this.flip * (this.type === 'dragonMan' ? 88 : 54); else this.vx = Math.sin(performance.now() / 900 + this.patrolOrigin) * 45;
    this.damageCooldown = Math.max(0, this.damageCooldown - dt);
    this.updateState(Math.abs(distance) < 90 ? 'attack' : 'patrol', dt);
  }
}
