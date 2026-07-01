import Phaser from 'phaser';
import { buildProceduralAtlas } from '../assets/ProceduralAtlas.js';
export class PreloadScene extends Phaser.Scene { constructor() { super('Preload'); } create() { buildProceduralAtlas(this); this.scene.start('GreenContinent'); } }
