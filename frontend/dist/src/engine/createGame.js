import Phaser from 'phaser';
import { adventureMap } from '../data/adventureMap.js';
import { BootScene } from './scenes/BootScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { AdventureLevelScene } from './scenes/AdventureLevelScene.js';

export function createForbiddenArchipelago({ parent, onSnapshot }) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: adventureMap.globalSettings.canvasWidth,
    height: adventureMap.globalSettings.canvasHeight,
    pixelArt: true,
    roundPixels: true,
    backgroundColor: '#07111f',
    physics: { default: 'arcade', arcade: { gravity: { y: adventureMap.globalSettings.gravity * 2360 }, fps: 60, fixedStep: true, debug: false } },
    render: { antialiasGL: false, powerPreference: 'high-performance', batchSize: 4096 },
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [BootScene, PreloadScene, AdventureLevelScene],
    callbacks: { postBoot: (game) => { game.registry.set('onSnapshot', onSnapshot); } },
  });
}
