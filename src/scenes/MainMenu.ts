import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
  background: GameObjects.Image;

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

    // Credits button
	  this.credits = this.add.image(
      Number(this.game.config.width) / 8 + 100, 
      Number(this.game.config.height) -100 , 
    'credits'
    );

    // Credits button
	  this.sdb = this.add.image(
      Number(this.game.config.width) / 8 + 400, 
      Number(this.game.config.height) -100 , 
    'sdb'
    );

    // Credits button
	  this.cabane = this.add.image(
      Number(this.game.config.width) / 8 + 700, 
      Number(this.game.config.height) -100 , 
    'cabane'
    );

    // Credits button
	  this.realduck = this.add.image(
      Number(this.game.config.width) / 8 + 1000, 
      Number(this.game.config.height) -100 , 
    'realduck'
    );

    // Credits button
	  this.plasticduck= this.add.image(
      Number(this.game.config.width) / 8 + 1300, 
      Number(this.game.config.height) -100 , 
    'plasticduck'
    );


    this.input.once('pointerdown', () => {
      this.scene.start('Game');
    });
  }
}
