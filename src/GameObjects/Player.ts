const KEY_CODES = Phaser.Input.Keyboard.KeyCodes;

export class Player extends Phaser.Physics.Arcade.Sprite {
  private textureName: string;
  private dart: Phaser.GameObjects.Image;
  private dartEffect: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private walkEffect: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

  constructor(scene: Phaser.Scene, type: number, darts: Phaser.GameObjects.Group) {
    super(
      scene,
      Number(scene.game.config.width) / 2 + (type === 1 ? -400 : +400),
      Number(scene.game.config.height) - 700,
      `canard${type}`
    );
    this.textureName = `canard${type}`;
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body?.setSize(this.width-60, this.height-60);

    this.dart = this.scene.add.image(this.x, this.y, `dart${type}`);
    this.dartEffect = scene.sound.add('sarbacane');
    this.walkEffect = scene.sound.add('walking-duck', { volume: 1.2 });

    if (!scene.anims.exists(`canard${type}walk`)) {
      scene.anims.create({
        key: `canard${type}walk`,
        frames: scene.anims.generateFrameNumbers(`canard${type}`, {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
      });
    }

    this.setBounce(0.1);
    this.setCollideWorldBounds(true);

    let playerKeys = {left: KEY_CODES.LEFT, right: KEY_CODES.RIGHT, shot: KEY_CODES.DOWN, jump: KEY_CODES.UP};
    switch (type) {
      case 1:
        playerKeys = {left: KEY_CODES.Q, right: KEY_CODES.D, shot: KEY_CODES.S, jump: KEY_CODES.Z};
        break;
      case 2:
        playerKeys = {left: KEY_CODES.LEFT, right: KEY_CODES.RIGHT, shot: KEY_CODES.DOWN, jump: KEY_CODES.UP};
        break;
      default:
    }

    const leftKey = scene.input.keyboard?.addKey(playerKeys.left);
    const rightKey = scene.input.keyboard?.addKey(playerKeys.right);
    const shotKey = scene.input.keyboard?.addKey(playerKeys.shot);
    const jumpKey = scene.input.keyboard?.addKey(playerKeys.jump);

    leftKey?.on('down', () => this.walkLeft());
    rightKey?.on('down', () => this.walkRight());
    jumpKey?.on('down', () => {
      if (this.body?.touching.down) this.jump();
    });

    shotKey?.on('down', () => {
      if (darts.children.size < 3) {
        let child = this.shotDart();
        darts.add(child);
      }
    });

    leftKey?.on('up', () => {
      if (!rightKey?.isDown) this.walkStop();
    });
    rightKey?.on('up', () => {
      if (!leftKey?.isDown) this.walkStop();
    });

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
    this.setFlipX(true);
    this.anims.play(`${this.textureName}walk`, true);
    if (!this.walkEffect.isPlaying) {
      this.walkEffect.play();
    }
  }

  walkRight() {
    this.setVelocityX(+160);
    this.setFlipX(false);
    this.anims.play(`${this.textureName}walk`, true);
    if (!this.walkEffect.isPlaying) {
      this.walkEffect.play();
    }
  }

  walkStop() {
    this.setVelocityX(0);
    this.anims.stop();
    this.walkEffect.stop();
  }

  jump() {
    this.setVelocityY(+4000);
  }

  update() {
    this.dart.setX(this.x);
    this.dart.setY(this.y);
  }

  shotDart() {
    const shootingDart = this.scene.physics.add.image(this.dart.x, this.dart.y, this.dart.texture);
    shootingDart.setAngle(this.dart.angle);
    let vector2 = this.scene.physics.velocityFromAngle(this.dart.angle, 1300);
    shootingDart.setVelocity(-vector2.x, -vector2.y);
    this.dartEffect.play();
    setTimeout(() => shootingDart.destroy(), 1700);
    return shootingDart;
  }
}
