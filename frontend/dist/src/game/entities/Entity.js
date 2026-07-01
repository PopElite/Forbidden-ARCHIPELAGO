export class Entity {
  constructor({ x, y, w, h, vx = 0, vy = 0, faction = 'neutral' }) {
    Object.assign(this, { x, y, w, h, vx, vy, faction });
    this.flip = 1; this.grounded = false; this.dead = false; this.state = 'idle'; this.stateTime = 0;
  }
  get bounds() { return { x: this.x, y: this.y, w: this.w, h: this.h }; }
  updateState(state, dt) { if (this.state !== state) { this.state = state; this.stateTime = 0; } else this.stateTime += dt; }
}
