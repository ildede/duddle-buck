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
      {frameWidth: 325, frameHeight: 199}
    );
    this.load.spritesheet(
      'baignoires',
      'assets/baignoires.png',
      {frameWidth: 360, frameHeight: 250}
    );

  }

  create() {
    this.scene.start('Preloader');
  }
}
