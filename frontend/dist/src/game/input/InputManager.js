import { GAMEPAD } from '../../config/physicsConstants.js';

const keyMap = new Map([['ArrowLeft', 'left'], ['KeyA', 'left'], ['ArrowRight', 'right'], ['KeyD', 'right'], ['Space', 'jump'], ['KeyW', 'jump'], ['KeyJ', 'attack'], ['KeyK', 'dash'], ['ShiftLeft', 'dash'], ['Escape', 'pause']]);

export class InputManager {
  constructor(target = window) { this.held = new Set(); this.pressed = new Set(); this.axisX = 0; this.target = target; this.onDown = (e) => this.setKey(e, true); this.onUp = (e) => this.setKey(e, false); target.addEventListener('keydown', this.onDown); target.addEventListener('keyup', this.onUp); }
  setKey(event, down) { const action = keyMap.get(event.code); if (!action) return; event.preventDefault(); if (down && !this.held.has(action)) this.pressed.add(action); down ? this.held.add(action) : this.held.delete(action); }
  pollGamepads() { const pads = navigator.getGamepads?.() ?? []; for (const pad of pads) { if (!pad) continue; const sony = GAMEPAD.sonyAliases.some((name) => pad.id.includes(name)); const compatibility = GAMEPAD.compatibilityMode || sony; const axis = Math.abs(pad.axes[0]) > GAMEPAD.deadZone ? pad.axes[0] : 0; this.axisX = axis; const buttons = compatibility ? { jump: [0, 1], attack: [2, 5], dash: [1, 4], pause: [9] } : { jump: [0], attack: [2], dash: [1], pause: [9] }; Object.entries(buttons).forEach(([action, ids]) => { if (ids.some((id) => pad.buttons[id]?.pressed)) this.pressed.add(action); }); return pad.id; } this.axisX = (this.held.has('right') ? 1 : 0) - (this.held.has('left') ? 1 : 0); return null; }
  frame() { this.pollGamepads(); if (!this.axisX) this.axisX = (this.held.has('right') ? 1 : 0) - (this.held.has('left') ? 1 : 0); }
  consume(action) { const active = this.pressed.has(action); this.pressed.delete(action); return active; }
  destroy() { this.target.removeEventListener('keydown', this.onDown); this.target.removeEventListener('keyup', this.onUp); }
}
