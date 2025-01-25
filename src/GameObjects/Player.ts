const KEY_CODES = Phaser.Input.Keyboard.KeyCodes;

export class Player extends Phaser.Physics.Arcade.Sprite {
  private textureName: string;
  private dart: Phaser.GameObjects.Image;
  private dartEffect: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

  constructor(scene: Phaser.Scene, texture: string, side: string) {
    super(
      scene,
      Number(scene.game.config.width) / 2 + (side === 'left' ? -300 : +300),
      Number(scene.game.config.height) - 200,
      texture
    );
    this.textureName = texture;
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.dart = this.scene.add.image(this.x, this.y, 'dart');
    this.dartEffect = scene.sound.add('sarbacane');

    if (!scene.anims.exists(`${texture}left`)) {
      scene.anims.create({
        key: `${texture}left`,
        frames: scene.anims.generateFrameNumbers(texture, {start: 3, end: 5}),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!scene.anims.exists(`${texture}right`)) {
      scene.anims.create({
        key: `${texture}right`,
        frames: scene.anims.generateFrameNumbers(texture, {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
      });
    }

    this.setBounce(0.1);
    this.setCollideWorldBounds(true);

    const playerKeys = side === 'left'
      ? {left: KEY_CODES.A, right: KEY_CODES.S, shot: KEY_CODES.D}
      : {left: KEY_CODES.LEFT, right: KEY_CODES.RIGHT, shot: KEY_CODES.DOWN}

    const leftKey = scene.input.keyboard?.addKey(playerKeys.left);
    const rightKey = scene.input.keyboard?.addKey(playerKeys.right);
    const shotKey = scene.input.keyboard?.addKey(playerKeys.shot);

    leftKey?.on('down', () => this.walkLeft());
    rightKey?.on('down', () => this.walkRight());
    shotKey?.on('down', () => this.shotDart());

    leftKey?.on('up', () => this.walkStop());
    rightKey?.on('up', () => this.walkStop());

    scene.tweens.add({
      targets: this.dart,
      angle: { from: 0, to: 180 },
      ease: 'Linear',
      duration: 1000,
      repeat: -1, // -1: infinity
      yoyo: true,
    });
  }

  walkLeft() {
    this.setVelocityX(-160);
    this.anims.play(`${this.textureName}left`, true);
  }

  walkRight() {
    this.setVelocityX(+160);
    this.anims.play(`${this.textureName}right`, true);
  }

  walkStop() {
    this.setVelocityX(0);
    this.anims.stop();
  }

  update() {
    this.dart.setX(this.x);
    this.dart.setY(this.y);
  }

  shotDart() {
    const shootingDart = this.scene.physics.add.image(this.dart.x, this.dart.y, 'dart');
    shootingDart.setAngle(this.dart.angle);
    let vector2 = this.scene.physics.velocityFromAngle(this.dart.angle, 1000);
    shootingDart.setVelocity(-vector2.x, -vector2.y);
    this.dartEffect.play();
  }
}
