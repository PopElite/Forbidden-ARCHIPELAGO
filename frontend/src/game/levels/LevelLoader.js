import { mapConfig } from '../../config/mapConfig.js';
import { Enemy } from '../entities/Enemy.js';
export function loadLevel() { return { ...mapConfig, platforms: mapConfig.platforms.map((p) => ({ ...p })), enemies: mapConfig.enemies.map((enemy) => new Enemy(enemy)) }; }
