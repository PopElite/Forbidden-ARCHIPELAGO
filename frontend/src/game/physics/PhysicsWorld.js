import { PHYSICS } from '../../config/physicsConstants.js';

const intersects = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

export class PhysicsWorld {
  constructor(level) { this.level = level; }
  step(entity, dt) {
    entity.vy = Math.min(PHYSICS.maxFallSpeed, entity.vy + PHYSICS.gravity * dt);
    entity.x += entity.vx * dt; this.resolve(entity, 'x');
    entity.y += entity.vy * dt; entity.grounded = false; this.resolve(entity, 'y');
    entity.x = Math.max(PHYSICS.worldPadding, Math.min(this.level.width - entity.w - PHYSICS.worldPadding, entity.x));
  }
  resolve(entity, axis) {
    for (const platform of this.level.platforms) {
      if (platform.type === 'oneWay' && (axis !== 'y' || entity.vy < 0 || entity.y + entity.h - entity.vy / 60 > platform.y + 8)) continue;
      if (!intersects(entity.bounds, platform)) continue;
      if (axis === 'x') { entity.x = entity.vx > 0 ? platform.x - entity.w : platform.x + platform.w; entity.vx = 0; }
      else { entity.y = entity.vy > 0 ? platform.y - entity.h : platform.y + platform.h; entity.grounded = entity.vy > 0; entity.vy = 0; if (platform.type === 'slippery') entity.vx *= 0.996; }
    }
  }
}
