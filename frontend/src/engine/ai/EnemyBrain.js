export class EnemyBrain {
  constructor(archetype) { this.archetype = archetype; this.state = 'idle'; this.pattern = 0; }
  update(enemy, player, dt) {
    const distance = player.x - enemy.x; const abs = Math.abs(distance);
    if (enemy.stun > 0) { enemy.stun -= dt; enemy.clearTint(); this.state = 'stun'; return; }
    this.state = abs > 460 ? 'idle' : abs > 92 ? 'chase' : 'combat';
    const speed = { goblin: 76, forest_spirit: 98, temple_guard: 62, acid_slug: 44 }[this.archetype] ?? 56;
    const patrol = enemy.patrolRange ?? 120;
    if (this.state === 'idle') enemy.body.setVelocityX(Math.sin(enemy.scene.time.now / 900 + enemy.spawnX) * Math.min(42, patrol / 4));
    if (this.state === 'chase') enemy.body.setVelocityX(Math.sign(distance) * speed);
    if (this.state === 'combat') enemy.body.setVelocityX(Math.sin(enemy.scene.time.now / 180) * 18);
    enemy.setFlipX(distance < 0);
  }
}
