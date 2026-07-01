import Phaser from 'phaser';
export class BootScene extends Phaser.Scene { constructor() { super('Boot'); } create() { this.registry.set('quality', { bloom: true, particles: true, atmosphericDepth: true, objectPooling: true }); this.scene.start('Preload'); } }
