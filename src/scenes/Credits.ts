import { Scene } from 'phaser';

export class Credits extends Scene {

  constructor() {
    super('Credits');
  }

  create() {
    this.add.image(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) / 2,
      'final-credits'
    );

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
