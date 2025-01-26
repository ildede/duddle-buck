import { Scene } from 'phaser';

export class Boot extends Scene {

  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', 'assets/splash-screen.jpg');
    this.load.image('gamestart', 'assets/start.png');
    this.load.image('credits', 'assets/credits.png');
    this.load.image('realduck', 'assets/real-duck.png');
    this.load.image('plasticduck', 'assets/plastic-duck.png');
    this.load.image('sdb', 'assets/sdb.png');
    this.load.image('cabane', 'assets/cabane-menu.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
