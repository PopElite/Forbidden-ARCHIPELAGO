import { Camera } from './Camera.js';
import { GameLoop } from './GameLoop.js';
import { InputManager } from '../input/InputManager.js';
import { PhysicsWorld } from '../physics/PhysicsWorld.js';
import { CombatSystem } from '../combat/CombatSystem.js';
import { Player } from '../entities/Player.js';
import { Renderer } from '../rendering/Renderer.js';
import { loadLevel } from '../levels/LevelLoader.js';

export class Engine {
  constructor(canvas, { onPlayer, onEnemies, onEvent, isPaused, onPause }) {
    this.level = loadLevel(); this.player = new Player(this.level.spawn); this.camera = new Camera(canvas.clientWidth || 960, canvas.clientHeight || 540, this.level); this.renderer = new Renderer(canvas, this.camera); this.input = new InputManager(); this.physics = new PhysicsWorld(this.level); this.combat = new CombatSystem(onEvent); this.callbacks = { onPlayer, onEnemies, isPaused, onPause }; this.loop = new GameLoop({ update: (dt) => this.update(dt), render: () => this.render() });
  }
  start() { this.renderer.resize(); window.addEventListener('resize', this.resize); this.loop.start(); }
  resize = () => this.renderer.resize();
  update(dt) { this.input.frame(); if (this.input.consume('pause')) this.callbacks.onPause(); if (this.callbacks.isPaused()) return; this.player.update(this.input, dt); this.physics.step(this.player, dt); this.level.enemies.forEach((enemy) => { if (!enemy.dead) { enemy.update(this.player, dt); this.physics.step(enemy, dt); } }); this.combat.update(this.player, this.level.enemies); this.camera.follow(this.player); this.callbacks.onPlayer({ health: this.player.health, mana: this.player.mana, gold: this.player.gold, cooldowns: { ...this.player.cooldowns } }); this.callbacks.onEnemies(this.level.enemies.map((e) => ({ type: e.type, health: e.health, dead: e.dead }))); }
  render() { this.renderer.render(this.level, this.player); }
  destroy() { this.loop.stop(); this.input.destroy(); window.removeEventListener('resize', this.resize); }
}
