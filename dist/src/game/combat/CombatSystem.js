const overlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

export class CombatSystem {
  constructor(onEvent) { this.onEvent = onEvent; }
  playerHitbox(player) { return player.attackTimer > 0.08 && player.attackTimer < 0.22 ? { x: player.flip > 0 ? player.x + player.w : player.x - 58, y: player.y + 18, w: 58, h: 34 } : null; }
  update(player, enemies) {
    const hitbox = this.playerHitbox(player);
    if (hitbox) for (const enemy of enemies) if (!enemy.dead && enemy.damageCooldown <= 0 && overlap(hitbox, enemy.bounds)) { enemy.health -= 28; enemy.damageCooldown = 0.35; this.onEvent(`${enemy.type} takes 28 damage!`); if (enemy.health <= 0) { enemy.dead = true; player.gold += enemy.type === 'dragonMan' ? 500 : 120; this.onEvent(`${enemy.type} defeated.`); } }
    for (const enemy of enemies) if (!enemy.dead && enemy.state === 'attack' && enemy.damageCooldown <= 0 && overlap(enemy.bounds, player.bounds)) { player.health = Math.max(0, player.health - 8); enemy.damageCooldown = 0.7; this.onEvent(`${enemy.type} strikes you!`); }
  }
}
