import { Scene } from 'phaser';

export class Boot extends Scene {

  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', 'assets/splash-screen.jpg');
    this.load.image('gamestart', 'assets/start-credits.png');
    this.load.image('realduck', 'assets/canards_vrai.png');
    this.load.image('plasticduck', 'assets/canards_plastique.png');
    this.load.image('sdb', 'assets/baignoires.png');
    this.load.spritesheet(
      'credits',
      'assets/start-credits.png',
      {frameWidth: 150, frameHeight: 92}
    );
    this.load.spritesheet(
      'cabane',
      'assets/baignoires.png',
      {frameWidth: 300, frameHeight: 205}
    );

  }

  create() {
    this.scene.start('Preloader');
  }
}
