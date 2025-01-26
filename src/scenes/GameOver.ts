import { Scene } from 'phaser';

export class GameOver extends Scene {
  background: Phaser.GameObjects.Image;
  gameover_text: Phaser.GameObjects.Text;
  cloud: Phaser.GameObjects.Image;

  constructor() {
    super('GameOver');
  }

  create({winner}: { winner: string }) {

    this.background = this.add.image(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) / 2,
      'sky-clouds'
    );
    this.cloud = this.add.image(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) / 2 + 200,
      'bubbles-cloud'
    );

    let winnerSprite = this.add.sprite(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) / 2 - 200,
      winner,
      4
    ).setScale(2, 2);
    if (!this.anims.exists(`${winner}happy`)) {
      this.anims.create({
        key: `${winner}happy`,
        frames: this.anims.generateFrameNumbers(winner, {start: 4, end: 5}),
        frameRate: 5,
        repeat: -1
      });
    }
    winnerSprite.play(`${winner}happy`);

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
