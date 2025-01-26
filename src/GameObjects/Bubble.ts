class Bubble extends Phaser.GameObjects.Sprite {
  private speed: number;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'bubble');

    this.speed = Phaser.Math.GetSpeed(400, 1);
  }

  update(_time: number, delta: number) {
    this.y -= this.speed * delta;

    if (this.y < -50) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
