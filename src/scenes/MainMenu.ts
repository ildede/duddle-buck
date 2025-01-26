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

	  this.gamestart = this.add.image(
      Number(this.game.config.width) / 8 , 
      Number(this.game.config.height) -100 , 
      'gamestart'
    ).on('pointerdown', () => this.scene.start('Game'));
    this.gamestart.setInteractive();

	  this.credits = this.add.image(
      Number(this.game.config.width) / 8 + 300, 
      Number(this.game.config.height) -100 , 
      'credits'
    ).on('pointerdown', () => this.scene.start('Credits'));
    this.credits.setInteractive();

	  this.sdb = this.add.image(
      Number(this.game.config.width) / 8 + 600, 
      Number(this.game.config.height) -100 , 
      'sdb'
    );

	  this.cabane = this.add.image(
      Number(this.game.config.width) / 8 + 900, 
      Number(this.game.config.height) -100 , 
      'cabane'
    );

	  this.realduck = this.add.image(
      Number(this.game.config.width) / 8 + 1200, 
      Number(this.game.config.height) -100 , 
      'realduck'
    );

	  this.plasticduck= this.add.image(
      Number(this.game.config.width) / 8 + 1500, 
      Number(this.game.config.height) -100 , 
      'plasticduck'
    );

/*
    this.input.once('pointerdown', () => {
      this.scene.start('Game');
    });
*/
  }
}
