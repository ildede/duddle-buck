import { Scene } from 'phaser';
import { Player } from '../GameObjects/Player';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    player1: Player;
    player2: Player;

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

        this.player1 = new Player(this, 'dude1', 'left');
        this.player2 = new Player(this, 'dude2', 'right');

        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });
    }
}
