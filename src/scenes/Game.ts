import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;

        this.background = this.add.image(
          Number(this.game.config.width) / 2,
          Number(this.game.config.height) / 2,
          'game-background'
        );


        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });
    }
}
