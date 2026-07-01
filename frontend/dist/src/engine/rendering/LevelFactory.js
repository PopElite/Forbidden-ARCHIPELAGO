import { EnemyBrain } from '../ai/EnemyBrain.js';

export class LevelFactory {
  constructor(scene, level) { this.scene = scene; this.level = level; }
  build() {
    this.platforms = this.scene.physics.add.staticGroup();
    this.level.platforms.forEach((p) => {
      const tile = this.platforms.create(p.x + p.width / 2, p.y + p.height / 2, 'world-atlas').setDisplaySize(p.width, p.height).refreshBody().setTint(platformTint(p.type));
      tile.body.updateFromGameObject();
    });
    this.level.decorations.forEach((item) => this.addDecoration(item));
    return this.platforms;
  }
  addDecoration(item) {
    const sprite = this.scene.add.image(item.x, item.y, 'world-atlas').setDepth(item.parallaxFactor ? 5 : 16).setScrollFactor(item.parallaxFactor ?? 1).setTint(decorationTint(item.type));
    this.scene.tweens.add({ targets: sprite, y: item.y - 8, alpha: item.type.includes('water') ? 0.5 : 0.9, yoyo: true, repeat: -1, duration: 1300 + item.x % 900, ease: 'sine.inOut' });
  }
  spawnHero(spawn) { const hero = this.scene.physics.add.sprite(spawn.x, spawn.y, 'hero-atlas').setDepth(40).setSize(20, 42).setOffset(6, 8); hero.body.setMaxVelocity(520, 900).setDragX(260); return hero; }
  spawnEnemies(configs) {
    return configs.map((config) => {
      const heavy = ['forest_spirit', 'temple_guard'].includes(config.type);
      const enemy = this.scene.physics.add.sprite(config.x, config.y, 'enemy-atlas').setDepth(35).setSize(heavy ? 34 : 24, heavy ? 58 : 38);
      enemy.spawnX = config.x; enemy.patrolRange = config.patrolRange; enemy.damage = config.damage; enemy.hp = config.hp; enemy.stun = 0; enemy.dead = false; enemy.ai = new EnemyBrain(config.type); enemy.setTint(enemyTint(config.type)); return enemy;
    });
  }
}
function platformTint(type) { return type.includes('brick') || type.includes('ruin') ? 0xd9a1aa : type.includes('solid') ? 0x74ce68 : 0x9bf7ff; }
function decorationTint(type) { return { firefly_spawner: 0xffe66b, glowing_tree: 0x83f28f, ancient_statue: 0xffb6c1, hanging_vines: 0x77c56f, water_fountain: 0x79dfff, glowing_spores: 0xd9ff75 }[type] ?? 0x8df2aa; }
function enemyTint(type) { return { goblin: 0x8fbc68, forest_spirit: 0x8ff4ff, temple_guard: 0xffb6c1, acid_slug: 0xb5d46a }[type] ?? 0xff3355; }
