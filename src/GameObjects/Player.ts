export class Player {

  constructor(scene: Phaser.Scene, texture: string, side: string) {

    scene.add.image(
      Number(scene.game.config.width)/2 + (side === 'left' ? -200 : +200),
      Number(scene.game.config.height)/2,
      texture
    );
  }

}
