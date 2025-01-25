const KEY_CODES = Phaser.Input.Keyboard.KeyCodes;

export class Player {

  private texture: string;
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(scene: Phaser.Scene, texture: string, side: string) {
    this.texture = texture;

    scene.anims.create({
      key: `${texture}left`,
      frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: `${texture}stop`,
      frames: [ { key: texture, frame: 4 } ],
      frameRate: 20
    });

    scene.anims.create({
      key: `${texture}right`,
      frames: scene.anims.generateFrameNumbers(texture, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.sprite = scene.physics.add.sprite(
      Number(scene.game.config.width)/2 + (side === 'left' ? -200 : +200),
      Number(scene.game.config.height)/2,
      texture
    );
    this.sprite.setBounce(0.1);
    this.sprite.setCollideWorldBounds(true);

    const playerKeys = side === 'left'
      ? { left: KEY_CODES.A, right: KEY_CODES.S }
      : { left: KEY_CODES.LEFT, right: KEY_CODES.RIGHT }

    const leftKey = scene.input.keyboard?.addKey(playerKeys.left);
    const rightKey = scene.input.keyboard?.addKey(playerKeys.right);

    leftKey?.on('down', () => this.walkLeft());
    rightKey?.on('down', () => this.walkRight());

    leftKey?.on('up', () => this.stop());
    rightKey?.on('up', () => this.stop());
  }

  walkLeft() {
    this.sprite.setVelocityX(-160);
    this.sprite.anims.play(`${this.texture}left`, true);
  }
  walkRight() {
    this.sprite.setVelocityX(+160);
    this.sprite.anims.play(`${this.texture}right`, true);
  }
  stop() {
    this.sprite.setVelocityX(0);
    this.sprite.anims.play(`${this.texture}stop`);
  }
}
