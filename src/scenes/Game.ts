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
  bubbles: Phaser.GameObjects.Group;
  darts: Phaser.GameObjects.Group;

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

    let floor = this.physics.add.staticImage(Number(this.game.config.width)/2, Number(this.game.config.height) - 50, 'invisible');

    this.pump = this.physics.add.staticImage(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) - 300,
      'pump'
    );
    this.pump.body?.setSize(350, 500);

    this.leftBath = this.physics.add.staticImage(
      245,
      Number(this.game.config.height) - 243,
      'left-bath'
    );
    this.leftBath.body?.setSize(350, 150, false).setOffset(50, 200);
    this.rightBath = this.physics.add.staticImage(
      Number(this.game.config.width) - 260,
      Number(this.game.config.height) - 270,
      'right-bath'
    );
    this.rightBath.body?.setSize(350, 150, false).setOffset(100, 210);

    this.bubbles = this.add.group();
    this.darts = this.add.group();

    this.player1 = new Player(this, 1, this.darts);
    this.player2 = new Player(this, 2, this.darts);
    this.physics.add.collider(floor, [this.player1, this.player2]);

    this.physics.add.collider(this.player1, this.pump, () => {
      this.pump.setFlipX(false);
    });
    this.physics.add.collider(this.player2, this.pump, () => {
      this.pump.setFlipX(true);
    });

    this.physics.add.collider(this.player1, this.leftBath, () => {
      this.bubbles.add(new Bubble(this, 200 + Math.random() * 250, Number(this.game.config.height) - 320));
    });
    this.physics.add.collider(this.player2, this.rightBath, () => {
      this.bubbles.add(new Bubble(this, Number(this.game.config.width) - 200 - Math.random() * 250, Number(this.game.config.height) - 330));
    });

    this.physics.add.collider(this.bubbles, this.darts, (bubble, _dart) => {
      (bubble as Bubble).anims.play('pop');
      (bubble as Bubble).on('animationcomplete', () => bubble.destroy());
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
