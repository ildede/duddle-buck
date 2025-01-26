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
  leftBathWater: Phaser.GameObjects.Sprite;
  leftBathWaterLevel: number = 0;
  leftWater: Phaser.GameObjects.Sprite;

  rightBath: Phaser.Types.Physics.Arcade.ImageWithStaticBody;
  bubbles1: Phaser.GameObjects.Group;
  bubbles2: Phaser.GameObjects.Group;
  darts1: Phaser.GameObjects.Group;
  darts2: Phaser.GameObjects.Group;
  score1: Phaser.GameObjects.Image;
  score2: Phaser.GameObjects.Image;

  private pumpFacingRight: boolean;
  private isPumping: boolean;

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

    let floor = this.physics.add.staticImage(Number(this.game.config.width) / 2, Number(this.game.config.height) - 50, 'invisible');

    this.pump = this.physics.add.staticSprite(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) - 300,
      'pump',
    );
    if (!this.anims.exists(`pumping`)) {
      this.anims.create({
        key: `pumping`,
        frames: this.anims.generateFrameNumbers(`pump`, {start: 1, end: 1}),
        repeat: 0
      });
    }

    // @ts-ignore
    this.pump.body?.setSize(350, 500);

    this.leftBath = this.physics.add.staticImage(
      245,
      Number(this.game.config.height) - 243,
      'left-bath'
    );
    this.leftBath.body?.setSize(350, 150, false).setOffset(50, 200);
    this.leftBathWater = this.add.sprite(
      245,
      Number(this.game.config.height) - 243,
      'left-bath-water'
    ).setVisible(false);
    this.leftWater = this.add.sprite(
      130,
      Number(this.game.config.height) - 265,
      'left-water'
    ).setVisible(false);
    if (!this.anims.exists(`left-pumping`)) {
      this.anims.create({
        key: `left-pumping`,
        frames: this.anims.generateFrameNumbers(`left-water`, {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
      });
    }
    this.anims.play('left-pumping', this.leftWater);

    this.rightBath = this.physics.add.staticImage(
      Number(this.game.config.width) - 260,
      Number(this.game.config.height) - 270,
      'right-bath'
    );
    this.rightBath.body?.setSize(350, 150, false).setOffset(100, 230);

    this.bubbles1 = this.add.group();
    this.bubbles2 = this.add.group();

    this.darts1 = this.add.group();
    this.darts2 = this.add.group();

    this.player1 = new Player(this, 1, this.darts1);
    this.player2 = new Player(this, 2, this.darts2);
    this.physics.add.collider(floor, [this.player1, this.player2]);

    this.pumpFacingRight = false;
    this.isPumping = false;
    this.physics.add.collider(this.player1, this.pump, () => {
      this.pumpFacingRight = false;
      this.isPumping = true;
      this.anims.play('pumping', this.pump);
      this.pump.setFlipX(false);
    });
    this.physics.add.collider(this.player2, this.pump, () => {
      this.pumpFacingRight = true;
      this.isPumping = true;
      this.anims.play('pumping', this.pump);
      this.pump.setFlipX(true);
    });

    let player1timer = performance.now();
    let player2timer = performance.now();
    this.physics.add.collider(this.player1, this.leftBath, () => {
      if (this.leftBathWaterLevel > 0) {
        let now = performance.now();
        if (now - player1timer > 1000) {
          this.bubbles1.add(new Bubble(this, 200 + Math.random() * 250, Number(this.game.config.height) - 320));
          player1timer = now;
          this.leftBathWaterLevel = Math.max(this.leftBathWaterLevel - 0.3, 0);
        }
      }
    });
    this.physics.add.collider(this.player2, this.rightBath, () => {
      if (this.isPumping && this.pumpFacingRight) {
        let now = performance.now();
        if (now - player2timer > 1000) {
          this.bubbles2.add(new Bubble(this, Number(this.game.config.width) - 200 - Math.random() * 250, Number(this.game.config.height) - 330));
          player2timer = now;
        }
      }
    });

    const popBubble = (bubble: Bubble) => {
      bubble.anims.play('pop');
      bubble.on('animationcomplete', () => bubble.destroy());
    };

    this.physics.add.collider(this.bubbles1, this.darts1, (bubble, _dart) => popBubble(bubble as Bubble));
    this.physics.add.collider(this.bubbles2, this.darts2, (bubble, _dart) => popBubble(bubble as Bubble));
    this.physics.add.collider(this.bubbles1, this.darts2, (bubble, _dart) => popBubble(bubble as Bubble));
    this.physics.add.collider(this.bubbles2, this.darts1, (bubble, _dart) => popBubble(bubble as Bubble));

    this.music = this.sound.add('playing-music');
    this.music.play({loop: true, volume: 0.3});

    this.score1 = this.add.image(Number(this.game.config.width)/2 - 200, 150, 'bolla0')
    this.score2 = this.add.image(Number(this.game.config.width)/2 + 200, 150, 'bolla0')

  }

  update() {
    this.player1.update();
    this.player2.update();
    let score1 = Math.floor(this.bubbles1.children.size / 4);
    this.score1.setTexture(`bolla${score1 <= 10 ? score1 : 10}`)
    let score2 = Math.floor(this.bubbles2.children.size / 4);
    this.score2.setTexture(`bolla${score2 <= 10 ? score2 : 10}`)

    if (score1 > 10 || score2 > 10) {
      this.music.stop();
      this.music.destroy();
      this.scene.start('GameOver', { winnerIsLeft: score1 > score2 });
    }

    if (this.isPumping) {
      if (this.pumpFacingRight) {
        this.leftWater.setVisible(false);

      } else {
        this.leftWater.setVisible(true);
        if (this.leftBathWaterLevel < 7.9) {
          this.leftBathWaterLevel += 0.005;
        }
      }
    }

    this.leftBathWater.setVisible(this.leftBathWaterLevel > 0);
    this.leftBathWater.setFrame(Math.floor(this.leftBathWaterLevel));
  }
}
