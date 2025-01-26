export class Bubble extends Phaser.Physics.Arcade.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bubble');

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setGravityY(-370);
    let scale: number = 0.1 + Math.random() * 0.5;
    this.setScale(scale, scale);

    if (!scene.anims.exists(`flying-bubble`)) {
      scene.anims.create({
        key: `flying-bubble`,
        frames: scene.anims.generateFrameNumbers(`bubble`, {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
      });
    }
    if (!scene.anims.exists(`pop`)) {
      scene.anims.create({
        key: `pop`,
        frames: scene.anims.generateFrameNumbers(`bubble`, {start: 3, end: 4}),
        frameRate: 10,
        repeat: 0
      });
    }
    this.anims.play(`flying-bubble`);
  }
}
