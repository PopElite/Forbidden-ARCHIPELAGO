import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { GreenContinentScene } from './scenes/GreenContinentScene.js';

export function createForbiddenArchipelago({ parent, onSnapshot }) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 480,
    height: 270,
    pixelArt: true,
    roundPixels: true,
    backgroundColor: '#07111f',
    physics: { default: 'arcade', arcade: { gravity: { y: 1180 }, fps: 60, fixedStep: true, debug: false } },
    render: { antialiasGL: false, powerPreference: 'high-performance', batchSize: 4096 },
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [BootScene, PreloadScene, GreenContinentScene],
    callbacks: { postBoot: (game) => { game.registry.set('onSnapshot', onSnapshot); } },
  });
}
