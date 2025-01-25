const KEY_CODES = Phaser.Input.Keyboard.KeyCodes;

export class Player extends Phaser.Physics.Arcade.Sprite {
  private textureName: string;

  constructor(scene: Phaser.Scene, texture: string, side: string) {
    super(
      scene,
      Number(scene.game.config.width) / 2 + (side === 'left' ? -300 : +300),
      Number(scene.game.config.height) / 2,
      texture
    );
    this.textureName = texture;
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

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
      ? {left: KEY_CODES.A, right: KEY_CODES.S}
      : {left: KEY_CODES.LEFT, right: KEY_CODES.RIGHT}

    const leftKey = scene.input.keyboard?.addKey(playerKeys.left);
    const rightKey = scene.input.keyboard?.addKey(playerKeys.right);

    leftKey?.on('down', () => this.walkLeft());
    rightKey?.on('down', () => this.walkRight());

    leftKey?.on('up', () => this.walkStop());
    rightKey?.on('up', () => this.walkStop());
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
}
