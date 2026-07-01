import Phaser from 'phaser';
import { getLevelByIndex } from '../../data/adventureMap.js';
import { ArcadeInput } from '../input/ArcadeInput.js';
import { CinematicCamera } from '../camera/CinematicCamera.js';
import { BiomeAtmosphere } from '../fx/BiomeAtmosphere.js';
import { PlayerController } from '../ecs/PlayerController.js';
import { CombatDirector } from '../combat/CombatDirector.js';
import { LevelFactory } from '../rendering/LevelFactory.js';

export class AdventureLevelScene extends Phaser.Scene {
  constructor() { super('AdventureLevel'); }
  create() {
    this.levelIndex = this.registry.get('levelIndex') ?? 0; this.level = getLevelByIndex(this.levelIndex); this.physics.world.setBounds(0, 0, this.level.dimensions.width, this.level.dimensions.height);
    this.input.gamepad?.once('connected', () => this.registry.set('gamepad', true));
    this.atmosphere = new BiomeAtmosphere(this, this.level);
    this.factory = new LevelFactory(this, this.level); this.platforms = this.factory.build();
    this.hero = this.factory.spawnHero(this.level.spawnPoint); this.player = new PlayerController(this, this.hero);
    this.enemies = this.factory.spawnEnemies(this.level.enemies);
    this.physics.add.collider(this.hero, this.platforms); this.enemies.forEach((enemy) => this.physics.add.collider(enemy, this.platforms));
    this.arcadeInput = new ArcadeInput(this); this.cineCam = new CinematicCamera(this, this.hero, this.level);
    this.combat = new CombatDirector(this, this.player, this.enemies); this.createLighting(); this.createImpactFx(); this.publishSnapshot();
  }
  createLighting() { this.lights.enable().setAmbientColor(0x5d6e86); this.heroLight = this.lights.addLight(this.hero.x, this.hero.y, 160, 0x9ff3ff, 0.85); this.level.decorations.filter((i) => !i.type.includes('water')).forEach((i) => this.lights.addLight(i.x, i.y, 190, i.type.includes('spore') || i.type.includes('firefly') ? 0xffe66b : 0x8ff4ff, 0.75)); }
  createImpactFx() { this.events.on('impact', ({ x, y, tint }) => { this.cineCam.impact(); const ring = this.add.circle(x, y, 4, tint, 0.75).setDepth(90); this.tweens.add({ targets: ring, scale: 5, alpha: 0, duration: 160, ease: 'expo.out', onComplete: () => ring.destroy() }); }); this.events.on('dash', () => this.cineCam.impact(0.002, 45)); }
  update(_time, deltaMs) { const dt = deltaMs / 1000; const input = this.arcadeInput.poll(); if (input.consume('pause')) this.registry.set('paused', !this.registry.get('paused')); if (this.registry.get('paused')) { this.physics.pause(); this.publishSnapshot(); return; } this.physics.resume(); this.player.update(input, dt); this.enemies.forEach((enemy) => { if (!enemy.dead) enemy.ai.update(enemy, this.hero, dt); }); this.combat.update(dt); this.heroLight.x = this.hero.x; this.heroLight.y = this.hero.y - 10; this.cineCam.update(Math.abs(this.hero.body.velocity.x), this.enemies.some((e) => !e.dead && e.ai.state === 'combat')); this.atmosphere.update(this.cameras.main); this.publishSnapshot(); }
  publishSnapshot() { this.registry.get('onSnapshot')?.({ hp: this.player.hp, mana: this.player.mana, gold: this.player.gold, combo: this.player.combo, biome: this.level.name, paused: Boolean(this.registry.get('paused')) }); }
}
