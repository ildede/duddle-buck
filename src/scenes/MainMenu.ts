import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    title: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(
          Number(this.game.config.width) / 2,
          Number(this.game.config.height) / 2,
          'background'
        );

        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}
