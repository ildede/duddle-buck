import { Scene } from 'phaser';
import { Player } from '../GameObjects/Player';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  player1: Player;
  player2: Player;
  pump: Phaser.GameObjects.Image;
  music: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

  constructor() {
    super('Game');
  }

  create() {
    this.camera = this.cameras.main;

    this.background = this.add.image(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) / 2,
      'game-background'
    );

    this.pump = this.physics.add.staticImage(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) - 232 / 2,
      'pump'
    );

    this.player1 = new Player(this, 1);
    this.player2 = new Player(this, 2);

    this.physics.add.collider(this.player1, this.pump, () => {
      this.pump.setFlipX(true);
    });

    this.physics.add.collider(this.player2, this.pump, () => {
      this.pump.setFlipX(false);
    });

    this.music = this.sound.add('playing-music');
    // this.music.play({loop: true});

    this.input.once('pointerdown', () => {
      this.music.stop();
      this.music.destroy();
      this.scene.start('GameOver');
    });
  }

  update() {
    this.player1.update();
    this.player2.update();
  }
}
