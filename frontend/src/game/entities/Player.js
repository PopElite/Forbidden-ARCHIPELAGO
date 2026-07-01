import { Entity } from './Entity.js';
import { PHYSICS } from '../../config/physicsConstants.js';

export class Player extends Entity {
  constructor(spawn) { super({ x: spawn.x, y: spawn.y, w: 46, h: 76, faction: 'player' }); this.health = 100; this.mana = 74; this.gold = 24500; this.cooldowns = { dash: 0, hook: 0, spin: 0 }; this.attackTimer = 0; this.dashTimer = 0; this.coyote = 0; }
  update(input, dt) {
    const axis = input.axisX;
    const accel = this.grounded ? PHYSICS.groundAcceleration : PHYSICS.airAcceleration;
    this.vx += axis * accel * dt;
    if (Math.abs(axis) > 0.05) this.flip = Math.sign(axis);
    if (!axis && this.grounded) this.vx -= Math.sign(this.vx) * Math.min(Math.abs(this.vx), PHYSICS.groundFriction * dt);
    this.vx = Math.max(-PHYSICS.maxRunSpeed, Math.min(PHYSICS.maxRunSpeed, this.vx));
    this.coyote = this.grounded ? PHYSICS.coyoteTime : Math.max(0, this.coyote - dt);
    if (input.consume('jump') && this.coyote > 0) { this.vy = PHYSICS.jumpVelocity; this.grounded = false; this.coyote = 0; }
    if (input.consume('dash') && this.cooldowns.dash <= 0) { this.dashTimer = PHYSICS.dashDuration; this.cooldowns.dash = 2.25; }
    if (input.consume('attack')) this.attackTimer = 0.28;
    if (this.dashTimer > 0) { this.dashTimer -= dt; this.vx = this.flip * PHYSICS.dashSpeed; }
    this.attackTimer = Math.max(0, this.attackTimer - dt);
    Object.keys(this.cooldowns).forEach((key) => { this.cooldowns[key] = Math.max(0, this.cooldowns[key] - dt); });
    const state = this.attackTimer ? 'attack' : this.dashTimer > 0 ? 'dash' : !this.grounded ? (this.vy < 0 ? 'jump' : 'fall') : Math.abs(this.vx) > 20 ? 'run' : 'idle';
    this.updateState(state, dt);
  }
}
