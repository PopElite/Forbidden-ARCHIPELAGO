export const MOTION_STATES = {
  idle: { frames: 4, frameTime: 0.16, color: '#f3d5b5', weaponFrame: null },
  run: { frames: 6, frameTime: 0.08, color: '#d69a64', weaponFrame: null },
  jump: { frames: 2, frameTime: 0.12, color: '#b6e4ff', weaponFrame: null },
  fall: { frames: 2, frameTime: 0.12, color: '#86c8ee', weaponFrame: null },
  dash: { frames: 3, frameTime: 0.05, color: '#ffce5c', weaponFrame: null },
  attack: { frames: 5, frameTime: 0.055, color: '#ff7a4d', weaponFrame: 2, hitStart: 0.08, hitEnd: 0.2 },
};

export const ENEMY_STATES = {
  patrol: { frames: 4, frameTime: 0.18 },
  attack: { frames: 4, frameTime: 0.1, hitStart: 0.12, hitEnd: 0.26 },
  hurt: { frames: 2, frameTime: 0.08 },
};
