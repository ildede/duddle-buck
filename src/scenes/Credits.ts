import { Scene } from 'phaser';

export class Credits extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  credits_text: Phaser.GameObjects.Text;

  constructor() {
    super('Credits');
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff0000);

    this.background = this.add.image(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) / 2,
      'background'
    );
    this.background.setAlpha(0.5);

    this.credits_text = this.add.text(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) / 2,
      'CREDITS \n \n Made for the "Global GameJam 2025" \n By "Les portes logiques" Team @FLUX \n\n Game Design & Music : Chiara & Pierre \n\n Graphics : Lina & Aurore \n\n Coding : Davide & Yann ',
      {
        fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
        stroke: '#000000', strokeThickness: 8,
        align: 'center'
      });
    this.credits_text.setOrigin(0.5);

    

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
