import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
  background: GameObjects.Image;

  gamestart: GameObjects.Image;
  credits: GameObjects.Image;
  sdb: GameObjects.Image;
  cabane: GameObjects.Image;
  realduck: GameObjects.Image;
  plasticduck: GameObjects.Image;
  
  title: GameObjects.Text;

  constructor() {
    super('MainMenu');
  }

  create() {
    this.background = this.add.image(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) / 2,
      'background'
    );

      this.gamestart = this.add.sprite(
      Number(this.game.config.width) /2 - 124,
      Number(this.game.config.height) - 270,
      'credits', 0
    ).on('pointerdown', () => this.scene.start('Game'));

    this.gamestart.on('pointerover', () => {
      this.gamestart.setFrame(1);
    })
    this.gamestart.on('pointerout', () => {
      this.gamestart.setFrame(0)
    })

    this.gamestart.setInteractive();

      this.credits = this.add.sprite(
      Number(this.game.config.width)/2 + 124,
      Number(this.game.config.height) - 270,
      'credits', 2
    ).on('pointerdown', () => this.scene.start('Credits'));
    this.credits.setInteractive();
      
    this.credits.on('pointerover', () => {
      this.credits.setFrame(3);
    })
    this.credits.on('pointerout', () => {
      this.credits.setFrame(2)
    })

      this.sdb = this.add.sprite(
      Number(this.game.config.width)/2 - 284,
      Number(this.game.config.height) - 470,
      'baignoires', 0
    );
      this.cabane = this.add.sprite(
      Number(this.game.config.width)/2 + 284,
      Number(this.game.config.height) - 470,
      'baignoires', 1
    );

	  this.realduck = this.add.image(
      Number(this.game.config.width) / 8 + 700, 
      Number(this.game.config.height) -750  , 
      'realduck'
    );

	  this.plasticduck= this.add.image(
      Number(this.game.config.width) / 8 + 1100, 
      Number(this.game.config.height) -750 , 
      'plasticduck'
    );

/*
    this.input.once('pointerdown', () => {
      this.scene.start('Game');
    });
*/
  }
}
