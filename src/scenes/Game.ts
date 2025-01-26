import { Scene } from 'phaser';
import { Player } from '../GameObjects/Player';
import { Bubble } from '../GameObjects/Bubble';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  player1: Player;
  player2: Player;
  pump: Phaser.GameObjects.Image;
  music: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  leftBath: Phaser.Types.Physics.Arcade.ImageWithStaticBody;
  rightBath: Phaser.Types.Physics.Arcade.ImageWithStaticBody;
  bubbles: Phaser.Physics.Arcade.StaticGroup;

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
      Number(this.game.config.height) - 300,
      'pump'
    );

    this.leftBath = this.physics.add.staticImage(
      245,
      Number(this.game.config.height) - 243,
      'left-bath'
    );
    this.rightBath = this.physics.add.staticImage(
      Number(this.game.config.width) - 260,
      Number(this.game.config.height) - 270,
      'right-bath'
    );

    this.player1 = new Player(this, 1);
    this.player2 = new Player(this, 2);



    this.physics.add.collider(this.player1, this.pump, () => {
      this.pump.setFlipX(true);
    });
    this.physics.add.collider(this.player2, this.pump, () => {
      this.pump.setFlipX(false);
    });

    this.physics.add.collider(this.player1, this.leftBath, () => {
      new Bubble(this, 300, Number(this.game.config.height) - 350);
    });
    this.physics.add.collider(this.player2, this.rightBath, () => {
      new Bubble(this, Number(this.game.config.width) - 300, Number(this.game.config.height) - 350);
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
